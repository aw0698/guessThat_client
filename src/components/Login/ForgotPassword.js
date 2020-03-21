import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {forgotPassword} from "../../api/Login";

class ForgotPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
    };
    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.submitChangeForgotPassword = this.submitChangeForgotPassword.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }
  
  onTextboxChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }
  
  async submitChangeForgotPassword() {
    const email = this.state.email;
    this.props.updateAppState({isLoading: true});
    // API POST call to login user
    const res = await forgotPassword(email);
    // console.log(res);
    // Clear email and password
    this.setState({
      email: "",
    });
    console.log("CHANGED STATE");
    console.log(this.state);
    
    let returnState = {};
    returnState['isLoading'] = false;
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
      this.submitChangeForgotPassword(event);
    }
  }
  
  render() {
    return (
      <div>
        <h4 className="modal-title">Reset Your Password</h4>
        
        <Form.Group className="form-group" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={this.state.email} onChange={this.onTextboxChangeEmail} onKeyDown={this.checkSubmit}/>
        </Form.Group>
        
        <Button className="btn btn-block btn-lg" variant="primary" onClick={this.submitChangeForgotPassword}>
          Reset Password
        </Button>
      </div>
    );
  }
}

export default ForgotPassword;