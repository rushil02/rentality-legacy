import React, {Component} from 'react';


export default class TenantDetails extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="input no-background top-margin">
              <input type="text" className="form-control"
                     placeholder="First Name"
                     value={this.props.firstName}
                     onChange={(e) => this.props.onFieldChange("firstName", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Last Name"
                     value={this.props.lastName}
                     onChange={(e) => this.props.onFieldChange("lastName", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-1"/>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Email Address"
                     value={this.props.emailAddress}
                     onChange={(e) => this.props.onFieldChange("emailAddress", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Phone Number (Optional)"
                     value={this.props.phoneNumber}
                     onChange={(e) => this.props.onFieldChange("phoneNumber", e.target.value)}/>
            </div>
          </div>
          <div className="col-md-1"/>
          <div className="col-md-5 col-lg-5">
            <div className="select">
              Gender
              <select className="form-control select-gender"
                      value={this.props.gender}
                      onChange={(e) => this.props.onFieldChange("gender", e.target.value)}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>
        </div>
        <h3>Tips on what to write to {this.props.homeOwner}</h3>
        <p>
          Who are you? Are you a Student? What is your occupation?<br/>
          What are you like as a tenant? Are you quiet? Clean? Extroverted?<br/>
          What brings you to this city?<br/>
          What are your hobbies?
        </p>
        <textarea className="form-control" rows="4"
                  value={this.props.comment}
                  onChange={(e) => this.props.onFieldChange("comment", e.target.value)}/>
      </div>
    )
  }
}