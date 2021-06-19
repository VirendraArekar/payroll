
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import {API_URL,EMPLOYEE_LEAVE_LIST,EMPLOYEE_LEAVE_ADD,ADMIN_SEARCH_LEAVE ,ADMIN_EDIT_LEAVE,ADMIN_UPDATE_LEAVE ,EMPLOYEE_SEARCH_LEAVE,ADMIN_DELETE_LEAVE} from '../../Contants';
import $ from 'jquery';
import moment from 'moment';

class Leaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
       leaves : null,
       alert : false,
       message : '',
       msgType : '',
       employees : null,
       reason : '',
       reasonError : '',
       days : '',
       daysError : '',
       start_dateError : '',
       end_dateError : '',

       editemployee_id : '',
       editemployee_idError : '',
       editstart_date : '',
       editstatus : '',
       editstatusError : '',
       editstart_dateError : '',
       editend_date : '',
       editend_dateError : '',
       editemployee_id : '',
       editemployee_idError : '',
       editreason : '',
       editreasonError : '',
       editdays : '',
       editdaysError : '',

       editId : '',
       editLeave : null,
       deleteId : ''  ,
       userId : '' ,
       userData : {}

    };

    this.loadTimeSheet = this.loadTimeSheet.bind(this);
    this.changeReason = this.changeReason.bind(this);
    this.addLeave = this.addLeave.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.editchangeStartDate = this.editchangeStartDate.bind(this);
    this.editchangeEndDate = this.editchangeEndDate.bind(this);
    this.editchangeReason = this.editchangeReason.bind(this);
    this.editLeave = this.editLeave.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.deleteLeave = this.deleteLeave.bind(this);
    this.changeEditEmpID = this.changeEditEmpID.bind(this);
    this.changeEditStatus = this.changeEditStatus.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
  }

  async loadTimeSheet(){
    var user = await localStorage.getItem('user');
    var user = JSON.parse(user);

    this.setState({userId : user.id, userData : user});
    var fetchLeave = await fetch(API_URL + EMPLOYEE_LEAVE_LIST + user.id)
                     .then(res => {
                         return res.json();
                     });
    if(fetchLeave.success){
        this.setState({
            employees : fetchLeave.data
        });
    }
  }

  async loadLeave(){

  }

  changeReason(event){
    this.setState({reason : event.target.value});
  }

  async addLeave(e){
    e.preventDefault();
    this.setState({
      reasonError : '',
      start_dateError : '',
      end_dateError : '',
      daysError : '',
      alert : false,
      message : '',
      msgType : ''
    })

    const {reason, days} = this.state;
    const start_date = document.querySelector('#start_date').value;
    const end_date = document.querySelector('#end_date').value;
    var error = false;

    if(reason === ''){
      this.setState({reasonError : 'Field is required!'});
      error = true;
    }
    else if(reason.length  < 3){
      this.setState({reasonError : 'Reason shouls be atleast 3 char long.'});
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
    if(days === ''){
      this.setState({daysError : 'Field is required!'});
      error = true;
    }
    else if(days === 0){
      this.setState({daysError : 'Days should be greater than 0.'});
      error = true;
    }

    if(error){
      return;
    }
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;

    var data = {
      start_date : start_date,
      end_date :  end_date,
      emp_id : id,
      reason :reason,
      days : days
    };

    var addResponse = await fetch(API_URL+EMPLOYEE_LEAVE_ADD, {
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

  componentDidMount(){
      this.loadTimeSheet();
  }

  async clickSearch(e){
    e.preventDefault();
    const { employees} = this.state;
    let user = localStorage.getItem('user');
    let id = JSON.parse(user).id;
    var data = {
      emp_id : id,
      from : document.querySelector('#from').value,
      to : document.querySelector('#to').value,
    }
    var fetchLeave = await fetch(API_URL + EMPLOYEE_SEARCH_LEAVE, {
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => res.json());

    if(fetchLeave.success){
      this.setState({
        employees : fetchLeave.data
      });

    }
  }

  changeStartDate(event){
    this.setState({start_date : event.target.value});
  }

  changeEndDate(event){
    this.setState({end_date : event.target.value});
  }

  changeReason(event){
    this.setState({reason : event.target.value});
  }

  changeEditEmpID(event){
    this.setState({editemployee_id : event.target.value});
  }

  changeEditStatus(event){
    this.setState({editstatus : event.target.value});
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

  async editLeave(e){
    e.preventDefault();
    this.setState({
      editreasonError :'',
      editend_dateError : '',
      editstart_dateError : '',
      editemployee_idError : '',
      editdaysError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const { editId, editstatus,editemp_id,editdays} = this.state;

    const id = editId;
    const emp_id = editemp_id;
    const editreason = document.querySelector('#editreason').value;
    const start_date = document.querySelector('#editdate-start').value;
    const end_date = document.querySelector('#editdate-end').value;
    var error = false;

    if(editreason === ''){
      this.setState({editreasonError : 'Field is required!'});
      error = true;
    }
    else if(editreason.length < 3){
      this.setState({editreasonError : 'Reason must be atleast 3 char long.'});
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

    if(editdays === ''){
      this.setState({editdaysError : 'Field is required!'});
      error = true;
    }
    else if(editdays === 0){
      this.setState({editdaysError : 'Days should be greater than 0.'});
      error = true;
    }

    if(error){
      return;
    }

    var data = {
      id : id,
      start_date : start_date,
      end_date :  end_date,
      reason : editreason,
      days : editdays

    };



    var addResponse = await fetch(API_URL+ADMIN_UPDATE_LEAVE, {
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
    var editData = await fetch(API_URL+ADMIN_EDIT_LEAVE+id)
                   .then(res => {
                     return res.json();
                   });

    if(editData.success){
      this.setState({
        editLeave : editData.data,
        editstatus : editData.data.status,
        editreason : editData.data.reason,
        editemployee_id :editData.data.emp_id,
        editdays : editData.data.days
      });
    }
  }

  async editSubmit(e){
    e.preventDefault();
  }

  async deleteBtnClick(id){
      this.setState({deleteId : id});
  }

  async deleteLeave(e){
    $('#delete_estimate').modal('hide');
    e.preventDefault();
    var addResponse = await fetch(API_URL+ADMIN_DELETE_LEAVE+this.state.deleteId).then(res => {
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
    const{employees , reason, reasonError, start_dateError,end_dateError ,editemployee_idError,editstart_dateError,editend_dateError,editreasonError,editLeave, alert, message, msgType, days, daysError, editdays, editdaysError} = this.state
    const columns = [
      {
        title: '#',
        // dataIndex: '',
        render : (text,record) => (
            <span className="">{record.id}</span>
        ),
      },
      {
        title: 'Period',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.start_date} - {record.end_date}</span>
        ),
      },
      {
        title: 'No. Of. Days',
        dataIndex: 'days',
        render : (text,record) => (
            <span className="badge badge-info p-2">{record.days}</span>
        ),
      },
      {
        title: 'Reson',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="badge badge-primary p-2">{record.reason}</span>
        ),
      },
      {
        title: 'Status',
        // dataIndex: 'guest',
        render : (text,record) => (
            <div>
              {record.status === 0 &&
                 <span className="badge badge-info p-2">Pending</span>
              }
              {record.status === 2 &&
                 <span className="badge badge-danger p-2">Rejected</span>
              }
              {record.status === 1 &&
                 <span className="badge badge-success p-2">Approved</span>
              }
            </div>
        ),
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                 <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                  { record.status === 0 &&
                     <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editModal" onClick={() => this.editBtnClick(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                      <a className="dropdown-item" href="#" onClick={() => this.deleteBtnClick(record.id)} data-toggle="modal" data-target="#delete_estimate"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                     </div>
                  }
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
              <h3 className="page-title">Leaves</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Leave Requests</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <button  className="btn btn-custom" data-toggle="modal" data-target="#addModal"><span className="fa fa-plus"></span> New Request</button>
            </div>
          </div>
        </div>
         {/* Search Filter */}

         <div className="row filter-row">
          <div className="col-sm-6 col-md-5">
          {console.log(this.state.userData)}
             <h5>Annual Holiday : <span className="text-info font-bold">{this.state.userData.holiday}</span></h5>
             <h5>Remainig Annual Holiday : <span className="text-danger font-bold">{this.state.userData.remain_holiday}</span></h5>
          </div>
          <div className="col-sm-6 col-md-2">
            <div className="form-group form-focus">

                <input className="form-control floating " type="text" id="from"/>

              <label className="focus-label">From</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-2">
            <div className="form-group form-focus">

                <input className="form-control floating " type="text" id="to"/>

              <label className="focus-label">To</label>
            </div>
          </div>

          <div className="col-sm-6 col-md-3">
            <a href="#" className="btn btn-success btn-block" onClick={this.clickSearch}> Search </a>
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
      <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Request</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input type="text" className="form-control" id="start_date"  placeholder="Start Date" />
                {start_dateError &&
                  <p className="text-danger">{start_dateError}</p>
                }

              </div>
              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input type="text" className="form-control" id="end_date"  placeholder="End Date" />
                {end_dateError &&
                  <p className="text-danger">{end_dateError}</p>
                }
              </div>
              <div className="form-group">
                <label htmlFor="end_date">No. of days</label>
                <input type="number" className="form-control" id="days"  placeholder="No of days"  value={this.state.days} onChange={(e) => this.setState({days : e.target.value})}/>
                {daysError &&
                  <p className="text-danger">{daysError}</p>
                }
              </div>
              <div className="form-group">
                <label htmlFor="reason">Reason</label>
                <input type="text" className="form-control" id="reason"  placeholder="Reason" value={reason} onChange={this.changeReason}/>
                {reasonError &&
                  <p className="text-danger">{reasonError}</p>
                }
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.addLeave}>submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Leave Edit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">
                  <div className="form-group">
                      <label className="control-label">Start date*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined datetimepicker" required="" id="editdate-start" name="start_date" value={editLeave !== null ?  editLeave.start_date : ''}/>
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
                      <label className="control-label">End date*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined datetimepicker" required="" id="editdate-end" name="end_date" value={editLeave !== null ?  editLeave.end_date : ''}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div>
                      {
                        editend_dateError &&
                        <p className="text-danger">{editend_dateError}</p>
                      }
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_date">No. of days</label>
                    <input type="number" className="form-control" id="days"  placeholder="No of days"  value={this.state.editdays} onChange={(e) => this.setState({editdays : e.target.value})}/>
                    {editdaysError &&
                      <p className="text-danger">{editdaysError}</p>
                    }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Reason*</label>
                      <input type="text" className="form-control underlined" name="reason"  id="editreason" value={this.state.editreason} onChange={this.editchangeReason}/>
                      {
                        editreasonError &&
                        <p className="text-danger">{editreasonError}</p>
                      }
                  </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.editLeave}>Submit</button>
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
                    <a href="#" className="btn btn-primary continue-btn" onClick={this.deleteLeave}>Delete</a>
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

export default Leaves;
