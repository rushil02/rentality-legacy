import React, {Component} from 'react';
import axios from "axios";
import {reverse} from "named-urls";
import routes from "routes";
import CreatePageComponent from "./CreatePageComponent"
// import EditPageComponent from "components/house/createEdit/EditPage"

import {alertUser} from "core/alert/Alert";
import {House} from "../../models";
import {getAvailabilityData, getHouseData} from "../../services";


class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode,
            formOptions: {},
            mainData: new House({}),
            availabilityData: [],
            errors: {}
        };
        this._houseUUID = "";
    }

    componentDidMount = () => {

        if (this.state.mode === 'edit') {
            this._houseUUID = this.props.match.params.houseUUID;

            // Fetch house details
            getHouseData(this._houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            mainData: result
                        })
                    );
                            console.log(this.state.mainData);

                });


            // Fetch Availability details
            getAvailabilityData(this._houseUUID)
                .then(result => {
                    console.log(result._attrs);
                    this.setState(prevState => (
                        {
                            ...prevState,
                            availabilityData: result.reduce(function (result, item) {
                                result[item.id] = item;
                                return result;
                            }, {})
                        })
                    );
                });

        }

        // Fetch Form options
        axios.get(reverse(routes.house.formOptions), {})
            .then(result => {
                console.log(result);
                this.setState({
                    formOptions: result.data
                })
            }).catch(error => alertUser.init({stockAlertType: 'generic'}));

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
                    <CreatePageComponent
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