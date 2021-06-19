
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
import {API_URL,ADMIN_ATTENDANCE,ADMIN_ATTENDANCE_SEARCH,ADMIN_ATTENDANCE_CREATE,ADMIN_ATTENDANCE_EDIT,ADMIN_ATTENDANCE_UPDATE,ADMIN_ATTENDANCE_DELETE} from '../../Contants';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
       employees : null,
       posts : null,
       keyword : '',
       emp_id : '',
       emp_idError : '',
       editemp_id : null,
       editemp_idError : '',
       start_date : '',
       start_dateError : '',
       end_date : '',
       editemp_id : '',
       editemp_idError : '',
       end_dateError : '',
       editstart_date : '',
       editstart_dateError : '',
       editend_date : '',
       editend_dateError : '',
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
    this.addAttendance = this.addAttendance.bind(this);
    this.editchangeStartDate = this.editchangeStartDate.bind(this);
    this.editchangeEndDate = this.editchangeEndDate.bind(this);
    this.editAttendance = this.editAttendance.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.deleteAttendance = this.deleteAttendance.bind(this);
    this.changeEditEmpId = this.changeEditEmpId.bind(this);
   
  }

  async loadTimeSheet(){
    var fetchLeave = await fetch(API_URL+ADMIN_ATTENDANCE)
                     .then(res => {
                         return res.json();
                     });
    if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data['employees'],
            posts : fetchLeave.data['posts']
        });
    }
  }

  async clickSearch(e){
      e.preventDefault();
      const {keyword} = this.state;
      var fetchLeave = await fetch(API_URL+ADMIN_ATTENDANCE_SEARCH+keyword)
                     .then(res => res.json());
                     console.log(fetchLeave);
      if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data['employees'],
            posts : fetchLeave.data['posts'],
        });
      }
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }
  changeEmpId(event){
      this.setState({emp_id : event.target.value});
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
  changeEditEmpId(event){
    this.setState({editemp_id : event.target.value});
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
      emp_idError :'',
      end_dateError : '',
      start_dateError : ''
    });

    const emp_id =  document.querySelector('#emp_id').value;
    const start_date = document.querySelector('#date-start').value;
    const end_date = document.querySelector('#date-end').value;
    var error = false;

    if(emp_id === ''){
      this.setState({emp_idError : 'Field is required!'});
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
      emp_id : emp_id
    };

    var addResponse = await fetch(API_URL+ADMIN_ATTENDANCE_CREATE, {
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
      editedit_idError :'',
      editend_dateError : '',
      editstart_dateError : '',
      alert : false,
      message : '',
      msgType : ''
    });
    const {editId} = this.state;
    const my_edit_id = document.querySelector('#editemp_id').value;
    const start_date = document.querySelector('#editdate-start').value;
    const end_date = document.querySelector('#editdate-end').value;
    var error = false;

    if(editId === ''){
      this.setState({editedit_idError : 'Field is required!'});
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
      id : editId,
      emp_id : my_edit_id,
      work_in : start_date,
      work_out :  end_date,
    };

    console.log(data);


    var addResponse = await fetch(API_URL+ADMIN_ATTENDANCE_UPDATE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    console.log(addResponse);
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
    var editData = await fetch(API_URL+ADMIN_ATTENDANCE_EDIT+id)
                   .then(res => {
                     return res.json();
                   });
                   console.log(editData.data.data.emp_id);
    if(editData.success){
      this.setState({editAttend: editData.data.data});
      this.setState({
          editemp_id : editData.data.data.emp_id,
          editstart_date : editData.data.data.work_in,
          editend_date : editData.data.data.work_out
      });
      
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
    var addResponse = await fetch(API_URL+ADMIN_ATTENDANCE_DELETE+this.state.deleteId).then(res => {return res.json();});
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
    const{data,leaves, employees,start_dateError,end_dateError,editstart_dateError,editend_dateError,editTimesheet,posts,editAttend,emp_idError,editemp_idError,editend_date,editstart_date   } = this.state
    const columns = [   
      {
        title: 'Date',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info">{moment(record.work_in).format('DD-MMM-YYYY')}</span>
        ),
      }, 
      {
        title: 'Employee',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.emp.name}</span>
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
        title: 'Working Hours',
        dataIndex: 'duration',
         render : (text,record) => (
            <span className="text-secondary">{record.duration}</span>
        ),
        sorter: (a, b) => a.duration.length - b.duration.length,
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
              <h3 className="page-title">Attendance Logs</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Attendance Logs</li>
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
            <button  className="btn btn-success btn-block" onClick={(e)=>this.clickSearch(e)}> Search </button>  
          </div>     
        </div>
        {/* /Search Filter */}
        {
          this.state.alert &&
          <div className={"mt-3 alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
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
      {/* Add Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" role="dialog"   aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                      <label className="control-label">Employee<span className="text-danger">*</span></label>
                      <select className="select" id="emp_id">
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
                        emp_idError &&
                        <p className="text-danger">{emp_idError}</p>
                      } 
                  </div>  
                  <div className="form-group">
                      <label className="control-label">In<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined " required="" id="date-start" name="start_date"/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                             
                      </div> 
                      {
                        start_dateError &&
                        <p className="text-danger">{start_dateError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Out<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined " required="" id="date-end" name="end_date"/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        end_dateError &&
                        <p className="text-danger">{end_dateError}</p>
                      }
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
                      <label className="control-label">Employee<span className="text-danger">*</span></label>
                      <select className="form-control" id="editemp_id" value={this.state.editemp_id} onChange={this.changeEditEmpId}>
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
                        editemp_idError &&
                        <p className="text-danger">{editemp_idError}</p>
                      } 
                  </div>   
                  <div className="form-group">
                      <label className="control-label">In<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined " required="" id="editdate-start" name="editstart_date" value={editstart_date}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                             
                      </div> 
                      {
                        editstart_dateError &&
                        <p className="text-danger">{editstart_dateError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Out<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined " required="" id="editdate-end" name="editend_date" value={editend_date}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        editend_dateError &&
                        <p className="text-danger">{editend_dateError}</p>
                      }
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
                <h3>Delete Attendence</h3>
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

export default Attendance;
