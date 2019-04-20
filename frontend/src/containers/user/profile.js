import React, { Component } from 'react';
import axios from "axios";
import { reverse } from "named-urls";
import routes from "../../routes";
import ProfileDetailEditPage from "components/user/profile/ProfileDetailEditPage"
import { alertUser } from "../common/Alert";
import './profile.css'

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


function initMainData(userProfileObj) {
    // Remaps data from given object and initializes empty with defaults
    return {
        // Form 1
        firstName: userProfileObj.first_name || "",
        lastName: userProfileObj.last_name || "",
        contactNum: userProfileObj.contact_num || "",
        dob: userProfileObj.dob ? new Date(userProfileObj.dob) : new Date(), // FIXME: Fix this - nested object with more details instead of string
        billingStreetAddress: userProfileObj.billing_street_address || "",
        billingPostcode: userProfileObj.billing_postcode || "",
        billingCountry: userProfileObj.billing_country || 1,
        gender: userProfileObj.sex || 1,

    };
}

class UserProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            formOptions: {},
            mainData: initMainData({}),
            availabilityData: {},
            errors: {}
        };

        this._houseUUID = "";

    }

    componentDidMount = () => {

        if (this.state.mode === 'edit') {
            this._houseUUID = this.props.match.params.houseUUID;

            // Fetch house details
            axios.get(reverse(routes.user.profile), {})
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            mainData: initMainData(result.data)
                        })
                    )
                }).catch(error => alertUser.init({ stockAlertType: 'generic' }));
        }

    };

    onMainDataFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            mainData: {
                ...prevState.mainData,
                [field]: value
            }
        }))
    };

    saveAvailabilityChange = (data) => {
        this.setState(prevState => (
            {
                ...prevState,
                availabilityData: data
            })
        );
    };

    getFormOptions = (key) => {
        let formOptions = {};
        if (Object.keys(this.state.formOptions).length > 0 && this.state.formOptions.constructor === Object) {
            formOptions = this.state.formOptions.field_options[key];
        }
        return formOptions
    };

    getConstraints = (key) => {
        let constraints = {};
        if (Object.keys(this.state.formOptions).length > 0 && this.state.formOptions.constructor === Object) {
            constraints = this.state.formOptions.business_constraints[key];
        }
        return constraints
    };

    renderPage = () => {
        if (this.state.mode === 'edit') {
            return (
                <React.Fragment>
                        <ProfileDetailEditPage
                            formOptions={this.getFormOptions}
                            businessConstraints={this.getConstraints}
                            mainData={this.state.mainData}
                            errors={this.state.errors}
                            onFieldChange={this.onMainDataFieldChange}
                            saveAvailabilityChange={this.saveAvailabilityChange}
                            availabilityData={this.state.availabilityData}
                        />
                </React.Fragment>
            )

        } else {
            return (
                <React.Fragment>
                    <CreatePageComponent
                        houseUUID={this._houseUUID}
                        formOptions={this.getFormOptions}
                        businessConstraints={this.getConstraints}
                        mainData={this.state.mainData}
                        errors={this.state.errors}
                        onFieldChange={this.onFieldChange}
                    />
                </React.Fragment>
            )
        }
    };

    render() {
        return (this.renderPage())
    }
}

export default UserProfilePage;