import React, {Component} from 'react';


export default class TenantDetails extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-5">
            <div className="input no-background top-margin">
              <input type="text" className="form-control"
                     style={{marginBottom: 0}}
                     placeholder="First Name"
                     value={this.props.firstName}
                     onChange={(e) => this.props.onFieldChange("firstName", e.target.value)}/>
              {this.props.errors.firstName && <div style={{color: "red"}}>Please enter you first name</div>}
            </div>
          </div>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Last Name"
                     style={{marginBottom: 0}}
                     value={this.props.lastName}
                     onChange={(e) => this.props.onFieldChange("lastName", e.target.value)}/>
              {this.props.errors.lastName && <div style={{color: "red"}}>Please enter you last name</div>}
            </div>
          </div>
          <div className="col-md-1"/>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Email Address"
                     style={{marginBottom: 0}}
                     value={this.props.emailAddress}
                     onChange={(e) => this.props.onFieldChange("emailAddress", e.target.value)}/>
              {this.props.errors.emailAddress && <div style={{color: "red"}}>Please enter your email</div>}
            </div>
          </div>
          <div className="col-md-5">
            <div className="input no-background">
              <input type="text" className="form-control"
                     placeholder="Phone Number (Optional)"
                     style={{marginBottom: 0}}
                     value={this.props.phoneNumber}
                     onChange={(e) => this.props.onFieldChange("phoneNumber", e.target.value)}/>
              {this.props.errors.phoneNumber && <div style={{color: "red"}}>Please enter you phone number</div>}
            </div>
          </div>
          <div className="col-md-1"/>
          <div className="col-md-5 col-lg-5">
            <div className="select">
              Gender
              <select className="form-control select-gender"
                      value={this.props.gender}
                      style={{marginBottom: 0}}
                      onChange={(e) => this.props.onFieldChange("gender", e.target.value)}
                      placeholder={"-"}>
                <option> </option>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            {this.props.errors.gender && <div style={{color: "red"}}>Please enter your gender</div>}
          </div>
        </div>
        <h3 style={{paddingTop: "30px"}}>Tips on what to write to {this.props.homeOwner}</h3>
        <p>
          Who are you? Are you a Student? What is your occupation?<br/>
          What are you like as a tenant? Are you quiet? Clean? Extroverted?<br/>
          What brings you to this city?<br/>
          What are your hobbies?
        </p>
        <textarea className="form-control" rows="4"
                  value={this.props.comments}
                  onChange={(e) => this.props.onFieldChange("comments", e.target.value)}/>
      </div>
    )
  }
}