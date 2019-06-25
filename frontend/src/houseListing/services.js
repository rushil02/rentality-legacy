import axios, {handleError} from "core/utils/serviceHelper";
import {reverse} from 'named-urls';
import routes from "routes";
import {alertUser} from "core/alert/Alert";
import {
    Availability,
    House,
    FormOptions,
    Facility,
    Rule,
    Image,
    CancellationPolicy,
    NeighbourhoodDescriptor, WelcomeTag
} from "./models";
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
                if(handleError(error).badRequest) {
                    reject(data.parseError(error.response.data));
                }
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


export function postImagesFiles(houseUUID, data, progressTracker) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append('image', data);
        axios.post(reverse(routes.house.image.upload, {houseUUID: houseUUID}), formData, config)
            .then(result => {
                resolve(new Image(result.data));
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    alertUser.init({message: error.response.data.image, alertType: 'danger', autoHide: true});
                }
            });
    });

}

export function updateImageData(houseUUID, imageUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.patch(reverse(routes.house.image.update, {houseUUID: houseUUID, imageUUID: imageUUID}), data.serialize(['isThumbnail']))
            .then(result => {
                resolve(new Image(result.data));
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseError(error.response.data));
                }
            });
    });
}

export function deleteImage(houseUUID, imageUUID) {
    return new Promise(function (resolve, reject) {
        axios.delete(reverse(routes.house.image.update, {houseUUID: houseUUID, imageUUID: imageUUID}))
            .then(result => {
                if (Object.entries(result.data).length > 0) {
                    resolve(new Image(result.data));
                } else {
                    resolve()
                }
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseError(error.response.data));
                }
            });
    });
}

export function getCancellationPolicies(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.canPol.list, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, CancellationPolicy, 'id'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}


export function postCancellationPolicy(houseUUID, data) {
    console.log(data);
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.canPol.update, {houseUUID: houseUUID}), data.serialize(['objID']))
            .then(result => {
                resolve();
            })
            .catch(error => {
                reject(handleError(error))
            });
    });
}


export function getNeighbourhoodDescriptors(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.neighbourhoodDescriptors, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, NeighbourhoodDescriptor, 'id'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}

export function postNeighbourhoodDescriptors(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.neighbourhoodDescriptors, {houseUUID: houseUUID}), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, NeighbourhoodDescriptor, 'id'));
            })
            .catch(error => {
                reject(handleError(error).error);
            })
    })
}

export function getWelcomeTags(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.house.welcomeTags, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, WelcomeTag, 'id'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}

export function postWelcomeTags(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.house.welcomeTags, {houseUUID: houseUUID}), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, WelcomeTag, 'id'));
            })
            .catch(error => {
                reject(handleError(error).error);
            })
    })
}