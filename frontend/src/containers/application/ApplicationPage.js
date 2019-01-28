import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";

import 'components/application/Application.css'
import BookingDetails from "../../components/application/BookingDetails";
import TenantDetails from "../../components/application/TenantDetails";
import HouseRules from "../../components/application/HouseRules";
import Agreements from "../../components/application/Agreements";
import StripePayment from "../../components/application/StripePayment";

import axios from 'axios';
import {reverse} from 'named-urls';
import routes from "../../routes";

class ApplicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: null,
      bookingDetails: null,
      discountCode: "",
      tenant: {
        "firstName": "",
        "lastName": "",
        "emailAddress": "",
        "phoneNumber": "",
        "gender": "",
        "comments": ""
      },
      payment: {
        "stripeToken": ""
      },
      agreements: {
        "agreeToHouseRules": false,
        "agreeToPay": false,
        "agreeToTermsAndConditions": false
      },
      isLoading: false,
      errors: {"discountCode": "Your discountCode was invalid"},
    };
  }

  componentDidMount = () => {
    // get data from backend and put it in state tree

    axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), { // TODO: change to house.details route
      params: {
        start_date: "2019-01-21T23:29:17.670Z", // FIXME: get window stuff working Rushil
        end_date: "2019-03-21T23:29:17.670Z",
        guests: 2,
        promo_code: []
      }
    })
      .then(result => {
        this.setState({
          "house": {
            "homeOwner": result.data.house.home_owner,
            "location": result.data.house.location.name + ", " + result.data.house.location.subregion_name + ", " + result.data.house.location.region_name,
            "title": result.data.house.title,
            "furnished": result.data.house.furnished,
            "addressHidden": "0",
            "address": result.data.house.address,
            "bedrooms": result.data.house.bedrooms,
            "bathrooms": result.data.house.bathrooms,
            "parking": result.data.house.parking,
            "rent": result.data.house.rent, // Assumed to be cost per day
            "thumbnail": "../../static/image/mail/1_2.png", //result.data.house.thumbnail, // FIXME: Rushil to add thumbnail
            "latitude": result.data.house.latitude, // FIXME: lat and long from backend
            "longitude": result.data.house.longitude,
            "minStay": result.data.house.min_stay,
            "maxStay": result.data.house.max_stay,
            "maxPeopleAllowed": result.data.house.max_people_allowed,
            "description": result.data.house.description,
            "otherRules": result.data.house.other_rules,
            "otherPeopleDescription": result.data.house.other_people_description,
            "accessRestrictions": result.data.house.access_restrictions,
            "neighbourhoodDescription": result.data.house.neighbourhood_description,
            "status": result.data.house.status,
            "uuid": result.data.house.uuid,
            "homeType": result.data.house.home_type,
            "cancellationPolicy": {
              "verbose": "Moderate Policy",
              "description": "Full refund of the deposit (excluding our Service Fee) for cancellation received at least one week prior to the check-in date. After this time, the Tenant will only be entitled to a 50% refund (excluding our Service Fee).",
              "officialPolicy": null
            },
            "facilities": ["Fac 1", "Fac 2"], // result.data.house.facilities,
            "rules": [
              {rule: "Rule 1", value: "Applicable", comment: "Comment"},
              {rule: "Rule 2", value: "Not Applicable", comment: "Comment"}
            ], // result.data.house.rules,
            "neighbourhoodFacilities": result.data.house.neighbourhood_facilities,
            "welcomeTags": result.data.house.welcome_tags,
          }
        })
      })
      .catch(error => this.setState({
        errors: error,
      }));


    // axios.get(reverse(routes.tenant.details)).then(
      this.setState({
        tenant: { // TODO: write the corresponding api route
          "firstName": "Test Name",
          "lastName": "",
          "emailAddress": "",
          "phoneNumber": "",
          "gender": "",
        }
      })
    // );

    axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), {
      params: {
        start_date: "2019-01-21T23:29:17.670Z", // FIXME: get window stuff working Rushil
        end_date: "2019-03-21T23:29:17.670Z",
        guests: 2,
        promo_code: []
      }
    }).then(
      this.setState({
        bookingDetails: { // TODO: write the corresponding api route
          "weeklyRent": 100,
          "totalRent": 400,
          "calculatedRent": 300,
          "serviceFee": 50,
          "discountAmount": 20,
          "discountTitle": "Discount 20%",
          "totalPayable": 5,
          "moveIn": "22 Oct", // TODO: figure out how to get dates from window.django.extra_data
          "moveOut": "28 Oct",
          "guests": 3, // TODO: window.django....
          "bookingDuration": 13,
        }
      })
    );
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
    this.setState(prevState => ({
      ...prevState,
      agreements: {
        ...prevState.agreements,
        [fieldName]: value
      }
    }))
  };

  handleFieldChange = (fieldName, value) => {
    this.setState(prevState => ({
      ...prevState,
      [fieldName]: value
    }))
  };



  handleSendDiscountCode = (discountCode) => {
    console.log("sending discount code to backend:", discountCode);
    let errors = {};

    axios.post( // FIXME: make this route
      reverse(routes.promo.verify, {"houseUUID": this.state.house.uuid}),
      {data: this.state.discountCode, headers: window.django.csrf}
    ).then(resp => {
        this.setState(prevState => ({
          ...prevState,
          bookingDetails: {
            ...prevState.bookingDetails,
            discountCode: 3948493, // result.code,
            discountTitle: "20% Off!"//result.title,
          }
        }))
      }
    ).then((resp) => {
      axios.post(
        reverse(routes.application.bookingDetails, {"houseUUID": this.state.house.uuid}),
        {
          data: {
            discountCode: discountCode,
            start_date: "2019-01-21T23:29:17.670Z", // FIXME: get window stuff working Rushil
            end_date: "2019-03-21T23:29:17.670Z",
            guests: 2,
            promo_code: []
          },
          headers: window.django.csrf
        }
      )
    }).then(resp => {
        this.setState(prevState => ({
          ...prevState,
          bookingDetails: {
            ...prevState.bookingDetails,
            "discountAmount": resp.discountAmount, // TODO: get discountAmount and totalPayable in bookingDetails resp.
            "totalPayable": resp.totalPayable,
          }
        }))
      }
    ).error((result) => {
      errors = {...errors, ...result.errors};
      this.setState({errors: errors})
    });
  };

  sendFormData = () => {
    let errors = {};
    let bookingDetails = {
      startDate: window.django.extra_data, // TODO: figure this out
      endDate: window.django.extra_data,
      promoCodes: window.django.extra_data,
      guests: window.django.extra_data
    };

    let dataToSend = {...this.state.payment, ...this.state.tenant, ...this.state.agreements, ...bookingDetails};
    axios.post(
      reverse(routes.application.create, {"houseUUID": this.state.house.uuid}),
      {data: dataToSend, headers: "csrftoken?"}).then(
      result => console.log(result)
    ).error(
      (result) => {
        console.log(result);
        errors = {...errors, ...result.errors};
      }
    );

    //FIXME: Get Application UUID
    const stripeToken = this.state.payment.stripeToken;
    const applicationUUID = '';
    const data = {
      stripeToken: stripeToken
    };
    axios.post('/apply/payment/' + applicationUUID, data).then(
      (result) => console.log(result)
    ).error(
      (result) => {
        console.log(result);
        errors = {...errors, ...result.errors};
      }
    );

    axios.post('/apply/tenant/' + applicationUUID, this.state.tenant).then(
      (result) => console.log(result)
    ).error(
      (result) => {
        console.log(result);
        errors = {...errors, ...result.errors};
      }
    );

    this.setState({errors: errors});
    return errors
  };

  validateFields = () => {
    let errors = {};

    let tenantFields = [
      "firstName",
      "lastName",
      "emailAddress",
      "phoneNumber",
      "gender",
    ];

    let agreementFields = [
      "agreeToHouseRules",
      "agreeToPay",
      "agreeToTermsAndConditions"
    ];

    for (let field of tenantFields) {
      if (!this.state.tenant[field]) {
        errors[field] = true
      }
    }

    if (!this.state.payment.stripeToken) {
        errors["stripeToken"] = true
    }

    for (let field of agreementFields) {
      if (!this.state.agreements[field]) {
        errors[field] = true
      }
    }

    this.setState({errors: errors})
    return errors;
  };

  handleSubmitButton = () => {
    let errors = this.validateFields();

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      console.log("NO ERRORS?", errors);
      let backendErrors = this.sendFormData();
      if (!backendErrors) {
        this.props.history.push("/apply/summary/" + window.location.pathname.split("/").pop())
      }
    }
  };

  handleSaveButton = () => {
    this.sendFormData();
  };

  handleStripePaymentTokenGenerated = (stripeToken) => {
    this.setState(prevState => ({
      ...prevState,
      payment: {
        ...prevState.payment,
        stripeToken: stripeToken
      }
    }))
  };

  render() {
    console.log("HOUSE", this.state.errors);
    if (!(this.state.bookingDetails && this.state.tenant && this.state.house)) {
      return null
    }
    return (
      <React.Fragment>
        <Navbar/>
        <div className="page-apply-now">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-xl-8">
                <div className="left">
                  <h1>Application for {this.state.house.homeOwner}'s Home </h1>
                  <TenantDetails
                    homeOwner={this.state.house.homeOwner}
                    firstName={this.state.tenant.firstName}
                    lastName={this.state.tenant.lastName}
                    phoneNumber={this.state.tenant.phoneNumber}
                    gender={this.state.tenant.gender}
                    comments={this.state.tenant.comments}
                    onFieldChange={this.handleTenantFieldChange}
                    errors={this.state.errors}/>
                  <HouseRules
                    rules={this.state.house.rules}
                    homeOwner={this.state.house.homeOwner}/>
                  <StripePayment
                    onStripePaymentTokenGenerated={this.handleStripePaymentTokenGenerated}
                    onPaymentFieldChange={this.handlePaymentFieldChange}
                    errors={this.state.errors}/>
                  <Agreements
                    agreeToHouseRules={this.state.agreements.agreeToHouseRules}
                    agreeToPay={this.state.agreements.agreeToPay}
                    agreeToTermsAndConditions={this.state.agreements.agreeToTermsAndConditions}
                    onFieldChange={this.handleAgreementsFieldChange}
                    errors={this.state.errors}/>
                </div>
              </div>
              <div className="col-lg-5 col-xl-4">
                <BookingDetails
                  houseDetails={this.state.house}
                  bookingDetails={this.state.bookingDetails}
                  onFieldChange={this.handleFieldChange}
                  onApplyDiscount={this.handleSendDiscountCode}
                  errors={this.state.errors}
                />
              </div>
              <div className="col-12">
                <div className="button">
                  <button type="button" className="btn btn-link" onClick={this.handleSaveButton}>Save Application</button>
                  <button type="button" className="btn btn-link" onClick={this.handleSubmitButton}>Book Now</button>
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