import React from "react";
import Login from "./Login";
import Signup from './Signup';

import '../../styles/Login/login.css';

import Button from "react-bootstrap/Button";

import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";



class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: 'LogIn',
      resetPassword: false,
      email: ''
    };
    this.toggleShowLogin = this.toggleShowLogin.bind(this);
    this.updateShowLogin = this.updateShowLogin.bind(this);
  }
  
  toggleShowLogin(value){
    this.setState({showLogin: value});
  }
  
  updateShowLogin(showLogin){
    this.setState({
      ...showLogin
    });
    
    console.log("UPDATE SHOW LOGIN");
    console.log(showLogin);
    console.log(this.state);
    //If User Logged in but needs to reset password, go to reset password page
    if(this.state.resetPassword){
      this.setState({showLogin: 'ChangePassword'});
    }
    
    //If User Logged in successfully and doesn't have to reset password, go to home page
    if(!this.state.resetPassword && this.state.email !== ''){
      this.props.updateAppState({window: 'HomePage', email: this.state.email});
    }
    console.log(this.state);
  }
  
  render() {
    let content, subcontent;
    switch (this.state.showLogin) {
  
      case 'SignUp':
        content = <Signup updateAppState={this.props.updateAppState} toggleShowLogin={this.toggleShowLogin}/>;
        subcontent = <div>
          Have an account?
          <Button variant="link" onClick={() => this.toggleShowLogin('LogIn')}>Log in</Button>
        </div>;
        break;
        
      case 'ForgotPassword':
        content = <ForgotPassword updateAppState={this.props.updateAppState} toggleShowLogin={this.toggleShowLogin}/>;
        subcontent = <div>
          Want to Log In?
          <Button variant="link" onClick={() => this.toggleShowLogin('LogIn')}>Log in</Button>
        </div>;
        break;
        
      case 'ChangePassword':
        content = <ChangePassword email={this.state.email} updateAppState={this.props.updateAppState}/>;
        break;
  
      
      case 'LogIn':
      default:
        content = <Login updateAppState={this.props.updateAppState} updateShowLogin={this.updateShowLogin} toggleShowLogin={this.toggleShowLogin}/>;
        subcontent = <div>
          Don't have an account?
          <Button variant="link" onClick={() => this.toggleShowLogin('SignUp')}>Sign up</Button>
        </div>;
        break;
    }
    
    return (
      <div>
        <div className="login-form center-div col-11 col-sm-5 mt-5">
          {content}
        </div>
        <div className="center-div col-11 col-sm-5 mt-1">
          {subcontent}
        </div>
      </div>
    );
  }
}

export default LoginContainer;