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
      bookingDetails: null,
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
          "referenceNumber": "342234823",
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


  render() {
    if (!(this.state.bookingDetails && this.state.house)) {
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