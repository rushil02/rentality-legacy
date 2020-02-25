import axios, {handleError} from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import routes from "routes";

export function getHouseMinimalData(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.dashboard.houseMinimalDetails))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}