import React from 'react';

import {StoreHelper} from "core/utils/StoreHelper";
import {House, Navigator} from "./models";

export const NavigationContext = React.createContext({});
export const UUIDCache = React.createContext("");
export const FormOptionsCache = React.createContext({});
export const MainDataCache = React.createContext({});
export const AvailabilityCache = React.createContext({});


// Common Store Provider for multiple Contexts
export class StoreProvider extends StoreHelper {

    getStore() {
        return {
            navigation: new Navigator(() => {}, 1),
            mainData: new House({}),
            availabilityData: [],
            errors: {},
        }
    }

    render() {
        console.log(this.state.navigation);
        return (
            <NavigationContext.Provider value={this.state.navigation}>
                <UUIDCache.Provider value={this.props.houseUUID}>
                    <FormOptionsCache.Provider value={this.props.formOptions}>
                        <MainDataCache.Provider value={this.state.mainData}>
                            <AvailabilityCache.Provider value={this.state.availabilityData}>
                                {this.props.children}
                            </AvailabilityCache.Provider>
                        </MainDataCache.Provider>
                    </FormOptionsCache.Provider>
                </UUIDCache.Provider>
            </NavigationContext.Provider>
        )
    }
}
