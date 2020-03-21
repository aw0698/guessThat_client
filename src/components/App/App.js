import React from 'react';
import LoginContainer from '../Login/loginContainer';
import '../../styles/App.css';

import {verifyLoggedIn, logoutUser} from '../../api/Login';

import {
  getFromStorage,
} from '../../utils/storage';
import Spinner from "react-bootstrap/Spinner";
import FadeAlert from "../Alerts/FadeAlert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      alertMessages: [],
      email: '',
      isLoggedIn: false,
      window: 'Login',
    };
    this.updateAppState = this.updateAppState.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  
  async componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj['token']) {
      //Verify token
      var res = await verifyLoggedIn(obj['token']);
      
      this.setState({isLoggedIn: res.isLoggedIn, token: obj['token'], isLoading: false});
      if(this.state.isLoggedIn && !res.resetPassword){
        this.setState({window:'HomePage'});
      }
      
    } else {
        this.setState({
          isLoading: false,
        });
    }
    console.log("Token: " + this.state.token);
  }
  
  updateAppState(state, alerts) {
    if(alerts != null){
      let newAlerts = this.state.alertMessages;
      newAlerts = newAlerts.concat(alerts);
      this.setState({alertMessages: newAlerts});
    }
    this.setState({
      ...state
    });
  }
  
  
  deleteMessage(message, index){
    let alerts = this.state.alertMessages;
    alerts = alerts.slice(0, index).concat(alerts.slice(index+1, alerts.length));
    this.setState({
      alertMessages: alerts
    });
  }
  
  async logOut() {
    const res = await logoutUser(this.state.token);
    this.setState({...res});
  }
  
  render() {
    let showSpinner, content;
    let incrementDelay = 1000;
    
    if(this.state.isLoading){
      showSpinner =
        <Container fluid className="spinnerContainer position-absolute vh-100">
          <Row className="justify-content-center">
            <Col xs="auto" sm="auto">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>;
            </Col>
          </Row>
        </Container>
    }
    
    
    switch (this.state.window) {
      
      case 'HomePage':
        content = <div><h1>YOU LOGGED IN!</h1><Button onClick={this.logOut}>Log out</Button></div>;
        break;
  
      case 'Login':
      default:
        content = <LoginContainer updateAppState={this.updateAppState} />;
        break;
    }
    
    var totalAlerts = this.state.alertMessages.length;
    
    return (
      <div className="">
        {showSpinner}
        
        <div className="alertsContainer position-fixed col-10 col-sm-4 m-2 ">
          {this.state.alertMessages.map((obj, index) =>
            <FadeAlert key={index} delay={(5000 + ((totalAlerts)*incrementDelay)) - (index*incrementDelay)} variant={obj.variant} msg={obj.msg}/>
            
          )}
        </div>
        {content}
      </div>
    );
  }
}

export default App;
