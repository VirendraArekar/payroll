
import React, { Component } from 'react';
import { Helmet } from "react-helmet";

import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
import {API_URL,ADMIN_ATTENDANCE_DATEVIEW} from '../../Contants';


class CalendarView extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      userEvents : null,
      events :  []
    };

    this.myEventsList = this.myEventsList.bind(this);
  }

  async clickGenerate(e){
  }



  changeStartDate(event){
    this.setState({start_date : event.target.value});
  }

  changeEndDate(event){
    this.setState({end_date : event.target.value});
  }

  async myEventsList(e){
    var eventData =  await fetch(API_URL+ADMIN_ATTENDANCE_DATEVIEW)
    .then(res=>res.json());
    if(eventData.success){
      this.setState({
        myEventsList : eventData.data
      })
    }
  }

  componentDidMount(){
    this.myEventsList();
  }

   render() {
     const {myEventsList} = this.state;
     var events = [];
     if(Array.isArray(myEventsList)){
     
       for(var i = 0; i < myEventsList.length ; i++){
         events.push({
          title : myEventsList[i].emp.name,
          allDay : false,
          start : new Date(myEventsList[i].work_in),
          end : new Date(myEventsList[i].work_out)
         })
       }
     }
      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Calendar View - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Calendar View</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Calendar View</li>
              </ul>
            </div>
           
          </div>
        </div>
        {/* /Page Header */}
        <div  style={{ height: '500pt'}}>
        <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
        
      </div>
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default CalendarView;
