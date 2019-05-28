import React from 'react';

import {StoreHelper} from "core/utils/StoreHelper";

export const NavigationContext = React.createContext({});
export const FormOptionsCache = React.createContext({});
export const MainDataCache = React.createContext({});
export const AvailabilityCache = React.createContext({});
export const FacilityCache = React.createContext({});


// Common Store Provider for multiple Contexts
export class StoreProvider extends StoreHelper {

    // Initializer
    getStore() {
        return ['mainData', 'availabilityData', 'facilitiesData']
    }

    render() {
        return (
            <NavigationContext.Provider value={this.props.navigator}>
                <FormOptionsCache.Provider value={this.props.formOptions}>
                    <MainDataCache.Provider value={this.state.mainData}>
                        <AvailabilityCache.Provider value={this.state.availabilityData}>
                            <FacilityCache.Provider value={this.state.facilitiesData}>
                                {this.props.children}
                            </FacilityCache.Provider>
                        </AvailabilityCache.Provider>
                    </MainDataCache.Provider>
                </FormOptionsCache.Provider>
            </NavigationContext.Provider>
        )
    }
}
