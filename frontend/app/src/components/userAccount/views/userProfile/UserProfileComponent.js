import React from "react"
import { NavLink } from "react-router-dom"
import { reverse } from "named-urls"
import routes from "routes"
import styles from "./UserProfile.css"
import UploadProfilePicContainer from "./UploadProfilePicContainer"
import Select from "react-select"
import DatePickerComponent from "core/UIComponents/DatePicker/DatePicker"
import { alertUser } from "core/alert/Alert"
import PostalCodeAutoSuggest from "core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer"

import postalCodeStyle from "./PostalCode.css"
import CountryAutoSuggestContainer from "core/UIComponents/CountryAutoSuggest/CountryAutoSuggestContainer"
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
        height: "calc(2.25rem + 15px)",
    }),

    container: (provided, state) => ({
        position: "relative",
        "font-size": "15px",
        color: "#495057",
        fontWeight: "400",
        "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
        "padding-left": "0",
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

export default function UserProfileComponent(props) {
    const getError = inputKey => {
        if (props.errors.hasOwnProperty(inputKey)) {
            let errorList = props.errors[inputKey]
            let disp = []
            for (let i = 0; i < errorList.length; i++) {
                disp.push(
                    <div key={i} className="invalid-feedback">
                        {props.errors[inputKey]}
                    </div>
                )
            }
            return <React.Fragment>{disp}</React.Fragment>
        } else {
            return null
        }
    }

    let genderList = []
    Object.entries(genders).map(item => {
        genderList.push({ value: item[0], label: item[1] })
    })

    // let maxDate = new Date();
    // maxDate.setFullYear(maxDate.getFullYear() - 16);

    return (
        <React.Fragment>
            <div className={styles.profilePage}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-1" />
                        <div className="col-xl-10">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={styles.header}>
                                        <ul
                                            className={"list-inline " + styles.listInline}
                                            style={{ marginBottom: "0" }}
                                        >
                                            <li className="list-inline-item">
                                                <NavLink
                                                    to={reverse(routes.pages.user.userProfile)}
                                                    className={styles.btn + " btn btn-link"}
                                                    activeClassName={styles.active}
                                                >
                                                    My Account
                                                </NavLink>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    href={reverse(routes.pages.user.paymentInfo)}
                                                    className={styles.btn + " btn btn-link"}
                                                >
                                                    Payment Information
                                                </a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    href="/accounts/password/change/"
                                                    className={styles.btn + " btn btn-link"}
                                                >
                                                    Change Password
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <div className="row">
                                        <div className="col-md-auto col-lg-1 col-xl-1" />
                                        <div className="col-md-5 col-lg-4 col-xl-4">
                                            <UploadProfilePicContainer />
                                        </div>
                                        <div className="col-md-auto col-lg-1 col-xl-1" />
                                        <div className="col-md-6 col-lg-6 col-xl-6" id={"main-form"}>
                                            <h1 className={styles.title}>Account Information</h1>
                                            <div className="row">
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
                                                                <b>{props.accountType}</b>
                                                            </div>
                                                        </div>
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
                                                                <b>{props.email}</b>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <CountryAutoSuggestContainer
                                                    errors={props.errors.billingCountryID || []}
                                                    objID={props.billingCountryID}
                                                    onFieldChange={value =>
                                                        props.onFieldChange("billingCountryID", value)
                                                    }
                                                    theme={postalCodeStyle}
                                                />

                                                <div className="col-6">
                                                    <div className="input no-background">
                                                        <input
                                                            type="text"
                                                            value={props.firstName}
                                                            maxLength="30"
                                                            className="form-control"
                                                            required="required"
                                                            onChange={e =>
                                                                props.onFieldChange("firstName", e.target.value)
                                                            }
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                    <small className="form-text text-muted"></small>
                                                    {getError("firstName")}
                                                </div>
                                                <div className="col-6">
                                                    <div className="input no-background">
                                                        <input
                                                            type="text"
                                                            value={props.lastName}
                                                            maxLength="30"
                                                            className="form-control"
                                                            required="required"
                                                            onChange={e =>
                                                                props.onFieldChange("lastName", e.target.value)
                                                            }
                                                            placeholder="Last Name"
                                                        />
                                                    </div>
                                                    <small className="form-text text-muted"></small>
                                                    {getError("lastName")}
                                                </div>

                                                <div className="col-md-12 col-lg-6">
                                                    <div className="input no-background">
                                                        <DatePickerComponent
                                                            label="Date of Birth"
                                                            value={props.DOB}
                                                            onChange={date => {
                                                                props.onFieldChange("DOB", date)
                                                            }}
                                                            // extraProps={{maxDate: maxDate}}
                                                        />

                                                        {getError("DOB")}
                                                    </div>
                                                </div>

                                                <div className="col-md-12 col-lg-6">
                                                    <Select
                                                        styles={genderSelectStyles}
                                                        options={genderList}
                                                        placeholder="Select Gender"
                                                        onChange={e => props.onFieldChange("sex", e.value)}
                                                        value={{ value: props.sex, label: genders[props.sex] }}
                                                    />

                                                    {getError("sex")}
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="input no-background">
                                                        <input
                                                            type="text"
                                                            value={props.contactNum}
                                                            className="form-control"
                                                            onChange={e =>
                                                                props.onFieldChange("contactNum", e.target.value)
                                                            }
                                                            placeholder="Contact Number"
                                                        />
                                                    </div>
                                                    <small className="form-text text-muted"></small>
                                                    {getError("contactNum")}
                                                </div>

                                                <div className="col-md-12">
                                                    <p className={styles.infoText}>
                                                        <span>Please Note:</span> We wil not disclose your contact
                                                        details until the booking is confirmed.
                                                    </p>
                                                </div>
                                            </div>

                                            <h1 className={styles.title} style={{ marginTop: "30px" }}>
                                                Billing Address
                                            </h1>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="input no-background">
                                                        <input
                                                            type="text"
                                                            value={props.billingStreetAddress}
                                                            className="form-control"
                                                            onChange={e =>
                                                                props.onFieldChange(
                                                                    "billingStreetAddress",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Street Address"
                                                        />
                                                    </div>
                                                    <small className="form-text text-muted"></small>
                                                    {getError("billingStreetAddress")}
                                                </div>
                                                <PostalCodeAutoSuggest
                                                    errors={props.errors.billingPostcodeID || []}
                                                    objID={props.billingPostcodeID}
                                                    onFieldChange={props.onFieldChange}
                                                    identifier={"billingPostcodeID"}
                                                    theme={postalCodeStyle}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12" style={{ marginTop: "100px", marginBottom: "20px" }}>
                                    <APIRequestButton
                                        textOption={"save"}
                                        callback={props.onSave}
                                        containerID={"main-form"}
                                        initialState={"done"}
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
