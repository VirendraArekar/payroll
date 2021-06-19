
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import $ from 'jquery';
import moment from 'moment';
import validator from 'validator';
import {API_URL,ADMIN_GUEST_ATTENDANCE,ADMIN_SEARCH_ATTENDANCE,ADMIN_ADD_ATTENDANCE,ADMIN_EDIT_ATTENDANCE,ADMIN_UPDATE_ATTENDANCE,ADMIN_DELETE_ATTENDANCE} from '../../Contants';

class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = {
       tot : null,
       employees : null,
       posts : null,
       projects : null,
       keyword : '',
       guest : '',
       guestError : '',
       purpose : '',
       purposeError : '',
       contact : '',
       contactError : '',
       editcontact : '',
       editpurpose : '',
       editguest : '',
       start_date : '',
       start_dateError : '',
       end_date : '',
       end_dateError : '',
       employee_id : '',
       employee_idError : '',
       project_idError : '',
       reason : '',
       reasonError : '',
       editstart_date : '',
       editstart_dateError : '',
       editend_date : '',
       editend_dateError : '',
       editguestError : '',
       editcontactError : '',
       editpurposeError : '',
       editAttend : null,
       alert : false,
       message : '',
       msgType : '',
       editId : '',
       editTimesheet : null,
       deleteId : '',
       status : ''
    };
    this.loadTimeSheet = this.loadTimeSheet.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeGuest = this.changeGuest.bind(this);
    this.changePurpose = this.changePurpose.bind(this);
    this.changeContact = this.changeContact.bind(this);
    this.addAttendance = this.addAttendance.bind(this);
    this.editchangeStartDate = this.editchangeStartDate.bind(this);
    this.editchangeEndDate = this.editchangeEndDate.bind(this);
    this.editAttendance = this.editAttendance.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.deleteAttendance = this.deleteAttendance.bind(this);
    this.changeEditGuest = this.changeEditGuest.bind(this);
    this.changeEditPurpose = this.changeEditPurpose.bind(this);
    this.changeEditContact = this.changeEditContact.bind(this);
  }

  async loadTimeSheet(){
    var fetchLeave = await fetch(API_URL+ADMIN_GUEST_ATTENDANCE)
                     .then(res => {
                         return res.json();
                     });
    if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data
        });
    }
  }

  async clickSearch(e){
      e.preventDefault();
      const {keyword} = this.state;
      var fetchLeave = await fetch(API_URL+ADMIN_SEARCH_ATTENDANCE+ keyword)
                     .then(res => res.json());
      if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data,
        });
      }
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }

  componentDidMount(){
      this.loadTimeSheet();
  }

  changeStartDate(event){
    this.setState({start_date : event.target.value});
  }

  changeEndDate(event){
    this.setState({end_date : event.target.value});
  }

  changeGuest(event){
    this.setState({guest : event.target.value});
  }
  changeContact(event){
    this.setState({contact : event.target.value});
  }
  changePurpose(event){
    this.setState({purpose : event.target.value});
  }

  changeEditGuest(event){
    this.setState({editguest : event.target.value});
  }
  changeEditContact(event){
    this.setState({editcontact : event.target.value});
  }
  changeEditPurpose(event){
    this.setState({editpurpose : event.target.value});
  }

  
  editchangeStartDate(event){
    this.setState({editstart_date : event.target.value});
  }

  editchangeEndDate(event){
    this.setState({editend_date : event.target.value});
  }

  async addAttendance(e){
    e.preventDefault();
    this.setState({
      guestError :'',
      contactError : '',
      purposeError : '',
      end_dateError : '',
      start_dateError : ''
    });

    const {guest,contact, purpose} = this.state;
    const start_date = document.querySelector('#date-start').value;
    const end_date = document.querySelector('#date-end').value;
    var error = false;

    if(guest === ''){
      this.setState({guestError : 'Field is required!'});
      error = true;
    }
    else if(guest.length < 3){
      this.setState({guestError : 'Guest must be atleast 3 char long.'});
      error = true;
    }

    if(contact === ''){
      this.setState({contactError : 'Field is required!'});
      error = true;
    }
    else if(! validator.isMobilePhone(contact)){
      this.setState({contactError : 'Invalid contact'});
      error = true;
    }

    if(purpose === ''){
      this.setState({purposeError : 'Field is required!'});
      error = true;
    }
    else if(purpose.length < 3){
      this.setState({purposeError : 'Purpose must be atleast 3 char long.'});
      error = true;
    }

    if(end_date === ''){
      this.setState({end_dateError : 'Field is required!'});
      error = true;
    }

    if(start_date === ''){
      this.setState({start_dateError : 'Field is required!'});
      error = true;
    }

    if(error){
      return;
    }

    var data = {
      work_in : start_date,
      work_out :  end_date,
      guest : guest,
      purpose : purpose,
      contact : contact
    };

    var addResponse = await fetch(API_URL+ADMIN_ADD_ATTENDANCE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    $('#addModal').modal('hide');
    if(addResponse.success){
      this.loadTimeSheet();
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

  async editAttendance(e){
    e.preventDefault();
    this.setState({
      editcontactError :'',
      editguestError :'',
      editpurposeError :'',
      editend_dateError : '',
      editstart_dateError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const { editId, editguest, editcontact,editpurpose } = this.state;
    const id = editId;
    const start_date = document.querySelector('#editdate-start').value;
    const end_date = document.querySelector('#editdate-end').value;
    var error = false;

    if(editguest === ''){
      this.setState({editguestError : 'Field is required!'});
      error = true;
    }
    else if(editguest.length < 3){
      this.setState({editguestError : 'Guest must be atleast 3 char long.'});
      error = true;
    }

    if(editcontact === ''){
      this.setState({editcontactError : 'Field is required!'});
      error = true;
    }
    else if(editcontact.length < 3){
      this.setState({editcontactError : 'Contact must be atleast 3 char long.'});
      error = true;
    }

    if(editpurpose === ''){
      this.setState({editpurposeError : 'Field is required!'});
      error = true;
    }
    else if(editpurpose.length < 3){
      this.setState({editpurposeError : 'Purpose must be atleast 3 char long.'});
      error = true;
    }

    if(start_date === ''){
      this.setState({editstart_dateError : 'Field is required!'});
      error = true;
    }

    if(end_date === ''){
      this.setState({editend_dateError : 'Field is required!'});
      error = true;
    }

    if(error){
      return;
    }

    var data = {
      id : id,
      work_in : start_date,
      work_out :  end_date,
      contact : editcontact,
      purpose : editpurpose,
      guest : editguest
    };


    var addResponse = await fetch(API_URL+ADMIN_UPDATE_ATTENDANCE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    $('#editModal').modal('hide');
    if(addResponse.success){
        this.loadTimeSheet();
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

  async editBtnClick(id){
    this.setState({editId : id});
    var editData = await fetch(API_URL+ADMIN_EDIT_ATTENDANCE+id)
                   .then(res => {
                     return res.json();
                   });
  
    if(editData.success){
      this.setState({editAttend: editData.data});
      this.setState({
          editcontact : editData.data.contact,
          editpurpose : editData.data.purpose,
          editguest : editData.data.guest
      })
    }
  }

  async editSubmit(e){
    e.preventDefault();
  }

  async deleteBtnClick(id){
      this.setState({deleteId : id});
  }

  async deleteAttendance(e){
    $('#delete_estimate').modal('hide');
    this.setState({
        alert : false,
        message : '',
        msgType : ''
      });
    e.preventDefault();
    var addResponse = await fetch(API_URL+ADMIN_DELETE_ATTENDANCE+this.state.deleteId).then(res => {
        return res.json();
      });
    if(addResponse.success){
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

   render() {
    const{data,leaves, employees,start_dateError,end_dateError,guestError, purposeError, contactError,editstart_dateError,editend_dateError,editguestError,editpurposeError,editcontactError,editTimesheet,tot,posts,projects, taskError ,editAttend } = this.state
    const columns = [   
      {
        title: 'Date',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info">{moment(record.work_in).format('DD-MMM-YYYY')}</span>
        ),
      }, 
      {
        title: 'Name',
        dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.guest}</span>
        ),
      }, 
       
      {
        title: 'In<->Out',
        // dataIndex: '',
        render : (text,record) => (
            <div>
                { moment(record.work_in).format('H:mm:ss')} 
                 <i className="fa fa-arrows-h"></i> 
                { moment(record.work_out).format('H:mm:ss')} 
            </div>
        )
      },

      {
        title: 'Duration',
        dataIndex: 'duration',
         render : (text,record) => (
            <span className="text-secondary">{record.duration}</span>
        ),
        sorter: (a, b) => a.duration.length - b.duration.length,
      }, 
      {
        title: 'Purpose',
        dataIndex: 'purpose',
        sorter: (a, b) => a.purpose.length - b.purpose.length,
         render : (text,record) => (
            <span className="text-secondary">{record.purpose}</span>
        ),
      },
      {
        title: 'Contact',
        dataIndex: 'contact',
        sorter: (a, b) => a.contact.length - b.contact.length,
         render : (text,record) => (
            <span className="text-secondary">{record.contact}</span>
        ),
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                 <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editModal" onClick={() => this.editBtnClick(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                    <a className="dropdown-item" href="#" onClick={() => this.deleteBtnClick(record.id)} data-toggle="modal" data-target="#delete_estimate"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                  </div>
            </div>
          ),
      },
    ];

      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Vacation Request - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Guest Logs</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Guest Logs</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <button  className="btn btn-custom" data-toggle="modal" data-target="#addModal"><i className="fa fa-location-arrow" />&nbsp;New Entry</button>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        <div className="row filter-row">
          <div className="col-sm-12 col-md-6">  
           
          </div>
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus">

                <input className="form-control floating " type="text" onChange={this.changeKeyword} value={this.state.keyword}/>
 
              <label className="focus-label">Guest Name</label>
            </div>
          </div>
          
          <div className="col-sm-6 col-md-3">  
            <a href="#" className="btn btn-success btn-block" onClick={this.clickSearch}> Search </a>  
          </div>     
        </div>
        {/* /Search Filter */}
        {
          this.state.alert &&
          <div className={"alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
            {this.state.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
            {console.log(employees)}
               {
                   employees !== null &&
                   <Table className="table-striped text-center"
                    pagination= { {total : employees.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={employees}
                    rowKey={record => record.id}
                    onChange={this.handleTableChange}
                    />
               }
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Add Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Guest Log</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">
                  <div className="form-group">    
                      <label className="control-label">Guest Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" value={this.state.guest} onChange={this.changeGuest}/> 
                      {
                        guestError &&
                        <p className="text-danger">{guestError}</p>
                      } 
                  </div>  
                  <div className="form-group">    
                      <label className="control-label">Purpose<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" value={this.state.purpose} onChange={this.changePurpose}/> 
                      {
                        purposeError &&
                        <p className="text-danger">{purposeError}</p>
                      } 
                  </div>          
                  <div className="form-group">    
                      <label className="control-label">Contact<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" value={this.state.contact} onChange={this.changeContact}/> 
                      {
                        contactError &&
                        <p className="text-danger">{contactError}</p>
                      } 
                  </div>             
                  <div className="form-group">
                    <label className="control-label">Duration<span className="text-danger">*</span></label>
                      <div className="input-group date">
                        <div className="row">
                          <div className="col-sm-6">
                            <input type="text" className="form-control underlined datetimepicker" required="" id="date-start" name="start_date"/>
                             {
                                start_dateError &&
                                <p className="text-danger">{start_dateError}</p>
                             }
                          </div>
                          <div className="col-sm-6">
                             <input type="text" className="form-control underlined datetimepicker" required="" id="date-end" name="end_date"/>
                             {
                                end_dateError &&
                                <p className="text-danger">{end_dateError}</p>
                             }
                          </div>
                        </div>
                      </div> 
                  </div>
                                                                  
                  
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.addAttendance}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
       {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">TimeSheet Log Edit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">
                  <div className="form-group">    
                      <label className="control-label">Guest Name<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="guest" id="guest_id" value={this.state.editguest} onChange={this.changeEditGuest}/> 
                      {
                        editguestError &&
                        <p className="text-danger">{editguestError}</p>
                      } 
                  </div>  
                  <div className="form-group">    
                      <label className="control-label">Purpose<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" id="purpose_id" name="purpose" value={this.state.editpurpose} onChange={this.changeEditPurpose}/> 
                      {
                        editpurposeError &&
                        <p className="text-danger">{editpurposeError}</p>
                      } 
                  </div>          
                  <div className="form-group">    
                      <label className="control-label">Contact<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" id="contact_id" name="contact" value={this.state.editcontact} onChange={this.changeEditContact}/> 
                      {
                        editcontactError &&
                        <p className="text-danger">{editcontactError}</p>
                      } 
                  </div>             
                  <div className="form-group">
                    <label className="control-label">Duration<span className="text-danger">*</span></label>
                      <div className="input-group date">
                        <div className="row">
                          <div className="col-sm-6">
                            <input type="text" className="form-control underlined " required="" id="editdate-start" name="start_date" value={editAttend !== null ? editAttend.work_in : ''}/>
                             {
                                editstart_dateError &&
                                <p className="text-danger">{start_dateError}</p>
                             }
                          </div>
                          <div className="col-sm-6">
                             <input type="text" className="form-control underlined " required="" id="editdate-end" name="end_date" value={editAttend !== null ? editAttend.work_out : ''}/>
                             {
                                editend_dateError &&
                                <p className="text-danger">{end_dateError}</p>
                             }
                          </div>
                        </div>
                      </div> 
                  </div>
                                                                  
                  
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.editAttendance}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Estimate Modal */}
      <div className="modal custom-modal fade" id="delete_estimate" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <h3>Delete Leave</h3>
                <p>Are you sure want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <a href="#" className="btn btn-primary continue-btn" onClick={this.deleteAttendance}>Delete</a>
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
      {/* /Delete Estimate Modal */}
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Guest;
