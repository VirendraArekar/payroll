import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import {Applogo} from '../Entryfile/imagepath.jsx';
import validator from 'validator';
import regeneratorRuntime from "regenerator-runtime";
import {API_URL,ADMIN_LOGIN,FRONT_URL} from '../Contants';
import Loader from '../assets/img/spinner_small.gif';
import { data } from 'jquery';
import { Redirect} from 'react-router-dom';
class LoginPage extends Component {

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
     this.checkLoggedIn = this.checkLoggedIn.bind(this);
   }

   changeEmail(event){
     this.setState({email : event.target.value});
   }

   changePassword(event){
    this.setState({password : event.target.value});
  }

      
   async loginClick(e){
    e.preventDefault();
    this.setState({
        emailError : '',
        passwordError : '',
        responseError : '',
        loader : false
    });
    
    const {email,password}  = this.state;
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
    
    let params =  await {
      "email" : email,
      "password" : password
    };

    var apiError = false;

    var fetchData = await fetch( API_URL+ADMIN_LOGIN , {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(params)
      }).then(response => response.json());
      console.log(fetchData);
     if(fetchData.code === 200){
        this.setState({loader : false});
        if(fetchData.success){
          localStorage.setItem('user', JSON.stringify(fetchData.data));
          localStorage.setItem('token', fetchData.token);
          localStorage.setItem('type', 'admin');
          var user = localStorage.getItem('user');

          this.props.history.push("/admin/dashboard");
        }
        else{
          this.setState({responseError : data.message});
        }
      }
      else if(fetchData.code === 404){
        this.setState({loader : false});
        this.setState({responseError : fetchData.data});
      }
      else{
        this.setState({loader : false});
        this.setState({responseError : 'Email or Password not matched try again!'});
      }
   }

   async checkLoggedIn(){
       var user = await localStorage.getItem('user');
      //  if(user  !== null)
      //     this.props.history.push("/admin/dashboard");
      if(user !== null){
        var type = await localStorage.getItem('type');
        if(type === 'employee'){
          <Redirect to="/employee/dashboard" />
        }
        else{
          <Redirect to="/admin/dashboard'" />
        }
      }
   }

   componentDidMount(){
    //    localStorage.clear();
     this.checkLoggedIn();
   }

   render() {
      return (
         <div className="main-wrapper">
           <Helmet>
               <title>Login - HRMS Admin Template</title>
               <meta name="description" content="Login page"/>					
           </Helmet>
        <div className="account-content">

          <div className="container">
            <div className="account-box mt-5">
              <div className="account-wrapper">
                <div className="account-logo">
                    <a href="/"><img src={Applogo} style={{width : 70}} alt="Dreamguy's Technologies" /></a>
                </div>
                <h3 className="account-title">Login</h3>
                <p className="account-subtitle">Access to Admin dashboard</p>
                {/* Account Form */}
                <form action="">
                  <div className="form-group">
                    <label className="float-left">Email Address</label>
                    <input className="form-control" type="text" name="email" value={this.state.email} onChange={this.changeEmail}/>
                    {this.state.emailError &&
                       <p className="text-danger">{this.state.emailError}</p>
                    }
                    
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col">
                        <label className="float-left">Password</label>
                      </div>
                      <div className="col-auto">
                        {/* <a className="text-muted" href="/orange/forgotpassword">
                          Forgot password?
                        </a> */}
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
                    <div style={{marginLeft : '30%'}}>
                      <img src={Loader} /> <span className="" style={{color :'orange'}}>Loading ...</span>
                    </div>
                  }
                  {this.state.responseError &&
                    <p className="text-danger text-center">{this.state.responseError}</p>
                  }
                  
                </form>
                <div className="text-center">
                  <a className="" href={FRONT_URL+'employee/login'}>Employee Login</a>
                </div>
                {/* /Account Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
      );
   }
}

export default LoginPage;
