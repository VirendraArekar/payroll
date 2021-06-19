import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import RegistrationPage from './RegistrationPage'
// import ForgotPassword from './forgotpassword'
import ForgotPassword from '../Screens/Employee/ForgotPassword';
import OTP from './otp'
import LockScreen from './lockscreen'

import ApplyJobs from './ApplyJob';

//Main App
import DefaultLayout from './Sidebar/DefaultLayout';
import Settinglayout from './Sidebar/Settinglayout';
import Tasklayout from './Sidebar/tasklayout';
import Emaillayout from './Sidebar/emaillayout';
import chatlayout from './Sidebar/chatlayout';

import uicomponents from '../MainPage/UIinterface/components';
//Error Page
import Error404 from '../MainPage/Pages/ErrorPage/error404';
import Error500 from '../MainPage/Pages/ErrorPage/error500';

import Leave from '../Screens/Leave/Leave';
import Report  from '../Screens/Leave/Report';
import TimeSheetReport  from '../Screens/TimeSheet/TimeSheetReport';
import TimeSheetLog from '../Screens/TimeSheet/TimeSheetLog';
import Guest from '../Screens/Attendance/Guest';
import Attendance from '../Screens/Attendance/Attendance';
import AttendanceReport  from '../Screens/Attendance/AttendanceReport';
import CalendarView  from '../Screens/Attendance/CalendarView';
import Dept from '../Screens/Company/Dept';
import Designations from '../Screens/Company/Designations';
import Hierarchy from '../Screens/Company/Hierarchy';
import Payroll from '../Screens/Payroll/Payroll';
import Slip from '../Screens/Payroll/Slip';
import Letter from '../Screens/Employee/Letter';
import Presenty from '../Screens/Employee/Presenty';
import TimeSheet from '../Screens/Employee/TimeSheet';
import Leaves from '../Screens/Employee/Leaves';
import Payrolls from '../Screens/Employee/Payrolls';
import Login from '../Screens/Employee/Login';
import Dashboard  from '../Screens/Employee/Dashboard';
import Expenses from '../Screens/Expenses';
import EmployeeProfile from '../Screens/Employee/EmployeeProfile';
import PrivateRoute from '../Actions/PrivateRoute';
import AdminPrivateRoute from '../Actions/AdminPrivateRoute';
import LoginPage  from '../Screens/LoginPage';
import AdminDashboard from '../Screens/AdminDashboard';
import EmployeeList from '../Screens/EmployeeList';
import Landing from '../Screens/Landing';
import EmpExspenses from '../Screens/Employee/EmpExpenses';
import AuthPermit from '../Screens/AuthPermit';
import Allowances from '../Screens/Allowances';
import Clients from '../Screens/Clients';
import EmpClients from '../Screens/Employee/EmpClients';
import EmpAllowances from '../Screens/Employee/EmpAllowances';
import Settings from '../Screens/Settings';
import Profile from '../Screens/Profile';
import Salary from '../Screens/Salary';
import EmpPayroll from '../Screens/Employee/EmpPayroll';
import Payslips from '../Screens/Payslips';
import AdminPayslips from '../Screens/Payslips';
import Holiday from '../Screens/Holiday';
import Holidays from '../Screens/Employee/Holidays';
import AllPayslip from '../Screens/AllPayslip';
import Reset from '../Screens/Employee/Reset';
import  AdminAllowance from '../Screens/AdminAllowance';
import MonthAllowance from '../Screens/Employee/MonthAllowance';
import NewPayment from '../Screens/PayrollList';
// import NewPayment from '../Screens/NewPayment';
import Slips from '../Screens/Slips';
import EmpPayslip from '../Screens/Employee/EmpPayslip'
import Demo from '../Screens/Demo';
import AllowDeductTable from '../Screens/AllowDeductTable';
import Project from '../Screens/Project';
import Event from '../Screens/AdminEvent';
import EmpEvent from '../Screens/Employee/EmpEvent';
// import 'Assets/css/font-awesome.min.css';

import $ from 'jquery';

export default class App extends Component {
    componentDidMount(){
        if (location.pathname.includes("login") || location.pathname.includes("register") || location.pathname.includes("forgotpassword")
        || location.pathname.includes("otp")|| location.pathname.includes("lockscreen") ) {
            $('body').addClass('account-page');
        }else if (location.pathname.includes("error-404") || location.pathname.includes("error-500") ) {
            $('body').addClass('error-page');
        }
    }
       render(){
            const { location, match, user } = this.props;
            return (
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/employee/forgot/password" component={ForgotPassword} />
                    <Route exact path="/employee/reset/password" component={Reset} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/otp" component={OTP} />
                    <Route exact path="/lockscreen" component={LockScreen} />
                    <Route exact path="/applyjob" component={ApplyJobs} />
                    <Route exact path="/admin/login" component={LoginPage} />
                    <AdminPrivateRoute exact path="/admin/dashboard" component={AdminDashboard} />
                    <AdminPrivateRoute exact path="/admin/employees" component={EmployeeList} />
                    <AdminPrivateRoute exact path="/admin/leaves" component={Leave} />
                    <AdminPrivateRoute exact path="/admin/leave/report" component={Report} />
                    <AdminPrivateRoute exact path="/admin/timesheet/report" component={TimeSheetReport} />
                    <AdminPrivateRoute exact path="/admin/timesheets" component={TimeSheetLog} />
                    <AdminPrivateRoute exact path="/admin/attendance/guests" component={Guest} />
                    <AdminPrivateRoute exact path="/admin/attendances" component={Attendance} />
                    <AdminPrivateRoute exact path="/admin/attendance/report" component={AttendanceReport} />
                    <AdminPrivateRoute exact path="/admin/attendance/calendar" component={CalendarView} />
                    <AdminPrivateRoute exact path="/admin/company/dept" component={Dept} />
                    <AdminPrivateRoute exact path="/admin/company/dept/edit/" component={Dept} />
                    <AdminPrivateRoute exact path="/admin/company/posting" component={Designations} />
                    <AdminPrivateRoute exact path="/admin/company/hierarchy" component={Hierarchy} />
                    {/* <AdminPrivateRoute exact path="/admin/daily/allowances" component={Allowances} /> */}
                    <AdminPrivateRoute exact path="/admin/daily/allowances" component={AdminAllowance} />
                    <AdminPrivateRoute exact path="/admin/show/allowances/:month/:year/:emp_id" component={Allowances} />
                    <AdminPrivateRoute exact path="/admin/expenses" component={Expenses} />
                    <AdminPrivateRoute exact path="/admin/payroll" component={Payroll} />
                    <AdminPrivateRoute exact path="/admin/payslip/:id" component={AdminPayslips} />
                    <AdminPrivateRoute exact path="/admin/payroll/salary" component={Salary} />
                    {/* new */}
                    <AdminPrivateRoute exact path="/admin/payroll/list" component={NewPayment} />
                    <AdminPrivateRoute exact path="/admin/payroll/generate/payslip" component={Slips} />
                    <AdminPrivateRoute exact path="/admin/payroll/table" component={AllowDeductTable} />
                    <AdminPrivateRoute exact path="/admin/payroll/demo" component={Demo} />
                    {/* <AdminPrivateRoute exact path="/admin/statement" component={Slip} /> */}
                    <AdminPrivateRoute exact path="/admin/statement" component={AllPayslip} />
                    <AdminPrivateRoute exact path="/admin/permissions" component={AuthPermit} />
                    <AdminPrivateRoute exact path="/admin/clients" component={Clients} />
                    <AdminPrivateRoute exact path="/admin/company/settings" component={Settings} />
                    <AdminPrivateRoute exact path="/admin/employee/profile/:id" component={Profile} />
                    <AdminPrivateRoute exact path="/admin/holidays" component={Holiday} />
                    <AdminPrivateRoute exact path="/admin/projects" component={Project} />
                    <AdminPrivateRoute exact path="/admin/events" component={Event} />
                    {/* Employee */}
                    <Route exact path="/employee/login" component={Login} />
                    <PrivateRoute exact path="/employee/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/employee/appointment-letter" component={Letter} />
                    <PrivateRoute exact path="/employee/attendance" component={Presenty} />
                    <PrivateRoute exact path="/employee/timesheet" component={TimeSheet} />
                    <PrivateRoute exact path="/employee/leave" component={Leaves} />
                    {/* <PrivateRoute exact path="/employee/payroll" component={Payrolls} /> */}
                    <PrivateRoute exact path="/employee/payroll" component={EmpPayslip} />
                    <PrivateRoute exact path="/employee/events" component={EmpEvent} />
                    <PrivateRoute exact path="/employee/profile" component={EmployeeProfile} />
                    <PrivateRoute exact path="/employee/exspenses" component={EmpExspenses} />
                    <PrivateRoute exact path="/employee/clients" component={EmpClients} />
                    <PrivateRoute exact path="/employee/daily/allowances" component={EmpAllowances} />
                    <PrivateRoute exact path="/employee/show/allowances/:month/:year" component={MonthAllowance} />
                    <PrivateRoute exact path="/employee/holidays" component={Holidays} />
                    <PrivateRoute exact path="/employee/salary/:id" component={Payslips} />
                    <Route exact path="/app" component={DefaultLayout} />
                    <Route exact path="/settings" component={Settinglayout} />
                    <Route exact path="/tasks" component={Tasklayout} />
                    <Route exact path="/email" component={Emaillayout} />
                    <Route exact path="/conversation" component={chatlayout} />
                    <Route exact path="/ui-components" component={uicomponents} />
                    <Route  path="/" component={Error404} />
                    <Route path="/error-500" component={Error500} />
                </Switch>
            )
        }
         
}
