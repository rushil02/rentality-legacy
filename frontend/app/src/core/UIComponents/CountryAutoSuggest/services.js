import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
import routes from "components/routes"

export function getCountryData(value) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.cities.countryDetails, { objID: value }))
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}

export function getCountrySuggestions(value) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.cities.countrySuggestions), { params: { query: value } })
            .then(result => {
                resolve(result.data)
            })
            .catch(error => {
                reject(handleError(error).error)
            })
    })
}
