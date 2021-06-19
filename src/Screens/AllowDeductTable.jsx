import React,{useEffect, useState} from 'react'
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import { Helmet } from "react-helmet";
import {
  API_URL, 
  ADMIN_LOAD_PAYROLL_SETTING,
  ADMIN_EDIT_ALLOWANCE_SETTING,
  ADMIN_EDIT_DEDUCT_SETTING,
  ADMIN_DELETE_ALLOWANCE_SETTING,
  ADMIN_DELETE_DEDUCT_SETTING,
  ADMIN_ADD_PAYROLL_ALLOWANCE_SETTING,
  ADMIN_ADD_PAYROLL_DEDUCT_SETTING,
  ADMIN_UPDATE_PAYROLL_ALLOWANCE,
  ADMIN_UPDATE_PAYROLL_DEDUCT
} from '../Contants';

const AllowDeductTable = (props) => {
  const [allowance, setAllowance] = useState([]);
  const [deduction, setDeduction] = useState([]);
  const [editAlId, setEditAlId] = useState('');
  const [deleteAlId, setDeleteAlId] = useState('');
  const [editDedId, setEditDedId] = useState('');
  const [deleteDedId, setDeleteDedId] = useState('');
  const [al, setAl] = useState('');
  const [alAmount, setAlAmount] = useState('');
  const [ded, setDed] = useState('');
  const [dedAmount, setDedAmount] = useState('');
  const [editalAmount, setEditAlAmount] = useState('');
  const [editdedAmount, setEditDedAmount] = useState('');
  const [edital , setEditAl] = useState({});
  const [editded , setEditDed] = useState({});
  const [alert , setAlert] = useState(false);
  const [message , setMessage] = useState('');
  const [msgType , setMsgType] = useState('');
  const [alError, setAlError] = useState('');
  const [alAmountError, setAlAmountError] = useState('');
  const [editalError, setEditAlError] = useState('');
  const [editalAmountError, setEditAlAMountError] = useState('');
  const [dedError, setDedError] = useState('');
  const [dedAmountError, setDedAmountError] = useState('');
  const [editdedError, setEditDedError] = useState('');
  const [editdedAmountError, setEditDedAmountError] = useState('');
  
  const loadTables = async () =>{
    var data = await fetch(API_URL+ ADMIN_LOAD_PAYROLL_SETTING).then(res => res.json());
    if(data.success){
      setAllowance(data.data.allowances);
      setDeduction(data.data.deduction);
    }
  }

  const fetchEditAlData = async (id) => {
    setEditAlId(id);
    console.log(id);
    var data = await fetch(API_URL+ ADMIN_EDIT_ALLOWANCE_SETTING + id).then(res => res.json());
    if(data.success){
      setEditAl(data.data.name);
      setEditAlAmount(data.data.amount);
      $('#edit-al').modal('show');
    }
  }

  const fetchEditDedData = async (id) => {
    setEditDedId(id);
    var data = await fetch(API_URL + ADMIN_EDIT_DEDUCT_SETTING + id).then(res => res.json());
    if(data.success){
      setEditDed(data.data.name);
      setEditDedAmount(data.data.amount);
      $('#edit-ded').modal('show');
    }
  }

  const deleteAl = async (e) => {
    e.preventDefault();
    var data = await fetch(API_URL +ADMIN_DELETE_ALLOWANCE_SETTING + deleteAlId).then(res => res.json());
    $('#delete-al').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Delete allowance failed');
      setMsgType('danger');
    }
  }

  const deleteDed = async (e) => {
    e.preventDefault();
    var data = await fetch(API_URL +  ADMIN_DELETE_DEDUCT_SETTING + deleteDedId).then(res => res.json());
    $('#delete-ded').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Delete deduction failed');
      setMsgType('danger');
    }
  }

  const AddAl = async() => {
    var error = false;
    setAlert(false);
    setMessage('');
    setMsgType('');

    if(al === ''){
      setAlError('Field is required!');
      error = true;
    }
    if(alAmount === ''){
      setAlAmountError('Field is required!');
      error = true;
    }
    if(error){
      return;
    }

    var params = {
      name : al,
      amount : alAmount
    }

    var data = await fetch(API_URL + ADMIN_ADD_PAYROLL_ALLOWANCE_SETTING,{
         method : 'post',
         headers:{'content-type': 'application/json'},
         body : JSON.stringify(params)
     }).then(res=> res.json());
     $('#add-al').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Add allowance failed');
      setMsgType('danger');
    }

  }

  const AddDed = async() => {
    var error = false;
    setAlert(false);
    setMessage('');
    setMsgType('');
    if(ded === ''){
      setDedError('Field is required!');
      error = true;
    }
    if(dedAmount === ''){
      setDedAmountError('Field is required!');
      error = true;
    }
    if(error){
      return;
    }

    var params = {
      name : ded,
      amount : dedAmount
    }

    var data = await fetch(API_URL + ADMIN_ADD_PAYROLL_DEDUCT_SETTING,{
      method : 'post',
      headers:{'content-type': 'application/json'},
      body : JSON.stringify(params)
  }).then(res=> res.json());
  $('#add-ded').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Add allowance failed');
      setMsgType('danger');
    }

  }

  const updateAllow = async() => {
    var error = false;
    setAlert(false);
    setMessage('');
    setMsgType('');
    if(edital === ''){
      setEditAlError('Field is required!');
      error = true;
    }
    if(editalAmount === ''){
      setEditAlAMountError('Field is required!');
      error = true;
    }
    if(error){
      return;
    }

    var params = {
      id : editAlId,
      name : edital,
      amount : editalAmount
    }

    var data = await fetch(API_URL + ADMIN_UPDATE_PAYROLL_ALLOWANCE,{
      method : 'post',
      headers:{'content-type': 'application/json'},
      body : JSON.stringify(params)
  }).then(res=> res.json());
  $('#edit-al').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Edit allowance failed');
      setMsgType('danger');
    }

  }


  const updateDeduct = async() => {
    var error = false;
    setAlert(false);
    setMessage('');
    setMsgType('');
    if(editded === ''){
      setEditDedError('Field is required!');
      error = true;
    }
    if(editdedAmount === ''){
      setEditDedAmountError('Field is required!');
      error = true;
    }
    if(error){
      return;
    }

    var params = {
      id : editDedId,
      name : editded,
      amount : editdedAmount
    }

    var data = await fetch(API_URL + ADMIN_UPDATE_PAYROLL_DEDUCT,{
      method : 'post',
      headers:{'content-type': 'application/json'},
      body : JSON.stringify(params)
   }).then(res=> res.json());
   $('#edit-ded').modal('hide');
    if(data.success){
      loadTables();
      setAlert(true);
      setMessage(data.message);
      setMsgType('success');
    }
    else{
      setAlert(true);
      setMessage('Edit Deduction failed');
      setMsgType('danger');
    }

  }



  useEffect(() =>{
    loadTables();
  },[])
  return(
    <div className="main-wrapper">  
     <Header/> 
      <div>  
       <div className="page-wrapper">
        <Helmet>
            <title>Payroll List - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Payroll</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                  <li className="breadcrumb-item active">Allowance and Deduction table setup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {
          alert &&
          <div className={"alert m-3 alert-dismissible fade show alert-"+msgType} role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xl-6 col-6">
            <div className="text-center"><span style={{fontSize : 20, fontWeight : 'bold'}}>Allowance Table</span>
              <button className="btn btn-custom btn-sm float-right mb-3" data-toggle="modal" data-target="#add-al"><span className="fa fa-plus"></span>&nbsp;Add</button>
            </div>
            <table className="table table-bordered table-striped text-center m-3">
              <thead>
                <tr>
                  <th>Allowance type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                allowance.map((item,index) => (
                  <tr key={index}>
                   <td>{item.name}</td>
                   <td>{item.amount}</td>
                   <td>
                     <button className="btn btn-secondary btn-sm" onClick={() => fetchEditAlData(item.id)}><i className="fa fa-pencil"></i></button>&nbsp;
                     <button className="btn btn-danger btn-sm" onClick={() => setDeleteAlId(item.id)} data-toggle="modal" data-target="#delete-al"><i className="fa fa-trash"></i></button>
                   </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
          <div className="col-md-6 col-sm-12 col-xl-6 col-6">
            <div className="text-center"><span style={{fontSize : 20, fontWeight : 'bold'}}>Deduction Table</span>
            <button className="btn btn-custom btn-sm float-right mb-3" data-toggle="modal" data-target="#add-ded"><span className="fa fa-plus"></span>&nbsp;Add</button></div>
            <table className="table table-bordered table-striped text-center ml-3 mr-5 mt-3 mb-3">
              <thead>
                <tr>
                  <th>Deduction type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {
                deduction.map((item,index) => (
                  <tr key={index}>
                   <td>{item.name}</td>
                   <td>{item.amount}</td>
                   <td>
                     <button className="btn btn-secondary btn-sm" onClick={() => fetchEditDedData(item.id)}><i className="fa fa-pencil"></i></button>&nbsp;
                     <button className="btn btn-danger btn-sm" onClick={() => setDeleteDedId(item.id)} data-toggle="modal" data-target="#delete-ded"><i className="fa fa-trash"></i></button>
                   </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
        </div>
       </div>
       {/* Add Allowance */}
       <div className="modal fade" id="add-al" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Allowance</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="text" className="form-control" value={al} onChange={(e) => setAl(e.target.value)} placeholder="Allowance Type"/>
                    {
                      alError !== '' &&
                      <p className="text-danger p-1">{alError}</p>
                    }
                  </div>
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="number" className="form-control" value={alAmount} onChange={(e) => setAlAmount(e.target.value)}  placeholder="Amount"/>
                    {
                      alAmountError !== '' &&
                      <p className="text-danger p-1">{alAmountError}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => AddAl()}>Save</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       {/* Add Aallowance */}
       {/* Edit Allowance */}
       <div className="modal fade" id="edit-al" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Allowance</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="text" className="form-control" value={edital} onChange={(e) => setEditAl(e.target.value)} placeholder="Allowance Type"/>
                    {
                      editalError !== '' &&
                      <p className="text-danger p-1">{editalError}</p>
                    }
                  </div>
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="number" className="form-control" value={editalAmount} onChange={(e) => setEditAlAmount(e.target.value)}  placeholder="Amount"/>
                    {
                      editalAmountError !== '' &&
                      <p className="text-danger p-1">{editalAmountError}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => updateAllow()}>Save</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       {/* Edit Aallowance */}
       {/* Add Deduction */}
       <div className="modal fade" id="add-ded" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add Deduction</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="text" className="form-control" value={ded} onChange={(e) => setDed(e.target.value)} placeholder="Deduction Type"/>
                    {
                      dedError !== '' &&
                      <p className="text-danger p-1">{dedError}</p>
                    }
                  </div>
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="number" className="form-control" value={dedAmount} onChange={(e) => setDedAmount(e.target.value)}  placeholder="Amount"/>
                    {
                      dedAmountError !== '' &&
                      <p className="text-danger p-1">{dedAmountError}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => AddDed()}>Save</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       {/* Add Deduction */}
       {/* Edit Deduction */}
       <div className="modal fade" id="edit-ded" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Deduction</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="text" className="form-control" value={editded} onChange={(e) => setEditDed(e.target.value)} placeholder="Allowance Type"/>
                    {
                      editdedError !== '' &&
                      <p className="text-danger p-1">{editdedError}</p>
                    }
                  </div>
                  <div className="col-md-6 col-sm-12 col-6">
                    <input type="number" className="form-control" value={editdedAmount} onChange={(e) => setEditDedAmount(e.target.value)}  placeholder="Amount"/>
                    {
                      editdedAmountError !== '' &&
                      <p className="text-danger p-1">{editdedAmountError}</p>
                    }
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => updateDeduct()}>Save</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       {/* Edit Deduction */}
       {/* Delete Employee Modal */}
       <div className="modal custom-modal fade" id="delete-al" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Allowance</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="" className="btn btn-primary continue-btn" onClick={(e) => deleteAl(e)}>Delete</a>
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
         {/* /Delete Employee Modal */}
         {/* Delete Employee Modal */}
         <div className="modal custom-modal fade" id="delete-ded" role="dialog">
           <div className="modal-dialog modal-dialog-centered">
             <div className="modal-content">
               <div className="modal-body">
                 <div className="form-header">
                   <h3>Delete Deduction</h3>
                   <p>Are you sure want to delete?</p>
                 </div>
                 <div className="modal-btn delete-action">
                   <div className="row">
                     <div className="col-6">
                       <a href="" className="btn btn-primary continue-btn" onClick={(e) => deleteDed(e)}>Delete</a>
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
         {/* /Delete Employee Modal */}
      </div>
     <SidebarContent />
    </div>
  )
}

export default AllowDeductTable;