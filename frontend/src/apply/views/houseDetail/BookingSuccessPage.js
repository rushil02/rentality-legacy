import React, { Component } from "react";
import { reverse } from "named-urls";
import routes from "routes";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";
import { Booking } from "apply/models";
import { getBookingData } from "apply/services";
import styles from "./BookingSuccess.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle as faSuccessIcon } from "@fortawesome/free-regular-svg-icons";

export default class BookingSuccessPage extends Component {
    constructor(props) {
        super(props);
        this.applicationUUID = this.props.routerProps.match.params.applicationUUID;
        this.state = {
            status: "loading",
            booking: new Booking({}, "empty")
            // booking:
        };
    }

    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }));
        getBookingData(this.applicationUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                booking: new Booking(result, "saved")
            }));
        });
    }

    render() {
        let booking = this.state.booking;
        console.log(booking);
        return (
            <RequestErrorBoundary status={this.state.status}>
                <React.Fragment>
                    <div className={styles.bookingDashboard}>
                        <div className="container">
                            <div className="row">
                                <div
                                    className={
                                        "col-12 d-flex align-items-center justify-content-center " + styles.mtb40
                                    }
                                >
                                    <FontAwesomeIcon icon={faSuccessIcon} size="9x" color={"#3fc692"} />
                                    <h1>Success</h1>
                                </div>
                                <div className="col-md-12 col-lg-12 col-xl-12">
                                    <div className={styles.board}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="image">
                                                    <img
                                                        src="/static/image/page-dashboard/1.png"
                                                        className="w-100"
                                                        alt=""
                                                        title=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="row">
                                                    <div className="col-md-7">
                                                        <div className={styles.date}>
                                                            <div className="row">
                                                                <div className="col-5">
                                                                    <div className={styles.dateSubtitle + " text-left"}>
                                                                        Move in
                                                                    </div>
                                                                    <div className={styles.dateDisplay + " text-left"}>
                                                                        {booking.getData("startDate", [
                                                                            "bookingDateRange"
                                                                        ])}
                                                                    </div>
                                                                </div>
                                                                <div className={"col-2 " + styles.centerArrow} />
                                                                <div className="col-5">
                                                                    <div
                                                                        className={styles.dateSubtitle + " text-right"}
                                                                    >
                                                                        Move out
                                                                    </div>
                                                                    <div className={styles.dateDisplay + " text-right"}>
                                                                        {booking.getData("endDate", [
                                                                            "bookingDateRange"
                                                                        ])}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className={styles.amount}>
                                                            {booking.getData("rent") + " AUD/week"}
                                                        </div>
                                                        <div className={styles.bookingAmount}>
                                                            {"Amount Paid: " +
                                                                booking.getData("bookingAmount") +
                                                                " AUD"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <h1>La Salentina, sea, nature & relax</h1>
                                                        <h2>Capital Territory, Australia Love Street No 322 </h2>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                            sed do eiusmod tempor incididunt ut labore et dolore magna
                                                            aliqua.
                                                        </p>
                                                        <div className={styles.confirm}>
                                                            <button className={styles.btn + " btn-link"}>
                                                                {booking.getData("status")}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <ul
                                                            className={
                                                                styles.listUnstyled
                                                            }
                                                        >
                                                            <li>
                                                                <a href="">
                                                                    View invoice
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    Message Host
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    View guest's
                                                                    itinerary
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    Change/Cancel
                                                                    reservation
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="">
                                                                    View house
                                                                    rule
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <div
                                                            className={
                                                                styles.detail
                                                            }
                                                        >
                                                            <button
                                                                className={
                                                                    styles.btn +
                                                                    " btn-link"
                                                                }
                                                            >
                                                                Detail
                                                            </button>
                                                        </div>
                                                    </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </RequestErrorBoundary>
        );
    }
}
