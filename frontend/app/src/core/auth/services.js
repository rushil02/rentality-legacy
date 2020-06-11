import axios, { handleError } from "core/utils/serviceHelper"
import { reverse } from "named-urls"
// import routes from "routes";

import { User } from "./models"
import { alertUser } from "components/alert/Alert"

export function getUserNavDetails(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios
            .get("/api/user-nav-info", {})
            .then(result => {
                resolve(new User(result.data))
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 403) {
                    reject(error);
                } else {
                    alertUser.init({stockAlertType: "generic"});
                }
            })
    })
}
