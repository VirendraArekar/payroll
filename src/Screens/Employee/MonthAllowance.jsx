
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import 'antd/dist/antd.css';
import "../../MainPage/antdstyle.css"
import $ from 'jquery';


import {
    CORE,
    API_URL,
    ADMIN_ALLOWANCE_UPDATE,
    ADMIN_ALLOWANCE_EDIT,
    ADMIN_ALLOWANCE_CREATE,
    ADMIN_ALLOWANCE_DELETE,
    ADMIN_ALLOWANCE_SEARCH,
    ADMIN_ALLOWANCE_STATUS_CHANGE,
    EMPLOYEE_ALLOWANCE_LIST
} from '../../Contants';
import moment from 'moment';


class MonthAllowance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      nameError : '',
      district : '',
      districtError : '',
      location : '',
      locationError : '',
      client_id : '',
      client_idError : '',
      op_type : '',
      op_typeError : '',
      crew : '',
      crewError : '',
      job_no : '',
      job_noError : '',
      currency : '',
      currencyError : '',
      al_date : '',
      al_dateError : '',
      bonus : '',
      bonusError : '',
      per_diam : '',
      per_diamError : '',
      operation : '',
      operationError : '',

      editname : '',
      editnameError : '',
      editdistrict : '',
      editdistrictError : '',
      editlocation : '',
      editlocationError : '',
      editclient_id : '',
      editclient_idError : '',
      editop_type : '',
      editop_typeError : '',
      editcrew : '',
      editcrewError : '',
      editjob_no : '',
      editjob_noError : '',
      editcurrency : '',
      editcurrencyError : '',
      edital_date : '',
      edital_dateError : '',
      editbonus : '',
      editbonusError : '',
      editper_diam : '',
      editper_diamError : '',
      editoperation : '',
      editoperationError : '', 
      status : '',
      editstatus : '',
      statusError : '',
      editstatusError : '',

      allowances : null,

        addId : '',
        deleteId : '',

        alert : false,
        message : '',
        msgType : '',
        allowance : null,
        clients : null,
        employees : null,
        userId : '',
        username : ''
        
       
    };

    this.changeName = this.changeName.bind(this);
    this.changeDistrict = this.changeDistrict.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeClientId = this.changeClientId.bind(this);
    this.changeOpType = this.changeOpType.bind(this);
    this.changeCrew = this.changeCrew.bind(this);
    this.changeJobNo = this.changeJobNo.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeAlDate = this.changeAlDate.bind(this);
    this.changeBonus = this.changeBonus.bind(this);
    this.changePerDiam = this.changePerDiam.bind(this);
    this.changeOperation = this.changeOperation.bind(this);

    this.changeEditName = this.changeEditName.bind(this);
    this.changeEditDistrict = this.changeEditDistrict.bind(this);
    this.changeEditLocation = this.changeEditLocation.bind(this);
    this.changeEditClientId = this.changeEditClientId.bind(this);
    this.changeEditOpType = this.changeEditOpType.bind(this);
    this.changeEditCrew = this.changeEditCrew.bind(this);
    this.changeEditJobNo = this.changeEditJobNo.bind(this);
    this.changeEditCurrency = this.changeEditCurrency.bind(this);
    this.changeEditAlDate = this.changeEditAlDate.bind(this);
    this.changeEditBonus = this.changeEditBonus.bind(this);
    this.changeEditPerDiam = this.changeEditPerDiam.bind(this);
    this.changeEditOperation = this.changeEditOperation.bind(this);

    this.loadAllowances = this.loadAllowances.bind(this);
    this.AddAllowance= this.AddAllowance.bind(this);
    this.editAddId = this.editAddId.bind(this);
    this.editAddDeleteId = this.editAddDeleteId.bind(this);
    this.UpdateAllowance = this.UpdateAllowance.bind(this);
    this.deleteAllowance = this.deleteAllowance.bind(this);
    this.searchAllowance = this.searchAllowance.bind(this);
  }

  changeName(event){
      this.setState({name : event.target.value});
  }

  changeLocation(event){
    this.setState({location : event.target.value});
  }

  changeClientId(event){
    this.setState({client_id : event.target.value});
  }

  changeOpType(event){
    this.setState({op_type : event.target.value});
  }

  changeDistrict(event){
    this.setState({district : event.target.value});
  }

  changeCrew(event){
    this.setState({crew : event.target.value});
  }

  changeJobNo(event){
    this.setState({job_no : event.target.value});
  }

  changeCurrency(event){
    this.setState({currency : event.target.value});
  }

  changeAlDate(event){
    this.setState({al_date : event.target.value});
  }

  changeBonus(event){
    this.setState({bonus : event.target.value});
  }

  changePerDiam(event){
    this.setState({per_diam : event.target.value});
  }

  changeOperation(event){
    this.setState({operation : event.target.value});
  }

  // Edit
  changeEditName(event){
    this.setState({editname : event.target.value});
  }

  changeEditLocation(event){
    this.setState({editlocation : event.target.value});
  }

  changeEditClientId(event){
    this.setState({editclient_id : event.target.value});
  }

  changeEditOpType(event){
    this.setState({editop_type : event.target.value});
  }

  changeEditDistrict(event){
    this.setState({editdistrict : event.target.value});
  }

  changeEditCrew(event){
    this.setState({editcrew : event.target.value});
  }

  changeEditJobNo(event){
    this.setState({editjob_no : event.target.value});
  }

  changeEditCurrency(event){
    this.setState({editcurrency : event.target.value});
  }

  changeEditAlDate(event){
    this.setState({edital_date : event.target.value});
  }

  changeEditBonus(event){
    this.setState({editbonus : event.target.value});
  }

  changeEditPerDiam(event){
    this.setState({editper_diam : event.target.value});
  }

  changeEditOperation(event){
    this.setState({editoperation : event.target.value});
  }

  async editAddId(id){
      this.setState({addId : id});
      var fetchData = await fetch(API_URL + ADMIN_ALLOWANCE_EDIT + id).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
            allowance : fetchData.data,
            editname : fetchData.data.emp_id,
            editdistrict : fetchData.data.district,
            editlocation : fetchData.data.location,
            editclient_id : fetchData.data.client_id,
            editop_type : fetchData.data.op_type,
            editcrew : fetchData.data.crew,
            editjob_no : fetchData.data.job_no,
            editcurrency : fetchData.data.currency,
            edital_date : moment(fetchData.data.al_date).format('Y-MM-DD'),
            editbonus : fetchData.data.bonus,
            editper_diam : fetchData.data.per_diem,
            editoperation : fetchData.data.operation
        });
      }
  }

  editAddDeleteId(id){
      this.setState({deleteId : id});
  }

  async loadAllowances(){
      var user = localStorage.getItem('user');
      var user = JSON.parse(user);
      this.setState({
          userId : user.id,
          username : user.name
      });
      const {month, year} = this.props.match.params;
      var fetchData = await fetch(API_URL + EMPLOYEE_ALLOWANCE_LIST + `${user.id}/${month}/${year}`).then(res => res.json());
      if(fetchData.code === 200){ 
          this.setState({
              allowances : fetchData.data['allowances'],
              clients : fetchData.data['clients']
            })
      }
  }

  componentDidMount(){
      this.loadAllowances();
  }

  async AddAllowance(e){
      e.preventDefault()
      const { month, year} = this.props.match.params;
      var created_at = moment(`${year}-${month.length == 1 ? 0+month : month}-28`).format('Y-MM-D');
      const  {name,location,client_id,op_type,operation,crew,district,job_no,currency,bonus,per_diam,status} = this.state;
      const al_date = document.querySelector('#from').value;
      var error = false;

      this.setState({
        districtError : '',
        locationError : '',
        client_idError : '',
        op_typeError : '',
        crewError : '',
        job_noError : '',
        currencyError : '',
        al_dateError : '',
        bonusError : '',
        per_diamError : '',
        operationError : ''
      })


      if(district === ''){
        this.setState({districtError : 'Field is required!'});
        error = true;
      }
      else if(district.length < 3){
        this.setState({districtError : 'District must atleast 3 char long.'});
        error = true;
      }

      if(location === ''){
        this.setState({locationError : 'Field is required!'});
        error = true;
      }
      else if(location.length < 2){
        this.setState({locationError : 'Location must atleast 2 char long.'});
        error = true;
      }

      if(client_id === ''){
        this.setState({client_idError : 'Field is required!'});
        error = true;
      }

      if(op_type === ''){
        this.setState({op_typeError : 'Field is required!'});
        error = true;
      }
      else if(op_type.length < 3){
        this.setState({op_typeError : 'Operation type must atleast 3 char long.'});
        error = true;
      }

      if(crew === ''){
        this.setState({crewError : 'Field is required!'});
        error = true;
      }
      else if(crew.length < 3){
        this.setState({crewError : 'Crew must atleast 3 char long.'});
        error = true;
      }

      if(job_no === ''){
        this.setState({job_noError : 'Field is required!'});
        error = true;
      }
      else if(job_no.length < 3){
        this.setState({job_noError : 'Job no/Ticket no must atleast 3 char long.'});
        error = true;
      }

      if(currency === ''){
        this.setState({currencyError : 'Field is required!'});
        error = true;
      }
      else if(currency.length < 2){
        this.setState({currencyError : 'Currency no must atleast 2 char long.'});
        error = true;
      }
   
      if(al_date === ''){
        this.setState({al_dateError : 'Field is required!'});
        error = true;
      }

      if(bonus === ''){
        this.setState({bonusError : 'Field is required!'});
        error = true;
      }

      if(per_diam === ''){
        this.setState({per_diamError : 'Field is required!'});
        error = true;
      }
      
      if(operation === ''){
        this.setState({operationError : 'Field is required!'});
        error = true;
      }
      else if(operation.length < 3){
        this.setState({operationError : 'Operation must atleast 3 char long.'});
        error = true;
      }


      if(error){
          return;
      }

      var data = {
        emp_id : this.state.userId,
        district : district,
        location : location,
        client_id : client_id,
        op_type : op_type,
        crew : crew,
        job_no : job_no,
        currency : currency,
        al_date : al_date,
        bonus : bonus,
        per_diam : per_diam,
        operation : operation,
        created_at : created_at
      }
     
     var fetchData = await  fetch(API_URL + ADMIN_ALLOWANCE_CREATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());
   
     if(fetchData.code === 200){
         $('#add_allowance').modal('hide');
         this.loadAllowances();
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

  async UpdateAllowance(e){
      e.preventDefault();
      const  {editname,editlocation,editclient_id,editop_type,editoperation,editcrew,editdistrict,editjob_no,editcurrency,editbonus,editper_diam,editstatus} = this.state;
      const edital_date = document.querySelector('#editfrom').value;
      var error = false;

      this.setState({
        editnameError : '',
        editdistrictError : '',
        editlocationError : '',
        editclient_idError : '',
        editop_typeError : '',
        editcrewError : '',
        editjob_noError : '',
        editcurrencyError : '',
        edital_dateError : '',
        editbonusError : '',
        editper_diamError : '',
        editoperationError : ''
      })



      if(editdistrict === ''){
        this.setState({editdistrictError : 'Field is required!'});
        error = true;
      }
      else if(editdistrict.length < 3){
        this.setState({editdistrictError : 'District must atleast 3 char long.'});
        error = true;
      }

      if(editlocation === ''){
        this.setState({editlocationError : 'Field is required!'});
        error = true;
      }
      else if(editlocation.length < 2){
        this.setState({editlocationError : 'Location must atleast 2 char long.'});
        error = true;
      }

      if(editclient_id === ''){
        this.setState({editclient_idError : 'Field is required!'});
        error = true;
      }

      if(editop_type === ''){
        this.setState({editop_typeError : 'Field is required!'});
        error = true;
      }
      else if(editop_type.length < 3){
        this.setState({editop_typeError : 'Operation type must atleast 3 char long.'});
        error = true;
      }

      if(editcrew === ''){
        this.setState({editcrewError : 'Field is required!'});
        error = true;
      }
      else if(editcrew.length < 3){
        this.setState({editcrewError : 'Crew must atleast 3 char long.'});
        error = true;
      }

      if(editjob_no === ''){
        this.setState({editjob_noError : 'Field is required!'});
        error = true;
      }
      else if(editjob_no.length < 3){
        this.setState({editjob_noError : 'Job no/Ticket no must atleast 3 char long.'});
        error = true;
      }


      if(editcurrency === ''){
        this.setState({editcurrencyError : 'Field is required!'});
        error = true;
      }
      else if(editcurrency.length < 2){
        this.setState({editcurrencyError : 'Currency no must atleast 2 char long.'});
        error = true;
      }
   
      if(edital_date === ''){
        this.setState({edital_dateError : 'Field is required!'});
        error = true;
      }

      if(editbonus === ''){
        this.setState({editbonusError : 'Field is required!'});
        error = true;
      }

      if(editper_diam === ''){
        this.setState({editper_diamError : 'Field is required!'});
        error = true;
      }
      
      if(editoperation === ''){
        this.setState({editoperationError : 'Field is required!'});
        error = true;
      }
      else if(editoperation.length < 3){
        this.setState({editoperationError : 'Operation must atleast 3 char long.'});
        error = true;
      }
      
      // if(editstatus === ''){
      //   this.setState({editstatusError : 'Field is required!'});
      //   error = true;
      // }


      if(error){
          return;
      }

      var data = {
        id : this.state.addId,
        emp_id : this.state.userId,
        district : editdistrict,
        location : editlocation,
        client_id : editclient_id,
        op_type : editop_type,
        crew : editcrew,
        job_no : editjob_no,
        currency : editcurrency,
        al_date : edital_date,
        bonus : editbonus,
        per_diam : editper_diam,
        operation : editoperation
      }
     
    //   console.log(data);
    //   return;
     var fetchData = await  fetch(API_URL + ADMIN_ALLOWANCE_UPDATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());
   
     if(fetchData.code === 200){
         $('#edit_allowance').modal('hide');
         this.loadAllowances();
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

  async deleteAllowance(e){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_ALLOWANCE_DELETE + this.state.deleteId).then(res => res.json());

       if(fetchData.code === 200){
           $('#delete_allowance').modal('hide');
            this.loadAllowances();
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

  async searchAllowance(e){
    e.preventDefault();
    let name = document.querySelector('#searchname').value;
    let from = document.querySelector('#searchfrom').value;
    let to = document.querySelector('#searchto').value;
    let client_id = document.querySelector('#searchclientid').value;
    let job_no  = document.querySelector('#searchjobno').value;


    var data = {
        name : name,
        from : from,
        to : to,
        client_id : client_id,
        job_no : job_no
    }

    console.log(data);
    
    var fetchData = await  fetch(API_URL + ADMIN_ALLOWANCE_SEARCH,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
    }).then(res=>res.json());
  
    if(fetchData.code === 200){

        this.setState({
            allowances : fetchData.data
        });
    }
  }

  async changeStatus(event, id){
     var val = event.target.value;
     var data = {
       status : parseInt(val),
       id : id
     }

      var fetchData = await  fetch(API_URL + ADMIN_ALLOWANCE_STATUS_CHANGE,{
          method : 'post',
          headers:{'content-type': 'application/json'},
          body : JSON.stringify(data)
      }).then(res=>res.json());

      if(fetchData.code === 200){
          this.loadAllowances();
          this.setState({
            alert : true,
            message : fetchData.message,
            msgType : 'success'
          });
      }
      else{
        this.setState({
          alert : true,
          message : 'Intenal server error.',
          msgType : 'danger'
        });
      }
  }

   render() {
    const {year, month} = this.props.match.params;
    const {alert,message,msgType,allowances,clients,allowance,name,al_date,district,operation,client_id,op_type,job_no,crew,location,currency,bonus,per_diam,nameError,al_dateError,districtError,operationError,client_idError,op_typeError,job_noError,crewError,locationError,currencyError,bonusError,per_diamError,editname,edital_date,editdistrict,editoperation,editclient_id,editop_type,editjob_no,editcrew,editlocation,editcurrency,editbonus,editper_diam,editnameError,edital_dateError,editdistrictError,editoperationError,editclient_idError,editop_typeError,editjob_noError,editcrewError,editlocationError,editcurrencyError,editbonusError,editper_diamError, employees} = this.state;
    var tot_bonus = 0;
    var tot_per = 0;
    if(allowances !== null)
    {
      for(var i = 0; i < allowances.length; i++){
          if(allowances[i].status === 2){
            tot_bonus = tot_bonus + parseFloat(allowances[i].bonus);
            tot_per = tot_per + parseFloat(allowances[i].per_diem);
          }
      }
    }
      return ( 
        <div className="main-wrapper">  
          <Header/> 
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Daily Allowance - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Daily Allowance</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Daily Allowance</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_allowance"><i className="fa fa-plus" />&nbsp;Add Daily Allowance</a>
              </div>
            </div>
          </div>
         {/* alert */}
         <h3 className="text-center p-3">{moment(`${year}-${month.length == 1 ? 0+month : month}-28`).format('MMM Y')}</h3>
          {
              alert &&
              <div className={"alert  alert-dismissible fade show alert-"+msgType} role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
             </div>
          }
          {/* /table Filter */}
          <div className="row">
           
            <div className="col-md-12">
              <div className="table-responsive">
               {
                 allowances !== null &&
                 <table className="table table-striped text-center table-bordered">
                   <thead>
                     <th>Employee</th>
                     <th>Operation Type</th>
                     <th>Operation</th>
                     <th>Client</th>
                     <th>Ticket/Job no.</th>
                     <th>Bonus</th>
                     <th>Per Diem</th>
                     <th>Date</th>
                     <th>Status</th>
                     <th>Action</th>
                   </thead>
                   <tbody>
                     {allowances.map((item,index) => {
                       return(
                         <tr key={index}>
                            <td>
                              <div>
                                <img src={item.emp.post !== '' || item.emp.post !==  undefined ? CORE+`uploads/photo/${item.emp.photo}` : Avatar_02} style={{width : 40}} className="circle"/>
                                <strong>{item.emp.name}</strong>
                              </div>
                            </td>
                            <td>
                              {item.op_type}
                            </td>
                            <td>
                              {item.operation}
                            </td>
                            <td>
                              {item.client.name}
                            </td>
                            <td>
                              {item.job_no}
                            </td>
                            <td>
                              <span className="badge badge-secondary p-2">${item.bonus}</span>
                            </td>
                            <td>
                              <span className="badge badge-secondary p-2">${item.per_diem}</span>
                            </td>
                            <td>
                              <span className="badge badge-info p-2">{moment(item.al_date).format('D MMM Y')}</span>
                            </td>
                            <td>
                              {
                                  item.status === 0 &&
                                  <span className="badge badge-primary">Pending</span>
                              }
                              {
                                  item.status === 1 &&
                                  <span className="badge badge-info">Active</span>
                              }
                              {
                                  item.status === 2 &&
                                  <span className="badge badge-success">Approved</span>
                              }
                            </td>
                            <td>
                              {item.status === 0 &&
                                <div>
                                <a className="btn btn-secondary btn-sm" href="#" data-toggle="modal" data-target="#edit_allowance" onClick={() => this.editAddId(item.id)}><i className="fa fa-pencil" /></a>&nbsp;
                                 <a className="btn btn-danger btn-sm" href="#" data-toggle="modal" data-target="#delete_allowance" onClick={() => this.editAddDeleteId(item.id)}><i className="fa fa-trash"/></a>
                                </div>
                              }
                            </td>
                         </tr>
                       )
                     })}
                     
                     <tr>
                       <td colSpan="5" style={{borderWidth : 0}}>
                         <strong className="text-danger font-bold float-right">Only approved allowances are added </strong>
                       </td>
                       <td>
                          <span className="badge badge-success p-2">${tot_bonus}</span>
                        </td>
                       <td>
                           <span className="badge badge-success p-2">${tot_per}</span>
                      </td>
                       <td colSpan="3" style={{borderWidth : 0}}></td>
                     </tr>
                   </tbody>
                 </table>
               }
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
        {/* Add Expense Modal */}
        <div id="add_allowance" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Daily Allowance</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Person Name</label>
                        <input type="text" value={this.state.username} className="form-control" disabled/>
                        {
                            nameError &&
                            <p className="text-danger">{nameError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Operation Type</label>
                        <input className="form-control"  value={op_type} onChange={this.changeOpType} type="text" />
                        {
                            op_typeError &&
                            <p className="text-danger">{op_typeError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                        <label>Client </label>
                        <select className="form-control" value={client_id} onChange={this.changeClientId}>
                            <option>Select one</option>
                          {
                              clients !== null &&
                              clients.map((item,index) => {
                                  return(
                                      <option value={item.id} key={index}>{item.name}</option>
                                  )
                              })
                          }
                        </select>
                        {
                            client_idError &&
                            <p className="text-danger">{client_idError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Operation</label>
                        
                            <input className="form-control"  type="text" value={operation}  onChange={this.changeOperation}/>
                            {
                                operationError &&
                                <p className="text-danger">{operationError}</p>
                            }
                   
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Location</label>
                        <input  className="form-control" type="text" value={location} onChange={this.changeLocation}/>
                        {
                            locationError &&
                            <p className="text-danger">{locationError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Crew</label>
                        <input  className="form-control" type="text" value={crew} onChange={this.changeCrew}/>
                        {
                            crewError &&
                            <p className="text-danger">{crewError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Ticket/Job no.</label>
                        <input  className="form-control" type="text" value={job_no} onChange={this.changeJobNo}/>
                        {
                            job_noError &&
                            <p className="text-danger">{job_noError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>District</label>
                        <input  className="form-control" type="text" value={district} onChange={this.changeDistrict}/>
                        {
                            districtError &&
                            <p className="text-danger">{districtError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Allowance Date</label>
                        <div className="cal-icon">
                        <input  className="form-control" type="text" id="from"  />
                        </div>
                        {
                            al_dateError &&
                            <p className="text-danger">{al_dateError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Currency</label>
                        <input  className="form-control" type="text" value={currency} onChange={this.changeCurrency}/>
                        {
                            currencyError &&
                            <p className="text-danger">{currencyError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Bonus</label>
                        <input  className="form-control" type="number" value={bonus} onChange={this.changeBonus}/>
                        {
                            bonusError &&
                            <p className="text-danger">{bonusError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Per Diem</label>
                        <input  className="form-control" type="number" value={per_diam} onChange={this.changePerDiam}/>
                        {
                            per_diamError &&
                            <p className="text-danger">{per_diamError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.AddAllowance}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Expense Modal */}
        {/* Edit Expense Modal */}
        <div id="edit_allowance" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Daily Allowance</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {allowances !== null && 
                <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Person Name</label>
                           <input type="text" value={this.state.username} className="form-control" disabled/>
                          {
                              editnameError &&
                              <p className="text-danger">{editnameError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Operation Type</label>
                          <input className="form-control"  value={editop_type} onChange={this.changeEditOpType} type="text" />
                          {
                              editop_typeError &&
                              <p className="text-danger">{editop_typeError}</p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                          <label>Client </label>
                          <select className="form-control" value={editclient_id} onChange={this.changeEditClientId}>
                              <option>Select one</option>
                            {
                                clients !== null &&
                                clients.map((item,index) => {
                                    return(
                                        <option value={item.id} key={index}>{item.name}</option>
                                    )
                                })
                            }
                          </select>
                          {
                              editclient_idError &&
                              <p className="text-danger">{editclient_idError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Operation</label>
                         
                              <input className="form-control"  type="text" value={editoperation}  onChange={this.changeEditOperation}/>
                              {
                                  editoperationError &&
                                  <p className="text-danger">{editoperationError}</p>
                              }
                          
                        </div>
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Location</label>
                          <input  className="form-control" type="text" value={editlocation} onChange={this.changeEditLocation}/>
                          {
                              editlocationError &&
                              <p className="text-danger">{editlocationError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Crew</label>
                          <input  className="form-control" type="text" value={editcrew} onChange={this.changeEditCrew}/>
                          {
                              editcrewError &&
                              <p className="text-danger">{editcrewError}</p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Ticket/Job no.</label>
                          <input  className="form-control" type="text" value={editjob_no} onChange={this.changeEditJobNo}/>
                          {
                              editjob_noError &&
                              <p className="text-danger">{editjob_noError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>District</label>
                          <input  className="form-control" type="text" value={editdistrict} onChange={this.changeEditDistrict}/>
                          {
                              editdistrictError &&
                              <p className="text-danger">{editdistrictError}</p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Allowance Date</label>
                          <div className="cal-icon">
                          <input  className="form-control" type="text" id="editfrom"  value={edital_date} onChange={this.changeEditAlDate}/>
                          </div>
                          {
                              edital_dateError &&
                              <p className="text-danger">{edital_dateError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Currency</label>
                          <input  className="form-control" type="text" value={editcurrency} onChange={this.changeEditCurrency}/>
                          {
                              editcurrencyError &&
                              <p className="text-danger">{editcurrencyError}</p>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Bonus</label>
                          <input  className="form-control" type="number" value={editbonus} onChange={this.changeEditBonus}/>
                          {
                              editbonusError &&
                              <p className="text-danger">{editbonusError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Per Diem</label>
                          <input  className="form-control" type="number" value={editper_diam} onChange={this.changeEditPerDiam}/>
                          {
                              editper_diamError &&
                              <p className="text-danger">{editper_diamError}</p>
                          }
                        </div>
                      </div>
                    </div>
                    
                    <div className="submit-section">
                      <button className="btn btn-primary submit-btn" onClick={this.UpdateAllowance}>Submit</button>
                    </div>
                  </form>
                }
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Expense Modal */}
        {/* Delete Expense Modal */}
        <div className="modal custom-modal fade" id="delete_allowance" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Expense</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="#" className="btn btn-primary continue-btn" onClick={this.deleteAllowance}>Delete</a>
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

export default MonthAllowance;
