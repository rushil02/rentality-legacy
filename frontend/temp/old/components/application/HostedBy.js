import React, {Component} from 'react';
import '../../components/application/Application.css'

export default class HostedBy extends Component {
  render() {
    return (
      <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
        <h2 style={{fontSize: "20px", fontWeight: "700", color: "#84d8d1"}}>Hosted By: {this.props.homeOwner}</h2>
        <div className="padding">
          <div>
            Your host is here to help, you will find their contact details in your confirmation email.
            Feel free to message them with any questions.
          </div>
        </div>
      </div>
    );
  }
}
