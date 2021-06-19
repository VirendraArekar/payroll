
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import { Avatar_04, Avatar_03,PlaceHolder} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import $ from 'jquery';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);



import {
    ADMIN_HOLIDAY_LIST,
    ADMIN_HOLIDAY_DELETE,
    ADMIN_HOLIDAY_ADD,
    ADMIN_HOLIDAY_UPDATE,
    ADMIN_HOLIDAY_EDIT,
    CORE,
    API_URL
} from '../Contants';


class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
       holidays : null,
       alert : false, 
       message : '', 
       msgType : '',
       holiday : null,
       title : '' , 
       titleError : '', 
       date : '', 
       dateError : '', 
       edittitle : '' , 
       titleEditError : '', 
       editdate : '', 
       dateEditError : '' ,
       editId : '',
       deleteId : ''      
    };
    
    this.loadHolidays = this.loadHolidays.bind(this);
    this.AddHoliday = this.AddHoliday.bind(this);
    this.EditHoliday = this.EditHoliday.bind(this);
    this.UpdateHoliday = this.UpdateHoliday.bind(this);
    this.DeleteHoliday = this.DeleteHoliday.bind(this);

    this.AddEditId = this.AddEditId.bind(this);
    this.AddDeleteId = this.AddDeleteId.bind(this);

    this.changeEditTitle = this.changeEditTitle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeEditDate = this.changeEditDate.bind(this);
  }

  async loadHolidays(){
     var fetchData = await fetch(API_URL+ADMIN_HOLIDAY_LIST).then(res => res.json());
     if(fetchData.code === 200){
        this.setState({
            holidays : fetchData.data.length > 0 ? fetchData.data : []
        });
     }
  }

  changeTitle(event){
      this.setState({title : event.target.value});
  }
  changeDate(event){
    this.setState({date : event.target.value});
  }
  changeEditTitle(event){
    this.setState({edittitle : event.target.value});
  }
  changeEditDate(event){
    this.setState({editdate : event.target.value});
  }

  componentDidMount(){
      this.loadHolidays();
  }

  async AddHoliday(e){
    e.preventDefault();
    const {title} = this.state;
    var error = false;
    var date = document.querySelector('#fromh').value;

    if(date === ''){
        this.setState({dateError : 'Field is required!'});
        error = true;
    }

    if(title === ''){
        this.setState({titleError : 'Field is required!'});
        error = true;
    }
    else if(title.length < 3){
        this.setState({titleError : 'Title length shoud be at least 3 char long!'});
        error = true;
    }

    if(error){
        return;
    }

    var data = {
        title :  title,
        date : date
    };

      var fetchData = await fetch(API_URL + ADMIN_HOLIDAY_ADD,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
    }).then(res => res.json());

       if(fetchData.code === 200){
           $('#add_holiday').modal('hide');
            this.loadHolidays();
            this.setState({
                alert : true,
                message : fetchData.message,
                msgType : 'success'
            })
        }
        else{
                this.setState({
                    alert : true,
                    message : 'Internal server error.',
                    msgType : 'danger'
                })
       }
  }

  async EditHoliday(e){
    e.preventDefault();

  }

  async UpdateHoliday(e){
    e.preventDefault();

    const {editId, edittitle} = this.state;
    var error = false;
    var editdate = document.querySelector('#fromhs').value;

    if(editdate === ''){
        this.setState({dateEditError : 'Field is required!'});
        error = true;
    }

    if(edittitle === ''){
        this.setState({titleEditError : 'Field is required!'});
        error = true;
    }
    else if(edittitle.length < 3){
        this.setState({titleEditError : 'Title length shoud be at least 3 char long!'});
        error = true;
    }

    if(error){
        return;
    }

    var data = {
        id : editId,
        title :  edittitle,
        date : editdate
    };

      var fetchData = await fetch(API_URL + ADMIN_HOLIDAY_UPDATE,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
    }).then(res => res.json());

       if(fetchData.code === 200){
           $('#edit_holiday').modal('hide');
            this.loadHolidays();
            this.setState({
                alert : true,
                message : fetchData.message,
                msgType : 'success'
            })
        }
        else{
            this.setState({
                alert : true,
                message : 'Internal server error.',
                msgType : 'danger'
            })
        }
  }
  async AddEditId(e,id){
      e.preventDefault();
      this.setState({editId : id});
      var fetchData = await fetch(API_URL + ADMIN_HOLIDAY_EDIT + id).then(res => res.json());
      if(fetchData.code === 200){
          this.setState({
              holiday : fetchData.data,
              
              edittitle : fetchData.data.title
            });

          document.querySelector('#fromhs').value = moment(fetchData.data.date).format('Y-MM-D');
      }
  }

  AddDeleteId(e,id){
      e.preventDefault();
    this.setState({ deleteId : id});
  }

  async DeleteHoliday(e){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_HOLIDAY_DELETE + this.state.deleteId).then(res => res.json());

       if(fetchData.code === 200){
           $('#delete_holiday').modal('hide');
            this.loadHolidays();
            this.setState({
                alert : true,
                message : fetchData.message,
                msgType : 'success'
            })
        }
        else{
                this.setState({
                    alert : true,
                    message : 'Internal server error.',
                    msgType : 'danger'
                })
       }
  }

   render() {

    const {alert, message, msgType, holidays, holiday, title , titleError, date, dateError, edittitle , titleEditError, editdate, dateEditError} = this.state;
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
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_holiday"><i className="fa fa-plus" />&nbsp;Add Holiday</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {
              alert &&
              <div class={"alert mb-1 alert-dismissible fade show alert-"+msgType} role="alert">
                {message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
              </div>
          }
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
                       <th>#</th>
                   </tr>
                   {
                       holidays !== null &&
                       holidays.map((item,index) => {
                           return(
                            <tr key={index}>
                                <td className="text-secondary text-left">
                                 <span className="badge badge-info p-2">{item.title}</span>
                                </td>
                                <td className="text-dark text-center">
                                  <span className="badge badge-dark p-2">{moment(item.start).format('D MMM Y')}</span>
                                </td>
                                <td>
                                   <button className=" btn btn-secondary btn-sm  circle"  data-toggle="modal" data-target="#edit_holiday" onClick={(e) => this.AddEditId(e,item.id)}><i className="fa fa-sm fa-pencil"></i></button> &nbsp;        
                                   <button className="btn btn-danger  btn-sm circle" data-toggle="modal" data-target="#delete_holiday" onClick={(e) => this.AddDeleteId(e,item.id)}><i className="fa fa-sm fa-trash" ></i></button>
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
        {/* Add Expense Modal */}
        <div id="add_holiday" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Holiday</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                       <div className="form-group">
                        <label>Holiday Title<span className="text-danger">*</span></label>
                        <input className="form-control" value={title} onChange={this.changeTitle}/>
                        {
                            titleError  &&
                            <p className="text-danger mt-1">{titleError}</p>
                        } 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date <span className="text-danger">*</span></label>
                        <input className="form-control"  id="fromh"/>
                        {
                            dateError  &&
                            <p className="text-danger mt-1">{dateError}</p>
                        } 
                      </div>
                    </div>
                  </div>
                  
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.AddHoliday}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Expense Modal */}
        {/* Edit Expense Modal */}
        <div id="edit_holiday" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Holiday</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {/* {holiday !== null &&  */}
                <form>
                  <div className="row">
                    <div className="col-md-6">
                       <div className="form-group">
                        <label>Holiday Title<span className="text-danger">*</span></label>
                        <input className="form-control" value={edittitle} onChange={this.changeEditTitle}/>
                        {
                            titleEditError  &&
                            <p className="text-danger mt-1">{titleEditError}</p>
                        } 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date <span className="text-danger">*</span></label>
                        <input className="form-control"  id="fromhs"/>
                        {
                            dateEditError  &&
                            <p className="text-danger mt-1">{dateEditError}</p>
                        } 
                      </div>
                    </div>
                  </div>
                  
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.UpdateHoliday}>Submit</button>
                  </div>
                </form>
                {/* } */}
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Expense Modal */}
        {/* Delete Expense Modal */}
        <div className="modal custom-modal fade" id="delete_holiday" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Holiday</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <button  className="btn btn-primary continue-btn btn-block" 
                      onClick={this.DeleteHoliday}>Delete</button>
                    </div>
                    <div className="col-6">
                      <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Expense Modal */}
      </div>
      </div>
      <SidebarContent />
    </div>
      );
   }
}

export default Holiday;
