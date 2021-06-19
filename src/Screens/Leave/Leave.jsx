
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
import {API_URL,ADMIN_ADD_LEAVE,ADMIN_EDIT_LEAVE,ADMIN_DELETE_LEAVE,ADMIN_UPDATE_LEAVE,ADMIN_LIST_LEAVE,ADMIN_SEARCH_LEAVE} from '../../Contants';

class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //    user : {},
       leaves : null,
       employees : null,
       keyword : '',
       start_date : '',
       start_dateError : '',
       end_date : '',
       end_dateError : '',
       employee_id : '',
       employee_idError : '',
       reason : '',
       reasonError : '',
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
       alert : false,
       message : '',
       msgType : '',
       editId : '',
       editLeave : null,
       deleteId : '',
       status : '',
       days : '',
       editdays : '',
       daysError : '',
       editdaysError : ''
    };
    this.loadLeave = this.loadLeave.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeReason = this.changeReason.bind(this);
    this.addLeave = this.addLeave.bind(this);
    this.editchangeStartDate = this.editchangeStartDate.bind(this);
    this.editchangeEndDate = this.editchangeEndDate.bind(this);
    this.editchangeReason = this.editchangeReason.bind(this);
    this.editLeave = this.editLeave.bind(this);
    this.editBtnClick = this.editBtnClick.bind(this);
    this.deleteBtnClick = this.deleteBtnClick.bind(this);
    this.deleteLeave = this.deleteLeave.bind(this);
    this.changeEditEmpID = this.changeEditEmpID.bind(this);
    this.changeEditStatus = this.changeEditStatus.bind(this);
  }

  async loadLeave(){
    // var uer = localStorage.getItem('user');
    // this.setState({user : JSON.parse('user')});
    var fetchLeave = await fetch(API_URL+ADMIN_LIST_LEAVE)
                     .then(res => res.json());
    if(fetchLeave.success){
        this.setState({
            leaves : fetchLeave.data['leaves'],
            employees : fetchLeave.data['employees']
        });
    }
  }

  async clickSearch(e){
      e.preventDefault();

      var data ={
        emp_id : this.state.keyword,
        from : document.querySelector('#from').value,
        to : document.querySelector('#to').value,
      };

      var fetchLeave = await fetch(API_URL + ADMIN_SEARCH_LEAVE , {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      })
                     .then(res => res.json());
      if(fetchLeave.success){
        this.setState({
            leaves : fetchLeave.data['leaves'],
            employees : fetchLeave.data['employees']
        });
      }
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }

  componentDidMount(){
      this.loadLeave();
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

  async addLeave(e){
    e.preventDefault();
    this.setState({
      reasonError :'',
      end_dateError : '',
      start_dateError : '',
      employee_idError : '',
      daysError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {reason, days} = this.state;
    const emp_id = document.querySelector('#emp_id').value;
    const start_date = document.querySelector('#date-start').value;
    const end_date = document.querySelector('#date-end').value;
    var error = false;

    if(reason === ''){
      this.setState({reasonError : 'Field is required!'});
      error = true;
    }
    else if(reason.length < 3){
      this.setState({reasonError : 'Reason must be atleast 3 char long.'});
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

    var data = await {
      emp_id : emp_id,
      start_date : start_date,
      end_date :  end_date,
      reason : reason,
      days : days
    };


    var addResponse = await fetch(API_URL + ADMIN_ADD_LEAVE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      });
    $('#addModal').modal('hide');
    if(addResponse.success){
      this.loadLeave();
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

    const { editId, editstatus,editemp_id, editdays} = this.state;

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
      status : parseInt(editstatus),
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
      this.loadLeave();
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
      this.loadLeave();
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
    const{data,leaves, employees,employee_idError,start_dateError,end_dateError,reasonError,editemployee_idError,editstart_dateError,editend_dateError,editreasonError,editLeave,days, daysError, editdays, editdaysError} = this.state
    const columns = [
      {
        title: 'Employee',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-info p-2">{record.emp.name}</span>
        )
      },
      {
        title: 'Period',
        // dataIndex: '',
        render : (text,record) => (
            <span className="badge badge-dark p-2">{record.start_date} to {record.end_date}</span>
        )
      },

      {
        title: 'Reason',
        dataIndex: 'reason',
        sorter: (a, b) => a.reason.length - b.reason.length,
      },
      {
        title: 'No of days',
        dataIndex: 'days',
         render : (text,record) => (
            <span className="badge badge-primary p-2">{text}-Days</span>
        )
      },
      {
        title: 'Status',
        // dataIndex: '',
        render: (text, record) => (
        <span className={ record.status ? "badge bg-inverse-success p-2" : "badge bg-inverse-info p-2"}>{record.status === 1 ? 'Approved' : ''}{record.status === 0 ? 'Pending' : ''}{record.status === 2 ? 'Rejected' : ''}</span>
          )
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
    ]
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
              <h3 className="page-title">Vacation</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Leave</a></li>
                <li className="breadcrumb-item active">Request</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <button  className="btn btn-custom" data-toggle="modal" data-target="#addModal"><i className="fa fa-location-arrow" /> New Leave</button>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}

        <div className="row filter-row">
            <div className="col-sm-6 col-md-3">
                {/* <h4 className="text-info">
                Annual Leave : {this.state.user.holiday === '' || this.state.user.holiday === undefined ? 0 : this.state.user.holiday}
                </h4>
                <h4 className="text-danger">
                Remaining Leave : {this.state.user.remain_holiday === '' || this.state.user.remain_holiday === undefined ? 0 : this.state.user.remain_holiday}
                </h4> */}
            </div>

            <div className="col-sm-6 col-md-2">
              <div className="form-group form-focus">
                  <select className="form-control" onChange={this.changeKeyword} value={this.state.keyword}>
                    <option value="">Select Employee</option>
                    {
                      employees !== null &&
                      employees.map((item,index) => {
                        return(
                            <option value={item.id} key={index}>{item.name}</option>
                          )
                      })
                    }
                  </select>
              </div>
            </div>
           <div className="col-sm-6 col-md-2">
                <div className="cal-icon">
                   <input className="form-control floating " type="text" id="from" placeholder="from"/>
                </div>
          </div>
          <div className="col-sm-6 col-md-2">
              <div className="cal-icon">
                   <input className="form-control floating " type="text" id="to" placeholder="to"/>
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
                   leaves !== null &&
                   <Table className="table-striped text-center"
                  pagination= { {total : leaves.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}
                  // bordered
                  dataSource={leaves}
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
                           employees !== null &&
                           employees.map((item,index) => {
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
                      <label className="control-label">Start date<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control" required="" id="date-start" name="start_date"/>


                      </div>
                      {
                        start_dateError &&
                        <p className="text-danger">{start_dateError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">End date<span className="text-danger">*</span></label>
                      <div className="input-group date">
                         <input type="text" className="form-control" required="" id="date-end" name="end_date"/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div>
                      {
                        end_dateError &&
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
                      <label className="control-label">Reason<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="reason" value={this.state.reason} onChange={this.changeReason}/>
                      {
                        reasonError &&
                        <p className="text-danger">{reasonError}</p>
                      }
                  </div>

                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.addLeave}>Submit</button>
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
              <h5 className="modal-title" id="exampleModalLabel">Leave Edit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">
                  <div className="form-group">
                    <label className="control-label">Employee<span className="text-danger">*</span></label>

                       <select className="form-control" name="emp_id" id="editemp_id" value={this.state.editemployee_id} onChange={this.changeEditEmpID}>
                         <option value="">Select one</option>
                         {
                           employees !== null &&
                           employees.map((item,index) => {
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
                      <label className="control-label">Start date<span className="text-danger">*</span></label>
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
                      <label className="control-label">End date<span className="text-danger">*</span></label>
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
                      <label className="control-label">Reason<span className="text-danger">*</span></label>
                      <input type="text" className="form-control underlined" name="reason"  id="editreason" value={this.state.editreason} onChange={this.editchangeReason}/>
                      {
                        editreasonError &&
                        <p className="text-danger">{editreasonError}</p>
                      }
                  </div>
                  <div className="form-group">
                    <label className="control-label">Status*</label>
                       <select className="form-control" name="status" id="editstatus" value={this.state.editstatus} onChange={this.changeEditStatus}>
                         <option value="">Select one</option>
                            <option value="0" >Pending</option>
                            <option value="1" >Approved</option>
                            <option value="2" >Rejected</option>
                       </select>
                       {
                         editemployee_idError &&
                         <p className="text-danger">{editemployee_idError}</p>
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

export default Leave;
