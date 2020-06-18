import axios from "utils/ServiceHelper"
import { reverse } from "named-urls"
import {APIRoutes} from "components/routes"

export function getProfileData() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.user.userProfile))
            .then(result => {
                resolve(Object.assign(new UserProfile(), result.data))
            })
            .catch(result => {
                reject(result)
            })
    })
}
