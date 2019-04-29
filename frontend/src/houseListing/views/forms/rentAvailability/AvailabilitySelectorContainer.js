import React, {Component} from 'react';
import AvailabilitySelectorComponent from "./AvailabilitySelector";
import {differenceInDays} from 'date-fns';
import axios from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import routes from "routes";
import {alertUser} from "core/alert/Alert";
import {omit} from 'lodash';
import format from "date-fns/format";
import {getAvailabilityData} from "houseListing/services";


export default class AvailabilitySelectorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.cache.data,
        };
    }

    componentDidMount() {
        getAvailabilityData(this.props.houseUUID)
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        data: result
                    })
                );
            });
    }


    onAdd = (startDate, endDate, onComplete) => {
        let dataToSend = {
            "date_range": {
                "lower": format(startDate, 'YYYY-MM-DD'),
                "upper": format(endDate, 'YYYY-MM-DD')
            }
        };
        axios.post(reverse(routes.house.availability.create, {houseUUID: this.props.houseUUID}), dataToSend)
            .then(result => {

                this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            [result.data.id]: result.data
                        }
                    })
                );
                onComplete()
            }).catch(error => {

                alertUser.init({stockAlertType: 'unknownError'})
            }
        );
    };

    onUpdate = (objID, startDate, endDate, onComplete) => {
        let dataToSend = {
            "date_range": {
                "lower": format(startDate, 'YYYY-MM-DD'),
                "upper": format(endDate, 'YYYY-MM-DD')
            }
        };
        axios.put(reverse(routes.house.availability.update, {
            houseUUID: this.props.houseUUID,
            objID: objID
        }), dataToSend)
            .then(result => {
                console.log("data is set");
                this.setState(prevState => ({
                        data: {
                            ...prevState.data,
                            [result.data.id]: result.data
                        }
                    })
                );
                onComplete()
            }).catch(error => {
                alertUser.init({stockAlertType: 'unknownError'})
            }
        )

    };

    onRemove = (objID) => {
        console.log(objID, this.props.houseUUID);
        axios.delete(reverse(routes.house.availability.remove, {houseUUID: this.props.houseUUID, objID: objID}))
            .then(result => {
                const newState = {
                    data: omit(this.state.data, objID)
                };
                this.setState(newState);
            }).catch(error => {
                alertUser.init({stockAlertType: 'unknownError'})
            }
        )
    };


    validateRange = (startDate, endDate) => {
        // Accepts Date Objects
        if (differenceInDays(endDate, startDate) < 28) { // FIXME:  Fetch this number from business constraints
            return {error: true, message: "The Range should be greater than 28 days."}
        } else {
            return {error: false}
        }
    };

    // componentWillUnmount() {
    //     this.props.saveAvailabilityChange(this.state.data);
    // };

    render() {
        let newKey = 'new' + Object.values(this.state.data).length;
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
                    key={newKey}
                    idKey={newKey}
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
    constructor(props) {
        super(props);
        this.state = {
            modeEditing: false,
            error: '',
            tempStartDate: this.props.startDate || '',
            tempEndDate: this.props.endDate || '',
            inSyncMode: false
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
        if (val === null || val === undefined) {
            this.setState(prevState => ({modeEditing: !prevState.modeEditing}))
        } else {
            this.setState({modeEditing: val})
        }
    };

    onClickSave = () => {
        let validResult = this.props.validate(this.state.tempStartDate, this.state.tempEndDate);
        console.log(validResult);
        if (validResult.error) {
            // Failed
            this.setState({
                error: validResult.message
            });
            alertUser.init({alertType: 'danger', message: "Please enter a valid Date Range", autoHide: true});
            return false
        } else {
            this.setState({inSyncMode: true});
            // Passed
            if (this.props.modeNew) {
                this.props.onAdd(this.state.tempStartDate, this.state.tempEndDate, this.onComplete)
            } else {
                this.props.onUpdate(this.objID, this.state.tempStartDate, this.state.tempEndDate, this.onComplete);
                this.toggleEditState(false)
            }
            return true
        }

    };

    onRemove = () => {
        this.setState({inSyncMode: true});
        this.props.onRemove(this.objID);
    };

    onComplete = () => {
        this.setState({inSyncMode: false})
    };

    render() {
        return (
            <AvailabilitySelectorComponent
                modeNew={this.props.modeNew}
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
                inSyncMode={this.state.inSyncMode}
            />
        );
    }

}