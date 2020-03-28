import { getJson } from "./httpclient.js";

export class GisService {

    constructor() {
        this.baseurl = `/proxy`;
    }

    async find(bounds, tags) {

        const northeast = bounds.getNorthEast();
        const southwest = bounds.getSouthWest();
        const lon1 = southwest.lng();
        const lon2 = northeast.lng();
        const lat1 = southwest.lat();
        const lat2 = northeast.lat();
        const separator = encodeURIComponent(',');
        const extent = `${lon1}${separator}${lat1}${separator}${lon2}${separator}${lat2}`;
        const tagsEncoded = encodeURIComponent(tags);
        
        var url = `${this.baseurl}/Find?query=${tagsEncoded}&clusterdist=6&lang=en&extent=${extent}&autoexpand=false&maxpois=150&agglevel=0&encoding=UTF-8`;
        var obj = await getJson(url);
        var flattened = this.flatten(obj);
        
        // Convert to map.
        const dataMap = new Map();
        flattened.forEach(x => {
            dataMap.set(x.id, x);
        });

        return dataMap;
    }

    flatten(poisObj) {
        var flattened = [];
        if (poisObj.pois) {
            poisObj.pois.forEach(element => {
                if (element.pois) {
                    element.pois.forEach(innerElement => {
                        flattened.push(innerElement);
                    });
                } else {
                    flattened.push(element);
                }
            });
        }
        return flattened;
    }

    async geocode(query, tags) {
        const tagsEncoded = encodeURIComponent(tags);
        const queryEncoded = encodeURIComponent(query);
        var url = `${this.baseurl}/Geocode?query=${queryEncoded}&start=0&pois=${tagsEncoded}&lang=en&limit=100&encoding=UTF-8`;
        var obj = await getJson(url);
        const res = obj.locations.filter(x => {
            return x !== null && x.pt !== null ;
        });
        return res;
    }


}