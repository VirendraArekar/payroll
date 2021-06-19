 import React, { Component } from 'react';
 import { Helmet } from "react-helmet";
 import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import {API_URL,SETTINGS,SETTING_UPDATE} from '../Contants';

 class Settings extends Component {
    constructor(props){
      super(props);
      this.state={
        company : '',
        companyError : '',
        country : '',
        countryError : '',
        state : '',
        stateError : '',
        city : '',
        cityError : '',
        zip : '',
        zipError : '',
        web : '',
        webError : '',
        address1 : '',
        address1Error  : '',
        address2 : '',
        address2Error : '',
        phone : '',
        phoneError : '',
        fax : '',
        faxError : '',
        email : '',
        emailError : '',
        settings : null,
        alert : false,
        message : '',
        msgType : '',
        tap : '',
        tapError : '',
        scp : '' ,
        scpError : ''

      }

      this.loadSettings = this.loadSettings.bind(this);
      this.updateSetting = this.updateSetting.bind(this);
      this.changeCompany = this.changeCompany.bind(this);
      this.changeCountry = this.changeCountry.bind(this);
      this.changeState = this.changeState.bind(this);
      this.changeCity = this.changeCity.bind(this);
      this.changeZip = this.changeZip.bind(this);
      this.changeWeb = this.changeWeb.bind(this);
      this.changeAddress1 = this.changeAddress1.bind(this);
      this.changeAddress2 = this.changeAddress2.bind(this);
      this.changePhone = this.changePhone.bind(this);
      this.changeFax = this.changeFax.bind(this);
      this.changeEmail = this.changeEmail.bind(this);
      this.changeTap = this.changeTap.bind(this);
      this.changeScp= this.changeScp.bind(this);
    }

    async loadSettings(){
      var fetchData = await fetch(API_URL+SETTINGS).then(res => res.json());
      if(fetchData.code === 200){
        console.log(fetchData);
        this.setState({ settings : fetchData.data});
        this.setState({
          company : fetchData.data.company,
          country : fetchData.data.country,
          state : fetchData.data.state,
          city : fetchData.data.city,
          zip : fetchData.data.zip,
          web : fetchData.data.web,
          address1 : fetchData.data.address1,
          address2 : fetchData.data.address2,
          phone : fetchData.data.phone,
          fax : fetchData.data.fax,
          email : fetchData.data.email,
          tap : fetchData.data.tap,
          scp : fetchData.data.scp
        })
      }
    }
    componentDidMount(){
      this.loadSettings();
    }
    
    changeCompany(event){
      this.setState({company : event.target.value});
    }

    changeCountry(event){
      this.setState({country : event.target.value});
    }

    changeState(event){
      this.setState({state : event.target.value});
    }

    changeCity(event){
      this.setState({city : event.target.value});
    }

    changeZip(event){
      this.setState({zip : event.target.value});
    }

    changeWeb(event){
      this.setState({web : event.target.value});
    }

    changeAddress1(event){
      this.setState({address1 : event.target.value});
    }

    changeAddress2(event){
      this.setState({address2 : event.target.value});
    }

    changePhone(event){
      this.setState({phone : event.target.value});
    }

    changeFax(event){
      this.setState({fax : event.target.value});
    }

    changeEmail(event){
      this.setState({email : event.target.value});
    }

    changeTap(event){
      this.setState({tap : event.target.value});
    }

    changeScp(event){
      this.setState({scp : event.target.value});
    }

    async updateSetting(e){
      e.preventDefault();
      const {tap,scp,company,state,country,city,zip,web,phone,address1,address2,email,fax}  = this.state;
      this.setState({
        companyError : '',
        countryError : '',
        stateError : '',
        cityError : '',
        zipError : '',
        webError : '',
        address1Error  : '',
        address2Error : '',
        phoneError : '',
        faxError : '',
        emailError : '',
        tapError : '',
        scpError : ''
      });


      var error = false;

      if(company === ''){
        this.setState({companyError : 'Field is required!.'});
        error = true;
      }
      else if(company.length < 3 ){
        this.setState({companyError : 'Company must be atleast 3 char long.'});
        error = true;
      }

      if(email === ''){
        this.setState({emailError : 'Field is required!.'});
        error = true;
      }
    


      if(country === ''){
        this.setState({countryError : 'Field is required!.'});
        error = true;
      }
      else if(country.length < 3 ){
        this.setState({countryError : 'Country must be atleast 3 char long.'});
        error = true;
      }


      if(state === ''){
        this.setState({stateError : 'Field is required!.'});
        error = true;
      }
      else if(state.length < 3 ){
        this.setState({stateError : 'State must be atleast 3 char long.'});
        error = true;
      }


      if(city === ''){
        this.setState({cityError : 'Field is required!.'});
        error = true;
      }
      else if(city.length < 3 ){
        this.setState({cityError : 'City must be atleast 3 char long.'});
        error = true;
      }


      if(zip === ''){
        this.setState({zipError : 'Field is required!.'});
        error = true;
      }
      else if(zip.length < 3 ){
        this.setState({zipError : 'Zip must be atleast 3 char long.'});
        error = true;
      }


      if(web === ''){
        this.setState({webError : 'Website is invalid.'});
        error = true;
      }

      if(tap === ''){
        this.setState({tapError : 'Field is required!'});
        error = true;
      }

      
      if(scp === ''){
        this.setState({scpError : 'Field is required!'});
        error = true;
      }

      
      if(address1 === ''){
        this.setState({address1Error : 'Field is required!.'});
        error = true;
      }
      else if(address1.length < 10 ){
        this.setState({address1Error : 'Address must be atleast 10 char long.'});
        error = true;
      }


      if(phone === ''){
        this.setState({phoneError : 'Field is required!.'});
        error = true;
      }
      else if(phone.length < 3 ){
        this.setState({phoneError : 'Phone must be atleast 3 char long.'});
        error = true;
      }



      if(fax === ''){
        this.setState({faxError : 'Field is required!.'});
        error = true;
      }
      else if(fax.length < 3 ){
        this.setState({faxError : 'Fax must be atleast 3 char long.'});
        error = true;
      }

      if(error){
        return ;
      }

      var data = {
        company : company,
        country : country,
        state : state,
        city : city,
        zip : zip,
        web : web,
        address1  : address1,
        address2 : address2,
        phone : phone,
        fax : fax,
        email : email,
        tap : tap,
        scp : scp
      };

      console.log(data);

      var fetchData = await fetch(API_URL + SETTING_UPDATE,{
        method : 'post',
        body : JSON.stringify(data),
        headers:{'content-type': 'application/json'},
      }).then(res => res.json());

      if(fetchData.code === 200){
        this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
        });
      }
      else{
        this.setState({
          alert : true,
          message : 'Internal server error',
          msgType : 'danger'
        });
      }

    }
    render() {
      const {company,state,country,city,zip,web,phone,address1,address2,email,fax,companyError,stateError,countryError,cityError,zipError,webError,phoneError,address1Error,address2Error,emailError,faxError , alert,message,msgType,tap,scp,tapError,scpError}  = this.state;
      return ( 
     <div className="main-wrapper">  
       <Header/> 
       <div>
        <div className="page-wrapper">
        <Helmet>
            <title>Settings - HRMS Admin Template</title>
            <meta name="description" content="Login page"/>					
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* Page Header */}
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="page-title">Company Settings</h3>
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
              {/* /Page Header */}
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Company Name <span className="text-danger">*</span></label>
                      <input className="form-control" type="text" value={company} onChange={this.changeCompany} />
                      {companyError &&
                       <p className="text-danger">companyError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Website Url</label>
                      <input className="form-control"  type="text" value={web} onChange={this.changeWeb}/>
                      {webError &&
                       <p className="text-danger">webError</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Address 1</label>
                      <input className="form-control " type="text" value={address1} onChange={this.changeAddress1}/>
                      {address1Error &&
                       <p className="text-danger">address1Error</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>Address 2</label>
                      <input className="form-control " type="text" value={address2} onChange={this.changeAddress2}/>
                      {address2Error &&
                       <p className="text-danger">address2Error</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="form-group">
                      <label>Country</label>
                      <input className="form-control"  type="text" value={country} onChange={this.changeCountry}/>
                      {countryError &&
                       <p className="text-danger">countryError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="form-group">
                      <label>City</label>
                      <input className="form-control" type="text" value={city} onChange={this.changeCity}/>
                      {cityError &&
                       <p className="text-danger">cityError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="form-group">
                      <label>State/Province</label>
                      <input className="form-control "  type="text" value={state} onChange={this.changeState}/>
                      {stateError &&
                       <p className="text-danger">stateError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-3">
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input className="form-control"  type="text" value={zip} onChange={this.changeZip}/>
                      {zipError &&
                       <p className="text-danger">zipError</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" type="email" value={email} onChange={this.changeEmail}/>
                      {emailError &&
                       <p className="text-danger">emailError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input className="form-control" type="text" value={phone} onChange={this.changePhone}/>
                      {phoneError &&
                       <p className="text-danger">phoneError</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Fax</label>
                      <input className="form-control"  type="text" value={fax} onChange={this.changeFax}/>
                      {faxError &&
                       <p className="text-danger">faxError</p>
                      }
                    </div>
                  </div>
                </div>
                <hr />
                <h4># Tax and Fund information</h4>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>TAP Contribution(%)</label>
                      <input className="form-control"  type="number" value={tap} onChange={this.changeTap}/>
                      {tapError &&
                       <p className="text-danger">tapError</p>
                      }
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>SCP Contribution(%)</label>
                      <input className="form-control"  type="number" value={scp} onChange={this.changeScp}/>
                      {scpError &&
                       <p className="text-danger">scpError</p>
                      }
                    </div>
                  </div>
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" onClick={this.updateSetting}>Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
      </div>
     <SidebarContent />
    </div>
       );
    }
 }
 
 export default Settings;
 