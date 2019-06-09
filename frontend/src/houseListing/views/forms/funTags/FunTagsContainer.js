import React, {Component} from 'react';
import {alertUser} from "core/alert/Alert";
import {getPersonalityTags, postPersonalityTags} from "user/services";
import {PersonalityTag} from "user/models";

import {APIModelListAdapter} from "core/utils/ModelHelper";


export default class FunTagsContainer extends Component {
    formID = 10;

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                data: new APIModelListAdapter([], PersonalityTag, 'id', 'empty'),
            };
        } else {
            this.state = {
                data: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Fun Tags");
        if (this.state.data.status === 'empty') {
            getPersonalityTags(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            data: result
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, 'saved');
                    this.props.navContext.sync();
                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.data.status);

        }
        this.props.navContext.sync();

    };

    componentWillUnmount() {
        this.props.cache.updateStoreObject('personalityTagsData', () => this.state.data);
        this.props.navContext.data.unloadForm();
    }


    onTagUpdate = (objID, value) => {
        this.setState(prevState => ({
                ...prevState,
                data: prevState.data.updateObject(objID, 'checked', value)
            })
        );
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged');
        this.props.navContext.sync();
    };

    onTagAdd = (input) => {
        let text = input.value.replace('#', '');
        if (text !== "") {
            this.setState(prevState => ({
                    data: prevState.data.update(new PersonalityTag({
                        id: null,
                        verbose: text,
                        checked: true
                    }, 'hasChanged'), text)
                })
            );

            input.value = "#";

            this.props.navContext.data.updateFormState(this.formID, 'hasChanged');
            this.props.navContext.sync();
        }
        input.focus();

    };


    onSave = (e) => {
        const that = this;
        e.stopPropagation();
        return new Promise((resolve, reject) => {
            postPersonalityTags(that.props.houseUUID, that.state.data)
                .then(tagList => {
                    that.setState({data: tagList});
                    that.props.navContext.data.updateFormState(that.formID, 'saved');
                    that.props.navContext.sync();
                    resolve(tagList);
                })
                .catch(error => {
                    alertUser.init({stockAlertType: 'unknownError'});
                    that.props.navContext.data.updateFormState(that.formID, 'error');
                    that.props.navContext.sync();
                    reject(error)
                })
        })


    };


    render() {
        let addField;
        return (
            <React.Fragment>
                <div id="form-10">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <h1 className="title">Select the hashtag that best describes you or your hobbies</h1>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="selection">
                                        <div className="btn-group btn-group-toggle">
                                            {Object.entries(this.state.data.getList()).map((data) =>
                                                <PersonalityTagCheckbox
                                                    data={data[1]} key={data[0].toString()}
                                                    onChange={this.onTagUpdate}
                                                    objReference={data[0]}
                                                />
                                            )}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <div className="input big no-background">
                                                    <input type="text" className="form-control anything-else"
                                                           ref={(input) => {
                                                               addField = input;
                                                           }}
                                                           onKeyPress={(e) => {
                                                               if (e.key === 'Enter') {
                                                                   this.onTagAdd(addField)
                                                               }
                                                           }}
                                                           defaultValue="#"
                                                           placeholder="Add other Tags"/>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <button type="submit" className="default-button-style"
                                                        onClick={() => this.onTagAdd(addField)}
                                                > Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


function PersonalityTagCheckbox(props) {
    return (
        <label className={"btn btn-link" + (props.data.getData('checked') ? " active" : "")}>
            <input type="checkbox" onChange={(e) => {
                props.onChange(props.objReference, e.target.checked)
            }} checked={props.data.getData('checked')}
            />
            {`#${props.data.getData('verbose')}`}
        </label>
    )
}
