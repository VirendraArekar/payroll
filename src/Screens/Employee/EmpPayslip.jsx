
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02} from "../../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import {API_URL,FRONT_URL,CORE,ADMIN_PAYSLIPS_SINGLE_SEARCH,EMPLOYEE_PAYSLIPS_LOAD} from '../../Contants';
import moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";


class EmpPayslip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert : false,
            message : '',
            msgType : '' ,
            payslips : null,
        };

        this.clickSearch = this.clickSearch.bind(this);
        this.loadPayslip = this.loadPayslip.bind(this);

      }

    async loadPayslip(){
        let user = await localStorage.getItem('user');
        user = JSON.parse(user);
        let id = user.id;
         console.log(API_URL + EMPLOYEE_PAYSLIPS_LOAD + id);
          var fetchData = await fetch(API_URL + EMPLOYEE_PAYSLIPS_LOAD + id).then(res => res.json());

          if(fetchData.code === 200){
              this.setState({payslips : fetchData.data });
          }
    }
    // used
    componentDidMount(){
        this.loadPayslip();
    }


    // active
    async clickSearch(e){
      e.preventDefault();
      let user = await localStorage.getItem('user');
        user = JSON.parse(user);
        let id = user.id;
      let keyword = document.querySelector('#searchpayslip').value;
      if(keyword !== ''){
          console.log(API_URL + ADMIN_PAYSLIPS_SINGLE_SEARCH + keyword +'?id='+id);
        var fetchData = await fetch(API_URL + ADMIN_PAYSLIPS_SINGLE_SEARCH + keyword +'?id='+id).then(res => res.json());

        if(fetchData.code === 200){
            this.setState({payslips : fetchData.data });
        }
      }
    }

   render() {
          const{alert,msgType,message, payslips} = this.state;
          const columns = [
            {
                title: 'Payslip Number',
                dataIndex: '',
                render: (text, record) => (
                   <span className="badge badge-info p-2">{record.pay_no}</span>
                  ),
            },
            {
                title: 'Bank Account',
                dataIndex: '',
                render: (text, record) => (
                   <div>
                       {record.bank_details !== null ?
                         <span className="badge badge-primary p-2">{JSON.parse(record.bank_details).account_no}</span>
                         :
                         <span className="badge badge-dark p-2">Not Available</span>
                       }
                   </div>
                  ),
            },
            {
              title: 'Employee',
              dataIndex: '',
              render: (text, record) => (
                  <h2 className="table-avatar">
                    <a href={FRONT_URL+'admin/employee/profile/'+record.emp_id} className="avatar"><img alt="" src={record.photo !== '' ? CORE+'uploads/photo/'+record.photo : 'https://via.placeholder.com/150'} /></a>
                    <a href={FRONT_URL+'admin/employee/profile/'+record.emp_id}>
                      {record.emp_name}
                    </a>
                  </h2>
                ),
            },

            {
              title: 'Salary Details',
              dataIndex: '',
              render : (text,record) => (
                <div>
                    <table>
                    <tbody>
                           <tr>
                                <td  colSpan="2" className="text-center"><strong>(+)Earning</strong></td>
                            </tr>
                            <tr>
                                <td >Basic Salary(Total)</td>
                                <td className="text-right">{record.basic}</td>
                            </tr>
                            <tr>
                                <td >Daily Allowance</td>
                                <td className="text-right">{record.allowance}</td>
                            </tr>
                            <tr>
                                <td >Exspenses</td>
                                <td className="text-right">{record.exspense}</td>
                            </tr>

                            {
                                record.add_al !== null &&
                                record.add_al.map((item,index) => {
                                    return(
                                        <tr>
                                            <td>{item.al_name}</td>
                                            <td className="text-right">{item.al_value}</td>
                                        </tr>
                                    )
                                })
                            }

                            <tr className="bg-dark text-light">
                                <td className="text-center">Total Earning</td>
                                <td className="text-right"><strong>$
                                 {record.addition}</strong></td>
                            </tr>
                            <tr>
                                <td  colSpan="2" className="text-center"><strong>(-)Deduction</strong></td>
                            </tr>
                            {
                                record.foreigner === 0 &&
                                <tr>
                                    <td ><strong>TAP</strong></td>
                                    <td className="text-right"><strong>${record.tap}</strong></td>
                                </tr>
                            }
                            {
                                record.foreigner === 0 &&
                                <tr>
                                    <td ><strong>SCP</strong></td>
                                    <td className="text-right"><strong>${record.scp}</strong></td>
                                </tr>
                            }
                            {
                                record.ded_al !== null &&
                                record.ded_al.map((item,index) => {
                                    return(
                                        <tr>
                                            <td >{item.al_name}</td>
                                            <td className="text-right">{item.al_value}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="bg-dark text-light">
                                <td className="text-center"><strong>Total Deduction</strong></td>
                                <td className="text-right"><strong>$
                                 {parseFloat(record.deduct) + parseFloat(record.contribution)}</strong></td>
                            </tr>
                            <tr className="bg-info">
                                <td className="text-center"><strong>Net Payable</strong></td>
                                <td className="text-right"><strong>${record.net}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              ),
            },
            {
              title: 'Salary Month',
              dataIndex: '',
              render: (text, record) => (
                   <span className="badge p-2 badge-info">{moment(record.for_month).format('MMM Y')}</span>
              ),
            },
            {
                title: 'Paid',
                dataIndex: '',
                render: (text, record) => (
                     <div>
                         {
                             record.paid ?
                             <span className="badge p-2 badge-success">Yes</span>
                             :
                             <span className="badge p-2 badge-danger">No</span>
                         }
                     </div>
                ),
            },
            {
                title: 'Status',
                dataIndex: '',
                render: (text, record) => (
                    <div>
                        {record.status === 0 &&
                        <span className="badge badge-primary">Pending</span>
                        }
                        {record.status === 1 &&
                        <span className="badge badge-primary">Active</span>
                        }
                        {record.status === 2 &&
                        <span className="badge badge-success">Approved</span>
                        }
                    </div>
                ),
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div>
                      { record.status === 2 &&
                        <a href={"/employee/salary/"+record.id} className="btn btn-custom btn-sm" data-toggle="tooltip" data-placement="top" title="View payslip" ><span className="fa fa-arrow-circle-down"> Download</span></a>
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
                <title>Salary - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
              {/* Page Content */}
              <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Employee Payslip</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/orange/app/main/dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active">Salary</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                {/* Search Filter */}

                <div className="row filter-row">
                  <div className="col-sm-12 col-md-9 col-lg-9 col-xl-6 col-12">

                  </div>

                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                    <div className="form-group form-focus">
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="searchpayslip"/>
                      </div>
                      <label className="focus-label">Month & Year</label>
                    </div>
                  </div>


                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}><i className="fa fa-search"></i>&nbsp;Search</a>
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
                        payslips !== null &&
                        <Table className="table-striped text-center"
                          pagination= { {total : payslips.length,
                            showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                          style = {{overflowX : 'auto'}}
                          columns={columns}
                          // bordered
                          dataSource={payslips}
                          rowKey={record => record.id}
                          onChange={this.handleTableChange}
                        />
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* /Page Content */}
            </div>
            </div>
          <SidebarContent />
        </div>
      );
   }
}

export default EmpPayslip;
