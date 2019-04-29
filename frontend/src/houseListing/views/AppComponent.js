import React, {Suspense} from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import {ComponentLoadingSpinner} from "core/loadingSpinners/LoadingSpinner";
import {MainDataCache, NavigationContext} from '../dataContext'
import Navigator from './navigation/Navigator';

import './forms/FormCommon.css'

const FormPrimaryContainer = React.lazy(() => import("./forms/primary/FormPrimaryContainer"));
const FormRentAvailabilityContainer = React.lazy(() => import("./forms/rentAvailability/FormRentAvailabilityContainer"));


// Should contain first Form only
function getCreateListingRoutes() {
    return (
        <Switch>
            <Route path="/1" render={() =>
                <Suspense fallback={<ComponentLoadingSpinner/>}>
                    <NavigationContext.Consumer>
                        {navContext =>
                            <MainDataCache.Consumer>
                                {cache => <FormPrimaryContainer cache={cache} navContext={navContext}/>}
                            </MainDataCache.Consumer>
                        }
                    </NavigationContext.Consumer>
                </Suspense>
            }/>
            <Route render={() => <Redirect to="/1"/>}/>
        </Switch>
    )
}

// Add all forms here
function getEditListingRoutes() {
    return (
        <Switch>
            <Route path="/1" render={() =>
                <Suspense fallback={<ComponentLoadingSpinner/>}>
                    <NavigationContext.Consumer>
                        {navContext =>
                            <MainDataCache.Consumer>
                                {cache => <FormPrimaryContainer cache={cache} navContext={navContext}/>}
                            </MainDataCache.Consumer>
                        }
                    </NavigationContext.Consumer>
                </Suspense>
            }/>
            <Route path="/2" render={() =>
                <Suspense fallback={<ComponentLoadingSpinner/>}>
                    <NavigationContext.Consumer>
                        {navContext =>
                            <MainDataCache.Consumer>
                                {cache => <FormRentAvailabilityContainer mainDataCache={cache}
                                                                         navContext={navContext}/>}
                            </MainDataCache.Consumer>
                        }
                    </NavigationContext.Consumer>
                </Suspense>
            }/>
            <Route render={() => <Redirect to="/1"/>}/>
        </Switch>
    )
}

export default function AppComponent(props) {
    return (
        <HashRouter basename="/form">
            <div className="page-form">
                <Navigator mode={props.mode}>
                    {props.mode === 'create' ? getCreateListingRoutes() : getEditListingRoutes()}
                </Navigator>
            </div>
        </HashRouter>
    )
}