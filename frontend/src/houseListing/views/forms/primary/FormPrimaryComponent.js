import React from 'react';
import PostalCodeAutoSuggest from "./PostalCodeAutoSuggestContainer";
import HomeTypeSelectorComponent from './HomeTypeSelector';
import FurnishedSelectorComponent from "./FurnishedSelector";
import {FormOptionsCache} from "houseListing/dataContext"

export default function FormPrimaryComponent(props) {
    let inputRefs = {};
    return (
        <React.Fragment>
            <div id="form-1" className="form-series">
                <div className="row">
                    <div className="col-md-1"/>
                    <div className="col-md-10">
                        <h1 className="title">About the Property</h1>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="input title">
                                    <input
                                        type="text" name="main-form-title" required={true}
                                        id="id_main-form-title"
                                        className="form-control title" maxLength="250"
                                        placeholder="Property Name" value={props.title}
                                        onChange={(e) => props.onFieldChange("title", e.target.value)}
                                    />
                                    {props.errors.title &&
                                    <div className="invalid-feedback">{props.errors.title}</div>}
                                </div>
                                <small className="form-text text-muted">

                                </small>

                            </div>
                            <div className="col-md-6">
                                <div className="input address">
                                    <input type="text" name="main-form-address_hidden"
                                           id="id_main-form-address_hidden" className="form-control address-hidden"
                                           placeholder="Unit Number or House Number" value={props.houseNum}
                                           onChange={(e) => props.onFieldChange("houseNum", e.target.value)}/>
                                    {props.errors.houseNum &&
                                    <div className="invalid-feedback">{props.errors.houseNum}</div>}
                                </div>
                                <small className="form-text text-muted">
                                    This is not visible to others until they make a booking.
                                </small>

                            </div>

                            <div className="col-md-6">
                                <div className="input">
                                    <input type="text" name="main-form-address" id="id_main-form-address"
                                           className="form-control no-background" placeholder="Street Name"
                                           style={{"paddingLeft": "10px"}} value={props.streetName}
                                           onChange={(e) => props.onFieldChange("streetName", e.target.value)}/>
                                    {props.errors.streetName &&
                                    <div className="invalid-feedback">{props.errors.streetName}</div>}
                                </div>
                                <small className="form-text text-muted">

                                </small>

                            </div>

                            <PostalCodeAutoSuggest
                                error={props.errors.postalCode || ''}
                                value={props.postalCode}
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
                                {props.errors.homeType &&
                                <div className="invalid-feedback">{props.errors.homeType}</div>}
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

                                <small className="form-text text-muted">
                                </small>
                                {props.errors.furnished &&
                                <div className="invalid-feedback">{props.errors.furnished}</div>}
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="input number-disp bedroom" onClick={() => {
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
                                <small className="form-text text-muted">

                                </small>
                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="input number-disp bathroom" onClick={() => {
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
                                <small className="form-text text-muted"/>

                            </div>
                            <div className="col-md-12 col-lg-6">
                                <div className="input number-disp parking" onClick={() => {
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

