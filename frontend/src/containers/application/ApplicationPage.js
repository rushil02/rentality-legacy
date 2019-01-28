import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Navbar from "containers/common/Navbar";

import 'components/application/Application.css'
import BookingDetails from "../../components/application/BookingDetails";
import TenantDetails from "../../components/application/TenantDetails";
import HouseRules from "../../components/application/HouseRules";
import Payment from "../../components/application/Payment";
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
      data: null,
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
      errors: {},
    };
  }

  // componentDidMount= () => {
  //   // get data from backend and put it in state tree
  //   // axios.get(API, {
  //   //   params: {
  //   //     start_date: new Date(),
  //   //     end_date: new Date(),
  //   //     promo_code: []
  //   //   }
  //   // })
  //   //   .then(result => this.setState({
  //   //       data: result.data,
  //   //       isLoading: false
  //   //     })
  //   //   )
  //   //   .catch(error => this.setState({
  //   //     error,
  //   //     isLoading: false
  //   //   }));
  //
  //   this.setState({
  //     "bookingDetails": {
  //       "totalRent": 1200,
  //       "calculatedRent": 500,
  //       "serviceFee": 700,
  //       "moveIn": "02 Oct 2018", //
  //       "moveOut": "28 Oct 2018", //
  //       "bookingDuration": 5, // days
  //       "guests": 3, //
  //       "discount": true, //
  //       "percentageDiscount": 20, //
  //       "discountSavings": 200 //
  //     },
  //     "data": {
  //       "total_rent": 1200,
  //       "calculated_rent": 500,
  //       "service_fee": 700,
  //     },
  //     "house": {
  //       "id": 1,
  //       "homeOwner": "Elliott",
  //       "location": "Location 1",
  //       "title": "House 1",
  //       "furnished": "Y",
  //       "addressHidden": "1",
  //       "address": "hello st",
  //       "bedrooms": 3,
  //       "bathrooms": 2,
  //       "parking": 1,
  //       "rent": 100, // Assumed to be cost per day
  //       "minStay": 28,
  //       "maxStay": 30,
  //       "maxPeopleAllowed": 3,
  //       "description": "A nice 3 bedroom apartment",
  //       "otherRules": "",
  //       "otherPeopleDescription": "",
  //       "accessRestrictions": "",
  //       "neighbourhoodDescription": "",
  //       "status": "P",
  //       "uuid": "b883f493-24ce-4c52-8c22-8d5748aaa9af",
  //       "createdOn": "2019-01-22T11:03:15.615791Z",
  //       "updatedOn": "2019-01-22T11:15:23.611375Z",
  //       "homeType": 1,
  //       "cancellationPolicy": "Moderate", // Should this have more information to show what 'Moderate' means for example?
  //       "promoCodes": [],
  //       "facilities": [
  //         6,
  //         7,
  //         10,
  //         11,
  //         14
  //       ],
  //       "rules": [
  //         1,
  //         2,
  //         3,
  //         4,
  //         5
  //       ],
  //       "neighbourhood_facilities": [],
  //       "welcome_tags": []
  //     }
  //   })
  // };

  componentDidMount = () => {
    // get data from backend and put it in state tree
    axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), {
      params: {
        start_date: new Date(),
        end_date: new Date(),
        promo_code: []
      }
    })
      .then(result => {
        this.setState({
          "house": {
            "homeOwner": result.data.house.home_owner,
            "location": "1A Fake St, Faketown, Fake ACT", //result.data.house.location.name + ", " + result.data.house.location.subregion_name + ", " + result.data.house.location.region_name,
            "title": result.data.house.title,
            "furnished": result.data.house.furnished,
            "addressHidden": "0",
            "address": result.data.house.address,
            "bedrooms": result.data.house.bedrooms,
            "bathrooms": result.data.house.bathrooms,
            "parking": result.data.house.parking,
            "rent": result.data.house.rent, // Assumed to be cost per day
            "thumbnail": "../../static/image/mail/1_2.png", //result.data.house.thumbnail,
            "latitude": result.data.house.latitude,
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
            "cancellationPolicy": "CANCELLATION POLICY", //result.data.house.cancellation_policy.verbose, // Should this have more information to show what 'Moderate' means for example?
            "facilities": [
              {facility: "Facility 1", value: "Applicable", comment: "Comment"},
              {facility: "Facility 2", value: "Not Applicable", comment: "Comment"}
            ], // result.data.house.facilities,
            "rules": [
              {rule: "Rule 1", value: "Applicable", comment: "Comment"},
              {rule: "Rule 2", value: "Not Applicable", comment: "Comment"}
            ], // result.data.house.rules,
            "neighbourhoodFacilities": result.data.house.neighbourhood_facilities,
            "welcomeTags": result.data.house.welcome_tags,
          },

          "data": {
            "csrfmiddlewaretoken": window.django.csrf,
            "totalRent": 1200,
            "calculatedRent": 500,
            "serviceFee": 700,
          },
          isLoading: false
        })
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));


    this.setState({
      "bookingDetails": {
        "totalRent": 1000, // "window.django.extra_data.total_payment",
        "calculatedRent": 50, // window.django.extra_data.cal_rent,
        "serviceFee": 50, // window.django.extra_data.service_fee,
        "moveIn": "22nd Oct", // window.django.extra_data.move_in_date, //
        "moveOut": "25th Oct", // window.django.extra_data.move_out_date, //
        "bookingDuration": 8, // window.django.extra_data.duration, // days
        "guests": 3, // window.django.extra_data.guests, //
        "discount": false, //
      }
    });
    console.log("STATE", this.state)
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

    axios.post(
      reverse(routes.promo.verify, {"houseUUID": this.state.house.uuid}),
      {data: this.state.discountCode, headers: "csrftoken?"}).then(
      result => {
        console.log(result);
        this.setState(prevState => ({
          ...prevState,
          bookingDetails: {
            ...prevState.bookingDetails,
            discount: true,
            discountTitle: result.title
          }
        }))
      }
    ).error(
      (result) => {
        errors = {...errors, ...result.errors};
        this.setState({errors: errors})
      }
    );
  };

  sendFormData = () => {
    let errors = {};
    console.log("send data to backend", this.state);
    // Application UUID - need csrftoken from django
    axios.post(
      reverse(routes.application.create, {"houseUUID": this.state.house.uuid}),
      {data: this.state.data, headers: "csrftoken?"}).then(
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

  handleSubmitButton = () => {
    let isValidated = this.validateFields()


    if (isValidated) {
      let errors = this.sendFormData();
      if (!errors) {
        this.props.history.push("/apply/summary/" + window.location.pathname.split("/").pop())
      }
    }
  };

  validateFields()

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
    console.log("STATE RENDER", this.state);
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
                  />
                  <HouseRules
                    rules={this.state.house.rules}
                    homeOwner={this.state.house.homeOwner}/>
                  {/*<Payment*/}
                    {/*cardNumber={this.state.payment.cardNumber}*/}
                    {/*cardSurname={this.state.payment.cardSurname}*/}
                    {/*expiryDate={this.state.payment.expiryDate}*/}
                    {/*ccv={this.state.payment.ccv}*/}
                    {/*onFieldChange={this.handlePaymentFieldChange}/>*/}
                  <StripePayment
                    onStripePaymentTokenGenerated={this.handleStripePaymentTokenGenerated}
                    onPaymentFieldChange={this.handlePaymentFieldChange}
                  />
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
                  discountCode={this.state.discountCode}
                  onApplyDiscount={this.handleSendDiscountCode}
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