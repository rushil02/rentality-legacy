import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";
import 'components/application/Application.css'
import BookingDetails from "../../components/application/BookingDetails";
import TenantDetails from "../../components/application/TenantDetails";
import HouseRules from "../../components/application/HouseRules";
import Payment from "../../components/application/Payment";
import Agreements from "../../components/application/Agreements";

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
        "cardNumber": "",
        "cardSurname": "",
        "expiryDate": "",
        "ccv": ""
      },
      agreements: {
        "agreeToHouseRules": false,
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
      "bookingDetails": {
        "totalRent": 1200,
        "calculatedRent": 500,
        "serviceFee": 700,
        "moveIn": "02 Oct 2018", //
        "moveOut": "28 Oct 2018", //
        "bookingDuration": 5, // days
        "guests": 3, //
        "discount": true, //
        "percentageDiscount": 20, //
        "discountSavings": 200 //
      },
      "data": {
        "total_rent": 1200,
        "calculated_rent": 500,
        "service_fee": 700,
      },
      "house": {
        "id": 1,
        "homeOwner": "Elliott",
        "location": "Location 1",
        "title": "House 1",
        "furnished": "Y",
        "addressHidden": "1",
        "address": "hello st",
        "bedrooms": 3,
        "bathrooms": 2,
        "parking": 1,
        "rent": 100, // Assumed to be cost per day
        "minStay": 28,
        "maxStay": 30,
        "maxPeopleAllowed": 3,
        "description": "A nice 3 bedroom apartment",
        "other_rules": "",
        "otherPeopleDescription": "",
        "accessRestrictions": "",
        "neighbourhoodDescription": "",
        "status": "P",
        "uuid": "b883f493-24ce-4c52-8c22-8d5748aaa9af",
        "createdOn": "2019-01-22T11:03:15.615791Z",
        "updatedOn": "2019-01-22T11:15:23.611375Z",
        "homeType": 1,
        "cancellationPolicy": "Moderate", // Should this have more information to show what 'Moderate' means for example?
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
    console.log("sending discount code to backend:", discountCode)
    // get request to check whether discount code is valid
    //   fetch().then((resp) => this.setState(prevState => ({
    //     ...prevState,
    //     bookingDetails: {
    //       ...prevState.bookingDetails,
    //       discountCode: 20,
    //       discount: true
    //     }
    //   })))
  };

  handleSubmitButton = () => {
    console.log("send data to backend", this.state);
    // an exmaple of what should be sent to backend
    // fetch(url, ..., this.props.state)
    //   .then((resp) => {
    //     this.setState({
    //       bookingDetails: resp.bookingDetails,
    //       house: resp.house,
    //     })
    //   })
  };

  handleSaveButton = () => {
    console.log("save form to backend?", this.state)
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
                <div className="left">
                  <h1>Application for {this.props.homeOwner}'s Home </h1>
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
                  <Payment
                    cardNumber={this.state.payment.cardNumber}
                    cardSurname={this.state.payment.cardSurname}
                    expiryDate={this.state.payment.expiryDate}
                    ccv={this.state.payment.ccv}
                    onFieldChange={this.handlePaymentFieldChange}/>
                  <Agreements
                    agreeToHouseRules={this.state.agreements.agreeToHouseRules}
                    agreeToPay={this.state.agreements.agreeToPay}
                    agreeToTermsAndConditions={this.state.agreements.agreeToTermsAndConditions}
                    onFieldChange={this.handleAgreementsFieldChange}/>
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
                  <button type="button" className="btn btn-link" onClick={this.handleSubmitButton}>Book Now</button>
                  <button type="button" className="btn btn-link" onClick={this.handleSaveButton}>Save Application</button>
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