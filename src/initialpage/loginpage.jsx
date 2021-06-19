import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import {Applogo} from '../Entryfile/imagepath.jsx';
import validator from 'validator';
import regeneratorRuntime from "regenerator-runtime";
import {API_URL,EMPLOYEE_LOGIN} from '../Contants';
import Loader from '../assets/img/spinner_small.gif';

class Loginpage extends Component {

   constructor(props){
     super(props);
     this.state = {
          email: '',
          password: '',
          emailError :'',
          passwordError :'',
          loader : false,
          responseError : ''
     }
     this.changeEmail = this.changeEmail.bind(this);
     this.changePassword = this.changePassword.bind(this);
     this.loginClick = this.loginClick.bind(this);
   }

   changeEmail(event){
     this.setState({email : event.target.value});
   }

   changePassword(event){
    this.setState({password : event.target.value});
  }

   componentDidMount(){
    
   };
      
   async loginClick(e){
    // this.props.history.push("/orange/app/main/dashboard");
    // localStorage.setItem("firstload","true");
    e.preventDefault();

    this.setState({emailError : ''});
    this.setState({passwordError : ''});
    this.setState({responseError : ''});
    this.setState({loader : false});
    
    let email = this.state.email;
    let password = this.state.password;
    var error = false;

    if(email === ''){
      this.setState({emailError : 'Email is required!'});
      error = true;
    }
    else if(!validator.isEmail(email)){
      this.setState({emailError : 'Email is not valid!'});
      error = true;
    }
    
    if(password === ''){
      this.setState({passwordError : 'Password is required!'});
      error = true;
    }
    else if(password.length < 6){
      this.setState({passwordError : 'Password string must me <= 6 char long!'});
      error = true;
    }

    if(error){
      return;
    }

    this.setState({loader : true});
    let params = await {
      "email" : email,
      "password" : password
    };

    var apiError = false;

    await fetch('http://payroll.pmealab.com/public/api/v1/employee/login', {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(params)
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        // this.setState({loader : false});
        if(data.success){
          localStorage.setItem('user', JSON.stringify(data.data));
          localStorage.setItem('token', data.token);
          var user = localStorage.getItem('user');
        }
        else{
          apiError = true;
          // this.setState({responseError : data.message});
        }
      });
      if(!apiError){
        this.props.history.push("/app/main/dashboard");
      }
      else{
        this.setState({responseError : 'Email or Password not matched try again!'});
      }
   }


   render() {
      return (
         <div className="main-wrapper">
           <Helmet>
               <title>Login - HRMS Admin Template</title>
               <meta name="description" content="Login page"/>					
           </Helmet>
        <div className="account-content">
          {/* <a href="/orange/applyjob/joblist" className="btn btn-primary apply-btn">Apply Job</a> */}
          <div className="container">
            {/* Account Logo */}
            {/* <div className="account-logo">
              <a href="/orange/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></a>
            </div> */}
            {/* /Account Logo */}
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to Employee dashboard</p>
                {/* Account Form */}
                <form action="/orange/app/main/dashboard">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.changeEmail}/>
                    {this.state.emailError &&
                       <p className="text-danger">{this.state.emailError}</p>
                    }
                    
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label>Password</label>
                      </div>
                      <div className="col-auto">
                        <a className="text-muted" href="/orange/forgotpassword">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.changePassword}/>
                    {this.state.passwordError &&
                       <p className="text-danger">{this.state.passwordError}</p>
                    }
                  </div>
                  <div className="form-group text-center">
                    <button type="button" className="btn btn-primary account-btn" onClick={this.loginClick} >Login</button>
                  </div>
                  {this.state.loader &&
                    <div style={{marginLeft : '33%'}}>
                      <img src={Loader} /> <span className="" style={{color :'orange'}}>Loading ...</span>
                    </div>
                  }
                  {this.state.responseError &&
                    <p className="text-danger">this.state.responseError</p>
                  }
                  
                </form>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
   }
}

export default Loginpage;
