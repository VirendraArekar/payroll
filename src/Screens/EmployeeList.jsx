
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {CORE,ADD_APPONTMENT,ADMIN_ALL_EMPLOYEE_SEARCH,EMPLOYEE_PROFILE_IMG,API_URL,ADMIN_ALL_EMPLOYEE,ADMIN_SINGLE_EMPLOYEE,ADMIN_CREATE_EMPLOYEE,ADMIN_UPDATE_EMPLOYEE,FRONT_URL,ADMIN_CHANGE_EMP_STATUS,ADMIN_EMP_DELETE} from '../Contants'
import regeneratorRuntime from "regenerator-runtime";
import validator from 'validator';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { RemoteChunkSize } from 'papaparse';


class Employeelist extends Component {
   constructor(props) {
      super(props);
      this.state = {
          employees : [],
          keyword : '',
          posts:[],
          editName: '',
          editGender:'',
          editDob : '',
          editFatherName :'',
          editEmail : '',
          editMobile : '',
          editAddress : '',
          editPhoto  : '',
          editResume : '',
          editDesignation : '',
          editSalary : '',
          editNotes : '',
          editDoj : '',
          editNameError: '',
          editGenderError:'',
          editDobError : '',
          editFatherNameError :'',
          editEmailError : '',
          editMobileError : '',
          editAddressError : '',
          editPhotoError  : '',
          editResumeError : '',
          editDesignationError : '',
          editSalaryError : '',
          editNotesError : '',
          editDojError : '',
          editforeigner : '',
          editforeignerError : '',
          alert : false,
          message : '',
          msgType : '',
          updateName: '',
          updateGender:'',
          updateDob : '',
          updateFatherName :'',
          updateEmail : '',
          updateMobile : '',
          updateAddress : '',
          updatePhoto  : '',
          updateResume : '',
          updateDesignation : '',
          updateSalary : '',
          updateNotes : '',
          updateDoj : '',
          updateNameError: '',
          updateGenderError:'',
          updateDobError : '',
          updateFatherNameError :'',
          updateEmailError : '',
          updateMobileError : '',
          updateAddressError : '',
          updatePhotoError  : '',
          updateResumeError : '',
          updateDesignationError : '',
          updateSalaryError : '',
          updateNotesError : '',
          updateDojError : '',
          updateForeigner : '',
          updateForeignerError :'',
          facebook :'',
          facebookError : '',
          twitter : '',
          twitterError : '',
          linkedin : '',
          linkedinError : '',
          github : '',
          githubError : '',
          employee : {},
          editEmployeeId : null,
          deleteId : ''
      };

      this.changeKeyword = this.changeKeyword.bind(this);
      this.searchClick = this.searchClick.bind(this);
      this.changeEditName = this.changeEditName.bind(this);
      this.changeEditGenderMale = this.changeEditGenderMale.bind(this);
      this.changeEditGenderFemale = this.changeEditGenderFemale.bind(this);
      this.changeEditDob = this.changeEditDob.bind(this);
      this.changeEditFatherName = this.changeEditFatherName.bind(this);
      this.changeEditEmail = this.changeEditEmail.bind(this);
      this.changeEditMobile = this.changeEditMobile.bind(this);
      this.changeEditAddress = this.changeEditAddress.bind(this);
      this.changeEditPhoto = this.changeEditPhoto.bind(this);
      this.changeEditResume = this.changeEditResume.bind(this);
      this.changeEditSalary = this.changeEditSalary.bind(this);
      this.changeEditNotes = this.changeEditNotes.bind(this);
      this.changeEditDoj = this.changeEditDoj.bind(this);
      this.clickAddAppointment = this.clickAddAppointment.bind(this);
      this.changeEditForeigner = this.changeEditForeigner.bind(this);
      this.changeEditForeigner2 = this.changeEditForeigner2.bind(this);
      // edit bind
      this.changeUpdateName = this.changeUpdateName.bind(this);
      this.changeUpdateDob = this.changeUpdateDob.bind(this);
      this.changeUpdateFatherName = this.changeUpdateFatherName.bind(this);
      this.changeUpdateEmail = this.changeUpdateEmail.bind(this);
      this.changeUpdateMobile = this.changeUpdateMobile.bind(this);
      this.changeUpdateAddress = this.changeUpdateAddress.bind(this);
      this.changeUpdatePhoto = this.changeUpdatePhoto.bind(this);
      this.changeUpdateResume = this.changeUpdateResume.bind(this);
      this.changeUpdateSalary = this.changeUpdateSalary.bind(this);
      this.changeUpdateNotes = this.changeUpdateNotes.bind(this);
      this.changeUpdateDoj = this.changeUpdateDoj.bind(this);
      this.clickUpdateProfile = this.clickUpdateProfile.bind(this);
      this.changeFacebook = this.changeFacebook.bind(this);
      this.changeTwitter = this.changeTwitter.bind(this);
      this.changeLinkedin = this.changeLinkedin.bind(this);
      this.changeGithub= this.changeGithub.bind(this);
      this.loadUpdate = this.loadUpdate.bind(this);
      this.changeUpdateForeigner = this.changeUpdateForeigner.bind(this);
      this.changeUpdateForeigner2 = this.changeUpdateForeigner2.bind(this);
      this.changeUpdateGenderMale = this.changeUpdateGenderMale.bind(this);
      this.changeUpdateGenderFemale = this.changeUpdateGenderFemale.bind(this);
      this.changeUpdateDesignation = this.changeUpdateDesignation.bind(this);
      this.changeStatus = this.changeStatus.bind(this);
      this.deleteClick = this.deleteClick.bind(this);
      this.deleteEmp = this.deleteEmp.bind(this);
   }

   changeKeyword (event){
      this.setState({keyword : event.target.value});
   }

   changeEditName (event){
    this.setState({editName : event.target.value});
   }
   
  changeEditGenderMale (event, gender){
    if(event.target.value)
       this.setState({editGender : 'male'});
  }

  changeEditGenderFemale (event, gender){
    if(event.target.value)
       this.setState({editGender : 'female'});
  }

  changeUpdateGenderMale (event, gender){
    if(event.target.value)
       this.setState({updateGender : 'male'});
  }

  changeUpdateGenderFemale (event, gender){
    if(event.target.value)
       this.setState({updateGender : 'female'});
  }

   changeEditDob (event){
    this.setState({editDob : event.target.value});
   }

   changeEditForeigner(event){
    if(event.target.value)
       this.setState({editforeigner : 1});
   }

   changeEditForeigner2(event){
      if(event.target.value)
        this.setState({editforeigner : 0});
   }

   changeUpdateForeigner(event){
    if(event.target.value)
       this.setState({updateForeigner : 1});
   }

   changeUpdateForeigner2(event){
    if(event.target.value)
       this.setState({updateForeigner : 0});
   }

   changeEditFatherName (event){
    this.setState({editFatherName : event.target.value});
   }

   changeEditEmail (event){
    this.setState({editEmail : event.target.value});
   }

   changeEditMobile (event){
    this.setState({editMobile : event.target.value});
   }

   changeEditAddress (event){
    this.setState({editAddress : event.target.value});
   }

   changeFacebook(event){
    this.setState({facebook : event.target.value});
   }

   changeTwitter(event){
    this.setState({twitter : event.target.value});
   }

   changeLinkedin(event){
    this.setState({linkedin : event.target.value});
   }

   changeGithub(event){
    this.setState({github : event.target.value});
   }

   createImage(file, name) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if(name === 'editPhoto')
         this.setState({
          editPhoto: e.target.result
         })
        else
         this.setState({
          editResume: e.target.result
         })
      };
      // reader.readAsDataURL(file);
   }

   changeEditPhoto (e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0],'editPhoto');
      // this.setState({editPhoto : event.target.value});
   }

   changeEditResume (e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0],'editResume');
      // this.setState({editResume : event.target.value});
   }

   changeEditSalary (event){
    this.setState({editSalary : event.target.value});
   }

   changeEditNotes (event){
    this.setState({editNotes : event.target.value});
   }

   changeEditDoj (event){
    this.setState({editDoj : event.target.value});
   }

    //  update functions
   changeUpdateName (event){
    this.setState({updateName : event.target.value});
   }
   changeUpdateDob (event){
    this.setState({updateDob : event.target.value});
   }

   changeUpdateFatherName (event){
    this.setState({updateFatherName : event.target.value});
   }

   changeUpdateEmail (event){
    this.setState({updateEmail : event.target.value});
   }

   changeUpdateMobile (event){
    this.setState({updateMobile : event.target.value});
   }

   changeUpdateAddress (event){
    this.setState({updateAddress : event.target.value});
   }

   createImage(file, name) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if(name === 'updatePhoto')
         this.setState({
          updatePhoto: e.target.result
         })
        else
         this.setState({
          updateResume: e.target.result
         })
      };
      // reader.readAsDataURL(file);
   }

   changeUpdatePhoto (e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0],'updatePhoto');
      // this.setState({UpdatePhoto : event.target.value});
   }

   changeUpdateResume (e){
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
            return;
      this.createImage(files[0],'updateResume');
      // this.setState({UpdateResume : event.target.value});
   }

   changeUpdateSalary (event){
      this.setState({updateSalary : event.target.value});
   }
   changeUpdateDesignation(event){
     this.setState({updateDesignation : event.target.value});
   }

   changeUpdateNotes (event){
     this.setState({updateNotes : event.target.value});
   }

   changeUpdateDoj (event){
     this.setState({updateDoj : event.target.value});
   }

   async loadUpdate(id){
     var employee = await fetch(API_URL+ADMIN_SINGLE_EMPLOYEE+id).then(res => res.json());

     if(employee.success){
       this.setState({
         facebook : employee.data.facebook,
         twitter : employee.data.twitter,
         linkedin : employee.data.linkedin,
         github : employee.data.github,
         updateName : employee.data.name,
         updateAddress : employee.data.address,
         updateFatherName : employee.data.father,
         updateEmail : employee.data.email,
         updateMobile : employee.data.mobile,
         updateNotes: employee.data.notes,
         updateDesignation : employee.data.posting,
         updateSalary : employee.data.salary,
         updateGender : employee.data.sex,
         updateDesignation : employee.data.post_id,
         updateForeigner : employee.data.foreigner,
       });
       this.setState({editEmployeeId : id});
       this.setState({employee : employee.data});
      //  this.setState({editdesignation : employee.data.post_id});
     }
   }

  //  search list
   async searchClick(){
     var fetchData = await fetch(API_URL+ADMIN_ALL_EMPLOYEE_SEARCH+"query="+this.state.keyword)
                      .then(data => data.json())
                      .then(data => {
                        return data
                      })
                      .catch(err => console.log(err));
      if(fetchData.success){
        this.setState({employees : fetchData.data['employees']});
      }
   }
  // load all employees
   async loadEmployees(page=1, limit = 10){
      var fetchData = await fetch(API_URL+ADMIN_ALL_EMPLOYEE)
                      .then(data => data.json())
                      .then(data => {
                        return data
                      })
                      .catch(err => console.log(err));
      if(fetchData.success){
        console.log(fetchData.data['employees']);
        this.setState({employees : fetchData.data['employees']});
        this.setState({posts : fetchData.data['posts']});
      }
   }

   formatDate(dateStr){
      var datestr = dateStr.split("-");
      return `${datestr[2]}-${datestr[1]}-${datestr[0]}`;
   }

   async clickUpdateProfile(e){
     e.preventDefault();
     this.setState({
      updateNameError: '',
      updateGenderError:'',
      updateDobError : '',
      updateFatherNameError :'',
      updateEmailError : '',
      updateMobileError : '',
      updateAddressError : '',
      updatePhotoError  : '',
      updateResumeError : '',
      updateDesignationError : '',
      updateSalaryError : '',
      updateNotesError : '',
      updateDojError : '',
      updateForeignerError : '',
      updateGenderError : ''
     });
  
     let name = this.state.updateName;
     let gender = this.state.updateGender;
     let foreigner = this.state.updateForeigner;
     let dob = document.querySelector('#dobs').value;
     let father = this.state.updateFatherName;
     let email = this.state.updateEmail;
     let mobile = this.state.updateMobile;
     let address = this.state.updateAddress;
     let photo = this.state.updatePhoto;
     let resume = this.state.updateResume;
     let designation = this.state.updateDesignation;
     let salary = this.state.updateSalary;
     let notes = this.state.updateNotes;
     let doj = document.querySelector('#dojs').value;
     var error = false;
  
    
         if(name === ''){
           this.setState({updateNameError : 'Field is required!'});
           error = true;
         }
         else if(name.length < 3){
           this.setState({updateNameError : 'Name must be atleast 3 character long.'});
           error = true;
         }
      
         if(gender === ''){
           this.setState({updateGenderError : 'Field is required!'});
           error = true;
         }

         if(foreigner === ''){
           this.setState({updateForeignerError : 'Field is required!'});
           error = true;
         }
      
         if(father === ''){
          this.setState({updateFatherError : 'Field is required!'});
          error = true;
         }
         else if(father.length < 3){
          this.setState({updateFatherNameError : 'Name must be atleast 3 character long.'});
          error = true;
         }
      
         if(email === ''){
           this.setState({updateEmailError : 'Field is required!'});
           error = true;
         }
         else if(!validator.isEmail(email)){
          this.setState({updateEmailError: 'Invalid email address.'});
          error = true;
         }
      
         
         if(mobile === ''){
          this.setState({updateMobileError: 'Field is required!'});
          error = true;
         }
      

         if(salary === ''){
          this.setState({updateSalaryError: 'Field is required!'});
          error = true;
         }
         else if(salary.length < 4){
          this.setState({updateSalaryError: 'Salary must be atleast 4 digit long.'});
          error = true;
         }
      
      
         if(address === ''){
          this.setState({updateMobileError: 'Field is required!'});
          error = true;
         }
         else if(address.length < 10){
          this.setState({updateAddressError: 'Address must me atleast 10 character long.'});
          error = true;
         }
      
    
         if(designation === ''){
          this.setState({updateDesignationError: 'Field is required!'});
          error = true;
         }

         if(error){
           return;
         }

     var data = {
       id : this.state.editEmployeeId ,
       name : name,
       posting : designation,
       father : father,
       dob : dob,
       doj : doj,
       mobile : mobile,
       email : email,
       salary : salary,
       sex : gender,
       foreigner : foreigner,
       address : address,
       notes : notes,
       facebook : this.state.facebook,
       github : this.state.github,
       twitter : this.state.twitter,
       linkedin : this.state.linkedin,
       photo : photo,
       resume : resume
     };
     

     var response = await fetch(API_URL+ADMIN_UPDATE_EMPLOYEE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(function(response) {
        return response.json();
      });

      if(response.success){
        $('#edit_employee').modal('hide');
          this.setState({
            alert : true,
            message : response.message,
            msgType : 'success'
          });
          this.loadEmployees();
      }
      else{
        $('#edit_employee').modal('hide');
        this.setState({
          alert : true,
          message : '403, Add appointment failed!',
          msgType : 'danger'
        });
      }
   }

   async clickAddAppointment(e){
     e.preventDefault();
     this.setState({
      editNameError: '',
      editGenderError:'',
      editDobError : '',
      editFatherNameError :'',
      editEmailError : '',
      editMobileError : '',
      editAddressError : '',
      editPhotoError  : '',
      editResumeError : '',
      editDesignationError : '',
      editSalaryError : '',
      editNotesError : '',
      editDojError : '',
      editforeignerError : ''
     });
  
     let name = this.state.editName;
     let gender = this.state.editGender;
     let foreigner =  this.state.editforeigner;
     let dob = document.querySelector('#dob').value;
     let father = this.state.editFatherName;
     let email = this.state.editEmail;
     let mobile = this.state.editMobile;
     let address = this.state.editAddress;
     let photo = this.state.editPhoto;
     let resume = this.state.editResume;
     let designation = document.querySelector('#designation').value;
     let salary = this.state.editSalary;
     let notes = this.state.editNotes;
     let doj = document.querySelector('#doj').value;
     var error = false;
  
    
     if(name === ''){
       this.setState({editNameError : 'Field is required!'});
       error = true;
     }
     else if(name.length < 3){
       this.setState({editNameError : 'Name must be atleast 3 character long.'});
       error = true;
     }
  
     if(gender === ''){
       this.setState({editGenderError : 'Field is required!'});
       error = true;
     }

     if(foreigner === ''){
       this.setState({editforeignerError : 'Field is required!'});
       error = true;
     }
  
  
     if(father === ''){
      this.setState({editFatherNameError : 'Field is required!'});
      error = true;
     }
     else if(father.length < 3){
      this.setState({editFatherNameError : 'Name must be atleast 3 character long.'});
      error = true;
     }

  
     if(email === ''){
       this.setState({editEmailError : 'Field is required!'});
       error = true;
     }
     else if(!validator.isEmail(email)){
      this.setState({editEmailError: 'Invalid email address.'});
      error = true;
     }
  
     
     if(mobile === ''){
      this.setState({editMobileError: 'Field is required!'});
      error = true;
     }
     else if(!validator.isMobilePhone(mobile)){
      this.setState({editMobileError: 'Invalid mobile number.'});
      error = true;
     }

     if(salary === ''){
      this.setState({editSalaryError: 'Field is required!'});
      error = true;
     }
     else if(salary.length < 4){
      this.setState({editSalaryError: 'Salary must be atleast 4 digit long.'});
      error = true;
     }
  
  
     if(address === ''){
      this.setState({editMobileError: 'Field is required!'});
      error = true;
     }
     else if(address.length < 10){
      this.setState({editAddressError: 'Address must me atleast 10 character long.'});
      error = true;
     }

     if(dob === ''){
      this.setState({editDobError: 'Field is required!'});
      error = true;
     }

     if(doj === ''){
      this.setState({editDojError: 'Field is required!'});
      error = true;
     }

     if(address === ''){
      this.setState({editAddressError: 'Field is required!'});
      error = true;
     }

     if(designation === ''){
      this.setState({editDesignationError: 'Field is required!'});
      error = true;
     }

     if(error){
       return;
     }

     var data = {
       name : name,
       posting : designation,
       foreigner : foreigner,
       father : father,
       dob : dob,
       doj : doj,
       mobile : mobile,
       email : email,
       salary : salary,
       sex : gender,
       address : address,
       notes : notes,
      //  photo : photo,
      //  resume : resume
     };

     // console.log(data);
     // return;
     
     var response = await fetch(API_URL+ADMIN_CREATE_EMPLOYEE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(function(response) {
        return response.json();
      });

      if(response.success){
        $('#add_employee').modal('hide');
          this.setState({
            alert : true,
            message : response.message,
            msgType : 'success'
          });
          this.loadEmployees();
      }
      else{
        $('#add_employee').modal('hide');
        this.setState({
          alert : true,
          message : '403, Add appointment failed!',
          msgType : 'danger'
        });
      }
     
   }

   async changeStatus(e,id){
      let status = e.target.value;
      var data = {
        id : id,
        status : status
      }
     var response = await fetch(API_URL + ADMIN_CHANGE_EMP_STATUS, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(data)
      }).then(function(response) {
        return response.json();
      });

      if(response.success){
          this.setState({
            alert : true,
            message : response.message,
            msgType : 'success'
          });
          this.loadEmployees();
      }
      else{
        $('#add_employee').modal('hide');
        this.setState({
          alert : true,
          message : '403, Change STatus failed!',
          msgType : 'danger'
        });
      }
   }

   deleteClick(id){
     this.setState({deleteId : id});
   }

   async deleteEmp(e){
     e.preventDefault();
     console.log(this.state.deleteId);
     var response = await fetch(API_URL + ADMIN_EMP_DELETE + this.state.deleteId).then(function(response) {
      return response.json();
    });
    $('#delete_employee').modal('hide');
    if(response.success){
        this.setState({
          alert : true,
          message : response.message,
          msgType : 'success'
        });
        this.loadEmployees();
    }
    else{
      this.setState({
        alert : true,
        message : '403, Employee not deleted!',
        msgType : 'danger'
      });
    }
   }

   componentDidMount(){
     this.loadEmployees();
   }
	
   render() {
     const{data,employees, alert,updateNotes} = this.state
          const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              render: (text, record) => (            
                  <h2 className="table-avatar">
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id} className="avatar">
                      {
                        record.photo !== '' ?
                        <img alt="" src={EMPLOYEE_PROFILE_IMG+record.photo} />
                        :
                        <img alt="" src='https://via.placeholder.com/150' />
                      }
                    </a>
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id}>{record.name} 
                     
                     </a>
                  </h2>
                ), 
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
              title: 'Contact',
              dataIndex: 'email',
              sorter: (a, b) => a.email.length - b.email.length,
            },
            {
              title: 'Mobile',
              dataIndex: 'mobile',
              sorter: (a, b) => a.mobile.length - b.mobile.length,
            },
            {
              title: 'Salary',
              dataIndex: 'salary', 
              sorter: (a, b) => a.salary.length - b.salary.length,
            },
             {
              title: 'Status',
              // dataIndex: 'status',
              render: (text, record) => (  
                <div>       
                {
                   <select className="rounded p-2" value={record.status} onChange={(e) => this.changeStatus(e,record.id)}>
                      <option value="0" >🧡 Deactive</option>
                      <option value="1" >💚 Active</option>
                   </select>
                }

                </div>   
              ), 
              sorter: (a, b) => a.status.length - b.status.length,
            },
            {
              title: 'Designation',
              dataIndex: 'post',
              render: (text, record) => (  
                
                <div>       
                   
                     {record.post !== null &&
                       <span className="badge badge-info">{record.post.post}</span>
                     }
                </div>   
              ),  
            },
            {
              title: 'Join Date',
              dataIndex: 'doj',
              render: (text, record) => (  
                
                <div>       
                   <span className="badge badge-dark">
                     {
                       this.formatDate(record.doj)
                     }
                   </span>
                </div>   
              ), 
              sorter: (a, b) => a.doj.length - b.doj.length,
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_employee" onClick={() => this.loadUpdate(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                      <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_employee" onClick={() => this.deleteClick(record.id)}><i className="fa fa-trash-o m-r-5"/> Delete</a>
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
                <title>Employeeslist - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
         {/* Page Content */}
         <div className="content container-fluid">
           {/* Page Header */}
           <div className="page-header">
             <div className="row align-items-center">
               <div className="col">
                 <h3 className="page-title">Employee</h3>
                 <ul className="breadcrumb">
                   <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                   <li className="breadcrumb-item active">Employee</li>
                 </ul>
               </div>
               <div className="col-auto float-right ml-auto">
                 <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_employee"><i className="fa fa-location-arrow" />&nbsp;New Appointment</a>
                 
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
                 <input type="text" className="form-control floating" value={this.state.keyword} onChange={this.changeKeyword}/>
                 <label className="focus-label" >Search Keyword</label>
               </div>
             </div>
             <div className="col-sm-6 col-md-3">  
               <a href="#" className="btn btn-success btn-block" onClick={this.searchClick}> Search </a>  
             </div>     
           </div>
           {
             alert &&
             <div className={'alert alert-dismissible fade show alert-'+this.state.msgType } role="alert">
               {this.state.message}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
             </div>
           }
           
           {/* /Search Filter */}
           <div className="row">
             <div className="col-md-12">
               <div className="table-responsive">
               <Table className="table-striped"
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
               </div>
             </div>
           </div>
         </div>

         {/* /Page Content */}
         {/* Add Employee Modal */}
         
         <div id="add_employee" className="modal custom-modal fade" role="dialog">
           <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Add Appointment</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">×</span>
                 </button>
                
               </div>
               <div className="modal-body">
                  <div className="bg-primary p-3 mb-3 text-light rounded">
                    Default Password: 123456 | user can change it when they logged inuser can change it when they logged in.
                  </div>
                 <form>
                   <div className="row">
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Name<span className="text-danger">*</span></label>
                         <input className="form-control" type="text" value={this.state.editName} onChange={this.changeEditName} />
                         {
                           this.state.editNameError &&
                           <p className="text-danger">{this.state.editNameError}</p>
                         }
                       </div>
                     </div>
                      <div className="col-sm-12"> 
                        <div className="form-group">
                           <label className="col-form-label">Gender<span className="text-danger">*</span></label> <br></br>
                            <label className="ml-3">
                             <input type="radio"  name="gender" onChange={this.changeEditGenderMale}/>
                               <span className="m-2">Male</span>
                             </label>
                             <label className="ml-3">
                             <input type="radio"  name="gender" onChange={this.changeEditGenderFemale}/>
                               <span className="m-2">Female</span>
                             </label>
                             {
                                this.state.editGenderError &&
                                <p className="text-danger ml-3">{this.state.editGenderError}</p>
                             }
                        </div>
                      </div>
                     <div className="col-sm-12"> 
                      <div className="form-group">
                         <label className="col-form-label">Is a Foreigner<span className="text-danger">*</span></label> <br></br>
                          <label className="ml-3">
                           <input type="radio"  name="foreigner" onChange={this.changeEditForeigner}/>
                             <span className="m-2">Yes</span>
                           </label>
                           <label className="ml-3">
                           <input type="radio"  name="foreigner" onChange={this.changeEditForeigner2}/>
                             <span className="m-2">No</span>
                           </label>
                           {
                              this.state.editforeignerError &&
                              <p className="text-danger ml-3">{this.state.editforeignerError}</p>
                           }
                      </div>
                     </div>
                     <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Date Of Birth<span className="text-danger">*</span></label>
                         <div className="cal-icon"><input className="form-control" id="dob" type="text"  onChange={this.changeEditDob}/></div>
                         {
                            this.state.editDobError &&
                            <p className="text-danger">{this.state.editDobError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Father/Hustband Name<span className="text-danger">*</span></label>
                         <input className="form-control" type="text" value={this.state.editFatherName} onChange={this.changeEditFatherName}/>
                         {
                            this.state.editFatherNameError &&
                            <p className="text-danger">{this.state.editFatherNameError}</p>
                         }
                       </div>
                     </div>
                    
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Email <span className="text-danger">*</span></label>
                         <input className="form-control" type="email" value={this.state.editEmail} onChange={this.changeEditEmail}/>
                         {
                            this.state.editEmailError &&
                            <p className="text-danger">{this.state.editEmailError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Mobile<span className="text-danger">*</span></label>
                         <input className="form-control" type="number" value={this.state.editMobile} onChange={this.changeEditMobile}/>
                         {
                            this.state.editMobileError &&
                            <p className="text-danger">{this.state.editMobileError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Address<span className="text-danger">*</span></label>
                         <textarea className="form-control" value={this.state.editAddress} onChange={this.changeEditAddress}>
                         
                           </textarea>
                         {
                            this.state.editAddressError &&
                            <p className="text-danger">{this.state.editAddressError}</p>
                         }
                       </div>
                     </div>
                    {/* <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Photo</label>
                         <input type="file" className="form-control" value={this.state.editPhoto} onChange={this.changeEditPhoto}/>
                       </div>
                     </div>
                     <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Resume</label>
                         <input className="form-control" type="file" value={this.state.editResume} onChange={this.changeEditResume}/>
                       </div>
                     </div>*/}
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Designation<span className="text-danger">*</span></label>
                         <select className="form-control" id="designation" >
                         <option value="">Select one</option>
                           {
                             this.state.posts.map((item,index) =>{
                               return(
                                <option value={item.id} key={index} {...item.id === this.state.editDesignation ? 'selected' : ''}>{item.post}</option>
                               )
                             })
                           }
                           
                         </select>
                         {
                            this.state.editDesignationError &&
                            <p className="text-danger">{this.state.editDesignationError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Salary <span className="text-danger">*</span></label>
                         <input className="form-control" type="number" value={this.state.editSalary} onChange={this.changeEditSalary}/>
                         {
                            this.state.editSalaryError &&
                            <p className="text-danger">{this.state.editSalaryError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group"> 
                         <label className="col-form-label">Notes </label>
                         <textarea className="form-control" type="text" value={this.state.editNotes} onChange={this.changeEditNotes}>
                          </textarea>
                         {
                            this.state.editNotesError &&
                            <p className="text-danger">{this.state.editNotesError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Date Of Joining <span className="text-danger">*</span></label>
                         <div className="cal-icon"><input className="form-control" id="doj" type="text"  onChange={this.changeEditDoj}/></div>
                         {
                            this.state.editDojError &&
                            <p className="text-danger">{this.state.editDojError}</p>
                         }
                       </div>
                     </div>
                   </div>
                   
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={this.clickAddAppointment}>Submit</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
         {/* /Add Employee Modal */}
         {/* Edit Employee Modal */}
        
         <div id="edit_employee" className="modal custom-modal fade" role="dialog">
           <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title">Edit Profile</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">×</span>
                 </button>
               </div>
               <div className="modal-body">
                 <form>
                   
                   <div className="row">

                    {/* <div className="col-sm-4">
                       {
                         this.state.employee.photo !== '' ?
                            <img src={CORE+'uploads/photo/'+this.state.employee.photo} width="150" className="circle"/>
                         :
                            <img src={CORE+'uploads/photo/'+'default.jpg'} width="150" className="circle"/>
                       }
                       <div className="form-group">
                         <label className="col-form-label">Photo</label>
                         <input className="form-control" type="file" value={this.state.updatePhoto} onChange={this.changeUpdatePhoto}/>
                         {
                           this.state.updatePhotoError &&
                           <p className="text-danger">{this.state.updatePhotoError}</p>
                         }
                       </div>
                       <a href={CORE+'uploads/resume/'+this.state.employee.resume} target="_blank" className="btn btn-success">Download Profile</a>
                       <div className="form-group">
                         <label className="col-form-label">Resume</label>
                         <input className="form-control" type="file" value={this.state.updateResume} onChange={this.changeUpdateResume}/>
                         {
                           this.state.updateResumeError &&
                           <p className="text-danger">{this.state.updateResumeError}</p>
                         }
                       </div>
                     </div>*/}
                     <div className="col-sm-12">
                     <h4 className="ml-3">Presonal Information</h4>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Name<span className="text-danger">*</span></label>
                         <input className="form-control" type="text" value={this.state.updateName} onChange={this.changeUpdateName} />
                         {
                           this.state.updateNameError &&
                           <p className="text-danger">{this.state.updateNameError}</p>
                         }
                       </div>
                     </div>
                     
                     <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Date Of Birth<span className="text-danger">*</span></label>
                         <div className="cal-icon">
                           <input className="form-control" id="dobs" type="text" value={this.state.updateDob ? this.state.updateDob : this.state.employee.dob} onChange={this.changeUpdateDob}/></div>
                         {
                            this.state.updateDobError &&
                            <p className="text-danger">{this.state.updateDobError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Father/Hustband Name<span className="text-danger">*</span></label>
                         <input className="form-control" type="text" value={this.state.updateFatherName}/>
                         {
                            this.state.updateFatherNameError &&
                            <p className="text-danger">{this.state.updateFatherNameError}</p>
                         }
                       </div>
                     </div>
                    
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Email <span className="text-danger">*</span></label>
                         <input className="form-control" type="email" value={this.state.updateEmail} onChange={this.changeUpdateEmail}/>
                         {
                            this.state.updateEmailError &&
                            <p className="text-danger">{this.state.updateEmailError}</p>
                         }
                       </div>
                     </div>
                      <div className="col-sm-12"> 
                      <div className="form-group">
                         <label className="col-form-label">Gender<span className="text-danger">*</span></label> <br></br>
                          <label className="ml-3">
                           {
                            this.state.updateGender === 'male' ?
                             <input type="radio"  name="gender" onChange={this.changeUpdateGenderMale} checked/>
                            :
                             <input type="radio"  name="gender" onChange={this.changeUpdateGenderMale} />
                           }
                           <span className="m-2">Male</span>
                           </label>
                           <label className="ml-3">
                           {
                            this.state.updateGender === 'female' ?
                             <input type="radio"  name="gender" onChange={this.changeUpdateGenderFemale} checked/>
                            :
                             <input type="radio"  name="gender" onChange={this.changeUpdateGenderFemale} />
                           }
                             <span className="m-2">Female</span>
                           </label>
                           {
                              this.state.updateGenderError &&
                              <p className="text-danger ml-3">{this.state.updateGenderError}</p>
                           }
                      </div>
                     </div>
                     <div className="col-sm-12"> 
                      <div className="form-group">
                         <label className="col-form-label">Is a Foreigner<span className="text-danger">*</span></label> <br></br>
                          <label className="ml-3">
                           {
                            this.state.updateForeigner === 1 ?
                             <input type="radio"  name="foreigner" onChange={this.changeUpdateForeigner} checked/>
                            :
                             <input type="radio"  name="foreigner" onChange={this.changeUpdateForeigner} />
                           }
                             <span className="m-2">Yes</span>
                           </label>
                           <label className="ml-3">
                            {
                            this.state.updateForeigner === 0 ?
                             <input type="radio"  name="foreigner" onChange={this.changeUpdateForeigner2} checked/>
                            :
                             <input type="radio"  name="foreigner" onChange={this.changeUpdateForeigner2} />
                           }
                             <span className="m-2">No</span>
                           </label>
                           {
                              this.state.editforeignerError &&
                              <p className="text-danger ml-3">{this.state.editforeignerError}</p>
                           }
                      </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Mobile<span className="text-danger">*</span></label>
                         <input className="form-control" type="number" value={this.state.updateMobile} onChange={this.changeUpdateMobile}/>
                         {
                            this.state.updateMobileError &&
                            <p className="text-danger">{this.state.updateMobileError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Address<span className="text-danger">*</span></label>
                         <textarea className="form-control" value={this.state.updateAddress} onChange={this.changeUpdateAddress}>
                         
                           </textarea>
                         {
                            this.state.updateAddressError &&
                            <p className="text-danger">{this.state.updateAddressError}</p>
                         }
                       </div>
                     </div>
                     
                     <h4 className="ml-3 mt-5">Social Profile</h4>
                     <hr></hr>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Facebook </label>
                         <input className="form-control" type="text" value={this.state.facebook} onChange={this.changeFacebook}/>
                         {
                            this.state.facebookError &&
                            <p className="text-danger">{this.state.facebookError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Twitter </label>
                         <input className="form-control" type="text" value={this.state.twitter } onChange={this.changeTwitter}/>
                         {
                            this.state.twitterError &&
                            <p className="text-danger">{this.state.twitterError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Linkedin </label>
                         <input className="form-control" type="text" value={this.state.linkedin } onChange={this.changeLinkedin}/>
                         {
                            this.state.linkedinError &&
                            <p className="text-danger">{this.state.linkedinError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Github </label>
                         <input className="form-control" type="text" value={this.state.github } onChange={this.changeGithub}/>
                         {
                            this.state.githubError &&
                            <p className="text-danger">{this.state.githubError}</p>
                         }
                       </div>
                     </div>

                     <h4 className="ml-3 mt-5">Job Details</h4>
                     <hr></hr>
                     <div className="col-sm-12">  
                       <div className="form-group">
                         <label className="col-form-label">Date Of Joining<span className="text-danger">*</span></label>
                         <div className="cal-icon">
                           <input className="form-control" id="dojs" type="text" value={this.state.updateDoj ? this.state.updateDoj: this.state.employee.doj} onChange={this.changeUpdateDoj}/></div>
                         {
                            this.state.updateDojError &&
                            <p className="text-danger">{this.state.updateDojError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Designation<span className="text-danger">*</span></label>
                         <select className="form-control" value={this.state.updateDesignation} id="updatedesignation" onChange={this.changeUpdateDesignation} >
                         
                          
                           {
                             this.state.posts.map((item,index) =>{
                               return(
                                <option value={item.id} 
                                key={index}>{item.post}</option>
                               )
                             })
                           }
                           
                         </select>
                         {
                            this.state.updateDesignationError &&
                            <p className="text-danger">{this.state.updateDesignationError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group">
                         <label className="col-form-label">Salary <span className="text-danger">*</span></label>
                         <input className="form-control" type="number" value={this.state.updateSalary} onChange={this.changeUpdateSalary}/>
                         {
                            this.state.updateSalaryError &&
                            <p className="text-danger">{this.state.updateSalaryError}</p>
                         }
                       </div>
                     </div>
                     <div className="col-sm-12">
                       <div className="form-group"> 
                         <label className="col-form-label">Notes </label>
                         <textarea className="form-control" type="text" value={updateNotes}  onChange={this.changeUpdateNotes}>
                           
                          </textarea>
                         {
                            this.state.updateNotesError &&
                            <p className="text-danger">{this.state.updateNotesError}</p>
                         }
                       </div>
                     </div>
                     
                     </div>
                   </div>
                   <div className="submit-section">
                     <button className="btn btn-primary submit-btn" onClick={this.clickUpdateProfile}>Save</button>
                   </div>
                 </form>
               </div>
             </div>
           </div>
         </div>
         {/* /Edit Employee Modal */}
         {/* Delete Employee Modal */}
         <div className="modal custom-modal fade" id="delete_employee" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Employee</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="" className="btn btn-primary continue-btn" onClick={this.deleteEmp}>Delete</a>
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

export default Employeelist;
