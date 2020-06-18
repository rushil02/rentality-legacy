import axios, {handleError} from "core/utils/serviceHelper";
import {APIRoutes} from "components/routes";
import {reverse} from "named-urls";

export function getFilteredHouses(params) {
    // var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.search.house), {
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


export function getHouseFilterOptions(params) {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.house.filterOptions))
            .then((result) => {
                resolve(result.data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}