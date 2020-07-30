import React, {Component, useContext} from "react"

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRangePicker, createStaticRanges} from "react-date-range"
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
} from "date-fns"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus, faPen, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons"
import styles from "./AvailabilitySelector.module.css"
import {PulseLoader} from "react-spinners"
import {Accordion, Card, Button, Row, useAccordionToggle} from "react-bootstrap";
import AccordionContext from "react-bootstrap/AccordionContext";


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
}

const staticRanges = createStaticRanges([
    {
        label: "Remaining Year",
        range: () => ({
            startDate: defineds.startOfToday,
            endDate: defineds.endOfToday,
        }),
    },
])

const inputRanges = [
    {
        label: "days starting today",
        range(value) {
            const today = new Date()
            return {
                startDate: today,
                endDate: addDays(today, Math.max(Number(value), 1) - 1),
            }
        },
        getCurrentValue(range) {
            if (!isSameDay(range.startDate, defineds.startOfToday)) return "-"
            if (!range.endDate) return "∞"
            return differenceInCalendarDays(range.endDate, defineds.startOfToday) + 1
        },
    },
]

export default class AvailabilitySelectorComponent extends Component {
    constructor(props) {
        super(props)

        if (window.innerWidth <= 1400) {
            this.monthsScreenNum = 1
        } else {
            this.monthsScreenNum = 2
        }
    }

    getInfoText = () => {
        let addNewDisplayText
        if (this.props.modeEditing) {
            addNewDisplayText = <span>Select dates</span>
        } else {
            if (this.props.modeNew) {
                addNewDisplayText = <Accordion.Toggle as={"span"} eventKey={this.props.idKey}>
                    Click to Add Dates
                </Accordion.Toggle>
            } else {
                addNewDisplayText = (
                    <span>
                        <b>{this.props.srcStartDate.toDateString()}</b> to <b>{this.props.srcEndDate.toDateString()}</b>
                    </span>
                )
            }
        }
        return addNewDisplayText
    }

    getSyncIndicator = () => {
        return (
            <PulseLoader
                // css={override}
                sizeUnit={"px"}
                size={10}
                color={"#3fc692"}
                loading={this.props.inSyncMode}
            />
        )
    }

    getEditButton = () => {
        let buttonConfig = {}
        if (this.props.modeEditing) {
            buttonConfig = {
                title: "Save",
                action: e => {
                    e.stopPropagation()
                    this.props.onSave()
                },
                icon: faCheck,
            }
        } else {
            if (this.props.modeNew) {
                buttonConfig = {
                    title: "Add",
                    action: e => {
                        e.stopPropagation()
                        this.props.toggleEditState(true)
                    },
                    icon: faPlus,
                }
            } else {
                buttonConfig = {
                    title: "Edit",
                    action: e => {
                        e.stopPropagation()
                        this.props.toggleEditState(true)
                    },
                    icon: faPen,
                }
            }
        }

        return (
            <Accordion.Toggle
                eventKey={this.props.idKey}
                as={Button}
                className={"btn btn-primary btn-circle btn-xl " + styles.btnCircle + " " + styles.btnXl}
                title={buttonConfig.title}
                onClick={buttonConfig.action}
            >
                <FontAwesomeIcon icon={buttonConfig.icon}/>
            </Accordion.Toggle>
        )
    }

    getRemoveButton = () => {
        if (this.props.modeNew && !this.props.modeEditing) {
            return " "
        } else {
            return (
                <Accordion.Toggle
                    eventKey={this.props.idKey}
                    className={`btn btn-danger btn-circle btn-xl ${styles.btnCircle} ${styles.btnXl} ${styles.cancelCustom}`}
                    as={Button}
                    title={"Delete"}
                    onClick={e => {
                        e.stopPropagation()
                        this.props.onRemove()
                    }}
                >
                    <FontAwesomeIcon icon={faTimes}/>
                </Accordion.Toggle>
            )
        }
    }

    getInfoCard = () => {
        if (this.props.modeNew) {
            return (
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={this.props.idKey}
                    className={styles.cardHeader}
                    onClick={(e) => {
                        this.props.toggleEditState()
                    }}
                >
                    <div className={styles.cardTextContent}>{this.getInfoText()}</div>
                    <div className="loading-container">{this.getSyncIndicator()}</div>
                    <div className={"invalid-feedback " + styles.invalidFeedback}>{this.props.error || ""}</div>
                    <div className={styles.cardButtonGroup}>
                        {this.getEditButton()}
                        {this.getRemoveButton()}
                    </div>
                </Accordion.Toggle>
            )
        } else {
            return (
                <Card.Header className={styles.cardHeader}>
                    <div className={styles.cardTextContent}>{this.getInfoText()}</div>
                    <div className="loading-container">{this.getSyncIndicator()}</div>
                    <div className={"invalid-feedback " + styles.invalidFeedback}>{this.props.error || ""}</div>
                    <div className={styles.cardButtonGroup}>
                        {this.getEditButton()}
                        {this.getRemoveButton()}
                    </div>
                </Card.Header>
            )
        }

    }

    handleSelect = range => {
        this.props.handleSelect(range.selection.startDate, range.selection.endDate)
    }

    render() {
        let selectionRange = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            key: "selection",
            color: "#3fc692",
        }

        return (
            <React.Fragment>
                <Accordion>
                    <Card className={"mb-3 " + styles.accordionBorder}>
                        {this.getInfoCard()}
                        <Accordion.Collapse eventKey={this.props.idKey}>
                            <Card.Body className={styles.cardBody}>
                                <Row className={styles.cardBodyCollapsibleRow}>
                                    <div
                                        className={"col-12 " + styles.availabilitySelectorContainer}
                                        style={{padding: "20px"}}
                                    >
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            onChange={this.handleSelect}
                                            months={this.monthsScreenNum}
                                            minDate={new Date()}
                                            direction={"horizontal"}
                                            staticRanges={staticRanges}
                                            inputRanges={inputRanges}
                                        />
                                    </div>
                                </Row>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
        )
    }
}
