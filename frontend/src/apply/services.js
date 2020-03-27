import axios, { handleError } from "core/utils/serviceHelper";
import { reverse } from "named-urls";
import routes from "routes";
import { UserPII } from "../userAccount/models";

export function getHouseData(houseUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .get(reverse(routes.apply.houseDetails, { houseUUID: houseUUID }))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getHomeOwnerDetails(houseUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .get(
                reverse(routes.apply.homeOwnerDetails, { houseUUID: houseUUID })
            )
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getAvailableDates(houseUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .get(reverse(routes.apply.availableDates, { houseUUID: houseUUID }))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getUnavailableDates(houseUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .get(
                reverse(routes.apply.unavailableDates, { houseUUID: houseUUID })
            )
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function applyBooking(houseUUID, data) {
    return new Promise(function(resolve, reject) {
        axios
            .post(
                reverse(routes.apply.applyBooking, { houseUUID: houseUUID }),
                data.serialize()
            )
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(handleError(error));
            });
    });
}

export function confirmBooking(houseUUID, applicationUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .post(
                reverse(routes.apply.confirmBooking, {
                    houseUUID: houseUUID,
                    applicationUUID: applicationUUID
                })
            )
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(handleError(error));
            });
    });
}

export function getApplicantData() {
    return new Promise(function(resolve, reject) {
        axios
            .get(reverse(routes.user.profile))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getBookingData(applicationUUID) {
    return new Promise(function(resolve, reject) {
        axios
            .get(
                reverse(routes.apply.bookingDetails, {
                    applicationUUID: applicationUUID
                })
            )
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
