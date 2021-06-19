import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {CORE} from '../../Contants';
import './sidebar.css';

class Sidebar extends Component {

   constructor(props){
     super(props);
     this.state ={
       admin_dashboard: false,
       employee_dashboard : true,
       photo : '',
       post : null,
       username : null
     }
     this.Logout = this.Logout.bind(this);
     this.loadUser = this.loadUser.bind(this);
   }

   Logout(e){
     e.preventDefault();
     localStorage.clear();
     this.props.history.push("/employee/login");
   }

   async loadUser(){
      var user = await localStorage.getItem('user');
      var type = await localStorage.getItem('type');
      user = JSON.parse(user);
      if(type === 'employee'){
        this.setState({
          photo : user.photo,
          post : user.post.post,
          username : user.name,
          admin_dashboard: false,
          employee_dashboard : true,
        })
      }
      else{
        this.setState({
          admin_dashboard: true,
          employee_dashboard : false,
        })
      }
   }

   componentDidMount(){
     this.loadUser();
   }
   render() {

    const {location } = this.props;
    const {photo,post,username,employee_dashboard} = this.state;
    let pathname = location.pathname

    return (
        <div className="sidebar" id="sidebar">
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu">
            {
              this.state.admin_dashboard ?
            <ul>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li><a className={pathname.includes('admin/dashboard') ?"active" :""} href="/admin/dashboard"><i className="la la-dashboard" /> <span> Dashboard</span> </a></li>
              <li><a className={pathname.includes('admin/employees') ?"active" :""} href="/admin/employees"><i className="la la-user" /> <span> All Employees</span> </a></li>
              <li className="submenu">
                <a href="#" onClick={() => {}}><i className="fa fa-plane" /> <span> Leave </span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><a className={pathname.includes('admin/leaves') ?"active" :""} href="/admin/leaves" style={{textDecoration: 'none'}}>Leave Request</a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#" onClick={() => {}}><i className="fa fa-clock-o" /> <span> TimeSheet </span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  {<li><a className={pathname.includes('admin/timesheet/report') ?"active" :""} href="/admin/timesheet/report" style={{textDecoration: 'none'}}> TimeSheet Report </a></li>}
                  <li><a className={pathname.includes('timesheets') ?"active" :""} href="/admin/timesheets" style={{textDecoration: 'none'}}> TimeSheet Logs </a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#" onClick={() => {}}><i className="fa fa-calendar" /> <span> Attendance </span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><a className={pathname.includes('guests') ?"active" :""} href="/admin/attendance/guests" style={{textDecoration: 'none'}}> Visitor Logs </a></li>
                  <li><a className={pathname.includes('attendances') ?"active" :""} href="/admin/attendances" style={{textDecoration: 'none'}}> Attendance Logs </a></li>
                  <li><a className={pathname.includes('attendance/report') ?"active" :""} href="/admin/attendance/report" style={{textDecoration: 'none'}}> Attendance Report </a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#" onClick={() => {}}><i className="fa fa-sitemap" /> <span> Company </span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  <li><a className={pathname.includes('admin/projects') ?"active" :""} href="/admin/projects" style={{textDecoration: 'none'}}> Projects </a></li>
                  <li><a className={pathname.includes('admin/company/dept') ?"active" :""} href="/admin/company/dept" style={{textDecoration: 'none'}}> Departments </a></li>
                  <li><a className={pathname.includes('admin/company/posting') ?"active" :""} href="/admin/company/posting" style={{textDecoration: 'none'}}> Designations </a></li>
                  <li><a className={pathname.includes('admin/company/hierarchy') ?"active" :""} href="/admin/company/hierarchy" style={{textDecoration: 'none'}}> Hieranchy Tree </a></li>
                </ul>
              </li>
              <li className="submenu">
                <a href="#" onClick={() => {}}><i className="la la-money" /> <span> Payroll </span> <span className="menu-arrow" /></a>
                <ul style={{display: 'none'}}>
                  {/* <li><a className={pathname.includes('payroll/table') ?"active" :""} href="/admin/payroll/table" style={{textDecoration: 'none'}}> Allowance & deduction settings</a></li> */}
                  <li><a className={pathname.includes('payroll/list') ?"active" :""} href="/admin/payroll/list" style={{textDecoration: 'none'}}> New Payment</a></li>
                  <li><a className={pathname.includes('admin/payroll/generate/payslip') ?"active" :""} href="/admin/payroll/generate/payslip" style={{textDecoration: 'none'}}> Generate Payslip </a></li>
                </ul>
              </li>
              <li><a className={pathname.includes('holidays') ?"active" :""} href="/admin/events" style={{textDecoration: 'none'}}><i className="fa fa-grav fa-xs" /> <span> Events </span> </a></li>
              <li><a className={pathname.includes('holidays') ?"active" :""} href="/admin/holidays" style={{textDecoration: 'none'}}><i className="fa fa-rocket fa-xs" /> <span> Holidays </span> </a></li>
              <li><a className={pathname.includes('clients') ?"active" :""} href="/admin/clients" style={{textDecoration: 'none'}}><i className="fa fa-user-secret fa-xs" /> <span> Clients </span> </a></li>
              <li><a className={pathname.includes('expenses') ?"active" :""} href="/admin/expenses" style={{textDecoration: 'none'}}><i className="fa fa-credit-card fa-xs" /> <span> Expenses </span> </a></li>
              <li><a className={pathname.includes('permissions') ?"active" :""} href="/admin/daily/allowances" style={{textDecoration: 'none'}}><i className="fa fa-car fa-xs" /> <span> Daily Allowances </span> </a></li>
            </ul>
            :
            <ul>
              <li><a className={pathname.includes('employee/dashboard') ? "active" :""} href="/employee/dashboard"><i className="la la-dashboard" /> <span> Dashboard</span> </a></li>
              <li><a className={pathname.includes('appointment-letter') ? "active" :""} href="/employee/appointment-letter"><i className="fa fa-file-o fa-xs" /> <span> Appointment Letter</span> </a></li>
              <li><a className={pathname.includes('attendance') ? "active" :""} href="/employee/attendance"><i className="fa fa-calendar fa-xs" /> <span> Attendence </span> </a></li>
              <li><a className={pathname.includes('timesheet') ? "active" :""} href="/employee/timesheet"><i className="fa fa-clock-o fa-xs" /> <span> TimeSheet </span> </a></li>
              <li><a className={pathname.includes('leave') ? "active" :""} href="/employee/leave"><i className="fa fa-road fa-xs" /> <span> Leave </span> </a></li>
              <li><a className={pathname.includes('payroll') ? "active" :""} href="/employee/payroll"><i className="fa fa-money fa-xs" /> <span> Payroll </span> </a></li>
              <li><a className={pathname.includes('expenses') ? "active" :""} href="/employee/exspenses"><i className="fa fa-credit-card fa-xs" /> <span> Expenses </span> </a></li>
              <li><a className={pathname.includes('allowances') ?"active" :""} href="/employee/daily/allowances" style={{textDecoration: 'none'}}><i className="fa fa-car fa-xs" /> <span> Daily Allowances </span> </a></li>
               <li><a className={pathname.includes('holidays') ?"active" :""} href="/employee/events" style={{textDecoration: 'none'}}><i className="fa fa-grav fa-xs" /> <span> Events </span> </a></li>
              <li><a className={pathname.includes('holidays') ?"active" :""} href="/employee/holidays" style={{textDecoration: 'none'}}><i className="fa fa-rocket fa-xs" /> <span> Holidays </span> </a></li>
              <li><a className={pathname.includes('clients') ?"active" :""} href="/employee/clients" style={{textDecoration: 'none'}}><i className="fa fa-user-secret fa-xs" /> <span> Clients </span> </a></li>
              <li onClick={(e) => this.Logout(e)}><a className={pathname.includes('logout') ?"active" :""} href="#"><i className="fa fa-sign-out fa-xs" /> <span> Logout </span> </a></li>
            </ul>
            }
          </div>
        </div>
      </div>

      );
   }
}

export default withRouter(Sidebar);
