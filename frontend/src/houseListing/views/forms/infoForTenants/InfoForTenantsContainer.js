import React, {Component} from 'react';
import {House} from "../../../models";
import {getHouseData, patchHouseData} from "../../../services";

import commonStyles from "../FormCommon.css"
import {displayErrors} from "core/UIComponents/helpers";


export default class InfoForTenantsContainer extends Component {
    formID = 7;

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                data: new House({}, 'empty'),
            };
        } else {
            this.state = {
                data: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Information for Guests");

        if (this.state.data.status === 'empty') {
            // Fetch house details
            getHouseData(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            data: result,
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
        this.props.cache.updateStoreObject('mainData', () => this.state.data);
        this.props.navContext.data.unloadForm();
    }

    onFieldChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            data: prevState.data.setData(field, value)
        }));
        this.props.navContext.data.updateCurrentFormState('hasChanged');
        this.props.navContext.sync();
    };

    onSave = (e) => {
        e.stopPropagation();
        const that = this;
        return new Promise(function (resolve, reject) {
            patchHouseData(that.props.houseUUID, that.state.data)
                .then(house => {
                    that.setState(prevState => ({
                        ...prevState,
                        data: house
                    }));
                    that.props.navContext.data.updateFormState(that.formID, 'saved');
                    that.props.navContext.sync();
                    resolve(house);
                })
                .catch(house => {
                    that.props.navContext.data.updateFormState(that.formID, 'error');
                    that.props.navContext.sync();
                    reject()
                })
        })
    };

    render() {
        return (
            <React.Fragment>
                <div id="form-7" className="form-series">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle} style={{marginBottom: '20px'}}>What is your home like?</h1>
                            <div className="black-textarea">
                                <div className="row">
                                    <div className="col-md-9 col-lg-9 col-xl-6">
                                        <div className="textarea">
                                            <textarea name="main-form-description" rows="10" cols="40"
                                                      className="form-control" id="id_main-form-description"
                                                      placeholder="Describe your house for guests."
                                                      value={this.state.data.getData('description')}
                                                      onChange={(e) => this.onFieldChange('description', e.target.value)}
                                            />
                                            {displayErrors(this.state.data.getErrorsForField('description'))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 className={commonStyles.pageTitle} style={{marginBottom: '20px'}}>Are there other people living in the
                                house ?</h1>
                            <div className="black-textarea">
                                <p>If Yes, What are they like ?</p>
                                <div className="row">
                                    <div className="col-md-9 col-lg-9 col-xl-6">
                                        <div className="textarea">
                                            <textarea name="main-form-other_people_description" rows="6" cols="40"
                                                      className="form-control"
                                                      id="id_main-form-other_people_description"
                                                      placeholder="Examples -&#10;Who are they?&#10;What are they like?&#10;How old are they?&#10;What do they do?"
                                                      value={this.state.data.getData('otherPeopleDescription')}
                                                      onChange={(e) => this.onFieldChange('otherPeopleDescription', e.target.value)}
                                            />
                                            {displayErrors(this.state.data.getErrorsForField('otherPeopleDescription'))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 className={commonStyles.pageTitle} style={{marginBottom: '20px'}}>Are there any area restrictions for the
                                tenant?</h1>
                            <div className="black-textarea">
                                <div className="row">
                                    <div className="col-md-9 col-lg-9 col-xl-6">
                                        <div className="textarea">
                                            <textarea name="main-form-access_restrictions" rows="9" cols="40"
                                                      className="form-control" id="id_main-form-access_restrictions"
                                                      placeholder="Examples -&#10;No acgetErrorcess upstairs.&#10;No access to the garden outside.&#10;No access to the granny flat.&#10;Only assigned bathroom will be accessible.&#10;No access to farm animal without permission."
                                                      value={this.state.data.getData('accessRestrictions')}
                                                      onChange={(e) => this.onFieldChange('accessRestrictions', e.target.value)}
                                            />
                                            {displayErrors(this.state.data.getErrorsForField('accessRestrictions'))}
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