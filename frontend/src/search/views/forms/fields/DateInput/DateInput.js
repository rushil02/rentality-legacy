import React, { Component } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import styles from "./DateInput.css";
import searchStyles from "search/views/forms/SearchForm.css";

function formatDate(date, defaultText) {
    if (!date) return defaultText;
    return format(date, "DD-MM-YYYY");
}

function formatDateDisplay(startDate, endDate, defaultText) {
    return (
        formatDate(startDate, defaultText) +
        " to " +
        formatDate(endDate, defaultText)
    );
}

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            datePickerVisible: false
        };
    }

    handleSelect = range => {
        this.setState({
            startDate: range.selection.startDate,
            endDate: range.selection.endDate
        });
        this.props.onChange(range.selection.startDate, range.selection.endDate);
    };

    // handleRangeChange(which, payload) {
    //     this.setState({
    //         [which]: {
    //             ...this.state[which],
    //             ...payload
    //         }
    //     });
    //     this.props.onChange(formatDate(payload.selection.startDate), formatDate(payload.selection.endDate));
    // }

    toggleDatePickerVisibility = () => {
        this.setState({
            datePickerVisible: !this.state.datePickerVisible
        });
    };

    setDatePickerInvisible = () => {
        this.setState({
            datePickerVisible: false
        });
    };

    render() {
        let selection = {
            key: "selection",
            color: "#3fc692",
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        return (
            <React.Fragment>
                <div className="col-md-3">
                    <input
                        type="text"
                        readOnly
                        className={
                            searchStyles.formControl + " " + searchStyles.date
                        }
                        onClick={this.toggleDatePickerVisibility}
                        // onBlur={this.setDatePickerInvisible}
                        value={formatDateDisplay(
                            selection.startDate,
                            selection.endDate
                        )}
                    />
                </div>
                {this.state.datePickerVisible && (
                    <DateRange
                        className={styles.dateRangePicker}
                        ranges={[selection]}
                        onChange={this.handleSelect}
                        months={2}
                        minDate={new Date()}
                        direction={"horizontal"}
                    />
                )}
            </React.Fragment>
        );
    }
}
