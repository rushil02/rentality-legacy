import React, { Component } from "react";
import queryString from "query-string";
import SearchForm from "./forms/SearchForm";
import SearchPageContent from "./SearchPageContent";
import { getFilteredHouses } from "search/services";
import { ESHouse, SearchFormModel } from "search/models";
import { APIModelListAdapter } from "core/utils/ModelHelper";

const OFFSET = 12;

const loader = <div className="loader">Loading ...</div>;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            searchForm: new SearchFormModel(
                queryString.parse(this.props.routerProps.location.search)
            ),
            houses: new APIModelListAdapter([], ESHouse, undefined, "empty", [
                "_source"
            ]),
            hasMoreItems: true
        };
    }

    componentDidMount() {
        getFilteredHouses(this.state.searchForm.serialize()).then(data => {
            this.setState({
                loading: false,
                houses: new APIModelListAdapter(
                    data,
                    ESHouse,
                    undefined,
                    "saved",
                    ["_source"]
                )
            });
        });
    }

    onSearchValueChange = (field, value) => {
        console.log(field, value);
        this.setState(prevState => ({
            ...prevState,
            searchForm: prevState.searchForm.setData(field, value)
        }));
    };

    onDateRangeChange = (startDate, endDate) => {
        this.state.searchForm.setData("startDate", startDate);
        this.state.searchForm.setData("endDate", endDate);
        this.forceUpdate();
    };

    onSearchClicked = () => {
        const that = this;
        return new Promise(function(resolve, reject) {
            getFilteredHouses(that.state.searchForm.serialize())
                .then(data => {
                    that.setState({
                        houses: new APIModelListAdapter(
                            data,
                            ESHouse,
                            undefined,
                            "saved",
                            ["_source"]
                        )
                    });
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    loadMore = page => {
        const newParams = {
            ...this.state.params,
            "pagination-start": page * OFFSET,
            "pagination-end": (page + 1) * OFFSET
        };
        getFilteredHouses(newParams).then(data => {
            let hasMoreItems = true;
            if (data.length === 0) {
                hasMoreItems = false;
            }

            this.setState({
                houses: this.state.houses.appendPagination(data, ["_source"]),
                hasMoreItems,
                params: newParams
            });
        });
    };

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    searchForm={this.state.searchForm}
                    onSearchClicked={this.onSearchClicked}
                    onValueChange={this.onSearchValueChange}
                    onDateRangeChange={this.onDateRangeChange}
                />

                <SearchPageContent houses={this.state.houses} />

                {/*<InfiniteScroll*/}
                {/*    pageStart={0}*/}
                {/*    loadMore={this.loadMore}*/}
                {/*    hasMore={this.state.hasMoreItems}*/}
                {/*    loader={loader}*/}
                {/*>*/}
                {/*    <SearchPageContent*/}
                {/*        houses={this.state.houses}*/}
                {/*        params={this.state.params}*/}
                {/*        loadMore={this.loadMore}*/}
                {/*        hasMore={this.state.hasMoreItems}*/}
                {/*    />*/}
                {/*</InfiniteScroll>*/}
            </React.Fragment>
        );
    }
}
