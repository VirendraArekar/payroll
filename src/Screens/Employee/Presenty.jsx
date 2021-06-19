
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
import {API_URL,EMPLOYEE_ATTENDANCE,EMPLOYEE_PRESENTY} from '../../Contants';


class Presenty extends Component {
  constructor(props) {
    super(props);
    this.state = {
       userId : '',
       chks : '',
       employees : null
    };

    this.loadLetter = this.loadLetter.bind(this);
    this.checkInOut = this.checkInOut.bind(this);


  }

  async loadLetter(){
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;
    var fetchLeave = await fetch(API_URL+EMPLOYEE_ATTENDANCE+id)
                     .then(res => res.json());
    if(fetchLeave.success){

        this.setState({
            userId : id,
            chks : fetchLeave.data['chks'],
            employees : fetchLeave.data['employees']
        });
    }
  }

  async checkInOut(e, action,id){
     e.preventDefault();
    
     var data ={
       id : id,
       emp_id : this.state.userId,
       action : action
     }
     var addResponse = await fetch(API_URL + EMPLOYEE_PRESENTY, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });

    if(addResponse.success){
      this.loadLetter();
      this.setState({
        alert : true,
        message : addResponse.message,
        msgType : 'success'
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


  componentDidMount(){
      this.loadLetter();
  }

   render() {
    const {chks,employees} = this.state;
    var events = [];
    if(employees !== null){
      for(var i = 0; i < employees.length ; i++){
        events.push({
          title : 'Present',
          allDay : false ,
          start : new Date(employees[i].work_in),
          end : new Date(employees[i].work_out)
        })
      }
    }
    console.log(chks);
      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Appointment Letter - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Attendance</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Attendance</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Content Start */}
          <div className="col-md-12">   
              <div id="thisdiv">
                    <div className="panel">
                        <div className="panel-heading panel-primary">Today Log</div>
                        <div className="panel-body">                     
                            <div className="row ">
                                  <div className="col-md-4 offset-md-1">
                                    <p className="lead">Check In Time</p>
                                    {
                                      
                                      chks === null &&
                                      <h2>
                                        <button type="button" className="btn btn-success" id="plan" onClick={(e) => this.checkInOut(e,'in', 0)}>
                                          <span className="fa fa-play" aria-hidden="true"></span>
                                           &nbsp; Check In
                                        </button>
                                      </h2>
                                      
                                    }
                                    {
                                      chks !== null &&
                                      <h2>{moment(chks.work_in).format('h:mm:ss a')}</h2>
                                    }
                                  </div>
                                  <div className="col-md-4 offset-md-1">
                                  {console.log(chks)}
                                    <p className="lead">Check Out Time</p>
                                    {
                                      
                                      chks !== null &&
                                      
                                      chks.work_out  === '0000-00-00 00:00:00' &&
                                      <h2>
                                        <button type="button" className="btn btn-custom" id="plan" onClick={(e) => this.checkInOut(e,'out', chks.id)}>
                                          <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                                          Check Out
                                        </button>
                                      </h2>
                                      
                                    }
                                    {
                                      chks !== null &&
                                      chks.work_out !== '0000-00-00 00:00:00' &&  chks.work_out !== null &&
                                      <h2>{moment(chks.work_out).format('h:mm:ss a')}</h2>
                                    }
                                  </div>
                            </div>   
                        </div>     
                    </div>
              </div>
          </div>
 
          {/* <div className="col-md-10 offset-md-1 p-4" style={{backgroundColor : 'white'}}>
          <h5>TODAY LOG</h5>
          <hr />
          {chks !== null && 
           <div className="row">
              <div className="col-sm-12 col-md-6">
                <h3>Check In Time</h3>
                <h1>{(chks.work_in).split(' ')[1].split(':')[0]+':'+(chks.work_in).split(' ')[1].split(':')[1]}</h1>
              </div>
              <div className="col-sm-12 col-md-6">
                <h3>Check Out Time</h3>
                <h1>{(chks.work_out).split(' ')[1].split(':')[0]+':'+(chks.work_out).split(' ')[1].split(':')[1]}</h1>
              </div>
            </div>
          }
        </div> */}
        <div  className="col-md-10 offset-md-1 p-4" style={{ height: '500pt', backgroundColor : 'white'}}>
          <Calendar
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
          />
        </div>
        {/* End Content */}
        
      </div>
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Presenty;
