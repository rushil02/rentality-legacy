import React, {Component} from "react";
import queryString from "query-string";
import SearchForm from "./forms/SearchForm";
import SearchPageContent from "./SearchPageContent";
import {getFilteredHouses} from "../services";
import {ESHouse, SearchFormModel} from "../models";
import {APIModelListAdapter} from "core/utils/ModelHelper";

const OFFSET = 12;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingMore: false,
            searchForm: new SearchFormModel(queryString.parse(this.props.routerProps.location.search)),
            houses: new APIModelListAdapter([], ESHouse, undefined, "empty", ["_source"]),
            hasMoreItems: true,
            pageNum: 1,
        };
    }

    componentDidMount() {
        getFilteredHouses(this.state.searchForm.serialize()).then((data) => {
            this.setState({
                loading: false,
                houses: new APIModelListAdapter(data, ESHouse, undefined, "saved", ["_source"]),
            });
        });
    }

    handleScroll = (e) => {
        e.preventDefault();
        if (
            !this.state.loadingMore &&
            this.state.hasMoreItems &&
            window.scrollY + 1.5 * window.innerHeight > document.documentElement.scrollHeight
        ) {
            console.log(this.state.loadingMore, this.state.hasMoreItems);
            this.loadMore();
        }
    };

    onSearchValueChange = (field, value) => {
        this.setState((prevState) => ({
            ...prevState,
            searchForm: prevState.searchForm.setData(field, value),
        }));
    };

    onDateRangeChange = (startDate, endDate) => {
        this.state.searchForm.setData("startDate", startDate);
        this.state.searchForm.setData("endDate", endDate);
        this.forceUpdate();
    };

    onSearchClicked = () => {
        this.setState({loading: true, hasMoreItems: true});
        this.state.searchForm.setData("paginationStart", 0);
        this.state.searchForm.setData("paginationEnd", OFFSET);

        const that = this;
        return new Promise(function (resolve, reject) {
            getFilteredHouses(that.state.searchForm.serialize())
                .then((data) => {
                    that.setState({
                        loading: false,
                        houses: new APIModelListAdapter(data, ESHouse, undefined, "saved", ["_source"]),
                    });
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    loadMore = () => {
        this.state.searchForm.nextPagination(OFFSET);
        this.setState({loadingMore: true});

        getFilteredHouses(this.state.searchForm.serialize())
            .then((data) => {
                if (data.length < OFFSET) {
                    this.setState({hasMoreItems: false, loadingMore: false});
                }
                this.setState({
                    houses: this.state.houses.appendPagination(data, ["_source"]),
                });
            })
            .catch((error) => {
                this.setState({hasMoreItems: false, loadingMore: false});
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

                <SearchPageContent
                    houses={this.state.houses}
                    loading={this.state.loading}
                    loadingMore={this.state.loadingMore}
                    handleScroll={this.handleScroll}
                />
            </React.Fragment>
        );
    }
}
