
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { Table } from 'antd';
import 'antd/dist/antd.css';
import {itemRender,onShowSizeChange} from "../../MainPage/paginationfunction"
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import {API_URL,EMPLOYEE_TIMESHEET} from '../../Contants';
import $ from 'jquery';
import moment from 'moment';

class TimeSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
       employees : null,
       projects : null,
       tot : null,
       emps : null,
       posts : null,
       keyword : '',
       alert : false,
       message : '',
       msgType : '',
    };
    this.clickSearch = this.clickSearch.bind(this);
  }

  async loadTimeSheet(){
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;
    var fetchLeave = await fetch(API_URL+EMPLOYEE_TIMESHEET+id)
                     .then(res => {
                         return res.json();
                     });
    if(fetchLeave.success){
      this.setState({employees : fetchLeave.data['employees']});
      this.setState({projects : fetchLeave.data['projects']});
      this.setState({tot : fetchLeave.data['tot']});
      this.setState({emps : fetchLeave.data['emps']});
    }
  }

  async clickSearch(e){
      // e.preventDefault();
      // const {keyword} = this.state;
      // var fetchLeave = await fetch(`http://payroll.pmealab.com/public/api/v1/admin/guest/search?query=${keyword}`)
      //                .then(res => res.json());
      // if(fetchLeave.success){
      //   this.setState({
      //       employees : fetchLeave.data,
      //   });
      // }
  }

  changeKeyword(event){
    this.setState({keyword : event.target.value});
  }


  componentDidMount(){
       this.setState({employees : null});
      this.loadTimeSheet();
  }


   render() {
    const{employees  } = this.state;
  
    const columns = [   
      {
        title: '#',
        // dataIndex: '',
        render : (text,record) => (
            <span className="">{record.id}</span>
        ),
      }, 
      {
        title: 'Project',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.project.proj_title}</span>
        ),
      }, 
      {
        title: 'Start',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.start_time}</span>
        ),
      }, 
      {
        title: 'End',
        // dataIndex: 'guest',
        render : (text,record) => (
            <div>
                {record.start_time  === record.end_time ?
                 <span className="p-1 text-light" style={{backgroundColor : 'red',animation: 'blinker 1s linear infinite'}}>Currently Working</span>
                 :
                 <span>{record.end_time}</span>
                }
            </div>
        ),
      },
      {
        title: 'Duration',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.duration}</span>
        ),
      },
      {
        title: 'Task',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.task}</span>
        ),
      },
      {
        title: 'Notes',
        // dataIndex: 'guest',
        render : (text,record) => (
            <span className="text-secondary">{record.notes}</span>
        ),
      },
    ];

      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Vacation Request - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">TimeSheet <span>00:12 Hours</span></h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">TimeSheet</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        {/* Search Filter */}
        {/* <div className="row filter-row">
          <div className="col-sm-6 col-md-3">  
            <div className="form-group form-focus">
                <select className="select">
                    <option value=""></option>
                </select>
            </div>
          </div>
          <div className="col-sm-6 col-md-2">  
            <div className="form-group form-focus">
                <input className="form-control floating " type="text" onChange={this.changeKeyword} value={this.state.task}/>
                <label className="focus-label">Task</label>
            </div>
          </div>
          <div className="col-sm-6 col-md-2">  
            <div className="form-group form-focus">

                <input className="form-control floating " type="text" onChange={this.changeKeyword} value={this.state.notes}/>
 
              <label className="focus-label">Notes</label>
            </div>
          </div>
          
          
          <div className="col-sm-6 col-md-2">  
            <button className="btn btn-primary"  onClick={this.clickSearch}><span className="fa fa-play" /></button>  
          </div>     
        </div> */}
        {/* /Search Filter */}
        {
          this.state.alert &&
          <div className={"alert alert-dismissible fade show  alert-"+this.state.msgType} role="alert">
            {this.state.message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }

        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
              
               {
                   employees !== null &&
                   <Table className="table-striped text-center"
                    pagination= { {total : employees.length,
                        showTotal : (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger : true,onShowSizeChange: onShowSizeChange ,itemRender : itemRender } }
                    style = {{overflowX : 'auto'}}
                    columns={columns}                 
                    // bordered
                    dataSource={employees}
                    rowKey={record => record.id}
                    onChange={this.handleTableChange}
                    />
               }
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

export default TimeSheet;
