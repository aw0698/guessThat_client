import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {resetPassword} from "../../api/Login";

class ChangePassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      newPassword: "",
      confirmNewPassword: ""
    }
    this.onTextboxChangeNewPassword = this.onTextboxChangeNewPassword.bind(this);
    this.onTextboxChangeConfirmNewPassword = this.onTextboxChangeConfirmNewPassword.bind(this);
    this.submitChangePassword = this.submitChangePassword.bind(this);
    this.checkSubmit = this.checkSubmit.bind(this);
  }
  
  onTextboxChangeNewPassword(event) {
    this.setState({
      newPassword: event.target.value
    });
  }
  
  onTextboxChangeConfirmNewPassword(event) {
    this.setState({
      confirmNewPassword: event.target.value
    });
  }
  
  async submitChangePassword() {
    const email = this.props.email;
    const newPassword = this.state.newPassword;
    const confirmNewPassword = this.state.confirmNewPassword;
    
    // API POST call to login user
    const res = await resetPassword(email, newPassword, confirmNewPassword);
    
    // Clear email and password
    this.setState({
      newPassword: '',
      confirmNewPassword: ''
    });
    
    let returnState = {};
    returnState['isLoading'] = res.isLoading;
    let alerts = res.alerts;
    // Change content to login page with successful account creation
    if(res.success) {
      returnState['window'] = 'HomePage';
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
      this.submitChangePassword(event);
    }
  }
  
  render() {
    return (
      <div>
        <h4 className="modal-title">Change Your Password</h4>
        
        
        <Form.Group className="form-group" controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password" value={this.state.newPassword} onChange={this.onTextboxChangeNewPassword}/>
        </Form.Group>
        
        <Form.Group className="form-group" controlId="formBasicConfirmNewPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={this.state.confirmNewPassword} onChange={this.onTextboxChangeConfirmNewPassword}/>
        </Form.Group>
        
        <Button className="btn btn-block btn-lg" variant="primary" onClick={this.submitChangePassword}>
          Change Password
        </Button>
      </div>
    )
  }
}

export default ChangePassword;