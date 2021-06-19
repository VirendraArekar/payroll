
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import $ from 'jquery';
import { API_URL,ADMIN_TIMESHEET_REPORT } from '../../Contants';
import moment from 'moment';

class TimeSheetReport extends Component {
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

      var fetchLeave = await fetch(API_URL+ADMIN_TIMESHEET_REPORT, {
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



   render() {
    const{leaves, employees,start_dateError,end_dateError, start_date, end_date} = this.state
    const columns = [   
      {
        title: 'Employee',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info p-2">{record.emp.name}</span>
        )
      },     
      {
        title: 'Project',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-dark p-2">{record.project.proj_title}</span>
        )
      },
      {
        title: 'Date',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-secondary p-2">{moment(record.start_time).format('D MMM Y')}</span>
        )
      },

      {
        title: 'Duration',
        dataIndex: 'duration',
        sorter: (a, b) => a.duration.length - b.duration.length,
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
              <h3 className="page-title">TimeSheet</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/timesheet/report">TimeSheet</a></li>
                <li className="breadcrumb-item active">Report</li>
              </ul>
            </div>
            {/* <div className="col-auto float-right ml-auto">
              <button  className="btn add-btn" data-toggle="modal" data-target="#addModal"><i className="fa fa-location-arrow" /> New Request</button>
            </div> */}
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
   
        <div className="row filter-row">
          <div className="col-sm-6 col-md-3">  
           
          </div>
          <div className="col-sm-6 col-md-3">  
                <div className="cal-icon">
                  <input className="form-control" type="text" id="report_start_date" placeholder="From Date"/>
                </div>
 
              {
                  start_dateError &&
                  <p className="text-danger">{start_dateError}</p>
              }

          </div>
          <div className="col-sm-6 col-md-3">  
                <div className="cal-icon">
                  <input className="form-control" type="text" id="report_end_date" placeholder="To Date"/>
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
        
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
               {
                   employees !== null ?
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
                    :
                    <h4 className="text-center mt-5">No record found</h4>
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

export default TimeSheetReport;
