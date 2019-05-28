import React, {Component} from 'react';
import {reverse} from 'named-urls';

import routes from "routes";
import {getFormOptions} from "../services";
import {StoreProvider} from "../dataContext"
import {CreateAppComponent, EditAppComponent} from "./AppComponent";
import {FormOptions, Navigator} from "../models";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOptions: {
                data: new FormOptions({}),
                sync: this.setFormOptions
            },
            navigator: {
                data: new Navigator(this.nextToEditMode),
                sync: () => this.forceUpdate()
            }
        };
    }

    setFormOptions = () => {
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

    componentDidMount() {
        // Fetch Form options
        this.state.formOptions.sync();
    };

    nextToEditMode = (houseUUID) => {
        // this.props.routerProps.history.replace(reverse(routes.react.houseListing.edit, {houseUUID: houseUUID})+ '/1');
        
        this.props.routerProps.history.push(reverse(routes.react.houseListing.edit, {houseUUID: houseUUID})+ '/2');
        this.forceUpdate();
    };

    render() {
        return (
            <StoreProvider formOptions={this.state.formOptions} navigator={this.state.navigator}>
                {this.props.mode === 'edit' ?
                    <EditAppComponent houseUUID={this.props.routerProps.match.params.houseUUID}/>
                    :
                    <CreateAppComponent/>
                }
            </StoreProvider>
        );
    }
}
