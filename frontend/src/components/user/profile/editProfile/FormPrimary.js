import React, { Component } from 'react';
import PostalCodeAutoSuggest from "sharedComponents/Containers/PostalCodeAutoSuggest/PostalCodeAutoSuggest";
import TextEdit from 'components/InputComponents/text';
import DatePicker from 'sharedComponents/Components/DatePicker/DatePicker';
// import DatePicker from 'react-date-picker';
import format from "date-fns/format";
import GenderSelectorComponent from './GenderSelector';

export default class FormPrimaryComponent extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="page-my-profile">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-1"></div>
                            <div className="col-xl-10">
                                <div className="row">
                                    <div className="col-md-11">
                                        <div className="row">
                                            <div className="col-md-5 col-lg-5 col-xl-5">
                                                {/* <div className="profile-image">
                                {% if not form2.profile_pic.value %}
                                <div id="add-image">
                                    <div className="text-center">
                                        <a className="btn btn-info" id="add-profile-pic">Add Profile Picture</a>
                                    </div>
                                </div>
                                {% else %}
                                <div className="tool" id="image-options">
                                    <ul className="list-inline">
                                        <li className="list-inline-item replace"><a href="#" id="upload-new-profile-pic"
                                                                                    title="Upload new Profile Pictue">Thubnail</a>
                                        </li>
                                        <li className="list-inline-item remove"><a href="#" id="delete-profile-pic"
                                                                                   title="Remove">Remove</a>
                                        </li>

                                    </ul>
                                </div>
                                {% endif %}
                                {{form2.profile_pic}}
                            </div> */}
                                                <div className="valid-feedback text-center" id="picture-feedback">
                                                    <b>Looks good! Save the page to complete Profile picture changes!</b>
                                                </div>
                                            </div>
                                            <div className="col-md-auto col-lg-2 col-xl-2"></div>
                                            <div className="col-md-6 col-lg-5 col-xl-5">
                                                <h1 className="title">Complete your profile information</h1>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="input no-background top-margin">
                                                            <input
                                                                type="text" name="main-form-first-name" required={true}
                                                                id="id_main-form-first-name"
                                                                className="form-control first-name" maxLength="250"
                                                                placeholder="First Name" value={this.props.firstName}
                                                                onChange={(e) => this.props.onFieldChange("firstName", e.target.value)}
                                                            />
                                                            {this.props.errors.firstName &&
                                                                <div className="invalid-feedback">{this.props.errors.firstName}</div>}
                                                        </div>
                                                        <small className="form-text text-muted">
                                                        </small>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="input no-background">
                                                            <input
                                                                type="text" name="main-form-last-name" required={true}
                                                                id="id_main-form-last-name"
                                                                className="form-control last-name" maxLength="250"
                                                                placeholder="Last Name" value={this.props.lastName}
                                                                onChange={(e) => this.props.onFieldChange("lastName", e.target.value)}
                                                            />
                                                            {this.props.errors.lastName &&
                                                                <div className="invalid-feedback">{this.props.errors.lastName}</div>}
                                                        </div>
                                                        <small className="form-text text-muted">
                                                        </small>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="input number-disp no-background contact-num" onClick={() => { this.contactNum.focus() }}>
                                                            <label>Contact Number</label>
                                                            <input
                                                                type="number" name="main-form-contact-num" id="id_main-form-contact-num"
                                                                ref={(input) => { this.contactNum = input; }}
                                                                min="0" value={this.props.contactNum}
                                                                onChange={(e) => this.props.onFieldChange("contactNum", e.target.value)}
                                                            />
                                                        </div>
                                                        {this.props.errors.contactNum &&
                                                            <div className="invalid-feedback">{this.props.errors.contactNum}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="input no-background">
                                                            <div className="form-control">
                                                                <DatePicker
                                                                    label='Date of Birth'
                                                                    value={this.props.dob}
                                                                    onChange={this.props.onFieldChange}
                                                                    datakey='dob'
                                                                    extraProps={{ maxDate: new Date() }}
                                                                />
                                                            </div>
                                                        </div>
                                                        {this.props.errors.dob &&
                                                            <div className="invalid-feedback">{this.props.errors.dob}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="input no-background">
                                                            <textarea
                                                                name="billing-street-address"
                                                                rows="10"
                                                                cols="40"
                                                                className="form-control"
                                                                id="id_billing_street_address"
                                                                placeholder="Billing Street Address"
                                                                spellCheck="false"
                                                                value={this.props.billingStreetAddress}
                                                                onChange={(e) => this.props.onFieldChange("billingStreetAddress", e.target.value)}
                                                            >
                                                            </textarea>
                                                        </div>
                                                        {this.props.errors.billingStreetAddress &&
                                                            <div className="invalid-feedback">{this.props.errors.billingStreetAddress}</div>}
                                                    </div>
                                                    <PostalCodeAutoSuggest
                                                        error={this.props.errors.billingPostcode || ''}
                                                        objID={this.props.billingPostcode}
                                                        onFieldChange={this.props.onFieldChange}
                                                        datakey="billingPostcode"
                                                        showsuburb={0}
                                                    />
                                                    <div className="col-md-12">
                                                        <div className="input no-background">
                                                            {/* {{ form2.billing_country }} */}
                                                        </div>
                                                        {this.props.errors.billing_country &&
                                                            <div className="invalid-feedback">{this.props.errors.billing_country}</div>}
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="select">
                                                            <GenderSelectorComponent
                                                                onFieldChange={this.props.onFieldChange}
                                                                value={this.props.gender}
                                                                formOptions={{
                                                                    'M': 'Male',
                                                                    'F': 'Female'
                                                                }}
                                                            />
                                                            {this.props.errors.gender &&
                                                            <div className="invalid-feedback">{this.props.errors.gender}</div>}
                                                        </div>
                                                        <small className="form-text text-muted">
                                                        </small>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <p className="info-note"><span>Please Note:</span> We wil not disclose your contact
                                        details until the booking is confirmed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-12">
                    <div className="button">
                        <button className="btn btn-link" onClick={this.props.onClickSave}>Save</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
