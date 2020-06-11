import React, { Component } from "react"
import { alertUser } from "components/alert/Alert"
import DatePickerComponent from "core/UIComponents/DatePicker/DatePicker"
import Select from "react-select"
import styles from "./PayoutInfoContainer.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp, faPen, faPlus } from "@fortawesome/free-solid-svg-icons"
import { displayErrors } from "core/UIComponents/helpers"
import PostalCodeAutoSuggest from "core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer"
import CountryAutoSuggestContainer from "core/UIComponents/CountryAutoSuggest/CountryAutoSuggestContainer"
import autoSuggestTheme from "./AutoSuggestTheme.module.css"
import APIRequestButton from "core/UIComponents/APIRequestButton/APIRequestButton"

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

export default class BillingInfoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modeEditing: false,
        }

        this.maxDate = new Date()
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)

        this.genderList = []
        Object.entries(genders).map(item => {
            this.genderList.push({ value: item[0], label: item[1] })
        })

        this.containerRef = React.createRef()
    }

    onFieldChange = (field, value) => {
        this.props.onFieldChange(field, value)
    }

    componentDidMount() {
        if (this.props.userInfo.status === "empty") {
            // Fetch house details
            this.props.getUserProfile()
        }
    }

    toggleEditState = val => {
        if (val === null || val === undefined) {
            this.setState(prevState => ({ modeEditing: !prevState.modeEditing }))
        } else {
            this.setState({ modeEditing: val })
        }
    }

    getEditButton = () => {
        let buttonConfig = {}
        if (this.props.verifying) {
            buttonConfig = {
                title: "Please Wait",
                action: e => {
                    e.stopPropagation()
                },
                icon: faPlus,
            }
        } else if (this.state.modeEditing) {
            buttonConfig = {
                title: "Collapse",
                action: e => {
                    e.stopPropagation()
                    this.toggleEditState(false)
                },
                icon: faChevronUp,
            }
        } else {
            buttonConfig = {
                title: "Edit",
                action: e => {
                    e.stopPropagation()
                    this.toggleEditState(true)
                },
                icon: faPen,
            }
        }

        return (
            <button
                className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                type="button"
                title={buttonConfig.title}
                onClick={buttonConfig.action}
                aria-controls={"collapsibleBillingInfo"}
            >
                <FontAwesomeIcon icon={buttonConfig.icon} />
            </button>
        )
    }

    getBadge = () => {
        if (this.props.status === "Incomplete") {
            return (
                <span className="badge badge-danger" style={{ marginLeft: "20px" }}>
                    Required
                </span>
            )
        } else if (this.props.status === "Complete") {
            return (
                <span className="badge badge-success" style={{ marginLeft: "20px" }}>
                    Complete
                </span>
            )
        } else {
            return null
        }
    }

    render() {
        if (this.state.modeEditing) {
            // $("#collapsibleBillingInfo").collapse("show")
        } else {
            // $("#collapsibleBillingInfo").collapse("hide")
        }

        return (
            <React.Fragment>
                <div className={"card mb-3 " + styles.accordionBorder}>
                    <div className={"card-body " + styles.cardBody}>
                        <div className={styles.cardTextContent}>
                            <span>
                                <b>Step 1: Billing Information</b>
                            </span>
                            {this.getBadge()}
                        </div>

                        <div className={styles.cardButtonGroup}>{this.getEditButton()}</div>
                    </div>
                    <div className={"collapse " + styles.cardContainer} id={"collapsibleBillingInfo"}>
                        <div
                            className={"col-11 " + styles.cardContainer}
                            style={{ borderTop: "1px solid #e9ebf0", padding: "40px" }}
                        >
                            <div className={"col-10"}>
                                <div className={"row"}>
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
                                                    <b>{this.props.userInfo.getData("accountType")}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.props.showSelectCountry ? (
                                        <React.Fragment>
                                            <CountryAutoSuggestContainer
                                                errors={this.props.userInfo.getErrorsForField("billingCountryID") || []}
                                                objID={this.props.userInfo.billingCountryID}
                                                onFieldChange={value =>
                                                    this.props.onFieldChange("billingCountryID", value)
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
                                                            <b>{this.props.billingCountryName}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {this.props.addBusinessNameField ? (
                                        <React.Fragment>
                                            <div className="col-12">
                                                <div className="input no-background">
                                                    <input
                                                        type="text"
                                                        className="form-control no-background"
                                                        placeholder="Business Name"
                                                        style={{ paddingLeft: "10px" }}
                                                        value={this.props.userInfo.getData("businessName")}
                                                        onChange={e =>
                                                            this.props.onFieldChange("businessName", e.target.value)
                                                        }
                                                    />
                                                    {displayErrors(
                                                        this.props.userInfo.getErrorsForField("businessName")
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
                                                value={this.props.userInfo.getData("firstName")}
                                                onChange={e => this.props.onFieldChange("firstName", e.target.value)}
                                            />
                                            {displayErrors(this.props.userInfo.getErrorsForField("firstName"))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <div className="input no-background">
                                            <input
                                                type="text"
                                                className="form-control no-background"
                                                placeholder="Last Name"
                                                style={{ paddingLeft: "10px" }}
                                                value={this.props.userInfo.getData("lastName")}
                                                onChange={e => this.props.onFieldChange("lastName", e.target.value)}
                                            />
                                            {displayErrors(this.props.userInfo.getErrorsForField("lastName"))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <div className="input no-background">
                                            <DatePickerComponent
                                                label="Date of Birth"
                                                value={this.props.userInfo.getData("DOB")}
                                                onChange={date => this.props.onFieldChange("DOB", date)}
                                                extraProps={{ maxDate: this.maxDate }}
                                            />

                                            {displayErrors(this.props.userInfo.getErrorsForField("DOB"))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <Select
                                            styles={genderSelectStyles}
                                            options={this.genderList}
                                            placeholder="Select Gender"
                                            onChange={e => this.props.onFieldChange("sex", e.value)}
                                            value={{
                                                value: this.props.userInfo.getData("sex"),
                                                label: genders[this.props.userInfo.getData("sex")],
                                            }}
                                        />

                                        {displayErrors(this.props.userInfo.getErrorsForField("sex"))}
                                    </div>

                                    <div className="col-12">
                                        <div className="input no-background">
                                            <input
                                                type="text"
                                                className="form-control no-background"
                                                placeholder="Contact Number"
                                                style={{ paddingLeft: "10px" }}
                                                value={this.props.userInfo.getData("contactNum")}
                                                onChange={e => this.props.onFieldChange("contactNum", e.target.value)}
                                            />
                                            {displayErrors(this.props.userInfo.getErrorsForField("contactNum"))}
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
                                                    <b>{this.props.userInfo.getData("email")}</b>
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
                                                value={this.props.userInfo.getData("billingStreetAddress")}
                                                onChange={e =>
                                                    this.props.onFieldChange("billingStreetAddress", e.target.value)
                                                }
                                            />
                                            {displayErrors(
                                                this.props.userInfo.getErrorsForField("billingStreetAddress")
                                            )}
                                        </div>
                                    </div>

                                    <PostalCodeAutoSuggest
                                        errors={this.props.userInfo.getErrorsForField("billingPostcodeID") || []}
                                        objID={this.props.userInfo.getData("billingPostcodeID")}
                                        onFieldChange={this.props.onFieldChange}
                                        identifier={"billingPostcodeID"}
                                        theme={autoSuggestTheme}
                                    />
                                    <div className={"col-12"} style={{ marginTop: "35px", marginBottom: "30px" }}>
                                        <APIRequestButton
                                            layoutClasses={"btn float-right imp-button-style"}
                                            cTextOptions={{
                                                default: "Save",
                                                loading: "Saving",
                                                done: "Saved",
                                                error: "Error!",
                                            }}
                                            callback={this.props.onSave}
                                            containerID={"collapsibleBillingInfo"}
                                            doneDisabled={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
