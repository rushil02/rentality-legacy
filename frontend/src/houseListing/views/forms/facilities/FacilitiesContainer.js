import React, {Component} from 'react';
import {alertUser} from "core/alert/Alert";
import {getFacilityData, patchHouseData, postFacilityData, postHouseData} from "houseListing/services";
import {Facility, House} from "../../../models";
import "./Facilities.css";


export default class FacilitiesSelectorHandler extends Component {
    formID = 3;

    constructor(props) {
        super(props);
        if (props.cache.data === undefined) {
            this.state = {
                data: [],
            };
        } else {
            this.state = {
                data: props.cache.data,
            };
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, 'initial', "Facilities");
        this.props.navContext.sync();

        getFacilityData(this.props.houseUUID)
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

    };

    componentWillUnmount() {
        this.props.cache.updateStoreObject('facilitiesData', () => this.state.data);
        this.props.navContext.data.unloadForm();
    }


    onFacilityUpdate = (objID, value) => {
        this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    [objID]: prevState.data[objID].setData('checked', value)
                }
            })
        );
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged');
        this.props.navContext.sync();

    };

    onFacilityAdd = (text) => {
        this.setState(prevState => ({
                data: {
                    ...prevState.data,
                    [text]: new Facility({id: null, verbose: text, checked: true})
                }
            })
        );

        this.props.navContext.data.updateFormState(this.formID, 'hasChanged');
        this.props.navContext.sync();
    };


    onSave = (e) => {
        e.stopPropagation();
        const that = this;
        console.log("AJWEJOAEW");
        return new Promise(function (resolve, reject) {
            postFacilityData(that.props.houseUUID, that.state.data)
                .then(facilityList => {
                    that.setState({data:facilityList});
                    that.props.navContext.data.updateFormState(that.formID, 'saved');
                    that.props.navContext.sync();
                    resolve(facilityList);
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
                <div id="form-3">
                    <div className="row">
                        <div className="col-md-1"/>
                        <div className="col-md-10">
                            <h1 className="title">Select all the facilities you offer in the home</h1>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="checkbox">
                                        <ul className="list-inline" id="facilities-list">
                                            {Object.entries(this.state.data).map((data, i) =>
                                                <FacilitiesComponent data={data[1]} key={data[0].toString()}
                                                                     onChange={this.onFacilityUpdate}/>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="input big no-background">
                                                <input type="text" className="form-control anything-else"
                                                       id="other-facility-text"
                                                       value={this.props.addNewFacility}
                                                       ref={(input) => {
                                                           addField = input;
                                                       }}
                                                       placeholder="Add other facilities"/>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="default-button-style"
                                                    onClick={() => this.onFacilityAdd(addField.value)}
                                            > Add
                                            </button>
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


function FacilitiesComponent(props) {
    return (
        <li className="list-inline-item">
            <div className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    checked={props.data.getData('checked')}
                    id={`facility-checkbox-${props.data.getData('objID')}`}
                    onChange={(e) => {
                        props.onChange(props.data.getData('objID'), e.target.checked)
                    }}
                />
                <label className="custom-control-label" htmlFor={`facility-checkbox-${props.data.getData('objID')}`}>
                    {props.data.getData('verbose')}
                </label>
            </div>
        </li>
    )
}
