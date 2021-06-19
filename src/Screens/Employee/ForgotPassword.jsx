 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 import {Applogo} from '../../Entryfile/imagepath.jsx'
 import validator from 'validator';
 import regeneratorRuntime from "regenerator-runtime";
 import Loader from '../../assets/img/spinner_small.gif';

 import {API_URL,EMPLOYEE_FORGOT_PWD} from '../../Contants';

 class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
          email : '',
          emailError : '',
          alert : false,
          message : '',
          msgType : '',
          loader : false
        }

        this.clickForgot = this.clickForgot.bind(this);
        this.chnageEmail = this.chnageEmail.bind(this);
    }

    chnageEmail(event){
        this.setState({email : event.target.value});
    }

    async clickForgot(e){
        e.preventDefault();
        this.setState({
            loader : false,
            alert : false,
            message : '',
            msgType : ''
        })
        this.setState({
            emailError : ''
        });
        var error = false

        let email = this.state.email;
        if(!validator.isEmail(email)){
          this.setState({emailError : 'Invalid email address'});
          error = true;
        }

        if(error){
            return
        }
        this.setState({loader : true});
        var data ={
            email : email
        }
        var fetchData = await fetch(API_URL + EMPLOYEE_FORGOT_PWD, {
            method: 'post',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(data)
          }).then(response => response.json());
         if(fetchData.code === 200){
            this.setState({
                loader : false,
                alert : true,
                message : fetchData.message,
                msgType : 'success'
            })
          }
          else{
            this.setState({
                loader : false,
                alert : true,
                message : fetchData.message,
                msgType : 'danger'
            })
          }

    }
    render() {
       const {email,emailError,alert,message,msgType,loader} =  this.state;
       return (
           <div className="main-wrapper">
             <Helmet>
                     <title>Forgot Password - HRMS Admin Template</title>
                     <meta name="description" content="Login page"/>					
             </Helmet>
           <div className="account-content">
             
             <div className="container">
               {/* Account Logo */}
               <div className="account-logo">
                 <a href="/orange/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></a>
               </div>
               {/* /Account Logo */}
               <div className="account-box">
                 <div className="account-wrapper">
                   <h3 className="account-title">Forgot Password?</h3>
                   <p className="account-subtitle">Enter your email to get a password reset link</p>
                   {/* Account Form */}
                   <form>
                     <div className="form-group">
                       <label>Email Address</label>
                       <input className="form-control" type="text" value={email} onChange={this.chnageEmail}/>
                       {
                           emailError &&
                           <p className="text-danger mt-1">{emailError}</p>
                       }
                     </div>
                     <div className="form-group text-center">
                       <button className="btn btn-primary account-btn" type="submit" onClick={this.clickForgot}>Reset Password</button>
                     </div>
                     <div className="account-footer">
                       <p>Remember your password? <a href="/employee/login">Login</a></p>
                     </div>
                   </form>
                   {
                       loader && 
                       <div className="">
                           <img src={Loader} style={{width : 90}} className="mx-auto d-block"/>
                       </div>
                   }
                   { alert &&
                      <div className={"mt-2 alert alert-dismissible fade show alert-"+msgType} role="alert">
                      {message}
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                     </div>
                   }
                   {/* /Account Form */}
                 </div>
               </div>
             </div>
           </div>
         </div>
       );
    }
 }
 
 
 export default ForgotPassword;
 