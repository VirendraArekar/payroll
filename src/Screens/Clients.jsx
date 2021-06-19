
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import "../MainPage/antdstyle.css"
import $ from 'jquery';


import {
    CORE,
    API_URL,
    ADMIN_CLIENTS,
    ADMIN_CLIENT_UPDATE,
    ADMIN_CLIENT_EDIT,
    ADMIN_CLIENT_CREATE,
    ADMIN_CLIENT_DELETE,
    ADMIN_CLIENT_SEARCH,
} from '../Contants';

import moment from 'moment';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
       name : '',
       nameError : '',
       email : '',
       emailError : '',
       location  : '',
       locationError : '',
       address : '',
       addressError : '',
       phone : '',
       phoneError : '',

       editname : '',
       editnameError : '',
       editemail : '',
       editemailError : '',
       editlocation  : '',
       editlocationError : '',
       editaddress : '',
       editaddressError : '',
       editphone : '',
       editphoneError : '',

       clients : null,
       client : null,

       addId : '',
       deleteId : '',

       alert : false,
       message : '',
       msgType : '',
       exspense : null,

       keyword : ''
        
       
    };
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changePhone = this.changePhone.bind(this);

    this.changeEditName = this.changeEditName.bind(this);
    this.changeEditEmail = this.changeEditEmail.bind(this);
    this.changeEditLocation = this.changeEditLocation.bind(this);
    this.changeEditAddress = this.changeEditAddress.bind(this);
    this.changeEditPhone = this.changeEditPhone.bind(this);
    
    this.loadClients = this.loadClients.bind(this);
    this.AddClient = this.AddClient.bind(this);
    this.editAddId = this.editAddId.bind(this);
    this.editAddDeleteId = this.editAddDeleteId.bind(this);
    this.UpdateClient = this.UpdateClient.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.searchClient = this.searchClient.bind(this);

    this.changeKeyword = this.changeKeyword.bind(this);
  }

  changeName(event){
      this.setState({name : event.target.value});
  }

  changeEmail(event){
    this.setState({email : event.target.value});
  }

  changeLocation(event){
    this.setState({location : event.target.value});
  }

  changePhone(event){
    this.setState({phone : event.target.value});
  }

  changeAddress(event){
    this.setState({address : event.target.value});
  }

  changeEditName(event){
    this.setState({editname : event.target.value});
  }

  changeEditEmail(event){
    this.setState({editemail : event.target.value});
  }

  changeEditLocation(event){
    this.setState({editlocation : event.target.value});
  }

  changeEditPhone(event){
    this.setState({editphone : event.target.value});
  }

  changeEditAddress(event){
    this.setState({address : event.target.value});
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }

  async editAddId(id){
      this.setState({addId : id});
      var fetchData = await fetch(API_URL + ADMIN_CLIENT_EDIT + id).then(res => res.json());
      if(fetchData.code === 200){
        this.setState({
            client : fetchData.data,
            editname :  fetchData.data.name,
            editlocation :  fetchData.data.location,
            editaddress  : fetchData.data.address,
            editphone : fetchData.data.phone,
            editemail : fetchData.data.email
        });
      }
  }

  editAddDeleteId(id){
      this.setState({deleteId : id});
  }

  async loadClients(){
      var fetchData = await fetch(API_URL+ADMIN_CLIENTS).then(res => res.json());
      if(fetchData.code === 200){
          this.setState({
              clients : fetchData.data,
          });
      }
  }

  componentDidMount(){
      this.loadClients();
  }

  async AddClient(e){
      e.preventDefault()
      const  {name,email,location,phone,address} = this.state;
      var error = false;

      this.setState({
        nameError : '',
        emailError : '',
        phoneError : '',
        locationError : '',
        addressError : ''
      })

       if(name === ''){
        this.setState({nameError : 'Field is required!'});
        error = true;
      }
      else if(name.length < 3){
        this.setState({nameError : 'Name must atleast 3 char long.'});
        error = true;
      }

      if(email === ''){
        this.setState({emailError : 'Field is required!'});
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


      if(address === ''){
        this.setState({addressError : 'Field is required!'});
        error = true;
      }
      else if(address.length < 10){
        this.setState({addressError : 'Address must atleast 10 char long.'});
        error = true;
      }

      if(phone === ''){
        this.setState({phoneError : 'Field is required!'});
        error = true;
      }

      if(error){
          return;
      }

      var data = {
        name : name,
        email : email,
        location : location,
        address : address,
        phone : phone
      }

  
     
     var fetchData = await  fetch(API_URL + ADMIN_CLIENT_CREATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());
   
     if(fetchData.code === 200){
         $('#add_client').modal('hide');
         this.loadClients();
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

  async UpdateClient(e){
      e.preventDefault();
      const  {editname,editemail,editlocation,editaddress,editphone} = this.state;
      var error = false;
      this.setState({
        editnameError : '',
        editemailError : '',
        editlocationError : '',
        editaddressError : '',
        editphoneError : ''
      })

      if(editname === ''){
        this.setState({editnameError : 'Field is required!'});
        error = true;
      }
      else if(editname.length < 3){
        this.setState({editnameError : 'Name must atleast 3 char long.'});
        error = true;
      }

      if(editemail === ''){
        this.setState({editemailError : 'Field is required!'});
        error = true;
      }
     

      if(editlocation === ''){
        this.setState({editlocationError : 'Field is required!'});
        error = true;
      }
      else if(editlocation.length < 3){
        this.setState({editlocationError : 'Location must atleast 3 char long.'});
        error = true;
      }


      if(editaddress === ''){
        this.setState({editaddressError : 'Field is required!'});
        error = true;
      }
      else if(editaddress.length < 10){
        this.setState({editaddressError : 'Address must atleast 10 char long.'});
        error = true;
      }

      if(editphone === ''){
        this.setState({editphoneError : 'Field is required!'});
        error = true;
      }

      if(error){
          return;
      }

      var data = {
        id : this.state.addId,
        name : editname,
        email : editemail,
        location : editlocation,
        address : editaddress,
        phone : editphone
      }
     
     var fetchData = await  fetch(API_URL + ADMIN_CLIENT_UPDATE,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(data)
     }).then(res=>res.json());
   
     if(fetchData.code === 200){
         $('#edit_client').modal('hide');
         this.loadClients();
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

  async deleteClient(e){
      e.preventDefault();
      var fetchData = await fetch(API_URL + ADMIN_CLIENT_DELETE + this.state.deleteId).then(res => res.json());

       if(fetchData.code === 200){
           $('#delete_client').modal('hide');
            this.loadClients();
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

  async searchClient(e){
    e.preventDefault();
    let keyword = document.querySelector('#keyword').value;
    if(keyword === ''){
      keyword = 'none';
    }
    var fetchData = await  fetch(API_URL + ADMIN_CLIENT_SEARCH + keyword).then(res=>res.json());
    if(fetchData.code === 200){
        this.setState({
            clients : fetchData.data
        });
    }
  }


   render() {
    const{data} = this.state
    const columns = [
           
      {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => (            
        <span className="badge badge-dark p-2">{text}</span>
          ), 
        sorter: (a, b) => a.name.length - b.name.length,
      },     
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
      },     
      {
        title: 'Location',
        dataIndex: 'location',
        render: (text, record) => ( 
            <span className="badge badge-info p-2"><span className="fa fa-location-arrow"></span>&nbsp;{text}</span>
        ),
        sorter: (a, b) => a.location.length - b.location.length,
      },  
      {
        title: 'Phone',
        dataIndex: 'phone',
        render: (text, record) => ( 
            <span>{text}</span>
        ),
        sorter: (a, b) => a.phone.length - b.phone.length,
      },  
      {
        title: 'Address',
        dataIndex: 'address',
        render: (text, record) => (
        <span className="badge badge-secondary p-2"><span className="fa fa-map-marker"></span>&nbsp;{text.length > 20 ? text.substr(0,20)+'...' : text}</span>
          ),
        sorter: (a, b) => a.address.length - b.address.length,
      },

      {
        title: 'Action',
        render: (text, record) => (
            <div className="dropdown dropdown-action text-right">
                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                      <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_client" onClick={() => this.editAddId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_client" onClick={() => this.editAddDeleteId(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                      </div>
            </div>
          ),
      },
    ]

    const {name,email,phone,location,address,editname,editemail,editphone,editlocation,editaddress,nameError,emailError,phoneError,locationError,addressError,editnameError,editemailError,editphoneError,editlocationError,editaddressError,alert, message, msgType, clients, client, keyword} = this.state;
      return ( 
        <div className="main-wrapper">  
          <Header/> 
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Clients - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Clients</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Clients</li>
                </ul>
              </div>
              <div className="col-auto float-right ml-auto">
                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_client"><i className="fa fa-plus" />&nbsp;Add Client</a>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">

            <div className="col-sm-12 col-md-7 col-lg-7 col-xl-8 col-12">  
              
            </div>

            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
              <div className="form-group form-focus">
                <input type="text" className="form-control floating"  id="keyword" value={keyword} onChange={this.changeKeyword}/>
                <label className="focus-label">Client Name</label>
              </div>
            </div>
            
            <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2 col-12">  
              <a href="#" className="btn btn-success btn-block" onClick={this.searchClient}> Search </a>  
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
                   clients !== null &&
                   <Table className="table-striped"
                    pagination= { {total : clients.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={clients}
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
        <div id="add_client" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Client</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Client Name<span className="text-danger">*</span></label>
                        <input className="form-control" value={name} onChange={this.changeName} type="text" />
                        {
                            nameError &&
                            <p className="text-danger">{nameError}</p>
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email<span className="text-danger">*</span></label>
                        <input className="form-control"  value={email} onChange={this.changeEmail} type="text" />
                        {
                            emailError &&
                            <p className="text-danger">{emailError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Location<span className="text-danger">*</span></label>
                            <input className="form-control" value={location} type="text" onChange={this.changeLocation} />
                            {
                                locationError &&
                                <p className="text-danger">{locationError}</p>
                            }
 
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Phone<span className="text-danger">*</span></label>
                        <input  className="form-control" type="text" value={phone} onChange={this.changePhone}/>

                        {
                            phoneError &&
                            <p className="text-danger">{phoneError}</p>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address<span className="text-danger">*</span></label>
                        <textarea name="address" className="form-control" onChange={this.changeAddress}>
                           {address}
                        </textarea>
                        {
                            addressError &&
                            <p className="text-danger">{addressError}</p>
                        }
                      </div>
                    </div>
                  </div>
                
                  <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.AddClient}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add Expense Modal */}
        {/* Edit Expense Modal */}
        <div id="edit_client" className="modal custom-modal fade" role="dialog">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Client</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                {client !== null && 
                <form>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Client Name<span className="text-danger">*</span></label>
                        <input className="form-control" value={editname} onChange={this.changeEditName} type="text" />
                        {
                            editnameError &&
                            <p className="text-danger">{editnameError}</p>
                        }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Email<span className="text-danger">*</span></label>
                        <input className="form-control"  value={editemail} onChange={this.changeEditEmail} type="text" />
                        {
                            editemailError &&
                            <p className="text-danger">{editemailError}</p>
                        }
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Location<span className="text-danger">*</span></label>
                            <input className="form-control" value={editlocation} type="text"  onChange={this.changeEditLocation}/>
                            {
                                editlocationError &&
                                <p className="text-danger">{editlocationError}</p>
                            }
                        </div>
                     
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Phone<span className="text-danger">*</span></label>
                        <input  className="form-control" type="text" value={editphone} onChange={this.changeEditPhone}/>
                        {
                            editphoneError &&
                            <p className="text-danger">{editphoneError}</p>
                        }
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                        <label>Address<span className="text-danger">*</span></label>
                        <textarea name="address" className="form-control" onChange={this.changeEditAddress}>
                            {editaddress}
                        </textarea>
                        {
                            editaddressError &&
                            <p className="text-danger">{editaddressError}</p>
                        }
                        </div>
                    </div>
                    </div>
                
                    <div className="submit-section">
                    <button className="btn btn-primary submit-btn" onClick={this.UpdateClient}>Submit</button>
                    </div>
                </form>
                }
              </div>
            </div>
          </div>
        </div>
        {/* /Edit Expense Modal */}
        {/* Delete Expense Modal */}
        <div className="modal custom-modal fade" id="delete_client" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="form-header">
                  <h3>Delete Client</h3>
                  <p>Are you sure want to delete?</p>
                </div>
                <div className="modal-btn delete-action">
                  <div className="row">
                    <div className="col-6">
                      <a href="" className="btn btn-primary continue-btn" onClick={this.deleteClient}>Delete</a>
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

export default Clients;
