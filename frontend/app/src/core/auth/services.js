import axios  from "core/utils/serviceHelper"
import {APIRoutes} from "components/routes";

import { User } from "./models"
import { alertUser } from "core/alert/Alert"

export function getUserNavDetails(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get(APIRoutes.userNavInfo, {})
            .then(result => {
                resolve(new User(result.data))
            })
            .catch(error => {
                if (error.response.status === 403) {
                    reject(error);
                } else {
                    alertUser.init({stockAlertType: "generic"});
                }
            })
    })
}
