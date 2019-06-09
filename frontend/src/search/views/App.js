import React,{ Component } from "react";
import queryString from 'query-string';
import SearchForm from './forms/SearchForm'
import SearchPageContent from './SearchPageContent';
import {getFilteredHouses} from 'search/services';

import InfiniteScroll from "react-infinite-scroller";

const OFFSET = 12;

const loader = <div className="loader">Loading ...</div>;

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            params: queryString.parse(this.props.routerProps.location.search),
            houses: [],
            hasMoreItems: true
        };
    }

    componentDidMount(){
        getFilteredHouses(this.state.params).then((data) => {
            this.setState({
                houses: data
            });
        });
    }

    onSearchClicked = (params) => {
        getFilteredHouses(params).then((data) => {
            this.setState({
                houses: data,
                params
            });
        })
    };

    loadMore = (page) => {
        const newParams = {
            ...this.state.params,
            'pagination-start': page * OFFSET,
            'pagination-end': (page + 1) * OFFSET
        }
        getFilteredHouses(newParams).then((data) => {
            let hasMoreItems = true;
            if (data.length === 0) {
                hasMoreItems = false;
            }
            
            this.setState({
                houses: this.state.houses.concat(data),
                hasMoreItems,
                params: newParams
            });
        })
    }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    params={this.state.params}
                    onSearchClicked={this.onSearchClicked} 
                />
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMoreItems}
                    loader={loader}
                >
                    <SearchPageContent
                        houses={this.state.houses}
                        params={this.state.params}
                        loadMore={this.loadMore}
                        hasMore={this.state.hasMoreItems}
                    />
                </InfiniteScroll>

            </React.Fragment>
        );
    }
}