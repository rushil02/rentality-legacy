import React, { Component } from 'react';
import axios from "utils/ServiceHelper"
import { reverse } from "named-urls";
import routes from "../../routes";
import { alertUser } from "../common/Alert";


export default class FacilitesSelectorHandler extends Component {
    constructor(props) {
        super(props);
        // TODO: Maintain the state of the data(isSynced) once a change is made
        // Figure our what's the best way to do it
        this.state = {
            data: [],
            houseUUID: '',
            inSyncMode: true,
            dataUpdated: true,
        };
        this.onFacilityAdd = this.onFacilityAdd.bind(this);
        this.onFacilityUpdate = this.onFacilityUpdate.bind(this);
        this.formOptions = this.props.formOptions; // FIXME: this is a method, call with apt args
    }

    static getDerivedStateFromProps(props, state) {
        /*
        Getting facilities from the parent when the child is initialized
         */
        let updatedState = {}
        if (state.data.constructor === Array && props.facilitiesData.length > 0) {
            updatedState = {
                ...updatedState,
                data: props.facilitiesData,
            }
        }

        if (Object.entries(updatedState).length) {
            return updatedState
        }

        return null
    }

    componentDidMount() {
        if (this.props.houseUUID) {
            this.loadInitdata(this.props.houseUUID);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.houseUUID !== prevProps.houseUUID) {
            this.loadInitdata(this.props.houseUUID);
        }
    }

    loadInitdata(houseUUID) {
        // Fetch Facilities options
        if (houseUUID) {
            axios.get(reverse(routes.house.facilities, { houseUUID: houseUUID }))
                .then(result => {
                    this.props.saveFacilitiesChange(result.data);
                });
        }
        // TODO: Update the parent state once the data is fetched
    }

    onFacilityUpdate(key, value, onComplete = () => { }) {
        // Create the data to send to server
        this.setState({ dataFetched: false })
        let dataToSend = [
            ...this.state.data,
        ];

        dataToSend[key] = value;

        this.props.saveFacilitiesChange(dataToSend);

        onComplete()

    };

    onFacilityAdd(e) {
        e.preventDefault();
        this.setState({ dataFetched: false })
        let dataToSend = [
            ...this.state.data,
            {
                verbose: String(this.props.addNewFacility).trim(),
                checked: true
            }
        ]

        this.props.saveFacilitiesChange(dataToSend)
        this.props.onFieldChange("addNewFacility", "")
    }

    componentWillUnmount() {
        this.props.saveFacilitiesChange(this.state.data);
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <div className="checkbox">
                            <ul className="list-inline" id="facilities-list">
                                <FacilitiesSelector
                                    key='form3-facilities'
                                    data={this.state.data}
                                    onFacilityAdd={this.onFacilityAdd}
                                    onRemove={this.onRemove}
                                    onFacilityUpdate={this.onFacilityUpdate}
                                />
                            </ul>
                        </div>
                        <form onSubmit={this.onFacilityAdd}>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="input big no-background">
                                        <input type="text" className="form-control anything-else"
                                            id="other-facility-text"
                                            value={this.props.addNewFacility}
                                            onChange={(e) => this.props.onFieldChange("addNewFacility", e.target.value)}
                                            placeholder="Add other facilities" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button
                                        type="submit"
                                        className="btn btn-link anything-else-add"
                                        id="add-facilities"
                                    > Add
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


class FacilitiesSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            data: [],
            inSyncMode: false
        };

        this.objID = this.props.idKey;
    }

    static getDerivedStateFromProps(props, state) {
        if (state.data.constructor === Array) {
            return {
                data: props.data
            }
        }

        return null;
    }

    handleChange = (key, value) => {
        let newValue = {
            ...value,
            checked: !value.checked
        }
        this.props.onFacilityUpdate(key, newValue, this.onComplete)
    };

    toggleEditState = (val) => {
        if (val === null || val === undefined) {
            this.setState(prevState => ({ modeEditing: !prevState.modeEditing }))
        } else {
            this.setState({ modeEditing: val })
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
            alertUser.init({ alertType: 'danger', message: "Please enter a valid Date Range", autoHide: true });
            return false
        } else {
            this.setState({ inSyncMode: true });
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
        this.setState({ inSyncMode: true });
        this.props.onRemove(this.objID);
    };

    onComplete = () => {
        this.setState({ inSyncMode: false })
    };

    render() {
        return (
            <React.Fragment>
                {
                    this.state.data && Array.isArray(this.state.data) &&
                    this.state.data.map((value, key) => {
                        return (<li
                            className="list-inline-item"
                            key={`facility-checkbox-${key}`}
                        >
                            <div className="custom-control custom-checkbox" id={`facility-checkbox-container-${value.id}`}>
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id={`facility-checkbox-${key}`}
                                    checked={value.checked ? true : false}
                                    onChange={() => { this.handleChange(key, value) }}

                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor={`facility-checkbox-${key}`}
                                >
                                    {value.verbose}
                                </label>
                            </div>
                        </li>
                        )
                    })}
            </React.Fragment>
        );
    }

}