
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import {API_URL,FRONT_URL,CORE,ADMIN_EMP_PAYROLL_EDIT,ADMIN_EMP_PAYROLL_UPDATE,ADMIN_EMP_PAYSLIP_GENERATE,ADMIN_PAYSLIPS_SEARCH,ADMIN_PAYSLIPS_BULK_GENERATE,ADMIN_EMP_PLASLIP_EDIT,ADMIN_EMP_PAYSLIP_UPDATE,ADMIN_EMP_PAYSLIP_DELETE,ADMIN_PAYSLIP_PAID,ADMIN_PAYSLIP_CHANGE_STATUS,ADMIN_PAYROLL_LIST_SINGLE} from '../Contants';
import moment from 'moment';
import { CSVLink, CSVDownload } from "react-csv";


class Slips extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert : false,
            message : '',
            msgType : '' ,
            payslips : null,
            payslips2 : [],
            basic : 0.00,
            food : 0.00,
            house : 0.00,
            month_al : 0.00,
            medical : 0.00,
            tap : 0.00,
            scp : 0.00,
            net : 0.00,
            other_ded : 0.00,
            days : 0,
            per_day : 0,
            basicearn : 0,

            basicError : '',
            foodError : '',
            houseError : '',
            month_alError : '',
            medicalError : '',
            tapError : '',
            scpError : '',
            netError : '',
            other_dedError : '',
            basicearnError : '',
            daysError : '',
            exspense : '',
            allowance : '',
            exspenses : '',
            allowances : '',
            add : '',
            deduct : '',
            contribution : '',

            foreigner : '',
            emp_id :'',

            name : '',
            editId : '',
            payslipId : '',
            modalemp_name : '',
            modaldateError : '',
            deleteId : '',
            dynamical : [],
            dynamicded : [],
            alsettings : [],
            dedsettings : [],
            emp_data : {}
        };

        this.clickSearch = this.clickSearch.bind(this);
        this.editPayslip = this.editPayslip.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
        this.calculateSalary = this.calculateSalary.bind(this);
        this.getPayroll = this.getPayroll.bind(this);
        this.updatePayslip = this.updatePayslip.bind(this);
        this.clickViewPayroll = this.clickViewPayroll.bind(this);
        this.generatePayslip = this.generatePayslip.bind(this);
        this.generateBulk = this.generateBulk.bind(this);
        this.deletePayslip = this.deletePayslip.bind(this);
        this.clickPaid = this.clickPaid.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleDedChange = this.handleDedChange.bind(this);
        this.addDedClick = this.addDedClick.bind(this);
        this.loadRefresh = this.loadRefresh.bind(this);

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

    async editPayslip(id){
       var fetchData = await fetch(API_URL + ADMIN_EMP_PLASLIP_EDIT + id).then(res => res.json());
       if(fetchData.code === 200){
           var data = fetchData.data;

           this.setState({
               editId : id,
               scp : data.scp,
               tap : data.tap,
               net : data.net,
               name : data.emp.name,
               basic : data.basic,
               foreigner : data.emp.foreigner,
               exspense : data.exspense,
               allowance : data.allowance,
               exspenses : data.exspenses,
               allowances : data.allowances,
               addition : data.addition,
               deduct : data.deduct,
               contribution : data.contribution,
               net_salary : data.net,
               emp_data : data.emp
           });
           if(fetchData.data.add_al !== '' && fetchData.data.add_al  !== null && fetchData.data.add_al && fetchData.data.add_al !== 'null'){
            this.setState({
                dynamical : fetchData.data.add_al
            })
          }
          if(fetchData.data.ded_al !== '' && fetchData.data.ded_al !== null && fetchData.data.ded_al && fetchData.data.ded_al !== 'null'){
            this.setState({
                dynamicded : fetchData.data.ded_al
            })
          }

        //   var alsettings =  this.state.alsettings
        //   const {dynamical} =  this.state;
        //   alsettings.findIndex(function (entry, i) {
        //       for(var j = 0; j < dynamical.length; j++){
        //         if (entry.name == dynamical[j].al_name && entry.amount == dynamical[j].al_value) {
        //             alsettings[i].checked = true;
        //         }
        //       }
        //   });


        //   var dedsettings =  this.state.dedsettings
        //   const {dynamicded } =  this.state;
        //   dedsettings.findIndex(function (entry, i) {
        //       for(var j = 0; j < dynamicded.length; j++){
        //         if (entry.name == dynamicded[j].al_name && entry.amount == dynamicded[j].al_value) {
        //           dedsettings[i].checked = true;
        //         }
        //       }
        //   });
        //   this.setState({
        //     dedsettings: dedsettings,
        //     alsettings : alsettings
        //   })

           $('#edit-payslip').modal('show');
       }
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let dynamical = [...this.state.dynamical];
        dynamical[i] = {...dynamical[i], [name]: value};
        this.setState({ dynamical },(e) =>{
            this.calculateSalary();
        });

    }

    handleDedChange(i, e) {
        const { name, value } = e.target;
    let dynamicded = [...this.state.dynamicded];
    dynamicded[i] = {...dynamicded[i], [name]: value};
    this.setState({ dynamicded },(e) =>{
        this.calculateSalary();
    });
    }

    addClick(e){
        e.preventDefault();
        this.setState(prevState => ({
            dynamical: [...prevState.dynamical, { al_name: "", al_value: "" }]
        }))
    }

    addDedClick(e){
        e.preventDefault();
        this.setState(prevState => ({
            dynamicded: [...prevState.dynamicded, { al_name: "", al_value: "" }]
        }))
    }

    async addAl(e){
        e.preventDefault();
         const { value, disabled } = e.target;
         if(value === undefined){
           return ;
         }
         var alsettings = this.state.alsettings;
         alsettings[value].checked = !disabled;

         await this.setState({alsettings : alsettings});

         await this.setState(prevState => ({
            dynamical: [...prevState.dynamical, { al_name: this.state.alsettings[value].name, al_value: this.state.alsettings[value].amount }],
         }))
        await this.calculateSalary();
    }

    async addDed(e){
        e.preventDefault();
         const { value, disabled } = e.target;
         var dedsettings = this.state.dedsettings;
         dedsettings[value].checked = !disabled;
         await this.setState({dedsettings : dedsettings});

         await this.setState(prevState => ({
            dynamicded: [...prevState.dynamicded, { al_name: this.state.dedsettings[value].name, al_value: this.state.dedsettings[value].amount }],
         }))
        await this.calculateSalary();
    }


    removeClick(i){
        const data = this.state.dynamical[i];
        var alsettings = this.state.alsettings;
        // var index;

        alsettings.findIndex(function (entry, i) {
            if (entry.name == data.al_name && entry.amount == data.al_value) {
                // index = i;
                alsettings[i].checked = false;
                return true;
            }
        });


        this.setState({alsettings : alsettings});


        let dynamical = [...this.state.dynamical];
        dynamical.splice(i, 1);
        this.setState({ dynamical },() => {
          this.calculateSalary();
        });
    }

    removeDedClick(i){
        const data = this.state.dynamicded[i];
        var dedsettings = this.state.dedsettings;
        // var index;

        dedsettings.findIndex(function (entry, i) {
            if (entry.name == data.al_name && entry.amount == data.al_value) {
                // index = i;
                dedsettings[i].checked = false;
                return true;
            }
        });


        this.setState({dedsettings : dedsettings});


        let dynamicded = [...this.state.dynamicded];
        dynamicded.splice(i, 1);
        this.setState({ dynamicded },() => {
          this.calculateSalary();
        });

    }

    createUI(){
    return this.state.dynamical.map((el, i) => (
        <div className="row mt-4" key={i}>
        <div className="col-sm-7 m-0 pr-0">
        <input type="text" className="form-control" name="al_name"  value={el.al_name} onChange={this.handleChange.bind(this, i)}/>
        </div>
        <div className="col-sm-3 pl-1 pr-0">
        <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleChange.bind(this, i)}/>
        </div>
        <div className="col-sm-1 pl-2 pr-3">
        <button className="btn btn-danger btn-sm mt-2" onClick={this.removeClick.bind(this, i)}>
            <span className="fa fa-minus"></span>
        </button>
        </div>
        </div>
    ))
    }

    createDUI(){
        return this.state.dynamicded.map((el, i) => (
        <div className="row mt-4" key={i}>
            <div className="col-sm-7 m-0 pr-0">
            <input type="text" className="form-control" name="al_name" value={el.al_name} onChange={this.handleDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-3 pl-1 pr-0">
            <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-1 pl-2 pr-3">
            <button className="btn btn-danger btn-sm mt-2" onClick={this.removeDedClick.bind(this, i)}>
                <span className="fa fa-minus"></span>
            </button>
            </div>
        </div>
        ))
    }

    async clickDelete(id){
      this.setState({deleteId : id});
      $('#delete_payslip').modal('show');
    }

    async calculateSalary(){
        const {basic, scp, tap, foreigner, exspense, allowance,dynamicded, dynamical} = this.state;

        var addition = 0;
        for(var i = 0; i < dynamical.length ; i++){
          addition += dynamical[i].al_value === '' ? 0 : parseFloat(dynamical[i].al_value);
        }
        let add = parseFloat(basic) + parseFloat(addition) + parseFloat(allowance) ;

        var contribution;
        if(!foreigner){

            var tapval = parseFloat(tap);
            var scpval = parseFloat(scp);

            if(scpval < 17.50){
                scpval = 17.50;
            }


            contribution =  scpval + tapval;
        }
        else{
            contribution = 0;
        }

        var deduct = 0;
        for(var j = 0; j < dynamicded.length ; j++){
            deduct += dynamicded[j].al_value === '' ? 0 : parseFloat(dynamicded[j].al_value);
        }

        // var deduct  =   parseFloat(other_ded);
        var net_salary = parseFloat(add) - (parseFloat(deduct) + parseFloat(contribution) + parseFloat(exspense));

        net_salary = net_salary > 0 ? parseFloat(net_salary).toFixed(2) : 0;
        net_salary === NaN ?  this.setState({net : 0.00}) : this.setState({net : net_salary });
        this.setState({
            addition : add,
            deduct : deduct,
            contribution : contribution
        })
    }

    async loadRefresh(){
        var fetchData = await fetch(API_URL + ADMIN_PAYROLL_LIST_SINGLE).then(res => res.json());
        if(fetchData.code === 200){
          this.setState({
            // alsettings : fetchData.als,
            dedsettings : fetchData.deds
          });
        }

        var als = [];
        const alsettings = fetchData.als;
        for(var i = 0 ; i < alsettings.length ; i++){
           let data = {
             name : alsettings[i].name,
             amount :alsettings[i].amount,
             checked : false
           }

           als.push(data);
        }
        this.setState({ alsettings : als});
    }

    componentDidMount(){
        this.loadRefresh();
    }

    async updatePayslip(e){
        e.preventDefault();
        const {scp,tap,basic,net,other_al, other_ded, house,food,medical,editId, emp_id,foreigner, days, basicearn,contribution, dynamical,dynamicded} = this.state;
        this.setState({
            scpError : '',
            tapError : '',
            basicError : '',
            netError : '',
            // other_alError : '',
            // other_dedError : '',
            // houseError : '',
            // foodError : '',
            // medicalError : '',
            // daysError : '',
            basicearnError : ''
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

        // var data = {
        //     id : editId,
        //     basic : basic,
        //     house : house,
        //     medical : medical,
        //     food : food,
        //     other_al : other_al,
        //     other_ded : other_ded,
        //     scp : scp,
        //     tap : tap,
        //     net :net,
        //     days : days,
        //     addition : addition,
        //     deduct : deduct,
        //     contribution : contribution
        // }

        var deduct = 0;
        for(var j = 0; j < dynamicded.length ; j++){
            deduct += parseFloat(dynamicded[j].al_value)
        }

        var addition = 0;
        for(var i = 0; i < dynamical.length ; i++){
          addition += parseFloat(dynamical[i].al_value)
        }


        let formData = new FormData();
        formData.append('id', editId);
        // formData.append('house', house);
        // formData.append('medical', medical);
        // formData.append('food', food);
        // formData.append('other_al', other_al);
        // formData.append('other_ded', other_ded);
        formData.append('add_al', dynamical);
        formData.append('ded_al', dynamicded);
        formData.append('scp', scp);
        formData.append('tap', tap);
        formData.append('net', net);
        // formData.append('days', days);
        formData.append('addition', addition);
        formData.append('deduct', deduct);
        formData.append('contribution', contribution);

        var data = {
            id : editId,
            add_al : dynamical,
            ded_al : dynamicded,
            scp :scp,
            tap : tap,
            net : net,
            addition : addition,
            deduct : deduct,
            contribution : contribution
        }


        var fetchData = await fetch(API_URL + ADMIN_EMP_PAYSLIP_UPDATE,{
            method : 'post',
            headers:{'content-type': 'application/json'},
            body : JSON.stringify(data)
            // body : formData
          }).then(res => res.json());

          $('#edit-payslip').modal('hide');
          if(fetchData.code === 200){
              this.clickSearch(e);
              this.setState({
              alert : true,
              message : fetchData.message,
              msgType : 'success'
              });
          }
          else{
            tthis.setState({
                alert : true,
                message : fetchData.message,
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

    // active
    async clickSearch(e){
      e.preventDefault();
      let keyword = document.querySelector('#searchpayslip').value;
      if(keyword !== ''){
        var fetchData = await fetch(API_URL + ADMIN_PAYSLIPS_SEARCH + keyword).then(res => res.json());

        if(fetchData.code === 200){
            this.setState({
                payslips : fetchData.data
            });

            var slips = await fetchData.data;
            var data = [];

            for(var i = 0; i < slips.length; i++){
                let params = {
                    ID : slips[i].pay_no,
                    Name : slips[i].emp_name,
                    Post : slips[i].post,
                    is_Foreigner : slips[i].foreigner === 1 ? 'Yes' : 'No',
                    Basic_Salary : slips[i].basic,
                    Exspense_Claim : slips[i].exspense,
                    Allowance_Claim : slips[i].allowance,
                };
                for(var n =  0; n < slips[i].add_al.length; n++){
                   params.[slips[i].add_al[n].al_name] = slips[i].add_al[n].al_value;
                }
                params.Total_Earning = slips[i].addition;
                params.TAP = slips[i].tap;
                params.SCP = slips[i].scp;
                for(var n =  0; n < slips[i].ded_al.length; n++){
                 params.[slips[i].ded_al[n].al_name] = slips[i].ded_al[n].al_value;
              }
                params.Total_Deduction = slips[i].contribution;
                params.Net_Salary = slips[i].net;
                params.is_Paid = slips[i].paid === 1 ? 'Yes' : 'No';

                data.push(params);
             }

            this.setState({
                payslips2 : data
            })



        }
      }
    }

    // active
    async generateBulk(e){
        e.preventDefault();
        this.setState({
            alert : false,
            message : '',
            msgType : ''
        })
        let keyword = document.querySelector('#bulksearch').value;
        if(keyword !== ''){
          var fetchData = await fetch(API_URL + ADMIN_PAYSLIPS_BULK_GENERATE + keyword).then(res => res.json());

          if(fetchData.code === 200){
              this.setState({
                  alert : true,
                  message : fetchData.message,
                  msgType : 'success'
              })
          }
        }
    }

    async deletePayslip(e){
        e.preventDefault();
      let id = this.state.deleteId;
      var fetchData = await fetch(API_URL + ADMIN_EMP_PAYSLIP_DELETE + id).then(res => res.json());

      $('#delete_payslip').modal('hide');
      if(fetchData.code === 200){
        this.clickSearch(e);
          this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
          });
      }
      else{
        tthis.setState({
            alert : true,
            message : fetchData.message,
            msgType : 'danger'
        });
      }
    }

    async clickPaid(e,id){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_PAYSLIP_PAID + id).then(res => res.json());

      if(fetchData.code === 200){
        this.clickSearch(e);
          this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
          });
      }
      else{
        tthis.setState({
            alert : true,
            message : fetchData.message,
            msgType : 'danger'
        });
      }
    }

    async changeStatus(event,id){
        let stat = event.target.value;
        let data = {
            id : id,
            status : stat
        }
        var fetchData = await fetch(API_URL + ADMIN_PAYSLIP_CHANGE_STATUS,{
            method : 'post',
            headers:{'content-type': 'application/json'},
            body : JSON.stringify(data)
        }).then(res => res.json());

        if(fetchData.code === 200){
          this.clickSearch(event);
            this.setState({
            alert : true,
            message : fetchData.message,
            msgType : 'success'
            });
        }
        else{
          tthis.setState({
              alert : true,
              message : fetchData.message,
              msgType : 'danger'
          });
        }
    }

   render() {
          const{alert,msgType,message, payslips,basic,net,house,food,other_al,scp,tap,medical,name,basicError,netError,houseError,foodError,other_alError,scpError,tapError,medicalError,other_ded,other_dedError, foreigner, modalemp_name,modaldateError,basicearnError,basicearn,daysError,days, exspense,allowance,payslips2} = this.state;

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
                                <td className="">Basic Salary(Total)</td>
                                <td className="text-right">{record.basic}</td>
                            </tr>
                            <tr>
                                <td className="">Daily Allowance</td>
                                <td className="text-right">{record.allowance}</td>
                            </tr>
                            {
                                record.add_al !== null &&
                                record.add_al.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="">{item.al_name}</td>
                                            <td className="text-right">{item.al_value}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="bg-dark text-light">
                                <td className="text-center"><strong>Total Earning</strong></td>
                                <td className="text-right"><strong>$
                                 {record.addition}</strong></td>
                            </tr>
                            <tr>
                                <td  colSpan="2" className="text-center"><strong>(-)Deduction</strong></td>
                            </tr>
                            {
                                record.foreigner === 0 &&
                                <tr>
                                    <td className="">TAP</td>
                                    <td className="text-right">{record.tap}</td>
                                </tr>
                            }
                            {
                                record.foreigner === 0 &&
                                <tr>
                                    <td className="">SCP</td>
                                    <td className="text-right">{record.scp}</td>
                                </tr>
                            }
                            <tr>
                                <td className="">Exspenses</td>
                                <td className="text-right">{record.exspense}</td>
                            </tr>
                            {
                                record.ded_al !== null &&
                                record.ded_al.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="">{item.al_name}</td>
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
                            <tr className="text-light" style={{backgroundColor : '#3498DB '}}>
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
                             <span className="badge p-2 badge-primary">No</span>
                         }
                     </div>
                ),
            },
            {
                title: 'Status',
                dataIndex: '',
                render: (text, record) => (
                     <select value={record.status} className=" rounded p-2" onChange={(e) => this.changeStatus(e,record.id)}>
                        <option value="0" >🧡 Pending</option>
                        <option value="1" >💙 Active</option>
                        <option value="2" >💚 Approved</option>
                     </select>
                ),
            },
            {
              title: 'Action',
              render: (text, record) => (
                  <div>
                      <a href={"/admin/payslip/"+record.id} className="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="View payslip" ><span className="fa fa-eye"></span></a>&nbsp;
                      {record.status !== 2 && record.paid === 0 &&
                         <button className="btn btn-info btn-sm" data-toggle="tooltip" data-placement="top" title="edit payslip" onClick={(e) => this.editPayslip(record.id)}><span className="fa fa-pencil" ></span></button>
                      }
                      {
                          record.status !== 2  && record.paid === 0 &&
                          <i>&nbsp;</i>
                      }
                      {
                          record.status !== 2 && record.paid === 0 &&
                          <button className="btn btn-danger btn-sm" data-toggle="tooltip" data-placement="top" title="Delete payslip" onClick={(e) => this.clickDelete(record.id)}><span className="fa fa-trash"></span></button>
                      }{
                          record.status !== 2  && record.paid === 0 &&
                          <i>&nbsp;</i>
                      }
                      {
                          record.paid === 0 &&
                          <button className="btn btn-custom btn-sm" data-toggle="tooltip" data-placement="top" title="Paid the salary" onClick={(e) => this.clickPaid(e,record.id)}><span className="fa fa-money"></span>&nbsp;Paid</button>
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
                    <div className="cal-icon mb-2">
                      <input type="text" className="form-control floating" id="bulksearch" placeholder="Month & Year"/>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                    <a href="#" className="btn btn-success btn-block mb-2" onClick={(e) => this.generateBulk(e)}><i className="fa fa-check-square"></i>&nbsp;Bulk Payment </a>
                  </div>
                </div>
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
                      <div className="cal-icon">
                        <input className="form-control floating" type="text" id="searchpayslip" placeholder="Mont & Year"/>
                      </div>

                  </div>


                  <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
                    <a href="#" className="btn btn-success btn-block" onClick={(e) => this.clickSearch(e)}><i className="fa fa-search"></i>&nbsp;Search</a>
                  </div>
                </div>
                {
                  alert &&
                  <div className={"alert mt-2 alert-dismissible fade show alert-"+msgType} role="alert">
                    {message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                }
                {payslips !== null  && payslips.length > 0 &&
                   <div className="row">
                       <div className="col-md-12 bg-light text-right">
                             <CSVLink data={payslips2} className="btn btn-custom m-2 mt-0">Export to Csv/Excel</CSVLink>
                       </div>
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
              <div className="modal fade" id="edit-payslip" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Payslip</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label>Employee</label>
                                        <input className="form-control" type="text" defaultValue={name} disabled/>
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
                                    {/* {console.log(this.state.allowances)} */}
                                    {/* {this.state.allwances === null &&
                                      console.log(this.state.allowance);
                                    } */}
                                    {/* <div className="form-group">
                                        <label>Allowance Claim</label>
                                        <input className="form-control" type="number" value={this.state.allowance}  disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label>Exspense Claim</label>
                                        <input className="form-control" type="number" value={this.state.exspense}  disabled/>
                                    </div> */}
                                    {/* {console.log(this.state.allowances)} */}
                                    <h4>Earning</h4>
                                    {this.state.allowances !== null &&
                                     this.state.allowances.length > 0 &&
                                     <div>
                                         <h5 className="text-center my-1">Allowances</h5>
                                            <table className="table table-bordered tables-striped table-sm">
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
                                                {this.state.allowances !== null &&
                                                this.state.allowances.length > 0 &&
                                                this.state.allowances.map((item,index) => (
                                                <tr key={index}>
                                                    <td>{item.op_type}</td>
                                                    <td>{item.operation}</td>
                                                    <td>{item.job_no}</td>
                                                    <td className="text-center">${item.bonus}</td>
                                                    <td className="text-center">${item.per_diem}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                     </div>
                                    }
                                    {this.createUI()}
                                   <div className="mt-3">
                                   <button className="btn btn-secondary btn-sm " onClick={this.addClick}><span className="fa fa-plus"></span></button>
                                   {/* <span className="mt-4">&nbsp;<span className="fa fa-arrow-left"></span>&nbsp;add not listed in table</span> */}
                                   </div>
                                </div>
                                <div className="col-sm-6 col-md-6">

                                    <h4 className="">Deductions</h4>
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
                                     {this.state.exspenses !== null &&
                                      this.state.exspenses.length > 0 &&
                                     <div>
                                         <h5 className="text-center my-1">Exspenses</h5>
                                            <table className="table table-bordered tables-striped table-sm">
                                            <thead>
                                                <tr className="text-center">
                                                    <th>Item</th>
                                                    <th>Purchase From</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.exspenses !== null &&
                                                this.state.exspenses.length > 0 &&
                                                this.state.exspenses.map((item,index) => (
                                                <tr key={index}>
                                                    <td>{item.item}</td>
                                                    <td>{item.purchase_from}</td>
                                                    <td className="text-center">${item.amount}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </table>
                                     </div>
                                    }

                                    {this.createDUI()}
                                    <div className="mt-3">
                                   <button className="btn btn-secondary btn-sm " onClick={this.addDedClick}><span className="fa fa-plus"></span></button>
                                   {/* <span className="mt-4">&nbsp;<span className="fa fa-arrow-left"></span>&nbsp;add like day deduction</span> */}
                                   </div>
                                </div>

                                {/* Additional */}
                                {/* <hr className="col-md-12 col-sm-12 text-secondary" />
                                <div className="col-sm-6 col-md-6">
                                  <h4 className="text-center">Allowances</h4>
                                  <table className="table table-bordered table-striped table-sm font-smaller">
                                    <thead>
                                      <tr className="text-center">
                                        <th>Allowance Type</th>
                                        <th>Amount</th>
                                        <th>#</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.alsettings.map((item,index) => (
                                        <tr key={index}>
                                          <td>{item.name}</td>
                                          <td>{item.amount}</td>
                                          <td className="text-center">
                                              {console.log(item.checked )}
                                            {
                                              !item.checked &&
                                              <button disabled={item.checked} className="btn btn-dark btn-sm"  value={index}  onClick={(e) => this.addAl(e)} >+</button>
                                            }
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="col-sm-6 col-md-6">
                                  <h4 className="text-center">Deduction</h4>
                                  <table className="table table-bordered table-striped table-sm font-smaller">
                                    <thead>
                                      <tr className="text-center">
                                        <th>Deduction Type</th>
                                        <th>Amount</th>
                                        <th>#</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.state.dedsettings.map((item,index) => (
                                        <tr key={index}>
                                          <td>{item.name}</td>
                                          <td>{item.amount}</td>
                                          <td className="text-center">
                                            {
                                              !item.checked &&
                                              <button disabled={item.checked} className="btn btn-dark btn-sm" value={index}  onClick={(e) => this.addDed(e)} >+</button>
                                            }

                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div> */}
                                <p className="text-danger font-bold">Balanced Leave - {this.state.emp_data.remain_holiday}</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                             <button type="button" className="btn btn-primary" onClick={this.updatePayslip}>Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
              </div>
              {/* new payslip */}
              {/* Delete modal */}
              <div className="modal custom-modal fade" id="delete_payslip" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-body">
                        <div className="form-header">
                        <h3>Delete Payslip</h3>
                        <p>Are you sure want to delete?</p>
                        </div>
                        <div className="modal-btn delete-action">
                        <div className="row">
                            <div className="col-6">
                            <a href="" className="btn btn-primary continue-btn" onClick={this.deletePayslip}>Delete</a>
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
              {/* Delete  Modal */}
            </div>
            </div>
          <SidebarContent />
        </div>
      );
   }
}

export default Slips;
