
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import $ from 'jquery';
import moment from 'moment';
import {API_URL,ADMIN_PAYROLL_STATEMENT,ADMIN_STATEMENT_FILTER,ADMIN_STATEMENT_SEARCH,ADMIN_PAYROLL_STATEMENT_VIEW} from '../../Contants';

class Slip extends Component {
  constructor(props) {
    super(props);
    this.state = {
       payrolls : null,
       keyword : '',
       alert : false,
       message : '',
       msgType : '',
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.clickIdSearch = this.clickIdSearch.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.clickSave = this.clickSave.bind(this);
  
  }

  async loadTimeSheet(){
    var fetchLeave = await fetch(API_URL+ADMIN_PAYROLL_STATEMENT)
    .then(res => {
        return res.json();
    });

    if(fetchLeave.success){
        this.setState({
            payrolls : fetchLeave.data
        });
    }
  }

  async clickSearch(e){
      e.preventDefault();
      const start = document.querySelector('#start-date-slip').value;
      const end = document.querySelector('#end-date-slip').value;
      var data = {
        start : start,
        end :end
      };
      var fetchLeave = await fetch(API_URL+ADMIN_STATEMENT_FILTER,{
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json());
      if(fetchLeave.success){
        console.log(fetchLeave.data);
        this.setState({
          payrolls : fetchLeave.data,
        });
      }
  }

  async clickIdSearch(e){
    e.preventDefault();
      const {keyword} = this.state;
      var data = {
        user : keyword
      };
      var fetchLeave = await fetch(API_URL+ADMIN_STATEMENT_SEARCH,{
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json());
      if(fetchLeave.success){
        console.log(fetchLeave.data);
        this.setState({
          payrolls : fetchLeave.data,
        });
      }
  }

  async clickSave(e){
    e.preventDefault();
      const {keyword} = this.state;
      var data = {
        user : keyword
      };
      var fetchLeave = await fetch(API_URL+ADMIN_PAYROLL_STATEMENT_VIEW,{
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(res => res.json());
      if(fetchLeave.success){
        
      }
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }

  componentDidMount(){
      this.loadTimeSheet();
  }


   render() {
    const{payrolls} = this.state
    const columns = [ 
      {
        title: (<input type="checkbox"/>),
        dataIndex: '',
        render : (text,record) => (
            <input type="checkbox" />
        ),
      },   
      {
        title: 'Paid Date',
        dataIndex: 'dop',
        render : (text,record) => (
            <span className="badge badge-info">{record.dop}</span>
        ),
      }, 
      {
        title: 'Paid Date',
        dataIndex: 'dop',
        render : (text,record) => (
            <span className="badge badge-info">{record.dop}</span>
        ),
      }, 
      {
        title: 'Employee',
        dataIndex: '',
        render : (text,record) => (
            <span className="text-secondary">{record.emp.name}</span>
        ),
      }, 
      {
        title: 'Basic Pay',
        dataIndex: 'pay',
        render : (text,record) => (
            <span className="text-secondary">{record.pay}</span>
        ),
      },
      {
        title: 'Incentive',
        dataIndex: 'incentive',
        render : (text,record) => (
            <span className="text-secondary">{record.incentive}</span>
        ),
      },
      {
        title: 'Deduction(-)',
        dataIndex: '',
        render : (text,record) => (
            <span className="text-secondary">{record.tax + record.ded}</span>
        ),
      },
      {
        title: 'Net Pay',
        dataIndex: 'net',
        render : (text,record) => (
            <span className="text-secondary">{Math.round(record.net)}</span>
        ),
      },
      {
        title: 'Period',
        dataIndex: 'period_frm',
        render : (text,record) => (
            <span className="text-secondary">{record.period_frm}</span>
        ),
      },
      {
        title: 'Transaction',
        dataIndex: 'period_to',
        render : (text,record) => (
            <span className="text-secondary">{record.period_to}</span>
        ),
      },
      {
        title: 'Transaction Mode',
        dataIndex: 'trans_mode',
        render : (text,record) => (
            <span className="text-secondary">{record.trans_mode}</span>
        ),
      },
    ];

      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Vacation Request - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Salary Slips</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Salary Slips</li>
              </ul>
            </div>
            <div class="col-auto float-right ml-auto">
            <div className="row filter-row">
          <div className="col-sm-6 col-md-6">
          </div>
          <div className="col-sm-6 col-md-2">  
            <input className="form-control form-control-sm" type="text" id="start-date-slip" value="" placeholder="Start Date"/>
          </div>
          <div className="col-sm-6 col-md-2">  
                <input className="form-control form-control-sm  " type="text" id="end-date-slip"  value="" placeholder="End Date"/>
          </div>
          <div className="col-sm-6 col-md-2">  
            <a href="#" className="btn-success p-1 rounded" onClick={this.clickSearch}> <i class="fa fa-search" /> Filter </a>  
          </div>  


          <div className="col-sm-12 col-md-8 mt-2">  
          </div>
          <div className="col-sm-6 col-md-2 mt-2">  
                <input className="form-control form-control-sm" type="text" id="end-date" onChange={this.changeKeyword} value={this.state.keyword} placeholder="keyword"/>
          </div>
          
          <div className="col-sm-6 col-md-2 mt-2">  
            <a href="#" className="btn-success p-1 rounded" onClick={this.clickIdSearch}> <i class="fa fa-search" /> Filter </a>  
          </div>        
        </div>
            </div>
          </div>
        </div>

        {/* Search Filter */}
        
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
            <div className="table-responsive p-2">
               {
                   payrolls !== null &&
                   <div>
                   <Table className="table-sm table-striped text-center"
                    pagination= { {total : payrolls.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={payrolls}
                    rowKey={record => record.id}
                    onChange={this.handleTableChange}
                    />
                    
                    </div>
               }
               {
                 payrolls !== null && 
                  payrolls.length > 0 &&
                  <div>
                    <button className="btn btn-success ml-3" onClick={this.clickSave}>Salary Slip</button>
                    <input type="checkbox" className="ml-3"/> Select All
                  </div>
               }
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Slip;
