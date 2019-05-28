import $ from 'jquery';
import axios from "core/utils/serviceHelper";
import {reverse} from 'named-urls';
import routes from "routes";
import {alertUser} from "core/alert/Alert";
import {Availability, House, FormOptions, Facility} from "./models";


export function getHouseData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.detail, {houseUUID: houseUUID}), {})
            .then(result => {
                resolve(new House(result.data));
            })
            .catch(error => {
                reject(error);
            });
    });
}


export function postHouseData(data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.create), data.serialize())
            .then(result => {
                resolve(new House(result.data));
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

export function patchHouseData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.patch(reverse(routes.house.edit, {houseUUID: houseUUID}), data.serialize('__partial__'))
            .then(result => {
                resolve(new House(result.data));
            })
            .catch(error => {
                reject(error.response);
            });
    });
}


export function getFormOptions() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.formOptions), {})
            .then(result => {
                resolve(new FormOptions(result.data));
            }).catch(error => {
            reject(error)

        });

    });
}


export function getFacilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.facilities, {houseUUID: houseUUID}))
            .then(result => {
                let ret = {};
                $.each(result.data, (index, dbObj) => {
                    ret[dbObj.id] = new Facility(dbObj);
                });
                resolve(ret);
            })
            .catch(error => {
                reject(error);
            })
    })
}


export function postFacilityData(houseUUID, data) {
    let respData = [];
    Object.values(data).map((item, i) => {
        console.log(item);
        respData.push(item.serialize())
    });

    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.facilities, {houseUUID: houseUUID}), respData)
            .then(result => {
                let ret = [];
                $.each(result.data, (index, dbObj) => {
                    ret.push(new Facility(dbObj));
                });
                resolve(ret);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export function getPostalCodeData(value) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.cities.postalCodeDetails, {objID: value}))
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}

export function getPostalCodeSuggestions(value) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.cities.postalCodeSuggestions), {params: {query: value}})
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            })
    })
}


export function getAvailabilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.availability.list, {houseUUID: houseUUID}))
            .then(result => {
                let ret = {};
                $.each(result.data, (index, dbObj) => {
                    ret[dbObj.id] = new Availability(dbObj);
                });
                resolve(ret);
            })
            .catch(error => {
                reject(error);
            });
    });
}


export function postAvailabilityData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.availability.create, {houseUUID: houseUUID}), data)
            .then(result => {
                resolve(new Availability(result.data));
            })
            .catch(error => {
                reject(error.response);
            });
    });
}


export function putAvailabilityData(houseUUID, objID, data) {
    return new Promise(function (resolve, reject) {
        axios.put(reverse(routes.house.availability.update, {houseUUID: houseUUID, objID: objID}), data)
            .then(result => {
                resolve(new Availability(result.data));
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

export function deleteAvailabilityData(houseUUID, objID) {
    return new Promise(function (resolve, reject) {
        axios.delete(reverse(routes.house.availability.remove, {houseUUID: houseUUID, objID: objID}))
            .then(result => {
                resolve();
            })
            .catch(error => {
                reject(error.response);
            });
    });
}