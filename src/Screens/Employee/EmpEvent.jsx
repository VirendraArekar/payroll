
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import { Avatar_04, Avatar_03,PlaceHolder} from "../../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import $ from 'jquery';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);



import {
    ADMIN_EVENT_LIST,
    CORE,
    API_URL
} from '../../Contants';


class EmpEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
       events : null,
       event : null,    
    };
    this.loadEvents = this.loadEvents.bind(this);
  }

  async loadEvents(){
     var fetchData = await fetch(API_URL+ADMIN_EVENT_LIST).then(res => res.json());
     if(fetchData.code === 200){
        this.setState({
            events : fetchData.data.length > 0 ? fetchData.data : []
        });
     }
  }

 

  componentDidMount(){
      this.loadEvents();
  }


   render() {

    const {
    	events, 
    	event, 
    } = this.state;
    var allevents = [];
    if(events !== null){
        for(var i = 0; i < events.length; i++){
           allevents.push({
               title : events[i].title,
               allDay : events[i].allday ? true : false,
               start : new Date(events[i].start),
               end : new Date(events[i].end)
           });
        }
    }

      return ( 
        <div className="main-wrapper">  
          <Header/> 
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Events - HRMS Employee Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Events</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Events</li>
                </ul>
              </div>
             
            </div>
          </div>
          <div className="row">
            <div className="col-md-7 p-2" style={{ height: '500pt', backgroundColor : 'white'}}>
               <Calendar
                events={allevents}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
               />

            </div>
            <div className="col-md-5 p-2">
               <h4 className="text-center">Event List</h4>
               <table className="table table-striped text-center" style={{background : 'white'}}>
                   <thead>
                      <tr>
	                       <th>Event</th>
	                       <th>Start</th>
	                       <th>End</th>
	                   </tr>
                   </thead>
                   <tbody>
                   {
                       events !== null &&
                       events.map((item,index) => {
                           return(
                            <tr key={index}>
                                <td className="text-secondary text-left">
                                  <span className="badge badge-info p-2">
                                    {item.title}
                                  </span>
                                </td>
                                <td className="text-dark text-center">
                                  <span className="badge badge-dark p-2">
                                    {moment(item.start).format('D MMM Y')}
                                  </span>
                                </td>
                                 <td className="text-dark text-center">
                                  <span className="badge badge-dark p-2">
                                    {moment(item.end).format('D MMM Y')}
                                  </span>
                                </td>
                            </tr>
                           )
                       })
                   }
                 </tbody>
               </table>
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

export default EmpEvent;
