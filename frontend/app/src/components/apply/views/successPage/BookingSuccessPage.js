import React, {Component} from "react"
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary"
import {Booking} from "../../models"
import {getBookingData} from "../../services"
import styles from "./BookingSuccess.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCheckCircle as faSuccessIcon} from "@fortawesome/free-regular-svg-icons"


export default class BookingSuccessPage extends Component {
    constructor(props) {
        super(props)
        this.applicationUUID = this.props.applicationUUID
        this.state = {
            status: "loading",
            booking: new Booking({}, "empty"),
        }
    }

    componentDidMount() {
        this.setState(prevState => ({status: "loading"}))
        getBookingData(this.applicationUUID).then(result => {
            this.setState(prevState => ({
                ...prevState,
                status: "done",
                booking: new Booking(result, "saved"),
            }))
        }).catch(error => {
            this.setState({status: "done"})
        })
    }

    render() {
        // let booking = this.state.booking
        // let displayStatusClassName = styles.btn + " btn-link"
        // let bookingStatus = booking.getData("status")
        // if (bookingStatus === "Pending" || bookingStatus === "Pending-Locked") {
        //     displayStatusClassName += " " + styles.pendingBorder
        // } else if (bookingStatus === "Incomplete") {
        //     displayStatusClassName += " " + styles.incompleteBorder
        // } else if (bookingStatus === "Booked") {
        //     displayStatusClassName += " " + styles.successBorder
        // }
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
                                    <FontAwesomeIcon icon={faSuccessIcon} size="9x" color={"#3fc692"}/>
                                    <h1>Success</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className={"col-12"}>
                                    <p className="text-center">We'll send you an email confirming all the details, as
                                        soon as we are able to verify the payment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </RequestErrorBoundary>
        )
    }
}
