import React, { Component } from "react"
import { alertUser } from "components/alert/Alert"
import DatePickerComponent from "core/UIComponents/DatePicker/DatePicker"
import Select from "react-select"
import styles from "./UserProfileContainer.module.css"
import { displayErrors } from "core/UIComponents/helpers"
import PostalCodeAutoSuggest from "core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer"
import CountryAutoSuggestContainer from "core/UIComponents/CountryAutoSuggest/CountryAutoSuggestContainer"
import autoSuggestTheme from "./AutoSuggestTheme.module.css"
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton"
import { UserPII } from "components/userAccount/models"
import { patchUserProfileData, getUserProfileData } from "components/userAccount/services"
import { getCountryData } from "core/UIComponents/CountryAutoSuggest/services"

const genderSelectStyles = {
    option: (provided, state) => ({
        ...provided,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = "opacity 300ms"

        return { ...provided, opacity, transition }
    },
    control: (provided, state) => ({
        border: "none",
        cursor: "text",
        display: "flex",
        "flex-wrap": "wrap",
        "padding-top": "6px",
        "padding-bottom": "6px",
    }),

    container: (provided, state) => ({
        position: "relative",
        "font-size": "15px",
        color: "#495057",
        "font-weight": "400",
        "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
        "padding-left": "0  ",
        "margin-top": "5px",
        "-webkit-transition": "all 0.30s ease-in-out",
        "-moz-transition": "all 0.30s ease-in-out",
        "-ms-transition": "all 0.30s ease-in-out",
        "-o-transition": "all 0.30s ease-in-out",
        "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
    }),
}

const genders = {
    M: "Male",
    F: "Female",
    O: "Other",
}

export default class UserProfileContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modeEditing: false,
            userInfo: new UserPII({}, "empty"),
            showSelectCountry: false,
            addBussinessNameField: false,
            billingCountryName: undefined,
        }

        this.maxDate = new Date()
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)

        this.genderList = []
        Object.entries(genders).map(item => {
            this.genderList.push({ value: item[0], label: item[1] })
        })

        this.containerRef = React.createRef()
    }

    componentDidMount() {
        if (this.state.userInfo.status === "empty") {
            this.getUserProfile()
        }
    }

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            userInfo: prevState.userInfo.setData(field, value),
        }))
    }

    getUserProfile = () => {
        getUserProfileData().then(result => {
            let billingCountryID = result.getData("billingCountryID")
            let accountType = result.getData("accountType")
            if (billingCountryID === "" || billingCountryID === null || billingCountryID === undefined) {
                this.setState(prevState => ({
                    ...prevState,
                    showSelectCountry: true,
                    userInfo: result,
                }))
            } else {
                if (accountType === "Business") {
                    this.setState(prevState => ({
                        ...prevState,
                        addBussinessNameField: true,
                        userInfo: result,
                    }))
                } else {
                    this.setState(prevState => ({
                        ...prevState,
                        userInfo: result,
                    }))
                }
                this.getCountryName(billingCountryID)
            }
        })
    }

    getCountryName = billingCountryID => {
        getCountryData(billingCountryID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    billingCountryName: result.name,
                }))
            })
            .catch(error => alertUser.init({ stockAlertType: "connectionError" }))
    }

    onSave = () => {
        const that = this
        return new Promise(function (resolve, reject) {
            patchUserProfileData(that.state.userInfo)
                .then(result => {
                    that.setState(prevState => ({
                        ...prevState,
                        userInfo: result,
                    }))
                    resolve(result)
                })
                .catch(error => {
                    that.forceUpdate()
                    reject(error)
                })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className={"offset-1 col-10 " + styles.mt70}>
                        <div className="row">
                            <div className="col-md-auto col-lg-1 col-xl-3" />
                            <div className="col-md-12 col-lg-10 col-xl-6">
                                <div className={styles.title}>
                                    <h1 className={styles.h1}>Please tell us more before you start listing</h1>
                                </div>
                                <div className="col-12">
                                    <div className={"row"} id={"formContainer"}>
                                        <div className="col-12">
                                            <div className="input">
                                                <div className="form-control no-background readonly-custom-input">
                                                    <div style={{ float: "left" }}>Account Type</div>
                                                    <div
                                                        style={{ float: "right" }}
                                                        onClick={() =>
                                                            alertUser.init({
                                                                message:
                                                                    "This field cannot be changed. Please contact us for further support.",
                                                                alertType: "danger",
                                                                autoHide: true,
                                                            })
                                                        }
                                                    >
                                                        <b>{this.state.userInfo.getData("accountType")}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.showSelectCountry ? (
                                            <React.Fragment>
                                                <CountryAutoSuggestContainer
                                                    errors={
                                                        this.state.userInfo.getErrorsForField("billingCountryID") || []
                                                    }
                                                    objID={this.state.userInfo.billingCountryID}
                                                    onFieldChange={value =>
                                                        this.onFieldChange("billingCountryID", value)
                                                    }
                                                    theme={autoSuggestTheme}
                                                />
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <div className="col-12">
                                                    <div className="input">
                                                        <div className="form-control no-background readonly-custom-input">
                                                            <div style={{ float: "left" }}>Country</div>
                                                            <div
                                                                style={{ float: "right" }}
                                                                onClick={() =>
                                                                    alertUser.init({
                                                                        message:
                                                                            "This field cannot be changed. Please contact us for further support.",
                                                                        alertType: "danger",
                                                                        autoHide: true,
                                                                    })
                                                                }
                                                            >
                                                                <b>{this.state.billingCountryName}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}
                                        {this.state.addBussinessNameField ? (
                                            <React.Fragment>
                                                <div className="col-12">
                                                    <div className="input no-background">
                                                        <input
                                                            type="text"
                                                            className="form-control no-background"
                                                            placeholder="Business Name"
                                                            style={{ paddingLeft: "10px" }}
                                                            value={this.state.userInfo.getData("businessName")}
                                                            onChange={e =>
                                                                this.onFieldChange("businessName", e.target.value)
                                                            }
                                                        />
                                                        {displayErrors(
                                                            this.state.userInfo.getErrorsForField("businessName")
                                                        )}
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : null}
                                        <div className="col-md-12 col-lg-6">
                                            <div className="input no-background">
                                                <input
                                                    type="text"
                                                    className="form-control no-background"
                                                    placeholder="First Name"
                                                    style={{ paddingLeft: "10px" }}
                                                    value={this.state.userInfo.getData("firstName")}
                                                    onChange={e => this.onFieldChange("firstName", e.target.value)}
                                                />
                                                {displayErrors(this.state.userInfo.getErrorsForField("firstName"))}
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-lg-6">
                                            <div className="input no-background">
                                                <input
                                                    type="text"
                                                    className="form-control no-background"
                                                    placeholder="Last Name"
                                                    style={{ paddingLeft: "10px" }}
                                                    value={this.state.userInfo.getData("lastName")}
                                                    onChange={e => this.onFieldChange("lastName", e.target.value)}
                                                />
                                                {displayErrors(this.state.userInfo.getErrorsForField("lastName"))}
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-lg-6">
                                            <div className="input no-background">
                                                <DatePickerComponent
                                                    label="Date of Birth"
                                                    value={this.state.userInfo.getData("DOB")}
                                                    onChange={date => this.onFieldChange("DOB", date)}
                                                    extraProps={{ maxDate: this.maxDate }}
                                                />

                                                {displayErrors(this.state.userInfo.getErrorsForField("DOB"))}
                                            </div>
                                        </div>

                                        <div className="col-md-12 col-lg-6">
                                            <Select
                                                styles={genderSelectStyles}
                                                options={this.genderList}
                                                placeholder="Select Gender"
                                                onChange={e => this.onFieldChange("sex", e.value)}
                                                value={{
                                                    value: this.state.userInfo.getData("sex"),
                                                    label: genders[this.state.userInfo.getData("sex")],
                                                }}
                                            />

                                            {displayErrors(this.state.userInfo.getErrorsForField("sex"))}
                                        </div>

                                        <div className="col-12">
                                            <div className="input no-background">
                                                <input
                                                    type="text"
                                                    className="form-control no-background"
                                                    placeholder="Contact Number"
                                                    style={{ paddingLeft: "10px" }}
                                                    value={this.state.userInfo.getData("contactNum")}
                                                    onChange={e => this.onFieldChange("contactNum", e.target.value)}
                                                />
                                                {displayErrors(this.state.userInfo.getErrorsForField("contactNum"))}
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="input">
                                                <div className="form-control no-background readonly-custom-input">
                                                    <div style={{ float: "left" }}>Email</div>
                                                    <div
                                                        style={{ float: "right" }}
                                                        onClick={() =>
                                                            alertUser.init({
                                                                message:
                                                                    "This field cannot be changed. Please contact us for further support.",
                                                                alertType: "danger",
                                                                autoHide: true,
                                                            })
                                                        }
                                                    >
                                                        <b>{this.state.userInfo.getData("email")}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="input no-background">
                                                <input
                                                    type="text"
                                                    className="form-control no-background"
                                                    placeholder="Street Address"
                                                    style={{ paddingLeft: "10px" }}
                                                    value={this.state.userInfo.getData("billingStreetAddress")}
                                                    onChange={e =>
                                                        this.onFieldChange("billingStreetAddress", e.target.value)
                                                    }
                                                />
                                                {displayErrors(
                                                    this.state.userInfo.getErrorsForField("billingStreetAddress")
                                                )}
                                            </div>
                                        </div>

                                        <PostalCodeAutoSuggest
                                            errors={this.state.userInfo.getErrorsForField("billingPostcodeID") || []}
                                            objID={this.state.userInfo.getData("billingPostcodeID")}
                                            onFieldChange={this.onFieldChange}
                                            identifier={"billingPostcodeID"}
                                            theme={autoSuggestTheme}
                                        />
                                        <div className={"col-12"} style={{ marginTop: "55px", marginBottom: "90px" }}>
                                            <APIRequestButton
                                                layoutClasses={"btn float-right imp-button-style"}
                                                cTextOptions={{
                                                    default: "Continue",
                                                    loading: "Saving",
                                                    done: "Saved",
                                                    error: "Error!",
                                                }}
                                                callback={this.onSave}
                                                containerID={"formContainer"}
                                                doneDisabled={true}
                                                onSuccess={this.props.verifyUser}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-auto col-lg-1 col-xl-3" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
