import React, { Component } from "react"
import { alertUser } from "components/alert/Alert"
import { getWelcomeTags, postWelcomeTags } from "components/houseListing/services"
import { WelcomeTag } from "components/houseListing/models"

import { APIModelListAdapter } from "core/utils/ModelHelper"
import commonStyles from "../FormCommon.module.css"

export default class WelcomeTagsContainer extends Component {
    formID = 11

    constructor(props) {
        super(props)
        if (props.cache.data === undefined) {
            this.state = {
                data: new APIModelListAdapter([], WelcomeTag, "id", "empty"),
            }
        } else {
            this.state = {
                data: props.cache.data,
            }
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, "initial", "Welcome Tags")
        if (this.state.data.status === "empty") {
            getWelcomeTags(this.props.houseUUID).then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    data: result,
                }))
                this.props.navContext.data.updateFormState(this.formID, "saved")
                this.props.navContext.sync()
            })
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status)
        }
        this.props.navContext.sync()
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject("welcomeTagsData", () => this.state.data)
        this.props.navContext.data.unloadForm()
    }

    onTagUpdate = (objID, value) => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState.data.updateObject(objID, "checked", value),
        }))
        this.props.navContext.data.updateFormState(this.formID, "hasChanged")
        this.props.navContext.sync()
    }

    onTagAdd = input => {
        let text = input.value
        if (text !== "") {
            this.setState(prevState => ({
                data: prevState.data.update(
                    new WelcomeTag(
                        {
                            id: null,
                            verbose: text,
                            checked: true,
                        },
                        "hasChanged"
                    ),
                    text
                ),
            }))

            input.value = ""

            this.props.navContext.data.updateFormState(this.formID, "hasChanged")
            this.props.navContext.sync()
        }
        input.focus()
    }

    onSave = e => {
        const that = this
        e.stopPropagation()
        return new Promise((resolve, reject) => {
            postWelcomeTags(that.props.houseUUID, that.state.data)
                .then(tagList => {
                    that.setState({ data: tagList })
                    that.props.navContext.data.updateFormState(that.formID, "saved")
                    that.props.navContext.sync()
                    resolve(tagList)
                })
                .catch(error => {
                    alertUser.init({ stockAlertType: "unknownError" })
                    that.props.navContext.data.updateFormState(that.formID, "error")
                    that.props.navContext.sync()
                    reject(error)
                })
        })
    }

    render() {
        let addField
        return (
            <React.Fragment>
                <div id="form-3">
                    <div className="row">
                        <div className="col-md-1" />
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle}>Select the groups that are welcome in your home</h1>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="checkbox">
                                        <ul className="list-inline" id="tags-list">
                                            {this.state.data.getObjectList().map(data => (
                                                <WelcomeTagCheckbox
                                                    data={data[1]}
                                                    key={data[0].toString()}
                                                    onChange={this.onTagUpdate}
                                                    objReference={data[0]}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="input big no-background">
                                                <input
                                                    type="text"
                                                    className="form-control anything-else"
                                                    id="other-tag-text"
                                                    ref={input => {
                                                        addField = input
                                                    }}
                                                    onKeyPress={e => {
                                                        if (e.key === "Enter") {
                                                            this.onTagAdd(addField)
                                                        }
                                                    }}
                                                    placeholder="Add other Tags"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button
                                                type="submit"
                                                className="default-button-style"
                                                onClick={() => this.onTagAdd(addField)}
                                            >
                                                {" "}
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1" />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function WelcomeTagCheckbox(props) {
    return (
        <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={props.data.getData("checked")}
                    id={`wt-checkbox-${props.objReference}`}
                    onChange={e => {
                        props.onChange(props.objReference, e.target.checked)
                    }}
                />
                <label className="custom-control-label" htmlFor={`wt-checkbox-${props.objReference}`}>
                    {props.data.getData("verbose")}
                </label>
            </div>
        </li>
    )
}
