
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {API_URL,EMPLOYEE_PAYROLL_LIST,FRONT_URL,EMPLOYEE_PROFILE_IMG,EMPLOYEE_PAYROLL_ADD,EMPLOYEE_PAYROLL_DELETE,EMPLOYEE_PAYROLL_SEARCH} from '../../Contants'
import regeneratorRuntime from "regenerator-runtime";
import validator from 'validator';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header'; 
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import moment from 'moment';
import  './EmpPayroll.css';


class EmpPayroll extends Component {
   constructor(props) {
      super(props);
      this.state = {
          employees : [],
          keyword : '',
          userId : '',
          alert : false,
          message : '',
          msgType : '',
          payrolls : null,
          editmonthyear : '',
          editmonthyearError : '',
          monthyearError : '',
          deleteId : ''
          
      };

      this.loadPayrolls = this.loadPayrolls.bind(this);
      this.searchClick = this.searchClick.bind(this);
      this.clickUpdatePayroll = this.clickUpdatePayroll.bind(this);
      this.loadUpdate = this.loadUpdate.bind(this);
      this.changeKeyword = this.changeKeyword.bind(this);
      this.clickAddSalary = this.clickAddSalary.bind(this);
      this.clickUpdateSalary = this.clickUpdateSalary.bind(this);
      this.clickDeleteSalary = this.clickDeleteSalary.bind(this);
      this.clickDelete = this.clickDelete.bind(this);
      
   }


   async loadPayrolls(){
     var user = await localStorage.getItem('user');
     let id = JSON.parse(user).id;
     this.setState({userId : id});
     var fetchData = await fetch(API_URL+EMPLOYEE_PAYROLL_LIST+id).then(res => res.json());
     if(fetchData.code === 200){
       this.setState({
        payrolls : fetchData.data
       });
     }
   }

  //  search list
   async searchClick(e){
       e.preventDefault();
    let monthyear = document.querySelector('#keymonthyear').value;
     var fetchData = await fetch(API_URL+ EMPLOYEE_PAYROLL_SEARCH+"?monthyear="+monthyear+'&emp_id='+this.state.userId)
                      .then(data => data.json());
      if(fetchData.success){
        this.setState({payrolls : fetchData.data});
      }
   }

   formatDate(dateStr){
    var datestr = dateStr.split("-");
    return `${datestr[2]}-${datestr[1]}-${datestr[0]}`;
   }

   async clickUpdatePayroll(e){
     e.preventDefault();
     this.setState({
      
     });
  
     
     var error = false;
  

     var data = {
      
     };
     

    //  var response = await fetch(API_URL+ADMIN_UPDATE_EMPLOYEE, {
    //     method: 'post',
    //     headers:{'content-type': 'application/json'},
    //     body: JSON.stringify(data)
    //   }).then(function(response) {
    //     return response.json();
    //   });

    //   if(response.success){
    //     $('#edit_employee').modal('hide');
    //       this.setState({
    //         alert : true,
    //         message : response.message,
    //         msgType : 'success'
    //       });
    //       this.loadEmployees();
    //   }
    //   else{
    //     $('#edit_employee').modal('hide');
    //     this.setState({
    //       alert : true,
    //       message : '403, Add appointment failed!',
    //       msgType : 'danger'
    //     });
    //   }
   }

   async changeKeyword(){

   }

   async loadUpdate(e){
       e.preventDefault();
   }
   componentDidMount(){
     this.loadPayrolls();
   }
   async clickAddSalary(e){
    e.preventDefault();
    this.setState({monthyearError : ''});
    var monthyear = document.querySelector('#monthyear').value;
    var error = false;
    if(monthyear === ''){
        this.setState({monthyearError : 'Field is required!'});
        error = true;
    }
    var data = {
        emp_id : this.state.userId,
        monthyear : monthyear
    }
    
    var fetchData = await fetch(API_URL + EMPLOYEE_PAYROLL_ADD,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
    }).then(res => res.json());
    $('#add_salary').modal('hide');
 
    if(fetchData.code === 200){   
        this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
        });
        this.loadPayrolls();
    }
    else{
    this.setState({
        alert : true,
        message : '403, Add appointment failed!',
        msgType : 'danger'
    });
    }

   }

   clickDelete(id){
       this.setState({deleteId : id});
   }
   async clickUpdateSalary(e){
       e.preventDefault();
   }
   async clickDeleteSalary(e){
       e.preventDefault();
       let id = this.state.deleteId;
       console.log(API_URL + EMPLOYEE_PAYROLL_DELETE + id);
       var fetchData = await fetch(API_URL + EMPLOYEE_PAYROLL_DELETE + id).then(res => res.json());

       $('#delete_salary').modal('hide');
 
        if(fetchData.code === 200){   
            this.setState({
            alert : true,
            message : fetchData.message,
            msgType : 'success'
            });
            this.loadPayrolls();
        }
        else{
            this.setState({
                alert : true,
                message : '403, Add Payroll failed!',
                msgType : 'danger'
            });
        }

   }
	
   render() {
     const{payrolls,alert,message,msgType, monthyearError, editmonthyear, editmonthyearError} = this.state
          const columns = [
            {
              title: 'Name',
              dataIndex: '',
              render: (text, record) => (            
                  <h2 className="table-avatar">
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id} className="avatar">
                      {
                        record.emp.photo !== '' ?
                        <img alt="" src={EMPLOYEE_PROFILE_IMG+record.emp.photo} />
                        :
                        <img alt="" src='https://via.placeholder.com/150' />
                      }
                    </a>
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id}>{record.emp.name}
                     </a>
                  </h2>
                ),
            },
            {
              title: 'Salary',
              dataIndex: '', 
              render: (text, record) => (            
                <span>${record.emp.salary}</span>
              ),
            },
            {
                title: 'Month',
                dataIndex: '', 
                render: (text, record) => (            
                  <span>{moment(record.period_from).format('MMM Y')}</span>
                ),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (text, record) => (  
                 <div>
                     {
                       record.status === 0 &&
                       <span className="badge badge-primary">Pending</span>
                     }
                     {
                       record.status === 1 &&
                       <span className="badge badge-success">Approved</span>
                     }
                     {
                       record.status === 2 &&
                       <span className="badge badge-danger">Rejected</span>
                     }
                 </div>
                ),
            },
            {
                title: 'Payslip',
                dataIndex: '', 
                render: (text, record) => (            
                    <div>
                        {
                         record.status === 1 ?
                         <a href="#" className="btn  btn-custom" href={FRONT_URL+'employee/salary/'+record.id}>Download</a>
                         :
                         <span className="badge badge-dark">NA</span>
                        }
                    </div>
                ),
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    {
                        record.status === 0 &&
                        <div className="dropdown-menu dropdown-menu-right">
                        {/* <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee" onClick={() => this.loadUpdate(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a> */}
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_salary" onClick={() => this.clickDelete(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                    }
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
                <title>Employee Payroll - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
           {/* Page Header */}
           <div className="page-header">
             <div className="row align-items-center">
               <div className="col">
                 <h3 className="page-title">Employee Salary</h3>
                 <ul className="breadcrumb">
                   <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                   <li className="breadcrumb-item active">Salary</li>
                 </ul>
               </div>
               <div className="col-auto float-right ml-auto">
                 <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_salary"><i className="fa fa-plus" /> New Request</a>
                 
               </div>
             </div>
           </div>
           {/* /Page Header */}
           {/* Search Filter */}
           <div className="row filter-row ">
             <div className="col-sm-12 col-md-6">

             </div>
             <div className="col-sm-6 col-md-3 ">  
               <div className="form-group form-focus">
                 <input type="text" className="form-control floating" id="keymonthyear"/>
                 <label className="focus-label" >Month & Year</label>
               </div>
             </div>
             <div className="col-sm-6 col-md-3">  
               <a href="#" className="btn btn-success btn-block" onClick={(e) =>this.searchClick(e)}> Search </a>  
             </div>     
           </div>
           {
             alert &&
             <div className={'alert alert-dismissible fade show alert-' + msgType } role="alert">
               {message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
             </div>
           }
           
           {/* /Search Filter */}
           <div className="row">
             <div className="col-md-12">
               <div className="table-responsive text-center">
               {payrolls !== null &&
               <Table className="table-striped text-center"
                  pagination= { {total : payrolls.length,
                    showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                  style = {{overflowX : 'auto'}}
                  columns={columns}                 
                  // bordered
                  dataSource={payrolls}
                  rowKey={record => record.id}
                  onChange={this.handleTableChange}
                />
               }
               </div>
             </div>
           </div>
         </div>

         {/* /Page Content */}
         {/* Add Employee Modal */}
         
         <div id="add_salary" className="modal custom-modal fade" role="dialog">
           <div className="modal-dialog modal-dialog-centered" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Add Salary Request</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">×</span>
                 </button>
                
               </div>
               <div className="modal-body">
                 <form>
                   <div className="row">
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Month & Year<span className="text-danger">*</span></label>
                         <input className="form-control" type="text" id="monthyear"/>
                       </div>
                     </div>
                    </div>
                   
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={this.clickAddSalary}>Submit</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
         {/* /Add Employee Modal */}
         {/* Edit Employee Modal */}
        
         <div id="edit_salary" className="modal custom-modal fade" role="dialog">
           <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Edit Salary Request</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">×</span>
                 </button>
               </div>
               <div className="modal-body">
                 <form>
                   
                   <div className="row">

                   </div>
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={this.clickUpdateSalary}>Save</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
         {/* /Edit Employee Modal */}
         {/* Delete Employee Modal */}
         <div className="modal custom-modal fade" id="delete_salary" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Request</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="#" className="btn btn-primary continue-btn" onClick={(e) => this.clickDeleteSalary(e)}>Delete</a>
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
         {/* /Delete Employee Modal */}
       </div>
       </div>
      <SidebarContent />
    </div>
        );
   }
}

export default EmpPayroll;
