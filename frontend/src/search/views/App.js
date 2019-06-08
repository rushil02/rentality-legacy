import React,{ Component } from "react";
import queryString from 'query-string';
import SearchForm from './forms/SearchForm'
import SearchPageContent from './SearchPageContent';
import {getFilteredHouses} from 'search/services'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
                params: queryString.parse(this.props.routerProps.location.search),
                houses: []
        };
    }

    componentDidMount(){
        getFilteredHouses(this.state.params).then((data) => {
            console.log(data);
            this.setState({
                houses: data
            });
        });
    }

    onSearchClicked = (params) => {
        getFilteredHouses(params).then((data) => {
            this.setState({
                houses: data
            });
        })
    };

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    params={this.state.params}
                    onSearchClicked={this.onSearchClicked} 
                />
                <SearchPageContent houses={this.state.houses} params={this.state.params} />
            </React.Fragment>
        );
    }
}