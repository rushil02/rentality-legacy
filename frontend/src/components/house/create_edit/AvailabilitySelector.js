import React, {Component} from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker, createStaticRanges} from 'react-date-range';
import {
    addDays,
    endOfDay,
    startOfDay,
    startOfMonth,
    endOfMonth,
    addMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    differenceInCalendarDays,
} from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faPen, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import './AvailabilitySelector.css';


const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
};


const staticRanges = createStaticRanges([
    {
        label: 'Remaining Year',
        range: () => ({
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        }),
    },
]);


const inputRanges = [
    {
        label: 'days starting today',
        range(value) {
            const today = new Date();
            return {
                startDate: today,
                endDate: addDays(today, Math.max(Number(value), 1) - 1),
            };
        },
        getCurrentValue(range) {
            if (!isSameDay(range.startDate, defineds.startOfToday)) return '-';
            if (!range.endDate) return '∞';
            return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1;
        },
    },
];


export default class AvailabilitySelectorComponent extends Component {
    constructor(props) {
        super(props);
    }

    displayInfoCard = (startDate, endDate) => {
        let editButton, addNewDisplayText;

        if (this.props.modeEditing) {
            editButton =
                <button className="btn btn-primary btn-circle btn-xl" type="button"
                        title={"Save"}
                        data-toggle="collapse"
                        ref={(button) => {
                            this.toggleCalendarButton = button;
                        }}
                        onClick={() => this.props.onSave()}
                        data-target={"#collapsibleCalendar-" + this.props.idKey} aria-expanded="false"
                        aria-controls={"collapsibleCalendar-" + this.props.idKey}>
                    <FontAwesomeIcon icon={faCheck}/>
                </button>
            ;

        } else {
            if (this.props.modeNew) {
                editButton =
                    <button className="btn btn-primary btn-circle btn-xl" type="button"
                            title={"Add"}
                            data-toggle="collapse"
                            ref={(button) => {
                                this.toggleCalendarButton = button;
                            }}
                            onClick={() => this.props.toggleEditState(true)}
                            data-target={"#collapsibleCalendar-" + this.props.idKey} aria-expanded="false"
                            aria-controls={"collapsibleCalendar-" + this.props.idKey}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
            } else {
                editButton =
                    <button className="btn btn-primary btn-circle btn-xl" type="button"
                            title={"Edit"}
                            data-toggle="collapse"
                            ref={(button) => {
                                this.toggleCalendarButton = button;
                            }}
                            onClick={() => this.props.toggleEditState(true)}
                            data-target={"#collapsibleCalendar-" + this.props.idKey} aria-expanded="false"
                            aria-controls={"collapsibleCalendar-" + this.props.idKey}>
                        <FontAwesomeIcon icon={faPen}/>
                    </button>
            }
        }

        if (this.props.modeEditing){
            addNewDisplayText = <span>Select dates</span>;
        } else {
            addNewDisplayText = <span>Click to Add Dates</span>;
        }

        if (this.props.modeNew) {
            return (
                <div className="card-body" onClick={() => {
                    this.toggleCalendarButton.click()
                }}>
                    <div className="card-text-content-custom">
                        {addNewDisplayText}
                    </div>
                    <div className="invalid-feedback">{this.props.error || ''}</div>
                    <div className="card-button-group-custom">
                        {editButton}
                    </div>
                </div>
            )

        } else {
            return (
                <div className="card-body">
                    <div className="card-text-content-custom">
                        <span><b>{this.props.srcStartDate.toDateString()}</b> to <b>{this.props.srcEndDate.toDateString()}</b></span>
                    </div>
                    <div className="invalid-feedback">{this.props.error || ''}</div>
                    <div className="card-button-group-custom">
                        {editButton}
                        <button className="btn btn-danger btn-circle btn-xl cancel-custom" type="button"
                                title={"Delete"} onClick={(e) => this.props.onRemove()}
                                >
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </div>
                </div>
            )
        }
    };

    handleSelect = (range) => {
        this.props.handleSelect(range.selection.startDate, range.selection.endDate);
    };

    render() {
        let selectionRange = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            key: 'selection',
            color: '#3fc692'
        };

        let monthsScreenNum;
        if (window.innerWidth <= 1400) {
            monthsScreenNum = 1
        } else {
            monthsScreenNum = 2
        }

        return (
            <React.Fragment>
                <div className="card mb-3">
                    {this.displayInfoCard()}
                    <div className="collapse availability-selector-container"
                         id={"collapsibleCalendar-" + this.props.idKey}>
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={this.handleSelect}
                            months={monthsScreenNum}
                            minDate={new Date()}
                            direction={'horizontal'}
                            staticRanges={staticRanges}
                            inputRanges={inputRanges}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
