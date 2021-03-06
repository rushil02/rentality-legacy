import axios from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import {APIRoutes} from "components/routes";

export function getSystemMessages() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(APIRoutes.sys.messages))
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
