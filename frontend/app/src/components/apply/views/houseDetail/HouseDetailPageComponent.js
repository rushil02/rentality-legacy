import React, { Component } from "react"
import { lowerCase, startCase } from "lodash"
import BookingInfoPanel from "./BookingInfoPanel"
import ApplyPanel from "./ApplyPanel"
import ImageCarousel from "./ImageCarousel"
import { ConfirmBookingModal } from "./ConfirmBookingModal"
import styles from "./HouseDetailPage.module.css"
import { Link } from "gatsby"

export default class HouseDetailPageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bookButtonActive: false,
        }
        this.elementRefs = {}
    }

    scrollToRef = ref => {
        window.scrollTo(0, ref.offsetTop + ref.offsetParent.offsetTop - 30)
    }

    scrollToTop = ref => {
        window.scrollTo(0, ref.offsetTop)
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    handleScroll = () => {
        let threshold =
            this.elementRefs.bookingSection.offsetTop +
            this.elementRefs.bookingSection.offsetParent.offsetTop -
            0.3 * window.innerHeight
        if ((window.pageYOffset || document.documentElement.scrollTop) > threshold) {
            // Reached apt scroll point to activate button
            if (!this.state.bookButtonActive) {
                this.setState(prevState => ({
                    ...prevState,
                    bookButtonActive: true,
                }))
            }
        } else {
            if (this.state.bookButtonActive) {
                this.setState(prevState => ({
                    ...prevState,
                    bookButtonActive: false,
                }))
            }
        }
    }

    render() {
        let furnished = this.props.house.getData("furnished") === "Y" ? "Furnished" : "Unfurnished"
        let locationVerbose = this.props.location.getData("properties")
        let address = `${locationVerbose.name}, ${locationVerbose.region}, ${locationVerbose.country} - ${locationVerbose.code}`
        let homeOwnerName =
            startCase(lowerCase(this.props.homeOwnerInfo.getData("firstName"))) +
            " " +
            startCase(lowerCase(this.props.homeOwnerInfo.getData("lastName")))

        let elementRefs = this.elementRefs

        return (
            <React.Fragment>
                {this.props.disableDisplay ? <div className={styles.disabledOverlay} /> : null}
                <ImageCarousel images={this.props.images} />
                <div className={styles.pageDetail}>
                    <div className="container">
                        <div className="row" style={{ paddingBottom: "120px" }}>
                            <div className="col-lg-7 col-xl-8">
                                <div className="left">
                                    <div className={styles.title}>
                                        <h1>{this.props.house.getData("title")}</h1>
                                        <p className={styles.address}>{address}</p>
                                    </div>
                                    <div className={styles.box}>
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className={styles.boxTitle}>
                                                    {furnished} {this.props.house.getData("homeType")}
                                                </div>
                                            </div>
                                            <div className="col-md-3" />
                                            <div className="col-md-3">
                                                <div className={styles.icon}>
                                                    <div className={styles.iconImage}>
                                                        <img
                                                            src="/dj_static/image/page-detail/left-box/1.svg"
                                                            alt=""
                                                            title=""
                                                        />
                                                    </div>
                                                    <p className={styles.boxText}>
                                                        {this.props.house.getData("numBedrooms")} bedrooms
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className={styles.icon}>
                                                    <div className={styles.iconImage}>
                                                        <img
                                                            src="/dj_static/image/page-detail/left-box/2.svg"
                                                            alt=""
                                                            title=""
                                                        />
                                                    </div>
                                                    <p className={styles.boxText}>
                                                        {this.props.house.getData("numBathrooms")} bathroom
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className={styles.icon}>
                                                    <div className={styles.iconImage}>
                                                        <img
                                                            src="/dj_static/image/page-detail/left-box/3.svg"
                                                            alt=""
                                                            title=""
                                                        />
                                                    </div>
                                                    <p className={styles.boxText}>
                                                        {this.props.house.getData("numParkSpaces")} Garage
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.about}>
                                        <h2 className={styles.hl2}>About The Property</h2>
                                        <p className={styles.pg}>{this.props.house.getData("description")} </p>
                                        <h3 className={styles.hl3}>Tenant Access</h3>
                                        <p className={styles.pg}>{this.props.house.getData("accessRestrictions")}</p>
                                        {this.props.house.getData("otherPeopleDescription") ? (
                                            <React.Fragment>
                                                <h3 className={styles.hl3}>About other People in the house</h3>
                                                <p className={styles.pg}>
                                                    {this.props.house.getData("otherPeopleDescription")}
                                                </p>
                                            </React.Fragment>
                                        ) : null}
                                        <h3 className={styles.hl3}>Welcome to</h3>
                                        <ul className={"list-inline " + styles.checkList}>
                                            {this.props.house.getData("welcomeTags").map((item, index) => (
                                                <li key={index} className="list-inline-item">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.infoSection}>
                                        <h2 className={styles.hl2}>Housing Facilities</h2>
                                        <ul className={"list-inline " + styles.checkList}>
                                            {this.props.house.getData("facilities").map((item, index) => (
                                                <li key={index} className="list-inline-item">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={styles.rule}>
                                        <h2 className={styles.hl2}>House Rules</h2>
                                        <ul className={"list-group list-group-flush"}>
                                            {this.props.house.getData("rules").map((item, index) => (
                                                <li key={index} className="list-group-item">
                                                    <div
                                                        className={"d-flex justify-content-between align-items-center"}
                                                    >
                                                        <span>{item.rule}</span>
                                                        <span>{item.value}</span>
                                                    </div>
                                                    <p>{item.comment}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <p
                                            style={{
                                                marginTop: "20px",
                                                marginBottom: "30px",
                                            }}
                                        >
                                            {this.props.house.getData("otherRules")}
                                        </p>

                                        <div className={styles.pg}>
                                            Minimum Length of Stay - <b>{this.props.house.getData("minStay")}</b>
                                        </div>

                                        <div className={styles.pg}>
                                            Maximum Length of Stay -{" "}
                                            <b>
                                                {this.props.house.getData("maxStay") !== 0
                                                    ? this.props.house.getData("maxStay")
                                                    : "No Limit"}
                                            </b>
                                        </div>

                                        <div className={styles.pg}>
                                            Maximum Number of People Allowed -{" "}
                                            <b>{this.props.house.getData("maxPeopleAllowed")}</b>
                                        </div>
                                    </div>

                                    <div className={styles.infoSection}>
                                        <h2 className={styles.hl2}>Cancellation Policy</h2>
                                        <h3 className={styles.hl3}>
                                            {this.props.cancellationPolicy.getData("verbose")}
                                        </h3>
                                        <p>{this.props.cancellationPolicy.getData("description")}</p>
                                    </div>

                                    <div className={styles.infoSection}>
                                        <h2 className={styles.hl2}>About area</h2>
                                        <div className={styles.map}>
                                            <iframe
                                                title={"House Location Map"}
                                                width="100%"
                                                height="100%"
                                                style={{
                                                    border: "0",
                                                    borderRadius: "5px",
                                                }}
                                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyClsJFzjgJBxhY3D4HDn4V_EG9Y5FYqdqQ&q=${address}`}
                                                allowFullScreen
                                            />
                                        </div>
                                        <h3 className={styles.hl3}>Local Area Facilities</h3>
                                        <ul className={"list-inline " + styles.checkList}>
                                            {this.props.house.getData("neighbourhoodFacilities").map((item, index) => (
                                                <li key={index} className="list-inline-item">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className={styles.pg}>
                                            {this.props.house.getData("neighbourhoodDescription")}
                                        </p>
                                    </div>

                                    <div className={styles.infoSection}>
                                        <h2 className={styles.hl2}>About Home Owner</h2>
                                        <div className={"row"} style={{ marginBottom: "30px" }}>
                                            <div className={"col-3"}>
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <img
                                                        src={this.props.homeOwnerInfo.getData("profilePicture")}
                                                        className={"rounded-circle " + styles.userImage}
                                                        alt=""
                                                        title=""
                                                    />
                                                </div>
                                            </div>
                                            <div className={"col-9"}>
                                                <h3 className={styles.hl3}>{homeOwnerName}</h3>

                                                <div className={"list " + styles.tagList}>
                                                    <ul className={"list-inline " + styles.listInline}>
                                                        {this.props.homeOwnerInfo
                                                            .getData("personalityTags")
                                                            .map((item, index) => (
                                                                <li key={index} className={"list-inline-item"}>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="applyPanelID">
                                        <h2
                                            className={styles.hl2}
                                            ref={el => {
                                                elementRefs.bookingSection = el
                                            }}
                                        >
                                            Booking Information
                                        </h2>
                                        {getInfoMobilePanel(this, address)}

                                        <ApplyPanel
                                            homeOwnerName={homeOwnerName}
                                            application={this.props.application}
                                            onFieldChange={this.props.handleApplicationChange}
                                            checkoutFormRef={this.props.checkoutFormRef}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-lg-none col-12" style={{ marginTop: "70px" }}>
                                <ConfirmBookingModal
                                    onApply={this.props.onApply}
                                    onConfirmBooking={this.props.onConfirmBooking}
                                    ref={this.props.confirmModalRef}
                                    applicationUUID={this.props.applicationUUID}
                                />
                            </div>

                            {getInfoSidePanel(this, address)}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function getInfoSidePanel(that, address) {
    if (typeof window !== `undefined`) {
        if (window.innerWidth >= 992) {
            return (
                <div className="d-none d-lg-block col-lg-5 col-xl-4">
                    <div className={styles.right}>
                        <BookingInfoPanel
                            house={that.props.house}
                            bookingDateRange={{
                                startDate: that.props.application.getData("bookingInfo.bookingStartDate"),
                                endDate: that.props.application.getData("bookingInfo.bookingEndDate"),
                            }}
                            numGuests={that.props.application.getData("bookingInfo.numGuests")}
                            onNumGuestsChange={that.props.handleGuestsNumChange}
                            address={address}
                            cancellationPolicy={that.props.cancellationPolicy}
                            handleDateChange={that.props.handleDateChange}
                            finInfo={that.props.finInfo}
                            inSyncFinInfo={that.props.inSyncFinInfo}
                        />

                        <div className="row" style={{ margin: "20px 0" }}>
                            <div className="col-12 d-flex justify-content-center">
                                {that.state.bookButtonActive ? (
                                    <ConfirmBookingModal
                                        onApply={that.props.onApply}
                                        onConfirmBooking={that.props.onConfirmBooking}
                                        ref={that.props.confirmModalRef}
                                        applicationUUID={that.props.applicationUUID}
                                    />
                                ) : (
                                    <a
                                        className="imp-button-style"
                                        onClick={() => {
                                            that.scrollToRef(that.elementRefs.bookingSection)
                                        }}
                                    >
                                        Book Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div className="d-none d-lg-block col-lg-5 col-xl-4" />
        }
    } else {
        return null
    }
}

function getInfoMobilePanel(that, address) {
    if (typeof window !== `undefined`) {
        if (window.innerWidth < 992) {
            return (
                <div className={"d-lg-none"}>
                    <BookingInfoPanel
                        house={that.props.house}
                        bookingDateRange={{
                            startDate: that.props.application.getData("bookingInfo.bookingStartDate"),
                            endDate: that.props.application.getData("bookingInfo.bookingEndDate"),
                        }}
                        numGuests={that.props.application.getData("bookingInfo.numGuests")}
                        onNumGuestsChange={that.props.handleGuestsNumChange}
                        address={address}
                        cancellationPolicy={that.props.cancellationPolicy}
                        handleDateChange={that.props.handleDateChange}
                        finInfo={that.props.finInfo}
                        inSyncFinInfo={that.props.inSyncFinInfo}
                    />
                </div>
            )
        } else {
            return <div className={"d-lg-none"} />
        }
    } else {
        return null
    }
}
