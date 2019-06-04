import axios, {handleError} from "core/utils/serviceHelper";
import {reverse} from 'named-urls';
import routes from "routes";
import {alertUser} from "core/alert/Alert";
import {Availability, House, FormOptions, Facility, Rule, Image} from "./models";
import {APIModelListAdapter} from "../core/utils/ModelHelper";


export function getHouseData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.detail, {houseUUID: houseUUID}), {})
            .then(result => {
                resolve(new House(result.data));
            })
            .catch(error => {
                reject(handleError(error).error);
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
                reject(data.parseError(error.response.data));
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
                reject(data.parseError(error.response.data));
            });
    });
}


export function getFormOptions() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.formOptions), {})
            .then(result => {
                resolve(new FormOptions(result.data));
            }).catch(error => {
                reject(handleError(error).error);
        });

    });
}


export function getFacilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.facilities, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Facility, 'id'));
            })
            .catch(error => {
                reject(handleError(error).error);
            })
    })
}


export function postFacilityData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.facilities, {houseUUID: houseUUID}), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Facility, 'id'));
            })
            .catch(error => {
                reject(handleError(error).error);
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
                reject(handleError(error).error);
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
                reject(handleError(error).error);
            })
    })
}


export function getAvailabilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.availability.list, {houseUUID: houseUUID}))
            .then(result => {
                let ret = {};
                result.data.map((dbObj) => {
                    ret[dbObj.id] = new Availability(dbObj);
                });
                resolve(ret);
            })
            .catch(error => {
                handleError(error)
            });
    });
}


// FIXME: Migrate Availability code to new services/model paradigm for Lists
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


export function getRulesData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.rules.list, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Rule, 'id'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}


export function postRulesData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.rules.update, {houseUUID: houseUUID}), data.serialize(true))
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseErrors(error.response.data, true));
                }
            });
    });
}


export function getImagesData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.image.list, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Image, 'uuid'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}
