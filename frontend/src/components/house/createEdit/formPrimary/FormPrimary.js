import React, {Component} from 'react';
import PostalCodeAutoSuggest from "../../../../sharedComponents/Containers/PostalCodeAutoSuggest/PostalCodeAutoSuggest";
import HomeTypeSelectorComponent from './HomeTypeSelector';
import FurnishedSelectorComponent from "./FurnishedSelector";


export default class FormPrimaryComponent extends Component {

    render() {
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
                                            placeholder="Property Name" value={this.props.title}
                                            onChange={(e) => this.props.onFieldChange("title", e.target.value)}
                                        />
                                        {this.props.errors.title &&
                                        <div className="invalid-feedback">{this.props.errors.title}</div>}
                                    </div>
                                    <small className="form-text text-muted">

                                    </small>

                                </div>
                                <div className="col-md-6">
                                    <div className="input address">
                                        <input type="text" name="main-form-address_hidden"
                                               id="id_main-form-address_hidden" className="form-control address-hidden"
                                               placeholder="Unit Number or House Number" value={this.props.houseNum}
                                               onChange={(e) => this.props.onFieldChange("houseNum", e.target.value)}/>
                                        {this.props.errors.houseNum &&
                                        <div className="invalid-feedback">{this.props.errors.houseNum}</div>}
                                    </div>
                                    <small className="form-text text-muted">
                                        This is not visible to others until they make a booking.
                                    </small>

                                </div>

                                <div className="col-md-6">
                                    <div className="input">
                                        <input type="text" name="main-form-address" id="id_main-form-address"
                                               className="form-control no-background" placeholder="Street Name"
                                               style={{"paddingLeft": "10px"}} value={this.props.streetName}
                                               onChange={(e) => this.props.onFieldChange("streetName", e.target.value)}/>
                                        {this.props.errors.streetName &&
                                        <div className="invalid-feedback">{this.props.errors.streetName}</div>}
                                    </div>
                                    <small className="form-text text-muted">

                                    </small>

                                </div>

                                <PostalCodeAutoSuggest
                                    error={this.props.errors.postalCode || ''}
                                    value={this.props.postalCode}
                                    onFieldChange={this.props.onFieldChange}
                                    datakey="postalCode"
                                    showsuburb={true}
                                />

                                <div className="col-md-12 col-lg-6">
                                    <HomeTypeSelectorComponent
                                        onFieldChange={this.props.onFieldChange}
                                        value={this.props.homeType}
                                        formOptions={this.props.formOptions('home_type')}
                                    />
                                    <small className="form-text text-muted">
                                    </small>
                                    {this.props.errors.homeType &&
                                    <div className="invalid-feedback">{this.props.errors.homeType}</div>}
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <FurnishedSelectorComponent
                                        onFieldChange={this.props.onFieldChange}
                                        value={this.props.furnished}
                                        formOptions={this.props.formOptions('furnished')}
                                    />

                                    <small className="form-text text-muted">
                                    </small>
                                    {this.props.errors.furnished &&
                                    <div className="invalid-feedback">{this.props.errors.furnished}</div>}
                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="input number-disp bedroom" onClick={() => {this.bedroomInput.focus()}}>
                                        <label>Number of Bedrooms</label>
                                        <input
                                            type="number" name="main-form-bedrooms" id="id_main-form-bedrooms"
                                            ref={(input) => { this.bedroomInput = input; }}
                                            min="0" value={this.props.numBedrooms}
                                            onChange={(e) => this.props.onFieldChange("numBedrooms", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted">

                                    </small>

                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="input number-disp bathroom" onClick={() => {this.bathroomsInput.focus()}}>
                                        <label>Number of Bathrooms</label>
                                        <input type="number" name="main-form-bathrooms" id="id_main-form-bathrooms"
                                               ref={(input) => { this.bathroomsInput = input; }}
                                               min="0" value={this.props.numBathrooms}
                                               onChange={(e) => this.props.onFieldChange("numBathrooms", e.target.value)}
                                        />
                                    </div>
                                    <small className="form-text text-muted"/>

                                </div>
                                <div className="col-md-12 col-lg-6">
                                    <div className="input number-disp parking" onClick={() => {this.parkSpaceInput.focus()}}>
                                        <label>Number of parking spaces</label>
                                        <input type="number" name="main-form-parking" id="id_main-form-parking" min="0"
                                               ref={(input) => { this.parkSpaceInput = input; }}
                                               value={this.props.numParkSpaces}
                                               onChange={(e) => this.props.onFieldChange("numParkSpaces", e.target.value)}
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
}
