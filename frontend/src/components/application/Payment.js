import React, {Component} from 'react';


export default class Payment extends Component {
  render() {
    return (
      <div>
        <h2>Payment</h2>
        <p>Please Note: You will not be charged until the host approves your
          application.</p>
        <div className="row">
          <div className="col-md-8">
            <div className="input no-background top-margin">
              <input type="text" className="form-control"
                     placeholder="Card Number"
                     value={this.props.cardNumber}
                     onChange={(e) => this.props.onFieldChange("cardNumber", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-4"/>
          <div className="col-md-8">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Surname"
                     value={this.props.cardSurname}
                     onChange={(e) => this.props.onFieldChange("cardSurname", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-4"/>
          <div className="col-md-4">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Expiry Date"
                     value={this.props.expiryDate}
                     onChange={(e) => this.props.onFieldChange("expiryDate", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="CCV"
                     value={this.props.ccv}
                     onChange={(e) => this.props.onFieldChange("ccv", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-4"/>
        </div>
        <p className="red">Card number is not correct.</p>
      </div>
    );
  }
}