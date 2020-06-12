import axios from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import routes from "routes";

export function getSystemMessages() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.sys.messages))
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
