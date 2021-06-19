
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import Logo from '../../assets/img/logo2.png';
import {API_URL,EMPLOYEE_APPOINTMENT_LETTER} from '../../Contants'


class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
       letter : null,
       company : null
    };

    this.loadLetter = this.loadLetter.bind(this);
  }

  async loadLetter(){
    var user = await localStorage.getItem('user');
    var id = JSON.parse(user).id;
    var fetchLeave = await fetch(API_URL+EMPLOYEE_APPOINTMENT_LETTER+id)
                     .then(res => res.json());
    if(fetchLeave.success){
        this.setState({
            letter : fetchLeave.data,
            company : fetchLeave.company
        });
    }
  }

  componentDidMount(){
      this.loadLetter();
  }

   render() {
    const {letter,company} = this.state;
      return (  
    <div className="main-wrapper">  
      <Header/> 
      <div>    
      <div className="page-wrapper">
        <Helmet>
            <title>Appointment Letter - HRMS Admin Template</title>
            <meta name="description" content="Vacation Request"/>					
        </Helmet>
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Appointment Letter</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item active">Appointment Letter</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Content Start */}
        {letter !== null && 
        <div className="col-md-10 offset-md-1">
         <div className="p-4" style={{backgroundColor : 'white'}}>
          <div className="bg-primary p-3">
            <h1 className="text-center text-light">
              <img src={Logo}  width="70"/><br/>
              {company !== null ? company.company : ''}
            </h1>
            <h4 className="text-center text-light">{company.address1},{company.address2},{company.country},{company.city},{company.state},{company.zip}</h4>
          </div>
          <hr />
          <h3 className="text-center mt-5 mb-5">Appointment Letter</h3>
          <hr/>
          <div className="mt-5">
            <div>
              <span>
               <strong>
                 Subject: 
               </strong>
               Job offer for the position of  
               <span  style={{backgroundColor : 'yellow'}}> {letter.post.post}</span>
              </span><br/><br/><br/>
              <span>
                Respected <strong>Karthik swot,</strong>
              </span><br/><br/>
              <span>
              This letter is in regards to the interview that you appeared for the position of Sales Manager. We would like to bring to your notice that you have been selected for the particular position and we are pleased to offer the job to you.
              </span><br /><br />
              <span>
              We were looking for a candidate who was responsible and hard working and has the ability to take challenges. We found these qualities in you and so decided to give you the job. Your <strong style={{backgroundColor : 'yellow'}}>date of joining will be : {letter.doj}</strong>. You will have to report to HR Admin who will be the manager of personnel operations. For the first three months you will be undergoing training and you will be on probation for the first six months during which you are not allowed to take any paid leave. The company will be paying a <strong style={{backgroundColor : 'yellow'}}>monthly salary of ${letter.salary}</strong>.
              </span><br /><br />
              <span>
              I hope you agree all the terms and conditions and hope to see you on the date of joining.
              </span><br/><br />
              <span>Regards,</span><br />
              <span>HR Manager</span><br /><br /><br />
              <h2><img src={Logo}  width="70"/></h2><br />
              < hr />
              </div>
          </div>
         </div>
        </div>
        } 
      </div>
    </div>
    </div>
    <SidebarContent />
    </div>
      );
   }
}

export default Letter;
