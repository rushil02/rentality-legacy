import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import {APIRoutes} from "components/routes"

export function getPostalCodeData(value) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.cities.postalCodeDetails, { objID: value }))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getPostalCodeSuggestions(value) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.cities.postalCodeSuggestions), { params: { query: value } })
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                console.log(error)
                reject(handleError(error).error)
            })
    })
}
