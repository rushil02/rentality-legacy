import React, {Component} from 'react';
import Navbar from "containers/common/Navbar";
import Form from "../../components/application/Form";
import 'components/application/Application.css'
import BookingDetails from "../../components/application/BookingDetails";
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
            cardToken: {}
        };
    }

    componentDidMount = () => {
        console.log(window.django);
        // get data from backend and put it in state tree
        axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), {
            params: {
                start_date: new Date(),
                end_date: new Date(),
                promo_code: []
            }
        })
            .then(result => this.setState({
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
                        "minStay": result.data.house.min_stay,
                        "maxStay": result.data.house.max_stay,
                        "maxPeopleAllowed": result.data.house.max_people_allowed,
                        "description": result.data.house.description,
                        "other_rules": result.data.house.other_rules,
                        "otherPeopleDescription": result.data.house.other_people_description,
                        "accessRestrictions": result.data.house.access_restrictions,
                        "neighbourhoodDescription": result.data.house.neighbourhood_description,
                        "status": result.data.house.status,
                        "uuid": result.data.house.uuid,
                        "homeType": result.data.house.home_type,
                        "cancellationPolicy": result.data.house.cancellation_policy.verbose, // Should this have more information to show what 'Moderate' means for example?
                        "facilities": result.data.house.facilities,
                        "rules": result.data.house.rules,
                        "neighbourhood_facilities": result.data.house.neighbourhood_facilities,
                        "welcome_tags": result.data.house.welcome_tags,
                    },

                    "data": {
                        "csrfmiddlewaretoken": window.django.csrf,
                        "total_rent": 1200,
                        "calculated_rent": 500,
                        "service_fee": 700,
                    },
                    isLoading: false
                })
            )
            .catch(error => this.setState({
                error,
                isLoading: false
            }));

        this.setState({
            "bookingDetails": {
                "totalRent": window.django.extra_data.total_payment,
                "calculatedRent": window.django.extra_data.cal_rent,
                "serviceFee": window.django.extra_data.service_fee,
                "moveIn": window.django.extra_data.move_in_date, //
                "moveOut": window.django.extra_data.move_out_date, //
                "bookingDuration": window.django.extra_data.duration, // days
                "guests": window.django.extra_data.guests, //
                "discount": true, //
                "percentageDiscount": window.django.extra_data.discount_percentage, //
                "discountSavings": window.django.extra_data.discount_savings //
            },
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
        // Application UUID - need csrftoken from django
        axios.post(reverse(routes.application.create, {"houseUUID": this.state.house.uuid}), this.state.data).then(
            result => console.log(result)
        ).error(
             (result) => console.log(result)
        );

        //FIXME: Get Application UUID
        const stripeToken = this.state.cardToken.token.id;
        console.log(stripeToken);
        const applicationUUID = '';
        const data = {
            stripeToken: stripeToken
        };
        axios.post('/apply/payment/' + applicationUUID, data).then(
            (result) => console.log(result)
        ).error(
            (result) => console.log(result)
        )
    };

    handleSaveButton = () => {
        console.log("save form to backend?", this.state)
    };

    handleStripePaymentTokenGenerated = (cardToken) => {
        this.setState({
            cardToken
        });
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
                                    onStripePaymentTokenGenerated={this.handleStripePaymentTokenGenerated}
                                    onAgreementsFieldChange={this.handleAgreementsFieldChange}
                                />
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
                                    <button type="button" className="btn btn-link"
                                            onClick={this.handleSubmitButton}>Apply Now
                                    </button>
                                    <button type="button" className="btn btn-link" onClick={this.handleSaveButton}>Save
                                        application
                                    </button>
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