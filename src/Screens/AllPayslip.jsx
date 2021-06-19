
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import { API_URL,EMPLOYEE_PAYROLL_COLLECTION_LIST ,FRONT_URL,CORE,ADMIN_PAYROLL_STMT_SEARCH} from '../Contants';
import $ from 'jquery'
import moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";


class Payrolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
       alert : false,
       message : '',
       msgType : '',
       payrolls : null,
       all : false,
       apipayouts : null,
       apiwords : null,
       showPayouts : false,
       address : false,
       posts : null
    };
    
    this.loadPayroll = this.loadPayroll.bind(this);
    this.clickPrint = this.clickPrint.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.exportExcel = this.exportExcel.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  async loadPayroll(){
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;
    var fetchLeave = await fetch(API_URL + EMPLOYEE_PAYROLL_COLLECTION_LIST)
                     .then(res => {
                         return res.json();
                     });
    if(fetchLeave.success){
        this.setState({
            payrolls : fetchLeave.data
        });
    }
  }

  async clickPrint(e){
  
  }

  componentDidMount(){
      this.loadPayroll();
  }

  changeAll(event) {
    var $boxes = $('input[name=chkpayroll]');
    if ($("#all").is(':checked')) {
        $boxes.each(function(){
          $(this).prop( "checked", true );
        });
    } else {
      $boxes.each(function(){
        $(this).prop( "checked", false );
      });
    }
  }

  exportExcel(e){
      e.preventDefault();
      this.setState({
        alert  : false,
        message : '',
        msgType : ''
      });
      let name = document.querySelector('#searchempname').value;
      let from = document.querySelector('#from').value;
      let to = document.querySelector('#to').value;

      let all = false;
      if ($("#all").is(':checked')) {
         all = true;
      }
      
 
      var selectedIds = [];
      var $boxes = $('input[name=chkpayroll]');
      $boxes.each(function(){
         if($(this).is(':checked')){
            selectedIds.push($(this).attr('id'));
         }
      });
      
 
      if(all === false && selectedIds.length === 0){
          this.setState({
              alert  : true,
              message : 'Select at least one record to export.',
              msgType : 'danger'
          })
      }
      else{
        if(all === false && selectedIds.length > 0){

        }
      }

  }

  async clickSearch(e){
      e.preventDefault();
      
      let name = document.querySelector('#searchempname').value;
      let from = document.querySelector('#from').value;
      let to = document.querySelector('#to').value;
      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_STMT_SEARCH + `name=${name}&from=${from}&to=${to}`).then(res => res.json());
      this.setState({payrolls : fetchData.data});
  }

   render() {
    const{payrolls,address,apipayouts, alert, message, msgType } = this.state;
    const columns = [
        // {
        //     title: `#`,
        //     dataIndex: '',
        //     render : (text,record) => (
        //       <span><input type="checkbox" name="chkpayroll" id={record.id} /></span>
        //     ),
        //   },
        {
          title: 'Name',
          dataIndex: '',
          render: (text, record) => (            
              <h2 className="table-avatar">
                <a href={FRONT_URL+'admin/employee/profile/'+record.id} className="avatar"><img alt="" src={record.emp!== undefined ? CORE+'uploads/photo/'+record.photo : 'https://via.placeholder.com/150'} /></a>
                <a href={FRONT_URL+'admin/employee/profile/'+record.id}>
                  {record.name} 
                </a>
              </h2>
            ), 
        },

        {
          title: 'Basic',
          dataIndex: 'basic',
          render : (text,record) => (
            <span>${text}</span>
          ),
        },
        {
            title: 'Earning',
            render: (text, record) => (
               <span className="badge badge-success p-2">
                ${parseFloat(record.house === null ? 0.00 : record.house)
                + parseFloat(record.medical === null ? 0.00 : record.medical) 
                + parseFloat(record.other_al === null ? 0.00 : record.other_al) 
                + parseFloat(record.month_al === null ? 0.00 : record.month_al) 
                + parseFloat(record.food === null ? 0.00 : record.food) 
                + parseFloat(record.exspense === null ? 0.00 : record.exspense)
                }
               </span>
              ),
        },
        {
            title: 'Deduction',
            render: (text, record) => (
               <span className="badge badge-danger p-2">
                ${parseFloat(record.tap === null ? 0.00 : record.tap)
                + parseFloat(record.scp === null ? 0.00 : record.scp) 
                + parseFloat(record.other_ded === null ? 0.00 : record.other_ded) 
                + parseFloat(record.leave_ded === null ? 0.00 : record.leave_ded) 
                }
               </span>
              ),
        },
        {
            title: 'Tap(5%)',
            render: (text, record) => (
                <span className="badge badge-dark p-2">
                    ${ record.tap === null ? 0.00 : record.tap }
                </span>
              ),
        },
        {
            title: 'Scp(3.5%)',
            render: (text, record) => (
                <span className="badge badge-dark p-2">
                    ${ record.scp === null ? 0.00 : record.scp }
                </span>
              ),
        },
        {
          title: 'Net Salary',
          dataIndex: 'net', 
          render: (text, record) => (
               <span className="badge badge-info p-2">${record.net}</span>
          ),
        },
        {
          title: 'Month',
          dataIndex: 'period_frm', 
          render: (text, record) => (
               <span className="badge badge-lg badge-info">{moment(record.period_frm).format('MMM Y')}</span>
          ),
        },     
      ]
    return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Payroll List - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Payroll</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Payroll Statement</li>
              </ul>
            </div>
            <div>
                {payrolls !== null &&
                <CSVLink data={payrolls} className="btn btn-custom">Export to Csv/Excel</CSVLink>}
            </div>
          </div>
        </div>
        <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" id="searchempname"/>
                      <label className="focus-label">Employee Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="from"/>
                      </div>
                      <label className="focus-label">From</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="to"/>
                      </div>
                      <label className="focus-label">To</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}> Search </a>  
                  </div>     
        </div>
        {
          this.state.alert &&
          <div className={"alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
            {this.state.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        {payrolls !== null &&
         <div className="row">
          <div className="col-md-12" >
            <div className="table-responsive text-center">
              {
                  payrolls !== null &&
                  <Table className="table-striped"
                    pagination= { {total : payrolls.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    dataSource={payrolls}
                    rowKey={record => record.id}
                    onChange={this.handleTableChange}
                    />
              }
            </div>
          </div>
        </div>
        } 
     </div>  
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Payrolls;
