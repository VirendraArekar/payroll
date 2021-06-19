
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import {API_URL,ADMIN_REPORT_LEAVE} from '../../Contants';

class Report extends Component {
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
  }


  async clickGenerate(e){
      e.preventDefault();
  
      const start_date = document.querySelector('#report_start_date').value;
      const end_date = document.querySelector('#report_end_date').value;
      // this.setState({
      //     start_dateError : '',
      //     end_dateError : ''
      // });

      // var error = false;

      // if(start_date === ''){
      //   this.setState({start_dateError : 'Field is required'});
      //   error = true;
      // }

      // if(end_date === ''){
      //   this.setState({end_dateError : 'Field is required'});
      //   error = true;
      // }

      // if(error){
      //     return;
      // }

      var data = {
          start : start_date,
          end : end_date
      };

      console.log(data);
      var fetchLeave = await fetch(API_URL+ADMIN_REPORT_LEAVE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
        .then(res => res.json());
        console.log(fetchLeave)
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
        title: 'Period',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-dark">{record.start_date} to {record.end_date} - {
                 Math.abs(new Date(record.end_date) - new Date(record.start_date))/(1000 * 3600 * 24) 
            }-days</span>
        )
      },

      {
        title: 'Reason',
        dataIndex: 'reason',
        sorter: (a, b) => a.reason.length - b.reason.length,
      }, 
      {
        title: 'Status',
        // dataIndex: '',
        render: (text, record) => (
        <span className={ record.status ? "badge bg-inverse-success" : "badge bg-inverse-info"}>{record.status === 1 ? 'Approved' : ''}{record.status === 0 ? 'Pending' : ''}{record.status === 2 ? 'Rejected' : ''}</span>
          )
      }
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
              <h3 className="page-title">Vacation</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/leave">Leave</a></li>
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
                <input className="form-control floating" type="text" id="report_start_date" placeholder="Start Date" />
                {
                    start_dateError &&
                    <p className="text-danger">{start_dateError}</p>
                }
          </div>
          <div className="col-sm-6 col-md-3">  
                <input className="form-control floating" type="text" id="report_end_date" placeholder="End Date"/>

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

export default Report;
