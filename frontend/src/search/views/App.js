import React,{ Component } from "react";
import queryString from 'query-string';
import SearchForm from './forms/SearchForm'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
                params: queryString.parse(this.props.routerProps.location.search),
        };
        console.log(this.state.params);
    }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    params={this.state.params} 
                />
            </React.Fragment>
        );
    }
}