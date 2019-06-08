import { PostalCodeSearchModel, ESHouse } from './models'
import axios, { handleError } from "core/utils/serviceHelper";
import routes from "routes";


//TODO
export function getPostalCodeSuggestions(){
    return new Promise(function(resolve, reject){
        var dbData = [{ "_type": "doc", "_index": "web_location", "_source": { "verbose": "Carlton North", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.9667, "lat": -37.7833 } }, "_score": 7.156417, "_id": "UdHmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Eltham North", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 145.15, "lat": -37.7 } }, "_score": 7.156417, "_id": "o9HmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Laverton North", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.8159, "lat": -37.8205 } }, "_score": 7.156417, "_id": "DNHmI2sBbwCubvfMLGlz" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Mil-Lel", "parent_verbose": "SA FAR, South Australia, Australia", "geo_point": { "lon": 140.8167, "lat": -37.7833 } }, "_score": 6.6797523, "_id": "I9HmI2sBbwCubvfMG2Lc" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Mount Mee", "parent_verbose": "NORTHGATE NORTH, Queensland, Australia", "geo_point": { "lon": 152.7702, "lat": -27.0806 } }, "_score": 6.224825, "_id": "7tHlI2sBbwCubvfM-VbM" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Broadmeadows", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.9188, "lat": -37.6802 } }, "_score": 6.224825, "_id": "Q9HmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Jacana", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.9111, "lat": -37.6878 } }, "_score": 6.224825, "_id": "RNHmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Dallas", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.9354, "lat": -37.6708 } }, "_score": 6.224825, "_id": "RdHmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Coolaroo", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.9346, "lat": -37.6568 } }, "_score": 6.224825, "_id": "RtHmI2sBbwCubvfMMWml" }, { "_type": "doc", "_index": "web_location", "_source": { "verbose": "Westmeadows", "parent_verbose": "MELB NORTH WEST, Victoria, Australia", "geo_point": { "lon": 144.887, "lat": -37.676 } }, "_score": 6.224825, "_id": "SNHmI2sBbwCubvfMMWml" }];
        dbData = dbData.map(function(data){
            return Object.assign(new PostalCodeSearchModel(), data);
        });
        resolve(dbData);
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