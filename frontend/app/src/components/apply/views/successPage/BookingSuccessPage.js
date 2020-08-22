import React, { Component } from "react"
import { reverse } from "named-urls"
import routes from "routes"
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary"
import { Booking } from "apply/models"
import { getBookingData } from "apply/services"
import styles from "./BookingSuccess.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle as faSuccessIcon } from "@fortawesome/free-regular-svg-icons"

export default class BookingSuccessPage extends Component {
    constructor(props) {
        super(props)
        this.applicationUUID = this.props.routerProps.match.params.applicationUUID
        this.state = {
            status: "loading",
            booking: new Booking({}, "empty"),
            // booking:
        }
    }

    componentDidMount() {
        this.setState(prevState => ({ status: "loading" }))
        getBookingData(this.applicationUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                booking: new Booking(result, "saved"),
            }))
        })
    }

    render() {
        let booking = this.state.booking
        let displayStatusClassName = styles.btn + " btn-link"
        let bookingStatus = booking.getData("status")
        if (bookingStatus === "Pending" || bookingStatus === "Pending-Locked") {
            displayStatusClassName += " " + styles.pendingBorder
        } else if (bookingStatus === "Incomplete") {
            displayStatusClassName += " " + styles.incompleteBorder
        } else if (bookingStatus === "Booked") {
            displayStatusClassName += " " + styles.successBorder
        }
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
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <div className="image">
                                                    <img
                                                        src="images/page-dashboard/1.png"
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
                                                                        {booking.getData("bookingDateRange.startDate")}
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
                                                                        {booking.getData("bookingDateRange.endDate")}
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
                                                        <a
                                                            className={styles.title + " btn-link"}
                                                            href={reverse(routes.pages.apply.houseInfo, {
                                                                houseUUID: booking.getData("bookedHouse.houseUUID"),
                                                            })}
                                                        >
                                                            <h1>{booking.getData("bookedHouse.title")}</h1>
                                                        </a>
                                                        <h2>
                                                            {booking.getData("bookedHouse.houseNum")},{" "}
                                                            {booking.getData("bookedHouse.streetName")}
                                                        </h2>
                                                        <h2>{booking.getData("bookedHouse.location")}</h2>
                                                        <p>{booking.getData("bookedHouse.homeType")}</p>
                                                        <div className={styles.confirm}>
                                                            <button className={displayStatusClassName}>
                                                                {bookingStatus}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <div className={styles.tenantInfo}>
                                                            <h2>
                                                                {booking.getData("applicant.firstName")}{" "}
                                                                {booking.getData("applicant.lastName")}
                                                            </h2>
                                                            <h2>{booking.getData("applicant.email")}</h2>
                                                            <h2>{booking.getData("applicant.contactNum")}</h2>
                                                        </div>
                                                    </div> */}
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
        )
    }
}
