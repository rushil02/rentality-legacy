import React from 'react';
import PostalCodeAutoSuggest from "core/UIComponents/PostalCodeAutoSuggest/PostalCodeAutoSuggestContainer";
import HomeTypeSelectorComponent from './HomeTypeSelector';
import FurnishedSelectorComponent from "./FurnishedSelector";
import {FormOptionsCache} from "houseListing/dataContext";

import styles from "./FormPrimary.css";
import commonStyles from "../FormCommon.css"


export default function FormPrimaryComponent(props) {
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
    let inputRefs = {};
    return (
        <React.Fragment>
            <div id="form-1" className="form-series">
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <h1 className={commonStyles.pageTitle}>About the Property</h1>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input title">
                                    <input
                                        type="text" name="main-form-title" required={true}
                                        id="id_main-form-title"
                                        className={"form-control " + styles.title} maxLength="250"
                                        placeholder="Property Name" value={props.title}
                                        onChange={(e) => props.onFieldChange("title", e.target.value)}
                                        autoComplete={"off"}
                                    />
                                    {getError('title')}
                                </div>
                                <small className="form-text text-muted">

                                </small>

                            </div>
                            <div className="col-md-6">
                                <div className="input address">
                                    <input type="text" name="main-form-address_hidden"
                                           id="id_main-form-address_hidden" className={"form-control " + styles.addressHidden}
                                           placeholder="Unit Number or House Number" value={props.houseNum} autoComplete={"off"}
                                           onChange={(e) => props.onFieldChange("houseNum", e.target.value)}/>
                                    {getError('houseNum')}
                                </div>
                                <small className="form-text text-muted">
                                    This number is not visible to others until they make a booking.
                                </small>

                            </div>

                            <div className="col-md-6">
                                <div className="input">
                                    <input type="text" name="main-form-address" id="id_main-form-address"
                                           className="form-control no-background" placeholder="Street Name"
                                           style={{"paddingLeft": "10px"}} value={props.streetName} autoComplete={"off"}
                                           onChange={(e) => props.onFieldChange("streetName", e.target.value)}/>
                                    {getError('streetName')}
                                </div>
                                <small className="form-text text-muted">

                                </small>

                            </div>

                            <PostalCodeAutoSuggest
                                errors={props.errors.postalCodeID || []}
                                objID={props.postalCodeID}
                                onFieldChange={props.onFieldChange}
                            />

                            <div className="col-md-12 col-lg-6">
                                <FormOptionsCache.Consumer>

                                    {cache =>
                                        <HomeTypeSelectorComponent
                                            onFieldChange={props.onFieldChange}
                                            value={props.homeType}
                                            formOptions={cache.data.homeTypeOptions}
                                        />
                                    }
                                </FormOptionsCache.Consumer>
                                <small className="form-text text-muted">
                                </small>
                                {getError('homeType')}
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <FormOptionsCache.Consumer>
                                    {cache =>
                                        <FurnishedSelectorComponent
                                            onFieldChange={props.onFieldChange}
                                            value={props.furnished}
                                            formOptions={cache.data.furnishedOptions}
                                        />
                                    }
                                </FormOptionsCache.Consumer>
                                {getError('furnished')}
                                <small className="form-text text-muted">
                                </small>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className={"input number-disp " + styles.bedroom} onClick={() => {
                                    inputRefs.bedroomInput.focus()
                                }}>
                                    <label>Number of Bedrooms</label>
                                    <input
                                        type="number" name="main-form-bedrooms" id="id_main-form-bedrooms"
                                        ref={(input) => {
                                            inputRefs.bedroomInput = input;
                                        }}
                                        min="0" value={props.numBedrooms}
                                        onChange={(e) => props.onFieldChange("numBedrooms", e.target.value)}
                                    />
                                </div>
                                {getError('numBedrooms')}
                                <small className="form-text text-muted">
                                </small>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className={"input number-disp " + styles.bathroom} onClick={() => {
                                    inputRefs.bathroomsInput.focus()
                                }}>
                                    <label>Number of Bathrooms</label>
                                    <input type="number" name="main-form-bathrooms" id="id_main-form-bathrooms"
                                           ref={(input) => {
                                               inputRefs.bathroomsInput = input;
                                           }}
                                           min="0" value={props.numBathrooms}
                                           onChange={(e) => props.onFieldChange("numBathrooms", e.target.value)}
                                    />
                                </div>
                                {getError('numBathrooms')}
                                <small className="form-text text-muted"/>

                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className={"input number-disp " + styles.parking}  onClick={() => {
                                    inputRefs.parkSpaceInput.focus()
                                }}>
                                    <label>Number of parking spaces</label>
                                    <input type="number" name="main-form-parking" id="id_main-form-parking" min="0"
                                           ref={(input) => {
                                               inputRefs.parkSpaceInput = input;
                                           }}
                                           value={props.numParkSpaces}
                                           onChange={(e) => props.onFieldChange("numParkSpaces", e.target.value)}
                                    />
                                </div>
                                {getError('numParkSpaces')}
                                <small className="form-text text-muted"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"/>
                </div>
            </div>
        </React.Fragment>
    )
}

