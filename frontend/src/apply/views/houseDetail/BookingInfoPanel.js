import React, {Component} from 'react';
import styles from "./BookingInfoPanel.css";
import Select from "react-select";
import {Accordion, Card, Button} from 'react-bootstrap';
import {DateRange} from "react-date-range";
import {addDays, format} from "date-fns";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRangeCalendar.css';
import {getUnavailableDates} from "apply/services";


const guestNumSelectStyles = {
    option: (provided, state) => ({
        ...provided,
    }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return {...provided, opacity, transition};
    },
    control: (provided, state) => ({
        border: "none",
        cursor: "text",
        display: "flex",
        "flexWrap": "wrap",
        // "padding-top": "6px",
        // "padding-bottom": "6px",
        // 'height': 'calc(2.25rem + 15px)',
    }),

    container: (provided, state) => ({
        "position": "relative",
        "fontSize": "15px",
        "color": "#2a2b32",
        fontWeight: '400',
        "paddingLeft": "0",
        "WebkitTransition": "all 0.30s ease-in-out",
        "Moztransition": "all 0.30s ease-in-out",
        "msTransition": "all 0.30s ease-in-out",
        "OTransition": "all 0.30s ease-in-out",
        // "box-shadow": state.isFocused ? "0 6px 12px -7px #3fc692 !important" : "initial",
    })
};

export default class BookingInfoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDates: {},
            unavailableDates: [],
            maxDate: addDays(new Date(), 1),
            minDate: new Date()
        };
        this.dateSelectionAccordionRef = null;
    }

    componentDidMount() {
        getUnavailableDates(this.props.house.getData('UUID'))
            .then(result => {
                let maxDate, minDate;
                let midUnavailableDates = [];
                result.forEach(function (range) {
                    if (range.start_date == null) {
                        minDate = new Date(range.end_date);
                    } else if (range.end_date == null) {
                        maxDate = new Date(range.start_date);
                    } else {
                        midUnavailableDates.push({
                            startDate: new Date(range.start_date),
                            endDate: new Date(range.end_date)
                        })
                    }
                });
                this.setState(prevState => (
                    {
                        ...prevState,
                        unavailableDates: midUnavailableDates,
                        maxDate: maxDate,
                        minDate: minDate
                    })
                );
            })
    }

    closeDateSelectionAccordion = () => {
        this.dateSelectionAccordionRef.click();
    };

    handleDateSelect = (ranges) => {
        if (ranges.selection.startDate.getTime() !== ranges.selection.endDate.getTime()) {
            this.closeDateSelectionAccordion()
        }
        this.props.handleDateChange(ranges.selection.startDate, ranges.selection.endDate);
    };

    render() {
        let inputRefs = {};
        let guestsNumOptions = [];

        for (let i = 1; i <= this.props.house.getData('maxPeopleAllowed'); i++) {
            guestsNumOptions.push({value: i, label: i})
        }

        let furnished = this.props.house.getData('furnished') === 'Y' ? 'Furnished' : 'Unfurnished';

        let selectionRange = {
            startDate: this.props.bookingDateRange.startDate,
            endDate: this.props.bookingDateRange.endDate,
            key: 'selection',
            color: '#3fc692'
        };

        return (
            <React.Fragment>
                <div className="padding">
                    <div className={styles.title + " " + styles.infoSection}>
                        <h1>{this.props.house.getData('title')}</h1>
                        <p>{this.props.address}</p>
                    </div>
                    <div className={styles.infoSection}>
                        <Accordion>
                            <Card className={styles.dateDisplayCard}>
                                <Card.Header className={styles.dateDisplayCardHeader}>
                                    <Accordion.Toggle as={Button} className={styles.dateDisplayChangeButton} ref={(el) => this.dateSelectionAccordionRef = el}
                                                      variant={'link'} eventKey="dateRangeSel">
                                        <div className="row" style={{cursor: "pointer"}}>
                                            <div className="col-5">
                                                <div className={styles.dateSubtitle + " text-left"}>Move in</div>
                                                <div
                                                    className={styles.dateDisplay + " text-left"}>{format(this.props.bookingDateRange.startDate, 'MMM DD YYYY')}</div>
                                            </div>
                                            <div className={"col-2 " + styles.centerArrow}/>
                                            <div className="col-5">
                                                <div className={styles.dateSubtitle + " text-right"}>Move out</div>
                                                <div
                                                    className={styles.dateDisplay + " text-right"}>{format(this.props.bookingDateRange.endDate, 'MMM DD YYYY')}</div>
                                            </div>
                                        </div>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="dateRangeSel">
                                    <Card.Body className={styles.dateDisplayCardBody}>
                                        <DateRange
                                            ranges={[selectionRange]}
                                            showSelectionPreview={true}
                                            onChange={this.handleDateSelect}
                                            maxDate={this.state.maxDate}
                                            minDate={this.state.minDate}
                                            disabledDates={this.state.unavailableDates}
                                            months={1}
                                            minRangeLength={28}
                                            showDateDisplay={false}
                                            minRange={1}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        <div className={"row"} style={{marginTop: "20px"}}>
                            <div className="col-8 d-flex align-items-end" onClick={() => {
                                inputRefs.guestNumSelect.focus()
                            }}><h2 className={styles.subTitle}>Number of
                                Guests</h2></div>
                            <div className="col-4 d-flex justify-content-end">
                                <Select
                                    styles={guestNumSelectStyles}
                                    options={guestsNumOptions}
                                    placeholder="0"
                                    onChange={(e) => this.props.onNumGuestsChange(e.value)}
                                    value={{value: this.props.numGuests, label: this.props.numGuests}}
                                    ref={(el) => inputRefs.guestNumSelect = el}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className={styles.subTitle}>Room Type</h2>
                        <p className={styles.pr}>{furnished} {this.props.house.getData('homeType')}</p>
                        <h2 className={styles.subTitle}>Cancellation Policy</h2>
                        <span className={styles.moreInfo}>More Info</span>
                        <p className={styles.pr}>{this.props.cancellationPolicy.getData('verbose')}</p>
                    </div>
                    <div className={styles.infoSection}>
                        <div className="left-padding">
                            <div className="row">
                                <div className={"col-8 " + styles.leftInfo}>Weekly Rent</div>
                                <div
                                    className={"col-4 text-right " + styles.rightInfo}>${this.props.house.getData('rent')} AUD
                                </div>
                            </div>
                            <div className="row" style={{marginBottom: "10px"}}>
                                <div className={"col-8 " + styles.leftInfo}>Length of Stay</div>
                                <div className={"col-4 text-right " + styles.rightInfo}>$800 AUD</div>
                            </div>
                            <div className="row" style={{marginBottom: "10px"}}>
                                <div className={"col-8 " + styles.leftInfo}>Service fee</div>
                                <div className={"col-4 text-right " + styles.rightInfo}>$48 AUD</div>
                            </div>
                            {/*<div className="row">*/}
                            {/*    <div className={"col-12"}>*/}
                            {/*        <div className={"row no-gutters " + styles.discountContainer}>*/}
                            {/*            <div className="col-8">*/}
                            {/*                <input type="text" className={"form-control " + styles.discountInput}*/}
                            {/*                       placeholder="Promo Code"/>*/}
                            {/*            </div>*/}
                            {/*            <div className="col-4 d-flex justify-content-center">*/}
                            {/*                <button type="button"*/}
                            {/*                        className={"btn btn-link btn-block " + styles.discountApplyBtn}>Apply*/}
                            {/*                    code*/}
                            {/*                </button>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <hr/>
                            <div className="row">
                                <div className={"col-8 " + styles.totalLeftInfo}>Booking Deposit</div>
                                <div className={"col-4 text-right " + styles.totalRightInfo}>$800 AUD</div>
                                <div className={"col-12 " + styles.grayInfo}>Rent for 4 weeks + Service Fee</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}