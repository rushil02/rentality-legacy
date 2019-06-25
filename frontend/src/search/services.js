import { PostalCodeSearchModel, ESHouse } from './models'
import axios, { handleError } from "core/utils/serviceHelper";
import routes from "routes";


export function getPostalCodeSuggestions(params){
    return new Promise(function(resolve, reject){
        var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');    
        axios.get(routes.search.location + '?' + queryString)
            .then(result => {
                result = result.data.map(function (data) {
                    return Object.assign(new PostalCodeSearchModel(), data);
                });
                resolve(result);
            })
            .catch(error => {
                handleError(error)
            });
    });
}

export function getFilteredHouses(params){
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return new Promise(function(resolve, reject) {
        axios.get(routes.search.house + '?' + queryString)
            .then(result => {
                result = result.data.map(function(data){
                    return Object.assign(new ESHouse(), data);
                });
                resolve(result);
            })
            .catch(error => {
                handleError(error)
            });
    });
}