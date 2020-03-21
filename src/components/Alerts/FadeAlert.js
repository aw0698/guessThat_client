import * as React from "react";
import Alert from "react-bootstrap/Alert";
import '../../styles/alerts.css';

class FadeAlert extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: true,
      className:'visibleAlert'
    };
    this.setTimer = this.setTimer.bind(this);
  }
  
  componentDidMount() {
    this.setTimer();
  }
  
  setTimer () {
    // clear any existing timer
    if(this._timer !== null)
      clearTimeout(this._timer);
  
    // hide after `delay` milliseconds
    this._timer = setTimeout(function() {
      this.setState({className: 'hideAlert'});
      this.sleep(500)
        .then(() => {
          this.setState({visible: false});
        });
      this._timer = null;
    }.bind(this),this.props.delay);
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  componentWillUnmount() {
    clearTimeout(this._timer);
  }
  
  render () {
    return (
      this.state.visible ?
      <Alert className={this.state.className} variant={this.props.variant} onClose={() => this.setState({visible: false})} dismissible>
        {this.props.msg}
      </Alert>: ''
    );
  }
}

export default FadeAlert;