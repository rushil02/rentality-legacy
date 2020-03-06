import { PostalCodeSearchModel } from "./models";
import axios, { handleError } from "core/utils/serviceHelper";
import routes from "routes";
import { reverse } from "named-urls";

export function getPostalCodeSuggestions(value) {
    return new Promise(function(resolve, reject) {
        // var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        axios
            .get(reverse(routes.search.location), {
                params: { location: value }
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(handleError(error));
            });
    });
}

export function getFilteredHouses(params) {
    // var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return new Promise(function(resolve, reject) {
        axios
            .get(reverse(routes.search.house), {
                params: params
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(handleError(error));
            });
    });
}
