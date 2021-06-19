import React ,{ Component }from 'react';
import Header from '../initialpage/Sidebar/header';
import SidebarContent from '../initialpage/Sidebar/sidebar';
import $ from 'jquery'
import {API_URL} from '../Contants';

class Demo extends Component{
    constructor(props){
        super(props);
        this.state = {
            // dynamical: [{al_name: "", al_value: ""}],
            // dynamicded : [{al_name: "", al_value: ""}]
            dynamical: [],
            dynamicded : [],
            al : [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.handleDedChange = this.handleDedChange.bind(this);
        this.addDedClick = this.addDedClick.bind(this);
        this.loadPayroll = this.loadPayroll.bind(this);
        this.changePayroll = this.changePayroll.bind(this);
    }

    async loadPayroll(){
      var fetchData = await fetch(API_URL + 'admin/edit/payroll/1').then(res => res.json());
      if(fetchData.code === 200){
          if(fetchData.data !== null)
          {
            //   var res = JSON.parse(fetchData.data.add_al);
              console.log(fetchData.data.add_al);
              if(fetchData.data.add_al !== ''){
                  this.setState({
                      dynamical : fetchData.data.add_al
                  })
              }
              if(fetchData.data.ded_al !== ''){
                this.setState({
                    dynamicded : fetchData.data.ded_al
                })
              }
          }
            // this.setState({al : fetchData.data});
      }
      else{
        alert('Error');
      }
    }

    componentDidMount(){
        this.loadPayroll();
    }

    handleChange(i, e) {
        const { name, value } = e.target;
      let dynamical = [...this.state.dynamical];
      dynamical[i] = {...dynamical[i], [name]: value};
      this.setState({ dynamical });
    }

    handleDedChange(i, e) {
        const { name, value } = e.target;
      let dynamicded = [...this.state.dynamicded];
      dynamicded[i] = {...dynamicded[i], [name]: value};
      this.setState({ dynamicded });
    }
   
    addClick(e){
        e.preventDefault();
        this.setState(prevState => ({ 
            dynamical: [...prevState.dynamical, { al_name: "", al_value: "" }]
        }))
    }

    addDedClick(e){
        e.preventDefault();
        this.setState(prevState => ({ 
            dynamicded: [...prevState.dynamicded, { al_name: "", al_value: "" }]
        }))
    }

    removeClick(i){
        let dynamical = [...this.state.dynamical];
        dynamical.splice(i, 1);
        this.setState({ dynamical });
    }

    removeDedClick(i){
        let dynamicded = [...this.state.dynamicded];
        dynamicded.splice(i, 1);
        this.setState({ dynamicded });
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + JSON.stringify(this.state.dynamical));
        event.preventDefault();
    }

    createUI(){
        return this.state.dynamical.map((el, i) => ( 
          <div className="row mt-4" key={i}>
            <div className="col-sm-7 m-0 pr-0">
            <input type="text" className="form-control" name="al_name"  value={el.al_name} onChange={this.handleChange.bind(this, i)}/>
            </div>
            <div className="col-sm-3 pl-1 pr-0">
            <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleChange.bind(this, i)}/>
            </div>
            <div className="col-sm-1 pl-2 pr-3">
            <button className="btn btn-danger btn-sm mt-2" onClick={this.removeClick.bind(this, i)}>
                <span className="fa fa-minus"></span>
            </button>    
            </div>
          </div>      
        ))
    }
    
    createDUI(){
        return this.state.dynamicded.map((el, i) => ( 
          <div className="row mt-4" key={i}>
            <div className="col-sm-7 m-0 pr-0">
            <input type="text" className="form-control" name="al_name" value={el.al_name} onChange={this.handleDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-3 pl-1 pr-0">
            <input type="number"  name="al_value" className="form-control" value={el.al_value} onChange={this.handleDedChange.bind(this, i)}/>
            </div>
            <div className="col-sm-1 pl-2 pr-3">
            <button className="btn btn-danger btn-sm mt-2" onClick={this.removeDedClick.bind(this, i)}>
                <span className="fa fa-minus"></span>
            </button>    
            </div>
          </div>      
        ))
    }

    async changePayroll(){
      const {netsal, basic,tap, scp,dynamicded,dynamical} = this.state;
      var data = {
          emp_id : 1,
          net : netsal,
          basic : basic,
          scp : scp,
          tap : tap,
          al : dynamical,
          ded : dynamicded
      }

      var fetchData = await  fetch(API_URL + 'admin/update/payroll/1',{
        method : 'post',
            headers:{'content-type': 'application/json'},
            body : JSON.stringify(data)
        }).then(res=>res.json());
    
        if(fetchData.code === 200){
            // $('#add_client').modal('hide');
            // this.loadClients();
            // this.setState({
            //     alert : true,
            //     message : fetchData.message,
            //     msgType : 'success'
            // })
        }
        else{
        // this.setState({
        //     alert : true,
        //     message : 'Internal server error.',
        //     msgType : 'danger'
        // })
       }
    }
    render(){
        return(
            <div className="mt-5">
                {console.log(this.state.dynamical)}
               <button className='btn btn-custom' data-toggle="modal" data-target="#editPayrollModal">click me</button>
               <div className="modal fade" id="editPayrollModal" tabIndex="-1" role="dialog" aria-labelledby="editPayrollModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editPayrollModalLabel">Edit Payroll</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row"> 
                                <div className="col-sm-6"> 
                                    <div className="form-group">
                                    <label>Select Employeee</label>
                                    <input type="text" className="form-control" disabled />
                                    </div>
                                </div>
                                <div className="col-sm-6"> 
                                    <label>Net Salary</label>
                                    <input className="form-control" type="number" disabled/>
                                    {/* {netsalaryError && 
                                        <p className="text-danger mt-1">{netsalaryError}</p>
                                    } */}
                                </div>
                                </div>
                                <div className="row row-eq-height"> 
                                <div className="col-sm-6"> 
                                    <h4 className="text-primary">Earnings</h4>
                                    <div className="form-group">
                                    <label>Basic</label>
                                    <input className="form-control" type="number" disabled/>
                                    {/* {basicError && 
                                        <p className="text-danger mt-1">{basicError}</p>
                                    } */}
                                    </div>
                                    {this.createUI()} 
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addClick}><span className="fa fa-plus"></span></button>
                                </div>
                                <div className="col-sm-6">  
                                    <h4 className="text-primary">Deductions</h4>
                                    <div className="form-group">
                                    <label>TAP(5%)</label>
                                    <input className="form-control" type="number" value={"tap"} disabled/>
                                    {/* {
                                        tapError &&
                                        <p className="text-danger mt-1">{tapError}</p>
                                    } */}
                                    </div> 
                                    <div className="form-group">
                                    <label>SCP(3.5%)</label>
                                    <input className="form-control" type="number" value={"scp"} disabled/>
                                    {/* {
                                        scpError &&
                                        <p className="text-danger mt-1">{scpError}</p>
                                    } */}
                                    </div>
                                    {this.createDUI()}
                                    <button className="btn btn-secondary btn-sm mt-3" onClick={this.addDedClick}><span className="fa fa-plus"></span></button>
                                </div>
                                   
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            
                            <button type="button" className="btn btn-primary" onClick={this.changePayroll}>Update</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Demo;
