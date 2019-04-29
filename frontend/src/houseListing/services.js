import $ from 'jquery';
import axios from "core/utils/serviceHelper";
import {reverse} from 'named-urls';
import routes from "routes";
import {alertUser} from "core/alert/Alert";
import {Availability, House, FormOptions} from "./models";


export function getHouseData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.detail, {houseUUID: houseUUID}), {})
            .then(result => {
                resolve(new House(result.data));
            })
            .catch(error => {
                alertUser.init({stockAlertType: 'generic'});
                reject(error);
            });
    });
}


export function getAvailabilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.availability.list, {houseUUID: houseUUID}), {})
            .then(result => {
                let ret = [];
                $.each(result.data, (index, dbObj) => {
                    ret.push(new Availability(dbObj))
                });
                resolve(ret);
            })
            .catch(error => {
                alertUser.init({stockAlertType: 'generic'});
                reject(error);
            });
    });
}


export function getFormOptions() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.formOptions), {})
            .then(result => {
                resolve(new FormOptions(result.data));
            }).catch(error => {
            alertUser.init({stockAlertType: 'generic'});
            reject(error)

        });

    });
}


export function getMockData(){
    // Mention type of data you are expecting to send in mocked API
    // Some Sample arg: {
    //      payloadArg: "value"
    // }

    // Return the data in the format you expect the API to work.
    return Promise.resolve({
        data: {
            foo: 'bar'
        }
    });
}
