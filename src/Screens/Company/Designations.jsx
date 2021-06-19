
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
import {ADMIN_COMPANY_DESIGN_DELETE,API_URL,ADMIN_COMPANY_DESIGN,ADMIN_COMPANY_POSTING_CREATE,ADMIN_COMPANY_DESIGN_EDIT,ADMIN_COMPANY_DESIGN_UPDATE} from '../../Contants'

class Designations extends Component {
  constructor(props) {
    super(props);
    this.state = {
       depts : null,
       deptses : null,
       department : '',
       departmentError : '',
       designation : '',
       designationError : '',
       editdepartment : '',
       editdepartmentError : '',
       editdesignation : '',
       editdesignationError : '',
       editdeptData : null,
       editId : '',
       alert : false,
       message : '',
       msgType : '',
       editData : null,
       editDeptId : '',
       deleteId : ''
    };
    this.loadLeave = this.loadLeave.bind(this);
    this.changeDepartment = this.changeDepartment.bind(this);
    this.changeDesignation = this.changeDesignation.bind(this);
    this.changeEditDepartment = this.changeEditDepartment.bind(this);
    this.changeEditDesignation = this.changeEditDesignation.bind(this);
    this.addLeave = this.addLeave.bind(this);
    this.updateDesign = this.updateDesign.bind(this);
    this.editAddId = this.editAddId.bind(this);
    this.editDeleteId = this.editDeleteId.bind(this);
    this.deleteDept = this.deleteDept.bind(this);
  }

  async loadLeave(){
    var fetchLeave = await fetch(API_URL+ADMIN_COMPANY_DESIGN)
                     .then(res => res.json());
    if(fetchLeave.success){
        this.setState({
            depts : fetchLeave.data.posting,
            deptses : fetchLeave.data.dept
        });
    }
  }

  componentDidMount(){
      this.loadLeave();
  }

  changeDepartment(event){
    this.setState({department : event.target.value});
  }

  changeDesignation(event){
    this.setState({designation : event.target.value});
  }

  changeEditDepartment(event){
    this.setState({editdepartment : event.target.value});
  }

  changeEditDesignation(event){
    this.setState({editdesignation : event.target.value});
  }

  async addLeave(e){
    e.preventDefault();
    this.setState({
      designationError :'',
      departmentError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {designation} = this.state;
    const department = document.querySelector('#department').value;
    var error = false;

    if(designation === ''){
      this.setState({designationError : 'Field is required!'});
      error = true;
    }
    else if(designation.length < 3){
      this.setState({designationError : 'Designation must be atleast 3 char long.'});
      error = true;
    }
    
    if(department === ''){
        this.setState({departmentError : 'Field is required!'});
        error = true;
    }

   
    if(error){
      return;
    }

    var data = {
      dept_id : department,
      post : designation
    };

    var addResponse = await fetch(API_URL+ADMIN_COMPANY_POSTING_CREATE, {
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
    this.setState({editId : id});
    var fetchData = await fetch(API_URL+ADMIN_COMPANY_DESIGN_EDIT+id).then(res => res.json());
    if(fetchData.success){
      console.log(fetchData.data);
      this.setState({
        editdesignation : fetchData.data.post,
        editdepartment : fetchData.data.dept_id
      });
    }
  }

  async updateDesign(e){
    e.preventDefault();
    this.setState({
      editdesignationError :'',
      editdepartmentError : '',
      alert : false,
      message : '',
      msgType : ''
    });

    const {editdesignation,editId,editdepartment} = this.state;
    // const department = document.querySelector('#editdepartment').value;
    var error = false;

    if(editdesignation === ''){
      this.setState({editdesignationError : 'Field is required!'});
      error = true;
    }
    else if(editdesignation.length < 3){
      this.setState({editdesignationError : 'Designation must be atleast 3 char long.'});
      error = true;
    }
    
    if(editdepartment === ''){
        this.setState({editdepartmentError : 'Field is required!'});
        error = true;
    }

   
    if(error){
      return;
    }

    var data = {
      id : editId,
      dept_id : editdepartment,
      post : editdesignation
    };



    var addResponse = await fetch(API_URL+ADMIN_COMPANY_DESIGN_UPDATE, {
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
     var addResponse = await fetch(API_URL + ADMIN_COMPANY_DESIGN_DELETE + this.state.deleteId).then(res => {
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
    const{depts ,deptses ,department,designation,designationError,departmentError,editdepartment,editdesignation,editdesignationError,editdepartmentError} = this.state
    const columns = [   
      {
        title: '',
        // dataIndex: '',
        render : (text,record) => (
            <div>
                <strong>
                    <a href="#" onClick={() => this.editAddId(record.id)} data-toggle="modal" data-target="#editModal">
                    { record.post }
                    </a>
                </strong> 
                <br></br>
                <span className="label label-default">{ record.dept.department }</span>
            </div>
        ),
      },     
      {
        title: '',
        // dataIndex: '',
        render : (text,record) => (
            <h4 className="text-secondary">
                <i className="fa fa-building-o"></i> {record.count} Designation
            </h4>
        ),
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#editModal" onClick={() => this.editAddId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                       {
                         record.count === 0 &&
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
              <h3 className="page-title">Designations</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Designations</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <button  className="btn add-btn" data-toggle="modal" data-target="#addModal"><i className="fa fa-location-arrow" /> New Request</button>
            </div>
          </div>
        </div>
        {/* /Page Header */}
       
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
              <h5 className="modal-title" id="exampleModalLabel">Add Designation</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">             
                  <div className="form-group">
                      <label className="control-label">Designation*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="designation" name="designation" value={this.state.designation}  onChange={this.changeDesignation}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        designationError &&
                        <p className="text-danger">{designationError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Department*</label>
                      <div className="input-group date">
                         <select className="form-control" id="department" onChange={this.changeEditDepartment}>
                           <option value="">Select one</option>
                           {
                               deptses !== null &&
                               deptses.map((item,index) => {
                                   return(
                                       <option value={item.id} key={index}
                                       >{item.department}</option>
                                   )
                               })
                           }
                         </select>
                      </div> 
                      {
                        departmentError &&
                        <p className="text-danger">{departmentError}</p>
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
              <h5 className="modal-title" id="exampleModalLabel">Edit Designation</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <form className="form-horizontal" role="form" method="POST">             
                  <div className="form-group">
                      <label className="control-label">Designation*</label>
                      <div className="input-group date">
                         <input type="text" className="form-control underlined" required="" id="editdesignation" name="editdesignation" value={this.state.editdesignation}  onChange={this.changeEditDesignation}/>
                           <span className="input-group-addon">
                             <span className="glyphicon glyphicon-calendar" ></span>
                           </span>
                      </div> 
                      {
                        editdesignationError &&
                        <p className="text-danger">{editdesignationError}</p>
                      }
                  </div>
                  <div className="form-group">
                      <label className="control-label">Department*</label>
                      <div className="input-group date">
                         <select className="form-control" id="editdepartment" value={this.state.editdepartment} onChange={this.changeEditDepartment}>
                           <option value="">Select one</option>
                           {
                               deptses !== null &&
                               deptses.map((item,index) => {
                                   return(
                                       <option value={item.id} key={index}
                                       >{item.department}</option>
                                   )
                               })
                           }
                         </select>
                      </div> 
                      {
                        editdepartmentError &&
                        <p className="text-danger">{editdepartmentError}</p>
                      }
                  </div>                                                                     
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={this.updateDesign}>Submit</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      {/*Delete Modal*/}
      <div className="modal custom-modal fade" id="deleteModal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Designation</h3>
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

export default Designations;
