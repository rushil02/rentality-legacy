import axios from "utils/ServiceHelper"
import {reverse} from 'named-urls';
import routes from "routes";

// Sample GET API
export function getProfileData(){
    return axios.get(reverse(routes.user.userProfile));
}


// Sample PUT  API
export function updateProfileData(data){
    return axios.put(reverse(routes.user.userProfile), data);
}


// Create a Promise to Mock an API.
export function getMockData(){
    // Mention type of data you are expecting to send in mocked API
    // Some Sample arg: {
    //      payloadArg: "value"
    // }

    // Return the data in the format you expect the API to work.
    return Promise.resolve({
        data: {
            foo: 'bar'
        }
    });
}

export function rejectMock(){
    return Promise.reject({
        data: {
            response: "API Failed"
        }
    });
}