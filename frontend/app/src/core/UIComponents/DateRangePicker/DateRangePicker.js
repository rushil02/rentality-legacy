import React, {Component} from "react";
import styles from "./DateInput.css";
import {DateRange} from "react-date-range";
import {format} from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const styleGuide = {
    container: {
        paddingTop: "0.8rem",
        textOverflow: "ellipsis",
        paddingLeft: "10px !important",
        height: "calc(2.25rem + 15px)",
    },
    calendarContainer: {
        position: "absolute",
        left: "100px",
        top: "40px",
        zIndex: 10,
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
        paddingBottom: "10px",
        background: "white",
    },
    calendarWrapper: {
        display: "-webkit-inline-box",
    },
}

function formatDate(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "DD-MM-YYYY");
}

function formatDateDisplay(startDate, endDate, defaultText) {
    return formatDate(startDate, defaultText) + " to " + formatDate(endDate, defaultText);
}

export default class DateRangePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            show: false,
            inUse: false,
        };
    }

    showDateRangePicker = () => {
        this.setState((prevState) => ({
            ...prevState,
            show: true,
        }));
    };

    handleBlurs = () => {
        if (!this.state.inUse) {
            this.setState((prevState) => ({
                ...prevState,
                show: false,
            }));
        }
    };

    setInUse = () => {
        if (!this.state.inUse) {
            this.setState((prevState) => ({
                ...prevState,
                inUse: true,
            }));
        }
    };

    setNotInUse = () => {
        if (this.state.inUse) {
            this.setState((prevState) => ({
                ...prevState,
                inUse: false,
            }));
        }
    };

    handleSelect = (range) => {
        this.setState((prevState) => ({
            ...prevState,
            startDate: range.selection.startDate,
            endDate: range.selection.endDate,
        }));

        if (range.selection.startDate !== range.selection.endDate) {
            this.props.onChange(range.selection.startDate, range.selection.endDate);
            this.setState((prevState) => ({
                ...prevState,
                show: false,
                inUse: false,
            }));
        }
    };

    render() {
        /**
         * extraProps are sent as a parameter. Add Date picker properties in extraProps.
         * Eg. extraProps={{maxDate: new Date()}}
         */

        let selection = {
            key: "selection",
            color: "#3fc692",
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        };
        return (
            <React.Fragment>
                <div className={this.props.divClass || ""}>
                    <input
                        type="text"
                        readOnly
                        className={this.props.inputClass || ""}
                        placeholder="Select Dates"
                        value={formatDateDisplay(selection.startDate, selection.endDate)}
                        onFocus={(e) => this.showDateRangePicker()}
                        onBlur={(e) => this.handleBlurs()}
                        required
                    />
                </div>
                {this.state.show ? (
                    <div
                        tabIndex={"-1"}
                        style={styleGuide.calendarContainer}
                        onMouseEnter={(e) => this.setInUse()}
                        onMouseLeave={(e) => this.setNotInUse()}
                        onBlur={(e) => this.handleBlurs()}
                    >
                        <DateRange
                            className={styles.dateRangePicker}
                            ranges={[selection]}
                            onChange={this.handleSelect}
                            months={2}
                            minDate={new Date()}
                            direction={"horizontal"}
                            showDateDisplay={false}
                        />
                    </div>
                ) : null}
            </React.Fragment>
        );
    }
}
