import React, { Component } from "react"
import AvailabilitySelectorHandler from "./AvailabilitySelectorContainer"
import { AvailabilityCache } from "components/houseListing/dataContext"

import commonStyles from "../FormCommon.module.css"

export default class FormRentAvailabilityComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div id="form-2" className="form-series">
                    <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle}>Rental details</h1>
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div
                                        className="input number-disp no-background"
                                        onClick={() => {
                                            this.rentInput.focus()
                                        }}
                                    >
                                        <label>Rent</label>
                                        <input
                                            type="number"
                                            name="main-form-rent"
                                            min="0"
                                            id="id_main-form-rent"
                                            placeholder="$AUD"
                                            ref={input => {
                                                this.rentInput = input
                                            }}
                                            value={this.props.rent}
                                            onChange={e => this.props.onFieldChange("rent", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted">Per Week in AUD</small>
                                    {this.props.errors.rent && (
                                        <div className="invalid-feedback">{this.props.errors.rent}</div>
                                    )}
                                </div>
                                <div className="col-md-12 col-lg-6" />
                                <div className="col-md-12 col-lg-6">
                                    <div
                                        className="input number-disp no-background"
                                        onClick={() => {
                                            this.minStayInput.focus()
                                        }}
                                    >
                                        <label>Minimum length of stay</label>
                                        <input
                                            type="number"
                                            name="main-form-min_stay"
                                            min="28"
                                            id="id_main-form-min_stay"
                                            ref={input => {
                                                this.minStayInput = input
                                            }}
                                            value={this.props.minStay}
                                            onChange={e => this.props.onFieldChange("minStay", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted">
                                        In days. Minimum is 4 weeks (28 days).
                                    </small>
                                    {this.props.errors.minStay && (
                                        <div className="invalid-feedback">{this.props.errors.minStay}</div>
                                    )}
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div
                                        className="input number-disp no-background"
                                        onClick={() => {
                                            this.maxStayInput.focus()
                                        }}
                                    >
                                        Maximum length of stay
                                        <input
                                            type="number"
                                            name="main-form-max_stay"
                                            min="0"
                                            id="id_main-form-max_stay"
                                            ref={input => {
                                                this.maxStayInput = input
                                            }}
                                            value={this.props.maxStay}
                                            onChange={e => this.props.onFieldChange("maxStay", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted">in days. 0 signifies no limit.</small>
                                    {this.props.errors.maxStay && (
                                        <div className="invalid-feedback">{this.props.errors.maxStay}</div>
                                    )}
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div
                                        className="input number-disp no-background"
                                        onClick={() => {
                                            this.maxPeopleAllowedInput.focus()
                                        }}
                                    >
                                        <label>Maximum people allowed</label>
                                        <input
                                            type="number"
                                            name="main-form-max_people_allowed"
                                            min="1"
                                            id="id_main-form-max_people_allowed"
                                            ref={input => {
                                                this.maxPeopleAllowedInput = input
                                            }}
                                            value={this.props.maxPeopleAllowed}
                                            onChange={e => this.props.onFieldChange("maxPeopleAllowed", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted"></small>
                                    {this.props.errors.maxPeopleAllowed && (
                                        <div className="invalid-feedback">{this.props.errors.maxPeopleAllowed}</div>
                                    )}
                                </div>
                            </div>
                            <h1 className={commonStyles.pageTitle}>Set your availability</h1>

                            <div className="row">
                                <div className="col-md-12 col-lg-12">
                                    <AvailabilityCache.Consumer>
                                        {cache => (
                                            <AvailabilitySelectorHandler
                                                houseUUID={this.props.houseUUID}
                                                cache={cache}
                                                formID={this.props.formID}
                                            />
                                        )}
                                    </AvailabilityCache.Consumer>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
