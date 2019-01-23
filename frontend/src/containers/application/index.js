import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";
import Details from "./Details";
import Form from "../../components/application/Form";
import 'components/application/Application.css'

class ApplicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      house: null,
      tenant: {
        "firstName": "",
        "lastName": "",
        "emailAddress": "",
        "phoneNumber": "",
        "gender": "",
        "comments": ""
      },
      payment: {
        "cardNumber": "",
        "cardSurname": "",
        "expiryDate": "",
        "ccv": ""
      },
      agreements: {
        "agreeToHomeRules": false,
        "agreeToPay": false,
        "agreeToTermsAndConditions": false
      },
      isLoading: false,
      error: null,
    };
  }

  componentDidMount= () => {
    // get data from backend and put it in state tree
    // axios.get(API, {
    //   params: {
    //     start_date: new Date(),
    //     end_date: new Date(),
    //     promo_code: []
    //   }
    // })
    //   .then(result => this.setState({
    //       data: result.data,
    //       isLoading: false
    //     })
    //   )
    //   .catch(error => this.setState({
    //     error,
    //     isLoading: false
    //   }));

    this.setState({
      "data": {
        "total_rent": 1200,
        "calculated_rent": 500,
        "service_fee": 700,
      },
      "house": {
        "id": 1,
        "homeOwner": "Elliott",
        "location": null,
        "title": "House 1",
        "furnished": "Y",
        "addressHidden": "1",
        "address": "hello st",
        "bedrooms": null,
        "bathrooms": null,
        "parking": 1,
        "rent": 1000,
        "minStay": 28,
        "maxStay": 30,
        "maxPeopleAllowed": 3,
        "description": "",
        "other_rules": "",
        "otherPeopleDescription": "",
        "accessRestrictions": "",
        "neighbourhoodDescription": "",
        "status": "P",
        "uuid": "b883f493-24ce-4c52-8c22-8d5748aaa9af",
        "createdOn": "2019-01-22T11:03:15.615791Z",
        "updatedOn": "2019-01-22T11:15:23.611375Z",
        "homeType": 1,
        "cancellationPolicy": null,
        "promoCodes": [],
        "facilities": [
          6,
          7,
          10,
          11,
          14
        ],
        "rules": [
          1,
          2,
          3,
          4,
          5
        ],
        "neighbourhood_facilities": [],
        "welcome_tags": []
      }
    })
  };

  handleTenantFieldChange = (fieldName, value) => {
    this.setState(prevState => ({
      ...prevState,
      tenant: {
        ...prevState.tenant,
        [fieldName]: value
      }
    }))
  };

  handlePaymentFieldChange = (fieldName, value) => {
    this.setState(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        [fieldName]: value
      }
    }))
  };

  handleAgreementsFieldChange = (fieldName, value) => {
    console.log("AGREEMENTS", fieldName, value);
    this.setState(prevState => ({
      ...prevState,
      agreements: {
        ...prevState.agreements,
        [fieldName]: value
      }
    }))
  };

    render() {
      if (!this.state.data) {
        return null
      }
        return (
          <React.Fragment>
            <Navbar/>
              <div className="page-apply-now">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7 col-xl-8">
                      <Form
                        homeOwner={this.state.house.homeOwner}
                        firstName={this.state.tenant.firstName}
                        lastName={this.state.tenant.lastName}
                        phoneNumber={this.state.tenant.phoneNumber}
                        gender={this.state.tenant.gender}
                        comments={this.state.tenant.comment}
                        onTenantFieldChange={this.handleTenantFieldChange}
                        rules={this.state.house.rules}
                        cardNumber={this.state.payment.cardNumber}
                        cardSurname={this.state.payment.cardSurname}
                        expiryDate={this.state.payment.expiryDate}
                        ccv={this.state.payment.ccv}
                        onPaymentFieldChange={this.handlePaymentFieldChange}
                        agreeToHomeRules={this.state.agreements.agreeToHomeRules}
                        agreeToPay={this.state.agreements.agreeToPay}
                        agreeToTermsAndConditions={this.state.agreements.agreeToTermsAndConditions}
                        onAgreementsFieldChange={this.handleAgreementsFieldChange}
                      />
                    </div>
                    <div className="col-lg-5 col-xl-4">
                      <Details/>
                    </div>
                    <div className="col-12">
                      <div className="button">
                        <button type="button" className="btn btn-link">Apply Now</button>
                        <button type="button" className="btn btn-link">Save application</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </React.Fragment>
        );
    }
}

export default ApplicationPage;