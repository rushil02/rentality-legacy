import axios, {handleError} from "core/utils/serviceHelper";
import {reverse} from "named-urls";
import routes from "components/routes";

export function getRecommendedHouses() {
    return new Promise(function (resolve, reject) {
        axios
            .get(reverse(routes.welcome.recommendedHouses))
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(handleError(error));
            });
    });
}
