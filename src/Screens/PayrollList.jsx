
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import {API_URL,FRONT_URL,CORE,ADMIN_PAYROLL_LISTS,ADMIN_EMP_PAYROLL_EDIT,ADMIN_EMP_PAYROLL_UPDATE,ADMIN_EMP_PAYSLIP_GENERATE,ADMIN_PAYROLL_LIST_SEARCH,PAYROLL_GET_EMPLOYEE,ADMIN_ADD_EMP_PAYROLL,ADMIN_PAYROLL_LIST_SINGLE} from '../Contants';
import moment from 'moment';

class PayrollList extends Component {
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

            addbasic : 0.00,
            addfood : 0.00,
            addhouse : 0.00,
            addmonth_al : 0.00,
            addmedical : 0.00,
            addtap : 0.00,
            addscp : 0.00,
            addnet : 0.00,
            addother_ded : 0.00,

            basicError : '',
            foodError : '',
            houseError : '',
            month_alError : '',
            medicalError : '',
            tapError : '',
            scpError : '',
            netError : '',
            other_dedError : '',

            addbasicError : '',
            addfoodError : '',
            addhouseError : '',
            addmonth_alError : '',
            addmedicalError : '',
            addtapError : '',
            addscpError : '',
            addnetError : '',
            addother_dedError : '',

            foreigner : '',
            addforeigner : true,
            emp_id :'',

            name : '',
            addname : '',
            emps : [],
            editId : '',
            payslipId : '',
            modalemp_name : '',
            modaldateError : '',
            dynamical : [],
            dynamicded : [],
            adddynamical : [],
            adddynamicded : [],
            emp_add_id : '',
            empError : '',
            alsettings : [],
            dedsettings : [],


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
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleDedChange = this.handleDedChange.bind(this);
        this.addDedClick = this.addDedClick.bind(this);
        this.add2Click = this.add2Click.bind(this);
        this.addDed2Click = this.addDed2Click.bind(this);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddDedChange = this.handleAddDedChange.bind(this);
        this.addPayroll = this.addPayroll.bind(this);
        this.addAl = this.addAl.bind(this);
        this.loadRefresh = this.loadRefresh.bind(this);
      }

    async loadPayrolls(){
      var fetchData = await fetch(API_URL+ADMIN_PAYROLL_LISTS).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
          payrolls : fetchData.data,
          emps : fetchData.emps,
          alsettings : fetchData.als,
          dedsettings : fetchData.deds
        });
        // var als = [];
        // const alsettings = fetchData.als;
        // for(var i = 0 ; i < alsettings.length ; i++){
        //    let data = {
        //      name : alsettings[i].name,
        //      amount :alsettings[i].amount,
        //      checked : false
        //    }

        //    als.push(data);
        // }
        // this.setState({ alsettings : als});
        // console.log(als);
      }
    }

    async loadRefresh(){
      var fetchData = await fetch(API_URL + ADMIN_PAYROLL_LIST_SINGLE).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
          alsettings : fetchData.als,
          dedsettings : fetchData.deds
        });

        // var als = [];
        // const alsettings = fetchData.als;
        // for(var i = 0 ; i < alsettings.length ; i++){
        //    let data = {
        //      name : alsettings[i].name,
        //      amount :alsettings[i].amount,
        //      checked : false
        //    }

        //    als.push(data);
        // }
        // this.setState({ alsettings : als});
      }
    }

    async getPayroll(id){
      this.loadRefresh();
      var fetchData = await fetch(API_URL+ADMIN_EMP_PAYROLL_EDIT+id).then(res => res.json());

      if(fetchData.code === 200){
          this.setState({payroll : fetchData.data});
          let payroll = fetchData.data;
          this.setState({
              basic : payroll.basic,
              tap : payroll.tap,
              scp : payroll.scp,
              net : payroll.net,
              name : payroll.emp.name,
              editId : id,
              foreigner : payroll.emp.foreigner,
              emp_id : payroll.emp_id
          });

          if(fetchData.data.add_al !== '' && fetchData.data.add_al  !== null && fetchData.data.add_al){
            this.setState({
                dynamical : fetchData.data.add_al
            })
          }
          if(fetchData.data.ded_al !== '' && fetchData.data.ded_al !== null && fetchData.data.ded_al){
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


        //   this.setState({alsettings : alsettings, dedsettings : dedsettings});

          $('#view-payroll').modal('show');
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

    handleAddChange(i, e) {
      const { name, value } = e.target;
      let adddynamical = [...this.state.adddynamical];
      adddynamical[i] = {...adddynamical[i], [name]: value};
      this.setState({ adddynamical },(e) =>{
        this.calculateAddSalary();
      });

    }

    handleAddDedChange(i, e) {
      const { name, value } = e.target;
      let adddynamicded = [...this.state.adddynamicded];
      adddynamicded[i] = {...adddynamicded[i], [name]: value};
      this.setState({ adddynamicded },(e) =>{
        this.calculateAddSalary();
      });
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

    async addNewAl(e){
      e.preventDefault();
       const { value, disabled } = e.target;
       if(value === undefined){
         return ;
       }
       var alsettings = this.state.alsettings;
       alsettings[value].checked = !disabled;

       await this.setState({alsettings : alsettings});

       await this.setState(prevState => ({
        adddynamical: [...prevState.adddynamical, { al_name: this.state.alsettings[value].name, al_value: this.state.alsettings[value].amount }],
       }))
      await this.calculateSalary();
    }

    async addNewDed(e){
      e.preventDefault();
       const { value, disabled } = e.target;
       var dedsettings = this.state.dedsettings;
       dedsettings[value].checked = !disabled;
       await this.setState({dedsettings : dedsettings});

       await this.setState(prevState => ({
          adddynamicded: [...prevState.adddynamicded, { al_name: this.state.dedsettings[value].name, al_value: this.state.dedsettings[value].amount }],
       }))
      await this.calculateSalary();
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

    add2Click(e){
      e.preventDefault();
      this.setState(prevState => ({
          adddynamical: [...prevState.adddynamical, { al_name: "", al_value: "" }]
      }))
    }

    addDed2Click(e){
        e.preventDefault();
        this.setState(prevState => ({
            adddynamicded: [...prevState.adddynamicded, { al_name: "", al_value: "" }]
        }))
    }

    removeClick(i){
        // const data = this.state.dynamical[i];
        // var alsettings = this.state.alsettings;
        // var index;

        // alsettings.findIndex(function (entry, i) {
        //     if (entry.name == data.al_name && entry.amount == data.al_value) {
        //         index = i;
        //         return true;
        //     }
        // });

        // alsettings[index].checked = false;
        // this.setState({alsettings : alsettings});


        let dynamical = [...this.state.dynamical];
        dynamical.splice(i, 1);
        this.setState({ dynamical },() => {
          this.calculateSalary();
        });
    }

    removeDedClick(i){
        // const data = this.state.dynamicded[i];
        // var dedsettings = this.state.dedsettings;
        // var index;

        // dedsettings.findIndex(function (entry, i) {
        //     if (entry.name == data.al_name && entry.amount == data.al_value) {
        //         index = i;
        //         return true;
        //     }
        // });

        // dedsettings[index].checked = false;
        // this.setState({dedsettings : dedsettings});


        let dynamicded = [...this.state.dynamicded];
        dynamicded.splice(i, 1);
        this.setState({ dynamicded },() => {
          this.calculateSalary();
        });

    }

    removeAddClick(i){
      const data = this.state.adddynamical[i];
        var alsettings = this.state.alsettings;
        var index;

        alsettings.findIndex(function (entry, i) {
            if (entry.name == data.al_name && entry.amount == data.al_value) {
                index = i;
                return true;
            }
        });

        alsettings[index].checked = false;
        this.setState({alsettings : alsettings});


        let adddynamical = [...this.state.adddynamical];
        adddynamical.splice(i, 1);
        this.setState({ adddynamical },() => {
          this.calculateSalary();
        });
    }

    removeAddDedClick(i){

        const data = this.state.adddynamicded[i];
        var dedsettings = this.state.dedsettings;
        var index;

        dedsettings.findIndex(function (entry, i) {
            if (entry.name == data.al_name && entry.amount == data.al_value) {
                index = i;
                return true;
            }
        });

        dedsettings[index].checked = false;
        this.setState({dedsettings : dedsettings});


        let adddynamicded = [...this.state.adddynamicded];
        adddynamicded.splice(i, 1);
        this.setState({ adddynamicded },() => {
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

    createAddUI(){
      return this.state.adddynamical.map((el, i) => (
        <div className="row mt-4" key={i}>
          <div className="col-sm-7 m-0 pr-0">
          <input type="text" className="form-control" name="al_name"  value={el.al_name} onChange={this.handleAddChange.bind(this, i)}/>
          </div>
          <div className="col-sm-3 pl-1 pr-0">
          <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleAddChange.bind(this, i)}/>
          </div>
          <div className="col-sm-1 pl-2 pr-3">
          <button className="btn btn-danger btn-sm mt-2" onClick={this.removeAddClick.bind(this, i)}>
              <span className="fa fa-minus"></span>
          </button>
          </div>
        </div>
      ))
    }

    createAddDUI(){
        return this.state.adddynamicded.map((el, i) => (
          <div className="row mt-4" key={i}>
            <div className="col-sm-7 m-0 pr-0">
            <input type="text" className="form-control" name="al_name" value={el.al_name} onChange={this.handleAddDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-3 pl-1 pr-0">
            <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleAddDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-1 pl-2 pr-3">
            <button className="btn btn-danger btn-sm mt-2" onClick={this.removeAddDedClick.bind(this, i)}>
                <span className="fa fa-minus"></span>
            </button>
            </div>
          </div>
        ))
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
        const {basic,house,food,other_al,medical, scp, tap, foreigner, dynamicded, dynamical} = this.state;

        // var addition  = parseFloat(house) +  parseFloat(food) +  parseFloat(other_al) + parseFloat(medical);
        var addition = 0;
        for(var i = 0; i < dynamical.length ; i++){
          addition += dynamical[i].al_value === '' ? 0 : parseFloat(dynamical[i].al_value);
        }
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
        var other_ded = 0;
        for(var j = 0; j < dynamicded.length ; j++){
          other_ded += dynamicded[j].al_value === '' ? 0 : parseFloat(dynamicded[j].al_value);
        }

        console.log(other_ded);

        var deduct  =   parseFloat(other_ded);
        var net_salary = add - (deduct + contribution);
        net_salary = net_salary < 0 ? 0 : parseFloat(net_salary).toFixed(2);
        this.setState({net : net_salary });
    }

    async calculateAddSalary(){
      const {addbasic, addscp, addtap, addforeigner, adddynamicded, adddynamical} = this.state;
      var addition = 0;
      for(var i = 0; i < adddynamical.length ; i++){
        addition += adddynamical[i].al_value === '' ? 0 : parseFloat(adddynamical[i].al_value);
      }
      // console.log('Addition : '+addition);
      let add = parseFloat(addbasic) + parseFloat(addition);
      // console.log('Add : '+ add);
      var contribution;
      if(!addforeigner){
          var tapval = parseFloat(add * (parseFloat(addtap)/ 100));
          var scpval = parseFloat(add * (parseFloat(addscp)/ 100));

          if(scpval < 17.50){
              scpval = 17.50;
          }


          contribution =  scpval + tapval;
      }
      else{
          contribution = 0;
      }

      // console.log('contribution : '+contribution);
      var other_ded = 0;
      for(var j = 0; j < adddynamicded.length ; j++){
        other_ded += adddynamicded[j].al_value === '' ? 0 : parseFloat(adddynamicded[j].al_value);
      }

      // console.log('other_ded : '+other_ded);
      var deduct  =   parseFloat(other_ded);
      // console.log('deduct : '+deduct);
      var net_salary = add - (deduct + contribution);
      // console.log('net_salary : '+net_salary);
      net_salary = net_salary < 0 ? 0 : parseFloat(net_salary).toFixed(2);
      this.setState({addnet : net_salary });
    }

    componentDidMount(){
      this.loadPayrolls();
    }

    async updatePayroll(e){
        e.preventDefault();
        const {scp,tap,basic,net,other_al, other_ded, house,food,medical,editId, emp_id,foreigner,dynamical, dynamicded} = this.state;
        this.setState({
            scpError : '',
            tapError : '',
            basicError : '',
            netError : '',
            // other_alError : '',
            // other_dedError : '',
            // houseError : '',
            // foodError : '',
            // medicalError : ''
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
            // house : house,
            // medical : medical,
            // food : food,
            // other_al : other_al,
            // other_ded : other_ded,
            add_al : dynamical,
            ded_al : dynamicded,
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

    async addPayroll(e){
      e.preventDefault();
      const {addscp,addtap,addbasic,addnet,emp_add_id,addforeigner,adddynamical, adddynamicded} = this.state;

      this.setState({
          addscpError : '',
          addtapError : '',
          addbasicError : '',
          addnetError : '',
          empError : ''
      });

      var error = false;
      if(emp_add_id === ''){
        this.setState({empError : 'Field is required!'});
        error = true;
      }
      if(addbasic === "0.00" || addbasic === '' || addbasic === 0){
          this.setState({addbasicError : 'Field is required!'});
          error = true;
      }

      if(!addforeigner){
          if(addtap === "0.00" || addtap === '' || addtap === 0){
              this.setState({addtapError : 'Field is required!'});
              error = true;
          }

          if(addscp === "0.00" || addscp === '' || addtap === 0){
              this.setState({addscpError : 'Field is required!'});
              error = true;
          }
      }

      if(addnet === "0.00" || addnet === '' || addnet === 0){
          this.setState({addnetError : 'Field is required!'});
          error = true;
      }

      if(error){
          return;
      }

      var data = {
          basic : addbasic,
          add_al : adddynamical,
          ded_al : adddynamicded,
          scp : addscp,
          tap : addtap,
          emp_id : emp_add_id,
          net :addnet
      }


      var fetchData = await fetch(API_URL + ADMIN_ADD_EMP_PAYROLL,{
          method : 'post',
          headers:{'content-type': 'application/json'},
          body : JSON.stringify(data)
        }).then(res => res.json());
        $('#add_payroll').modal('hide');
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
              message : '403, Adding payroll failed!',
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

        // console.log(data);

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
          const{alert,msgType,message, payrolls,basic,net,house,food,other_al,scp,tap,medical,name,basicError,netError,houseError,foodError,other_alError,scpError,tapError,medicalError,other_ded,other_dedError, foreigner, modalemp_name,modaldateError,    addbasic,addnet,addscp,addtap,addname,addbasicError,addnetError,addscpError,addtapError, addforeigner,emps,empError} = this.state;
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
                      <button className="btn btn-secondary btn-sm" data-toggle="tooltip" data-placement="top" title="Vie or edit payroll" onClick={(e) => this.getPayroll(record.id)}><span className="fa fa-pencil"></span></button>&nbsp;
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
                      <h3 className="page-title">Employee Payroll</h3>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                        <li className="breadcrumb-item active">Payroll</li>
                      </ul>
                    </div>
                    <div className="col-auto float-right ml-auto">
                      <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_payroll"><i className="fa fa-plus" />&nbsp;Add Payroll</a>
                    </div>
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
              <div className="modal fade" id="add_payroll" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Add Payroll</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label>Employee</label>
                                        <select name="employees" className="form-control" onChange={async (e) =>{
                                          const id = e.target.value;
                                          if(id !== ''){
                                            var emp = await fetch(API_URL+PAYROLL_GET_EMPLOYEE+id).then(res => res.json());
                                            console.log(emp);
                                            if(emp.success){
                                               await this.setState({
                                                emp_add_id : id,
                                                addtap :  emp.data.tapper,
                                                addscp :  emp.data.scpper,
                                                addforeigner : emp.data.foreigner
                                                },async () => {
                                                  await this.calculateAddSalary();
                                                })
                                            }
                                          }

                                          }}>
                                          <option value="">Select Employee</option>
                                          {emps.map((item,idx) => (
                                            <option value={item.id} key={idx}>{item.name}</option>
                                          ))}
                                        </select>
                                        {
                                            empError &&
                                            <p className="text-danger mt-1">{empError}</p>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group">
                                        <label>Net Salary</label>
                                        <input className="form-control" type="number" value={addnet}  disabled />
                                        {
                                            addnetError &&
                                            <p className="text-danger mt-1">{addnetError}</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <h4>Earning</h4>
                                    <div className="form-group">
                                        <label>Basic</label>
                                        <input className="form-control" type="number" value={addbasic} onChange={(e) => {
                                                this.setState({addbasic : e.target.value},() => {
                                                    this.calculateAddSalary();
                                                });
                                            }}/>
                                        {
                                            addbasicError &&
                                            <p className="mt-1 text-danger">{addbasicError}</p>
                                        }
                                    </div>

                                      {this.createAddUI()}
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addClick}><span className="fa fa-plus"></span></button>
                                </div>
                                <div className="col-sm-6 col-md-6">
                                    <h4 className="text-primary">Deductions</h4>
                                    {
                                        !addforeigner &&
                                        <div>
                                             <div className="form-group">
                                                <label>TAP(%)</label>
                                                <input className="form-control" type="number"   value={addtap} onChange={(e) => {
                                                    this.setState({addtap : e.target.value},() => {
                                                        this.calculateAddSalary();
                                                    });
                                                    }} />
                                                {
                                                    addtapError &&
                                                    <p className="mt-1 text-danger">{addtapError}</p>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label>SCP(%)</label>
                                                <input className="form-control" type="number" value={addscp} onChange={(e) => {
                                                    this.setState({addscp : e.target.value},() => {
                                                        this.calculateAddSalary();
                                                    });
                                                    }} />
                                                {
                                                    addscpError &&
                                                    <p className="mt-1 text-danger">{addscpError}</p>
                                                }
                                            </div>
                                        </div>
                                    }

                                    {this.createAddDUI()}
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addDedClick}><span className="fa fa-plus"></span></button>
                                </div>
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
                                            {
                                              !item.checked &&
                                              <button disabled={item.checked} className="btn btn-dark btn-sm"  value={index}  onClick={(e) => this.addNewAl(e)} >+</button>
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
                                              <button disabled={item.checked} className="btn btn-dark btn-sm" value={index}  onClick={(e) => this.addNewDed(e)} >+</button>
                                            }

                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                             <button type="button" className="btn btn-primary" onClick={this.addPayroll}>Save</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
              </div>
              {/* add Payslip */}
              <div className="modal fade" id="view-payroll" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Payroll</h5>
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

                                      {this.createUI()}
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addClick}><span className="fa fa-plus"></span></button>
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
                                    {this.createDUI()}
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addDedClick}><span className="fa fa-plus"></span></button>
                                </div>
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
                            <div className="cal-icon">
                                <input className="form-control floating" type="text" id="datepicker" required/>
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

export default PayrollList;
