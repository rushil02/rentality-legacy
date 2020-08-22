import React, {Component} from "react"

import {PulseLoader} from "react-spinners"

import styles from "./APIRequestButton.module.css"

/**
 * APIRequestButton
 *
 * props -
 *      textOption - key available in `textOptions`
 *      cTextOptions - Object like in 'textOptions' with text for 4 states [default, loading, done, error]
 *      loaderSize - in pixels, Size for the loading animation SVG
 *      loaderColor - Colour for the loading animation SVG
 *
 *      Following are the accepted prop keys for CSS classes [string]
 *          layoutClasses -
 *          loadingContainerClasses -
 *          textDoneClasses -
 *          textDefaultClasses -
 *          textErrorClasses -
 *          textLoadingClasses -
 *
 *      isDisabled - [optional] boolean
 *      doneDisabled - [optional] boolean
 *
 *      initialState - initial State of button
 *
 *      containerID - [optional] ID or Array of IDs of Form container(s) to track all child inputs to reset state
 *          on change to default. Works only with input based forms
 *
 *      observeMutations - [optional] Array of object {targetNode: DOM id [string], config: observer config [object]}
 *          Tracks all changes in mutation and resets the button, similar to functionality of containerID but works for
 *          non-input DOMs.
 *          For config options, refer to - https://dom.spec.whatwg.org/#dom-mutationobserver-mutationobserver
 *
 *      callback - Promise function
 *      onSuccess - ran when callback is a success
 *      onFailure - ran when callback is failed (IMP! - If something fails in OnSuccess function, onFailure function
 *                  will be called.)
 *
 *      formState - [optional] Current State of the form. Recognises following states -
 *                      - 'saved' [as done]
 *                      - 'initial' [as default]
 *                      - 'hasChanged' [as default]
 *                      - 'error' [as error]
 *                  This disables internal state management except for loading state while in API request.
 *
 * Possible States of Button => {default, loading, done, error}
 */

const textOptions = {
    save: {
        default: "Save",
        loading: "Saving",
        done: "Saved",
        error: "Error!",
    },
    saveNext: {
        default: "Save & Next",
        loading: "Saving",
        done: "Next",
        error: "Error!",
    },
    saveExit: {
        default: "Save & Exit",
        loading: "Saving",
        done: "Saved",
        error: "Error!",
    },
    cDelete: {
        default: "Delete",
        loading: "Deleting",
        done: "Deleted",
        error: "Error!",
    },
}

const _formStateMap = {
    saved: "done",
    initial: "default",
    hasChanged: "default",
    error: "error",
}

const _defaultMutationObserverConfig = {attributes: true, childList: true, subtree: true, characterData: true};

// FIXME: Optimize Mutation Observer (disconnect observer on reset - similar to event listener)
// FIXME: Merge state management for event listener and Mutation Observer
export default class APIRequestButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: props.initialState || "default",
        }
        this.containerList = []
    }

    componentDidMount() {
        this.mutationObserver = new MutationObserver(this.resetButtonOnMutation)

        if (this.props.containerID) {
            if (Array.isArray(this.props.containerID)) {
                this.props.containerID.forEach(containerID => {
                    this.containerList.push(document.getElementById(containerID))
                })
            } else {
                this.containerList.push(document.getElementById(this.props.containerID))
            }
        }
        if (this.props.observeMutations && this.props.observeMutations.length !== 0) {
            this.props.observeMutations.forEach(targetNode => {
                let config = targetNode.config || _defaultMutationObserverConfig
                this.mutationObserver.observe(document.getElementById(targetNode.domID), config)
            })
        }
    }

    componentWillUnmount() {
        this.removeListener()
        this.mutationObserver.disconnect()
    }

    attachListener = () => {
        if (this.containerList.length !== 0) {
            this.containerList.forEach(container => {
                container.addEventListener("input", this.resetButtonOnInput)
            })
        }
    }

    removeListener = () => {
        if (this.containerList.length !== 0) {
            this.containerList.forEach(container => {
                container.removeEventListener("input", this.resetButtonOnInput)
            })
        }
    }

    resetButtonOnInput = event => {
        if (this.containerList.length !== 0) {
            this.containerList.forEach(container => {
                container.removeEventListener("input", this.resetButtonOnInput)
            })
            this.setState({status: "default"})
        }
    }

    resetButtonOnMutation = (mutationsList, observer) => {
        this.setState({status: "default"})
        this.removeListener()
    }

    onActionClick = e => {
        this.setState({status: "loading"})
        this.props.callback(e)
            .then(result => {
                this.setState({status: "done"})
                if (this.props.onSuccess !== undefined) {
                    this.props.onSuccess(result)
                }
            })
            .catch(error => {
                this.setState({status: "error"})
                if (this.props.onFailure !== undefined) {
                    this.props.onFailure(error)
                }
            })
    }

    static getDerivedStateFromProps(props, state) {
        // Overrides state with formState, except for when loading
        if (props.formState && state.status !== "loading") {
            return {status: _formStateMap[props.formState]}
        } else {
            return null
        }
    }

    render() {
        let _textOptions = this.props.textOption ? textOptions[this.props.textOption] : this.props.cTextOptions

        let layoutClasses = this.props.layoutClasses || "btn float-right " + styles.btn

        if (this.props.isDisabled) {
            return (
                <button className={layoutClasses + " disabled"} aria-disabled="true" tabIndex={"-1"}>
                    <div className={this.props.textDefaultClasses || styles.text}>{_textOptions.default}</div>
                </button>
            )
        }

        if (this.state.status === "default") {
            return (
                <button className={layoutClasses} onClick={this.onActionClick} tabIndex={"0"}>
                    <div className={this.props.textDefaultClasses || styles.text}>{_textOptions.default}</div>
                </button>
            )
        } else if (this.state.status === "error") {
            this.attachListener()
            layoutClasses += this.props.errorClass ? " " + this.props.errorClass : " disabled " + styles.errorBtn
            return (
                <button
                    className={layoutClasses}
                    onClick={this.onActionClick}
                    aria-disabled="true"
                    tabIndex={"-1"}
                >
                    <div className={this.props.textErrorClasses || styles.text}>{_textOptions.error}</div>
                </button>
            )
        } else if (this.state.status === "loading") {
            layoutClasses += this.props.loadingClass ? " " + this.props.loadingClass : " " + styles.loadingBtn
            return (
                <button className={layoutClasses} onClick={this.onActionClick}>
                    <div className={this.props.loadingContainerClasses || styles.loadingContainer}>
                        <PulseLoader
                            // css={override}
                            sizeUnit={"px"}
                            size={this.props.loaderSize || 8}
                            color={this.props.loaderColor || "#36ffb1"}
                            loading={true}
                        />
                    </div>

                    <div className={this.props.textLoadingClasses || styles.text}>{_textOptions.loading}</div>
                </button>
            )
        } else if (this.state.status === "done") {
            this.attachListener()
            if (this.props.doneDisabled) {
                layoutClasses += this.props.doneClass ? " " + this.props.doneClass : " disabled " + styles.doneBtn
                return (
                    <button
                        className={layoutClasses}
                        onClick={this.onActionClick}
                        aria-disabled="true"
                        tabIndex={"-1"}
                    >
                        <div className={this.props.textDoneClasses || styles.text}>{_textOptions.done}</div>
                    </button>
                )
            } else {
                layoutClasses += this.props.doneClass ? " " + this.props.doneClass : " " + styles.doneBtn
                return (
                    <button className={layoutClasses} onClick={this.onActionClick} tabIndex={"0"}>
                        <div className={this.props.textDoneClasses || styles.text}>{_textOptions.done}</div>
                    </button>
                )
            }
        }
    }
}
