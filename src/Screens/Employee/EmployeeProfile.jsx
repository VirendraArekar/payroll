import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {Avatar_02,Avatar_05,Avatar_09,Avatar_10,Avatar_16 } from '../../Entryfile/imagepath'
import Header from '../../initialpage/Sidebar/header';
import SidebarContent from '../../initialpage/Sidebar/sidebar';
import moment from 'moment';
import {API_URL,EMPLOYEE_PROFILE,EMPLOYEE_PROFILE_UPDATE,EMPLOYEE_PROFILE_PERSONAL_UPDATE,USER_PROFILE_BANK_UPDATE ,CORE} from '../../Contants';
import validator from 'validator';
import { asRoughMinutes, preventDefault } from '@fullcalendar/common';
import $ from 'jquery';

 export default class EmployeeProfile extends Component {
   constructor(props){
     super(props);
     this.state = {
       user : null,
       posts : null,
       employee : null,
       name : '',
       father : '',
       email : '',
       dob : '',
       doj :'',
       address :  '',
       mobile : '',
       designation : '',
       pincode :'',
       state : '',
       country : '',
       sex : '',
       facebook : '',
       twitter : '',
       linkedin : '',
       github : '',
       nameError : '',
       emailError : '',
       dobError : '',
       addressError :  '',
       mobileError : '',
       designationError : '',
       pincodeError :'',
       stateError : '',
       countryError : '',
       sexError : '',
       facebookError : '',
       twitterError : '',
       linkedinError : '',
       githubError : '',
       fatherError : '',
       dojError : '',
       salary : '',
       notes : '',
       alert : false,
       message : '',
       msgType : '',
       passport_no : '',
       children : '',
       spouse : '',
       expiry_date : '',
       phone : '',
       religion : '',
       nationality : '',
       marrital_status : '',
       personal_info : null,
       priname : '',
       prirelation : '',
       priphone : '',
       priphone2 : '',
       secname : '',
       secrelation : '',
       secphone : '',
       secphone2 : '',
       prinameError : '',
       prirelationError : '',
       priphoneError : '',
       priphone2Error : '',
       secnameError : '',
       secrelationError : '',
       secphoneError : '',
       secphone2Error : '',
       bankname : '',
       account_no : '',
       ifsc_code : '',
       pan_no : '',
       members : null,
       members2 : [],
       educations : null,
       educations2 : [],
       experiences : null,
       experiences2 : [],
       salary : '',
       salarytype : '',
       paymenttype : '',
       profilepic : null,
       bnameError : '',
       ifscError : '',
       banknoError : '',
       photo : null,
       imgname : null,
       tapper : '',
       scpper : '',
       emergency : null,
       emergency2 : []
     }

     this.loadUser = this.loadUser.bind(this);
     this.changeName = this.changeName.bind(this);
     this.changeEmail = this.changeEmail.bind(this);
     this.changeAddress = this.changeAddress.bind(this);
     this.changeMobile = this.changeMobile.bind(this);
     this.changeDesignation = this.changeDesignation.bind(this);
     this.changePincode = this.changePincode.bind(this);
     this.changeState = this.changeState.bind(this);
     this.changeCountry = this.changeCountry.bind(this);
     this.changeDob = this.changeDob.bind(this);
     this.changeSex= this.changeSex.bind(this);
     this.changeFather= this.changeFather.bind(this);
     this.changeDoj= this.changeDoj.bind(this);
     this.updateProfile = this.updateProfile.bind(this);
     this.updatePassport = this.updatePassport.bind(this);
     this.changePassport_no = this.changePassport_no.bind(this);
     this.changeChildren = this.changeChildren.bind(this);
     this.changeSpouse = this.changeSpouse.bind(this);
     this.changeExpiry_date = this.changeExpiry_date.bind(this);
     this.changePhone = this.changePhone.bind(this);
     this.changeReligion =  this.changeReligion.bind(this);
     this.changeNationality = this.changeNationality.bind(this);
     this.changeMarrital_status = this.changeMarrital_status.bind(this);

     this.changePriname = this.changePriname.bind(this);
     this.changePrirelation = this.changePrirelation.bind(this);
     this.changePriphone= this.changePriphone.bind(this);
     this.changePriphone2 = this.changePriphone2.bind(this);
     this.changeSecname = this.changeSecname.bind(this);
     this.changeSecrelation =  this.changeSecrelation.bind(this);
     this.changeSecphone = this.changeSecphone.bind(this);
     this.changeSecphone2 = this.changeSecphone2.bind(this);
     this.updateContact = this.updateContact.bind(this);
     this.cloneMember = this.cloneMember.bind(this);
     this.addFamilyMember = this.addFamilyMember.bind(this);
     this.changeDynamic = this.changeDynamic.bind(this);
     this.changeEducation = this.changeEducation.bind(this);
     this.cloneEducation = this.cloneEducation.bind(this);
     this.AddEducation = this.AddEducation.bind(this);

     this.changeExperience = this.changeExperience.bind(this);
     this.cloneExperience = this.cloneExperience.bind(this);
     this.AddExperience = this.AddExperience.bind(this);
     this.clickPhoto = this.clickPhoto.bind(this);
     this.addBankDetail = this.addBankDetail.bind(this);
     this.changeForeigner = this.changeForeigner.bind(this);
     this.changeEmergency = this.changeEmergency.bind(this);
     this.createMember = this.createMember.bind(this);
     this.createEmergency = this.createEmergency.bind(this);
     this.cloneEmergency = this.cloneEmergency.bind(this);
     this.createExperience = this.createExperience.bind(this); 
   }

   async loadUser(){
     var user = await localStorage.getItem('user');
     user = JSON.parse(user);
     var fetchData = await fetch(API_URL + EMPLOYEE_PROFILE + user.id).then(res => res.json());
     if(fetchData.code === 200)
     {
       var employee = fetchData.data['employee']
       var personal_info = fetchData.data['personal_info'];
       var emergency_contacts = employee.emergency_contacts;
       var bank_details = employee.bank_details;
       var members = employee.family_info;
       var education = employee.education;
       var experience = employee.experience;
       if(experience !== null){
        experience = JSON.parse(experience);
        this.setState({
          experiences : experience,
          experiences2 : experience
        });
       }
       if(education !== null){
        education = JSON.parse(education);
        this.setState({
          educations : education,
          educations2 : education
        });
       }
       if(members !== null){
        members = JSON.parse(members);
        this.setState({
          members : members,
          members2 : members
        });
       }
       if(bank_details !== null){
        bank_details = JSON.parse(bank_details);
         this.setState({
          bankname : bank_details.bankname,
          account_no : bank_details.account_no
         });
         document.querySelector('#bankname').value = bank_details.bankname;
         document.querySelector('#bankno').value = bank_details.account_no;
       }
       if(emergency_contacts !== null){
        emergency_contacts = JSON.parse(emergency_contacts);
         this.setState({
          emergency : emergency_contacts,
          emergency2 : emergency_contacts
         })
       }
       if(personal_info)
       {
         this.setState({
          personal_info : personal_info,
          passport_no : personal_info.passport_no,
          children : personal_info.no_of_children,
          spouse : personal_info.spouse,
          expiry_date : personal_info.passport_exp_date,
          phone : personal_info.phone,
          religion : personal_info.religion,
          nationality : personal_info.nationality,
          marrital_status : personal_info.marrital_status
         })

         document.querySelector('#pxds').value = moment(personal_info.passport_exp_date).format('Y-MM-D');
       }
        this.setState({
          userId : employee.id,
          posts : fetchData.data['posts'],
          profilepic : employee.photo,
          name : employee.name,
          father : employee.father,
          email : employee.email,
          address : employee.address,
          mobile : employee.mobile,
          dob : employee.dob,
          doj : employee.doj,
          sex : employee.sex,
          notes : employee.notes === 'null' ? '' : employee.sex,
          salary : employee.salary,
          designation: employee.post_id,
          state : employee.state === 'null' ? '' : employee.state,
          country : employee.country === 'null' ? '' : employee.country,
          pincode : employee.pincode === 'null' ? '' : employee.pincode,
          employee : employee,
          facebook : employee.facebook === 'null' ? '' : employee.facebook,
          twitter : employee.twitter === 'null' ? '' : employee.twitter,
          linkedin : employee.linkedin === 'null' ? '' : employee.linkedin,
          github : employee.github === 'null' ? '' : employee.github,
          salarytype :employee.salary_type === 'null' ? '' : employee.salary_type,
          paymenttype :employee.payment_type === 'null' ? '' : employee.payment_type,
          foreigner : employee.foreigner,
          tapper : employee.tapper,
          scpper : employee.scpper
          });
     }
     
   }
   changeName(event){
     this.setState({name : event.target.value});
   }
   changeEmail(event){
    this.setState({email : event.target.value});
   }
   changeAddress(event){
    this.setState({address : event.target.value});
  }
  changeMobile(event){
    this.setState({mobile : event.target.value});
  }
  changeDesignation(event){
    this.setState({designation : event.target.value});
  }
  changePincode(event){
    this.setState({pincode : event.target.value});
  }
  changeState(event){
    this.setState({state : event.target.value});
  }
  changeFather(event){
    this.setState({father : event.target.value});
  }
  changeCountry(event){
    this.setState({country : event.target.value});
  }
  changeDob(event){
    this.setState({dob : event.target.value});
  }
  changeDoj(event){
    this.setState({doj : event.target.value});
  }
  changeSex(event){
    this.setState({sex : event.target.value});
  }
  changeFacebook(event){
    this.setState({facebook : event.target.value});
  }
  changeTwitter(event){
    this.setState({twitter : event.target.value});
  }
  changeLinkedin(event){
    this.setState({linkedin : event.target.value});
  }
  changeGithub(event){
    this.setState({github : event.target.value});
  }
  changePassport_no(event){
    this.setState({passport_no : event.target.value});
  }
  changeChildren(event){
    this.setState({children : event.target.value});
  } 
  changeSpouse(event){
    this.setState({spouse : event.target.value});
  } 
  changeExpiry_date(event){
    this.setState({expiry_date : event.target.value});
  }
  changePhone(event){
    this.setState({phone : event.target.value});
  }
  changeReligion(event){
    this.setState({religion : event.target.value});
  }
  changeNationality(event){
    this.setState({nationality : event.target.value});
  }
  changeMarrital_status(event){
    this.setState({marrital_status : event.target.value});
  }
  changePriname(event){
    this.setState({priname : event.target.value});
  }
  changePrirelation(event){
    this.setState({prirelation : event.target.value});
  }
  changePriphone(event){
    this.setState({priphone : event.target.value});
  }
  changePriphone2(event){
    this.setState({priphone2 : event.target.value});
  }
  changeSecname(event){
    this.setState({secname : event.target.value});
  }
  changeSecrelation(event){
    this.setState({secrelation : event.target.value});
  }
  changeSecphone(event){
    this.setState({secphone : event.target.value});
  }
  changeSecphone2(event){
    this.setState({secphone2 : event.target.value});
  }

  changeForeigner(event){
    this.setState({foreigner : event.target.value});
  }

  componentDidMount(){
    this.loadUser();
  }

  async updateProfile(e){
    e.preventDefault();
    this.setState({
      alert : false,
      message : '',
      msgType : '',
      nameError : '',
      fatherError : '',
      emailError : '',
      dobError : '',
      addressError :  '',
      mobileError : '',
      designationError : '',
      pincodeError :'',
      stateError : '',
      countryError : '',
      sexError : '',
      facebookError : '',
      twitterError : '',
      linkedinError : '',
      githubError : '',
      dojError:'',
      foreignerError : ''
    })
    const {userId,doj,user,notes,salary,father,name,email,address,mobile,designation,pincode,state,country,dob,sex,facebook, twitter, github,linkedin, foreigner} = this.state;
    var error = false;
  
    if(name === ''){
      this.setState({nameError : 'Field is required.'});
      error = true;
    }
    else if(name.length < 3){
      this.setState({nameError : 'Name must be atleast 3 char long.'});
      error = true;
    }
    if(father === ''){
      this.setState({fatherError : 'Field is required.'});
      error = true;
    }
    else if(father.length < 3){
      this.setState({fatherError : 'Name must be atleast 3 char long.'});
      error = true;
    }

    if(email === ''){
      this.setState({emailError : 'Field is required.'});
      error = true;
    }
    else if(!validator.isEmail(email)){
      this.setState({emailError : 'Email is invalid.'});
      error = true;
    }

    if(address === ''){
      this.setState({addressError : 'Field is required.'});
      error = true;
    }
    else if(address.length < 10){
      this.setState({addressError : 'Address must be atleast 10 char long.'});
      error = true;
    }

    if(mobile === ''){
      this.setState({mobileError : 'Field is required.'});
      error = true;
    }
    else if(!validator.isMobilePhone(mobile.toString())){
      this.setState({mobileError : 'Mobile is invalid.'});
      error = true;
    }

    if(pincode !== '' && pincode !== null){
      if(pincode.length !== 6){
        this.setState({pincodeError : 'Pincode is invalid'});
        error = true;
      }
    }

    if(state !== '' && state !== null){
      if(state.length < 3){
        this.setState({stateeError : 'State  must be atleast 3 char long.'});
        error = true;
      }
    }

    if(country !== '' && country !== null){
      if(country.length < 3){
        this.setState({countryError : 'Country  must be atleast 3 char long.'});
        error = true;
      }
    }

    if(dob === ''){
      this.setState({dobError : 'Field is required.'});
      error = true;
    }

    if(sex === ''){
      this.setState({sexError : 'Field is required.'});
      error = true;
    }

    if(foreigner === ''){
      this.setState({foreignerError : 'Field is required.'});
      error = true;
    }



    if(error){
      return
    }

    const formData = new FormData();
		formData.append('photo', this.state.photo === null ? '' : this.state.photo);
    formData.append('id' , userId);
    formData.append('name' , name);
    formData.append('father' , father);
    formData.append('foreigner' , foreigner);
    formData.append('email' , email);
    formData.append('dob' , dob);
    formData.append('doj' , doj);
    formData.append('salary' , salary);
    formData.append('address' , address.trim());
    formData.append('mobile' , mobile);
    formData.append('posting' , designation);
    formData.append('pincode' , pincode);
    formData.append('state' , state);
    formData.append('country' , country);
    formData.append('sex' , sex);
    formData.append('facebook' , facebook);
    formData.append('twitter' , twitter);
    formData.append('linkedin' , linkedin);
    formData.append('github' , github);
    formData.append('notes' , notes);

		var fetchData = await fetch(API_URL+ EMPLOYEE_PROFILE_UPDATE + userId,
        {
          method: 'POST',
          body: formData,
        }
	  	)
			.then((response) => response.json());
			$('#profile_info').modal('hide');
      if(fetchData.code === 200){
        this.loadUser();
        this.setState({
          alert : true,
          message : fetchData.message,
          msgType : 'success'
        })
      }
      else{
        this.setState({
          alert : true,
          message : 'Internal error occured',
          msgType : 'danger'
        })
      }
      return;

    var data = {
      id : userId,
      name : name,
      father : father,
      email : email,
      dob : dob,
      doj :doj,
      salary : salary,
      address : address,
      mobile : mobile,
      posting : designation,
      pincode : pincode,
      state : state,
      country : country,
      sex : sex,
      facebook : facebook,
      twitter : twitter,
      linkedin : linkedin,
      github : github,
      notes : notes
    };

    
    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_UPDATE + userId,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res =>res.json());
    $('#profile_info').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }

  }

  async updatePassport(e){
    e.preventDefault();
    const {userId,passport_no,children,spouse,phone,religion,nationality,marrital_status} = this.state;
    var expiry_date = document.querySelector('#pxds').value;
    var error = false;
 
    var data = {
      type : 'passport',
      emp_id : userId,
      passport_no : passport_no,
      passport_exp_date : expiry_date,
      phone : phone,
      nationality : nationality,
      religion : religion,
      marrital_status :marrital_status,
      spouse : spouse,
      no_of_children : children,
    };

    
    
    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_PERSONAL_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res =>res.json());
    $('#personal_info_modal').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }

  }

  async updateContact(e){
    e.preventDefault();
    var names = [];
    var $names = $('input[name=priname]');
    $names.each(function(){
        names.push($(this).val());
    });

    var relations = [];
    var $relations = $('input[name=prirelation]');
    $relations.each(function(){
        relations.push($(this).val());
    });

    var phones = [];
    var $phones = $('input[name=priphone]');
    $phones.each(function(){
        phones.push($(this).val());
    });

    var phones2 = [];
    var $phones2 = $('input[name=priphone2]');
    $phones2.each(function(){
        phones2.push($(this).val());
    });

    var data = [];
    for(var i = 0; i < names.length ; i++){
      data.push({
        name : names[i],
        relation : relations[i],
        phone : phones[i],
        phone2 : phones2[i]
      })
    }
    var finalData = {
      type : 'contact',
      emp_id  : this.state.userId,
      emergency : data
    }
   
    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_PERSONAL_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(finalData)
    }).then(res =>res.json());

    $('#emergency_contact_modal').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }

  }

  createMember(){
    return this.state.members2.map((el, i) => ( 
      <div className="card" key={i}>
      <div className="card-body" id="memberId">
       <h3 className="card-title">Family Member <a href="#" className="delete-icon" ><i className="fa fa-trash-o" onClick={(e) => this.deleteMember(e,i)}/></a></h3>
       <div className="row">
         <div className="col-md-6">
           <div className="form-group">
             <label>Name <span className="text-danger">*</span></label>
             <input className="form-control" name="membername" id={i} type="text" value={el.name} onChange={this.changeDynamic.bind(this, i)} required/>
           </div>
         </div>
         <div className="col-md-6">
           <div className="form-group">
             <label>Relationship <span className="text-danger">*</span></label>
             <input className="form-control" name="memberrelation" id={i} type="text" value={el.relation} onChange={this.changeDynamic.bind(this, i)} required/>
           </div>
         </div>
         <div className="col-md-6">
           <div className="form-group">
             <label>Date of birth <span className="text-danger">*</span></label>
             <input className="form-control" type="text" name="memberdob" id={i} value={el.dob}  onChange={this.changeDynamic.bind(this, i)} required/>
           </div>
         </div>
         <div className="col-md-6">
           <div className="form-group">
             <label>Phone <span className="text-danger">*</span></label>
             <input className="form-control memberdob" type="text"  name="memberphone" id={i}  value={el.phone} onChange={this.changeDynamic.bind(this, i)} required/>
           </div>
         </div>
       </div>
     </div>
    </div>
    ))
  }

  async deleteMember(e,i){
    e.preventDefault();
    let members2 = [...this.state.members2];
    members2.splice(i, 1);
    this.setState({ members2 });
  }

  async cloneMember(e){
    e.preventDefault();
    this.setState(prevState => ({ 
        members2: [...prevState.members2, { name: "", relation: "", dob : "",phone : ""}]
    }))
  }

  async addFamilyMember(e){
    e.preventDefault();
    var names = [];
    var $names = $('input[name=membername]');
    $names.each(function(){
        names.push($(this).val());
    });

    var relations = [];
    var $relations = $('input[name=memberrelation]');
    $relations.each(function(){
        relations.push($(this).val());
    });

    var dobs = [];
    var $dobs = $('input[name=memberdob]');
    $dobs.each(function(){
        dobs.push($(this).val());
    });

    var phones = [];
    var $phones = $('input[name=memberphone]');
    $phones.each(function(){
        phones.push($(this).val());
    });

    var data = [];
    for(var i = 0; i < names.length ; i++){
      data.push({
        name : names[i],
        relation : relations[i],
        dob : dobs[i],
        phone : phones[i]
      })
    }
    var finalData = {
      type : 'family_contact',
      emp_id  : this.state.userId,
      members : data
    }

    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_PERSONAL_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(finalData)
    }).then(res =>res.json());

    $('#family_info_modal').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }
    
  }

  async changeDynamic(i, e){
    const { name, value } = e.target;
    console.log(name);
      let members2 = [...this.state.members2];
      if(name === 'membername'){
        var dy = 'name';
        members2[i] = {...members2[i], [dy]: value};
      }
      if(name === 'memberrelation'){
        var dy = 'relation';
        members2[i] = {...members2[i], [dy]: value};
      }
      if(name === 'memberdob'){
        var dy = 'dob';
        members2[i] = {...members2[i], [dy]: value};
      }
      if(name === 'memberphone'){
        var dy = 'phone';
        members2[i] = {...members2[i], [dy]: value};
      }
      this.setState({ members2 })
    
  }

  async changeEducation(event){
    var val = event.target.value;
    var myname = event.target.getAttribute('name');
    var id = event.target.getAttribute("id");
  
    var institutions = [];
    var $institutions = $('input[name=institution]');
    $institutions.each(function(){
    institutions.push($(this).val());
    });

    var degrees = [];
    var $degrees = $('input[name=degree]');
    $degrees.each(function(){
    degrees.push($(this).val());
    });

    var grades = [];
    var $grades = $('input[name=grade]');
    $grades.each(function(){
      grades.push($(this).val());
    });

    var starts = [];
    var $starts = $('input[name=start]');
    $starts.each(function(){
      starts.push($(this).val());
    });

    var ends = [];
    var $ends = $('input[name=end]');
    $ends.each(function(){
      ends.push($(this).val());
    });

    var subjects = [];
    var $subjects = $('input[name=subject]');
    $subjects.each(function(){
      subjects.push($(this).val());
    });

    var data = [];
    for(var i = 0; i < institutions.length ; i++){
      data.push({
        institutions : institutions[i],
        degree : degrees[i],
        grade : grades[i],
        subject : subjects[i],
        start : starts[i],
        end : ends[i]
      })
    }

    await this.setState({
      educations2 : data
    })
  }

  createEducation(){
    return this.state.educations2.map((el,i) => (
      <div className="card" key={i}>
        <div className="card-body" >
          <h3 className="card-title">Education Informations<a href="#" className="delete-icon" onClick={this.removeEducation.bind(this, i)}><i className="fa fa-trash-o" /></a></h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <input type="text" className="form-control floating" value={el.institution} id={i} name="institution" onChange={this.changeEducation.bind(this, i)} />
                <label className="focus-label">Institution</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <input type="text" className="form-control floating" value={el.subject} id={i} name="subject" onChange={this.changeEducation.bind(this, i)} />
                <label className="focus-label">Course/Major</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <div className="cal-icon">
                  <input type="text" className="form-control floating" value={el.start} id={i} name="start" onChange={this.changeEducation.bind(this, i)} />
                </div>
                <label className="focus-label">Starting Date</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <div className="cal-icon">
                  <input type="text" className="form-control floating"  value={el.end} id={i} name="end" onChange={this.changeEducation.bind(this, i)}/>
                </div>
                <label className="focus-label">Complete Date</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <input type="text" className="form-control floating" value={el.degree} id={i} name="degree" onChange={this.changeEducation.bind(this, i)} />
                <label className="focus-label">Degree/Diploma</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group form-focus focused">
                <input type="text" className="form-control floating" value={el.grade} id={i} name="grade" onChange={this.changeEducation.bind(this, i)}/>
                <label className="focus-label">Grade</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  removeEducation(i){
    let educations2 = [...this.state.educations2];
    educations2.splice(i, 1);
    this.setState({ educations2 });
  }

  async changeEducation(i, e){
      const { name, value } = e.target;
      let educations2 = [...this.state.educations2];
      educations2[i] = {...educations2[i], [name]: value};
      this.setState({ educations2 })
  }

  cloneEducation(e){
    e.preventDefault();
    this.setState(prevState => ({ 
        educations2 : [...prevState.educations2, { institution: "", subject: "" , start : "", end : "", degree : '', grade : ""}]
    }))
  }

  async AddEducation(e){
    e.preventDefault();
    
    var institutions = [];
    var $institutions = $('input[name=institution]');
    $institutions.each(function(){
      institutions.push($(this).val());
    });

    
    var degrees = [];
    var $degrees = $('input[name=degree]');
    $degrees.each(function(){
      degrees.push($(this).val());
    });
 

    var grades = [];
    var $grades = $('input[name=grade]');
    $grades.each(function(){
      grades.push($(this).val());
    });

    var starts = [];
    var $starts = $('input[name=start]');
    $starts.each(function(){
      starts.push($(this).val());
    });

    var ends = [];
    var $ends = $('input[name=end]');
    $ends.each(function(){
      ends.push($(this).val());
    });

    var subjects = [];
    var $subjects = $('input[name=subject]');
    $subjects.each(function(){
      subjects.push($(this).val());
    });

    var data = [];
    for(var i = 0; i < institutions.length ; i++){
      data.push({
        institution : institutions[i],
        degree : degrees[i],
        grade : grades[i],
        subject : subjects[i],
        start : starts[i],
        end : ends[i]
      });
    }

    
    var finalData = {
      type : 'education',
      emp_id  : this.state.userId,
      educations : data
    }

    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_PERSONAL_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(finalData)
    }).then(res =>res.json());

    $('#education_info').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }
  }

  removeExperiences(i){
    let experiences2 = [...this.state.experiences2];
    experiences2.splice(i, 1);
    this.setState({ experiences2 });
  }

  createExperience(){
    return this.state.experiences2.map((el,i) => (
      <div className="card" key={i}>
        <div className="card-body"  id="experienceId">
            <h3 className="card-title">Experience Information<a href="#" className="delete-icon" onClick={this.removeExperiences.bind(this, i)}><i className="fa fa-trash-o" /></a></h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" value={el.name} name="companyname" id={i} onChange={this.changeExperience.bind(this, i)}/>
                  <label className="focus-label">Company Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" value={el.location} name="location" id={i} onChange={this.changeExperience.bind(this, i)}/>
                  <label className="focus-label">Location</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <input type="text" className="form-control floating" value={el.position} name="position" id={i} onChange={this.changeExperience.bind(this, i)}/>
                  <label className="focus-label">Job Position</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <div className="cal-icon">
                    <input type="text" className="form-control floating from" value={el.from} name="from" id={i} onChange={this.changeExperience.bind(this, i)}/>
                  </div>
                  <label className="focus-label">Period From</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group form-focus">
                  <div className="cal-icon">
                    <input type="text" className="form-control floating to"  value={el.to} name="to" id={i} onChange={this.changeExperience.bind(this, i)}/>
                  </div>
                  <label className="focus-label" >Period To</label>
                </div>
              </div>
            </div>
          </div>
      </div>
    ))
  }

  async changeExperience(i, e){
      const { name, value } = e.target;
      let experiences2 = [...this.state.experiences2];
      if(name === 'companyname'){
        let dy = 'name';
        experiences2[i] = {...experiences2[i], [dy]: value};
      }
      else{
        experiences2[i] = {...experiences2[i], [name]: value};
      }
      
      this.setState({ experiences2 });
  }

  cloneExperience(e){
    e.preventDefault();
    this.setState(prevState => ({ 
        experiences2: [...prevState.experiences2, { name :"",position:"",location:"",from:"",to:"" }]
    }))
  }

  clickPhoto(e){
    this.setState({
      photo : e.target.files[0],
      imgname : e.target.files[0].name
    }); 
  }

  async addBankDetail(e){
    e.preventDefault();
    let bankname = document.querySelector('#bankname').value;
    let bankno = document.querySelector('#bankno').value;

    this.setState({
      bnameError : '',
      banknoError : ''
    });

    var error = false;

    if(bankname === ''){
      this.setState({bnameError : 'Field is required!'});
      error = true;
    }
    else if(bankname.length < 3){
      this.setState({bnameError : 'Bank name must be atleast 3 char long.'});
      error = true;
    }

    if(bankno === ''){
      this.setState({banknoError : 'Field is required!'});
      error = true;
    }
    else if(bankno.length < 6){
      this.setState({banknoError : 'Bank account no. must be atleast 6 char long.'});
      error = true;
    }

    if(error){
      return;
    }


    var data = {
      id : this.state.userId,   
      bank : bankname,
      account_no : bankno
    };


    var fetchData = await fetch(API_URL + USER_PROFILE_BANK_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res =>res.json());
    $('#bank_info_modal').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }

  }

  async AddExperience(e){
    e.preventDefault();
    
    var companynames = [];
    var $companynames = $('input[name=companyname]');
    $companynames.each(function(){
      companynames.push($(this).val());
    });

    var positions = [];
    var $positions = $('input[name=position]');
    $positions.each(function(){
      positions.push($(this).val());
    });
 
    var locations = [];
    var $locations = $('input[name=location]');
    $locations.each(function(){
      locations.push($(this).val());
    });

    var froms = [];
    var $froms = $('input[name=from]');
    $froms.each(function(){
      froms.push($(this).val());
    });

    var tos = [];
    var $tos = $('input[name=to]');
    $tos.each(function(){
      tos.push($(this).val());
    });

    var data = [];
    for(var i = 0; i < companynames.length ; i++){
      data.push({
        name : companynames[i],
        position : positions[i],
        location : locations[i],
        from  : froms[i],
        to : tos[i]
      });
    }

    var finalData = {
      type : 'experience',
      emp_id  : this.state.userId,
      experiences : data
    }

    var fetchData =  await fetch(API_URL+ EMPLOYEE_PROFILE_PERSONAL_UPDATE,{
      method: 'post',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(finalData)
    }).then(res =>res.json());

    $('#experience_info').modal('hide');
    if(fetchData.code === 200){
      this.loadUser();
      this.setState({
        alert : true,
        message : fetchData.message,
        msgType : 'success'
      })
    }
    else{
      this.setState({
        alert : true,
        message : 'Internal error occured',
        msgType : 'danger'
      })
    }
  }

  cloneEmergency(e){
    e.preventDefault();
    this.setState(prevState => ({ 
        emergency2: [...prevState.emergency2, { name: "", relation: "", phone : "",phone2 : ""}]
    }))
  }

  removeEmergency(i){
    let emergency2 = [...this.state.emergency2];
    emergency2.splice(i, 1);
    this.setState({ emergency2 });
  }

  createEmergency(){
    return this.state.emergency2.map((el,i) => (
      <div className="card" key={i}>
        <div className="card-body" id="copythis" >
            <h3 className="card-title">Primary Contact <a href="#" className="delete-icon" onClick={this.removeEmergency.bind(this, i)}><i className="fa fa-trash-o" /></a></h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={el.name} name="priname" id={i} onChange={this.changeEmergency.bind(this, i)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Relationship <span className="text-danger">*</span></label>
                <input className="form-control" type="text" name="prirelation" id={i} value={el.relation} onChange={this.changeEmergency.bind(this, i)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Phone <span className="text-danger">*</span></label>
                <input className="form-control" type="text" name="priphone" id={i} value={el.phone} onChange={this.changeEmergency.bind(this, i)}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Phone 2</label>
                <input className="form-control" type="text" name="priphone2" id={i} value={el.phone2} onChange={this.changeEmergency.bind(this, i)}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  }

  async changeEmergency(i, e){
    const { name, value } = e.target;
      let emergency2 = [...this.state.emergency2];
      if(name === 'priname'){
        var dy = 'name';
        emergency2[i] = {...emergency2[i], [dy]: value};
      }
      if(name === 'prirelation'){
        var dy = 'relation';
        emergency2[i] = {...emergency2[i], [dy]: value};
      }
      if(name === 'priphone'){
        var dy = 'phone';
        emergency2[i] = {...emergency2[i], [dy]: value};
      }
      if(name === 'priphone2'){
        var dy = 'phone2';
        emergency2[i] = {...emergency2[i], [dy]: value};
      }
      this.setState({ emergency2 })
  }

   render() {
   const {user,doj,father,name,email,address,mobile,designation,pincode,state,country,dob,sex,nameError,emailError,addressError,mobileError,fatherError,designationError,pincodeError,stateError,dojError,countryError,dobError,sexError,posts,employee, facebook, facebookError, twitter, twitterError, github, githubError, linkedin, linkedinError, alert,message,msgType, passport_no,children,spouse,expiry_date,phone,religion,nationality,marrital_status,personal_info,priname,prirelation,priphone,priphone2,secname,secrelation,secphone,secphone2,prinameError,prirelationError,priphoneError,priphone2Error,secnameError,secrelationError,secphoneError,secphone2Error,bankname, account_no,ifsc_code,pan_no,salary,salarytype,paymenttype,bnameError,ifscError,banknoError, foreigner, foreignerError, emergency} = this.state;
     return (
      <div className="main-wrapper">  
          <Header/> 
      <div>
         <div className="page-wrapper">
             <Helmet>
               <title>Employee Profile - HRMS admin Template</title>
               <meta name="description" content="Reactify Blank Page" />
             </Helmet>
             {/* Page Content */}
             <div className="content container-fluid">
               {/* Page Header */}
               <div className="page-header">
                 <div className="row">
                   <div className="col-sm-12">
                     <h3 className="page-title">Profile</h3>
                     <ul className="breadcrumb">
                       <li className="breadcrumb-item"><a href="/employee/dashboard">Dashboard</a></li>
                       <li className="breadcrumb-item active">Profile</li>
                     </ul>
                   </div>
                 </div>
               </div>
               {/* /Page Header */}
               {/* Alert */}
               {alert &&
                 <div className={"alert  alert-dismissible fade show alert-"+msgType} role="alert">
                    {message}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
               }
               {employee !== null && 
               <div className="card mb-0">
                 <div className="card-body">
                   <div className="row">
                     <div className="col-md-12">
                       <div className="profile-view">
                         <div className="profile-img-wrap">
                           <div className="profile-img">
                             <a href="#"><img alt="" src={this.state.profilepic !== null ? CORE+'uploads/photo/'+ this.state.profilepic : Avatar_02} /></a>
                           </div>
                         </div>
                         <div className="profile-basic">
                           <div className="row">
                             <div className="col-md-5">
                               <div className="profile-info-left">
                                 <h3 className="user-name m-t-0 mb-0">{employee.name}</h3>
                                 {/* <h6 className="text-muted">UI/UX Design Team</h6> */}
                                 <small className="text-muted">{employee.post.post}</small>
                                 <div className="staff-id">Employee ID : EP-000{employee.id}</div>
                                 <div className="small doj text-muted">Date of Join : {moment(employee.doj).format('DD MMM Y')}</div>
                                
                               </div>
                             </div>
                             <div className="col-md-7">
                               <ul className="personal-info">
                                 <li>
                                   <div className="title">Phone:</div>
                                   <div className="text"><a href="">{employee.mobile}</a></div>
                                 </li>
                                 <li>
                                   <div className="title">Email:</div>
                                   <div className="text"><a href="">{employee.email}</a></div>
                                 </li>
                                 <li>
                                   <div className="title">Birthday:</div>
                                   <div className="text">{moment(employee.dob).format('DD MMMM')}</div>
                                 </li>
                                 <li>
                                   <div className="title">Address:</div>
                                   <div className="text">{employee.address}</div>
                                 </li>
                                 <li>
                                   <div className="title">Gender:</div>
                                   <div className="text">{employee.sex}</div>
                                 </li>
                                 <li>
                                   <div className="title">Foreigner:</div>
                                   <div className="text text-info">{employee.foreigner ? 'Yes' : 'No'}</div>
                                 </li>
                                 <li>
                                   <div className="title">Annual Leaves:</div>
                                   <div className="text text-info">{employee.holiday}</div>
                                 </li>
                                 <li>
                                   <div className="title">Remaining Annual Leaves:</div>
                                   <div className="text text-danger">{employee.remain_holiday}</div>
                                 </li>
                                 {/* <li>
                                   <div className="title">Reports to:</div>
                                   <div className="text">
                                     <div className="avatar-box">
                                       <div className="avatar avatar-xs">
                                         <img src={Avatar_16} alt="" />
                                       </div>
                                     </div>
                                     <a href="/orange/app/profile/employee-profile">
                                       Jeffery Lalor
                                     </a>
                                   </div>
                                 </li> */}
                               </ul>
                             </div>
                           </div>
                         </div>
                         <div className="pro-edit"><a data-target="#profile_info" data-toggle="modal" className="edit-icon" href="#"><i className="fa fa-pencil" /></a></div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               }
               {/* review */}
               <div className="card tab-box">
                 <div className="row user-tabs">
                   <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                     <ul className="nav nav-tabs nav-tabs-bottom">
                       <li className="nav-item"><a href="#emp_profile" data-toggle="tab" className="nav-link active">Profile</a></li>
                       {/* <li className="nav-item"><a href="#emp_projects" data-toggle="tab" className="nav-link">Projects</a></li> */}
                       <li className="nav-item"><a href="#bank_statutory" data-toggle="tab" className="nav-link">Bank &amp; Statutory </a></li>
                     </ul>
                   </div>
                 </div>
               </div>
               <div className="tab-content">
                 {/* Profile Info Tab */}
                 
                 <div id="emp_profile" className="pro-overview tab-pane fade show active">
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Personal Informations <a href="#" className="edit-icon" data-toggle="modal" data-target="#personal_info_modal"><i className="fa fa-pencil" /></a></h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Passport No.</div>
                               <div className="text">{passport_no === '' ?  '-' : passport_no}</div>
                             </li>
                             <li>
                               <div className="title">Passport Exp Date.</div>
                               <div className="text">{expiry_date === '' ? '-' : moment(expiry_date).format('D MMM Y')}</div>
                             </li>
                             <li>
                               <div className="title">Tel</div>
                               <div className="text"><a href="">{phone === '' ? '-' : phone}</a></div>
                             </li>
                             <li>
                               <div className="title">Nationality</div>
                               <div className="text">{nationality === '' ?  '-' : nationality}</div>
                             </li>
                             <li>
                               <div className="title">Religion</div>
                               <div className="text">{religion === ''  ?  '-' : religion}</div>
                             </li>
                             <li>
                               <div className="title">Marital status</div>
                               <div className="text">{marrital_status === '' ?  '-' : marrital_status}</div>
                             </li>
                             <li>
                               <div className="title">Employment of spouse</div>
                               <div className="text">{spouse === '' ?  '-' : spouse}</div>
                             </li>
                             <li>
                               <div className="title">No. of children</div>
                               <div className="text">{children === '' ?  '-' : children}</div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                         <h3 className="card-title">Emergency Contact <a href="#" className="edit-icon" data-toggle="modal" data-target="#emergency_contact_modal"><i className="fa fa-pencil" /></a></h3>
                            {emergency !== null ?
                              emergency.map((item,index) => {
                                return(
                                  <div key={index}>
                                    <h5 className="section-title">Primary</h5>
                                    <ul className="personal-info">
                                      <li>
                                        <div className="title">Name</div>
                                        <div className="text">{item.name === '' ? '-' : item.name}</div>
                                      </li>
                                      <li>
                                        <div className="title">Relationship</div>
                                        <div className="text">{item.relation === '' ? '-' : item.relation}</div>
                                      </li>
                                      <li>
                                        <div className="title">Phone </div>
                                        <div className="text">{item.phone === '' ? '-' : item.phone} {item.phone2 === '' ? '-' : item.phone2}</div>
                                      </li>
                                    </ul>
                                  </div>
                                )
                              })
                              :
                              <div>
                                <h5 className="section-title">Primary</h5>
                                <ul className="personal-info">
                                  <li>
                                    <div className="title">Name</div>
                                    <div className="text">-</div>
                                  </li>
                                  <li>
                                    <div className="title">Relationship</div>
                                    <div className="text">-</div>
                                  </li>
                                  <li>
                                    <div className="title">Phone </div>
                                    <div className="text">-</div>
                                  </li>
                                </ul>
                              </div>
                            }
                         </div>
                       </div>
                     </div>
                   </div>
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                             <h3 className="card-title">Bank information <a href="#" className="edit-icon" data-toggle="modal" data-target="#bank_info_modal"><i className="fa fa-pencil" /></a></h3>
                           <ul className="personal-info">
                             <li>
                               <div className="title">Bank name</div>
                               <div className="text">{bankname === '' ? '-' : bankname}</div>
                             </li>
                             <li>
                               <div className="title">Bank account No.</div>
                               <div className="text">{account_no === '' ? '-' : account_no}</div>
                             </li>
                           </ul>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Family Information <a href="#" className="edit-icon" data-toggle="modal" data-target="#family_info_modal"><i className="fa fa-pencil" /></a></h3>
                           <div className="table-responsive">
                             <table className="table table-nowrap">
                               <thead>
                                 <tr>
                                   <th>Name</th>
                                   <th>Relationship</th>
                                   <th>Date of Birth</th>
                                   <th>Phone</th>
                                   {/* <th /> */}
                                 </tr>
                               </thead>
                               <tbody>
                                 {this.state.members !== null &&
                                   this.state.members.map((item,index) => {
                                     return(
                                      <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.relation}</td>
                                        <td>{moment(item.dob).format('DD MMM Y')}</td>
                                        <td>{item.phone}</td>
                                        {/* <td className="text-right">
                                          <div className="dropdown dropdown-action">
                                            <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <a href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                                              <a href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                            </div>
                                          </div>
                                        </td> */}
                                      </tr>
                                     )
                                   })
                                 }
                                 
                               </tbody>
                             </table>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                   {/* review 1 */}
                   <div className="row">
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Education Informations <a href="#" className="edit-icon" data-toggle="modal" data-target="#education_info"><i className="fa fa-pencil" /></a></h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                             {
                                 this.state.educations !== null &&
                                 this.state.educations.map((item,index) => {
                                   return(
                                    <li key={index}>
                                      <div className="experience-user">
                                        <div className="before-circle" />
                                      </div>
                                      <div className="experience-content">
                                        <div className="timeline-content">
                                          <a href="/" className="name">{item.institution} {item.grade}</a>
                                          <div>{item.degree} {item.subject}</div>
                                          <span className="time">{moment(item.start).format('Y')} - {moment(item.end).format('Y')}</span>
                                        </div>
                                      </div>
                                    </li>
                                   ) 
                                })
                              }
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-md-6 d-flex">
                       <div className="card profile-box flex-fill">
                         <div className="card-body">
                           <h3 className="card-title">Experience <a href="#" className="edit-icon" data-toggle="modal" data-target="#experience_info"><i className="fa fa-pencil" /></a></h3>
                           <div className="experience-box">
                             <ul className="experience-list">
                               {
                                 this.state.experiences !== null &&
                                  this.state.experiences.map((item,index) => {
                                    return(
                                      <li key={index}>
                                        <div className="experience-user">
                                          <div className="before-circle" />
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <a href="#" className="name">{item.postion} at {item.name}</a>
                                            <span className="time">{moment(item.from).format('MMM Y')} to  {moment(item.to).format('MMM Y')}</span>
                                          </div>
                                        </div>
                                      </li>
                                    )
                                  })
                               }
                             </ul>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* /Profile Info Tab */}
                 {/* Projects Tab */}
                 <div className="tab-pane fade" id="emp_projects">
                   <div className="row">
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><a href="/orange/app/projects/projects-view">Office Management</a></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">1</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">9</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><a href="/orange/app/projects/projects-view">Project Management</a></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">2</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">5</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><a href="/orange/app/projects/projects-view">Video Calling App</a></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">3</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">3</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3">
                       <div className="card">
                         <div className="card-body">
                           <div className="dropdown profile-action">
                             <a aria-expanded="false" data-toggle="dropdown" className="action-icon dropdown-toggle" href="#"><i className="material-icons">more_vert</i></a>
                             <div className="dropdown-menu dropdown-menu-right">
                               <a data-target="#edit_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-pencil m-r-5" /> Edit</a>
                               <a data-target="#delete_project" data-toggle="modal" href="#" className="dropdown-item"><i className="fa fa-trash-o m-r-5" /> Delete</a>
                             </div>
                           </div>
                           <h4 className="project-title"><a href="/orange/app/projects/projects-view">Hospital Administration</a></h4>
                           <small className="block text-ellipsis m-b-15">
                             <span className="text-xs">12</span> <span className="text-muted">open tasks, </span>
                             <span className="text-xs">4</span> <span className="text-muted">tasks completed</span>
                           </small>
                           <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and
                             typesetting industry. When an unknown printer took a galley of type and
                             scrambled it...
                           </p>
                           <div className="pro-deadline m-b-15">
                             <div className="sub-title">
                               Deadline:
                             </div>
                             <div className="text-muted">
                               17 Apr 2019
                             </div>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Project Leader :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Jeffery Lalor"><img alt="" src={Avatar_16} /></a>
                               </li>
                             </ul>
                           </div>
                           <div className="project-members m-b-15">
                             <div>Team :</div>
                             <ul className="team-members">
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Doe"><img alt="" src={Avatar_02} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Richard Miles"><img alt="" src={Avatar_09} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="John Smith"><img alt="" src={Avatar_10} /></a>
                               </li>
                               <li>
                                 <a href="#" data-toggle="tooltip" title="Mike Litorus"><img alt="" src={Avatar_05} /></a>
                               </li>
                               <li>
                                 <a href="#" className="all-users">+15</a>
                               </li>
                             </ul>
                           </div>
                           <p className="m-b-5">Progress <span className="text-success float-right">40%</span></p>
                           <div className="progress progress-xs mb-0">
                             <div style={{width: '40%'}} data-toggle="tooltip" role="progressbar" className="progress-bar bg-success" data-original-title="40%" />
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 {/* /Projects Tab */}
                 {/* Bank Statutory Tab */}
                 <div className="tab-pane fade" id="bank_statutory">
                   <div className="card">
                     <div className="card-body">
                       <h3 className="card-title"> Basic Salary Information</h3>
                       <form>
                         <div className="row">
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Salary Type</label>
                               <input type="text" className="form-control" placeholder="Type your salary amount" defaultValue={salarytype} disabled/>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Salary amount <small className="text-muted">per month</small></label>
                               <div className="input-group">
                                 <div className="input-group-prepend">
                                   <span className="input-group-text">$</span>
                                 </div>
                                 <input type="text" className="form-control" placeholder="Type your salary amount" defaultValue={salary} disabled/>
                               </div>
                             </div>
                           </div>
                           <div className="col-sm-4">
                             <div className="form-group">
                               <label className="col-form-label">Payment type</label>
                               <input type="text" className="form-control" placeholder="Type your salary amount" defaultValue={paymenttype} disabled/>
                             </div>
                           </div>
                         </div>
                         {
                          !foreigner &&
                          <div>
                            <hr />
                           <h3 className="card-title"> TAP and SCP Contribution </h3>
                           <div className="row">
                             <div className="col-sm-4">
                               <div className="form-group">
                                 <label className="col-form-label">TAP contribution</label>
                                 <input type="text" className="form-control" placeholder="Type your salary amount" value={this.state.tapper + '%'} disabled/>
                               </div>
                             </div>
                             <div className="col-sm-4">
                               <div className="form-group">
                                 <label className="col-form-label">SCP Contribution<span className="text-danger">*</span></label>
                                 <input type="text" className="form-control" placeholder="Type your salary amount" value={this.state.scpper + '%'} disabled/>
                               </div>
                             </div>
                           </div>
                          </div>
                         }
                       </form>
                     </div>
                   </div>
                 </div>
                 {/* /Bank Statutory Tab */}
               </div>
             </div>
             {/* /Page Content */}
             {/* Profile Modal */}
             <div id="profile_info" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Profile Information</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="row">
                         <div className="col-md-12">
                           <div className="profile-img-wrap edit-img">
                             <img className="inline-block" src={this.state.profilepic !== null ? CORE+'uploads/photo/'+ this.state.profilepic : Avatar_02} alt="user" />
                             <div className="fileupload btn">
                               <span className="btn-text">edit</span>
                               <input className="upload" type="file" onChange={this.clickPhoto}/>
                              
                             </div>
                             
                           </div>
                           <p className="text-center">
                                 selected file - {this.state.imgname !== null ? this.state.imgname : '...'}
                            </p>
                           <div className="row">
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Name <span className="text-danger">*</span></label>
                                 <input type="text" className="form-control" value={name} onChange={this.changeName}/>
                                 {
                                   nameError &&
                                   <p className="text-danger">{nameError}</p>
                                 }
                               </div>
                             </div>
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Father Name <span className="text-danger">*</span></label>
                                 <input type="text" className="form-control" value={father} onChange={this.changeFather}/>
                                 {
                                   fatherError &&
                                   <p className="text-danger">{fatherError}</p>
                                 }
                               </div>
                             </div>
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Email <span className="text-danger">*</span></label>
                                 <input type="email" className="form-control" value={email} onChange={this.changeEmail}/>
                                 {
                                   emailError &&
                                   <p className="text-danger">{emailError}</p>
                                 }
                               </div>
                             </div>
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Birth Date <span className="text-danger">*</span></label>
                                 <div className="cal-icon">
                                   <input className="form-control" id="dob" type="text" value={dob} onChange={this.changeDob}/>
                                   {
                                      dobError &&
                                      <p className="text-danger">{dobError}</p>
                                   }
                                 </div>
                               </div>
                             </div>
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Gender <span className="text-danger">*</span></label>
                                 <select className="form-control" value={sex} onChange={this.changeSex}>
                                  <option value=""  >Select one</option>
                                   <option value="male" >Male</option>
                                   <option value="female">Female</option>
                                 </select>
                                 {
                                    sexError &&
                                    <p className="text-danger">{sexError}</p>
                                 }
                               </div>
                             </div>
                             <div className="col-md-6">
                               <div className="form-group">
                                 <label>Date of Joining</label>
                                 <div className="cal-icon">
                                   <input className="form-control" id="doj" type="text" value={doj} disabled/>
                                   {
                                      dojError &&
                                      <p className="text-danger">{dojError}</p>
                                   }
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-md-12">
                           <div className="form-group">
                             <label>Address <span className="text-danger">*</span></label>
                             <input type="text" className="form-control" value={address} onChange={this.changeAddress} />
                             {
                                addressError &&
                                <p className="text-danger">{addressError}</p>
                             }
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>State</label>
                             <input type="text" className="form-control" value={state} onChange={this.changeState} />
                             {
                                stateError &&
                                <p className="text-danger">{stateError}</p>
                             }
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Country</label>
                             <input type="text" className="form-control" value={country} onChange={this.changeCountry}/>
                             {
                                countryError &&
                                <p className="text-danger">{countryError}</p>
                             }
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Pin Code</label>
                             <input type="text" className="form-control" value={pincode} onChange={this.changePincode} />
                             {
                                pincodeError &&
                                <p className="text-danger">{pincodeError}</p>
                             }
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Phone Number <span className="text-danger">*</span></label>
                             <input type="text" className="form-control" value={mobile} onChange={this.changeMobile} />
                             {
                                mobileError &&
                                <p className="text-danger">{mobileError}</p>
                             }
                           </div>
                         </div>
                         
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Designation <span className="text-danger">*</span></label>
                             <select className="form-control" value={designation}  disabled>
                               { posts !== null &&
                                 posts.map((item,index)=>{
                                   return(
                                    <option value={item.id} key={index}>{item.post}</option>
                                   )
                                 })
                               }
                             </select>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Facebook</label>
                             <input type="text" className="form-control" value={facebook} onChange={this.changeFacebook} />
                           </div>
                         </div>
                         
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Linkedin</label>
                             <input type="text" className="form-control" value={linkedin} onChange={this.changeLinkedin} />
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Github</label>
                             <input type="text" className="form-control" value={github} onChange={this.changeGithub} />
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Are you foreigner <span className="text-danger">*</span></label>
                             <select className="form-control" value={foreigner} onChange={this.changeForeigner}>
                              <option value=""  >Select one</option>
                               <option value="1" >Yes</option>
                               <option value="0">No</option>
                             </select>
                             {
                                foreignerError &&
                                <p className="text-danger">{foreignerError}</p>
                             }
                           </div>
                         </div>
                       </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.updateProfile}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Profile Modal */}
             {/* Personal Info Modal */}
             <div id="personal_info_modal" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Personal Information</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="row">
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Passport No</label>
                             <input type="text" className="form-control" value={passport_no} onChange={this.changePassport_no}/>
                            
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Passport Expiry Date</label>
                             <div className="cal-icon">
                               <input className="form-control" id="pxds" type="text"/>
                             </div>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Tel</label>
                             <input className="form-control" type="text" value={phone} onChange={this.changePhone}/>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Nationality <span className="text-danger">*</span></label>
                             <input className="form-control" type="text" value={nationality} onChange={this.changeNationality}/>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Religion</label>
                               <input className="form-control" type="text" value={religion} onChange={this.changeReligion}/>
                   
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Marital status <span className="text-danger">*</span></label>
                             <select className=" form-control" value={marrital_status} onChange={this.changeMarrital_status}>
                               <option value="">-</option>
                               <option value="single">Single</option>
                               <option value="married">Married</option>
                             </select>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>Employment of spouse</label>
                             <input className="form-control" type="text" placeholder="Yes/No" value={spouse} onChange={this.changeSpouse}/>
                           </div>
                         </div>
                         <div className="col-md-6">
                           <div className="form-group">
                             <label>No. of children </label>
                             <input className="form-control" type="number" value={children} onChange={this.changeChildren}/>
                           </div>
                         </div>
                       </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.updatePassport}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Personal Info Modal */}
             {/* Family Info Modal */}
             <div id="family_info_modal" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title"> Family Information</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="form-scroll" >
                          {this.createMember()}
                       </div>
                       <div className="add-more ml-2">
                               <a href="#" onClick={this.cloneMember}><i className="fa fa-plus-circle" /> Add More</a>
                       </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.addFamilyMember}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Family Info Modal */}
             {/* Emergency Contact Modal */}
             <div id="emergency_contact_modal" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Emergency Information</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="form-scroll">
                          {this.createEmergency()}
                          <div className="add-more ml-2">
                               <a href="#" onClick={this.cloneEmergency}><i className="fa fa-plus-circle" /> Add More</a>
                         </div>
                       </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.updateContact}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Emergency Contact Modal */}
             {/* Education Modal */}
             <div id="education_info" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title"> Education Informations</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="form-scroll">
                         {this.createEducation()}
                       </div>
                       <div className="add-more ml-2">
                               <a href="#" onClick={this.cloneEducation}><i className="fa fa-plus-circle" /> Add More</a>
                             </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.AddEducation}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Education Modal */}
             {/* Experience Modal */}
             <div id="experience_info" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title">Experience Informations</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="form-scroll">
                         {this.createExperience()}
                       </div>
                       <div className="add-more ml-2">
                          <a href="#"  onClick={this.cloneExperience}><i className="fa fa-plus-circle"/> Add More</a>
                       </div>
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.AddExperience}>Submit</button>
                       </div>
                     </form>
                   </div>
                 </div>
               </div>
             </div>
             {/* /Experience Modal */}
             <div id="bank_info_modal" className="modal custom-modal fade" role="dialog">
               <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                 <div className="modal-content">
                   <div className="modal-header">
                     <h5 className="modal-title"> Bank Informations</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">×</span>
                     </button>
                   </div>
                   <div className="modal-body">
                     <form>
                       <div className="form-scroll" >
                           <div className="card">
                           <div className="card-body" id="memberId">
                             <div className="row">
                               <div className="col-md-6">
                                 <div className="form-group">
                                   <label>Bank Name <span className="text-danger">*</span></label>
                                   <input className="form-control" name="bankname" id="bankname" type="text" required/>
                                   {
                                     bnameError &&
                                     <p className="text-danger mt-1">{bnameError}</p>
                                   }
                                 </div>
                               </div>
                               <div className="col-md-6">
                                 <div className="form-group">
                                   <label>Bank Account Number <span className="text-danger">*</span></label>
                                   <input className="form-control" name="bankno" id="bankno" type="text" required/>
                                   {
                                     banknoError &&
                                     <p className="text-danger mt-1">{banknoError}</p>
                                   }
                                 </div>
                               </div>
                             </div>
                           </div> 
                         </div>
                       </div>
                      
                       <div className="submit-section">
                         <button className="btn btn-primary submit-btn" onClick={this.addBankDetail}>Submit</button>
                       </div>
                     </form>
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
 