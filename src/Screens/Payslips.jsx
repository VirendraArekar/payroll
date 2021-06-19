
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Applogo} from "../Entryfile/imagepath";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import {FRONT_URL,API_URL,EMPLOYEE_SLARY_EXPORT,EMPLOYEE_LOAD_PAYSLIP} from '../Contants';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import moment from 'moment';

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];



class Payslips extends Component {
   constructor(props){
     super(props);
     this.state = {
       payrollId : this.props.match.params.id,
       company : null,
       payroll : null,
       posts : null,
       postId : '',
       dynamical : [],
       dynamicded : []
     }

     this.printSlip = this.printSlip.bind(this);
     this.loadPayslip = this.loadPayslip.bind(this);
     this.printPdf = this.printPdf.bind(this);
     this.inWords = this.inWords.bind(this);
   }

   async loadPayslip(){
     console.log(API_URL + EMPLOYEE_LOAD_PAYSLIP + this.state.payrollId);
     var fetchData = await fetch(API_URL + EMPLOYEE_LOAD_PAYSLIP + this.state.payrollId).then(res=>res.json());
     if(fetchData.success){
       this.setState({
         payroll : fetchData.data['payslip'],
         dynamical : fetchData.data['payslip'].add_al,
         dynamicded : fetchData.data['payslip'].ded_al,
         company : fetchData.data['company'],
         posts : fetchData.data['posts'],
         postId : fetchData.data['payslip'].emp.post_id
       })
     }
   }

    inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
  }

   componentDidMount(){
     this.loadPayslip();
   }

   printPdf(e) {
     e.preventDefault();
    const input = document.getElementById('printarea');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', [430, 600]);
        pdf.addImage(imgData, 'JPEG', 10, 10);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

   printSlip() {
        var printContents = document.getElementById('printarea').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
   }
   render() {
     const {company,payroll,posts,postId} = this.state;
      return (
    <div className="main-wrapper">
      <Header/>
     <div>
      <div className="page-wrapper">
        <Helmet>
            <title>Payslip - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Payslip</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href={FRONT_URL+'admin/dashboard'}>Dashboard</a></li>
                <li className="breadcrumb-item active">Payslip</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <div className="btn-group btn-group-sm">
                {/* <a className="btn btn-white" href={API_URL + EMPLOYEE_SLARY_EXPORT+'?id='+ 5 + '&type='+'csv'} target="_blank">CSV</a> */}
                <a className="btn btn-white" href={API_URL + EMPLOYEE_SLARY_EXPORT+'?id='+ 5 + '&type='+'pdf'} target="_blank" onClick={this.printPdf}>PDF</a>
                <button className="btn btn-white" onClick={this.printSlip}><i className="fa fa-print fa-lg" /> Print</button>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body" id="printarea">
                <h4 className="payslip-title">Payslip for the month of {payroll !== null ? moment(payroll.for_month).format('MMM Y') : ''}</h4>
                <div className="row">
                  <div className="col-sm-6 m-b-20">
                    <img src={Applogo} className="inv-logo" alt="" />
                    {
                      company !== null &&
                      <ul className="list-unstyled mb-0">
                        <li>{company['company']}</li>
                        <li>{company['address1']}</li>
                        <li>{company['address2']}</li>
                        <li>{company['country']}, {company['state']}, {company['city']}</li>
                        <li>{company['zip']}</li>
                      </ul>
                    }
                  </div>
                  <div className="col-sm-6 m-b-20">
                    <div className="invoice-details">
                      {/* <h3 className="text-uppercase">Payslip #49029</h3> */}
                      <ul className="list-unstyled">
                        <li>Salary Month: <span>{payroll !== null ? moment(payroll.for_month).format('MMM, Y') : ''}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 m-b-20">
                    <ul className="list-unstyled">
                      <li><h4 className="mb-0"><strong>{payroll !== null ? payroll.emp.name : ''}</strong></h4></li>
                      <li>
                        <span>
                        {posts !== null ? posts.find(x => x.id === postId).post : ''}
                        </span>
                        </li>
                      <li>Employee ID: EM-000{payroll !== null ? payroll.emp.id : ''}</li>
                      <li>Joining Date: {payroll !== null ? moment(payroll.emp.doj).format('D MMM Y') : ''}</li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div>
                      <h4 className="m-b-10"><strong>Earnings</strong></h4>
                      {payroll !== null &&
                      <table className="table table-bordered">
                        <tbody>
                            <tr>
                              <td><strong>Basic Salary</strong> <span className="float-right">${payroll.basic}</span></td>
                            </tr>
                            {
                              this.state.dynamical.map((item,index) => {
                                return(
                                  <tr kay={index}>
                                    <td><strong>{item.al_name}</strong> <span className="float-right">${item.al_value}</span></td>
                                  </tr>
                                )
                              })
                            }
                            {payroll.allowances.length > 0 &&
                              <tr>
                                  <td><h4 className="text-center my-1">Allowances</h4></td>
                              </tr>
                            }
                            {payroll.allowances.length > 0 &&
                              <tr className="border-0 m-0 p-0">
                                  <td className="m-0 p-0 border-0">
                                      <table className="table table-bordered m-0 p-0">
                                        <thead>
                                            <tr className="text-center">
                                            <th>Operation Type</th>
                                            <th>Operation</th>
                                            <th>Job No.</th>
                                            <th>Bonus</th>
                                            <th>Per Diem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           { payroll.allowances.map((item,index) => (
                                                <tr key={index}>
                                                    <td>{item.op_type}</td>
                                                    <td>{item.operation}</td>
                                                    <td>{item.job_no}</td>
                                                    <td className="text-right">${item.bonus}</td>
                                                    <td className="text-right">${item.per_diem}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                  </td>
                              </tr>
                            }
                          {/* <tr>
                              <td><strong>Daily Allowance</strong> <span className="float-right">${payroll.allowance}</span></td>
                          </tr> */}
                          {/* <tr>
                              <td><strong>Exspenses</strong> <span className="float-right">${payroll.exspense}</span></td>
                          </tr> */}
                          <tr>
                            <td><strong>Total Earnings</strong>
                              <span className="float-right">
                                <strong>$
                                  {
                                    parseFloat(payroll.addition)
                                  }
                                </strong>
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6">
                    {payroll !== null &&
                    <div>
                      <h4 className="m-b-10"><strong>Deductions</strong></h4>
                      <table className="table table-bordered">
                        <tbody>
                          {
                            payroll.emp.foreigner === 0 &&
                            <tr>
                              <td><strong>TAP (5%)</strong> <span className="float-right">
                                ${payroll.tap}</span></td>
                            </tr>
                          }
                          {
                            payroll.emp.foreigner === 0 &&
                            <tr>
                              <td><strong>SCP (3.5%)</strong> <span className="float-right">${payroll.scp}</span></td>
                            </tr>
                          }
                           {payroll.exspenses.length > 0 &&
                              <tr>
                                  <td><h4 className="text-center my-1">Exspenses</h4></td>
                              </tr>
                            }
                            {payroll.exspenses.length > 0 &&
                              <tr className="border-0 m-0 p-0">
                                  <td className="m-0 p-0 border-0">
                                      <table className="table table-bordered m-0 p-0">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Item</th>
                                                <th>Purchase From</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payroll.exspenses !== null &&
                                            payroll.exspenses.length > 0 &&
                                            payroll.exspenses.map((item,index) => (
                                            <tr key={index}>
                                                <td>{item.item}</td>
                                                <td>{item.purchase_from}</td>
                                                <td className="text-right">${item.amount}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                      </table>
                                  </td>
                              </tr>
                            }
                          {
                              this.state.dynamicded.map((item,index) => {
                                return(
                                  <tr key={index}>
                                    <td><strong>{item.al_name}</strong> <span className="float-right">${item.al_value}</span></td>
                                  </tr>
                                )
                              })
                            }

                          <tr>
                            <td><strong>Total Deductions</strong> <span className="float-right"><strong>
                            ${ parseFloat(payroll.deduct) + parseFloat(payroll.contribution) }</strong></span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    }
                  </div>
                  <div className="col-sm-12">
                    <p style={{fontSize : 20}}><strong>Net Salary: ${payroll !== null ? payroll.net : ''}</strong> ({this.inWords(parseInt(payroll !== null ? payroll.net : ''))})</p>
                  </div>
                </div>
              </div>
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

export default Payslips;
