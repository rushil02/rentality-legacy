import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import format from "date-fns/format";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const styleGuide = {
    container: {
        paddingTop: "0.8rem",
        textOverflow: "ellipsis",
        paddingLeft: "10px !important",
        height: "calc(2.25rem + 15px)"
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
        background: "white"
    },
    calendarWrapper: {
        display: "-webkit-inline-box"
    }
};

export default class DatePickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            inUse: false
        };
    }

    showCalendar = () => {
        this.setState(prevState => ({
            ...prevState,
            show: true
        }));
    };

    handleBlurs = () => {
        if (!this.state.inUse) {
            this.setState(prevState => ({
                ...prevState,
                show: false
            }));
        }
    };

    setInUse = () => {
        if (!this.state.inUse) {
            this.setState(prevState => ({
                ...prevState,
                inUse: true
            }));
        }
    };

    setNotInUse = () => {
        if (this.state.inUse) {
            this.setState(prevState => ({
                ...prevState,
                inUse: false
            }));
        }
    };

    handleSelect = newDate => {
        this.props.onChange(format(newDate, "YYYY-MM-DD"));
        this.setState(prevState => ({
            ...prevState,
            show: false,
            inUse: false
        }));
    };

    render() {
        /**
         * extraProps are sent as a parameter. Add Date picker properties in extraProps.
         * Eg. extraProps={{maxDate: new Date()}}
         */
        let dateObj;
        if (this.props.value) {
            dateObj = new Date(this.props.value);
        }
        return (
            <React.Fragment>
                <div
                    tabIndex={"0"}
                    className={this.props.containerClasses || "form-control no-background"}
                    style={styleGuide.container}
                    onFocus={e => this.showCalendar()}
                    onBlur={e => this.handleBlurs()}
                >
                    <div style={{ float: "left" }}>{this.props.value || this.props.label}</div>
                    <div style={{ float: "right", marginRight: "10px" }}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    {this.state.show ? (
                        <div
                            tabIndex={"-1"}
                            style={styleGuide.calendarContainer}
                            onMouseEnter={e => this.setInUse()}
                            onMouseLeave={e => this.setNotInUse()}
                            onBlur={e => this.handleBlurs()}
                        >
                            <Calendar
                                onChange={this.handleSelect}
                                color={"#3fc692"}
                                date={dateObj ? dateObj : this.props.extraProps.maxDate}
                                {...this.props.extraProps}
                            />
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        );
    }
}
