/**
 * Signin Firebase
 */

import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02,Avatar_04,Avatar_05,Avatar_07,Avatar_08,Avatar_09} from '../../../Entryfile/imagepath.jsx'

class EmployeeDashboard extends Component {

   render() {
      return (
        <div className="page-wrapper"> 
            <Helmet>
                <title>Dashboard - HRMS Admin Template</title>
                <meta name="description" content="Dashboard"/>					
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="welcome-box">
                    <div className="welcome-img">
                      <img alt="" src={Avatar_02} />
                    </div>
                    <div className="welcome-det">
                      <h3>Welcome, John Doe</h3>
                      <p>Monday, 20 May 2019</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                
                
              </div>
            </div>
            {/* /Page Content */}
          </div>
      );
   }
}

export default EmployeeDashboard;
