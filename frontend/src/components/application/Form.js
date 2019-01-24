import React, {Component} from 'react';
import TenantDetails from "./TenantDetails";
import HouseRules from "./HouseRules";
import Payment from "./Payment";
import Agreements from "./Agreements";
import StripePayment from './StripePayment';


class Form extends Component {
  render() {
    return (
      <div className="left">
        <h1>Application for {this.props.homeOwner}'s Home </h1>
        <TenantDetails
          homeOwner={this.props.homeOwner}
          firstName={this.props.firstName}
          lastName={this.props.lastName}
          phoneNumber={this.props.phoneNumber}
          gender={this.props.gender}
          comments={this.props.comments}
          onFieldChange={this.props.onTenantFieldChange}
        />
        <HouseRules
          rules={this.props.rules}
          homeOwner={this.props.homeOwner}/>
        <StripePayment 
          onStripePaymentTokenGenerated={this.props.onStripePaymentTokenGenerated}
        />
        <Agreements
          agreeToHouseRules={this.props.agreeToHouseRules}
          agreeToPay={this.props.agreeToPay}
          agreeToTermsAndConditions={this.props.agreeToTermsAndConditions}
          onFieldChange={this.props.onAgreementsFieldChange}/>
      </div>
    );
  }
}

export default Form;