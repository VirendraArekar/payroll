
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import {API_URL,FRONT_URL,CORE,ADMIN_PAYROLL_LISTS,ADMIN_EMP_PAYROLL_EDIT,ADMIN_EMP_PAYROLL_UPDATE,ADMIN_EMP_PAYSLIP_GENERATE,ADMIN_PAYROLL_LIST_SEARCH} from '../Contants';
import moment from 'moment';



class NewPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert : false,
            message : '',
            msgType : '' ,
            payrolls : null,
            basic : 0.00,
            food : 0.00,
            house : 0.00,
            month_al : 0.00,
            medical : 0.00,
            tap : 0.00,
            scp : 0.00,
            net : 0.00,
            other_ded : 0.00,

            basicError : '',
            foodError : '',
            houseError : '',
            month_alError : '',
            medicalError : '',
            tapError : '',
            scpError : '',
            netError : '',
            other_dedError : '',

            foreigner : '',
            emp_id :'',

            name : '',
            editId : '',
            payslipId : '',
            modalemp_name : '',
            modaldateError : ''
        };

        this.loadPayrolls = this.loadPayrolls.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.clickEdit = this.clickEdit.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.calculateSalary = this.calculateSalary.bind(this);
        this.getPayroll = this.getPayroll.bind(this);    
        this.updatePayroll = this.updatePayroll.bind(this);
        this.clickViewPayroll = this.clickViewPayroll.bind(this);
        this.generatePayslip = this.generatePayslip.bind(this);
      }

    async loadPayrolls(){
      var fetchData = await fetch(API_URL+ADMIN_PAYROLL_LISTS).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
          payrolls : fetchData.data
        });
      }
    }

    async getPayroll(id){
      var fetchData = await fetch(API_URL+ADMIN_EMP_PAYROLL_EDIT+id).then(res => res.json());
      
      if(fetchData.code === 200){
          this.setState({payroll : fetchData.data});
          let payroll = fetchData.data;
          this.setState({
              basic : payroll.basic,
              food : payroll.food ,
              house : payroll.house,
              medical : payroll.medical ,
              other_al : payroll.other_al ,
              tap : payroll.tap,
              scp : payroll.scp,
              net : payroll.net,
              other_ded : payroll.other_ded,
              name : payroll.emp.name,
              editId : id,
              foreigner : payroll.emp.foreigner,
              emp_id : payroll.emp_id,
              
          });

          $('#view-payroll').modal('show');
      }
    }

    clickViewPayroll(name,id){
        this.setState({modalemp_name : name,payslipId : id});
        $('#genPayslipModal').modal('show');
    }

    async clickEdit(e){

    }

    async clickDelete(e){

    }

    async calculateSalary(){
        const {basic,house,food,other_al,medical,other_ded, scp, tap, foreigner} = this.state;
  
        var addition  = parseFloat(house) +  parseFloat(food) +  parseFloat(other_al) + parseFloat(medical);
        let add = parseFloat(basic) + parseFloat(addition);
        var contribution;
        if(!foreigner){
            var tapval = parseFloat(add * (parseFloat(tap)/ 100));
            var scpval = parseFloat(add * (parseFloat(scp)/ 100));

            if(scpval < 17.50){
                scpval = 17.50;
            }    
        
           
            contribution =  scpval + tapval;
        }
        else{
            contribution = 0;
        }

        var deduct  =   parseFloat(other_ded);
        var net_salary = add - (deduct + contribution);
        net_salary = parseFloat(net_salary).toFixed(2);
        this.setState({net : net_salary });
    }
    
    componentDidMount(){
      this.loadPayrolls();
    }

    async updatePayroll(e){
        e.preventDefault();
        const {scp,tap,basic,net,other_al, other_ded, house,food,medical,editId, emp_id,foreigner } = this.state;
        this.setState({
            scpError : '',
            tapError : '',
            basicError : '',
            netError : '',
            other_alError : '', 
            other_dedError : '', 
            houseError : '',
            foodError : '',
            medicalError : ''
        });

        var error = false;
        
        if(basic === "0.00" || basic === ''){
            this.setState({basicError : 'Field is required!'});
            error = true;
        }

        if(!foreigner){
            if(tap === "0.00" || tap === ''){
                this.setState({tapError : 'Field is required!'});
                error = true;
            }

            if(scp === "0.00" || scp === ''){
                this.setState({scpError : 'Field is required!'});
                error = true;
            }
        }

        if(net === "0.00" || net === ''){
            this.setState({netError : 'Field is required!'});
            error = true;
        }

        if(error){
            return;
        }

        var data = {
            basic : basic,
            house : house,
            medical : medical,
            food : food,
            other_al : other_al,
            other_ded : other_ded,
            scp : scp,
            tap : tap,
            id : editId,
            emp_id : emp_id,
            net :net
        }


        var fetchData = await fetch(API_URL + ADMIN_EMP_PAYROLL_UPDATE,{
            method : 'post',
            headers:{'content-type': 'application/json'},
            body : JSON.stringify(data)
          }).then(res => res.json());
          $('#view-payroll').modal('hide');
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
                message : '403, Loading payroll failed!',
                msgType : 'danger'
            });
          }
        
    }

    async generatePayslip(e){
        e.preventDefault();
        let id = this.state.payslipId;
        let date = document.querySelector('#datepicker').value;
        var error = false;
        if(date === ''){
            this.setState({modaldateError : 'Field is required!'});
            error = true;
        }

        if(error){
            return;
        }
        let finaldate = '15-'+date ;
        let fdate = moment(finaldate ,'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        let month = moment(finaldate,'DD/MM/YYYY').format('MM');
        let year = moment(finaldate,'DD/MM/YYYY').format('YYYY');
        var data = {
            id :id,
            date : fdate,
            month : month,
            year : year
        }

        console.log(data);

        var fetchData = await fetch(API_URL + ADMIN_EMP_PAYSLIP_GENERATE,{
            method : 'post',
            headers:{'content-type': 'application/json'},
            body : JSON.stringify(data)
          }).then(res => res.json());
          $('#genPayslipModal').modal('hide');
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
                message : '403, Loading payroll failed!',
                msgType : 'danger'
            });
          }
    }

    async clickSearch(e){
      e.preventDefault();
      let keyword = document.querySelector('#keyword').value;

      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_LIST_SEARCH + keyword).then(res => res.json());

      if(fetchData.code === 200){  
          this.setState({payrolls : fetchData.data });
      }
      
    }
	
   render() {
          const{alert,msgType,message, payrolls,basic,net,house,food,other_al,scp,tap,medical,name,basicError,netError,houseError,foodError,other_alError,scpError,tapError,medicalError,other_ded,other_dedError, foreigner, modalemp_name,modaldateError} = this.state;
          const columns = [
            {
              title: 'Name',
              dataIndex: '',
              render: (text, record) => (            
                  <h2 className="table-avatar">
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id} className="avatar"><img alt="" src={record.photo !== '' ? CORE+'uploads/photo/'+record.photo : 'https://via.placeholder.com/150'} /></a>
                    <a href={FRONT_URL+'admin/employee/profile/'+record.id}>
                      {record.emp_name} 
                      {/* <span>{ this.state.post !== null ? 'Me' : '' }</span> */}
                    </a>
                  </h2>
                ), 
            },

            {
              title: 'Payslip Type',
              dataIndex: '',
              render : (text,record) => (
                <span>Monthly</span>
              ),
            },
            {
              title: 'Basic Salary',
              dataIndex: '', 
              render: (text, record) => (
                   <span className="badge p-2 badge-dark">${record.basic}</span>
              ),
            },
            {
              title: 'Net Salary',
              dataIndex: 'net_salary', 
              render: (text, record) => (
                   <span className="badge p-2 badge-info">{record.net_salary}</span>
              ),
            },
            {
              title: 'Status',
              render: (text, record) => (
                <span className="badge p-2 badge-success">Active</span>
                ),
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div>
                      <button className="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="Vie or edit payroll" ><span className="fa fa-eye" onClick={(e) => this.getPayroll(record.id)}></span></button>&nbsp;
                      <button className="btn btn-custom btn-sm" data-toggle="tooltip" data-placement="top" title="Generate payslip" onClick={(e) => this.clickViewPayroll(record.emp_name,record.id)}><span className="fa fa-money"></span></button>
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
                  </div>
                </div>
                {/* /Page Header */}
                {/* Search Filter */}
                {/* <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                    
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  

                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="from"/>
                      </div>
                      <label className="focus-label">Month & Year</label>
                    </div>
                  </div>

                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}><i className="fa fa-search"></i>&nbsp;Search </a>  
                  </div>  
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}><i className="fa fa-check-square"></i>&nbsp;Bulk Payment </a>  
                  </div>     
                </div> */}
                <div className="row filter-row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12"> 
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <div className="form-group form-focus">
                      <input type="text" className="form-control floating" id="keyword"/>
                      <label className="focus-label">Keyword</label>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}><i className="fa fa-search"></i>&nbsp;Search </a>  
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
              <div className="modal fade" id="view-payroll" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label>Employee</label>
                                        <input className="form-control" type="text" value={name} onChange={() => console.log('')} disabled/>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label>Net Salary</label>
                                        <input className="form-control" type="number" value={net}  disabled />
                                        {
                                            netError &&
                                            <p className="text-danger mt-1">{netError}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <h4>Earning</h4>
                                    <div className="form-group">
                                        <label>Basic</label>
                                        <input className="form-control" type="number" value={basic} onChange={(e) => {
                                                this.setState({basic : e.target.value},() => {
                                                    this.calculateSalary();
                                                });
                                            }}/>
                                        {
                                            basicError &&
                                            <p className="mt-1 text-danger">{basicError}</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Food Allowance</label>
                                        <input className="form-control" type="number"  value={food} onChange={(e) => {
                                            this.setState({food : e.target.value},() => {
                                                this.calculateSalary();
                                            });
                                            }} />
                                        {
                                            foodError &&
                                            <p className="mt-1 text-danger">{foodError}</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Housing Rent Allowance</label>
                                        <input className="form-control" type="number" value={house} onChange={(e) => {
                                            this.setState({house : e.target.value},() => {
                                                this.calculateSalary();
                                            });
                                            }} />
                                        {
                                            houseError &&
                                            <p className="mt-1 text-danger">{houseError}</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Medical  Allowance</label>
                                        <input className="form-control" type="number" value={medical} onChange={(e) => {
                                            this.setState({medical : e.target.value},() => {
                                                this.calculateSalary();
                                            });
                                            }} />
                                        {
                                            medicalError &&
                                            <p className="mt-1 text-danger">{medicalError}</p>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Others</label>
                                        <input className="form-control" type="number" value={other_al} onChange={(e) => {
                                            this.setState({other_al : e.target.value},() => {
                                                this.calculateSalary();
                                            });
                                            }} />
                                        {
                                            other_alError &&
                                            <p className="mt-1 text-danger">{other_alError}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-6">  
                                    <h4 className="text-primary">Deductions</h4>
                                    {
                                        !foreigner &&
                                        <div>
                                             <div className="form-group">
                                                <label>TAP(%)</label>
                                                <input className="form-control" type="number"   value={tap} onChange={(e) => {
                                                    this.setState({tap : e.target.value},() => {
                                                        this.calculateSalary();
                                                    });
                                                    }} />
                                                {
                                                    tapError &&
                                                    <p className="mt-1 text-danger">{tapError}</p>
                                                }
                                            </div> 
                                            <div className="form-group">
                                                <label>SCP(%)</label>
                                                <input className="form-control" type="number" value={scp} onChange={(e) => {
                                                    this.setState({scp : e.target.value},() => {
                                                        this.calculateSalary();
                                                    });
                                                    }} />
                                                {
                                                    scpError &&
                                                    <p className="mt-1 text-danger">{scpError}</p>
                                                }
                                            </div>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label>Others</label>
                                        <input className="form-control" type="number" value={other_ded} onChange={(e) => {
                                            this.setState({other_ded : e.target.value},() => {
                                                this.calculateSalary();
                                            });
                                            }} />
                                        {
                                            other_dedError &&
                                            <p className="mt-1 text-danger">{other_dedError}</p>
                                        }
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                             <button type="button" className="btn btn-primary" onClick={this.updatePayroll}>Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
              </div>
              {/* new payslip */}
              <div className="modal fade" id="genPayslipModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Generate Payslip</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                          <div className="col-sm-6 col-md-6">
                             <input type="text" className="form-control" defaultValue={modalemp_name} disabled />
                          </div>
                          <div className="col-sm-6 col-md-6">
                            <div class="cal-icon">
                                <input class="form-control floating" type="text" id="datepicker" required/>
                                {
                                    modaldateError &&
                                    <p className="text-danger m-1">{modaldateError}</p>
                                }
                            </div>
                          </div>
                        </div>
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.generatePayslip}>Generate</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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

export default NewPayment;
