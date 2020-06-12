import axios, {handleError} from "core/utils/serviceHelper";
import routes from "routes";
import {reverse} from "named-urls";

export function getFilteredHouses(params) {
    // var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.search.house), {
                params: params,
            })
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}
