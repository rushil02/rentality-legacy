import React, {Component} from "react"
import AvailabilitySelectorComponent from "./AvailabilitySelector"
import {differenceInDays} from "date-fns"
import {alertUser} from "core/alert/Alert"
import {omit} from "lodash"
import format from "date-fns/format"
import {
    deleteAvailabilityData,
    getAvailabilityData,
    putAvailabilityData,
    postAvailabilityData,
} from "components/houseListing/services"
import {NavigationContext} from "components/houseListing/dataContext"


export default class AvailabilitySelectorHandler extends Component {
    constructor(props) {
        super(props)
        if (props.cache.data === undefined) {
            this.state = {
                data: {},
            }
        } else {
            this.state = {
                data: props.cache.data,
            }
        }
    }

    componentDidMount() {
        getAvailabilityData(this.props.houseUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                data: result,
            }))
        })
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject("availabilityData", () => this.state.data)
    }

    onAdd = (startDate, endDate) => {
        let dataToSend = {
            date_range: {
                lower: format(startDate, "yyyy-MM-dd"),
                upper: format(endDate, "yyyy-MM-dd"),
            },
        }

        postAvailabilityData(this.props.houseUUID, dataToSend)
            .then(result => {
                this.setState(prevState => ({
                    data: {
                        ...prevState.data,
                        [result.getData("objID")]: result,
                    },
                }))
            })
            .catch(error => {
                alertUser.init({stockAlertType: "unknownError"})
            })
    }

    onUpdate = (objID, startDate, endDate, successCallback) => {
        let dataToSend = {
            date_range: {
                lower: format(startDate, "yyyy-MM-dd"),
                upper: format(endDate, "yyyy-MM-dd"),
            },
        }
        putAvailabilityData(this.props.houseUUID, objID, dataToSend)
            .then(result => {
                this.setState(prevState => ({
                    data: {
                        ...prevState.data,
                        [result.getData("objID")]: result,
                    },
                }))
                successCallback()
            })
            .catch(error => {
                alertUser.init({stockAlertType: "unknownError"})
            })
    }

    onRemove = objID => {
        deleteAvailabilityData(this.props.houseUUID, objID)
            .then(() => {
                this.setState(prevState => ({
                    ...prevState,
                    data: omit(this.state.data, objID),
                }))
            })
            .catch(error => {
                alertUser.init({stockAlertType: "unknownError"})
            })
    }

    validateRange = (startDate, endDate) => {
        // Accepts Date Objects
        if (differenceInDays(endDate, startDate) < 28) {
            // FIXME:  Fetch this number from business constraints
            return {error: true, message: "The Range should be greater than 28 days."}
        } else {
            return {error: false}
        }
    }

    render() {
        let newKey = "new" + Object.values(this.state.data).length
        return (
            <NavigationContext.Consumer>
                {navContext => (
                    <React.Fragment>
                        {Object.values(this.state.data).map((object, i) => {
                            let dateRange = object.getData("dateRange")
                            return (
                                <AvailabilitySelector
                                    modeNew={false}
                                    startDate={new Date(dateRange.getData("startDate"))}
                                    endDate={new Date(dateRange.getData("endDate"))}
                                    key={object.getData("objID").toString()}
                                    idKey={object.getData("objID")}
                                    validate={this.validateRange}
                                    onAdd={this.onAdd}
                                    onRemove={this.onRemove}
                                    onUpdate={this.onUpdate}
                                    navContext={navContext}
                                    formID={this.props.formID}
                                />
                            )
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
                            navContext={navContext}
                            formID={this.props.formID}
                        />
                    </React.Fragment>
                )}
            </NavigationContext.Consumer>
        )
    }
}

class AvailabilitySelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modeEditing: false,
            error: "",
            tempStartDate: this.props.startDate || "",
            tempEndDate: this.props.endDate || "",
            inSyncMode: false,
        }

        this.objID = this.props.idKey
    }

    handleSelect = (startDate, endDate) => {
        this.setState({
            tempStartDate: startDate,
            tempEndDate: endDate,
        })
    }

    toggleEditState = val => {
        if (val === null || val === undefined) {
            this.setState(prevState => ({modeEditing: !prevState.modeEditing}))
        } else {
            this.setState({modeEditing: val})
        }
    }

    onClickSave = () => {
        let validResult = this.props.validate(this.state.tempStartDate, this.state.tempEndDate)
        if (validResult.error) {
            // Failed
            this.setState({
                error: validResult.message,
            })
            alertUser.init({alertType: "danger", message: "Please enter a valid Date Range", autoHide: true})
            return false
        } else {
            this.setState({inSyncMode: true})
            // Passed
            if (this.props.modeNew) {
                this.props.onAdd(this.state.tempStartDate, this.state.tempEndDate)
            } else {
                this.props.onUpdate(this.objID, this.state.tempStartDate, this.state.tempEndDate, () =>
                    this.setState({inSyncMode: false})
                )
                this.toggleEditState(false)
            }
            return true
        }
    }

    onRemove = () => {
        if (this.props.modeNew) {
            this.toggleEditState(false)
        } else {
            this.setState({inSyncMode: true})
            this.props.onRemove(this.objID)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.modeEditing === false && this.state.modeEditing === true) {
            this.props.navContext.data.addSaveCallback(this.objID, this.onClickSave)
            this.props.navContext.sync()
        } else if (prevState.modeEditing === true && this.state.modeEditing === false) {
            this.props.navContext.data.removeSaveCallback(this.props.formID, this.objID)
            this.props.navContext.sync()
        }
    }

    componentWillUnmount() {
        this.props.navContext.data.removeSaveCallback(this.props.formID, this.objID)
        this.props.navContext.sync()
    }

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
        )
    }
}
