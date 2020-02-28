import React, {Component} from 'react';
import AppComponent from './AppComponent';
import {APIModelListAdapter} from 'core/utils/ModelHelper';
import {House} from '../models';
import {getHouseMinimalData} from '../services';
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            status: 'loading',
            houses: new APIModelListAdapter([], House, 'uuid', 'empty'),
            // booking:
        }
    }

    componentDidMount() {
        this.setState(prevState => ({status: 'loading'}));
        getHouseMinimalData()
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        status: 'done',
                        houses: new APIModelListAdapter(result, House, 'uuid', 'saved'),
                    })
                );
            })
    }

    render(){
        return(
            <RequestErrorBoundary status={this.state.status}>
                <AppComponent 
                    houses={this.state.houses}
                />
            </RequestErrorBoundary>
        )
    
    }
}