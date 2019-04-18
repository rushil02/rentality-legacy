import React, {Component, Suspense} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import FormNav from "./FormNav"
import FormSubNav from "./FormSubNav";
import Navigation from "./Navigation";
import './FormCommon.css'

const FormRentAvailabilityComponent = React.lazy(() => import("./FormRentAvailability"));
// import FormRentAvailabilityComponent from './FormRentAvailability';
import FormPrimaryComponent from './FormPrimary';


class CreatePageComponent extends Component {

    render() {
        return (
            <HashRouter basename="/form">
                <div className="page-form">
                    <FormNav/>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-1"/>
                            <div className="col-xl-10">
                                <div className="right">
                                    <FormSubNav/>
                                    <Switch>
                                        <Route path="/1" render={() =>
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
                                            />}/>
                                        <Route path="/2" render={() =>
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <FormRentAvailabilityComponent
                                                    houseUUID={this.props.houseUUID}
                                                    formOptions={this.props.formOptions}
                                                    businessConstraints={this.props.businessConstraints}
                                                    onFieldChange={this.props.onFieldChange}
                                                    errors={this.props.errors}
                                                    rent={this.props.mainData.rent}
                                                    minStay={this.props.mainData.minStay}
                                                    maxStay={this.props.mainData.maxStay}
                                                    maxPeopleAllowed={this.props.mainData.maxPeopleAllowed}
                                                    availabilities={this.props.availabilityData}
                                                    saveAvailabilityChange={this.props.saveAvailabilityChange}
                                                />
                                            </Suspense>
                                        }/>
                                    </Switch>
                                    <Navigation/>
                                </div>
                            </div>
                            <div className="col-xl-1"/>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default CreatePageComponent;