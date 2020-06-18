import React, {Suspense} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ComponentLoadingSpinner} from "core/UIComponents/loadingSpinners/LoadingSpinner";
import {
    MainDataCache,
    NavigationContext,
    FacilityCache,
    RulesCache,
    ImagesCache,
    CancellationPolicyCache,
    NeighborhoodDescriptorsCache,
    UserProfilePicCache,
    WelcomeTagsCache,
    PersonalityTagsCache,
} from '../dataContext'
import Navigator from './navigation/Navigator';

import {reverse} from "named-urls";
import {PageRoutes} from "components/routes";

const FormPrimaryContainer = React.lazy(() => import("./forms/primary/FormPrimaryContainer"));
const FormRentAvailabilityContainer = React.lazy(() => import("./forms/rentAvailability/FormRentAvailabilityContainer"));
const FacilitiesContainer = React.lazy(() => import("./forms/facilities/FacilitiesContainer"));
const RulesContainer = React.lazy(() => import("./forms/rules/RulesContainer"));
const UploadImagesFormContainer = React.lazy(() => import("./forms/mediaUpload/UploadImagesForm"));
const CancellationPolicyContainer = React.lazy(() => import("./forms/cancellationPolicy/CancellationPolicyContainer"));
const InfoForTenantsContainer = React.lazy(() => import("./forms/infoForTenants/InfoForTenantsContainer"));
const NeighborhoodDescriptorsContainer = React.lazy(() => import("./forms/neighbourhoodDescriptors/NeighbourhoodDescriptorsContainer"));
const UploadProfilePictureContainer = React.lazy(() => import("./forms/uploadProfilePicture/UploadProfilePictureContainer"));
const WelcomeTagsContainer = React.lazy(() => import("./forms/welcomeTags/WelcomeTagsContainer"));
const FunTagsContainer = React.lazy(() => import("./forms/funTags/FunTagsContainer"));
const PayoutInfoContainer = React.lazy(() => import("./forms/payoutInfo/PayoutInfoContainer"));


// Add all forms here
export function EditAppComponent(props) {
    const houseUUID = props.houseUUID;
    return (
        <BrowserRouter basename={reverse(PageRoutes.listing.edit, {houseUUID: houseUUID})}>
            <NavigationContext.Consumer>
                {navContext =>
                    <Navigator mode={'edit'} navContext={navContext} houseUUID={houseUUID}>
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
                            <Route exact path="/4" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <RulesCache.Consumer>
                                        {cache => <MainDataCache.Consumer>
                                            {mainDataCache => <RulesContainer
                                                cache={cache}
                                                mainDataCache={mainDataCache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                            />}
                                        </MainDataCache.Consumer>}
                                    </RulesCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/5" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <ImagesCache.Consumer>
                                        {cache => <UploadImagesFormContainer
                                            cache={cache}
                                            navContext={navContext}
                                            houseUUID={houseUUID}
                                        />}
                                    </ImagesCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/6" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <CancellationPolicyCache.Consumer>
                                        {cache => <MainDataCache.Consumer>
                                            {mainDataCache => <CancellationPolicyContainer
                                                cache={cache}
                                                mainDataCache={mainDataCache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                            />}
                                        </MainDataCache.Consumer>}
                                    </CancellationPolicyCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/7" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <MainDataCache.Consumer>
                                        {cache => <InfoForTenantsContainer
                                            cache={cache}
                                            navContext={navContext}
                                            houseUUID={houseUUID}
                                        />}
                                    </MainDataCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/8" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <NeighborhoodDescriptorsCache.Consumer>
                                        {cache => <MainDataCache.Consumer>
                                            {mainDataCache => <NeighborhoodDescriptorsContainer
                                                cache={cache}
                                                mainDataCache={mainDataCache}
                                                navContext={navContext}
                                                houseUUID={houseUUID}
                                            />}
                                        </MainDataCache.Consumer>}
                                    </NeighborhoodDescriptorsCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/9" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <UserProfilePicCache.Consumer>
                                        {cache => <UploadProfilePictureContainer
                                            cache={cache}
                                            navContext={navContext}
                                        />}
                                    </UserProfilePicCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/10" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <PersonalityTagsCache.Consumer>
                                        {cache => <FunTagsContainer
                                            cache={cache}
                                            houseUUID={houseUUID}
                                            navContext={navContext}
                                        />}
                                    </PersonalityTagsCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/11" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <WelcomeTagsCache.Consumer>
                                        {cache => <WelcomeTagsContainer
                                            cache={cache}
                                            navContext={navContext}
                                            houseUUID={houseUUID}
                                        />}
                                    </WelcomeTagsCache.Consumer>
                                </Suspense>
                            }/>
                            <Route exact path="/12" render={(routerProps) =>
                                <Suspense fallback={<ComponentLoadingSpinner/>}>
                                    <PayoutInfoContainer
                                        navContext={navContext}
                                        houseUUID={houseUUID}
                                    />
                                </Suspense>
                            }/>
                            <Route render={() => <Redirect to="/1"/>}/>
                        </Switch>
                    </Navigator>}
            </NavigationContext.Consumer>
        </BrowserRouter>
    )
}

export function CreateAppComponent(props) {
    return (
        <BrowserRouter basename={reverse(PageRoutes.listing.create)}>
            <NavigationContext.Consumer>
                {navContext =>
                    <Navigator mode={'create'} navContext={navContext}>
                        <Route render={(routerProps) =>
                            <Suspense fallback={<ComponentLoadingSpinner/>}>
                                <MainDataCache.Consumer>
                                    {cache => <FormPrimaryContainer cache={cache} navContext={navContext}
                                                                    mode={'create'}/>}
                                </MainDataCache.Consumer>
                            </Suspense>
                        }/>
                    </Navigator>}
            </NavigationContext.Consumer>
        </BrowserRouter>
    )
}