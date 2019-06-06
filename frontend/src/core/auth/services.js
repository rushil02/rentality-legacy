import axios from "core/utils/serviceHelper";
import {reverse} from 'named-urls';
import routes from "routes";

import {User} from "./models";
import {alertUser} from "core/alert/Alert";


export function getUserNavDetails(houseUUID) {
    console.log("User Service");
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.userNavInfo), {})
            .then(result => {
                resolve(new User(result.data));
            })
            .catch(error => {
                if (error.response.status === 403) {
                    reject(error)
                } else {
                    alertUser.init({stockAlertType: 'generic'});
                }
            });
    });
}