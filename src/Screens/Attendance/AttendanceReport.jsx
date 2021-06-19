
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import {API_URL,ADMIN_ATTENDANCE_REPORT} from '../../Contants';

class AttendanceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
       leaves : null,
       employees : null,
       keyword : '',
       start_date : '',
       start_dateError : '',
       end_date : '',
       end_dateError : '',
       
    };
    this.clickGenerate = this.clickGenerate.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.updateTimeNumber = this.updateTimeNumber.bind(this);
  }


  async clickGenerate(e){
      e.preventDefault();
  
      const start_date = document.querySelector('#restart_date').value;
      const end_date = document.querySelector('#reend_date').value;
      this.setState({
          start_dateError : '',
          end_dateError : ''
      });

      var error = false;

      if(start_date === ''){
        this.setState({start_dateError : 'Field is required'});
        error = true;
      }

      if(end_date === ''){
        this.setState({end_dateError : 'Field is required'});
        error = true;
      }

      if(error){
          return;
      }

      var data = {
          start : start_date,
          end : end_date
      };

      var fetchLeave = await fetch(API_URL+ADMIN_ATTENDANCE_REPORT, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
        .then(res => res.json());

      if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data
        });
      }
  }



  componentDidMount(){
      
  }

  changeStartDate(event){

    this.setState({start_date : event.target.value});
  }

  changeEndDate(event){
    this.setState({end_date : event.target.value});
  }

  updateTimeNumber(num){
    var numArray = num.split(':');
    return numArray[0];
  }



   render() {
    const{leaves, employees,start_dateError,end_dateError, start_date, end_date} = this.state
    const columns = [   
      {
        title: 'Employee',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info">{record.emp.name}</span>
        )
      },   
      {
        title: 'Hour',
        dataIndex: 'duration',
        render : (text,record) => (
            <span className="badge badge-info">{record.duration}</span>
        ),
        sorter: (a, b) => a.duration.length - b.duration.length,
      },  
      {
        title: 'Session',
        dataIndex: 'days',
        render : (text,record) => (
            <span className="badge badge-info">{record.days}</span>
        ),
        sorter: (a, b) => a.days.length - b.days.length,
      },
      {
        title: 'Average = Hours/Session',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-dark">{this.updateTimeNumber(record.duration)/record.days}</span>
        )
      },
      {
        title: 'ROI',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-dark">{(((this.updateTimeNumber(record.duration)/record.days)/record.days)*100).toFixed(2)}%</span>
        )
      }, 
    ]
      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Vacation Report - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Attendance Report</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item"><a href="/admin/attendance">Attendance</a></li>
                <li className="breadcrumb-item active">Report</li>
              </ul>
            </div>
           
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
   
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">  
           
          </div>
          <div className="col-sm-6 col-md-3">  
               <div className="cal-icon">
                <input className="form-control floating " type="text" id="restart_date" placeholder="Start Date"/>
               </div>
                {
                    start_dateError &&
                    <p className="text-danger">{start_dateError}</p>
                }
          </div>
          <div className="col-sm-6 col-md-3">  
              <div className="cal-icon">
                 <input className="form-control floating " type="text" id="reend_date" placeholder="End Date"/>
              </div>
              {
                  end_dateError &&
                  <p className="text-danger">{end_dateError}</p>
              }

          </div>
          
          <div className="col-sm-6 col-md-3">  
            <button  className="btn btn-success btn-block" onClick={this.clickGenerate}><span className="fa fa-search" /> Generate Report </button>  
          </div>     
        </div>
        {/* /Search Filter */}
        {
          this.state.alert &&
          <div className={"alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
            {this.state.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }

        {
          employees !== null &&
          <div className="alert alert-dismissible fade show  alert-success mt-3" role="alert">
            Minimum 3-4 Hours working skill is consider as BEST ROI
          </div>
        }

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
               {
                   employees !== null &&
                   <Table className="table-striped text-center"
                  pagination= { {total : employees.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={employees}
                  rowKey={record => record.id}
                  onChange={this.handleTableChange}
                />
               }
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default AttendanceReport;
