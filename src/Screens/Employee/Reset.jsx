import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Applogo} from '../../Entryfile/imagepath.jsx'
import validator from 'validator';
import regeneratorRuntime from "regenerator-runtime";
import Loader from '../../assets/img/spinner_small.gif';

import {API_URL,EMPLOYEE_FORGOT_PWD,EMPLOYEE_VALIDATE_PWD_LINK,EMPLOYEE_RESET_PWD} from '../../Contants';

class Reset extends Component {
   constructor(props){
       super(props);
       this.state = {
         password : '',
         passwordError : '',
         cpassword : '',
         cpasswordError : '',
         alert : false,
         message : '',
         msgType : '',
         loader : false, 
         showForm : false,
         backError :  false
       }

       this.clickReset = this.clickReset.bind(this);
       this.chnagePassword = this.chnagePassword.bind(this);
       this.chnageCPassword = this.chnageCPassword.bind(this);
       this.loadLink = this.loadLink.bind(this);
   }

   chnagePassword(event){
       this.setState({password : event.target.value});
   }

   chnageCPassword(event){
       this.setState({cpassword : event.target.value});
   }

   async loadLink(){
    this.setState({
        showForm : false,
        backError : false,
        successForm : true,
       })
    if(this.props.location.search.includes('?token=')){
    
    let token = this.props.location.search.replace("?token=", "");
    this.setState({token : token});
 
    this.setState({
        showForm : false
    })
      var fetchData = await fetch(API_URL + EMPLOYEE_VALIDATE_PWD_LINK + token).then(res => res.json());
      
      if(fetchData.code === 200){
          this.setState({
              showForm : true
          });
      }
      else{
          this.setState({
              showForm : false,
              backError : true
          })
      }
    }
    else{
       this.setState({
        showForm : false,
        backError : true
       })
    }
   }

   componentDidMount(){
    this.loadLink();
   }
   async clickReset(e){
       e.preventDefault();
       this.setState({
           loader : false,
           alert : false,
           message : '',
           msgType : '',
           passwordError : '',
           cpasswordError : '',
           backError : '',
           successForm : true,

       })
   
       var error = false

       const  {password, cpassword} = this.state;

       if(password === ''){
         this.setState({passwordError : 'Field is required'});
         error = true;
       }
       else if(password.length < 6){
        this.setState({passwordError : 'Password must atleast 6 char long'});
        error = true;
      }

       if(cpassword === ''){
        this.setState({cpasswordError : 'Field is required'});
        error = true;
       }
       else if(cpassword !== password){
        this.setState({cpasswordError : 'Not match with password'});
        error = true;
      }

       if(error){
           return;
       }
       this.setState({loader : true});
       var data ={
           password : password,
           token : this.state.token
       }

  
       var fetchData = await fetch(API_URL + EMPLOYEE_RESET_PWD, {
           method: 'post',
           headers:{'content-type': 'application/json'},
           body: JSON.stringify(data)
         }).then(response => response.json());
        if(fetchData.code === 200){
           this.setState({
               successForm : false,
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
      const {password,passwordError,cpassword,cpasswordError,alert,message,msgType,loader, showForm,backError,successForm} =  this.state;
      console.log(this.props.location.search);
      return (
          <div className="main-wrapper">
            <Helmet>
                    <title>Reset Password - HRMS Admin Template</title>
                    <meta name="description" content="Login page"/>					
            </Helmet>
          <div className="account-content">
            
            <div className="container">
              {
                  backError &&
                  <h3 className="text-center text-danger mt-5">Invalid link ,please try again ?</h3>
              }
             {showForm && 
             <div>
              {/* Account Logo */}
              <div className="account-logo">
                <a href="/orange/app/main/dashboard"><img src={Applogo} alt="Dreamguy's Technologies" /></a>
              </div>
              {/* /Account Logo */}
              <div className="account-box">
                <div className="account-wrapper">
                  <h3 className="account-title">Reset Password?</h3>
             
                  {/* Account Form */}
                  <form>
                    { successForm  && 
                    <div>
                    <div className="form-group">
                      <label>Password</label>
                      <input className="form-control" type="password" value={password} onChange={this.chnagePassword}/>
                      {
                          passwordError &&
                          <p className="text-danger mt-1">{passwordError}</p>
                      }
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input className="form-control" type="password" value={cpassword} onChange={this.chnageCPassword}/>
                      {
                          cpasswordError &&
                          <p className="text-danger mt-1">{cpasswordError}</p>
                      }
                    </div>
                    <div className="form-group text-center">
                      <button className="btn btn-primary account-btn" type="submit" onClick={this.clickReset}>Change Password</button>
                    </div>
                    </div>
                    }
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
              }
            </div>
          </div>
        </div>
      );
   }
}


export default Reset;
