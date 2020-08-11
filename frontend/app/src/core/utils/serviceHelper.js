import axios from "axios"
import { loadProgressBar } from 'axios-progress-bar'
import { alertUser } from "core/alert/Alert"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"
loadProgressBar()

export default axios

export function handleError(error) {
    // Generic handler to filter out all Errors except 400 - Bad Request, which should be handled by the view
    if (error.response) {
        if (error.response.status === 400) {
            return { badRequest: true, error: error }
        } else if (error.response.status === 401) {
            alertUser.init({ stockAlertType: "generic" })
        } else if (error.response.status === 404) {
            alertUser.init({ stockAlertType: "generic" })
        } else if (error.response.status === 406) {
            return { badRequest: true, error: error }
        } else {
            alertUser.init({ stockAlertType: "generic" })
        }
        return { badRequest: false, error: error }
    } else {
        alertUser.init({ stockAlertType: "connectionError" })
    }
}
