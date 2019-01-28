import React, {Component} from 'react';


export default class Agreements extends Component {
  render() {
    return (
      <div className="checkbox auto-width">
        <ul className="list-inline">
          <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="checkbox-1" className="custom-control-input"
                     checked={this.props.agreeToHouseRules}
                     onChange={(e) => this.props.onFieldChange("agreeToHouseRules", e.target.checked)}/>
              <label className="custom-control-label" htmlFor="checkbox-1">
                I agree to abide by the owner's house rules
              </label>
              {this.props.errors.agreeToHouseRules && <div style={{color: "red"}}>Please agree to the house rules before progressing</div>}
            </div>
          </li>
          <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="checkbox-2" className="custom-control-input"
                     checked={this.props.agreeToPay}
                     onChange={(e) => this.props.onFieldChange("agreeToPay", e.target.checked)}/>
              <label className="custom-control-label" htmlFor="checkbox-2">
                I agree to pay the total amount shown if the host accepts my application
              </label>
              {this.props.errors.agreeToHouseRules && <div style={{color: "red"}}>Please agree to the payment terms before progressing</div>}
            </div>
          </li>
          <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="checkbox-3" className="custom-control-input"
                     checked={this.props.agreeToTermsAndConditions}
                     onChange={(e) => this.props.onFieldChange("agreeToTermsAndConditions", e.target.checked)}/>
              <label className="custom-control-label" htmlFor="checkbox-3">
                I accept Rentality's Terms and Conditions
              </label>
              {this.props.errors.agreeToHouseRules && <div style={{color: "red"}}>Please agree to the T&Cs before progressing</div>}
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
