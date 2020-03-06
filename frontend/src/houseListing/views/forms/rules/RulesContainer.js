import React, {Component} from 'react';
import {getHouseData, getRulesData, patchHouseData, postFacilityData, postRulesData} from "houseListing/services";
import {RulesComponent} from "./RulesComponent";
import {House, Rule} from "../../../models";
import {APIModelListAdapter} from "../../../../core/utils/ModelHelper";


export default class RulesContainer extends Component {
    formID = 4;

    constructor(props) {
        super(props);
        this.state = {
            rules: new APIModelListAdapter([], Rule, 'id', 'empty'),
            house: new House({}, 'empty'),
        };

        if (props.cache.data !== undefined) {
            this.state.rules = props.cache.data;
        }
        if (props.mainDataCache.data !== undefined) {
            this.state.house = props.mainDataCache.data;
        }
    }

    componentDidMount() {
        // Since we have multiple APIs, we can exploit composite formStates
        this.props.navContext.data.loadForm(this.formID, this.onSave, ['initial', 'initial'], "Rules");
        if (this.state.rules.status === 'empty') {
            getRulesData(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            rules: result,
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, this.state.rules.status, 0);
                    this.props.navContext.sync();
                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.rules.status, 0);
        }

        if (this.state.house.status === 'empty') {
            // Fetch house details
            getHouseData(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            house: result,
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, this.state.house.status, 1);
                    this.props.navContext.sync();
                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.house.status, 1);
        }
        this.props.navContext.sync();
    };

    componentWillUnmount() {
        this.props.cache.updateStoreObject('rulesData', () => this.state.rules);
        this.props.cache.updateStoreObject('mainData', () => this.state.house);
        this.props.navContext.data.unloadForm();
    }

    onOptionChange = (objID, value) => {
        this.setState(prevState => ({
                ...prevState,
                rules: prevState.rules.updateObject(objID, 'selected', value)
            })
        );
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 0);
        this.props.navContext.sync();
    };

    onCommentChange = (objID, value) => {
        this.setState(prevState => ({
                ...prevState,
                rules: prevState.rules.updateObject(objID, 'comment', value)
            })
        );
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 0);
        this.props.navContext.sync();
    };

    onOtherRulesChange = (value) => {
        this.setState(prevState => ({
            ...prevState,
            house: prevState.house.setData('otherRules', value)
        }));
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 1);
        this.props.navContext.sync();
    };

    onSave = (e) => {
        e.stopPropagation();
        const that = this;
        return new Promise((resolve, reject) => {
            let req1Done = false;
            let req2Done = false;

            postRulesData(that.props.houseUUID, that.state.rules)
                .then(result => {
                    that.setState(prevState => (
                        {
                            ...prevState,
                            rules: prevState.rules.updateStatus('saved'),
                        })
                    );
                    req1Done = true;
                    that.props.navContext.data.updateFormState(that.formID, 'saved', 0);
                    that.props.navContext.sync();
                    if (req1Done && req2Done) {
                        if (that.props.navContext.data.getCurrentFormState() === 'error') {
                            reject()
                        } else {
                            resolve()
                        }
                    }
                })
                .catch(errorData => {
                    req1Done = true;
                    that.props.navContext.data.updateFormState(that.formID, 'error', 0);
                    that.props.navContext.sync();
                    if (req1Done && req2Done) {
                        reject()
                    }
                });

            patchHouseData(that.props.houseUUID, that.state.house)
                .then(house => {
                    that.setState(prevState => (
                        {
                            ...prevState,
                            house: house,
                        })
                    );
                    req2Done = true;
                    that.props.navContext.data.updateFormState(that.formID, 'saved', 1);
                    that.props.navContext.sync();
                   if (req1Done && req2Done) {
                        if (that.props.navContext.data.getCurrentFormState() === 'error') {
                            reject()
                        } else {
                            resolve()
                        }
                    }
                })
                .catch(error => {
                    req2Done = true;
                    that.props.navContext.data.updateFormState(that.formID, 'error', 1);
                    that.props.navContext.sync();
                    if (req1Done && req2Done) {
                        reject()
                    }
                })

        })
    };

    render() {
        return (
            <RulesComponent
                data={this.state.rules.getObjectList()}
                otherRules={this.state.house.getData('otherRules')}
                onOtherRulesChange={this.onOtherRulesChange}
                onCommentChange={this.onCommentChange}
                onOptionChange={this.onOptionChange}
            />
        )
    }
}