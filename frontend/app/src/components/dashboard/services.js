import axios, {handleError} from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import routes from "components/routes";

export function getPublishedHouses() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.dashboard.publishedHouses))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getBookingsData() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.dashboard.bookingsData))
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}