import axios, {handleError} from "../core/utils/serviceHelper";
import {reverse} from "named-urls";
import {PersonalityTag, UserProfile} from "./models";
import routes from "routes";
import {alertUser} from "../core/alert/Alert";
import {APIModelListAdapter} from "../core/utils/ModelHelper";


export function getUserProfileData() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.user.profile))
            .then(response => {
                resolve(new UserProfile(response.data));
            })
            .catch(error => {
                handleError(error)
            });
    });
}


export function getProfilePicLink() {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.user.uploadProfilePic))
            .then(response => {
                resolve(response.data['profile_pic']);
            })
            .catch(error => {
                handleError(error)
            });
    });
}


export function uploadProfilePic(data, progressTracker) {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append('profile_pic', data);
        axios.post(reverse(routes.user.uploadProfilePic), formData, config)
            .then(response => {
                resolve(response.data['profile_pic']);
            })
            .catch(error => {
                if (handleError(error).badRequest) {
                    alertUser.init({message: error.response.data.image, alertType: 'danger', autoHide: true});
                }
            });
    });
}


export function deleteProfilePic() {
    return new Promise(function (resolve, reject) {
        axios.delete(reverse(routes.user.uploadProfilePic))
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                handleError(error)
            });
    });
}


export function getPersonalityTags(houseUUID) {
    return new Promise(function (resolve, reject) {
        axios.get(reverse(routes.user.personalityTags, {houseUUID: houseUUID}))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, PersonalityTag, 'id'));
            })
            .catch(error => {
                handleError(error)
            });
    });
}

export function postPersonalityTags(houseUUID, data) {
    return new Promise(function (resolve, reject) {
        axios.post(reverse(routes.user.personalityTags, {houseUUID: houseUUID}), data.serialize(true))
            .then(result => {
                resolve(new APIModelListAdapter(result.data, PersonalityTag, 'id'));
            })
            .catch(error => {
                reject(handleError(error).error);
            })
    })
}