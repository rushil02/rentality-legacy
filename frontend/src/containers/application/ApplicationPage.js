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

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class ApplicationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house: null,
            bookingDetails: {
                "moveIn": window.django.extra_data.move_in_date,
                "moveOut": window.django.extra_data.move_out_date,
                "guests": window.django.extra_data.guests,
            },
            bookingAmountDetails: {},
            discountCodes: [],
            currentDiscountCode: "",
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

    componentDidMount = () => {
        // get data from backend and put it in state tree

        axios.get(reverse(routes.house.detail, {houseUUID: window.location.pathname.split("/").pop()}), {})
            .then(result => {
                this.setState({
                    "house": {
                        "homeOwner": result.data.home_owner,
                        "location": result.data.location.properties.name + ", " + result.data.location.properties.subregion_name + ", " + result.data.location.properties.region_name,
                        "title": result.data.title,
                        "furnished": result.data.furnished,
                        "addressHidden": "0",
                        "address": result.data.address,
                        "bedrooms": result.data.bedrooms,
                        "bathrooms": result.data.bathrooms,
                        "parking": result.data.parking,
                        "rent": result.data.rent, // Assumed to be cost per day
                        "thumbnail": "../../static/image/mail/1_2.png", //result.data.house.thumbnail, // FIXME: Need to be via a thumbnail API
                        "latitude": result.data.location.geometry.coordinates[0],
                        "longitude": result.data.location.geometry.coordinates[1],
                        "minStay": result.data.min_stay,
                        "maxStay": result.data.max_stay,
                        "maxPeopleAllowed": result.data.max_people_allowed,
                        "description": result.data.description,
                        "otherRules": result.data.other_rules,
                        "otherPeopleDescription": result.data.other_people_description,
                        "accessRestrictions": result.data.access_restrictions,
                        "neighbourhoodDescription": result.data.neighbourhood_description,
                        "status": result.data.status,
                        "uuid": result.data.uuid,
                        "homeType": result.data.home_type,
                        "cancellationPolicy": {
                            "verbose": result.data.cancellation_policy.verbose,
                            "description": result.data.cancellation_policy.description,
                            "officialPolicy": null
                        },
                        "facilities": result.data.facilities,
                        "rules": result.data.rules,
                        "neighbourhoodFacilities": result.data.neighbourhood_facilities,
                        "welcomeTags": result.data.welcome_tags,
                    }
                })
            })
            .catch(error => this.setState({
                errors: error,
            }));


        axios.get(reverse(routes.user.info)).then(result => {
            this.setState({
                tenant: {
                    "firstName": result.data.first_name,
                    "lastName": result.data.last_name,
                    "emailAddress": result.data.email,
                    "phoneNumber": result.data.contact_num,
                    "gender": result.data.sex,
                }
            })
        }).catch(error => this.setState({
            errors: error
        }));

        axios.get(reverse(routes.application.bookingDetails, {houseUUID: window.location.pathname.split("/").pop()}), {
            params: {
                start_date: window.django.extra_data.move_in_date,
                end_date: window.django.extra_data.move_out_date,
                guests: window.django.extra_data.guests,
                promo_code: []
            }
        }).then(result => {
                this.setState({
                    bookingAmountDetails: {
                        "weeklyRent": result.data.weekly_rent,
                        "totalRent": result.data.total_rent,
                        "payableRent": result.data.payable_rent,
                        "serviceFee": result.data.service_fee,
                        "totalAmount": result.data.total_amount,
                        "discountAmount": result.data.discount,
                        "tax": result.data.tax,
                        "totalPayable": result.data.payable_amount,
                        "bookingDuration": result.data.stay_duration,
                    }
                })
            }
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

    handleDiscountFieldChange = (code) => {
        this.setState(prevState => ({
            ...prevState,
            currentDiscountCode: code
        }))
    };

    parseParams = (params) => {
        const keys = Object.keys(params);
        let options = '';

        keys.forEach((key) => {
            const isParamTypeObject = typeof params[key] === 'object';
            const isParamTypeArray = isParamTypeObject && (params[key].length >= 0);

            if (!isParamTypeObject) {
                options += `${key}=${params[key]}&`;
            }

            if (isParamTypeObject && isParamTypeArray) {
                params[key].forEach((element) => {
                    options += `${key}=${element}&`;
                });
            }
        });

        return options ? options.slice(0, -1) : options;
    };


    handleSendDiscountCode = (discountCode) => {
        console.log("sending discount code to backend:", discountCode);
        let errors = {};

        axios.get(reverse(routes.promo.verifyApplicationDiscount), {params: {code: discountCode}}
        ).then(resp => {
                console.log("RESP CODE", resp);
                this.setState(prevState => ({
                    discountCodes: [
                        ...prevState.discountCodes,
                        resp.data
                    ]
                }))
            }
        ).then((resp) => {
            axios.get(
                reverse(routes.application.bookingDetails, {"houseUUID": this.state.house.uuid}),
                {
                    params: {
                        start_date: window.django.extra_data.move_in_date,
                        end_date: window.django.extra_data.move_out_date,
                        guests: window.django.extra_data.guests,
                        promo_codes: this.state.discountCodes.map(code => {
                            return code.code
                        })
                    },
                    paramsSerializer: params => this.parseParams(params)
                }
            ).then(result => {
                    this.setState({
                        bookingAmountDetails: {
                            "weeklyRent": result.data.weekly_rent,
                            "totalRent": result.data.total_rent,
                            "payableRent": result.data.payable_rent,
                            "serviceFee": result.data.service_fee,
                            "totalAmount": result.data.total_amount,
                            "discountAmount": result.data.discount,
                            "tax": result.data.tax,
                            "totalPayable": result.data.payable_amount,
                            "bookingDuration": result.data.stay_duration,
                        }
                    })
                }
            ).error((result) => {
                console.log("ERRORS FROM RESP", result);
                errors = {...errors, ...result.errors};
                this.setState({errors: errors})
            });
        });
    };

    sendFormData = () => {
        let errors = {};

        let dataToSend = {
            booking_info: {
                start_date: window.django.extra_data.move_in_date,
                end_date: window.django.extra_data.move_out_date,
                promo_codes: this.state.discountCodes,
                guests: window.django.extra_data.guests
            },
            stripe_token: this.state.payment.stripeToken,
            agree_to_pay: this.state.agreements.agreeToPay,
            agree_to_house_rules: this.state.agreements.agreeToHouseRules,
            agree_to_tnc: this.state.agreements.agreeToTermsAndConditions,
            tenant_details: {
                first_name: this.state.tenant.firstName,
                last_name: this.state.tenant.lastName,
                email: this.state.tenant.emailAddress,
                contact_num: this.state.tenant.phoneNumber,
                sex: this.state.tenant.gender,
            },
            tenant_message: this.state.tenant.comments
        };
        axios.post(
            reverse(routes.application.create, {"houseUUID": this.state.house.uuid}),
            dataToSend).then(
            result => console.log(result)
        ).then(resp => {
                console.log("RESP CODE", resp);

            }
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
                                    discountCode={this.state.currentDiscountCode}
                                    discountCodes={this.state.discountCodes}
                                    bookingAmountDetails={this.state.bookingAmountDetails}
                                    bookingDetails={this.state.bookingDetails}
                                    onDiscountFieldChange={this.handleDiscountFieldChange}
                                    onApplyDiscount={this.handleSendDiscountCode}
                                    errors={this.state.errors}
                                />
                            </div>
                            <div className="col-12">
                                <div className="button">
                                    <button type="button" className="btn btn-link" onClick={this.handleSaveButton}>Save
                                        Application
                                    </button>
                                    <button type="button" className="btn btn-link"
                                            onClick={this.handleSubmitButton}>Book Now
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