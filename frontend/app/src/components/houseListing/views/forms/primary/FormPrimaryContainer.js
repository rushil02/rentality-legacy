import React, {Component} from "react"
import FormPrimaryComponent from "./FormPrimaryComponent"
import {getHouseData, postHouseData, patchHouseData} from "components/houseListing/services"
import {House} from "components/houseListing/models"

export default class FormPrimaryContainer extends Component {
    formID = 1

    constructor(props) {
        super(props)
        if (props.cache.data === undefined) {
            this.state = {
                data: new House({}, "empty"),
            }
        } else {
            this.state = {
                data: props.cache.data,
            }
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "initial", "About the Property")

        if (this.props.mode === "edit") {
            if (this.state.data.status === "empty") {
                // Fetch house details
                getHouseData(this.props.houseUUID).then(result => {
                    this.setState(prevState => ({
                        ...prevState,
                        data: result,
                    }))
                    this.props.navContext.data.updateFormState(this.formID, "saved")
                    this.props.navContext.sync()
                })
            } else {
                this.props.navContext.data.updateFormState(this.formID, this.state.data.status)
            }
        } // else mode === create

        this.props.navContext.sync()
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject("mainData", () => this.state.data)
        this.props.navContext.data.unloadForm()
    }

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState.data.setData(field, value),
        }))
        this.props.navContext.data.updateCurrentFormState("hasChanged")
        this.props.navContext.sync()
    }

    onSave = e => {
        e.stopPropagation()
        const that = this
        if (this.props.mode === "edit") {
            return new Promise(function (resolve, reject) {
                patchHouseData(that.props.houseUUID, that.state.data)
                    .then(house => {
                        that.setState({data: house})
                        that.props.navContext.data.updateFormState(that.formID, "saved")
                        that.props.navContext.sync()
                        resolve(house)
                    })
                    .catch(error => {
                        that.forceUpdate()
                        that.props.navContext.data.updateFormState(that.formID, "error")
                        that.props.navContext.sync()
                        reject(error)
                    })
            })
        } else {
            return new Promise(function (resolve, reject) {
                postHouseData(that.state.data)
                    .then(house => {
                        console.log("HE123RER")
                        that.setState({data: house})
                        that.props.navContext.data.updateFormState(that.formID, "saved")
                        that.props.navContext.sync()
                        console.log("HERER")

                        resolve(house)
                    })
                    .catch(error => {
                        console.log(error);
                        that.forceUpdate()
                        that.props.navContext.data.updateFormState(that.formID, "error")
                        that.props.navContext.sync()
                        reject(error)
                    })
            })
        }
    }

    render() {
        return (
            <FormPrimaryComponent
                onFieldChange={this.onFieldChange}
                errors={this.state.data.errors}
                title={this.state.data.getData("title")}
                houseNum={this.state.data.getData("houseNum")}
                streetName={this.state.data.getData("streetName")}
                postalCodeID={this.state.data.getData("postalCodeID")}
                homeType={this.state.data.getData("homeType")}
                furnished={this.state.data.getData("furnished")}
                numBedrooms={this.state.data.getData("numBedrooms")}
                numBathrooms={this.state.data.getData("numBathrooms")}
                numParkSpaces={this.state.data.getData("numParkSpaces")}
            />
        )
    }
}
