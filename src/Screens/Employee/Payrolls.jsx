
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import { API_URL,EMPLOYEE_PAYROLL_LIST,EMPLOYEE_PAYROLL_SALARYSLIP } from '../../Contants';
import $ from 'jquery'
import moment from 'moment';
import Logo from '../../assets/img/logo2.png';


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
    
    this.loadTimeSheet = this.loadTimeSheet.bind(this);
    this.clickPrint = this.clickPrint.bind(this);
    this.changeAll = this.changeAll.bind(this);
  }

  async loadTimeSheet(){
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;
    var fetchLeave = await fetch(API_URL+EMPLOYEE_PAYROLL_LIST+id)
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
    e.preventDefault();
    this.setState({
      alert : false,
      msgType : '',
      message : ''
    });

    var salaryslips = [];
    var $boxes = $('input[name=chkpayroll]');
    $boxes.each(function(){
      if($(this).prop("checked") == true){
          salaryslips.push($(this).attr("id"));
      }
    });
    if(salaryslips.length === 0){
      this.setState({
        alert : true,
        msgType : 'primary',
        message : 'Please select at-least on record'
      });
      return;
    }

    var user = await localStorage.getItem('user');
    user = JSON.parse(user);
    var id = user.id;

    var data = {
      emp_id : id,
      salaryslips : salaryslips
    };
    
    var fetchData = await fetch(API_URL+EMPLOYEE_PAYROLL_SALARYSLIP,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json());

    if(fetchData.code === 200){
      console.log(fetchData);
      if(fetchData.data['payout'].length > 0){
        this.setState({payrolls : null})
      }
      this.setState({
        showPayouts : true,
        apipayouts : fetchData.data['payout'],
        apiwords : fetchData.data['words'],
        address : fetchData.data['address'],
        posts : fetchData.data['posts']
      })
    }
    else{
      this.setState({errorMsg : fetchData.data.message});
    }
  }

  componentDidMount(){
      this.loadTimeSheet();
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

   render() {
    const{payrolls,address,apipayouts } = this.state;
    var tot= 0;
    var tot_inc= 0;
    var tot_tax= 0;
    var tot_ded= 0;
    var tot_net = 0;
    if(payrolls !== null){
      for(var i =0 ; i < payrolls.length ; i++){
        tot = parseFloat(tot) + parseFloat(payrolls[i].pay);
        tot_inc = parseFloat(tot_inc) + parseFloat(payrolls[i].incentive);
        tot_tax = parseFloat(tot_tax) + parseFloat(payrolls[i].tax);
        tot_ded = parseFloat(tot_ded) + parseFloat(payrolls[i].ded);
        tot_net = parseFloat(tot_net) + parseFloat(payrolls[i].net);
      }
    }

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
              <h3 className="page-title">Payroll</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Payroll Statement</li>
              </ul>
            </div>
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
            <div className="table-responsive">
              <form id="salary-slip">
               <table className="table table-striped">
                 <thead>
                   <tr className="text-center">
                    <th>#</th>
                    <th>Paid Date</th>
                    <th>Basic Pay</th>
                    <th>Incentive</th>
                    <th>Tax(-)</th>
                    <th>Deduction(-)</th>
                    <th>NetPay</th>
                    <th colSpan="2">Period</th>
                    <th>Transaction</th>
                    <th>Transaction Mode</th>
                   </tr>
                 </thead>
                 <tbody>
                  <tr className="text-center">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>From</td>
                    <td>To</td>
                    <td></td>
                    <td></td>
                  </tr>
                   {
                     payrolls !== null &&
                     payrolls.map((item,index) => {
                       return(
                         <tr key={index}>
                          <td><input type="checkbox" name="chkpayroll" id={item.id} className='foo' value={item.id}/></td>
                          <td>{item.dop}</td>
                          <td>{item.pay}</td>
                          <td>{item.incentive}</td>
                          <td>{item.tax}</td>
                          <td>{item.ded}</td>
                          <td>{Math.round(item.net)}</td>
                          <td>{item.period_frm}</td>
                          <td>{item.period_to}</td>
                          <td>{item.trans_id}</td>
                          <td>{item.trans_mode}</td>
                         </tr>
                       )
                     })
                   }
                   {
                     payrolls !== null &&
                     <tr className="active">
                          <td colSpan="2"><h4>Total</h4></td>
                          <td><h4>{ tot }</h4></td>
                          <td><h4>{ tot_inc }</h4></td>
                          <td><h4>{ tot_tax }</h4></td>
                          <td><h4>{ tot_ded }</h4></td>
                          <td><h4>{ Math.round(tot_net) }</h4></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                     </tr>
                   }
                 </tbody>
               </table>
               <button className="btn btn-success" onClick={this.clickPrint}>Print Salary Slip</button><br/><br/>
               <input type="checkbox" className="ml-1" id="all" onChange={this.changeAll}/> Select All
               </form>
            </div>
          </div>
        </div>
        }
       {apipayouts !== null &&
        apipayouts.map((item,index)=>{
          return(
         <div className="p-5"  key={index}>
          <div className="panel-body p-5" style={{backgroundColor : 'white'}}>
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="table-responsive" style={{align:'center'}}>
                    <div className="panel panel-primary ">
                      <div className="panel-heading bg-primary p-3">
                        <p className="text-center">
                            {address}
                        </p>
                      </div>
                    </div>
                    <hr />{console.log(item[0].emp.name)}
                    <h3 className="text-center text-uppercase">
                      <strong>Salary Statement</strong>
                    </h3>
                    <p>
                      <strong>Employee Name: </strong>
                      <span className="text-uppercase"> {item[0].emp.name} </span> 
                      <br/>
                      <strong>Designation : </strong>
                       {
                         this.state.posts.map((post,idx) => {
                           return(
                            item[0].emp.post_id === post.id &&
                            <span key={idx}>{post.post}</span>
                           )
                         })
                       }
                      <br />
                      {console.log(item[0])}
                      <strong>Month &amp; Year: </strong> {moment(item[0].period_frm).format('MM,Y')}  <br />
                    </p>
                    <br/>
                    <table className="table table-bordered">
                      <thead>
                        <tr className="active">
                          <th>Earning</th>
                          <th></th>
                          <th>Deduction</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>
                              <strong>Basic &amp; Pay</strong>
                            </td>
                            <td> {item[0].pay} </td>
                            <td>
                              <strong>Tax</strong>
                            </td>
                            <td> {item[0].tax} </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Incentive</strong>
                            </td>
                            <td> {item[0].incentive} </td>
                            <td>
                              <strong>Other Deduction</strong>
                            </td>
                            <td> {item[0].ded} </td>
                          </tr>
                          <tr className="cap">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                         
                            <td>
                              <strong>Total </strong>
                            </td>
                            <td>{parseFloat(item[0].pay) + parseFloat(item[0].incentive)}</td>
                            <td>
                              <strong>Total Deduction</strong>
                            </td>
                            <td>{parseFloat(item[0].tax) + parseFloat(item[0].ded)}</td>
                          </tr>
                          <tr>
                            <td colSpan="2"></td>
                            <td className="active">
                              <strong>Net Salary</strong>
                            </td>
                            <td className="active">
                              <strong>{item[0].net} </strong>
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  <br/>
                  <p className="text-capitalize">
                    {this.state.apiwords[index]}
                  </p>
                  <p>
                    <strong>Transaction Mode:</strong> {item[0].trans_mode} <br/>
                    <strong>Transaction #:</strong>  {item[0].trans_id}<br/>
                  </p>
                  <br />
                  <p>
                    <i>Thank you, Happy Spending</i>
                  </p>
                  <p>
                  </p>
                  <p className="text-left">
                    <strong>HR Manager</strong>
                  </p>
                  <h3><img src={Logo} /></h3>
                  <p></p>
                  <p align="right">
                    <small>Computer Generated Salary Slip,needs No Signature</small>
                  </p>
                  <br />
                  <div className="break"></div>
                  <br />
                </div>
              </div>
            </div>
          <div className="footer-main">
              Copyright &copy , 2021-22
          </div>
          </div>
        </div>
        
          )
        })
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
