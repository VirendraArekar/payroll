
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
import {API_URL,ADMIN_TIMESHEET_LIST,ADMIN_TIMESHEET_SEARCH,ADMIN_TIMESHEET_CREAT,ADMIN_TIMESHEET_UPDATE,ADMIN_TIMESHEET_EDIT,ADMIN_TIMESHEET_DELETE} from '../../Contants';

class TimeSheetLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
       tot : null,
       employees : null,
       posts : null,
       projects : null,
       keyword : '',
       task : '',
       notes : '',
       taskError : '',
       notesError : '',
       edittask : '',
       editnotes : '',
       edittaskError : '',
       editnotesError : '',
       start_date : '',
       start_dateError : '',
       end_date : '',
       end_dateError : '',
       employee_id : '',
       employee_idError : '',
       project_idError : '',
       reason : '',
       reasonError : '',
       editemployee_id : '',
       editemployee_idError : '',
       editstart_date : '',
       editstart_dateError : '',
       editend_date : '',
       editend_dateError : '',
       editemployee_id : '',
       editemployee_idError : '',
       editreason : '',
       editreasonError : '',
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
    this.changeTask = this.changeTask.bind(this);
    this.changeNotes = this.changeNotes.bind(this);
    this.addTimesheet = this.addTimesheet.bind(this);
    this.editchangeStartDate = this.editchangeStartDate.bind(this);
    this.editchangeEndDate = this.editchangeEndDate.bind(this);
    this.editchangeReason = this.editchangeReason.bind(this);
    this.editTimesheet = this.editTimesheet.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.deleteTimesheet = this.deleteTimesheet.bind(this);
    this.changeEditTask = this.changeEditTask.bind(this);
    this.changeEditNotes = this.changeEditNotes.bind(this);
    this.changeEditEmpid = this.changeEditEmpid.bind(this);
    this.changeEditProjid = this.changeEditProjid.bind(this);
    
  }

  async loadTimeSheet(){
    var fetchLeave = await fetch(API_URL+ADMIN_TIMESHEET_LIST)
                     .then(res => res.json());
    if(fetchLeave.success){
      console.log(fetchLeave.data['projects']);
        this.setState({
            tot : fetchLeave.data['tot'],
            employees : fetchLeave.data['employees'],
            projects : fetchLeave.data['projects'],
            posts : fetchLeave.data['posts'],
        });
    }
  }

  async clickSearch(e){
      e.preventDefault();
      let empsearchid = document.querySelector('#empsearchid').value;
      let projectsid = document.querySelector('#projectsid').value;
      var fetchLeave = await fetch(API_URL+ADMIN_TIMESHEET_SEARCH + empsearchid+'&proj_id='+projectsid)
                     .then(res => res.json());
      if(fetchLeave.success){
        this.setState({
            tot : fetchLeave.data['tot'],
            employees : fetchLeave.data['employees'],
            projects : fetchLeave.data['projects'],
            posts : fetchLeave.data['posts'],
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

  changeTask(event){
    this.setState({task : event.target.value});
  }
  changeNotes(event){
    this.setState({notes : event.target.value});
  }

  changeEditTask(event){
    this.setState({edittask : event.target.value});
  }
  changeEditNotes(event){
    this.setState({editnotes : event.target.value});
  }

  editchangeStartDate(event){
    this.setState({editstart_date : event.target.value});
  }

  editchangeEndDate(event){
    this.setState({editend_date : event.target.value});
  }

  editchangeReason(event){
    this.setState({editreason : event.target.value});
  }

  changeEditEmpid(event){
    this.setState({editemp_id : event.target.value});
  }

  changeEditProjid(event){
    this.setState({editproject_id : event.target.value});
  }

  async addTimesheet(e){
    e.preventDefault();
    this.setState({
      taskError :'',
      end_dateError : '',
      start_dateError : '',
      employee_idError : '',
      project_idError :'',
      notesError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {task,notes} = this.state;
    const emp_id = document.querySelector('#emp_id').value;
    const project_id = document.querySelector('#project_id').value;
    const start_date = document.querySelector('#timesheet-date-start').value;
    const end_date = document.querySelector('#timesheet-date-end').value;
    var error = false;

    if(task === ''){
      this.setState({taskError : 'Field is required!'});
      error = true;
    }
    else if(task.length < 3){
      this.setState({taskError : 'Reason must be atleast 3 char long.'});
      error = true;
    }

    if(notes === ''){
      this.setState({notesError : 'Field is required!'});
      error = true;
    }
    else if(notes.length < 3){
      this.setState({notesError : 'Reason must be atleast 3 char long.'});
      error = true;
    }

    if(start_date === ''){
      this.setState({start_dateError : 'Field is required!'});
      error = true;
    }

    if(end_date === ''){
      this.setState({end_dateError : 'Field is required!'});
      error = true;
    }

    if(emp_id === ''){
      this.setState({employee_idError : 'Field is required!'});
      error = true;
    }

    if(project_id === ''){
      this.setState({project_idError : 'Field is required!'});
      error = true;
    }

    if(error){
      return;
    }

    var data = {
      emp_id : emp_id,
      proj_id : project_id,
      start_time : start_date,
      end_time :  end_date,
      task : task,
      notes : notes
    };

    console.log(data);
    // return;


    var addResponse = await fetch(API_URL + ADMIN_TIMESHEET_CREAT, {
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

  async editTimesheet(e){
    e.preventDefault();
    this.setState({
      edittaskError :'',
      editnotesError :'',
      editend_dateError : '',
      editstart_dateError : '',
      editemployee_idError : '',
      editproject_idError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const { editId} = this.state;
    const id = editId;
    const edittask = document.querySelector('#edittask').value;
    const editnotes = document.querySelector('#editnotes').value;
    const emp_id = document.querySelector('#editemp_id').value;
    const proj_id = document.querySelector('#editproject_id').value;
    const start_date = document.querySelector('#timesheet-editdate-start').value;
    const end_date = document.querySelector('#timesheet-editdate-end').value;
    var error = false;

    if(edittask === ''){
      this.setState({edittaskError : 'Field is required!'});
      error = true;
    }
    else if(edittask.length < 3){
      this.setState({edittaskError : 'Reason must be atleast 3 char long.'});
      error = true;
    }

    if(editnotes === ''){
      this.setState({editnotesError : 'Field is required!'});
      error = true;
    }
    else if(editnotes.length < 3){
      this.setState({editnotesError : 'Reason must be atleast 3 char long.'});
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

    if(emp_id === ''){
      this.setState({editemployee_idError : 'Field is required!'});
      error = true;
    }

    if(proj_id === ''){
      this.setState({editproject_idError : 'Field is required!'});
      error = true;
    }

    if(error){
      return;
    }

    var data = {
      id : id,
      emp_id : emp_id,
      proj_id : proj_id,
      start_time : start_date,
      end_time :  end_date,
      task : this.state.edittask,
      notes : this.state.editnotes
    };


    var addResponse = await fetch(API_URL+ADMIN_TIMESHEET_UPDATE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    $('#editModal').modal('hide');
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


  async editBtnClick(id){
    this.setState({editId : id});
    var editData = await fetch(API_URL+ADMIN_TIMESHEET_EDIT+id)
                   .then(res => {
                     return res.json();
                   });
    if(editData.success){
      console.log(editData.data);
      this.setState({editTimesheet : editData.data});
      this.setState({
        edittask : editData.data.task,
        editnotes : editData.data.notes,
        editemp_id : editData.data.emp_id,
        editproject_id : editData.data.proj_id,

      });
      document.querySelector('#timesheet-editdate-start').value = editData.data.start_time;
      document.querySelector('#timesheet-editdate-end').value = editData.data.end_time;
    }
  }

  async editSubmit(e){
    e.preventDefault();

  }

  async deleteBtnClick(id){
      this.setState({deleteId : id});
  }

  async deleteTimesheet(e){
    $('#delete_estimate').modal('hide');
    e.preventDefault();
    var addResponse = await fetch(API_URL + ADMIN_TIMESHEET_DELETE +this.state.deleteId).then(res => {
        return res.json();
      });
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

   render() {
    const{data,leaves, employees,employee_idError,start_dateError,end_dateError,reasonError,editemployee_idError,editstart_dateError,editend_dateError,editreasonError,editTimesheet,tot,posts,projects, taskError, notesError, project_idError,editproject_idError ,edittaskError, editnotesError  } = this.state
    const columns = [   
      {
        title: '#',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info p-2">{record.id}</span>
        ),
      }, 
      {
        title: 'Employee',
        // dataIndex: '',
        render : (text,record) => (
            <span className="text-secondary">{record.emp.name}</span>
        ),
      }, 
      {
        title: 'Task',
        // dataIndex: 'task',
        render : (text,record) => (
            <div>
              <span className="text-secondary">{record.task}<br></br>
                <span className="badge badge-secondary">
                    <span className="label label-default">
                      <strong>{ record.proj_id }# </strong> 
                      { record.project.proj_title }
                    </span>
                </span>
               </span>
            </div>
        ),
        sorter: (a, b) => a.task.length - b.task.length,
      },    
      {
        title: 'Start<->End',
        // dataIndex: '',
        render : (text,record) => (
            <div>
              <span className="text-secondary">
                { moment(record.end_time).format('DD MMM YYYY')}
              </span>
              <br>
              </br> 
                { moment(record.start_time).format('H:mm:ss')} 
                 <i className="fa fa-arrows-h"></i> 
                { moment(record.end_time).format('H:mm:ss')} 
            </div>
        )
      },

      {
        title: 'Duration',
        dataIndex: 'duration',
         render : (text,record) => (
            <span className="badge badge-info p-2">{record.duration}</span>
        ),
        sorter: (a, b) => a.duration.length - b.duration.length,
      }, 
      {
        title: 'Notes',
        dataIndex: 'notes',
        sorter: (a, b) => a.notes.length - b.notes.length,
         render : (text,record) => (
            <span className="text-secondary">{record.notes}</span>
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
              <h3 className="page-title">TimeSheet</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/timesheet/report">TimeSheet</a></li>
                <li className="breadcrumb-item active">Logs</li>
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
          <div className="col-sm-6 col-md-3">  
           
          </div>
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus">

                <select id="empsearchid" className="form-control">
                    <option value="" className="text-center">Select Employee name</option>
                    {
                      posts !== null &&
                      posts.map((item,index) => {
                        return(
                          <option value={item.id} key={index}>{item.name}</option>
                        )
                      })
                    }
                </select>
 
             
            </div>
          </div>
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus">
                 <select id="projectsid" className="form-control">
                    <option value="" className="text-center">Select Project</option>
                    {
                      projects !== null &&
                      projects.map((item,index) => {
                        return(
                          <option value={item.id} key={index}>{item.proj_title}</option>
                        )
                      })
                    }
                </select>
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
              <h5 className="modal-title" id="exampleModalLabel">Vacation Request</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">             
                  <div className="form-group">
                    <label className="control-label">Employee<span className="text-danger">*</span></label>                       
                       <select className="select" name="emp_id" id="emp_id">
                         <option value="">Select one</option>
                         {
                           posts !== null &&
                           posts.map((item,index) => {
                             return(
                               <option value={item.id} key={index}>{item.name}</option>
                             )
                           })
                         }
                       </select>
                       {
                         employee_idError &&
                         <p className="text-danger">{employee_idError}</p>
                       } 
                  </div>
                  <div className="form-group">
                    <label className="control-label">Projects<span className="text-danger">*</span></label>                       
                       <select className="select" name="project_id" id="project_id">
                         <option value="">Select one</option>
                         {
                           projects !== null &&
                           projects.map((item,index) => {
                             return(
                               <option value={item.id} key={index}>{item.proj_title}</option>
                             )
                           })
                         }
                       </select>
                       {
                         project_idError &&
                         <p className="text-danger">{project_idError}</p>
                       } 
                  </div>
                  <div className="form-group">
                    <label className="control-label">Start date<span className="text-danger">*</span></label>
                      <div className="input-group date">
                        <div className="row">
                          <div className="col-sm-6">
                            <input type="text" className="form-control underlined " required="" id="timesheet-date-start" name="start_date"/>
                             {
                                start_dateError &&
                                <p className="text-danger">{start_dateError}</p>
                             }
                          </div>
                          <div className="col-sm-6">
                             <input type="text" className="form-control underlined " required="" id="timesheet-date-end" name="end_date"/>
                             {
                                end_dateError &&
                                <p className="text-danger">{end_dateError}</p>
                             }
                          </div>
                        </div>
                      </div> 
                  </div>
                                                                  
                  <div className="form-group">    
                      <label className="control-label">Task<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" value={this.state.task} onChange={this.changeTask}/> 
                      {
                        taskError &&
                        <p className="text-danger">{taskError}</p>
                      } 
                  </div>          
                  <div className="form-group">    
                      <label className="control-label">Notes<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" value={this.state.notes} onChange={this.changeNotes}/> 
                      {
                        notesError &&
                        <p className="text-danger">{notesError}</p>
                      } 
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.addTimesheet}>Submit</button>
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
                    <label className="control-label">Employee<span className="text-danger">*</span></label>                       
                       <select className="form-control" name="editemp_id" id="editemp_id" value={this.state.editemp_id} onChange={this.changeEditEmpid}>
                         <option value="">Select one</option>
                         {
                           posts !== null &&
                           posts.map((item,index) => {
                             return(
                               <option value={item.id} key={index}>{item.name}</option>
                             )
                           })
                         }
                       </select>
                       {
                         editemployee_idError &&
                         <p className="text-danger">{editemployee_idError}</p>
                       } 
                  </div>
                  <div className="form-group">
                    <label className="control-label">Projects<span className="text-danger">*</span></label>                       
                       <select className="form-control" name="editproject_id" id="editproject_id" value={this.state.editproject_id} onChange={this.changeEditProjid}>
                         <option value="">Select one</option>
                         {
                           projects !== null &&
                           projects.map((item,index) => {
                             return(
                               <option value={item.id} key={index}>{item.proj_title}</option>
                             )
                           })
                         }
                       </select>
                       {
                         editproject_idError &&
                         <p className="text-danger">{editproject_idError}</p>
                       } 
                  </div>
                  <div className="form-group">
                    <label className="control-label">Start date<span className="text-danger">*</span></label>
                      <div className="input-group date">
                        <div className="row">
                          <div className="col-sm-6">
                            <input type="text" className="form-control underlined " required="" id="timesheet-editdate-start" name="editstart_date" />
                             {
                                editstart_dateError &&
                                <p className="text-danger">{editstart_dateError}</p>
                             }
                          </div>
                          <div className="col-sm-6">
                             <input type="text" className="form-control underlined " required="" id="timesheet-editdate-end" name="editend_date" />
                             {
                                editend_dateError &&
                                <p className="text-danger">{editend_dateError}</p>
                             }
                          </div>
                        </div>
                      </div> 
                  </div>
                                                                  
                  <div className="form-group">    
                      <label className="control-label">Task<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="task" id="edittask" value={ this.state.edittask }  onChange={this.changeEditTask}/> 
                      {
                        edittaskError &&
                        <p className="text-danger">{edittaskError}</p>
                      } 
                  </div>          
                  <div className="form-group">    
                      <label className="control-label">Notes*</label>
                      <input type="text" className="form-control underlined" name="task" id="editnotes" value={ this.state.editnotes} onChange={this.changeEditNotes}/> 
                      {
                        editnotesError &&
                        <p className="text-danger">{editnotesError}</p>
                      } 
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.editTimesheet}>Submit</button>
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
                    <a href="#" className="btn btn-primary continue-btn" onClick={this.deleteTimesheet}>Delete</a>
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

export default TimeSheetLog;
