import React, {Component} from "react";
import DashboardComponent from "./DashboardComponent";
import {APIModelListAdapter} from "core/utils/ModelHelper";
import {House, Booking} from "../models";
import {getPublishedHouses, getBookingsData} from "../services";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "loading",
            houses: new APIModelListAdapter([], House, "uuid", "empty"),
            bookings: new APIModelListAdapter([], Booking, "", "empty"),
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({status: "loading"}));
        getPublishedHouses().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                status: "done",
                houses: new APIModelListAdapter(result, House, "uuid", "saved"),
            }));
        });
        getBookingsData().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                status: "done",
                bookings: new APIModelListAdapter(result, Booking, "", "saved"),
            }));
        });
    }

    render() {
        return (
            <RequestErrorBoundary status={this.state.status}>
                <DashboardComponent houses={this.state.houses} bookings={this.state.bookings} />
            </RequestErrorBoundary>
        );
    }
}
