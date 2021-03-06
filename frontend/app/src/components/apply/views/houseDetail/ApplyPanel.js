import React, { Component } from "react"
import Select from "react-select"
import PaymentPanel from "./PaymentPanel"
import styles from "./HouseDetailPage.module.css"
import { displayErrors } from "core/UIComponents/helpers"

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
        flexWrap: "wrap",
        paddingTop: "6px",
        paddingBottom: "6px",
        height: "calc(2.25rem + 15px)",
    }),

    container: (provided, state) => ({
        position: "relative",
        fontSize: "15px",
        color: "#495057",
        fontWeight: "400",
        borderBottom: state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
        paddingLeft: "0",
        WebkitTransition: "all 0.30s ease-in-out",
        MozTransition: "all 0.30s ease-in-out",
        msTransition: "all 0.30s ease-in-out",
        OTransition: "all 0.30s ease-in-out",
        boxShadow: state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
    }),
}

const genders = {
    M: "Male",
    F: "Female",
    O: "Other",
}

export default class ApplyPanel extends Component {
    constructor(props) {
        super(props)
        this.genderList = []
        Object.entries(genders).forEach(item => {
            this.genderList.push({ value: item[0], label: item[1] })
        })
    }

    render() {
        let application = this.props.application
        let onFieldChange = this.props.onFieldChange

        return (
            <React.Fragment>
                <h3 className={styles.hl3} style={{ marginTop: "30px" }}>
                    About Yourself
                </h3>
                <div className="row">
                    <div className="col-md-5">
                        <div className="input no-background top-margin">
                            <input
                                type="text"
                                className="form-control"
                                placeholder={"First name"}
                                value={application.getData("applicant.firstName")}
                                onChange={e => onFieldChange("applicant.firstName", e.target.value)}
                            />
                            {displayErrors(application.getErrorsForField("applicant.firstName"))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                value={application.getData("applicant.lastName")}
                                onChange={e => onFieldChange("applicant.lastName", e.target.value)}
                            />
                            {displayErrors(application.getErrorsForField("applicant.lastName"))}
                        </div>
                    </div>
                    <div className="col-md-1" />
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email Address"
                                value={application.getData("applicant.email")}
                                onChange={e => onFieldChange("applicant.email", e.target.value)}
                            />
                            {displayErrors(application.getErrorsForField("applicant.email"))}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="input no-background">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Phone number"
                                value={application.getData("applicant.contactNum")}
                                onChange={e => onFieldChange("applicant.contactNum", e.target.value)}
                            />
                            {displayErrors(application.getErrorsForField("applicant.contactNum"))}
                        </div>
                    </div>
                    <div className="col-md-1" />
                    <div className="col-md-5 col-lg-5">
                        <Select
                            styles={genderSelectStyles}
                            options={this.genderList}
                            placeholder="Select Gender"
                            onChange={e => onFieldChange("applicant.sex", e.value)}
                            value={
                                application.getData("applicant.sex") !== ""
                                    ? {
                                          value: application.getData("applicant.sex"),
                                          label: genders[application.getData("applicant.sex")],
                                      }
                                    : null
                            }
                        />
                        {displayErrors(application.getErrorsForField("applicant.sex"))}
                    </div>
                </div>
                <h3 className={styles.hl4}>Message for {this.props.homeOwnerName}</h3>
                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Who are you? Are you a Student? What do you do?&#10;What're you like as a tenant? Are you quiet? Extrovert?&#10;What brings you here?"
                    value={application.getData("message")}
                    onChange={e => onFieldChange("message", e.target.value)}
                />
                {displayErrors(application.getErrorsForField("message"))}

                <h2 className={styles.hl3} style={{ marginTop: "40px" }}>
                    Payment
                </h2>

                <PaymentPanel
                    updatePaymentID={value => onFieldChange("paymentID", value)}
                    name={`${application.getData("applicant.firstName")} ${application.getData("applicant.lastName")}`}
                    requestForToken={"gg"}
                    checkoutFormRef={this.props.checkoutFormRef}
                />

                <div className="checkbox auto-width" style={{ marginTop: "60px" }}>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="checkbox-1"
                                    className="custom-control-input"
                                    onChange={() =>
                                        onFieldChange(
                                            "houseRulesAgreement",
                                            !application.getData("houseRulesAgreement")
                                        )
                                    }
                                    checked={application.getData("houseRulesAgreement")}
                                />
                                <label className="custom-control-label" htmlFor="checkbox-1">
                                    I agree to abide by the owner's house rules
                                </label>
                            </div>
                            {displayErrors(application.getErrorsForField("houseRulesAgreement"))}
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="checkbox-2"
                                    className="custom-control-input"
                                    onChange={() =>
                                        onFieldChange(
                                            "houseAmountAgreement",
                                            !application.getData("houseAmountAgreement")
                                        )
                                    }
                                    checked={application.getData("houseAmountAgreement")}
                                />
                                <label className="custom-control-label" htmlFor="checkbox-2">
                                    I agree to pay the total amount shown if the host accepts my application
                                </label>
                            </div>
                            {displayErrors(application.getErrorsForField("houseAmountAgreement"))}
                        </li>
                        <li className="list-inline-item">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    id="checkbox-3"
                                    className="custom-control-input"
                                    onChange={() =>
                                        onFieldChange(
                                            "rentalityRulesAgreement",
                                            !application.getData("rentalityRulesAgreement")
                                        )
                                    }
                                    checked={application.getData("rentalityRulesAgreement")}
                                />
                                <label className="custom-control-label" htmlFor="checkbox-3">
                                    I accept Rentality's Terms and Conditions
                                </label>
                            </div>
                            {displayErrors(application.getErrorsForField("rentalityRulesAgreement"))}
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}
