import React, {Component} from "react";
import styles from "./App.module.css";
import {reverse} from "named-urls";
import routes from "components/routes";

function formatDate(date) {
    if (date) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[date.getMonth()] + ", " + date.getDate() + " " + date.getFullYear();
    } else {
        return "N/A";
    }
}

function GetHouseListing(props) {
    let house = props.house;

    return (
        <div className={styles.board}>
            <div className="row">
                <div className="col-md-3">
                    <div className="image">
                        <img src="/static/image/page-dashboard/1.png" className="w-100" alt="" title="" />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className={"col-md-8 " + styles.info}>
                            <h1>{house.getData("title")}</h1>
                            <h2>
                                {house.getData("houseNum")}, {house.getData("streetName")}
                            </h2>
                            <h2>{house.getData("location")}</h2>
                            <p className={styles.homeTypeText}>{house.getData("homeType")}</p>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.amount}>
                                $ {house.getData("rent")} AUD
                                <p>{house.getData("cancellationPolicy")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className={styles.confirm}>
                                <button className={styles.btn + " btn-link " + styles.successBorder}>
                                    {house.getData("status")}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.detail}>
                                <a
                                    className={styles.btn + " btn-link"}
                                    href={reverse(routes.pages.houseListing.edit, {houseUUID: house.getData("uuid")})}
                                >
                                    Manage
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GetBookingListing(props) {
    let booking = props.booking;
    let displayStatus = {
        I: "Incomplete",
        P: "Pending",
        L: "Pending",
        A: "Accepted",
        D: "Declined",
        E: "Error",
        B: "Booked",
        C: "Cancelled",
        O: "In-Effect/In-Stay",
        Z: "Complete",
        X: "In-Dispute",
        F: "In-Dispute Locked",
        R: "Dispute Resolved",
    };
    let displayStatusClassName = styles.btn + " btn-link";
    let bookingStatus = booking.getData("status");
    if (bookingStatus === "P" || bookingStatus === "L") {
        displayStatusClassName += " " + styles.pendingBorder;
    } else if (bookingStatus === "I") {
        displayStatusClassName += " " + styles.incompleteBorder;
    } else if (bookingStatus === "B") {
        displayStatusClassName += " " + styles.successBorder;
    }
    return (
        <div className={styles.board}>
            <div className="row">
                <div className="col-md-3">
                    <div className="image">
                        <img src="/static/image/page-dashboard/1.png" className="w-100" alt="" title="" />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-7">
                            <div className={styles.date}>
                                <div className="row">
                                    <div className="col-5">
                                        <div className={styles.dateSubtitle + " text-left"}>Move in</div>
                                        <div className={styles.dateDisplay + " text-left"}>
                                            {formatDate(booking.getData("bookingStartDate"))}
                                        </div>
                                    </div>
                                    <div className={"col-2 " + styles.centerArrow} />
                                    <div className="col-5">
                                        <div className={styles.dateSubtitle + " text-right"}>Move out</div>
                                        <div className={styles.dateDisplay + " text-right"}>
                                            {formatDate(booking.getData("bookingEndDate"))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className={styles.amount}>$ {booking.getData("rent")} AUD</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={"col-md-8 " + styles.info}>
                            <h1>{booking.getData("title")}</h1>
                            <h2>
                                {booking.getData("houseNum")}, {booking.getData("streetName")}
                            </h2>
                            <h2>{booking.getData("location")}</h2>
                            <p className={styles.homeTypeText}>{booking.getData("homeType")}</p>
                        </div>
                        <div className="col-md-4">
                            <div className={styles.bookingAmount}>
                                {"Amount Paid: " + booking.getData("bookingAmount") + " AUD"}
                                <p className={styles.cancellationPolicyText}>{booking.getData("cancellationPolicy")}</p>
                            </div>
                            <div className={styles.homeOwnerInfo}>
                                Homeowner Info
                                <p>
                                    {booking.getData("homeOwner.firstName") +
                                        " " +
                                        booking.getData("homeOwner.lastName")}
                                </p>
                                <p>{booking.getData("homeOwner.contactNum")}</p>
                                <p>
                                    <a href={"mailto:" + booking.getData("homeOwner.email")}>
                                        {booking.getData("homeOwner.email")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className={styles.confirm}>
                                <button className={displayStatusClassName}>
                                    {displayStatus[booking.getData("status")]}
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            {/* <div className={styles.detail}>
                                <a
                                    className={styles.btn + " btn-link"}
                                    href={reverse(routes.pages.houseListing.edit, {houseUUID: booking.getData("uuid")})}
                                >
                                    Manage
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default class AppComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.pageDashboard}>
                    <div className="container">
                        <h1>Dashboard</h1>
                        <div className="row">
                            <div className="col-md-12 col-lg-12 col-xl-12">
                                <h2>Property Listing</h2>
                                {this.props.houses.getObjectList().map((house, index) => (
                                    <GetHouseListing key={house[0]} house={house[1]} />
                                ))}
                                <h2>Booking Applications</h2>
                                {this.props.bookings.getObjectList().map((booking, index) => (
                                    <GetBookingListing key={booking[0]} booking={booking[1]} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
