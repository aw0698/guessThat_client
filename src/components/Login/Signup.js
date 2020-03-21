import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createUser} from "../../api/Login";

class Signup extends React.Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.onTextboxChangeConfirmPassword = this.onTextboxChangeConfirmPassword.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }
  
  onTextboxChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  
  onTextboxChangePassword(event) {
    this.setState({
      password: event.target.value
    });
  }
  
  onTextboxChangeConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }
  
  async submitSignUp() {
    const email = this.state.email;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
  
    // API POST call to login user
    const res = await createUser(email, password, confirmPassword);
    console.log(res);
    // Clear email and password
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    let returnState = {};
    returnState['isLoading'] = res.isLoading;
    let alerts = res.alerts;
    // Change content to login page with successful account creation
    if(res.success) {
      this.props.toggleShowLogin('LogIn');
      alerts.forEach(function(alert,index) {
        this[index]['variant']= 'success';
      }, alerts);
    }
    else {
      alerts.forEach(function(alert,index) {
        this[index]['variant']= 'danger';
      }, alerts);
    }
    // Update parent component state
    this.props.updateAppState(returnState, alerts);
  }
  
  checkSubmit(event) {
    if (event.keyCode === 13 || event.which === 13){
      this.submitSignUp(event);
    }
  }
  
  render() {
    return (
      <div>
        <h4 className="modal-title">Create Your Account</h4>
  
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onTextboxChangeEmail}/>
        </Form.Group>
  
        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onTextboxChangePassword}/>
        </Form.Group>
  
        <Form.Group className="form-group" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.onTextboxChangeConfirmPassword} onKeyDown={this.checkSubmit}/>
        </Form.Group>
        
        <Button className="btn btn-block btn-lg" variant="primary" onClick={this.submitSignUp}>
          Create Account
        </Button>
      </div>
    )
  }
}

export default Signup;