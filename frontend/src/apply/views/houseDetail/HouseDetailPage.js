import React, {Component} from 'react';
import {applyBooking, getApplicantData, getHomeOwnerDetails, getHouseData} from "apply/services";
import {House, Image, CancellationPolicy, HomeOwnerInfo, Application} from "apply/models";
import HouseDetailPageComponent from "./HouseDetailPageComponent";
import {APIModelListAdapter, PostalLocation} from "core/utils/ModelHelper";
import RequestErrorBoundary from "core/errorHelpers/RequestErrorBoundary";


export default class HouseDetailPage extends Component {
    /**
     * Loading is tracked only for house information.
     * @param props - contains routerProps
     */
    constructor(props) {
        super(props);
        this.houseUUID = props.routerProps.match.params.houseUUID;
        this.state = {
            status: 'loading',
            house: new House({}, 'empty'),
            images: new APIModelListAdapter([], Image, 'uuid', 'empty'),
            cancellationPolicy: new CancellationPolicy({}, 'empty'),
            location: new PostalLocation({}, 'empty'),
            homeOwnerInfo: new HomeOwnerInfo({}, 'empty'),
            application: new Application({}, 'empty'),
        }
    }

    componentDidMount() {
        this.setState(prevState => ({status: 'loading'}));
        getHouseData(this.houseUUID)
            .then(result => {
                this.setState(prevState => (
                    {
                        ...prevState,
                        status: 'done',
                        house: new House(result),
                        images: new APIModelListAdapter(result['images'], Image, 'uuid', 'saved'),
                        cancellationPolicy: new CancellationPolicy(result['cancellation_policy'], 'saved'),
                        location: new PostalLocation(result['location'], 'saved')
                    })
                );
            })
            .catch(error => {
                this.setState(prevState => ({...prevState, status: 'error'}))
            });

        getHomeOwnerDetails(this.houseUUID)
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    homeOwnerInfo: new HomeOwnerInfo(result, 'saved'),
                }))
            })
            .catch(error => {
                this.setState(prevState => ({...prevState, status: 'error'}))
            });

        getApplicantData()
            .then(result => {
                this.setState(prevState => ({
                    ...prevState,
                    application: prevState.application.bulkUpdate(result, 'DB'),
                }))
            })
    }

    handleDateChange = (startDate, endDate) => {
        this.setState(prevState => ({
            ...prevState,
            application: prevState.application.bulkUpdate({
                bookingStartDate: startDate,
                bookingEndDate: endDate
            }, 'int'),
        }))
    };

    handleApplicationChange = (field, value) => {
        this.setState(prevState => ({
            ...prevState,
            application: prevState.application.setData(field, value)
        }))
    };

    submitApplication = () => {
        let that = this;
        return new Promise(function (resolve, reject){
            applyBooking(that.houseUUID, that.state.application)
                .then(() => {
                    console.log("Submitted successfully");
                    resolve()
                })
                .catch(error => {
                    console.log("submission error", error);
                    reject()
                })
        })
    };

    render() {
        return (
            <RequestErrorBoundary status={this.state.status}>
                <HouseDetailPageComponent
                    handleDateChange={this.handleDateChange}
                    application={this.state.application}
                    handleApplicationChange={this.handleApplicationChange}
                    house={this.state.house}
                    images={this.state.images}
                    cancellationPolicy={this.state.cancellationPolicy}
                    location={this.state.location}
                    homeOwnerInfo={this.state.homeOwnerInfo}
                    onApply={this.submitApplication}
                />
            </RequestErrorBoundary>
        )
    }
}