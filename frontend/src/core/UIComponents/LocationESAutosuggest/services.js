import axios, {handleError} from "core/utils/serviceHelper";
import routes from "routes";
import {reverse} from "named-urls";

export function getLocationSuggestions(value) {
    return new Promise(function (resolve, reject) {
        // var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        axios
            .get(reverse(routes.autoSuggest.location), {
                params: {location: value},
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}
