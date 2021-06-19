
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02, Avatar_09, Avatar_10, Avatar_05, Avatar_11, Avatar_12, Avatar_13} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
export const ADMIN_PAYROLL_UPDATE='admin/payroll/update';
import {API_URL,CORE,ADMIN_PAYROLL_LIST,FRONT_URL,ADMIN_PAYROLL_CHNAGE_STATUS,ADMIN_SALARY_CALCULATOR,ADMIN_PAYROLL_EDIT_REQUEST,ADMIN_PAYROLL_ADD,ADMIN_PAYROLL_REQUEST_DELETE,ADMIN_PAYROLL_REQUEST_SEARCH} from '../Contants';
import moment from 'moment';
import { monthsShort } from 'moment';
import { preventDefault } from '@fullcalendar/common';


class Salary extends Component {
    constructor(props) {
        super(props);
        this.state = {
           payrolls : [],
           posts : [] ,
           alert : false,
           message : '',
           msgType : ''      ,
           emps : [] ,
           emp_id : '',
           basic : '',
           exspense : '',
           house : '',
           houseError : '',
           food : '',
           foodError : '',
           monthlyallowance :'',
           monthlyallowanceError : '',
           otherallowance : '',
           otherallowanceError : '',
           basicError : '',
           exspenseError : '',
           tap : '',
           scp : '',
           tapError : '',
           scpError : '',
           add : '',
           leave : '',
           deduct : '',
           otherdeduct : '',
           contribution : '',
           netsalary : '',

          //  edit
           editemp_id : '',
           editbasic : '',
           editexspense : '',
           edithouse : '',
           houseEditError : '',
           food : '',
           foodEditError : '',
           editmonthlyallowance :'',
           monthlyallowanceEditError : '',
           editotherallowance : '',
           otherallowanceEditError : '',
           basicEditError : '',
           exspenseEditError : '',
           edittap : '',
           editscp : '',
           edittapError : '',
           editscpError : '',
           editadd : '',
           editleave : '',
           editotherdeduct : '',
           editcontribution : '',
           editnetsalary : '',
           editnetsalaryError : '',
           editId : '',
           deleteId : '',
           addError : '',
           deductError : '',
           contributionError : '',
           editadd : '',
           editdeduct : '',
           editcontribustion : '',
           addEditError : '',
           deductEditError : '',
           contributionEditError : '',
           monthyearError  : '' ,
           monthyearEditError  : '',
           netsalaryEditError  : '',
           monthyear : '',
           medical : '',
           editmedical : '',
           medicalError : '',
           editmedical : '',
           medicalEditError : ''
        };

        this.loadPayrolls = this.loadPayrolls.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeEmp = this.changeEmp.bind(this);
        this.changeBasic = this.changeBasic.bind(this);
        this.changeFood = this.changeFood.bind(this);
        this.changeHouse = this.changeHouse.bind(this);
        this.chnageMonthlyAllowance = this.chnageMonthlyAllowance.bind(this);
        this.changeMedical = this.changeMedical.bind(this);
        this.changeOtherAllowance = this.changeOtherAllowance.bind(this);
        this.calculateSalary = this.calculateSalary.bind(this);
        this.changeLeave = this.changeLeave.bind(this);
        this.changeOtherDeduct = this.changeOtherDeduct.bind(this);
        this.changeExspense = this.changeExspense.bind(this);


        this.changeEditEmp = this.changeEditEmp.bind(this);
        this.changeEditBasic = this.changeEditBasic.bind(this);
        this.changeEditFood = this.changeEditFood.bind(this);
        this.changeEditHouse = this.changeEditHouse.bind(this);
        this.chnageEditMonthlyAllowance = this.chnageEditMonthlyAllowance.bind(this);
        this.changeEditMedical = this.changeEditMedical.bind(this);
        this.changeEditOtherAllowance = this.changeEditOtherAllowance.bind(this);
        this.calculateEditSalary = this.calculateEditSalary.bind(this);
        this.changeEditLeave = this.changeEditLeave.bind(this);
        this.changeEditOtherDeduct = this.changeEditOtherDeduct.bind(this);
        this.changeEditExspense = this.changeEditExspense.bind(this);
        this.clickEdit = this.clickEdit.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.updateSalary = this.updateSalary.bind(this);
        this.deleteSalary = this.deleteSalary.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
      }

    async loadPayrolls(){
      var fetchData = await fetch(API_URL+ADMIN_PAYROLL_LIST).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
          payrolls : fetchData.data,
          posts : fetchData.posts,
          emps : fetchData.emps
        });
      }
    }
    
    componentDidMount(){
      this.loadPayrolls();
    }

    async changeStatus(e,id){
      let status = e.target.value;
      var data = {
        id : id,
        status : status
      };
      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_CHNAGE_STATUS,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
      }).then(res => res.json());
  
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

    async changeEmp(event){
      let emps = this.state.emps;
      let id = event.target.value;
      var fetchData = await fetch(API_URL + ADMIN_SALARY_CALCULATOR + id).then(res => res.json());
      // if(fetchData.code === 200){
      //   var exspense = 0;
      //   if(fetchData.data['exspenses'].length > 0){
      //     for(var i = 0 ; i < fetchData.data['exspenses'].length ; i++){
      //       exspense = exspense + parseFloat(fetchData.data['exspenses'][i].amount);
      //     }
      //   }
      // }
    
      
      var basic = await emps.find(x => x.id === parseInt(id)).salary ;
      this.setState({
        emp_id : id,
        basic:basic,
        // exspense : exspense
      });
    }

    changeBasic(event){
      this.setState({ basic : event.target.value});
    }

    calculateSalary(e){
      e.preventDefault();
      const {basic,house,exspense,food, monthlyallowance,otherallowance,otherdeduct,leave} = this.state;

      var addition  = 
           (house === '' ? 0.0 : parseFloat(house))+ 
           (exspense === '' ? 0.0 : parseFloat(exspense)) + 
           (food === '' ? 0.0 : parseFloat(food)) + 
           (monthlyallowance === '' ? 0.0  : parseFloat(monthlyallowance)) + 
           (otherallowance ===  '' ? 0.0 : parseFloat(otherallowance));
      let add = parseFloat(basic) + parseFloat(addition);
      var tap = parseFloat(add * 0.05);
      var scp = parseFloat(add * 0.035);
      if(scp < 17.50){
        scp = 17.50;
      }    
  
      var deduct  =  (leave === '' ? 0 : parseFloat(leave)) + (otherdeduct === '' ? 0 : parseFloat(otherdeduct));

      var contribution =  scp + tap;


      var net_salary = add - (deduct + contribution);
      net_salary = parseFloat(net_salary).toFixed(2);
      this.setState({
        tap : Math.ceil(tap),
        scp :  Math.round(scp),
        add : add,
        deduct : deduct,
        contribution : contribution,
        netsalary : net_salary
      });
    }

    changeFood(event){
      this.setState({food : event.target.value});
    }

    changeHouse(event){
      this.setState({house : event.target.value});
    }

    chnageMonthlyAllowance(event){
      this.setState({monthlyallowance : event.target.value});
    }

    changeMedical(event){
      this.setState({medical : event.target.value});
    }

    changeOtherAllowance(event){
      this.setState({otherallowance : event.target.value});
    }
    changeLeave(event){
      this.setState({leave : event.target.value});
    }

    changeOtherDeduct(event){
      this.setState({otherdeduct : event.target.value});
    }

    changeExspense(event){
      this.setState({exspense : event.target.value});
    }

    // edit
    async changeEditEmp(event){
      let emps = this.state.emps;
      let id = event.target.value;
      // var fetchData = await fetch(API_URL + ADMIN_SALARY_CALCULATOR + id).then(res => res.json());
      // console.log(fetchData);
      // if(fetchData.code === 200){
      //   var exspense = 0;
      //   if(fetchData.data['exspenses'].length > 0){
      //     for(var i = 0 ; i < fetchData.data['exspenses'].length ; i++){
      //       exspense = exspense + parseFloat(fetchData.data['exspenses'][i].amount);
      //     }
      //   }
      // }
    
      
      var basic = await emps.find(x => x.id === parseInt(id)).salary ;
      this.setState({
        editemp_id : id,
        editbasic:basic,
        // editexspense : exspense
      });
    }

    async clickEdit(id){
       this.setState({editId : id});
       var fetchData = await fetch(API_URL + ADMIN_PAYROLL_EDIT_REQUEST + id).then(res => res.json());
       if(fetchData.code === 200){
         let payroll = fetchData.data;
         this.setState({
          editemp_id : payroll.emp_id,
          editbasic : payroll.basic,
          editexspense : payroll.exspense === null ? '' : payroll.exspense,
          edithouse : payroll.house === null ? '' : payroll.house,
          editfood : payroll.food === null ? '' : payroll.food,
          editmonthlyallowance :payroll.month_al === null ? '' : payroll.month_al,
          editotherallowance : payroll.other_al === null ? '' : payroll.other_al,
          edittap : payroll.tap === null ? '' : payroll.tap,
          editscp : payroll.scp === null ? '' : payroll.scp,
          editleave : payroll.leave_ded === null ? '' : payroll.leave_ded,
          editotherdeduct : payroll.other_ded === null ? '' : payroll.other_ded,
          editnetsalary : payroll.net === null ? '' : payroll.net,
          editmedical : payroll.medical === null ? '' : payroll.medical,
          editadd : payroll.addition === null ? '' : payroll.addition,
          editdeduct : payroll.deduct === null ? '' : payroll.deduct,
          editcontribution : payroll.contribution === null ? '' : payroll.contribution,
         });

         document.querySelector('#keymonthyear').value = moment(payroll.period_frm).format('MMM Y');
       }
    }

    clickDelete(id){
      this.setState({deleteId : id});
    }

    changeEditBasic(event){
      this.setState({ editbasic : event.target.value});
    }

    calculateEditSalary(e){
      e.preventDefault();
      const {editbasic,edithouse,editexspense,editfood, editmonthlyallowance,editotherallowance,editotherdeduct,editleave} = this.state;

      var addition  = (edithouse === '' ? 0.0 : parseFloat(edithouse))+ (editexspense === '' ? 0.0 : parseFloat(editexspense)) + (editfood === '' ? 0.0 : parseFloat(editfood)) + (editmonthlyallowance === '' ? 0.0  : parseFloat(editmonthlyallowance)) + (editotherallowance ===  '' ? 0.0 : parseFloat(editotherallowance));
      let add = parseFloat(editbasic) + parseFloat(addition);


      var tap = parseFloat(add * 0.05);
      var scp = parseFloat(add * 0.035);
      if(scp < 17.50){
        scp = 17.50;
      }    
  
      var deduct  =  (editleave === '' ? 0 : parseFloat(editleave)) + (editotherdeduct === '' ? 0 : parseFloat(editotherdeduct));

      var contribution =  scp + tap;


      var net_salary = add - (deduct + contribution);
      net_salary = parseFloat(net_salary).toFixed(2);
      this.setState({
        edittap : Math.ceil(tap),
        editscp :  Math.round(scp),
        editadd : add,
        editdeduct : deduct,
        editcontribution : contribution,
        editnetsalary : net_salary
      });
    }

    changeEditFood(event){
      this.setState({editfood : event.target.value});
    }

    changeEditHouse(event){
      this.setState({edithouse : event.target.value});
    }

    chnageEditMonthlyAllowance(event){
      this.setState({editmonthlyallowance : event.target.value});
    }

    changeEditMedical(event){
      this.setState({editmedical : event.target.value});
    }

    changeEditOtherAllowance(event){
      this.setState({editotherallowance : event.target.value});
    }
    changeEditLeave(event){
      this.setState({editleave : event.target.value});
    }

    changeEditOtherDeduct(event){
      this.setState({editotherdeduct : event.target.value});
    }

    changeEditExspense(event){
      this.setState({editexspense : event.target.value});
    }

    async addSalary(e){
      e.preventDefault();
      const {emp_id, basic, exspense,house, food, monthlyallowance,otherallowance,medical, medicalError, tap, scp, netsalary,leave,otherdeduct, add,deduct,contribution} = this.state;
      this.setState({
        emp_idError : '', 
        basicError : '', 
        exspenseError : '',
        houseError : '',
        foodError : '',
        monthlyallowanceError : '',
        otherallowanceError : '',
        medicalError : '', 
        tapError : '', 
        scpError : '', 
        netsalaryError : '',
        leaveError : '',
        otherdeductError : '',
        addError : '',
        deductError : '',
        contribustionError : '',
        monthyearError : '',
        tapError : '',
        scpError : ''
      });

      let monthyear = document.querySelector('#monthyear').value;
      

      var error = false;

      if(emp_id === ''){
         this.setState({emp_idError : 'Field is required'});
         error = true;
      }

      if(basic === ''){
        this.setState({basicError : 'Field is required'});
        error = true;
      }

      if(monthyear === ''){
        this.setState({monthyearError : 'Field is required'});
        error = true;
      }

      if(tap === '' ){
        this.setState({tapError : 'Field is required'});
        error = true;
      }

      if(scp === '' ){
        this.setState({scpError : 'Field is required'});
        error = true;
      }

      if(netsalary === ''){
        this.setState({netsalaryError : 'Field is required'});
        error = true;
      }

      console.log('Error'+error);
      if(error){
        return;
      }

      let data = {
        emp_id : emp_id, 
        basic : basic, 
        exspense : exspense,
        house : house, 
        food : food, 
        month_al : monthlyallowance,
        other_al : otherallowance,
        medical : medical,
        tap : tap, 
        scp : scp, 
        netsalary : parseFloat(netsalary),
        leave_ded : leave,
        other_ded : parseFloat(otherdeduct), 
        addition : add,
        deduct : deduct,
        contribution :  contribution,
        monthyear : monthyear
      };

     

      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_ADD,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
      }).then(res => res.json());
      $('#add_salary').modal('hide');
      if(fetchData.code === 200){  
          this.loadPayrolls(); 
          this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
          });
      }
      else{
        this.setState({
            alert : true,
            message : '403, Add appointment failed!',
            msgType : 'danger'
        });
      }
    }
   
    async updateSalary(e){
      e.preventDefault();
      const {editemp_id, editbasic, editexspense,edithouse, editfood, editmonthlyallowance,editotherallowance,editmedical, edittap, editscp, editnetsalary,editleave,editotherdeduct, editadd,editdeduct,editcontribution} = this.state;
      this.setState({
        emp_idEditError : '', 
        basicEditError : '', 
        exspenseEditError : '',
        houseEditError : '',
        foodEditError : '',
        monthlyallowanceEditError : '',
        otherallowanceEditError : '',
        medicalEditError : '', 
        tapEditError : '', 
        scpEditError : '', 
        netsalaryEditError : '',
        leaveEditError : '',
        otherdeductEditError : '',
        addEditError : '',
        deductEditError : '',
        contribustionEditError : '',
        monthyearEditError : '',
        tapEditError : '',
        scpEditError : '',
        monthyearEditError : ''
      });

      let editmonthyear = document.querySelector('#keymonthyear').value;
      

      var error = false;

      if(editemp_id === ''){
         this.setState({emp_idEditError : 'Field is required'});
         error = true;
      }

      if(editbasic === ''){
        this.setState({basicEditError : 'Field is required'});
        error = true;
      }

      if(editmonthyear === ''){
        this.setState({monthyearEditError : 'Field is required'});
        error = true;
      }

      if(edittap === '' ){
        this.setState({tapEditError : 'Field is required'});
        error = true;
      }

      if(editscp === '' ){
        this.setState({scpEditError : 'Field is required'});
        error = true;
      }

      if(editnetsalary === ''){
        this.setState({netsalaryEditError : 'Field is required'});
        error = true;
      }

      
      if(error){
        return;
      }

      let data = {
        id : this.state.editId,
        emp_id : editemp_id, 
        basic : editbasic, 
        exspense : editexspense,
        house : edithouse, 
        food : editfood, 
        month_al : editmonthlyallowance,
        other_al : editotherallowance,
        medical : editmedical,
        tap : edittap, 
        scp : editscp, 
        netsalary : parseFloat(editnetsalary),
        leave_ded : editleave,
        other_ded : editotherdeduct, 
        addition : editadd,
        deduct : editdeduct,
        contribution :  editcontribution,
        monthyear : editmonthyear
      };

      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_UPDATE,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
      }).then(res => res.json());
      $('#edit_salary').modal('hide');
      if(fetchData.code === 200){  
          this.loadPayrolls(); 
          this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
          });
      }
      else{
        this.setState({
            alert : true,
            message : '403, Add appointment failed!',
            msgType : 'danger'
        });
      }
    }

    async deleteSalary(e){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_REQUEST_DELETE + this.state.deleteId).then(res => res.json());
      $('#delete_salary').modal('hide');
      if(fetchData.code === 200){  
          this.loadPayrolls(); 
          this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
          });
      }
      else if(fetchData.code === 403){
        this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'danger'
        });
      }
      else{
        this.setState({
            alert : true,
            message : '403, Add appointment failed!',
            msgType : 'danger'
        });
      }
      
    }

    async clickSearch(e){
      e.preventDefault();
      let name = document.querySelector('#searchempname').value;
      let from = document.querySelector('#from').value;
      let to = document.querySelector('#to').value;

      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_REQUEST_SEARCH + `name=${name}&from=${from}&to=${to}`).then(res => res.json());

      if(fetchData.code === 200){  
          this.setState({payrolls : fetchData.data });
      }
      
    }
	
   render() {
          const{payrolls,posts,alert,msgType,message,emps,emp_id, basic,basicError, exspense,exspenseError, house, houseError, food, foodError, monthlyallowance,monthlyallowanceError,otherallowance,otherallowanceError, medical, medicalError, tap, scp, netsalary,netsalaryError,leave,otherdeduct,editbasic,basicEditError, editexspense,exspenseEditError, edithouse, houseEditError, editfood, foodEditError, editmonthlyallowance,monthlyallowanceEditError,editotherallowance,otherallowanceEditError, editmedical, medicalEditError, edittap, editscp, editnetsalary,editnetsalaryError,editleave,editotherdeduct,editemp_id,tapError,scpError, monthyearError,emp_idError,tapEditError,scpEditError, monthyearEditError,emp_idEditError,netsalaryEditError,monthyear,keymonthyear } = this.state;
          const columns = [
            
            {
              title: 'Name',
              dataIndex: '',
              render: (text, record) => (            
                  <h2 className="table-avatar">
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id} className="avatar"><img alt="" src={record.emp.photo !== '' ? CORE+'uploads/photo/'+record.emp.photo : 'https://via.placeholder.com/150'} /></a>
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id}>
                      {record.emp.name} 
                      {/* <span>{ this.state.post !== null ? 'Me' : '' }</span> */}
                    </a>
                  </h2>
                ), 
            },

            {
              title: 'Email',
              dataIndex: '',
              render : (text,record) => (
                <span>{record.emp.email}</span>
              ),
            },
          
            {
              title: 'Join Date',
              dataIndex: '',
              render : (text,record) => (
                <span>{ record.emp.doj ? moment(record.emp.doj).format('D MMM Y') : ''}</span>
              ),
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: (text, record) => (
                 <div>
                   <select value={record.status} className="rounded p-2" onChange={(e) => this.changeStatus(e,record.id)}>
                     <option value="0">🧡 Pending</option>
                     <option value="1">💚 Approved</option>
                     <option value="2">❤️ Rejected</option>
                   </select>
                 </div>
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
              dataIndex: 'period_frm', 
              render: (text, record) => (
                   <span className="badge badge-lg badge-info">{moment(record.period_frm).format('MMM Y')}</span>
              ),
            },
            {
              title: 'Payslip',
              render: (text, record) => (
                <div>
                  {
                    record.net !== null &&
                    <a className="btn btn-sm btn-primary" href={'/admin/payslip/'+record.id}>Generate Slip</a>
                  }
                </div>
                ),
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div className="dropdown dropdown-action text-right">
                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_salary" onClick={() => this.clickEdit(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_salary" onClick={() => this.clickDelete(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
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
                <title>Salary - HRMS Admin Template</title>
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
                        <li className="breadcrumb-item"><a href="/orange/app/main/dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active">Salary</li>
                      </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                      <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_salary"><i className="fa fa-plus" /> Add Salary</a>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                {/* Search Filter */}
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                    
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    {/* <div className="form-group form-focus select-focus">
                      <select className="select floating"> 
                        <option value> -- Select -- </option>
                        <option value>Employee</option>
                        <option value={1}>Manager</option>
                      </select>
                      <label className="focus-label">Role</label>
                    </div> */}
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" id="searchempname"/>
                      <label className="focus-label">Employee Name</label>
                    </div>
                  </div>
                  
                  
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="from"/>
                      </div>
                      <label className="focus-label">From</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="to"/>
                      </div>
                      <label className="focus-label">To</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}> Search </a>  
                  </div>     
                </div>
                {
                  alert &&
                  <div className={"alert alert-dismissible fade show alert-"+msgType} role="alert">
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
                      {console.log(payrolls !== null ? Array.isArray(payrolls) : '')}
               
                      {
                        payrolls !== null &&
                        <Table className="table-striped"
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
              {/* Add Salary Modal */}
              <div id="add_salary" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Staff Salary</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row"> 
                          <div className="col-sm-6"> 
                            <div className="form-group">
                              <label>Select Employeee</label>
                              <select className="form-control" value={emp_id} onChange={this.changeEmp}> 
                                <option value="">Select one</option>
                              {
                                 emps.map((item,index) => {
                                   return(
                                     <option value={item.id} key={index}>{item.name}</option>
                                   )
                                 })
                               }
                              </select>
                              {emp_idError && 
                                <p className="text-danger mt-1">{emp_idError}</p>
                              }
                            </div>
                          </div>
                          <div className="col-sm-6"> 
                            <label>Net Salary</label>
                            <input className="form-control" type="number" value={netsalary} disabled/>
                            {netsalaryError && 
                                <p className="text-danger mt-1">{netsalaryError}</p>
                            }
                          </div>
                        </div>
                        <div className="row"> 
                          <div className="col-sm-6"> 
                            <h4 className="text-primary">Earnings</h4>
                            <div className="form-group">
                              <label>Basic</label>
                              <input className="form-control" type="number" value={basic} onChange={this.changeBasic} onChange={this.changeBasic}/>
                              {basicError && 
                                <p className="text-danger mt-1">{basicError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Food Allowance</label>
                              <input className="form-control" type="number"  value={food} onChange={this.changeFood}/>
                              {foodError && 
                                <p className="text-danger mt-1">{foodError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Housing Rent Allowance</label>
                              <input className="form-control" type="number" value={house} onChange={this.changeHouse}/>
                              {houseError && 
                                <p className="text-danger mt-1">{houseError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Monthly Allowance Claim</label>
                              <input className="form-control" type="number" value={monthlyallowance} onChange={this.chnageMonthlyAllowance}/>
                              {monthlyallowanceError && 
                                <p className="text-danger mt-1">{monthlyallowanceError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Exspense Claim</label>
                              <input className="form-control" type="number" value={exspense} onChange={this.changeExspense} />
                              {exspenseError && 
                                <p className="text-danger mt-1">{exspenseError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Medical  Allowance</label>
                              <input className="form-control" type="number" value={medical} onChange={this.changeMedical}/>
                              {medicalError && 
                                <p className="text-danger mt-1">{medicalError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Others</label>
                              <input className="form-control" type="number" value={otherallowance} onChange={this.changeOtherAllowance}/>
                              {otherallowanceError && 
                                <p className="text-danger mt-1">{otherallowanceError}</p>
                              }
                            </div>
                          </div>
                          <div className="col-sm-6">  
                            <h4 className="text-primary">Deductions</h4>
                            <div className="form-group">
                              <label>TAP(5%)</label>
                              <input className="form-control" type="number" value={tap} disabled/>
                              {
                                tapError &&
                                <p className="text-danger mt-1">{tapError}</p>
                              }
                            </div> 
                            <div className="form-group">
                              <label>SCP(3.5%)</label>
                              <input className="form-control" type="number" value={scp} disabled/>
                              {
                                scpError &&
                                <p className="text-danger mt-1">{scpError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Leave</label>
                              <input className="form-control" type="number" value={leave} onChange={this.changeLeave}/>
                            </div>
                            <div className="form-group">
                              <label>Others</label>
                              <input className="form-control" type="number" value={otherdeduct} onChange={this.changeOtherDeduct}/>
                            </div>
                            <hr />
                            <h4>Month & year </h4>
                            <div className="form-group">
                              {/* <label>Others</label> */}
                              <div className="cal-icon">
                                <input className="form-control" type="text"  id="monthyear"/>
                              </div>
                              {
                                monthyearError &&
                                <p className="text-danger mt-1">{monthyearError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <button className="btn btn-custom" onClick={(e) => this.calculateSalary(e)}>Calculate Salary</button>
                            </div>
                          </div>
                        </div>
                        <div className="submit-section">
                          <button className="btn btn-primary submit-btn" onClick={(e) => this.addSalary(e)}>Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Add Salary Modal */}
              {/* Edit Salary Modal */}
              <div id="edit_salary" className="modal custom-modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-md" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Staff Salary</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="row"> 
                          <div className="col-sm-6"> 
                            <div className="form-group">
                              <label>Select Employeee</label>
                              <select className="form-control" value={editemp_id} onChange={this.changeEditEmp}> 
                                <option value="">Select one</option>
                              {
                                 emps.map((item,index) => {
                                   return(
                                     <option value={item.id} key={index}>{item.name}</option>
                                   )
                                 })
                               }
                              </select>
                               {
                                 emp_idEditError &&
                                 <p className="text-danger mt-1">{emp_idEditError}</p>
                               }
                            </div>
                          </div>
                          <div className="col-sm-6"> 
                            <label>Net Salary</label>
                            <input className="form-control" type="number" value={editnetsalary} disabled/>
                            {
                                 netsalaryEditError &&
                                 <p className="text-danger mt-1">{netsalaryEditError}</p>
                            }
                          </div>
                        </div>
                        <div className="row"> 
                          <div className="col-sm-6"> 
                            <h4 className="text-primary">Earnings</h4>
                            <div className="form-group">
                              <label>Basic</label>
                              <input className="form-control" type="number" value={editbasic} onChange={this.changeEditBasic} onChange={this.changeEditBasic}/>
                              {basicEditError && 
                                <p className="text-danger mt-1">{basicEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Food Allowance</label>
                              <input className="form-control" type="number"  value={editfood} onChange={this.changeEditFood}/>
                              {foodEditError && 
                                <p className="text-danger mt-1">{foodEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Housing Rent Allowance</label>
                              <input className="form-control" type="number" value={edithouse} onChange={this.changeEditHouse}/>
                              {houseEditError && 
                                <p className="text-danger mt-1">{houseEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Monthly Allowance Claim</label>
                              <input className="form-control" type="number" value={editmonthlyallowance} onChange={this.chnageEditMonthlyAllowance}/>
                              {monthlyallowanceEditError && 
                                <p className="text-danger mt-1">{monthlyallowanceEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Exspense Claim</label>
                              <input className="form-control" type="number" value={editexspense} onChange={this.changeEditExspense} />
                              {exspenseEditError && 
                                <p className="text-danger mt-1">{exspenseEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Medical  Allowance</label>
                              <input className="form-control" type="number" value={editmedical} onChange={this.changeEditMedical}/>
                              {medicalEditError && 
                                <p className="text-danger mt-1">{medicalEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Others</label>
                              <input className="form-control" type="number" value={editotherallowance} onChange={this.changeEditOtherAllowance}/>
                              {otherallowanceEditError && 
                                <p className="text-danger mt-1">{otherallowanceEditError}</p>
                              }
                            </div>
                          </div>
                          <div className="col-sm-6">  
                            <h4 className="text-primary">Deductions</h4>
                            <div className="form-group">
                              <label>TAP(5%)</label>
                              <input className="form-control" type="number" value={edittap} disabled/>
                              {tapEditError && 
                                <p className="text-danger mt-1">{tapEditError}</p>
                              }
                            </div> 
                            <div className="form-group">
                              <label>SCP(3.5%)</label>
                              <input className="form-control" type="number" value={editscp} disabled/>
                              {scpEditError && 
                                <p className="text-danger mt-1">{scpEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <label>Leave</label>
                              <input className="form-control" type="number" value={editleave} onChange={this.changeEditLeave}/>
                            </div>
                            <div className="form-group">
                              <label>Others</label>
                              <input className="form-control" type="number" value={editotherdeduct} onChange={this.changeEditOtherDeduct}/>
                            </div>
                            <h4>Month & year </h4>
                            <div className="form-group">
                              {/* <label>Others</label> */}
                              <div className="cal-icon">
                                <input className="form-control" type="text"  id="keymonthyear" />
                              </div>
                              {
                                monthyearEditError &&
                                <p className="text-danger mt-1">{monthyearEditError}</p>
                              }
                            </div>
                            <div className="form-group">
                              <button className="btn btn-custom" onClick={(e) => this.calculateEditSalary(e)}>Calculate Salary</button>
                            </div>
                          </div>
                        </div>
                        <div className="submit-section">
                          <button className="btn btn-primary submit-btn" onClick={(e) =>this.updateSalary(e)}>Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Edit Salary Modal */}
              {/* Delete Salary Modal */}
              <div className="modal custom-modal fade" id="delete_salary" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="form-header">
                        <h3>Delete Salary</h3>
                        <p>Are you sure want to delete?</p>
                      </div>
                      <div className="modal-btn delete-action">
                        <div className="row">
                          <div className="col-6">
                            <a href="" className="btn btn-primary continue-btn" onClick={(e) => this.deleteSalary(e)}>Delete</a>
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
              {/* /Delete Salary Modal */}
            </div>
            </div>
          <SidebarContent />
        </div>
      );
   }
}

export default Salary;
