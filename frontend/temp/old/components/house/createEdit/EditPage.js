import React, {Component} from 'react';
import FormNav from "./nav/FormNav"
import FormSubNav from "./nav/FormSubNav";
import Navigation from "./nav/Navigation";
import './FormCommon.css'

import FormPrimaryComponent from './formPrimary/FormPrimary';


export default class EditPageComponent extends Component {

    render() {
        return (
            <div className="page-form">
                <FormNav/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-1"/>
                        <div className="col-xl-10">
                            <div className="right">
                                <FormSubNav/>
                                <FormPrimaryComponent
                                    formOptions={this.props.formOptions}
                                    onFieldChange={this.props.onFieldChange}
                                    errors={this.props.errors}
                                    title={this.props.mainData.title}
                                    houseNum={this.props.mainData.houseNum}
                                    streetName={this.props.mainData.streetName}
                                    postalCode={this.props.mainData.postalCode}
                                    homeType={this.props.mainData.homeType}
                                    furnished={this.props.mainData.furnished}
                                    numBedrooms={this.props.mainData.numBedrooms}
                                    numBathrooms={this.props.mainData.numBathrooms}
                                    numParkSpaces={this.props.mainData.numParkSpaces}
                                />
                                <Navigation/>
                            </div>
                        </div>
                        <div className="col-xl-1"/>
                    </div>
                </div>
            </div>
        )
    }
}
