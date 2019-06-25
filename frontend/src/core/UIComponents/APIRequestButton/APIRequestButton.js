import React, {Component} from 'react';

import {PulseLoader} from "react-spinners";

import styles from "./APIRequestButton.css";


/**
 * APIRequestButton
 *
 * props -
 *      cTextOptions - key for textOptions
 *      initialState - initial State of button
 *      containerID - [optional] ID of Form container to track all child inputs to reset state on change to default
 *                    Works only with input based forms
 *      textOption - either a key available in `textOptions`, or a similar Object similar
 *      callback - Promise function
 *      onSuccess - ran when callback is a success
 *      onFailure - ran when callback is failed (IMP! - If something fails in OnSuccess function, onFailure function
 *                  will be called.)
 *
 *      Following 2 props are to be used together
 *      formState - [optional] Current State of the form. Recognises following states -
 *                      - 'saved' [as done]
 *                      - 'initial' [as default]
 *                      - 'hasChanged' [as default]
 *                      - 'error' [as error]
 *
 * Possible States of Button => {default, loading, done, error}
 */

const textOptions = {
    save: {
        default: 'Save',
        loading: 'Saving',
        done: 'Saved',
        error: 'Error!'
    },
    saveNext: {
        default: 'Save & Next',
        loading: 'Saving',
        done: 'Next',
        error: 'Error!'
    }
};

const _formStateMap = {
    saved: 'done',
    initial: 'default',
    hasChanged: 'default',
    error: 'error'
};


// cTextOptions : Object like in 'textOptions' above
export default class APIRequestButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: props.initialState || "default"
        };
        this.container = null;
    }

    attachListener = () => {
        if (this.container) {
            this.container.addEventListener('input', this.resetButtonOnInput);
        }
    };

    resetButtonOnInput = (event) => {
        if (this.container) {
            this.setState({status: "default"});
            this.container.removeEventListener('input', this.resetButtonOnInput)
        }
    };

    onActionClick = (e) => {
        this.setState({status: "loading"});
        this.props.callback(e)
            .then((result) => {
                this.setState({status: "done"});
                if (this.props.onSuccess !== undefined) {
                    this.props.onSuccess(result);
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({status: "error"});
                if (this.props.onFailure !== undefined) {
                    this.props.onFailure(error);
                }
            })
    };

    static getDerivedStateFromProps(props, state) {
        // Overrides state with formState, except for when loading
        if (props.formState && state.status !== 'loading') {
            return {status: _formStateMap[props.formState]}
        } else {
            return null
        }
    }

    render() {
        let _textOptions = textOptions[this.props.textOption] || this.props.cTextOptions;
        if (this.props.containerID) {
            this.container = document.getElementById(this.props.containerID);
        }

        let layoutClasses = this.props.layoutClasses || 'btn float-right ' + styles.btn;

        if (this.state.status === 'default') {
            return (
                <a type="button" className={layoutClasses} onClick={this.onActionClick} tabIndex={"0"}>
                    <div style={{"textAlign": "center", float: "right", position: "relative", width: "auto"}}>
                        {_textOptions.default}
                    </div>
                </a>
            )

        } else if (this.state.status === 'error') {
            this.attachListener();
            layoutClasses += this.props.errorClass ? ' ' + this.props.errorClass : ' ' + styles.errorBtn;
            return (
                <a type="button" className={layoutClasses} onClick={this.onActionClick}>
                    <div style={{"textAlign": "center", float: "right", position: "relative", width: "auto"}}>
                        {_textOptions.error}
                    </div>
                </a>
            )

        } else if (this.state.status === 'loading') {
            layoutClasses += this.props.loadingClass ? ' ' + this.props.loadingClass : ' ' + styles.loadingBtn;
            return (
                <a type="button" className={layoutClasses} onClick={this.onActionClick}>

                    <div style={{
                        "textAlign": "center", float: "left", position: "relative", width: "40%", "paddingRight": "10px"
                    }}>
                        <PulseLoader
                            // css={override}
                            sizeUnit={"px"}
                            size={this.props.loaderSize || 8}
                            color={this.props.loaderColor || '#36ffb1'}
                            loading={true}
                        />
                    </div>

                    <div style={{"textAlign": "center", float: "right", position: "relative", width: "auto"}}>
                        {_textOptions.loading}
                    </div>
                </a>
            )

        } else if (this.state.status === 'done') {
            this.attachListener();
            layoutClasses += this.props.doneClass ? ' ' + this.props.doneClass : ' ' + styles.doneBtn;
            return (
                <a type="button" className={layoutClasses} onClick={this.onActionClick} tabIndex={"0"}>
                    <div style={{"textAlign": "center", float: "right", position: "relative", width: "auto"}}>
                        {_textOptions.done}
                    </div>
                </a>
            )
        }

    }
}