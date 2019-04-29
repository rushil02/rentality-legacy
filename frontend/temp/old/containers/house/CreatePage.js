import React, {Component} from 'react';
import axios from "axios";
import {reverse} from "named-urls";
import routes from "../../routes";
import CreatePageComponent from "components/house/createEdit/CreatePage"
import EditPageComponent from "components/house/createEdit/EditPage"

import {alertUser} from "../common/Alert";
import format from "date-fns";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


function initMainData(houseObj) {
    // Remaps data from given object and initializes empty with defaults
    return {
        // Form 1
        title: houseObj.title || "",
        houseNum: houseObj.address_hidden || "",
        streetName: houseObj.address || "",
        postalCode: houseObj.location || "",
        homeType: houseObj.home_type || "",
        furnished: houseObj.furnished || "Y",
        numBedrooms: houseObj.bedrooms || 1,
        numBathrooms: houseObj.bathrooms || 1,
        numParkSpaces: houseObj.parking || 0,

        // Form 2
        rent: houseObj.rent || "",
        minStay: houseObj.min_stay || 28,
        maxStay: houseObj.max_stay || 0,
        maxPeopleAllowed: houseObj.max_people_allowed || 2,
    };
}

function reverseInitMainData(jsObj) {
    // Remaps data to submit to server
    return {
        // Form 1
        title: jsObj.title,
        address_hidden: jsObj.houseNum,
        address: jsObj.streetName,
        location: jsObj.postalCode,
        home_type: jsObj.homeType,
        furnished: jsObj.furnished,
        bedrooms: jsObj.numBedrooms,
        bathrooms: jsObj.numBathrooms,
        parking: jsObj.numParkSpaces,

        // Form 2
        rent: jsObj.rent || "",
        min_stay: jsObj.minStay,
        max_stay: jsObj.maxStay,
        max_people_allowed : jsObj.maxPeopleAllowed,
    };
}

class CreatePage extends Component {
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
            axios.get(reverse(routes.house.detail, {houseUUID: this._houseUUID}), {})
                .then(result => {
                    console.log("here", result);
                    this.setState(prevState => (
                        {
                            ...prevState,
                            mainData: initMainData(result.data)
                        })
                    )
                }).catch(error => alertUser.init({stockAlertType: 'generic'}));

            // Fetch Availability details
            axios.get(reverse(routes.house.availability.list, {houseUUID: this._houseUUID}), {})
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            availabilityData: result.data.reduce(function (result, item) {
                                result[item.id] = item;
                                return result;
                            }, {})
                        })
                    );
                }).catch(error => alertUser.init({stockAlertType: 'generic'}));

        }

        // Fetch Form options
        axios.get(reverse(routes.house.formOptions), {})
            .then(result => {
                this.setState({
                    formOptions: result.data
                })
            })

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

    onSave = () => {
        axios.post(
            reverse(routes.house.availability.create, {houseUUID: this.props.houseUUID}),
            reverseInitMainData(this.state.mainData)
        ).then(result => {
           alertUser.init({stockAlertType: 'save-success'})
        }).catch(error => {
                alertUser.init({stockAlertType: 'unknownError'})
            }
        );
    };

    renderPage = () => {
        if (this.state.mode === 'edit') {
            return (
                <React.Fragment>
                    <CreatePageComponent
                        houseUUID={this._houseUUID}
                        formOptions={this.getFormOptions}
                        businessConstraints={this.getConstraints}
                        mainData={this.state.mainData}
                        errors={this.state.errors}
                        onFieldChange={this.onMainDataFieldChange}
                        saveAvailabilityChange={this.saveAvailabilityChange}
                        availabilityData={this.state.availabilityData}
                        onClickSave={this.onSave}
                    />
                </React.Fragment>
            )

        } else {
            return (
                <React.Fragment>
                    <EditPageComponent
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

export default CreatePage;