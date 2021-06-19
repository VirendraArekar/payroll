import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { withRouter } from 'react-router-dom';
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import "../../MainPage/index.css";
import moment from 'moment';
import {API_URL,EMPLOYEE_DASHBOARD, FRONT_URL} from '../../Contants';


import {BarChart,Bar, Cell,ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

 class Dashboard extends Component {
   constructor(props){
       super(props);
       this.state = {
          allowances : null,
          exspenses : null,
          leaves : null
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
     var user = await localStorage.getItem('user');
     var id = JSON.parse(user).id;
     var fetchDashboard = await fetch(API_URL+EMPLOYEE_DASHBOARD+id)
     .then(res => res.json());
     if(fetchDashboard.success){
         this.setState({
           allowances : fetchDashboard.data['allowances'],
           exspenses : fetchDashboard.data['exspenses'],
           leaves : fetchDashboard.data['leaves'] 
         });
     }
   }


   componentDidMount(){
     this.loadDashboard();
   }
 
    render() {
    const {leaves, allowances, exspenses} = this.state;
  

       return (
        <div className="main-wrapper">  
           <Header/> 
        <div>
          <div className="page-wrapper">
              <Helmet>
                     <title>Employee Dashboard - HRMS Admin Template</title>
                     <meta name="description" content="Dashboard"/>					
             </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
           {/* Page Header */}
           <div className="page-header">
             <div className="row">
               <div className="col-sm-12">
                 <h3 className="page-title">Welcome Karthik swot!</h3>
                 <ul className="breadcrumb">
                   <li className="breadcrumb-item active">Dashboard</li>
                 </ul>
               </div>
             </div>
           </div>
           {/* /Page Header */}
           <div className="row">
             <div className="col-sm-12 col-md-4 col-xl-4 col-4">
               <div className="p-2 border rounded">
                 <h4 className="text-center">Leaves</h4>
                 {leaves !== null &&
                   <table className="table table-striped">
                     <thead>
                      <tr>
                        <th>Day</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                     </thead>
                     <tbody>
                      {leaves.map((item,index) => {
                        return(
                          <tr key={index}>
                            <td>{moment(item.start_date).format('D MMM Y')}</td>
                            <td>{item.reason}</td>
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
                      })}
                      </tbody>
                    </table>
                 }
                 <div className="text-center p-1">
                       <a className="btn-default btn-sm rounded p-1" href={FRONT_URL+'employee/leave'} target="_blank">Load More</a>
                 </div>
               </div>
             </div>
             <div className="col-sm-12 col-md-4 col-xl-4 col-4">
               <div className="p-2 border rounded">
               <h4 className="text-center">Exspense Claim</h4>
                {exspenses !== null &&
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                  {exspenses.map((item,index) => {
                        return(
                          <tr key={index}>
                            <td>{item.item}</td>
                            <td>{item.amount}</td>
                            <td>
                              {
                                item.status === 0 &&
                                <span className="badge badge-primary">Pending</span>
                              }
                              {
                                item.status === 1 &&
                                <span className="badge badge-info">Active</span>
                              }
                              {
                                item.status === 2 &&
                                <span className="badge badge-success">Approved</span>
                              }
                            </td>
                          </tr>
                        )
                      })}
                     </tbody>
                  </table>
                }
                <div className="text-center p-1">
                       <a className="btn-default btn-sm rounded p-1" href={FRONT_URL+'employee/exspenses'} target="_blank">Load More</a>
                </div>
               </div>
             </div>
             <div className="col-sm-12 col-md-4 col-xl-4 col-4">
               <div className="p-2 border rounded">
               <h4 className="text-center">Allowance Claim</h4>
               {allowances !== null &&
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Job No.</th>
                        <th>Bonus</th>
                        <th>Per Diem</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                  {allowances.map((item,index) => {
                        return(
                          <tr key={index}>
                            <td>{item.job_no}</td>
                            <td>{item.bonus}</td>
                            <td>{item.per_diem}</td>
                            <td>
                              {
                                item.status === 0 &&
                                <span className="badge badge-primary">Pending</span>
                              }
                              {
                                item.status === 1 &&
                                <span className="badge badge-info">Active</span>
                              }
                              {
                                item.status === 2 &&
                                <span className="badge badge-success">Approved</span>
                              }
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                }
                <div className="text-center p-1">
                       <a className="btn-default btn-sm rounded p-1" href={FRONT_URL+'employee/daily/allowances'} target="_blank">Load More</a>
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
 
 export default withRouter(Dashboard);
 