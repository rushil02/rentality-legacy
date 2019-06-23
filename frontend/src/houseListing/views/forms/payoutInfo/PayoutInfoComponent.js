import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {alertUser} from "core/alert/Alert";
import DatePickerComponent from "core/UIComponents/DatePicker/DatePicker";
import Select from "react-select";
import FileInputComponent from "core/UIComponents/FileInput/FileInputComponent";

const genderSelectStyles = {
    option: (provided, state) => ({
        ...provided,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
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
        "position": "relative",
        "font-size": "15px",
        "color": "#495057",
        "font-weight": "400",
        "border-bottom": state.isFocused ? "1px solid #3fc692" : "1px solid #c7cdd9",
        "padding-left": "0  ",
        "margin-top": "5px",
        "-webkit-transition": "all 0.30s ease-in-out",
        "-moz-transition": "all 0.30s ease-in-out",
        "-ms-transition": "all 0.30s ease-in-out",
        "-o-transition": "all 0.30s ease-in-out",
        "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
    })
};

const genders = {
    'M': 'Male', 'F': 'Female', 'O': 'Other'
};

export default function PayoutInfoComponent(props) {
    const getError = (inputKey) => {
        if (props.errors.hasOwnProperty(inputKey)) {
            let errorList = props.errors[inputKey];
            let disp = [];
            for (let i = 0; i < errorList.length; i++) {
                disp.push(<div key={i} className="invalid-feedback">{props.errors[inputKey]}</div>)
            }
            return <React.Fragment>{disp}</React.Fragment>
        } else {
            return null
        }
    };

    let genderList = [];
    Object.entries(genders).map((item) => {
        genderList.push({value: item[0], label: item[1]})
    });

    return (
        <React.Fragment>
            <div className="col-md-11">
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-11">
                        <h1 className="title">Your Bank Account Details and Identity Verification</h1>
                    </div>
                    <div className="col-md-auto col-lg-1 col-xl-1"/>
                    <div className="col-md-12 col-lg-6 col-xl-5">
                        <div className="row">

                            <div className="col-12">
                                <div className="input">
                                    <div className="form-control no-background readonly-custom-input">
                                        <div style={{float: 'left'}}>Account Type</div>
                                        <div style={{float: 'right'}}
                                             onClick={() => alertUser.init({
                                                 message: 'This field cannot be changed. Please contact us for further support.',
                                                 alertType: "danger",
                                                 autoHide: true
                                             })}><b>{props.accountType}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input">
                                    <div className="form-control no-background readonly-custom-input">
                                        <div style={{float: 'left'}}>Country</div>
                                        <div style={{float: 'right'}}
                                             onClick={() => alertUser.init({
                                                 message: 'This field cannot be changed. Please contact us for further support.',
                                                 alertType: "danger",
                                                 autoHide: true
                                             })}><b>{props.billingCountry}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6">
                                <div className="input no-background">
                                    <input type="text"
                                           className="form-control no-background" placeholder="First Name"
                                           style={{"paddingLeft": "10px"}} value={props.firstName}
                                           onChange={(e) => props.onFieldChange("firstName", e.target.value)}/>
                                    {getError('firstName')}
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6">
                                <div className="input no-background">
                                    <input type="text"
                                           className="form-control no-background" placeholder="Last Name"
                                           style={{"paddingLeft": "10px"}} value={props.lastName}
                                           onChange={(e) => props.onFieldChange("lastName", e.target.value)}/>
                                    {getError('lastName')}
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6">
                                <div className="input no-background">
                                    <DatePickerComponent
                                        label='Date of Birth'
                                        value={props.DOB}
                                        onChange={(date) => props.onFieldChange('DOB', date)}
                                        extraProps={{maxDate: new Date()}}
                                    />

                                    {getError('DOB')}
                                </div>
                            </div>

                            <div className="col-md-12 col-lg-6">
                                <Select
                                    styles={genderSelectStyles}
                                    options={genderList}
                                    placeholder="Select Gender"
                                    onChange={(e) => props.onFieldChange("sex", e.value)}
                                    value={{value: props.sex, label: genders[props.sex]}}
                                />

                                {getError('sex')}

                            </div>

                            <div className="col-12">
                                <div className="input no-background">
                                    <input type="text"
                                           className="form-control no-background" placeholder="Contact Number"
                                           style={{"paddingLeft": "10px"}} value={props.contactNum}
                                           onChange={(e) => props.onFieldChange("contactNum", e.target.value)}/>
                                    {getError('contactNum')}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input">
                                    <div className="form-control no-background readonly-custom-input">
                                        <div style={{float: 'left'}}>Email</div>
                                        <div style={{float: 'right'}}
                                             onClick={() => alertUser.init({
                                                 message: 'This field cannot be changed. Please contact us for further support.',
                                                 alertType: "danger",
                                                 autoHide: true
                                             })}><b>{props.email}</b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input no-background">
                                    <input type="text"
                                           className="form-control no-background" placeholder="Street Address"
                                           style={{"paddingLeft": "10px"}} value={props.billingStreetAddress}
                                           onChange={(e) => props.onFieldChange("billingStreetAddress", e.target.value)}/>
                                    {getError('billingStreetAddress')}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="input no-background">
                                    <FileInputComponent label={"Identity Verification Document (Optional)"}/>
                                    {getError('billingStreetAddress')}
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-md-auto col-lg-1 col-xl-1"/>
                    <div className="col-md-12 col-lg-4 col-xl-5">
                        <div className="row">
                            {/*<div className="col-md-12">*/}
                            {/*    <div className="input no-background">*/}
                            {/*        <input type="text" className="inp-routing-number form-control"*/}
                            {/*               name="routing_number" placeholder="BSB"/>*/}
                            {/*    </div>*/}
                            {/*    <div id="bank-error-message" className="invalid-feedback"/>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-12">*/}
                            {/*    <div className="input no-background">*/}
                            {/*        <input type="text" className="inp-account-number form-control"*/}
                            {/*               name="account_number" placeholder="Account Number"/>*/}
                            {/*    </div>*/}
                            {/*    <div id="bank-warning-message" className="invalid-feedback"/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className="row" style={{"marginTop": "50px"}}>
                    {/*<div className="col-md-12 text-right">*/}
                    {/*    <p>By clicking, you agree to <a href="/pages/tos/">our*/}
                    {/*        terms</a>*/}
                    {/*        and the <a href="https://stripe.com/au/connect-account/legal">Stripe*/}
                    {/*            Connected*/}
                    {/*            Account Agreement</a>.</p>*/}
                    {/*</div>*/}
                    {/*<div className="col-md-12">*/}
                    {/*    <div className="button top-margin">*/}

                    {/*        <button type="submit" className="btn btn-link" id="submit-and-exit">Save and*/}
                    {/*            Exit*/}
                    {/*        </button>*/}
                    {/*        <a type="submit" className="btn btn-link" id="next-step">List house</a>*/}
                    {/*        <button type="submit" className="btn btn-link d-none" id="list-now">Empty*/}
                    {/*        </button>*/}
                    {/*        <a type="button"*/}
                    {/*           href="/property/add/f45d9cff-0544-44b7-9f43-400fd95b44a7/#form-11"*/}
                    {/*           className="btn btn-link" id="prev-step">Back</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

            </div>
        </React.Fragment>
    )
}