import React, {Suspense} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ComponentLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import {MainDataCache, NavigationContext, FacilityCache} from '../dataContext'
import Navigator from './navigation/Navigator';

import './forms/FormCommon.css'
import {reverse} from "named-urls";
import routes from "../../routes";

const FormPrimaryContainer = React.lazy(() => import("./forms/primary/FormPrimaryContainer"));
const FormRentAvailabilityContainer = React.lazy(() => import("./forms/rentAvailability/FormRentAvailabilityContainer"));
const FacilitiesContainer = React.lazy(() => import("./forms/facilities/FacilitiesContainer"));


// Add all forms here
export function EditAppComponent(props) {
    const houseUUID = props.houseUUID;
    return (
        <BrowserRouter basename={reverse(routes.react.houseListing.edit, {houseUUID: houseUUID})}>
            <div className="page-form" id="main-input-page">
                <NavigationContext.Consumer>
                    {navContext =>
                        <Navigator mode={'edit'} navContext={navContext} housesUUID={houseUUID}>
                            <Switch>
                                <Route exact path="/1" render={(routerProps) =>
                                    <Suspense fallback={<ComponentLoadingSpinner/>}>
                                        <MainDataCache.Consumer>
                                            {cache => <FormPrimaryContainer
                                                cache={cache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                                mode={'edit'}
                                            />}
                                        </MainDataCache.Consumer>
                                    </Suspense>
                                }/>
                                <Route exact path="/2" render={(routerProps) =>
                                    <Suspense fallback={<ComponentLoadingSpinner/>}>
                                        <MainDataCache.Consumer>
                                            {cache => <FormRentAvailabilityContainer
                                                cache={cache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                            />}
                                        </MainDataCache.Consumer>
                                    </Suspense>
                                }/>
                                <Route exact path="/3" render={(routerProps) =>
                                    <Suspense fallback={<ComponentLoadingSpinner/>}>
                                        <FacilityCache.Consumer>
                                            {cache => <FacilitiesContainer
                                                cache={cache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                            />}
                                        </FacilityCache.Consumer>
                                    </Suspense>
                                }/>
                                <Route render={() => <Redirect to="/1"/>}/>
                            </Switch>
                        </Navigator>}
                </NavigationContext.Consumer>
            </div>
        </BrowserRouter>
    )
}

export function CreateAppComponent(props) {
    return (
        <div className="page-form" id="main-input-page">
            <NavigationContext.Consumer>
                {navContext =>
                    <Navigator mode={'create'} navContext={navContext}>
                        <Suspense fallback={<ComponentLoadingSpinner/>}>
                            <MainDataCache.Consumer>
                                {cache => <FormPrimaryContainer cache={cache} navContext={navContext} mode={'create'}/>}
                            </MainDataCache.Consumer>
                        </Suspense>
                    </Navigator>}
            </NavigationContext.Consumer>
        </div>
    )
}