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
            bookingDetails: {
                "moveIn": window.django.extra_data.move_in_date,
                "moveOut": window.django.extra_data.move_out_date,
                "guests": window.django.extra_data.guests,
            },
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
            errors: {"discountCodes": "Your discountCode was invalid"},
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
                        "totalRent": result.data.total_amount,
                        "serviceFee": result.data.service_fee,
                        "discountAmount": result.data.discount,
//                        "discountTitle": "Discount 20%",
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


    handleSendDiscountCode = (discountCode) => {
        console.log("sending discount code to backend:", discountCode);
        let errors = {};

        axios.get(reverse(routes.promo.verifyApplicationDiscount), {params: {code: discountCode}}
        ).then(resp => {
                this.setState(prevState => ({ // FIXME: @Elliot discountCodes is a list, how do you update that?
                    ...prevState,
                    discountCodes: {
                      ...prevState.discountCodes,
                      [resp.code]: {discountCode: resp.code, discountTitle: resp.verbose}
                    }
                }))
            }
        ).then((resp) => {
            axios.get(
                reverse(routes.application.bookingDetails, {"houseUUID": this.state.house.uuid}),
                {
                    data: {
                        start_date: window.django.extra_data.move_in_date,
                        end_date: window.django.extra_data.move_out_date,
                        guests: window.django.extra_data.guests,
                        promo_code: [this.state.discountCode] // FIXME: is this correct? Please make sure that this list is updated
                    }
                }
            ) // FIXME: doesn't it require a then for setState, like the following?
            .then(result => {
                this.setState({
                    bookingAmountDetails: {
                        "weeklyRent": result.data.weekly_rent,
                        "totalRent": result.data.total_amount,
                        "serviceFee": result.data.service_fee,
                        "discountAmount": result.data.discount,
                        "totalPayable": result.data.payable_amount,
                        "bookingDuration": result.data.stay_duration,
                    }
                })
            }
        );
        })
        // FIXME: Please confirm if the following code is unnecessary

        //     .then(resp => {
        //         this.setState(prevState => ({
        //             ...prevState,
        //             bookingDetails: {
        //                 ...prevState.bookingDetails,
        //                 "discountAmount": resp.discountAmount, // TODO: get discountAmount and totalPayable in bookingDetails resp.
        //                 "totalPayable": resp.totalPayable,
        //             }
        //         }))
        //     }
        // ).error((result) => {
        //     errors = {...errors, ...result.errors};
        //     this.setState({errors: errors})
        // });
    };

    sendFormData = () => {
        let errors = {};
        let bookingDetails = {
            startDate: window.django.extra_data.move_in_date,
            endDate: window.django.extra_data.move_out_date,
            promoCodes: this.state.promoCodes, // FIXME: is this definition correct?
            guests: window.django.extra_data.guests
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

        //FIXME: Below code seems unnecessary

        // const stripeToken = this.state.payment.stripeToken;
        // const applicationUUID = '';
        // const data = {
        //     stripeToken: stripeToken
        // };
        // axios.post('/apply/payment/' + applicationUUID, data).then(
        //     (result) => console.log(result)
        // ).error(
        //     (result) => {
        //         console.log(result);
        //         errors = {...errors, ...result.errors};
        //     }
        // );
        //
        // axios.post('/apply/tenant/' + applicationUUID, this.state.tenant).then(
        //     (result) => console.log(result)
        // ).error(
        //     (result) => {
        //         console.log(result);
        //         errors = {...errors, ...result.errors};
        //     }
        // );

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
                                    discountCode={this.state.discountCode}
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