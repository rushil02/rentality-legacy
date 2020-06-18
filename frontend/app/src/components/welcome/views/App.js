import React, {Component} from "react";
import AppComponent from "./AppComponent";
import {House, SearchForm} from "../models";
import {getRecommendedHouses} from "../services";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";
import {APIModelListAdapter} from "core/utils/ModelHelper";
import {reverse} from "named-urls";
import {PageRoutes} from "components/routes";
import queryString from "query-string";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "loading",
            houses: new APIModelListAdapter([], House, "uuid", "empty"),
            searchForm: new SearchForm({}, "empty"
                // JSON.parse(JSON.stringify(queryString.parse(this.props.routerProps.location.search)))
            ),
        };
    }
    componentDidMount() {
        this.setState((prevState) => ({status: "loading"}));
        getRecommendedHouses().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                status: "done",
                houses: new APIModelListAdapter(result, House, "uuid", "saved"),
            }));
        });
    }

    onValueChange = (field, value) => {
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

    handleCityLabel = (e) => {
        window.location.href = reverse(PageRoutes.searchPage) + "?location=" + e.target.innerText.trim();
    };

    handleSearch = () => {
        window.location.href =
            reverse(PageRoutes.searchPage) + "?" + queryString.stringify(this.state.searchForm.serialize());
    };

    render() {
        return (
            <RequestErrorBoundary status={this.state.status}>
                {/* <UserContext.Consumer>
                    {(userContext) => ( */}
                        <AppComponent
                            houses={this.state.houses}
                            searchForm={this.state.searchForm}
                            onValueChange={this.onValueChange}
                            onDateRangeChange={this.onDateRangeChange}
                            handleCityLabel={this.handleCityLabel}
                            handleSearch={this.handleSearch}
                        />
                    {/* )}
                </UserContext.Consumer> */}
            </RequestErrorBoundary>
        );
    }
}
