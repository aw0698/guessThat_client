import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {loginUser} from "../../api/Login";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onTextboxChangeEmail = this.onTextboxChangeEmail.bind(this);
    this.onTextboxChangePassword = this.onTextboxChangePassword.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
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
  
  async submitLogin() {
    const email = this.state.email;
    const password = this.state.password;
  
    // API POST call to login user
    const res = await loginUser(email, password);
  
    // Clear email and password
    this.setState({
      email: '',
      password: ''
    });
  
    let returnState = {};
    let loginContState = {};
    returnState['isLoading'] = res.isLoading;
    let alerts = res.alerts;
    // Change content to login page with successful account creation
    if(res.success) {
      returnState['token'] = res.token;
      returnState['user_email'] = email;
      if(!res.resetPassword)
        returnState['window'] = 'HomePage';
      
  
      loginContState['email'] = email;
      loginContState['resetPassword'] = res.resetPassword;
      
      alerts.forEach(function(alert,index) {
        this[index]['variant']= 'success';
      }, alerts);
    }
    else {
      alerts.forEach(function(alert,index) {
        this[index]['variant']= 'danger';
      }, alerts);
    }
  
    // Update Login component state
    this.props.updateShowLogin(loginContState);
    // Update App component state
    this.props.updateAppState(returnState, alerts);
  }
  
  checkSubmit(event) {
    if (event.keyCode === 13 || event.which === 13){
      this.submitLogin();
    }
  }
  
  render() {
    return (
      <div>
        <h4 className="modal-title">Login to Your Account</h4>
        <Form>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onTextboxChangeEmail}/>
          </Form.Group>
    
          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onTextboxChangePassword} onKeyDown={this.checkSubmit}/>
          </Form.Group>
    
    
          <Button className="forgot-password-link" variant="link" onClick={() => this.props.toggleShowLogin('ForgotPassword')}>Forgot Password?</Button>
          <Button className="btn btn-block btn-lg" variant="primary" onClick={this.submitLogin} >
            Log In
          </Button>
        </Form>
      </div>
    )
  }
}

export default Login;