import React, {Component} from "react";
import DashboardComponent from "./DashboardComponent";
import {APIModelListAdapter} from "core/utils/ModelHelper";
import {House, Booking} from "../models";
import {getPublishedHouses, getBookingsData} from "../services";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";


function compositeState(states) {
    if (states.includes("loading")) {
        return "loading"
    } else if (states.includes("error")) {
        return "error"
    } else {
        return "done"
    }
}

export default class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusAPIHouses: "loading",
            statusAPIBookings: "loading",
            houses: new APIModelListAdapter([], House, "uuid", "empty"),
            bookings: new APIModelListAdapter([], Booking, "", "empty"),
        };
    }

    componentDidMount() {
        this.setState((prevState) => ({status: "loading"}));
        getPublishedHouses().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                statusAPIHouses: "done",
                houses: new APIModelListAdapter(result, House, "uuid", "saved"),
            }));
        }).catch((error) => {
            this.setState((prevState) => ({
                ...prevState,
                statusAPIHouses: "error",
            }));
        });
        getBookingsData().then((result) => {
            this.setState((prevState) => ({
                ...prevState,
                statusAPIBookings: "done",
                bookings: new APIModelListAdapter(result, Booking, "", "saved"),
            }));
        }).catch((error) => {
            this.setState((prevState) => ({
                ...prevState,
                statusAPIBookings: "error",
            }));
        });
    }

    render() {
        return (
            <RequestErrorBoundary status={compositeState([this.state.statusAPIBookings, this.state.statusAPIHouses])}>
                <DashboardComponent houses={this.state.houses} bookings={this.state.bookings}/>
            </RequestErrorBoundary>
        );
    }
}
