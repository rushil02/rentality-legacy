import React, {Component} from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {alertUser} from "core/alert/Alert";
import DatePickerComponent from "core/UIComponents/DatePicker/DatePicker";
import Select from "react-select";
import styles from "./PayoutInfoContainer.css";
import {PulseLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faPen, faPlus} from "@fortawesome/free-solid-svg-icons";
import {UserPII} from "userAccount/models";
import {getUserProfileData} from "userAccount/services";
import {displayErrors} from "core/UIComponents/helpers";


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


export default class BillingInfoContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modeEditing: false,
            inSyncMode: false,
            userInfo: new UserPII({}, 'empty'),
        }
    }

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            userInfo: prevState.userInfo.setData(field, value)
        }));
    };

    onSave = () => {
        return new Promise(function (resolve, reject) {
            resolve()

        })
    };

    componentDidMount() {
        if (this.state.userInfo.status === 'empty') {
            // Fetch house details
            getUserProfileData()
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            userInfo: result,
                        })
                    );
                    console.log(result)
                    // this.props.navContext.data.updateFormState(this.formID, 'saved');
                    // this.props.navContext.sync();
                });
        } else {
            // this.props.navContext.data.updateFormState(this.formID, this.state.data.status);
        }
    }

    toggleEditState = (val) => {
        if (val === null || val === undefined) {
            this.setState(prevState => ({modeEditing: !prevState.modeEditing}))
        } else {
            this.setState({modeEditing: val})
        }
    };

    getEditButton = () => {
        let buttonConfig = {};
        if (this.props.verifying) {
            buttonConfig = {
                title: "Please Wait",
                action: (e) => {
                    e.stopPropagation();
                },
                icon: faPlus,
            };
        } else if (this.state.modeEditing) {
            buttonConfig = {
                title: "Save",
                action: (e) => {
                    e.stopPropagation();
                    this.onSave();
                    this.toggleEditState(false)
                },
                icon: faCheck,
            };
        } else {
            buttonConfig = {
                title: "Edit",
                action: (e) => {
                    e.stopPropagation();
                    this.toggleEditState(true)
                },
                icon: faPen,
            };
        }

        return (
            <button
                className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                type="button"
                title={buttonConfig.title}
                onClick={buttonConfig.action}
                aria-controls={"collapsibleBillingInfo"}>
                <FontAwesomeIcon icon={buttonConfig.icon}/>
            </button>
        )
    };

    getBadge = () => {
        if (this.props.status === 'Incomplete') {
            return (
                <span className="badge badge-danger" style={{marginLeft: "20px"}}>Required</span>
            )
        } else {
            return null
        }
    };

    render() {
        if (this.state.modeEditing) {
            $("#collapsibleBillingInfo").collapse('show');
        } else {
            $("#collapsibleBillingInfo").collapse('hide');
        }

        let genderList = [];
        Object.entries(genders).map((item) => {
            genderList.push({value: item[0], label: item[1]})
        });


        return (
            <React.Fragment>
                <div className={"card mb-3 " + styles.accordionBorder}>
                    <div className={"card-body " + styles.cardBody}>
                        <div className={styles.cardTextContent}>
                            <span><b>Billing Information</b></span>
                            {this.getBadge()}
                        </div>
                        <div className='loading-container'>
                            <PulseLoader
                                // css={override}
                                sizeUnit={"px"}
                                size={10}
                                color={'#3fc692'}
                                loading={this.state.inSyncMode}
                            />
                        </div>

                        <div className={styles.cardButtonGroup}>
                            {this.getEditButton()}
                        </div>
                    </div>
                    <div className={"collapse " + styles.cardContainer} id={"collapsibleBillingInfo"}>
                        <div className={"col-11 " + styles.cardContainer}
                             style={{borderTop: "1px solid #e9ebf0", padding: "40px"}}>
                            <div className={"col-10"}>
                                <div className={"row"}>

                                    <div className="col-12">
                                        <div className="input">
                                            <div className="form-control no-background readonly-custom-input">
                                                <div style={{float: 'left'}}>Account Type</div>
                                                <div style={{float: 'right'}}
                                                     onClick={() => alertUser.init({
                                                         message: 'This field cannot be changed. Please contact us for further support.',
                                                         alertType: "danger",
                                                         autoHide: true
                                                     })}><b>{this.state.userInfo.getData("accountType")}</b>
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
                                                         })}><b>{this.state.userInfo.getData("billingCountryID")}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    <div className="col-md-12 col-lg-6">
                                        <div className="input no-background">
                                            <input type="text"
                                                   className="form-control no-background"
                                                   placeholder="First Name"
                                                   style={{"paddingLeft": "10px"}}
                                                   value={this.state.userInfo.getData("firstName")}
                                                   onChange={(e) => this.onFieldChange("firstName", e.target.value)}/>
                                            {displayErrors(this.state.userInfo.getErrorsForField('firstName'))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <div className="input no-background">
                                            <input type="text"
                                                   className="form-control no-background"
                                                   placeholder="Last Name"
                                                   style={{"paddingLeft": "10px"}}
                                                   value={this.state.userInfo.getData("lastName")}
                                                   onChange={(e) => this.onFieldChange("lastName", e.target.value)}/>
                                            {displayErrors(this.state.userInfo.getErrorsForField('lastName'))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <div className="input no-background">
                                            <DatePickerComponent
                                                label='Date of Birth'
                                                value={this.state.userInfo.getData("DOB")}
                                                onChange={(date) => this.onFieldChange('DOB', date)}
                                                extraProps={{maxDate: new Date()}}
                                            />

                                            {displayErrors(this.state.userInfo.getErrorsForField('DOB'))}
                                        </div>
                                    </div>

                                    <div className="col-md-12 col-lg-6">
                                        <Select
                                            styles={genderSelectStyles}
                                            options={genderList}
                                            placeholder="Select Gender"
                                            onChange={(e) => this.state.onFieldChange("sex", e.value)}
                                            value={{value: this.state.userInfo.getData("sex"), label: genders[this.state.userInfo.getData("sex")]}}
                                        />

                                        {displayErrors(this.state.userInfo.getErrorsForField('sex'))}

                                    </div>

                                    <div className="col-12">
                                        <div className="input no-background">
                                            <input type="text"
                                                   className="form-control no-background"
                                                   placeholder="Contact Number"
                                                   style={{"paddingLeft": "10px"}}
                                                   value={this.state.userInfo.getData("contactNum")}
                                                   onChange={(e) => this.onFieldChange("contactNum", e.target.value)}/>
                                            {displayErrors(this.state.userInfo.getErrorsForField('contactNum'))}
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
                                                     })}><b>{this.state.userInfo.getData("email")}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="input no-background">
                                            <input type="text"
                                                   className="form-control no-background"
                                                   placeholder="Street Address"
                                                   style={{"paddingLeft": "10px"}}
                                                   value={this.state.userInfo.getData("billingStreetAddress")}
                                                   onChange={(e) => this.onFieldChange("billingStreetAddress", e.target.value)}/>
                                            {displayErrors(this.state.userInfo.getErrorsForField('billingStreetAddress'))}
                                        </div>
                                    </div>


                                    {/*<div className="col-md-auto col-lg-1 col-xl-1"/>*/}
                                    {/*<div className="col-md-12 col-lg-4 col-xl-5">*/}
                                    {/*    <div className="row">*/}
                                    {/*        /!*<div className="col-md-12">*!/*/}
                                    {/*        /!*    <div className="input no-background">*!/*/}
                                    {/*        /!*        <input type="text" className="inp-routing-number form-control"*!/*/}
                                    {/*        /!*               name="routing_number" placeholder="BSB"/>*!/*/}
                                    {/*        /!*    </div>*!/*/}
                                    {/*        /!*    <div id="bank-error-message" className="invalid-feedback"/>*!/*/}
                                    {/*        /!*</div>*!/*/}
                                    {/*        /!*<div className="col-md-12">*!/*/}
                                    {/*        /!*    <div className="input no-background">*!/*/}
                                    {/*        /!*        <input type="text" className="inp-account-number form-control"*!/*/}
                                    {/*        /!*               name="account_number" placeholder="Account Number"/>*!/*/}
                                    {/*        /!*    </div>*!/*/}
                                    {/*        /!*    <div id="bank-warning-message" className="invalid-feedback"/>*!/*/}
                                    {/*        /!*</div>*!/*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                    <div className={"col-12"} style={{marginTop: "35px", marginBottom: "30px"}}>
                                        <a type="button" className={'float-right imp-button-style'}
                                           onClick={this.onSave}>
                                            Save
                                        </a>
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