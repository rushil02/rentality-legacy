import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import routes from "routes";
import {getFormOptions} from "../services";
import {StoreProvider} from "../dataContext"
import ComponentErrorBoundary from "../../core/errorHelpers/ComponentErrorBoundary";
import Error404 from "core/errorHelpers/Error404";
import AppComponent from "./AppComponent";
import {FormOptions} from "../models";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'create',
            errors: {},
            formOptions: {
                data: new FormOptions({}),
                sync: () => {
                    // Fetch Form options
                    getFormOptions()
                        .then(result => {
                            this.setState(prevState => ({
                                ...prevState,
                                formOptions: {
                                    ...prevState.formOptions,
                                    data: result
                                }
                            }));
                        });
                }
            },
        };
        this.houseUUID = "";
    }

    componentDidMount() {

        // Fetch Form options
        getFormOptions()
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    formOptions: {
                        ...prevState.formOptions,
                        data: result
                    }
                }));
            });
    };

    onRender = (routeProps) => {
        if (routeProps.match.params["0"] === 'edit') {
            this.houseUUID = routeProps.match.params.houseUUID
        }
        return (
            <StoreProvider houseUUID={this.houseUUID} formOptions={this.state.formOptions}>
                <AppComponent mode={routeProps.match.params["0"]}/>
            </StoreProvider>
        )
    };

    render() {
        return (
            <React.Fragment>
                <ComponentErrorBoundary>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                exact
                                path={routes.react.houseListing.base + "(create|edit)/:houseUUID?"}
                                render={(props) => this.onRender(props)}
                            />
                            <Route render={(props) => <Error404/>}/>
                        </Switch>
                    </BrowserRouter>
                </ComponentErrorBoundary>
            </React.Fragment>
        );
    }
}

