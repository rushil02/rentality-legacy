import React, {Component} from 'react';


export default class Agreements extends Component {
  render() {
    return (
      <div className="checkbox auto-width">
        <ul className="list-inline">
          <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" id="checkbox-1" className="custom-control-input"
                     checked={this.props.agreeToHomeRules}
                     onChange={(e) => this.props.onFieldChange("agreeToHomeRules", e.target.checked)}/>
              <label className="custom-control-label" htmlFor="checkbox-1">
                I agree to abide by the home rules
              </label>
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
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
