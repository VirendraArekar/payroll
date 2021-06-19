
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import $ from 'jquery';
import Department from '../../MainPage/Employees/Employees/department';
import {API_URL,ADMIN_COMPANY_DEPT,ADMIN_ADD_COMPANY_DEPT,ADMIN_COMPANY_DEPT_EDIT,ADMIN_COMPANY_DEPT_UPDATE,ADMIN_COMPANY_DEPT_DELETE} from '../../Contants';

class Dept extends Component {
  constructor(props) {
    super(props);
    this.state = {
       depts : null,
       department : '',
       departmentError : '',
       functionality : '',
       functionalityError : '',
       editdepartment : '',
       editdepartmentError : '',
       editfunctionality : '',
       editfunctionalityError : '',
       alert : false,
       message : '',
       msgType : '',
       editId : '',
       deleteId : ''
    };
    this.loadLeave = this.loadLeave.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeFunctionality = this.changeFunctionality.bind(this);
    this.changeEditDepartment = this.changeEditDepartment.bind(this);
    this.changeEditFunctionality = this.changeEditFunctionality.bind(this);
    this.addLeave = this.addLeave.bind(this);
    this.editAddId = this.editAddId.bind(this);
    this.editDeleteId = this.editDeleteId.bind(this);
    this.updateDept = this.updateDept.bind(this);
    this.deleteDept = this.deleteDept.bind(this);

  }

  async loadLeave(){
    var fetchLeave = await fetch(API_URL+ADMIN_COMPANY_DEPT)
                     .then(res => res.json());
    if(fetchLeave.success){
        this.setState({
            depts : fetchLeave.data,
        });
    }
  }

  componentDidMount(){
      this.loadLeave();
  }

  changeDepartment(event){
    this.setState({department : event.target.value});
  }

  changeFunctionality(event){
    this.setState({functionality : event.target.value});
  }
  
  changeEditDepartment(event){
    this.setState({editdepartment : event.target.value});
  }

  changeEditFunctionality(event){
    this.setState({editfunctionality : event.target.value});
  }


  async addLeave(e){
    e.preventDefault();
    this.setState({
      functionalityError :'',
      departmentError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {functionality,department} = this.state;
    var error = false;

    if(functionality === ''){
      this.setState({functionalityError : 'Field is required!'});
      error = true;
    }
    else if(functionality.length < 3){
      this.setState({functionalityError : 'Functionality must be atleast 3 char long.'});
      error = true;
    }
    
    if(department === ''){
        this.setState({departmentError : 'Field is required!'});
        error = true;
    }
    else if(department.length < 3){
        this.setState({departmentError : 'Department must be atleast 3 char long.'});
        error = true;
    }
   
    if(error){
      return;
    }

    var data = {
      department : department,
      function : functionality
    };

    var addResponse = await fetch(API_URL+ADMIN_ADD_COMPANY_DEPT, {
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

  async editAddId(id){
    this.setState({editAddId : id});
    var fetchData = await fetch(API_URL+ADMIN_COMPANY_DEPT_EDIT+id).then(res => res.json());
    if(fetchData.success){
      console.log(fetchData.data);
      this.setState({
        editdepartment : fetchData.data.department,
        editfunctionality : fetchData.data.function
      })
    }
  }

  async updateDept(e){
    e.preventDefault();
    this.setState({
      editfunctionalityError :'',
      editdepartmentError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {editfunctionality,editdepartment,editAddId} = this.state;
    var error = false;

    if(editfunctionality === ''){
      this.setState({editfunctionalityError : 'Field is required!'});
      error = true;
    }
    else if(editfunctionality.length < 3){
      this.setState({editfunctionalityError : 'Functionality must be atleast 3 char long.'});
      error = true;
    }
    
    if(editdepartment === ''){
        this.setState({editdepartmentError : 'Field is required!'});
        error = true;
    }
    else if(editdepartment.length < 3){
        this.setState({editdepartmentError : 'Department must be atleast 3 char long.'});
        error = true;
    }
   
    if(error){
      return;
    }

    var data = {
      id : editAddId,
      department : editdepartment,
      function : editfunctionality
    };


    var addResponse = await fetch(API_URL+ADMIN_COMPANY_DEPT_UPDATE, {
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

  async editDeleteId(id){
    this.setState({deleteId : id});
    
  }

  async deleteDept(e){
    e.preventDefault();
     var addResponse = await fetch(API_URL + ADMIN_COMPANY_DEPT_DELETE + this.state.deleteId).then(res => {
        return res.json();
      });
    $('#deleteModal').modal('hide');
    if(addResponse.code === 200){
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
    const{department,functionality,departmentError,functionalityError,editdepartment,editfunctionality,editdepartmentError,editfunctionalityError,depts} = this.state
    const columns = [   
      {
        title: 'Department',
        // dataIndex: '',
        render : (text,record) => (
            <div >
                <strong>
                    <a href="#" onClick={() => this.editAddId(record.id)} data-toggle="modal" data-target="#editModal">
                    { record.department }
                    </a>
                </strong><br></br>
                <span className="label label-default">{ record.function }</span>
            </div>
        ),
        sorter: (a, b) => a.department.length - b.department.length,
      },     
      {
        title: 'No of Designations',
        // dataIndex: '',
        render : (text,record) => (
            <h4 className="text-secondary">
                <i className="fa fa-building-o"></i> {record.count} Designation
            </h4>
        ),
        sorter: (a, b) => a.count.length - b.count.length,
      },

      {
        title: 'No of Employees',
        dataIndex: 'reason',
        render : (text,record) => (
            <h4 className="text-secondary">
                <i className="fa fa-group"></i> {record.count2} Employees
            </h4>
        ),
        sorter: (a, b) => a.count2.length - b.count2.length,
      }, 
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editModal" onClick={() => this.editAddId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                       {
                         record.count2 === 0 &&
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#deleteModal" onClick={() => this.editDeleteId(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                       }
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
              <h3 className="page-title">Department</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Department</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <button  className="btn btn-custom" data-toggle="modal" data-target="#addModal"><i className="fa fa-location-arrow" />&nbsp;New Request</button>
            </div>
          </div>
        </div>
        {/* /Page Header */}
       
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
                   depts !== null &&
                   <Table className="table-striped text-center"
                  pagination= { {total : depts.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={depts}
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
              <h5 className="modal-title" id="exampleModalLabel">Add Department</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">             
                  
                  <div className="form-group">
                      <label className="control-label">Department*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="department" name="department" value={department} onChange={this.changeDepartment}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                             
                      </div> 
                      {
                        departmentError &&
                        <p className="text-danger">{departmentError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Functionality*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="functionality" name="functionality" value={functionality} onChange={this.changeFunctionality}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        functionalityError &&
                        <p className="text-danger">{functionalityError}</p>
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
              <h5 className="modal-title" id="exampleModalLabel">Edit Department</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">             
                  
                  <div className="form-group">
                      <label className="control-label">Department*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="department" name="department" value={editdepartment} onChange={this.changeEditDepartment}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                             
                      </div> 
                      {
                        editdepartmentError &&
                        <p className="text-danger">{editdepartmentError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Functionality*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="functionality" name="functionality" value={editfunctionality} onChange={this.changeEditFunctionality}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        editfunctionalityError &&
                        <p className="text-danger">{editfunctionalityError}</p>
                      }
                  </div>                                                                     
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.updateDept}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal custom-modal fade" id="deleteModal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Department</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn" onClick={this.deleteDept}>Delete</a>
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
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Dept;
