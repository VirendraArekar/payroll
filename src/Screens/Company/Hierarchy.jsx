
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import 'antd/dist/antd.css';
import "../../MainPage/antdstyle.css"
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';



class Hierarchy extends Component {
  constructor(props) {
    super(props);
    this.state = {
       alert : false,
       message : '',
       msgType : '',
    };
  }


   render() {
    const{} = this.state

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
              <h3 className="page-title">Hierarchy Tree</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Hierarchy Tree</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      {/* /Page Content */}
      <div className="row sameheight-container" >
        <div className="col-md-12" >                      
          <div className="tree" >
            <ul >
              <li >
                <a href="#" >Top Level Management</a>
                  <ul >
                    <li >
                      <a href="#" >Accounts Main</a>
                       <ul >
                         <li >
                           <a href="#" >Accounts Assistant</a> 
                         </li>                                                        
                       </ul>
                    </li>
                    <li >
                      <a href="#" >Sales</a>
                        <ul >
                          <li >
                            <a href="#" >Sales Manager</a> 
                          </li>
                          <li >
                            <a href="#" >Marketing Executive</a> 
                          </li>
                          <li >
                            <a href="#" >Testind Designation</a> 
                          </li>                                                
                        </ul>
                    </li>
                    <li >
                      <a href="#" >Development</a>
                        <ul >
                          <li >
                            <a href="#" >Programmer2</a> 
                          </li>
                          <li >
                            <a href="#" >Testing Enginer</a> 
                          </li>                                                             
                        </ul>
                    </li>
                    <li>
                      <a href="#" >Management</a>
                        <ul >
                        </ul>
                    </li>
                    <li >
                      <a href="#" >Test Main</a>
                        <ul >
                        </ul>
                    </li>
                  </ul>
              </li>
            </ul>
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

export default Hierarchy;
