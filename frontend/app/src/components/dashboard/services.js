import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import { APIRoutes } from "components/routes"

export function getPublishedHouses() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.dashboard.publishedHouses))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getBookingsData() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.dashboard.bookingsData))
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}
