/**
 * App Header
 */
import { preventDefault } from '@fullcalendar/common';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {headerlogo,Avatar_21, Avatar_01} from '../../Entryfile/imagepath';
import {CORE} from '../../Contants';
import $ from 'jquery';

class Header extends Component {
   constructor(props){
     super(props);
     this.state = {
       photo : '',
       post : '',
       username : '',
       employee_dashboard : '',
       admin_dashboard : ''
     }

     this.clickLogout = this.clickLogout.bind(this);
     this.loadUser = this.loadUser.bind(this);
     
   }

   async clickLogout(e){
     e.preventDefault();
     let type = await localStorage.getItem('type');
     if(type === 'employee'){
       localStorage.clear();
      this.props.history.push("/employee/login");
     }
     else{
      localStorage.clear();
      this.props.history.push("/admin/login");
     }
   }

   async loadUser(){
    var user = await localStorage.getItem('user');
    var type = await localStorage.getItem('type');
    user = JSON.parse(user);
    if(type === 'employee'){
      this.setState({photo : user.photo});
      this.setState({post : user.post.post});
      this.setState({username : user.name});
      this.setState({
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
    const {  location } = this.props
    let pathname = location.pathname
    
      return (
         <div className="header" style={{right:"0px"}}>
        {/* Logo */}
        <div className="header-left">
          <a href="/orange/app/main/dashboard" className="logo">
            <img src={headerlogo} width={40} height={40} alt="" />
          </a>
        </div>
        {/* /Logo */}
        <a id="toggle_btn" href="" style={{display: pathname.includes('tasks') ?"none" :pathname.includes('compose') ? "none" :""}} >
          <span className="bar-icon"><span />
            <span />
            <span />
          </span>
        </a>
        {/* Header Title */}
        {/* <div className="page-title-box">
          <h3>Dreamguy's Technologies</h3>
        </div> */}
        {/* /Header Title */}
        <a id="mobile_btn" className="mobile_btn" href="#sidebar"><i className="fa fa-bars" /></a>
        {/* Header Menu */}
        <ul className="nav user-menu">
          {/* Search */}
          {/* <li className="nav-item">
            <div className="top-nav-search">
              <a href="" className="responsive-search">
                <i className="fa fa-search" />
              </a>
              <form action="/orange/app/pages/search">
                <input className="form-control" type="text" placeholder="Search here" />
                <button className="btn" type="submit"><i className="fa fa-search" /></button>
              </form>
            </div>
          </li> */}
          {/* /Search */}
          {/* Flag */}
          {/* <li className="nav-item dropdown has-arrow flag-nav">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button">
              <img src={lnEnglish} alt="" height={20} /> <span>English</span>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
            <a href="" className="dropdown-item">
                    <img src={lnEnglish} alt="" height={16} /> English
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnFrench} alt="" height={16} /> French
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnSpanish} alt="" height={16} /> Spanish
                  </a>
                  <a href="" className="dropdown-item">
                    <img src={lnGerman} alt="" height={16} /> German
                  </a>
            </div>
          </li> */}
          {/* /Flag */}
          {/* Notifications */}
          {/* <li className="nav-item dropdown">
            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
              <i className="fa fa-bell-o" /> <span className="badge badge-pill">3</span>
            </a>
            <div className="dropdown-menu notifications">
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="" className="clear-noti"> Clear All </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="/orange/app/administrator/activities">
                      <div className="media">
                        <span className="avatar">
                          <img alt="" src={Avatar_02} />
                        </span>
                        <div className="media-body">
                          <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                          <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                        </div>
                      </div>
                    </a>
                  </li>
                  
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="/orange/app/administrator/activities">View all Notifications</a>
              </div>
            </div>
          </li> */}
          {/* /Notifications */}
          {/* Message Notifications */}
          
          {/* /Message Notifications */}
          <li className="nav-item dropdown has-arrow main-drop">
            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
              <span className="user-img">
                
                {
                  this.state.employee_dashboard &&
                  
                    this.state.photo !== '' &&
                    <img src={CORE+'uploads/photo/'+this.state.photo} width="30" className="m-2 circle"/>
                }
                {
                   this.state.admin_dashboard &&
                   <img src={Avatar_01} alt="" />
                }
                <span className="status online" /></span>
                {
                  this.state.employee_dashboard &&
                   <span>&nbsp;{this.state.username}</span>
                }
                {
                   this.state.admin_dashboard &&
                   <span>&nbsp;Admin</span>
                }
              
            </a>
            <div className="dropdown-menu">
              {
                this.state.employee_dashboard &&
                <a className="dropdown-item" href="/employee/profile">My Profile</a>
              }
                
              {
                this.state.admin_dashboard &&
                <a className="dropdown-item" href="/admin/company/settings">Settings</a>
              }
              <a className="dropdown-item"   onClick={(e) => this.clickLogout(e)}>Logout</a>
            </div>
          </li>
        </ul>
        {/* /Header Menu */}
        {/* Mobile Menu */}
        <div className="dropdown mobile-user-menu">
          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v" /></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="/employee/profile">My Profile</a>
            {
                this.state.admin_dashboard &&
                <a className="dropdown-item" href="/admin/company/settings">Settings</a>
            }
            <a className="dropdown-item"  onClick={(e) => this.clickLogout(e)}>Logout</a>
          </div>
        </div>
        {/* /Mobile Menu */}
      </div>
       
      );
   }
}

export default withRouter(Header);