import React, {Component} from 'react';
import {APIModelListAdapter} from "../../../../core/utils/ModelHelper";
import {House, NeighbourhoodDescriptor} from "../../../models";
import {getHouseData, getNeighbourhoodDescriptors, patchHouseData, postNeighbourhoodDescriptors} from "../../../services";
import {NeighborhoodDescriptorsComponent} from "./NeighbourhoodDescriptorsComponent";


export default class NeighbourhoodDescriptorsContainer extends Component {
    formID = 8;

    constructor(props) {
        super(props);

        this.state = {
            descriptors: new APIModelListAdapter([], NeighbourhoodDescriptor, 'id', 'empty'),
            house: new House({}, 'empty'),
        };
        if (props.cache.data !== undefined) {
            this.state.descriptors = props.cache.data;
        }
        if (props.mainDataCache.data !== undefined) {
            this.state.house = props.mainDataCache.data;
        }
    }

    componentDidMount() {
        this.props.navContext.data.loadForm(this.formID, this.onSave, ['initial', 'initial'], "Neighbourhood");
        if (this.state.descriptors.status === 'empty') {
            getNeighbourhoodDescriptors(this.props.houseUUID)
                .then(result => {
                    this.setState(prevState => (
                        {
                            ...prevState,
                            descriptors: result,
                        })
                    );
                    this.props.navContext.data.updateFormState(this.formID, this.state.descriptors.status, 0);
                    this.props.navContext.sync();
                });
        } else {
            this.props.navContext.data.updateFormState(this.formID, this.state.descriptors.status, 0);
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
    }

    componentWillUnmount() {
        this.props.cache.updateStoreObject('neighborhoodDescriptorsData', () => this.state.descriptors);
        this.props.cache.updateStoreObject('mainData', () => this.state.house);
        this.props.navContext.data.unloadForm();
    }

    onOtherDescriptionChange = (value) => {
        this.setState(prevState => ({
            ...prevState,
            house: prevState.house.setData('neighbourhoodDescription', value)
        }));
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 1);
        this.props.navContext.sync();
    };

    onNBDescriptorAdd = (input) => {
        let text = input.value;
        if (text !== "") {
            this.setState(prevState => ({
                    descriptors: prevState.descriptors.update(new NeighbourhoodDescriptor({id: null, verbose: text, checked: true}, 'hasChanged'), text)
                })
            );

            input.value = "";

            this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 0);
            this.props.navContext.sync();
        }
        input.focus();

    };

    onNBDescriptorUpdate = (objID, value) => {
        this.setState(prevState => ({
                ...prevState,
                data: prevState.descriptors.updateObject(objID, 'checked', value)
            })
        );
        this.props.navContext.data.updateFormState(this.formID, 'hasChanged', 0);
        this.props.navContext.sync();
    };

    onSave = (e) => {
         e.stopPropagation();
        const that = this;
        return new Promise((resolve, reject) => {
            let req1Done = false;
            let req2Done = false;

            postNeighbourhoodDescriptors(that.props.houseUUID, that.state.descriptors)
                .then(result => {
                    that.setState(prevState => (
                        {
                            ...prevState,
                            rules: prevState.descriptors.updateStatus('saved'),
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
        return(
            <NeighborhoodDescriptorsComponent
                data={this.state.descriptors.getList()}
                otherDescription={this.state.house.getData('neighbourhoodDescription')}
                onOtherDescriptionChange={this.onOtherDescriptionChange}
                onNBDescriptorChange={this.onNBDescriptorUpdate}
                onNBDescriptorAdd = {this.onNBDescriptorAdd}
            />
        )
    }

}