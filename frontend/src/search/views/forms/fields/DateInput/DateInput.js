import React, { Component } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import { format, addDays } from "date-fns";
import "./DateInput.css";

function formatDate(date, defaultText){
    if (!date) return defaultText;
    return format(date, "DD-MM-YYYY");
}


function formatDateDisplay(startDate, endDate, defaultText) {
    return formatDate(startDate, defaultText) + " to " + formatDate(endDate, defaultText)
}

function convertDate(dateString){
    let a = dateString.split('-');
    let b = a[1] + '/' + a[0] + '/' + a[2];
    return new Date(b);
}

export default class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateRangePicker: {
                selection: {
                    startDate: convertDate(this.props.startDate),
                    endDate: convertDate(this.props.endDate),
                    key: "selection",
                    color: "#3fc692"
                }
            },
            datePickerVisible: false
        };
    }
    handleRangeChange(which, payload) {
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload
            }
        });
        this.props.onChange(formatDate(payload.selection.startDate), formatDate(payload.selection.endDate));
    }

    toggleDatePickerVisibility = () => {
        this.setState({
            datePickerVisible: !this.state.datePickerVisible
        });
    }

    setDatePickerInvisible = () => {
        this.setState({
            datePickerVisible: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <input
                        type="text"
                        readOnly
                        className="form-control date"
                        onClick={this.toggleDatePickerVisibility}
                        // onBlur={this.setDatePickerInvisible}
                        value={formatDateDisplay(
                            this.state.dateRangePicker.selection.startDate, this.state.dateRangePicker.selection.endDate
                        )}
                    />
                </div>
                { this.state.datePickerVisible && 
                    <DateRangePicker
                        className="date-range-picker"
                        ranges={[this.state.dateRangePicker.selection]}
                        onChange={this.handleRangeChange.bind(this, "dateRangePicker")}
                        months={2}
                        minDate={new Date()}
                        direction={"horizontal"}
                    />
                }
                
            </React.Fragment>
        );
    }
}