import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";
import '../../components/application/Application.css'
import BookingDetails from "../../components/application/BookingDetails";
import TenantDetails from "../../components/application/TenantDetails";
import HouseRules from "../../components/application/HouseRules";
import Payment from "../../components/application/Payment";
import Agreements from "../../components/application/Agreements";
import BookingDetailsSummary from "../../components/application/BookingDetailsSummary";
import HouseRulesSummary from "../../components/application/HouseRulesSummary";
import HostedBy from "../../components/application/HostedBy";
import axios from "axios";
import {reverse} from "named-urls";
import routes from "../../routes";
import {GoogleMap, Marker} from "react-google-maps";


class BookingConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      house: null,
      data: null,
      bookingDetails: null,
      discountCode: "",
      isLoading: false,
      error: null,
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
  //       "discountSavings": 200, //
  //       "referenceNumber": "1938495"
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
  //       "otherRules": "These are some other rules that may be important. I don't know if they are but " +
  //         "if you think you may want to use them by all means do.",
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
    console.log("WINDOW DJANGOey", window.django);
    // get data from backend and put it in state tree
    axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), {
      params: {
        start_date: new Date(),
        end_date: new Date(),
        promo_code: []
      }
    })
      .then(result => {
        console.log("RESULTI", result)
        this.setState({
          "house": {
            "homeOwner": result.data.house.home_owner,
            "location": "Location", //result.data.house.location.name + ", " + result.data.house.location.subregion_name + ", " + result.data.house.location.region_name,
            "title": result.data.house.title,
            "furnished": result.data.house.furnished,
            "addressHidden": "0",
            "address": result.data.house.address,
            "bedrooms": result.data.house.bedrooms,
            "bathrooms": result.data.house.bathrooms,
            "parking": result.data.house.parking,
            "rent": result.data.house.rent, // Assumed to be cost per day
            "latitude": 35.2809, // result.data.house.latitude,
            "longitude": 149.1300, // result.data.house.longitude,
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
        "discount": true, //
        "percentageDiscount": 20, // window.django.extra_data.discount_percentage, //
        "discountSavings": 100, // window.django.extra_data.discount_savings //
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
          <div className="container" style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{color: "#84d8d1"}}>
              <div style={{fontSize: "30px", fontWeight: "700"}}>
                Congratulations! Your booking has been confirmed.
              </div>
              <div style={{flexDirection: 'row', justifyContent: 'space-between', display: 'flex', paddingBottom: "20px"}}>
                <div style={{fontWeight: "600", fontSize: "18px"}}>
                  The next step: Contact your host to organise your trip.
                </div>
                <div style={{fontSize: "14px", paddingRight: "10px"}}>
                  Reference Number: #{this.state.bookingDetails.referenceNumber}
                </div>
              </div>
            </div>
            <div className="row" style={{display: 'flex', flexDirection: 'row'}}>
              <div className="col-lg-5 col-xl-4" style={{width: "400px"}}>
                <BookingDetailsSummary
                  houseDetails={this.state.house}
                  bookingDetails={this.state.bookingDetails}
                  onFieldChange={this.handleFieldChange}
                  discountCode={this.state.discountCode}
                  onApplyDiscount={this.handleSendDiscountCode}
                />
              </div>
              <div className="col-lg-7 col-xl-8" style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                <div id="map" style={{height: '200px'}}>
                  {/*<iframe width="100%" height="100%" frameBorder="0" style="border:0"*/}
                          {/*src="https://www.google.com/maps/embed/v1/place?key=AIzaSyClsJFzjgJBxhY3D4HDn4V_EG9Y5FYqdqQ&q=Space+Needle,Seattle+WA"*/}
                          {/*allowFullScreen>*/}
                  {/*</iframe>*/}
                  {/*<GoogleMap*/}
                    {/*defaultZoom={8}*/}
                    {/*defaultCenter={{ lat: -34.397, lng: 150.644 }}*/}
                  {/*>*/}
                    {/*<Marker*/}
                      {/*position={{ lat: -34.397, lng: 150.644 }}*/}
                    {/*/>*/}
                  {/*</GoogleMap>*/}
                </div>
                <div>
                  <HostedBy
                    homeOwner={this.state.house.homeOwner}/>
                </div>
                <div>
                  <HouseRulesSummary
                    rules={this.state.house.rules}
                    homeOwner={this.state.house.homeOwner}/>
                </div>
                {this.state.house.otherRules
                  ? <div>
                      Special Note:
                      <div>{this.state.house.otherRules}</div>
                    </div>
                  : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookingConfirmationPage;