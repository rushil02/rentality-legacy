import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import FormSubNav from "./nav/FormSubNav";
import './FormCommon.css'
import SpinnerComponent from "components/common/LoadingSpinner";
import FormPrimaryComponent from './editProfile/FormPrimary';


class EditUserProfileComponent extends Component {

    render() {
        return (
            <HashRouter basename="/">
                <div className="page-form">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10">
                                <div className="right">
                                    <FormSubNav />
                                    <Switch>
                                        <Route path="/1" render={() =>
                                            <FormPrimaryComponent
                                                formOptions={this.props.formOptions}
                                                onFieldChange={this.props.onFieldChange}
                                                errors={this.props.errors}
                                                firstName={this.props.mainData.firstName}
                                                lastName={this.props.mainData.lastName}
                                                contactNum={this.props.mainData.contactNum}
                                                dob={this.props.mainData.dob}
                                                billingStreetAddress={this.props.mainData.billingStreetAddress}
                                                billingPostcode={this.props.mainData.billingPostcode}
                                                billingCountry={this.props.mainData.billingCountry}
                                                gender={this.props.mainData.gender}
                                                onClickSave={this.props.onClickSave}
                                            />} />
                                        <Route path="/2" render={() =>
                                            <Suspense
                                                fallback={<SpinnerComponent height={"400px"} />}>

                                            </Suspense>
                                        } />
                                    </Switch>
                                    {/* <Navigation/> */}
                                </div>
                            </div>
                            <div className="col-xl-1" />
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default EditUserProfileComponent;