
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import $ from 'jquery';

import {
  API_URL,
  ADMIN_PERMISSIONS,
  ADMIN_PERMISSION_EDIT,
  ADMIN_PERMISSION_UPDATE
} from '../Contants'

class AuthPermit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      alert : false,
      message : '',
      msgType : '',
      permissions : null
    }
    
    this.loadPermissions = this.loadPermissions.bind(this);
    this.changeChk = this.changeChk.bind(this);
    this.savePermission = this.savePermission.bind(this);
  }

  async loadPermissions(){
    var fetchData = await fetch(API_URL + ADMIN_PERMISSIONS).then(res=>res.json());
    if(fetchData.success){
      this.setState({permissions : fetchData.data});
    }
  }

  componentDidMount(){
     this.loadPermissions();
  }

  changeChk(e){
    e.preventDefault();
    var index = e.target.getAttribute('id').slice(-1);
    var type = e.target.getAttribute('id').substring(0, e.target.getAttribute('id').length - 2);
    var val = e.target.checked;


    var reads = [];
    var read = $("input[name=read]");
    
    var i = 0;
    Object.keys(read).forEach(function(key) {
      if(1 === index && type === 'read'){
        reads.push(val ? 1 : 0);
      }
      else{
        
        reads.push(read[key].checked ? 1 : 0);
      }
      i++;
    });
    

    var writes = [];
    var write = $("input[name=write]");
    var j = 0;
    Object.keys(write).forEach(function(key) {
      if(1 === index && type === 'write'){
        writes.push(val ? 1 : 0);
      }
      else{
        
        writes.push(write[key].checked ? 1 : 0);
      }
      j++;
    });

   

    var creates = [];
    var create = $("input[name=create]");
    var k = 0;
    Object.keys(create).forEach(function(key) {
      if(1 === index && type === 'create'){
        creates.push(val ? 1 : 0);
      }
      else{
        
        creates.push(create[key].checked ? 1 : 0);
      }
      k++;
    });



    var deletes = [];
    var deletem = $("input[name=delete]");
    var l = 0;
    Object.keys(deletem).forEach(function(key) {
      if(1 === index && type === 'delete'){
        deletes.push(val ? 1 : 0);
      }
      else{
        
        deletes.push(deletem[key].checked ? 1 : 0);
      }
      l++;
    });

    var imports = [];
    var importm = $("input[name=import]");
    var m = 0;
    Object.keys(importm).forEach(function(key) {
      if(1 === index && type === 'import'){
        imports.push(val ? 1 : 0);
      }
      else{
        
        imports.push(importm[key].checked ? 1 : 0);
      }
      m++;
    });

    var exportps = [];
    var exportm = $("input[name=export]");
    var n = 0;
    Object.keys(exportm).forEach(function(key) {
      if(1 === index && type === 'export'){
        exportps.push(val ? 1 : 0);
      }
      else{
        
        exportps.push(exportm[key].checked ? 1 : 0);
      }
      n++;
    });

    var modules = [];
    for(var q =0; q < this.state.permissions.length ; q++){
      modules.push(this.state.permissions[q].module);
    }
    var dynamicPer = [];
    for(var p = 0; p < 6 ; p++){
       dynamicPer.push({
         module : modules[p],
         pr_read : reads[p],
         pr_create : creates[p],
         pr_write : writes[p],
         pr_create : creates[p],
         pr_delete : deletes[p],
         pr_import : imports[p],
         pr_export : exportps[p]
       });
    }

    this.setState({permissions : dynamicPer});
  }

  async savePermission(e){
    e.preventDefault();
   
    var addResponse = await fetch(API_URL+ADMIN_PERMISSION_UPDATE, {
      method: 'post',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify({permissions :this.state.permissions})
        }).then(res => {
          return res.json();
        });
      if(addResponse.success){
        this.loadPermissions();
        this.setState({
          alert : true,
          message : addResponse.message,
          msgType : 'success'
        });
      }
      else{
        this.setState({
          alert : true,
          message : addResponse.message,
          msgType : 'danger'
        });
      }
  }
 
   render() {
      const {alert,message,msgType, permissions} = this.state;
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
                <h3 className="page-title">Permissions</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Permissions</li>
                </ul>
              </div>
              {/* <div className="col-auto float-right ml-auto">
                <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_expense"><i className="fa fa-plus" /> Add Expense</a>
              </div> */}
            </div>
          </div>
          {/* /Page Header */}
          {/* Search Filter */}
          <div className="row filter-row">
            
            
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
           <div className="table-responsive p-3 " style={{backgroundColor:  'white'}} >
              
                <div>
                  <table className="table table-striped table-bordered text-center">
                    <thead>
                      <tr>
                        <th>Module Permission</th>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Create</th>
                        <th>Delete</th>
                        <th>Import</th>
                        <th>Export</th>
                      </tr>
                    </thead>
                    <tbody>
                    {permissions !== null &&
                      permissions.map((item,index) => {
                        return(
                        <tr key={index}>
                         <td>{item.module}</td>
                         <td>
                               {
                                 item.pr_read  ?
                                 <input type="checkbox"  id={"read-"+index} name="read" onChange={this.changeChk} checked={true}/>
                                 :
                                 <input type="checkbox"  id={"read-"+index}  name="read" onChange={this.changeChk} checked={false}/>
                               }
                         </td>
                         <td>
                               {item.pr_write ?
                                 <input type="checkbox"  id={"write-"+index} name="write" onChange={this.changeChk} checked/>
                                 :
                                 <input type="checkbox"  id={"write-"+index}  name="write" onChange={this.changeChk}/>
                               }
                         </td>
                         <td>
                               {item.pr_create ?
                                 <input type="checkbox"  id={"create-"+index} name="create" onChange={this.changeChk} checked/>
                                 :
                                 <input type="checkbox"  id={"create-"+index}  name="create" onChange={this.changeChk}/>
                               }
                         </td>
                         <td>
                               {item.pr_delete ?
                                 <input type="checkbox"  id={"delete-"+index} name="delete" onChange={this.changeChk} checked/>
                                 :
                                 <input type="checkbox"  id={"delete-"+index}  name="delete" onChange={this.changeChk}/>
                               }
                         </td>
                         <td>
                               {item.pr_import ?
                                <input type="checkbox"  id={"import-"+index} name="import" onChange={this.changeChk} checked/>
                                :
                                <input type="checkbox"  id={"import-"+index}  name="import" onChange={this.changeChk}/>
                               }
                         </td>
                         <td>
                               {
                                 item.pr_export ?
                                 <input type="checkbox"  id={"export-"+index}  name="export" onChange={this.changeChk} checked/>
                                 :
                                 <input type="checkbox"  id={"export-"+index}  name="export" onChange={this.changeChk}/>
                               }
                         </td>
                       </tr>)
                     })}
                    </tbody>
                  </table>
                  <button className="btn btn-success btn-block" onClick={this.savePermission}>save</button>
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

export default AuthPermit;
