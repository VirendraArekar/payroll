
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
    ADMIN_HOLIDAY_LIST,
    API_URL
} from '../../Contants';



class Holidays extends Component {
  constructor(props) {
    super(props);
    this.state = {
       holidays : null,   
    };
    
    this.loadHolidays = this.loadHolidays.bind(this);
  }

  async loadHolidays(){
     var fetchData = await fetch(API_URL+ADMIN_HOLIDAY_LIST).then(res => res.json());
     if(fetchData.code === 200){
        this.setState({
            holidays : fetchData.data.length > 0 ? fetchData.data : []
        });
     }
  }


  componentDidMount(){
      this.loadHolidays();
  }

 

   render() {

    const {holidays} = this.state;
    var events = [];
    if(holidays !== null){
        for(var i = 0; i < holidays.length; i++){
           events.push({
               title : holidays[i].title,
               allDay : holidays[i].allday ? true : false,
               start : new Date(holidays[i].start),
               end : new Date(holidays[i].end)
           });
        }
    }

      return ( 
        <div className="main-wrapper">  
          <Header/> 
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Holidays - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Holidays</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Holidays</li>
                </ul>
              </div>
              {/* <div className="col-auto float-right ml-auto">
                <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_holiday"><i className="fa fa-plus" /> Add Holiday</a>
              </div> */}
            </div>
          </div>
          {/* /Page Header */}
         
          <div className="row">
            <div className="col-md-8 p-2" style={{ height: '500pt', backgroundColor : 'white'}}>
               <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
               />

            </div>
            <div className="col-md-4 p-2">
               <h4 className="text-center">Holiday List</h4>
               <table className="table table-striped text-center" style={{backgroundColor : 'white'}}>
                   <tr>
                       <th>Event</th>
                       <th>Date</th>
                   </tr>
                   {
                       holidays !== null &&
                       holidays.map((item,index) => {
                           return(
                            <tr key={index}>
                                <td className="text-center">
                                  <span className="badge badge-info p-2">
                                     {item.title}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className="badge badge-dark p-2">
                                     {moment(item.start).format('D MMM Y')}
                                  </span>
                                </td>
                            </tr>
                           )
                       })
                   }
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

export default Holidays;
