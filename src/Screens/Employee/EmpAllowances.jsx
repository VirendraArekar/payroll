
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import { PlaceHolder} from "../../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import $ from 'jquery';


import {
    CORE,
    API_URL,
    ADMIN_ALLOWANCES,
    EMPLOYEE_ALLOWANCES,
    ADMIN_ALLOWANCE_UPDATE,
    ADMIN_ALLOWANCE_EDIT,
    ADMIN_ALLOWANCE_CREATE,
    EMPLOYEE_ALLOWANCE_CREATE,
    ADMIN_ALLOWANCE_SEARCH,
    EMPLOYEE_ALLOWANCE_SEARCH
} from '../../Contants';
import moment from 'moment';


class EmpAllowances extends Component {
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
      console.log(id);
      var fetchData = await fetch(API_URL + ADMIN_ALLOWANCE_EDIT + id).then(res => res.json());
      console.log(fetchData);
      if(fetchData.code === 200){
        this.setState({
            allowance : fetchData.data,
            // editname : fetchData.data.name,
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
      var id = JSON.parse(user).id;
      this.setState({
        userId : id,
        username : JSON.parse(user).name
      });
      var fetchData = await fetch(API_URL + EMPLOYEE_ALLOWANCES + id).then(res => res.json());
      if(fetchData.code === 200){
        console.log(fetchData.data);
          this.setState({
              allowances : fetchData.data['allowances'],
              clients : fetchData.data['clients'],
            })
      }
  }

  componentDidMount(){
      this.loadAllowances();
  }

  async AddAllowance(e){
      e.preventDefault()
      const  {userId,location,client_id,op_type,operation,crew,district,job_no,currency,bonus,per_diam,status} = this.state;
      const al_date = document.querySelector('#from').value;
      var error = false;

      this.setState({
        emp_id : userId,
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

      // if(status === ''){
      //   this.setState({statusError : 'Field is required!'});
      //   error = true;
      // }


      if(error){
          return;
      }

      var data = {
        emp_id : userId,
        name : name,
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
        operation : operation
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
      const  {editlocation,editclient_id,editop_type,editoperation,editcrew,editdistrict,editjob_no,editcurrency,editbonus,editper_diam,editstatus} = this.state;
      const edital_date = document.querySelector('#editfrom').value;
      var error = false;

      this.setState({
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
    let from = document.querySelector('#searchfrom').value;
    let to = document.querySelector('#searchto').value;
    let client_id = document.querySelector('#searchclientid').value;


    var data = {
        emp_id : this.state.userId,
        from : from,
        to : to,
        client_id : client_id
    }

    console.log(data);

    var fetchData = await  fetch(API_URL + EMPLOYEE_ALLOWANCE_SEARCH,{
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
    const{data} = this.state
    const columns = [

      {
        title: 'Client',
        // dataIndex: '',
        render: (text, record) => (
            <span className="badge badge-info p-2">{record.client_name}</span>
        ),
        // sorter: (a, b) => a.client_id.length - b.client_id.length,
      },
      {
        title: 'Bonus',
        dataIndex: 'bonus',
        render: (text, record) => (
          <span className="badge badge-secondary p-2">${text}</span>
        ),
        sorter: (a, b) => a.bonus.length - b.bonus.length,
      },
      {
        title: 'Per Diem',
        dataIndex: 'per_diem',
        render: (text, record) => (
          <span className="badge badge-secondary p-2">${text}</span>
        ),
        sorter: (a, b) => a.per_diem.length - b.per_diem.length,
      },
      {
        title: 'Total',
        render: (text, record) => (
          <span className="badge badge-secondary p-2">${parseFloat(record.bonus) + parseFloat(record.per_diem)}</span>
        ),
        sorter: (a, b) => a.per_diem.length - b.per_diem.length,
      },
      {
        title: 'Allowance Date',
        dataIndex: 'al_date',
        render: (text, record) => (
          <span className="badge badge-info p-2">{moment(record.al_date).format('D MMM Y')}</span>
        ),
        sorter: (a, b) => a.al_date.length - b.al_date.length,
      },
      {
        title: 'Created At',
        dataIndex: '',
        render: (text, record) => (
          <span className="badge badge-primary p-2">{moment(record.created_at).format('D MMM Y')}</span>
        ),
      },
      {
        title: 'Approved Date',
        dataIndex: 'approved_date',
        render: (text, record) => (
          <div>
              {record.status === 2 &&
                <span className="badge badge-dark p-2">{moment(record.approved_date).format('D MMM Y')}</span>
              }
              {record.status !== 2 &&
                <span className="badge badge-dark p-2">NA</span>
              }
          </div>
        ),
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render: (text, record) => (
            <div>
              {record.status  === 0 &&
                <span className="badge badge-primary p-2">Pending</span>
              }
              {record.status  === 1 &&
                <span className="badge badge-info p-2">Active</span>
              }
              {record.status  === 2 &&
                <span className="badge badge-success p-2">Approved</span>
              }
            </div>
          ),
        sorter: (a, b) => a.status.length - b.status.length,
      },
      // {
      //   title: 'Action',
      //   dataIndex: '',
      //   render: (text, record) => (
      //     <a href={`/employee/show/allowances/${record.month}/${record.year}`} className="btn btn-custom"><span className="fa fa-eye"></span>&nbsp;view</a>
      //   ),
      // },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                     {record.status !== 2 &&
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_allowance" onClick={() => this.editAddId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                          <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_allowance" onClick={() => this.editAddDeleteId(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                        </div>
                     }
            </div>
          ),
      },
    ]

    const {alert,message,msgType,allowances,clients,allowance,name,al_date,district,operation,client_id,op_type,job_no,crew,location,currency,bonus,per_diam,nameError,al_dateError,districtError,operationError,client_idError,op_typeError,job_noError,crewError,locationError,currencyError,bonusError,per_diamError,editname,edital_date,editdistrict,editoperation,editclient_id,editop_type,editjob_no,editcrew,editlocation,editcurrency,editbonus,editper_diam,editnameError,edital_dateError,editdistrictError,editoperationError,editclient_idError,editop_typeError,editjob_noError,editcrewError,editlocationError,editcurrencyError,editbonusError,editper_diamError} = this.state;
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
                  <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Daily Allowance</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_allowance"><i className="fa fa-plus" /> Add Daily Allowance</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">

            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">

            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="form-control floating" id="searchclientid">
                  <option value=""> -- Select -- </option>
                  {
                      clients !== null &&
                      clients.map((item,index) => {
                          return(
                              <option value={item.id} key={index}>{item.name}</option>
                          )
                      })
                  }
                </select>
                <label className="focus-label"> Client</label>
              </div>
            </div>

            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <div className="cal-icon">
                  <input className="form-control floating" type="text" id="searchfrom"/>
                </div>
                <label className="focus-label">From</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <div className="cal-icon">
                  <input className="form-control floating" type="text" id="searchto"/>
                </div>
                <label className="focus-label">To</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <a href="#" className="btn btn-success btn-block" onClick={this.searchAllowance}> Search </a>
            </div>
          </div>
          {
              alert &&
              <div className={"alert  alert-dismissible fade show alert-"+msgType} role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
             </div>
          }
          {/* /Search Filter */}
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
               {
                   allowances !== null &&
                   <Table className="table-striped"
                    pagination= { {total : allowances.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}
                    // bordered
                    dataSource={allowances}
                    rowKey={record => record.id}
                    onChange={this.handleTableChange}
                    />
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
                  <span aria-hidden="true">??</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Person Name <span className="text-danger">*</span></label>
                        <input className="form-control" value={this.state.username}  type="text" disabled />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Operation Type <span className="text-danger">*</span></label>
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
                        <label>Client <span className="text-danger">*</span></label>
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
                        <label>Operation <span className="text-danger">*</span></label>

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
                        <label>Location <span className="text-danger">*</span></label>
                        <input  className="form-control" type="text" value={location} onChange={this.changeLocation}/>
                        {
                            locationError &&
                            <p className="text-danger">{locationError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Crew <span className="text-danger">*</span></label>
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
                        <label>Ticket/Job no. <span className="text-danger">*</span></label>
                        <input  className="form-control" type="text" value={job_no} onChange={this.changeJobNo}/>
                        {
                            job_noError &&
                            <p className="text-danger">{job_noError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>District <span className="text-danger">*</span></label>
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
                        <label>Allowance Date <span className="text-danger">*</span></label>
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
                        <label>Currency <span className="text-danger">*</span></label>
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
                        <label>Bonus <span className="text-danger">*</span></label>
                        <input  className="form-control" type="number" value={bonus} onChange={this.changeBonus}/>
                        {
                            bonusError &&
                            <p className="text-danger">{bonusError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Per Diem <span className="text-danger">*</span></label>
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
                  <span aria-hidden="true">??</span>
                </button>
              </div>
              <div className="modal-body">
                {allowances !== null &&
                <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Person Name <span className="text-danger">*</span></label>
                          <input className="form-control" value={this.state.username}  type="text" disabled />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Operation Type <span className="text-danger">*</span></label>
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
                          <label>Client <span className="text-danger">*</span></label>
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
                          <label>Operation <span className="text-danger">*</span></label>

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
                          <label>Location <span className="text-danger">*</span></label>
                          <input  className="form-control" type="text" value={editlocation} onChange={this.changeEditLocation}/>
                          {
                              editlocationError &&
                              <p className="text-danger">{editlocationError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Crew <span className="text-danger">*</span></label>
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
                          <label>Ticket/Job no. <span className="text-danger">*</span></label>
                          <input  className="form-control" type="text" value={editjob_no} onChange={this.changeEditJobNo}/>
                          {
                              editjob_noError &&
                              <p className="text-danger">{editjob_noError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>District <span className="text-danger">*</span></label>
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
                          <label>Allowance Date <span className="text-danger">*</span></label>
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
                          <label>Currency <span className="text-danger">*</span></label>
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
                          <label>Bonus <span className="text-danger">*</span></label>
                          <input  className="form-control" type="number" value={editbonus} onChange={this.changeEditBonus}/>
                          {
                              editbonusError &&
                              <p className="text-danger">{editbonusError}</p>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Per Diem <span className="text-danger">*</span></label>
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
                      <a href="" className="btn btn-primary continue-btn" onClick={this.deleteExspense}>Delete</a>
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

export default EmpAllowances;
