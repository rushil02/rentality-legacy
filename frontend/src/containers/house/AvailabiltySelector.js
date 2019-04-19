import React, {Component} from 'react';
import AvailabilitySelectorComponent from "components/house/createEdit/formRentAvailability/AvailabilitySelector";
import {differenceInDays} from 'date-fns';
import axios from "axios";
import {reverse} from "named-urls";
import routes from "../../routes";
import {alertUser} from "../common/Alert";
import {omit} from 'lodash';


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default class AvailabilitySelectorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };

        this.formOptions = this.props.formOptions; // FIXME: this is a method, call with apt args

    }

    onAdd = (startDate, endDate) => {
        let dataToSend = {
            "date_range": {
                "lower": startDate,
                "upper": endDate
            }
        };
        axios.post(reverse(routes.house.create.availability.create, {houseUUID: this.props.houseUUID}), dataToSend)
            .then(result => {
                this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            [result.data.id]: result.data
                        }
                    })
                );
            }).catch(error => {
            alertUser.init({stockAlertType: 'unknownError'})
        })
    };

    onUpdate = (objID, startDate, endDate) => {
        let dataToSend = {
            "date_range": {
                "lower": startDate,
                "upper": endDate
            }
        };
        axios.put(reverse(routes.house.create.availability.update, {
            houseUUID: this.props.houseUUID,
            objID: objID
        }), dataToSend)
            .then(result => {
                this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            [result.data.id]: result.data
                        }
                    })
                );
            }).catch(error => {
            alertUser.init({stockAlertType: 'unknownError'})
        })

    };

    onRemove = (objID) => {
        console.log(objID, this.props.houseUUID);
        axios.delete(reverse(routes.house.create.availability.remove, {houseUUID: this.props.houseUUID, objID: objID}))
            .then(result => {
                const newState = {
                    data: omit(this.state.data, objID)
                };
                this.setState(newState);
            }).catch(error => {
            alertUser.init({stockAlertType: 'unknownError'})
        })

    };


    validateRange = (startDate, endDate) => {
        // Accepts Date Objects
        if (differenceInDays(endDate, startDate) < 28) { // FIXME:  Fetch this number from business constraints
            return {error: true, message: "The Range should be greater than 28 days."}
        } else {
            return {error: false}
        }
    };

    componentWillUnmount() {
        this.props.saveAvailabilityChange(this.state.data);
    };

    static getDerivedStateFromProps(props, state) {
        if (Object.entries(state.data).length === 0 && state.data.constructor === Object) {
            return {'data': props.availabilities}
        }
        return null
    }

    render() {
        return (
            <React.Fragment>
                {Object.values(this.state.data).map((object, i) => {
                    return <AvailabilitySelector
                        modeNew={false}
                        startDate={new Date(object.date_range.lower)}
                        endDate={new Date(object.date_range.upper)}
                        key={object.id.toString()}
                        idKey={object.id}
                        validate={this.validateRange}
                        onAdd={this.onAdd}
                        onRemove={this.onRemove}
                        onUpdate={this.onUpdate}
                    />;
                })}
                <AvailabilitySelector
                    modeNew={true}
                    startDate={new Date()}
                    endDate={new Date()}
                    key={'new'}
                    idKey={'new'}
                    validate={this.validateRange}
                    onAdd={this.onAdd}
                    onRemove={this.onRemove}
                    onUpdate={this.onUpdate}
                />
            </React.Fragment>
        )
    }
}


class AvailabilitySelector extends Component {
    /*
    Dates are already converted to Date objects from string
     */
    constructor(props) {
        super(props);
        this.state = {
            modeEditing: false,
            modeNew: this.props.modeNew,
            error: '',
            tempStartDate: this.props.startDate || '',
            tempEndDate: this.props.endDate || '',
        };

        this.objID = this.props.idKey;
    }

    handleSelect = (startDate, endDate) => {
        this.setState({
            tempStartDate: startDate,
            tempEndDate: endDate
        });

    };

    toggleEditState = (val) => {
        this.setState({modeEditing: val})
    };

    onClickSave = () => {
        let validResult = this.props.validate(this.state.tempStartDate, this.state.tempEndDate);

        if (validResult.error) {
            // Failed
            this.setState({
                error: validResult.message
            });
            alertUser.init({alertType: 'danger', message: "Please enter a valid Date Range", autoHide: true})
        } else {
            // Passed
            if (this.props.modeNew) {
                this.props.onAdd(this.state.tempStartDate, this.state.tempEndDate)
            } else {
                this.props.onUpdate(this.state.tempStartDate, this.state.tempEndDate)
            }
            this.setState({
                error: false,
                modeNew: false,
                modeEditing: false
            })
        }

    };

    onRemove = () => {
        this.props.onRemove(this.objID);
    };

    render() {
        return (
            <AvailabilitySelectorComponent
                modeNew={this.state.modeNew}
                modeEditing={this.state.modeEditing}
                startDate={this.state.tempStartDate}
                endDate={this.state.tempEndDate}
                srcStartDate={this.props.startDate}
                srcEndDate={this.props.endDate}
                handleSelect={this.handleSelect}
                idKey={this.props.idKey}
                toggleEditState={this.toggleEditState}
                error={this.state.error}
                onSave={this.onClickSave}
                onRemove={this.onRemove}
            />
        );
    }

}