
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import { Avatar_04, Avatar_03,PlaceHolder} from "../Entryfile/imagepath"
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import $ from 'jquery';


import {
    CORE,
    API_URL,
    ADMIN_EXSPENSES,
    ADMIN_EXSPENSE_UPDATE,
    ADMIN_EXSPENSE_EDIT,
    ADMIN_EXSPENSE_CREATE,
    ADMIN_EXSPENSE_DELETE,
    ADMIN_EXSPENSE_SEARCH,
    ADMIN_EXSPENSE_STATUS_CHANGE
} from '../Contants';
import moment from 'moment';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
       item : '',
       itemError : '',
       purchase_from : '',
       purchaseFromError : '',
       purchase_date  : '',
       purchaseDateError : '',
       purchase_by : '',
       purchaseByError : '',
       paid_by : '',
       paidByError : '',
       status : '',
       statusError : '',
       amount : '',
       amountError : '',

       edititem : '',
       edititemError : '',
       editpurchase_from : '',
       editpurchaseFromError : '',
       editpurchase_date  : '',
       editpurchaseDateError : '',
       editpurchase_by : '',
       editpurchaseByError : '',
       editpaid_by : '',
       editpaidByError : '',
       editstatus : '',
       editstatusError : '',
       editamount : '',
       editamountError : '',

       exspenses : null,
       emps : null,

       addId : '',
       deleteId : '',

       alert : false,
       message : '',
       msgType : '',
       exspense : null ,
       imgView : null,
       photo : null,
       images : null,
       imagesView : null


    };
    this.changeAmount = this.changeAmount.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changePaidBy = this.changePaidBy.bind(this);
    this.changePurchaseBy = this.changePurchaseBy.bind(this);
    this.changePurchaseDate = this.changePurchaseDate.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeStatusAdd = this.changeStatusAdd.bind(this);
    this.changePurchaseFrom = this.changePurchaseFrom.bind(this);

    this.changeEditAmount = this.changeEditAmount.bind(this);
    this.changeEditItem = this.changeEditItem.bind(this);
    this.changeEditPaidBy = this.changeEditPaidBy.bind(this);
    this.changeEditPurchaseBy = this.changeEditPurchaseBy.bind(this);
    this.changeEditPurchaseDate = this.changeEditPurchaseDate.bind(this);
    this.changeEditStatus = this.changeEditStatus.bind(this);
    this.changeEditPurchaseFrom = this.changeEditPurchaseFrom.bind(this);

    this.loadExspenses = this.loadExspenses.bind(this);
    this.AddExpense = this.AddExpense.bind(this);
    this.editAddId = this.editAddId.bind(this);
    this.editAddDeleteId = this.editAddDeleteId.bind(this);
    this.UpdateExspense = this.UpdateExspense.bind(this);
    this.deleteExspense = this.deleteExspense.bind(this);
    this.searchExspense = this.searchExspense.bind(this);

    this.clickImage = this.clickImage.bind(this);
    this.removeImg = this.removeImg.bind(this);
    this.clickEditImage = this.clickEditImage.bind(this);
    this.removeImages = this.removeImages.bind(this);
  }

  clickImage(e){
    this.setState({
      photo : e.target.files[0],
      imgView : URL.createObjectURL(e.target.files[0])
    });
  }

  removeImg(ind){
    // let {imgView,images} = this.state;
    // imgView.splice(ind, 1);
    // images.splice(ind, 1)
    // this.setState({
    //   imgView : imgView,
    //   images : images,
    // })

    this.setState({
      photo : null,
      imgView : null
    })
  }

  clickEditImage(e){
    this.setState({
      images : e.target.files[0],
      imagesView : URL.createObjectURL(e.target.files[0])
    });
  }

  removeImages(ind){

    this.setState({
      images : null,
      imagesView : null
    })
  }

  changeAmount(event){
      this.setState({amount : event.target.value});
  }

  changeItem(event){
    this.setState({item : event.target.value});
  }

  changePaidBy(event){
    this.setState({paid_by : event.target.value});
  }

  changePurchaseBy(event){
    this.setState({purchase_by : event.target.value});
  }

  changePurchaseDate(event){
    this.setState({purchase_date : event.target.value});
  }

  changeStatusAdd(event){
    this.setState({status : event.target.value});
  }

  changePurchaseFrom(event){
    this.setState({purchase_from : event.target.value});
  }

  //   Edit
  changeEditAmount(event){
      this.setState({editamount : event.target.value});
  }

  changeEditItem(event){
    this.setState({edititem : event.target.value});
  }

  changeEditPaidBy(event){
    this.setState({editpaid_by : event.target.value});
  }

  changeEditPurchaseBy(event){
    this.setState({editpurchase_by : event.target.value});
  }

  changeEditPurchaseDate(event){
    this.setState({editpurchase_date : event.target.value});
  }

  changeEditStatus(event){
    this.setState({editstatus : event.target.value});
  }

  changeEditPurchaseFrom(event){
    this.setState({editpurchase_from : event.target.value});
  }

  async editAddId(id){
      this.setState({addId : id});
      var fetchData = await fetch(API_URL + ADMIN_EXSPENSE_EDIT + id).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
            exspense : fetchData.data,
            edititem :  fetchData.data.item,
            editpurchase_from :  fetchData.data.purchase_from,
            editpurchase_date  : fetchData.data.purchase_date,
            editpurchase_by : fetchData.data.emp_id,
            editpaid_by : fetchData.data.paid_by,
            editstatus : fetchData.data.status,
            editamount : fetchData.data.amount,
            imagesView : fetchData.data.images !== ''  && fetchData.data.images !== null ? CORE+'uploads/exspenses/'+fetchData.data.images : null,
        });
      }
  }

  editAddDeleteId(id){
      this.setState({deleteId : id});
  }

  async loadExspenses(){
      var fetchData = await fetch(API_URL+ADMIN_EXSPENSES).then(res => res.json());
      if(fetchData.code === 200){
          this.setState({
              exspenses : fetchData.data['exspenses'],
              emps : fetchData.data['emps']
            })
      }

  }

  componentDidMount(){
      this.loadExspenses();
  }

  async AddExpense(e){
      e.preventDefault()
      const  {item,purchase_from,amount,purchase_by,paid_by,status} = this.state;
      var error = false;
      var purchase_date = document.querySelector('#pdate').value;
      this.setState({
        itemError : '',
        purchaseFromError : '',
        purchaseDateError : '',
        purchaseByError : '',
        paidByError : '',
        statusError : '',
        amountError : ''
      })
      if(item === ''){
        this.setState({itemError : 'Field is required!'});
        error = true;
      }
      else if(item.length < 3){
        this.setState({itemError : 'Item must atleast 3 char long.'});
        error = true;
      }

      if(purchase_from === ''){
        this.setState({purchaseFromError : 'Field is required!'});
        error = true;
      }
      else if(purchase_from.length < 3){
        this.setState({purchaseFromError : 'Must atleast 3 char long.'});
        error = true;
      }

      if(purchase_date === ''){
        this.setState({purchaseDateError : 'Field is required!'});
        error = true;
      }


      if(amount === ''){
        this.setState({amountError : 'Field is required!'});
        error = true;
      }

      if(purchase_by === ''){
        this.setState({purchaseByError : 'Field is required!'});
        error = true;
      }

      if(paid_by === ''){
        this.setState({paidByError : 'Field is required!'});
        error = true;
      }

      if(status === ''){
        this.setState({statusError : 'Field is required!'});
        error = true;
      }


      if(error){
          return;
      }

      const formData = new FormData();
      formData.append('emp_id', purchase_by);
      formData.append('item' , item);
      formData.append('purchase_from' , purchase_from);
      formData.append('purchase_date' , purchase_date);
      formData.append('paid_by' , paid_by);
      formData.append('amount' , amount);
      formData.append('status' , status);
      formData.append('photo', this.state.photo);


	  	var fetchData = await fetch(
			API_URL+ ADMIN_EXSPENSE_CREATE,
			{
				method: 'POST',
				body: formData,
			}
	  	)
			.then((response) => response.json());
      $('#add_expense').modal('hide');
      if(fetchData.code === 200){
        this.loadExspenses();
        this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
        })
      }
      else{
        this.setState({
          alert : true,
          message : 'Internal error occured',
          msgType : 'danger'
        })
      }


      var data = {
        emp_id : purchase_by,
        item : item,
        purchase_from : purchase_from,
        purchase_date : purchase_date,
        paid_by : paid_by,
        amount : amount,
        status : status
      }

     var fetchData = await  fetch(API_URL + ADMIN_EXSPENSE_CREATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());

     if(fetchData.code === 200){
         $('#add_expense').modal('hide');
         this.loadExspenses();
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

  async UpdateExspense(e){
      e.preventDefault();
      const  {edititem,editpurchase_from,editamount,editpurchase_by,editpaid_by,editstatus} = this.state;
      var error = false;
      var editpurchase_date = document.querySelector('#pdatess').value;
      this.setState({
        edititemError : '',
        editpurchaseFromError : '',
        editpurchaseDateError : '',
        editpurchaseByError : '',
        editpaidByError : '',
        editstatusError : '',
        editamountError : ''
      })
      if(edititem === ''){
        this.setState({edititemError : 'Field is required!'});
        error = true;
      }
      else if(edititem.length < 3){
        this.setState({edititemError : 'Item must atleast 3 char long.'});
        error = true;
      }

      if(editpurchase_from === ''){
        this.setState({editpurchaseFromError : 'Field is required!'});
        error = true;
      }
      else if(editpurchase_from.length < 3){
        this.setState({editpurchaseFromError : 'Must atleast 3 char long.'});
        error = true;
      }

      if(editpurchase_date === ''){
        this.setState({editpurchaseDateError : 'Field is required!'});
        error = true;
      }


      if(editamount === ''){
        this.setState({editamountError : 'Field is required!'});
        error = true;
      }

      if(editpurchase_by === ''){
        this.setState({editpurchaseByError : 'Field is required!'});
        error = true;
      }

      if(editpaid_by === ''){
        this.setState({editpaidByError : 'Field is required!'});
        error = true;
      }

      if(editstatus === ''){
        this.setState({editstatusError : 'Field is required!'});
        error = true;
      }

      if(error){
          return;
      }

      const formData = new FormData();
      formData.append('id' , this.state.addId),
      formData.append('emp_id', editpurchase_by);
      formData.append('item' , edititem);
      formData.append('purchase_from' , editpurchase_from);
      formData.append('purchase_date' , editpurchase_date);
      formData.append('paid_by' , editpaid_by);
      formData.append('amount' , editamount);
      formData.append('status' , editstatus);
      formData.append('photo', this.state.images);

	  	var fetchData = await fetch(API_URL+ ADMIN_EXSPENSE_UPDATE,
                        {
                          method: 'POST',
                          body: formData,
                        }
                      )
			.then((response) => response.json());
      $('#edit_expense').modal('hide');
      if(fetchData.code === 200){
        this.loadExspenses();
        this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
        })
      }
      else{
        this.setState({
          alert : true,
          message : 'Internal error occured',
          msgType : 'danger'
        })
      }





      var data = {
        id : this.state.addId,
        emp_id : editpurchase_by,
        item : edititem,
        purchase_from : editpurchase_from,
        purchase_date : editpurchase_date,
        paid_by : editpaid_by,
        amount : editamount,
        status : editstatus
      }

     var fetchData = await  fetch(API_URL + ADMIN_EXSPENSE_UPDATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());

     if(fetchData.code === 200){
         this.loadExspenses();
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

  async deleteExspense(e){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_EXSPENSE_DELETE + this.state.deleteId).then(res => res.json());

       if(fetchData.code === 200){
           $('#delete_exspense').modal('hide');
            this.loadExspenses();
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

  async searchExspense(e){
    e.preventDefault();
    let item = document.querySelector('#itemname').value;
    let purchase_by = document.querySelector('#purchaseby').value;
    let paid_by = document.querySelector('#paidby').value;
    let from_exspense = document.querySelector('#fromexspense').value;
    let to_exspense = document.querySelector('#toexspense').value;

    var data = {
        item : item,
        purchase_by : purchase_by,
        paid_by : paid_by,
        from_exspense : from_exspense,
        to_exspense : to_exspense
    }



    var fetchData = await  fetch(API_URL + ADMIN_EXSPENSE_SEARCH,{
        method : 'post',
        headers:{'content-type': 'application/json'},
        body : JSON.stringify(data)
    }).then(res=>res.json());

    if(fetchData.code === 200){
        this.setState({
            exspenses : fetchData.data
        });
    }
  }

  async changeStatus(event, id){
     var val = event.target.value;
     var data = {
       status : parseInt(val),
       id : id
     }

      var fetchData = await  fetch(API_URL + ADMIN_EXSPENSE_STATUS_CHANGE,{
          method : 'post',
          headers:{'content-type': 'application/json'},
          body : JSON.stringify(data)
      }).then(res=>res.json());

      if(fetchData.code === 200){
          this.loadExspenses();
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
    const{data} = this.state;
    console.log(this.state.exspenses);
    const columns = [

      {
        title: 'Item',
        dataIndex: 'item',
        render: (text, record) => (
        <span className="badge badge-info p-2">{text}</span>
          ),
        sorter: (a, b) => a.item.length - b.item.length,
      },
      {
        title: 'Purchase From',
        dataIndex: 'purchase_from',
        sorter: (a, b) => a.purchase_from.length - b.purchase_from.length,
      },
      {
        title: 'Purchase Date',
        dataIndex: 'purchase_date',
        render: (text, record) => (
            <span className="badge badge-dark p-2">{moment(record.purchase_date).format('DD MMM Y')}</span>
        ),
        sorter: (a, b) => a.purchase_date.length - b.purchase_date.length,
      },
      {
        title: 'Purchased By',
        dataIndex: 'name',
        render: (text, record) => (
            <h2 className="table-avatar">
             <img alt="" src={record.emp.photo !== 'null' ?  `${CORE}uploads/photo/${record.emp.photo}` : 'https://via.placeholder.com/150'} style={{width : 40}} className="circle"/>
              {text} <span style={{fontSize : 14}} className="text-dark">&nbsp;{record.emp.name}</span>
            </h2>
          ),
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        render: (text, record) => (
        <span className="badge badge-info p-2">$ {text}</span>
          ),
        sorter: (a, b) => a.amount.length - b.amount.length,
      },

      {
        title: 'Paid By',
        dataIndex: 'paid_by',
        sorter: (a, b) => a.paid_by.length - b.paid_by.length,
      },

      {
        title: 'Approved Date',
        dataIndex: 'approved_date',
        render: (text, record) => (
            <div>
                {record.status === 2 &&
                    <span className="badge badge-dark p-2">{moment(record.approved_date).format('DD MMM Y')}</span>
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
            <select className="rounded p-2" value={record.status} onChange={(e) => this.changeStatus(e,record.id)}>
                <option value="0" >🧡 Pending</option>
                <option value="1" >💙 Active</option>
                <option value="2" >💚 Approved</option>
            </select>
          ),
        sorter: (a, b) => a.status.length - b.status.length,
      },
      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_expense" onClick={() => this.editAddId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_exspense" onClick={() => this.editAddDeleteId(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
            </div>
          ),
      },
    ]

    const {item,itemError,edititem,edititemError,purchase_by,purchaseByError,editpurchase_by,editpurchaseByError,purchase_date,purchaseDateError,editpurchase_date,editpurchaseDateError, purchase_from, purchaseFromError, editpurchaseFromError,editpurchase_from,paid_by, paidByError, editpaid_by, editpaidByError, status, statusError, editstatus, editstatusError, amount, amountError, editamount, editamountError,emps,exspenses,alert, message, msgType, exspense} = this.state;
      return (
        <div className="main-wrapper">
          <Header/>
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Expenses - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Expenses</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Expenses</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_expense"><i className="fa fa-plus" />&nbsp;Add Expense</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <input type="text" className="form-control floating"  id="itemname"/>
                <label className="focus-label">Item Name</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="form-control floating" id="purchaseby">
                  <option value=""> -- Select -- </option>
                  {
                      emps !== null &&
                      emps.map((item,index) => {
                          return(
                              <option value={item.id} key={index}>{item.name}</option>
                          )
                      })
                  }
                </select>
                <label className="focus-label">Purchased By</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus select-focus">
                <select className="form-control floating" id="paidby">
                  <option value=""> -- Select -- </option>
                  <option value="cash"> Cash </option>
                  <option value="cheque"> Cheque </option>
                </select>
                <label className="focus-label">Paid By</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <div className="cal-icon">
                  <input className="form-control floating" type="text" id="fromexspense"/>
                </div>
                <label className="focus-label">From</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <div className="form-group form-focus">
                <div className="cal-icon">
                  <input className="form-control floating" type="text" id="toexspense"/>
                </div>
                <label className="focus-label">To</label>
              </div>
            </div>
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">
              <a href="#" className="btn btn-success btn-block" onClick={this.searchExspense}> Search </a>
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
                   exspenses !== null &&
                   <Table className="table-striped"
                    pagination= { {total : exspenses.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}
                    // bordered
                    dataSource={exspenses}
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
        <div id="add_expense" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Expense</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Item Name <span className="text-danger">*</span></label>
                        <input className="form-control" value={item} onChange={this.changeItem} type="text" />
                        {
                            itemError &&
                            <p className="text-danger">{itemError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchase From <span className="text-danger">*</span></label>
                        <input className="form-control"  value={purchase_from} onChange={this.changePurchaseFrom} type="text" />
                        {
                            purchaseFromError &&
                            <p className="text-danger">{purchaseFromError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchase Date <span className="text-danger">*</span></label>
                        <div className="cal-icon">
                            <input className="form-control"  id="pdate" type="text"  />
                            {
                                purchaseDateError &&
                                <p className="text-danger">{purchaseDateError}</p>
                            }
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchased By <span className="text-danger">*</span></label>
                        <select className="form-control" value={purchase_by} onChange={this.changePurchaseBy}>
                            <option>Select one</option>
                          {
                              emps !== null &&
                              emps.map((item,index) => {
                                  return(
                                      <option value={item.id} key={index}>{item.name}</option>
                                  )
                              })
                          }
                        </select>
                        {
                            purchaseByError &&
                            <p className="text-danger">{purchaseByError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Amount <span className="text-danger">*</span></label>
                        <input  className="form-control" type="text" value={amount} onChange={this.changeAmount}/>
                        {
                            amountError &&
                            <p className="text-danger">{amountError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Paid By <span className="text-danger">*</span></label>
                        <select className="form-control" value={paid_by} onChange={this.changePaidBy}>
                          <option>Select one</option>
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque</option>
                        </select>
                        {
                            paidByError &&
                            <p className="text-danger">{paidByError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Status <span className="text-danger">*</span></label>
                        <select className="form-control" value={status} onChange={this.changeStatusAdd}>
                          <option>Select one</option>
                          <option value="0">Pending</option>
                          <option value="1">Active</option>
                          <option value="2">Approved</option>
                        </select>
                        {
                            statusError &&
                            <p className="text-danger">{statusError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Attachments</label>
                        <input className="form-control" type="file" onChange={this.clickImage} />
                      </div>
                    </div>
                  </div>
                  <div className="attach-files">
                    <ul>
                      {
                        this.state.imgView !== null &&
                        <li >
                          <img src={this.state.imgView} alt="" />
                          <a href="#" className="fa fa-close file-remove" onClick={(e) => this.removeImg(e)}/>
                        </li>
                      }
                    </ul>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.AddExpense}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Expense Modal */}
        {/* Edit Expense Modal */}
        <div id="edit_expense" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Expense</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {exspense !== null &&
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Item Name <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" value={edititem} onChange={this.changeEditItem}/>
                        {
                            edititemError &&
                            <p className="text-danger">{edititemError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchase From <span className="text-danger">*</span></label>
                        <input className="form-control"  type="text" value={editpurchase_from} onChange={this.changeEditPurchaseFrom}/>
                        {
                            editpurchaseFromError &&
                            <p className="text-danger">{editpurchaseFromError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchase Date <span className="text-danger">*</span></label>
                        <div className="cal-icon"><input className="form-control"  id="pdatess" name="pdatess" type="text" value={editpurchase_date} onChange={this.changeEditPurchaseDate}/></div>
                        {
                            editpurchaseDateError &&
                            <p className="text-danger">{editpurchaseDateError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Purchased By <span className="text-danger">*</span></label>
                        <select className="form-control" value={editpurchase_by} onChange={this.changeEditPurchaseBy}>
                          <option>Select one</option>
                          {
                              emps !== null &&
                              emps.map((item,index) => {
                                  return(
                                      <option value={item.id} key={index}>{item.name}</option>
                                  )
                              })
                          }
                        </select>
                        {
                            editpurchaseByError &&
                            <p className="text-danger">{editpurchaseByError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Amount <span className="text-danger">*</span></label>
                        <input className="form-control" type="text" value={editamount} onChange={this.changeEditAmount}/>
                        {
                            editamountError &&
                            <p className="text-danger">{editamountError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Paid By <span className="text-danger">*</span></label>
                        <select className="form-control" value={editpaid_by} onChange={this.changeEditPaidBy}>
                          <option>Select one</option>
                          <option value="cash">Cash</option>
                          <option value="cheque">Cheque</option>
                        </select>
                        {
                            editpaidByError &&
                            <p className="text-danger">{editpaidByError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Status <span className="text-danger">*</span></label>
                        <select className="form-control" value={editstatus} onChange={this.changeEditStatus}>
                          <option value="0" >Pending</option>
                          <option value="1">Active</option>
                          <option value="2">Approved</option>
                        </select>
                        {
                            editstatusError &&
                            <p className="text-danger">{editstatusError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Attachments</label>
                        <input className="form-control" type="file"
                        onChange={this.clickEditImage}/>
                      </div>
                    </div>
                  </div>
                  <div className="attach-files">
                    <ul>
                      {
                        this.state.imagesView !== null &&
                          <li>
                            <img src={this.state.imagesView} alt="" />
                            <a href="#" className="fa fa-close file-remove"
                            onClick={this.removeImages}/>
                          </li>
                      }
                    </ul>
                  </div>
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.UpdateExspense}>Save</button>
                  </div>
                </form>
                }
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Expense Modal */}
        {/* Delete Expense Modal */}
        <div className="modal custom-modal fade" id="delete_exspense" role="dialog">
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

export default Expenses;
