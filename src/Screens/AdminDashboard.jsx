import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { withRouter } from 'react-router-dom';
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import "../MainPage/index.css";
import moment from 'moment';
import {API_URL,ADMIN_DASHBOARD, FRONT_URL,CORE} from '../Contants';
import { isEmptyObject } from 'jquery';

 class AdminDashboard extends Component {
   constructor(props){
       super(props);
       this.state = {
         leave : null,
         absences : null,
         exspenses : null,
         allowances : null,
         payrolls : null,
         payroll : null,
         exspense : null,
         allowance : null
       }
       this.loadDashboard = this.loadDashboard.bind(this);
   }
   UNSAFE_componentWillMount (){
     let firstload = localStorage.getItem("firstload")
     if(firstload === "true"){
         setTimeout(function() {
           window.location.reload(1)
           localStorage.removeItem("firstload")
         },1000)
     }
   }

   async loadDashboard(){
     var fetchDashboard = await fetch(API_URL+ADMIN_DASHBOARD)
     .then(res => res.json());
     if(fetchDashboard.success){
       this.setState({
        leave : fetchDashboard.data['leave'],
        absences : fetchDashboard.data['absences'],
        exspenses : fetchDashboard.data['exspenses'],
        allowances : fetchDashboard.data['allowances'],
        payrolls : fetchDashboard.data['payrolls'],
        payroll : fetchDashboard.data['payroll'],
        exspense : fetchDashboard.data['exspense'],
        allowance : fetchDashboard.data['allowance'],
       })
     }
   }


   componentDidMount(){
     this.loadDashboard();
   }
 
    render() {
      const {leave,absences,exspenses,allowances,payrolls,exspense,allowance,payroll} = this.state;
       var leaveper = '0%';
       var exspenseper = '0%';
       var payrollper = '0%';
       var allowanceper = '0%';
       if(leave !== null){
        leaveper = parseInt(leave['approved_leave']/leave['total_leave'] * 100) + '%';
       }
       if(exspense !== null){
        exspenseper = parseInt(exspense['approved']/exspense['total'] * 100) + '%';
       }
       if(payroll !== null){
        payrollper = parseInt(payroll['approved']/payroll['total'] * 100) + '%';
       }
       if(allowance !== null){
        allowanceper = parseInt(allowance['approved']/allowance['total'] * 100) + '%';
       }
       return (
        <div className="main-wrapper">  
           <Header/> 
        <div>
          <div className="page-wrapper">
              <Helmet>
                     <title>Admin Dashboard - HRMS Admin Template</title>
                     <meta name="description" content="Dashboard"/>					
             </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
           {/* Page Header */}
           <div className="page-header">
             <div className="row">
               <div className="col-sm-12">
                 <h3 className="page-title">Welcome Admin!</h3>
                 <ul className="breadcrumb">
                   <li className="breadcrumb-item active">Dashboard</li>
                 </ul>
               </div>
             </div>
           </div>
           <div className="row row-eq-height">
                <div className="col-sm-12 col-md-4 col-xl-4  ">
                   <div className="py-3 px-3 bg-light m-1 h-100 w-100 border rounded">
                     <h4 className="mb-2">Statistics</h4>
                    <div className=" p-1 border rounded" >
                      <div>
                        <label>Today Leave</label>
                        <span className="float-right">
                          {leave !== null &&
                            <span>{leave['approved_leave']}/{leave['total_leave']}</span>
                          }
                        </span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary progress-bar-striped" role="progressbar" style={{width: `${leaveper}`}} aria-valuenow={parseInt(leaveper.replace('%',''))} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="border rounded p-1 mt-1" >
                      <div>
                        <label>Today Exspenses</label>
                        <span className="float-right">
                          {exspense !== null &&
                            <span>{exspense['approved']}/{exspense['total']}</span>
                          }
                        </span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info progress-bar-striped" role="progressbar" style={{width: `${exspenseper}`}} aria-valuenow={parseInt(exspenseper.replace('%',''))} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="border rounded p-1 mt-1" >
                      <div>
                        <label>Today Payrolls</label>
                        <span className="float-right">
                          {payroll !== null &&
                            <span>{payroll['approved']}/{payroll['total']}</span>
                          }
                        </span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-danger progress-bar-striped" role="progressbar" style={{width: `${payrollper}`}} aria-valuenow={parseInt(payrollper.replace('%',''))} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                    <div className="border rounded p-1 mt-1" >
                      <div>
                        <label>Today Allowances</label>
                        <span className="float-right">
                          {allowance !== null &&
                            <span>{allowance['approved']}/{allowance['total']}</span>
                          }
                        </span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success progress-bar-striped" role="progressbar" style={{width: `${allowanceper}`}} aria-valuenow={parseInt(allowanceper.replace('%',''))} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                   </div>
                </div>
                <div className="col-sm-12 col-md-4 col-xl-4 ">
                   <div className="py-3 px-3 bg-light  mx-2 n-100 border rounded">
                     <h4 className="mb-2 mt-1">Today Absense</h4>
                     
                     {
                       absences  !== null ?
                       absences.map((item,index) => {
                         return(
                          <div className="border rounded px-4 py-1 mt-1" key={index}>
                              <img src={item.emp.photo !== 'null' ? CORE+'uploads/photo/'+item.emp.photo : 'https://via.placeholder.com/150'} className="circle" style={{width:70}}/>
                              <span className="float-right mt-4" style={{fontSize:16}}>{item.name}</span>
                              <div>
                                <span className="mt-1" style={{fontSize : 18}}>{moment().format('DD MMM Y')}</span>
                                {
                                  item.status === 0 &&
                                  <span className="float-right badge badge-primary">Pending</span>
                                }
                                {
                                  item.status === 1 &&
                                  <span className="float-right badge badge-success">Approved</span>
                                }
                                 {
                                  item.status === 2 &&
                                  <span className="float-right badge badge-danger">Rejected</span>
                                }
                              </div>
                              <h6>Leave Date</h6>
                          </div>
                         )
                       }) 
                     :
                     <h4 className="text-center mt-5">No Records</h4>
                     }
                     <div className="text-center p-1">
                       <a className="btn-default btn-sm rounded p-1" href={FRONT_URL+'admin/leaves'} target="_blank">Load More</a>
                     </div>
                   </div>
                  
                </div>

                <div className="col-sm-12 col-md-4 col-xl-4  ">
                   <div className="py-3 px-3 bg-light mx-2 border rounded h-100">
                     <h4 className="mb-2 mt-1">Pending Expenses</h4>
                     <div className="border rounded p-2">
                        {
                          exspenses !== null &&
                          <table className="table table-sm table-striped text-center">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>From</th>
                                <th>Payment</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                            
                            {exspenses.map((item,index) => {
                              return(
                                <tr key={index}>
                                  <td>{item.item}</td>
                                  <td>{item.purchase_from}</td>
                                  <td>{item.paid_by}</td>
                                  <td>
                                  {
                                    item.status === 0 &&
                                    <span className="float-right badge badge-primary">Pending</span>
                                  }
                                  {
                                    item.status === 2 &&
                                    <span className="float-right badge badge-success">Approved</span>
                                  }
                                  {
                                    item.status === 1 &&
                                    <span className="float-right badge badge-info">Active</span>
                                  }
                                  </td>
                                </tr>
                              )
                            })
                            }
                            </tbody>
                          </table>
                        }
                     </div>
                     <div className="text-center p-2">
                       <a className="btn-default btn-sm rounded p-1" href={FRONT_URL+'admin/expenses'} target="_blank">Load More</a>
                     </div>
                   </div>
                  
                </div>
           </div>
           <div className="row mt-3 row-eq-height">
                <div className="col-sm-12 col-md-6 col-xl-6  ">
                   <div className="py-3 px-3 bg-light mx-2 h-100 border rounded">
                     <h4 className="mb-2 mt-1">Payrolls</h4>
                     <div className="border rounded p-2">
                       {
                         payrolls !== null &&
                            <table className="table table-striped text-center">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Basic</th>
                                  <th>Month & Year</th>
                                  <th>Contact</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                             
                                {
                                payrolls.map((item,index) => {
                                  return(
                                    <tr key={index}>
                                    <td>{item.emp.name}</td>
                                    <td>{item.emp.salary}</td>
                                    <td>{moment(item.period_frm).format('MMM, Y')}</td>
                                    <td>{item.emp.mobile}</td>
                                    <td>
                                      {
                                        item.status === 0 &&
                                        <span className="badge badge-primary">Pending</span>
                                      }
                                      {
                                        item.status === 1 &&
                                        <span className="badge badge-success">Approved</span>
                                      }
                                      {
                                        item.status === 2 &&
                                        <span className="badge badge-danger">Rejected</span>
                                      }
                                    </td>
                                  </tr>
                                  )
                                })
                                }
                                </tbody>
                          </table>
                        
                       }
                       <div className="text-center p-1">
                         <a className="btn-default rounded p-1" href={FRONT_URL+'admin/payroll/salary'} target="_blank">Load More</a>
                       </div>
                     </div>
                   </div>
                </div>
                <div className="col-sm-12 col-md-6 col-xl-6  ">
                   <div className="py-3 px-3 bg-light mx-2 h-100 border rounded">
                     <h4 className="mb-2 mt-1">Allowance Claims</h4>
                     <div className="border rounded p-2">
                       {
                         allowances !== null &&
                         <table className="table table-striped text-center">
                           <thead>
                            <tr>
                              <th>Name</th>
                              <th>Client</th>
                              <th>Bonus</th>
                              <th>Status</th>
                            </tr> 
                           </thead>
                           <tbody>
                            {
                              allowances.map((item,index) => {
                                return(
                                  <tr key={index}>
                                    <td>{item.emp.name}</td>
                                    <td>{item.client.name}</td>
                                    <td>${item.bonus}</td>
                                    <td>
                                    {
                                      item.status === 0 &&
                                      <span className="float-right badge badge-primary">Pending</span>
                                    }
                                    {
                                      item.status === 2 &&
                                      <span className="float-right badge badge-success">Approved</span>
                                    }
                                    {
                                      item.status === 1 &&
                                      <span className="float-right badge badge-info">Active</span>
                                    }
                                    </td>
                                  </tr>
                                )
                              })
                            }
                            </tbody>
                        </table>
                       }
                       <div className="text-center p-1">
                         <a className="btn-default rounded p-1" href={FRONT_URL+'admin/daily/allowances'} target="_blank" target="_blank">Load More</a>
                       </div>
                     </div>
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
 
 export default withRouter(AdminDashboard);
 