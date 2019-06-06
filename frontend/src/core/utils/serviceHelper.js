import axios from "axios";
import {alertUser} from "../alert/Alert";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default axios;


export function handleError(error) {
    // Generic handler to filter out all Errors except 400 - Bad Request, which should be handled by the view
    if (error.response.status === 400) {
        return {badRequest: true, error: error}
    } else if (error.response.status === 401) {
        alertUser.init({stockAlertType: 'generic'});
    } else {
        alertUser.init({stockAlertType: 'generic'});
    }
    return {badRequest: false, error: error}
}