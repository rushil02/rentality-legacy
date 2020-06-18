import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import {APIRoutes} from "components/routes"
import { alertUser } from "core/alert/Alert"
import {
    Availability,
    House,
    FormOptions,
    Facility,
    Rule,
    Image,
    CancellationPolicy,
    NeighbourhoodDescriptor,
    WelcomeTag,
} from "./models"
import { APIModelListAdapter } from "core/utils/ModelHelper"

export function verifyUserCanStartListing() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.userCanList))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getHouseData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.detail, { houseUUID: houseUUID }), {})
            .then(result => {
                resolve(new House(result.data))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function postHouseData(data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.create), data.serialize())
            .then(result => {
                resolve(new House(result.data))
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseError(error.response.data))
                }
            })
    })
}

export function patchHouseData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .patch(reverse(APIRoutes.house.edit, { houseUUID: houseUUID }), data.serialize("__partial__"))
            .then(result => {
                resolve(new House(result.data))
            })
            .catch(error => {
                reject(data.parseError(error.response.data))
            })
    })
}

export function deleteHouse(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .delete(reverse(APIRoutes.house.edit, { houseUUID: houseUUID }))
            .then(res => {
                resolve()
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function activateHouse(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.activate, { houseUUID: houseUUID }))
            .then(res => {
                resolve()
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function deactivateHouse(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.deactivate, { houseUUID: houseUUID }))
            .then(res => {
                resolve()
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getFormOptions() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.formOptions), {})
            .then(result => {
                resolve(new FormOptions(result.data))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getFacilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.facilities, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Facility, "id"))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function postFacilityData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.facilities, { houseUUID: houseUUID }), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Facility, "id"))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getAvailabilityData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.availability.list, { houseUUID: houseUUID }))
            .then(result => {
                let ret = {}
                result.data.forEach(dbObj => {
                    ret[dbObj.id] = new Availability(dbObj)
                })
                resolve(ret)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

// FIXME: Migrate Availability code to new services/model paradigm for Lists
export function postAvailabilityData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.availability.create, { houseUUID: houseUUID }), data)
            .then(result => {
                resolve(new Availability(result.data))
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

export function putAvailabilityData(houseUUID, objID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .put(reverse(APIRoutes.house.availability.update, { houseUUID: houseUUID, objID: objID }), data)
            .then(result => {
                resolve(new Availability(result.data))
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

export function deleteAvailabilityData(houseUUID, objID) {
    return new Promise(function (resolve, reject) {
        axios
            .delete(reverse(APIRoutes.house.availability.remove, { houseUUID: houseUUID, objID: objID }))
            .then(result => {
                resolve()
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

export function getRulesData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.rules.list, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Rule, "id"))
            })
            .catch(error => {
                handleError(error)
            })
    })
}

export function postRulesData(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.rules.update, { houseUUID: houseUUID }), data.serialize(true))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseErrors(error.response.data, true))
                }
            })
    })
}

export function getImagesData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.image.list, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, Image, "uuid"))
            })
            .catch(error => {
                handleError(error)
            })
    })
}

export function postImagesFiles(houseUUID, data, progressTracker) {
    let config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
    return new Promise(function (resolve, reject) {
        let formData = new FormData()
        formData.append("image", data)
        axios
            .post(reverse(APIRoutes.house.image.upload, { houseUUID: houseUUID }), formData, config)
            .then(result => {
                resolve(new Image(result.data))
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    alertUser.init({ message: error.response.data.image, alertType: "danger", autoHide: true })
                }
            })
    })
}

export function updateImageData(houseUUID, imageUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .patch(
                reverse(APIRoutes.house.image.update, {
                    houseUUID: houseUUID,
                    imageUUID: imageUUID,
                }),
                data.serialize(["isThumbnail"])
            )
            .then(result => {
                resolve(new Image(result.data))
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(data.parseError(error.response.data))
                }
            })
    })
}

export function deleteImage(houseUUID, imageUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .delete(reverse(APIRoutes.house.image.update, { houseUUID: houseUUID, imageUUID: imageUUID }))
            .then(result => {
                if (Object.entries(result.data).length > 0) {
                    resolve(new Image(result.data))
                } else {
                    resolve()
                }
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    reject(handleError(error).error)
                }
            })
    })
}

export function getCancellationPolicies(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.canPol.list, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, CancellationPolicy, "id"))
            })
            .catch(error => {
                handleError(error)
            })
    })
}

export function postCancellationPolicy(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.canPol.update, { houseUUID: houseUUID }), data.serialize(["objID"]))
            .then(result => {
                resolve()
            })
            .catch(error => {
                reject(handleError(error))
            })
    })
}

export function getNeighbourhoodDescriptors(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.neighbourhoodDescriptors, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, NeighbourhoodDescriptor, "id"))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function postNeighbourhoodDescriptors(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.neighbourhoodDescriptors, { houseUUID: houseUUID }), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, NeighbourhoodDescriptor, "id"))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getWelcomeTags(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.welcomeTags, { houseUUID: houseUUID }))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, WelcomeTag, "id"))
            })
            .catch(error => {
                reject(handleError(error))
            })
    })
}

export function postWelcomeTags(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.welcomeTags, { houseUUID: houseUUID }), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, WelcomeTag, "id"))
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function checkHousePayoutInfo(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.checkPayoutDetails, { houseUUID: houseUUID }))
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function createPaymentInfo(pgCode, houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.createPaymentInfo, { pgCode: pgCode, houseUUID: houseUUID }), data)
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function updatePaymentInfo(pgCode, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.updatePaymentInfo, { pgCode: pgCode }), data)
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getAddUpdateBankAccount(pgCode) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.addUpdateBankAccount, { pgCode: pgCode }))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function postAddUpdateBankAccount(pgCode, data) {
    return new Promise(function (resolve, reject) {
        axios
            .post(reverse(APIRoutes.house.addUpdateBankAccount, { pgCode: pgCode }), data)
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}
