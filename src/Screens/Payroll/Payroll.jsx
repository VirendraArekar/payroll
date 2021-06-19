
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import 'antd/dist/antd.css';
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import $ from 'jquery';
import {API_URL,ADMIN_ADD_PAYROLL,ADMIN_REPORT_PAYROLL,ADMIN_PAYROLL_CREATE} from '../../Contants';

class Payroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
       logs : null,
       emp_lists : null,
       showlog : true,
       depts : null,
       deptses : null,
       keyword : '',
       employees : null,
       empDataView : false, 
       department : '',
       departmentError : '',
       designation : '',
       designationError : '',
       editdepartment : '',
       editdepartmentError : '',
       editdesignation : '',
       editdesignationError : '',
       editdeptData : null,
       editId : '',
       alert : false,
       message : '',
       msgType : '',
    };
    this.loadLeave = this.loadLeave.bind(this);
    this.generateReport = this.generateReport.bind(this);

  }

  async loadLeave(){
    var fetchLeave = await fetch(API_URL+ADMIN_ADD_PAYROLL)
                     .then(res => res.json());
    if(fetchLeave.success){
        this.setState({
            logs : fetchLeave.data
        });
    }
  }

  componentDidMount(){
      this.loadLeave();
  }

  async generateReport(e){
      e.preventDefault();

      this.setState({showlog : false});
      
      let start_date = document.querySelector('#payroll-start-date').value;
      let end_date = document.querySelector('#payroll-end-date').value;

      var data = {
          work_in : start_date,
          work_out : end_date
      }

      var addResponse = await fetch(API_URL+ADMIN_REPORT_PAYROLL, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    if(addResponse.success){
      this.loadLeave();
      this.setState({
        alert : true,
        message : addResponse.message,
        msgType : 'success',
        employees : addResponse.data.employees,
        tax : addResponse.data.tax,
        pf : addResponse.data.pf
      });
    }
    else{
      this.setState({
        alert : true,
        message : addResponse.message,
        msgType : 'danger'
      });
    }


  }

  saveForm(e){
    e.preventDefault();
    var emp_ids = [];
    var $emp_ids = $('input[name=emp_id]');
    $emp_ids.each(function(){
      if($(this).prop("checked") == true){
        emp_ids.push($(this).val());
      }
    });
    var pays = [];
    var $pays = $('input[name=pay]');
    $pays.each(function(){
      if($(this).prop("checked") == true){
        pays.push($(this).val());
      }
    });
    var incs = [];
    var $incs = $('input[name=inc]');
    $incs.each(function(){
      if($(this).prop("checked") == true){
        incs.push($(this).val());
      }
    });
    var taxs = [];
    var $taxs = $('input[name=tax]');
    $taxs.each(function(){
      if($(this).prop("checked") == true){
        taxs.push($(this).val());
      }
    });
    var deds = [];
    var $deds = $('input[name=ded]');
    $deds.each(function(){
      if($(this).prop("checked") == true){
        deds.push($(this).val());
      }
    });
    var nets = [];
    var $nets = $('input[name=net]');
    $nets.each(function(){
      if($(this).prop("checked") == true){
        console.log($(this).attr('id'));
        nets.push($(this).val());
      }
    });
    var trans = [];
    var $trans = $('input[name=trans]');
    $trans.each(function(){
      if($(this).prop("checked") == true){
        trans.push($(this).val());
      }
    });
    var trans_txts = [];
    var $trans_txts = $('input[name=trans_txt]');
    $trans_txts.each(function(){
      if($(this).prop("checked") == true){
        trans_txts.push($(this).val());
      }
    });
    
    var data = [];
    for(var i = 0; i < emp_ids.length; i++){
      data.push({
        emp_id : emp_ids[i],
        pay : pays[i],
        inc : incs[i],
        tax : taxs[i],
        ded : deds[i],
        net : nets[i],
        trans : trans[i],
        trans_txts : trans_txts[i]
      });
    }

    console.log(data);
  }

   render() {
    const{logs,showlog,employees} = this.state
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
              <h3 className="page-title">Designations</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Designations</li>
              </ul>
            </div>
            <div class="col-auto float-right ml-auto">
               <a href="/admin/employees" className="btn-success float-right p-2 rounded" >Employee List => </a>  
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {
          this.state.alert &&
            <div className={"mt-3 alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
              {this.state.message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
        }
        
        { showlog &&
          <view>
            <hr className="text-secondary mb-5"></hr>
            <div className="row">
              <div className="col-md-5 p-4 rounded" style={{height : 400,backgroundColor : 'white', border : '1px solid lightgrey'}}>
                  <h4 className="ml-1 mb-3 text-info">Generate Payroll</h4>
                  <div className="row">
                      <div className="col-md-6">
                          <input className="form-control form-control-sm" placeholder="Start Date" id="payroll-start-date"/>
                      </div>
                      <div className="col-md-6">
                          <input className="form-control form-control-sm" placeholder="End Date"  id="payroll-end-date"/>
                      </div>
                  </div>
                  <button className="btn-success  p-2 rounded mt-2" onClick={this.generateReport}>Generate</button>
              </div>
              <div className="col-md-5 p-4 ml-5 rounded" style={{height : 400,backgroundColor : 'white', border : '1px solid lightgrey'}}>
                  <h4 className="ml-2 mb-3 text-info" >Recent Logs</h4>
                  <table className="table teble-striped table-bordered">
                      <tr className="text-secondary text-center">
                          <th>Log Time</th>
                          <th>Time Period</th>
                      </tr>
                      {
                          logs !== null &&
                          logs.map((item,index) => {
                              return(
                                  <tr className="text-center" key={index}>
                                      <td>{item.log_time}</td>
                                      <td>{item.info}</td>
                                  </tr>
                              )
                          })
                      }
                      
                  </table>
              </div>
          </div>
          </view>
        }
        <div className="row">
          <div className="col-md-12">
            < hr  style={{color : 'lightgrey'}}/>
            <div className="table-responsive mt-2 p-5" style={{backgroundColor : 'white'}}>
               {employees !== null &&
                employees.length !== 0 &&
                <table className="table table-sm table-striped table-bordered">
                   <thead>
                       <tr className="text-center">
                           <th>Employee</th>
                           <th>Basic Pay</th>
                           <th>Working Days</th>
                           <th>Gross Pay*</th>
                           <th>Incentive</th>
                           <th>Tax*</th>
                           <th>Deducation*</th>
                           <th>Net*</th>
                           <th>Transaction #</th>
                           <th>Transaction Mode</th>
                       </tr>
                   </thead>
                   <tbody>
                       {
                           employees.map((item,index) => {
                            var per_day,allow,ded,net = 0;
                            let allowed_days = 6;
                            let tax1 = (parseFloat(this.state.tax)/100);
                            let ded1 = (parseFloat(this.state.pf)/100);
                            per_day= Math.round(parseInt(item.emp.salary)/30);
                            
                            let salary = parseInt(per_day) * parseInt(item.working_days);
                            
                            let tax= salary * tax1;
                            ded= salary * ded1;
                            net=(salary-(tax-ded));
                               return(
                                   <tr key={index} className="text-center">
                                       <td>
                                        <input type="hidden" id="emp_id" name="emp_id" value={item.emp_id}/>
                                         {item.emp.name}
                                       </td>
                                       <td>{item.emp.salary}</td>
                                       <td>{item.working_days}</td>
                                       <td>
                                          <input type="text" className="form-control underlined text-center" name='pay' id="pay" value={ salary } readOnly/>
                                       </td>
                                       <td>
                                          <input type="number" className="form-control underlined txt text-center" id="inc" name='inc' value="" />
                                       </td>
                                       <td>
                                          <input type="text" className="form-control underlined text-center"  id="tax" name='tax' value={tax} readOnly />
                                       </td>
                                       <td>
                                          <input type="text" className="form-control underlined text-center"  id="ded" name='ded' value={ded} readOnly />
                                       </td>
                                       <td>
                                          <input type="text" className="form-control underlined text-center"  id="net" name='net' value={net} readOnly />
                                       </td>
                                       <td>
                                         <input type="text" className="form-control underlined text-center"  id='trans' name='trans' value="" />
                                       </td>
                                       <td>
                                       <input type="text" className="form-control underlined text-center"  id='trans_txt' name='trans_txt' value="" />
                                       </td>
                                   </tr>
                               )
                           }) 
                       }
                   </tbody>
               </table>
               }
               {
                   employees !== null &&
                   employees.length !== 0 &&
                   <div className="col text-center">
                        <button className="btn btn-primary pl-3 pr-3 btn-block" onClick={this.saveForm}>save</button>
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

export default Payroll;
