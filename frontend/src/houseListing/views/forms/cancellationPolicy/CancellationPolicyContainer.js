import React, {Component} from 'react';
import {reverse} from 'named-urls';
import routes from "routes";
import {APIModelListAdapter} from "core/utils/ModelHelper";
import {CancellationPolicy, House, Rule} from "houseListing/models";
import {getCancellationPolicies, getHouseData, postCancellationPolicy} from "houseListing/services";

import styles from "./CancellationPolicy.css";
import commonStyles from "../FormCommon.css";


export default class CancellationPolicyContainer extends Component {
    formID = 6;

    constructor(props) {
        super(props);
        this.state = {
            data: new APIModelListAdapter([], CancellationPolicy, 'uuid', 'empty'),
            house: new House({}, 'empty'),
        };

        if (props.cache.data !== undefined) {
            this.state.data = props.cache.data;
        }
        if (props.mainDataCache.data !== undefined) {
            this.state.house = props.mainDataCache.data;
        }

    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'saved', "Cancellation Policy");
        this.props.navContext.sync();

        if (this.state.data.status === 'empty') {
            this.sync()
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
                });
        }

    };

    sync = () => {
        getCancellationPolicies(this.props.houseUUID)
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        data: result,
                    })
                );
            });
    };

    onPolicyUpdate = (obj) => {
        const that = this;
        postCancellationPolicy(that.props.houseUUID, obj)
            .then(() => {
                that.setState(prevState => (
                    {
                        ...prevState,
                        house: prevState.house._silentUpdate('cancellationPolicyID', obj.getData('objID')),
                    })
                );
                that.props.navContext.data.updateFormState(that.formID, 'saved');
                that.props.navContext.sync();
            })
            .catch(error => {
                that.props.navContext.data.updateFormState(that.formID, 'error');
                that.props.navContext.sync();
            });
    };


    componentWillUnmount() {
        this.props.cache.updateStoreObject('mainData', () => this.state.house);
        this.props.cache.updateStoreObject('canPolicyData', () => this.state.data);
        this.props.navContext.data.unloadForm();
    }


    onSave = (e) => {
        e.stopPropagation();
        return new Promise(function (resolve, reject) {
            resolve()
        })
    };

    render() {
        return (
            <React.Fragment>
                <div id="form-3">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <h1 className={commonStyles.pageTitle}>Which Cancellation Policy would you like to opt
                                for?</h1>
                            <div className="paragraph">
                                {Object.entries(this.state.data.getList()).map((item) =>
                                    <CancellationPolicyComponent
                                        data={item[1]} key={item[0].toString()}
                                        onChange={this.onPolicyUpdate} objRef={item[0]}
                                        isSelected={this.state.house.getData('cancellationPolicyID') === item[1].getData('objID')}
                                    />
                                )}
                            </div>
                            <div className="col-md-1"/>
                            <div className="col-md-12" style={{marginTop: "50px"}}>
                                <p><b>Please note: The tenant is allowed to cancel the booking without penalty within 24
                                    hours of the
                                    booking being approved by the homeowner. (As required by legislation)</b></p>
                            </div>

                        </div>
                        <div className="col-md-1"/>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}


function CancellationPolicyComponent(props) {
    return (
        <React.Fragment>
            <div className="checkbox auto-width">
                <ul className="list-inline">
                    <li className="list-inline-item" style={{marginBottom: "0"}}>
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" id={`checkbox-${props.objRef}`} className="custom-control-input"
                                   onChange={(e) => props.isSelected ? e.preventDefault() : props.onChange(props.data)}
                                   checked={props.isSelected}/>
                            <label className="custom-control-label" style={{fontWeight: '700', color: '#000000'}}
                                   htmlFor={`checkbox-${props.objRef}`}>{props.data.getData('verbose')}</label>
                        </div>
                    </li>
                </ul>
            </div>

            <p className={styles.description}>{props.data.getData('description')}</p>
            <div className={styles.moreInfo}>
                <a className={styles.moreInfoLink} target="_blank"
                   href={props.data.getData('officialPolicy') ? props.data.getData('officialPolicy') : reverse(routes.howItWorks)}>More
                    Information</a>
            </div>
        </React.Fragment>
    )
}