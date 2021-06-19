import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
// import './style.css';
import {FRONTEND_URL,ADMIN_LOGIN_URL, EMPLOYEE_LOGIN_URL} from '../Contants';
import Logo from '../assets/img/smarthrm-logobig.png';

class Landing extends Component{
    constructor(props){
        super(props);
        this.state={

        }

        this.redirectDashboard = this.redirectDashboard.bind(this);
    }

    async redirectDashboard(){
      var user = await localStorage.getItem('user');
      
      if(user !== null){
          var type = await localStorage.getItem('type');
          if(type === 'employee'){
            this.props.history.push('employee/dashboard');
          }
          else{
            this.props.history.push('admin/dashboard');
          }
      }
    }
   
    componentDidMount(){
        this.redirectDashboard();
    }
    render(){
    return(
       <div>

		    <div className="container" style={{
          position:'fixed',
          top: '40%',
          left: '45%',
          marginTop: '-9em', /*set to a negative number 1/2 of your height*/
          marginLeft: '-15em', 
         /*set to a negative number 1/2 of your width*/
        }}>
			   <div className="content">
				   <div className="title">
					  <img alt="Smart HRM" src={Logo} />
				   </div>
           <br />
           <a href={EMPLOYEE_LOGIN_URL} className='btn btn-custom btn-lg text-light' style={{backgroundColor : 'orange'}} >Employee Login</a>
           <a href={ADMIN_LOGIN_URL} className='btn btn-custom btn-lg text-light' style={{backgroundColor : 'orange', marginLeft : 20}}>HR Administrator Panel</a>
          <br />
         <br />
			  </div>
		   </div>
    </div>

    )
    }
}

export default Landing;