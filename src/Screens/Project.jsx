import React,{useState, useEffect} from 'react';
import { Helmet } from "react-helmet";
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import 'antd/dist/antd.css';
import "../MainPage/antdstyle.css"
import { Table } from 'antd';
import {itemRender,onShowSizeChange} from "../MainPage/paginationfunction"
import $ from 'jquery';
import moment from 'moment';
import {API_URL, ADMIN_LOAD_PROJECTS,ADMIN_PROJECT_ADD,ADMIN_PROJECT_EDIT,ADMIN_PROJECT_UPDATE,ADMIN_PROJECT_DELETE,ADMIN_PROJECT_STATUS_CHANGE} from '../Contants';

const Project = () => {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [nameError, setNameError] = useState('');
	const [descError, setDescError] = useState('');
	const [startError, setStartError] = useState('');
	const [endError, setEndError] = useState('');
	const [editname, setEditName] = useState('');
	const [editdesc, setEditDesc] = useState('');
	const [editstart, setEditStart] = useState('');
	const [editend, setEditEnd] = useState('');
	const [editnameError, setEditNameError] = useState('');
	const [editdescError, setEditDescError] = useState('');
	const [editstartError, setEditStartError] = useState('');
	const [editendError, setEditEndError] = useState('');
	const [editStatus, setEditStatus] = useState('');
	const [projects, setProjects] = useState([]);
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [msgType, setMsgType] = useState('');
	const [editId, setEditId] = useState('');
	const [deleteId, setDeleteId] = useState('');

	const columns = [
        {
          title: 'Project Name',
          dataIndex: 'proj_title',
          render: (text, record) => (            
              <span className="badge badge-info p-2">{text}</span>
            ), 
        },
        {
          title: 'Description',
          dataIndex: 'proj_desc',
          render : (text,record) => (
            <span className="text-secondary">{text}</span>
          ),
        },
        {
          title: 'Start Date',
          dataIndex: 'start_date',
          render : (text,record) => (
            <span className="text-secondary">{moment(text).format('D MMM Y')}</span>
          ),
        },
        {
          title: 'Deadline',
          dataIndex: 'deadline',
          render : (text,record) => (
            <span className="text-secondary">{moment(text).format('D MMM Y')}</span>
          ),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            render: (text, record) => (
               <span className="badge badge-dark p-2">
                 {text} - Days
               </span>
              ),
        },
        {
            title: 'Days Remaining',
            dataIndex: 'duration2',
            render: (text, record) => (
                <span className="badge badge-dark p-2">
                  {text} - Days
                </span>
              ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <select value={record.status} id="status" onChange={(e) => changeStatus(record.id,e.target.value)} className="rounded p-2"> 
                  <option value="0">💜 Current</option>
                  <option value="1">💚 Finished</option>
                  <option value="2">❤️ Stopped</option>
                </select>
              ),
        },
        {
	        title: 'Action',
	        render: (text, record) => (
	            <div className="dropdown dropdown-action text-right">
	                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
	                      <div className="dropdown-menu dropdown-menu-right">
	                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_allowance" onClick={() => AddEditId(record.id)}><i className="fa fa-pencil m-r-5" /> Edit</a>
	                        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_allowance" onClick={() => AddDeleteId(record.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
	                      </div>
	            </div>
	         ),
	    },    
      ]

	const loadProjects = async () =>{
		var data = await fetch(API_URL + ADMIN_LOAD_PROJECTS).then(res => res.json());
		if(data.success){
          setProjects(data.data);
		}
	}
	
    const AddEditId = async (id) =>{
       setEditId(id);
       var data = await fetch(API_URL + ADMIN_PROJECT_EDIT + id).then(res => res.json());
       console.log(data.data);
		if(data.success){
			var res = data.data;
          setEditName(res.proj_title);
          document.querySelector('#editstart_date').value = res.start_date;
          document.querySelector('#editend_date').value = res.deadline;
          setEditDesc(res.proj_desc);
          setEditStatus(res.status);
		}
	  $('#edit_project').modal('show');
    }

    const DeleteProject = async () =>{
       var addResponse = await fetch(API_URL + ADMIN_PROJECT_DELETE + deleteId).then(res => res.json());
		$('#delete_project').modal('hide');
	    if(addResponse.success){
	      loadProjects();
	      setAlert(true);
	      setMessage(addResponse.message);
	      setMsgType('success');
	    }
	    else{
	      setAlert(true);
	      setMessage('Error occur.');
	      setMsgType('danger');
	    }
    }

    const AddDeleteId = async (id) =>{
       setDeleteId(id);
	   $('#delete_project').modal('show');
    }

    const changeStatus = async (id, status) => {
    	var addResponse = await fetch(API_URL + ADMIN_PROJECT_STATUS_CHANGE,{
    		method: 'post',
	        headers:{'content-type': 'application/json'},
	        body: JSON.stringify({id : id,status : status})
    	}).then(res => res.json());
	    if(addResponse.success){
	      loadProjects();
	      setAlert(true);
	      setMessage(addResponse.message);
	      setMsgType('success');
	    }
	    else{
	      setAlert(true);
	      setMessage('Error occur.');
	      setMsgType('danger');
	    }
    }

	useEffect(() => {
		loadProjects();
	}, []);

	const AddProject = async() =>{
      setAlert(false);
      let start_date = document.querySelector('#start_date').value;
      let end_date = document.querySelector('#end_date').value;
      var error = false;
      if(name === ''){
      	setNameError('Field is required!');
      	error = true;
      }
      if(start_date === ''){
      	setStartError('Field is required!');
      	error = true;
      }
      if(end_date === ''){
      	setEndError('Field is required!');
      	error = true;
      }
      if(desc === ''){
      	setDescError('Field is required!');
      	error = true;
      }
      else if(desc.lenght < 10){
      	setDescError('Description must be >= 10 char long.');
      	error = true;
      }

      if(error){
      	return;
      }

      var params = {
      	title : name,
      	start_date : start_date,
      	deadline : end_date,
      	description: desc
      }

      var addResponse = await fetch(API_URL + ADMIN_PROJECT_ADD, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(params)
      }).then(res => {
        return res.json();
      });
	    $('#add_project').modal('hide');
	    if(addResponse.success){
	      loadProjects();
	      setAlert(true);
	      setMessage(addResponse.message);
	      setMsgType('success');
	    }
	    else{
	      setAlert(true);
	      setMessage('Error occur.');
	      setMsgType('danger');
	    }
	}

	const UpdateProject = async() =>{
      setAlert(false);
      let start_date = document.querySelector('#editstart_date').value;
      let end_date = document.querySelector('#editend_date').value;
      var error = false;
      if(editname === ''){
      	setEditNameError('Field is required!');
      	error = true;
      }
      if(start_date === ''){
      	setEditStartError('Field is required!');
      	error = true;
      }
      if(end_date === ''){
      	setEditEndError('Field is required!');
      	error = true;
      }
      if(editdesc === ''){
      	setEditDescError('Field is required!');
      	error = true;
      }
      else if(editdesc.lenght < 10){
      	setEditDescError('Description must be >= 10 char long.');
      	error = true;
      }

      if(error){
      	return;
      }

      var params = {
      	id : editId,
      	title : editname,
      	start_date : start_date,
      	deadline : end_date,
      	description: editdesc
      }

      var addResponse = await fetch(API_URL + ADMIN_PROJECT_UPDATE, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(params)
      }).then(res => {
        return res.json();
      });
	    $('#edit_project').modal('hide');
	    if(addResponse.success){
	      loadProjects();
	      setAlert(true);
	      setMessage(addResponse.message);
	      setMsgType('success');
	    }
	    else{
	      setAlert(true);
	      setMessage('Error occur.');
	      setMsgType('danger');
	    }
	}
	return(
		<div className="main-wrapper">  
          <Header/> 
        <div>
        <div className="page-wrapper">
            <Helmet>
                <title>Daily Allowance - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>					
            </Helmet>
	        {/* Page Content */}
	        <div className="content container-fluid">
	          {/* Page Header */}
	          <div className="page-header">
	            <div className="row align-items-center">
	              <div className="col">
	                <h3 className="page-title">Projects</h3>
	                <ul className="breadcrumb">
	                  <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
	                  <li className="breadcrumb-item active">Projects</li>
	                </ul>
	              </div>
	              <div className="col-auto float-right ml-auto">
	                <a href="#" className="btn btn-custom" data-toggle="modal" data-target="#add_project"><i className="fa fa-plus" />&nbsp;Add Project</a>
	              </div>
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
	         { projects !== null &&
		         <div className="row">
		          <div className="col-md-12" >
		            <div className="table-responsive text-center">
		              {
		                  projects !== null &&
		                  <Table className="table-striped"
		                    pagination= { {total : projects.length,
		                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
		                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
		                    style = {{overflowX : 'auto'}}
		                    columns={columns}                 
		                    dataSource={projects}
		                    rowKey={record => record.id}
		                    // onChange={this.handleTableChange}
		                    />
		              }
		            </div>
		          </div>
		        </div>
		      } 
            </div>
        {/*Add Modal*/}
            <div className="modal fade" id="add_project" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog  modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <div className="mb-4">
		                <input className="form-control floating " type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name"/>
		                {nameError &&
		                	<p className="text-danger">{nameError}</p>
		                }
		            </div>

		            <div className="cal-icon mb-4">
		                <input className="form-control floating " id="start_date" type="text"  placeholder="Start Date" onChange={() => console.log()}/>
		                {startError &&
		                	<p className="text-danger">{startError}</p>
		                }
		            </div>
		            <div className="cal-icon  mb-4">
		                <input className="form-control floating " id="end_date" type="text"  placeholder="Deadline" onChange={() => console.log()}/>
		                {endError &&
		                	<p className="text-danger">{endError}</p>
		                }
		            </div>
		            <div className="mb-4">
		                <textarea className="form-control floating" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description">
		                </textarea>
		                
		                {descError &&
		                	<p className="text-danger">{descError}</p>
		                }
		            </div>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-primary" onClick={AddProject}>Save</button>
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		{/*End Add*/}
	    {/*Edit Modal*/}
            <div className="modal fade" id="edit_project" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div className="modal-dialog  modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <div className="mb-4">
		                <input className="form-control floating " type="text" value={editname} onChange={(e) => setEditName(e.target.value)} placeholder="Project Name"/>
		                {editnameError &&
		                	<p className="text-danger">{editnameError}</p>
		                }
		            </div>

		            <div className="cal-icon mb-4">
		                <input className="form-control floating " id="editstart_date" type="text"  placeholder="Start Date" onChange={() => console.log()}/>
		                {editstartError &&
		                	<p className="text-danger">{editstartError}</p>
		                }
		            </div>
		            <div className="cal-icon  mb-4">
		                <input className="form-control floating " id="editend_date" type="text"  placeholder="Deadline" onChange={() => console.log()}/>
		                {editendError &&
		                	<p className="text-danger">{editendError}</p>
		                }
		            </div>
		            <div className="mb-4">
		                <textarea className="form-control floating" value={editdesc} onChange={(e) => setEditDesc(e.target.value)} placeholder="Description">
		                </textarea>
		                
		                {editdescError &&
		                	<p className="text-danger">{editdescError}</p>
		                }
		            </div>
		           
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-primary" onClick={UpdateProject}>Save</button>
			        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			      </div>
			    </div>
			  </div>
			</div>
		{/*End Edit*/}
		{/* Delete Estimate Modal */}
	      <div className="modal custom-modal fade" id="delete_project" role="dialog">
	        <div className="modal-dialog modal-dialog-centered">
	          <div className="modal-content">
	            <div className="modal-body">
	              <div className="form-header">
	                <h3>Delete Project</h3>
	                <p>Are you sure want to delete?</p>
	              </div>
	              <div className="modal-btn delete-action">
	                <div className="row">
	                  <div className="col-6">
	                    <a href="#" className="btn btn-primary continue-btn" onClick={DeleteProject}>Delete</a>
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
	      {/* /Delete Estimate Modal */}
         </div>
         </div>
       <SidebarContent />
     </div>
		)
}

export default Project;