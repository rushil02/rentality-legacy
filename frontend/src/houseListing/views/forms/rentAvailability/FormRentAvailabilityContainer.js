import React, {Component} from "react";
import FormRentAvailabilityComponent from "./FormRentAvailabilityComponent";
import {postHouseData, patchHouseData, getHouseData} from "../../../services";
import {House} from "../../../models";

export default class FormRentAvailabilityContainer extends Component {
    formID = 2;

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                data: new House({}, "empty"),
            };
        } else {
            this.state = {
                data: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "initial", "Rent & Availability");

        if (this.state.data.status === "empty") {
            // Fetch house details
            getHouseData(this.props.houseUUID).then((result) => {
                this.setState((prevState) => ({
                    ...prevState,
                    data: result,
                }));
                this.props.navContext.data.updateFormState(this.formID, "saved");
                this.props.navContext.sync();
            });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status);
        }
        this.props.navContext.sync();
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject("mainData", () => this.state.data);
        this.props.navContext.data.unloadForm();
    }

    onFieldChange = (field, value) => {
        this.setState((prevState) => ({
            ...prevState,
            data: prevState.data.setData(field, value),
        }));
        this.props.navContext.data.updateCurrentFormState("hasChanged");
        this.props.navContext.sync();
    };

    onSave = (e) => {
        const that = this;
        return new Promise(function (resolve, reject) {
            patchHouseData(that.props.houseUUID, that.state.data)
                .then((house) => {
                    that.setState({data: house});
                    that.props.navContext.data.updateFormState(that.formID, "saved");
                    that.props.navContext.sync();
                    resolve(house);
                })
                .catch((house) => {
                    that.props.navContext.data.updateFormState(that.formID, "error");
                    that.props.navContext.sync();
                    reject();
                });
        });
    };

    render() {
        return (
            <FormRentAvailabilityComponent
                onFieldChange={this.onFieldChange}
                rent={this.state.data.getData("rent")}
                minStay={this.state.data.getData("minStay")}
                maxStay={this.state.data.getData("maxStay")}
                maxPeopleAllowed={this.state.data.getData("maxPeopleAllowed")}
                errors={this.state.data.errors}
                houseUUID={this.props.houseUUID}
                formID={this.formID}
            />
        );
    }
}
