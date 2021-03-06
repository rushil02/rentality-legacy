import React from "react"
import PostalCodeAutoSuggest from "core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer"
import HomeTypeSelectorComponent from "./HomeTypeSelector"
import FurnishedSelectorComponent from "./FurnishedSelector"
import { FormOptionsCache } from "components/houseListing/dataContext"

import styles from "./FormPrimary.module.css"
import commonStyles from "../FormCommon.module.css"
import { displayErrors } from "core/UIComponents/helpers"

export default function FormPrimaryComponent(props) {
    let inputRefs = {}
    return (
        <React.Fragment>
            <div id="form-1" className="form-series">
                <div className="row">
                    <div className="col-md-1" />
                    <div className="col-md-10">
                        <h1 className={commonStyles.pageTitle}>About the Property</h1>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input title">
                                    <input
                                        type="text"
                                        name="main-form-title"
                                        required={true}
                                        id="id_main-form-title"
                                        className={"form-control " + styles.title}
                                        maxLength="250"
                                        placeholder="Property Name"
                                        value={props.title}
                                        onChange={e => props.onFieldChange("title", e.target.value)}
                                        autoComplete={"off"}
                                    />
                                    {displayErrors(props.errors.title)}
                                </div>
                                <small className="form-text text-muted"></small>
                            </div>
                            <div className="col-md-6">
                                <div className="input address">
                                    <input
                                        type="text"
                                        name="main-form-address_hidden"
                                        id="id_main-form-address_hidden"
                                        className={"form-control " + styles.addressHidden}
                                        placeholder="Unit Number or House Number"
                                        value={props.houseNum}
                                        autoComplete={"off"}
                                        onChange={e => props.onFieldChange("houseNum", e.target.value)}
                                    />
                                    {displayErrors(props.errors.houseNum)}
                                </div>
                                <small className="form-text text-muted">
                                    This number is not visible to others until they make a booking.
                                </small>
                            </div>

                            <div className="col-md-6">
                                <div className="input">
                                    <input
                                        type="text"
                                        name="main-form-address"
                                        id="id_main-form-address"
                                        className="form-control no-background"
                                        placeholder="Street Name"
                                        style={{ paddingLeft: "10px" }}
                                        value={props.streetName}
                                        autoComplete={"off"}
                                        onChange={e => props.onFieldChange("streetName", e.target.value)}
                                    />
                                    {displayErrors(props.errors.streetName)}
                                </div>
                                <small className="form-text text-muted"></small>
                            </div>

                            <PostalCodeAutoSuggest
                                errors={props.errors.postalCodeID || []}
                                objID={props.postalCodeID}
                                onFieldChange={props.onFieldChange}
                            />

                            <div className="col-md-12 col-lg-6">
                                <FormOptionsCache.Consumer>
                                    {cache => (
                                        <HomeTypeSelectorComponent
                                            onFieldChange={props.onFieldChange}
                                            value={props.homeType}
                                            formOptions={cache.data.homeTypeOptions}
                                        />
                                    )}
                                </FormOptionsCache.Consumer>
                                <small className="form-text text-muted"></small>
                                {displayErrors(props.errors.homeType)}
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <FormOptionsCache.Consumer>
                                    {cache => (
                                        <FurnishedSelectorComponent
                                            onFieldChange={props.onFieldChange}
                                            value={props.furnished}
                                            formOptions={cache.data.furnishedOptions}
                                        />
                                    )}
                                </FormOptionsCache.Consumer>
                                {displayErrors(props.errors.furnished)}
                                <small className="form-text text-muted"/>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div
                                    className={"input number-disp " + styles.bedroom}
                                    onClick={() => {
                                        inputRefs.bedroomInput.focus()
                                    }}
                                    role={"presentation"}
                                >
                                    <label htmlFor={"id_main-form-bedrooms"}>Number of Bedrooms</label>
                                    <input
                                        type="number"
                                        name="main-form-bedrooms"
                                        id="id_main-form-bedrooms"
                                        ref={input => {
                                            inputRefs.bedroomInput = input
                                        }}
                                        min="0"
                                        value={props.numBedrooms}
                                        onChange={e => props.onFieldChange("numBedrooms", e.target.value)}
                                    />
                                </div>
                                {displayErrors(props.errors.numBedrooms)}

                                <small className="form-text text-muted"/>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div
                                    className={"input number-disp " + styles.bathroom}
                                    onClick={() => {
                                        inputRefs.bathroomsInput.focus()
                                    }}
                                    role={"presentation"}
                                >
                                    <label htmlFor={"id_main-form-bathrooms"}>Number of Bathrooms</label>
                                    <input
                                        type="number"
                                        name="main-form-bathrooms"
                                        id="id_main-form-bathrooms"
                                        ref={input => {
                                            inputRefs.bathroomsInput = input
                                        }}
                                        min="0"
                                        value={props.numBathrooms}
                                        onChange={e => props.onFieldChange("numBathrooms", e.target.value)}
                                    />
                                </div>
                                {displayErrors(props.errors.numBathrooms)}
                                <small className="form-text text-muted" />
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div
                                    className={"input number-disp " + styles.parking}
                                    onClick={() => {
                                        inputRefs.parkSpaceInput.focus()
                                    }}
                                    role={"presentation"}
                                >
                                    <label htmlFor={"id_main-form-parking"}>Number of parking spaces</label>
                                    <input
                                        type="number"
                                        name="main-form-parking"
                                        id="id_main-form-parking"
                                        min="0"
                                        ref={input => {
                                            inputRefs.parkSpaceInput = input
                                        }}
                                        value={props.numParkSpaces}
                                        onChange={e => props.onFieldChange("numParkSpaces", e.target.value)}
                                    />
                                </div>
                                {displayErrors(props.errors.numParkSpaces)}

                                <small className="form-text text-muted" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1" />
                </div>
            </div>
        </React.Fragment>
    )
}
