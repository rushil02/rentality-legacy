import axios, {handleError} from "core/utils/serviceHelper"
import {reverse} from "named-urls"
import {APIRoutes} from "components/routes"


export function getHouseData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.apply.houseDetails, {houseUUID: houseUUID}))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getHomeOwnerDetails(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.apply.homeOwnerDetails, {houseUUID: houseUUID}))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getAvailableDates(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.apply.availableDates, {houseUUID: houseUUID}))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getUnavailableDates(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.apply.unavailableDates, {houseUUID: houseUUID}))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function applyBooking(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(APIRoutes.apply.applyBooking, {houseUUID: houseUUID}), data.serialize())
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(handleError(error))
            })
    })
}

export function confirmBooking(houseUUID, applicationUUID) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(APIRoutes.apply.confirmBooking, {
                houseUUID: houseUUID,
                applicationUUID: applicationUUID,
            })
        )
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(handleError(error))
            })
    })
}

export function getApplicantData() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(APIRoutes.user.profile))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                if (error.response.status !== 403) {
                    handleError(error)
                }
            })
    })
}

export function getBookingData(applicationUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(APIRoutes.apply.bookingDetails, {applicationUUID: applicationUUID}))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getFinancialData(houseUUID, bookingInfo) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(APIRoutes.apply.amountDetails, {houseUUID: houseUUID}), {params: bookingInfo.serialize()})
            .then(result => {
                console.log(result)
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error))
            })
    })
}
