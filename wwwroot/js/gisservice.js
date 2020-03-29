import { getJson } from "./httpclient.js";
export class GisService {

    constructor() {
        this.baseurl = `/proxy`;
    }

    async find(findobj) {

        const northeast = findobj.bounds.getNorthEast();
        const southwest = findobj.bounds.getSouthWest();
        const lon1 = southwest.lng();
        const lon2 = northeast.lng();
        const lat1 = southwest.lat();
        const lat2 = northeast.lat();
        const separator = encodeURIComponent(',');
        const extent = `${lon1}${separator}${lat1}${separator}${lon2}${separator}${lat2}`;
        const tagsEncoded = encodeURIComponent(findobj.tags);
        const clusterdist = findobj.clusterdist;
        
        var url = `${this.baseurl}/Find?query=${tagsEncoded}&clusterdist=${clusterdist}&lang=en&extent=${extent}&autoexpand=false&maxpois=150&agglevel=0&encoding=UTF-8`;
        var obj = await getJson(url);

        if(obj.pois) {
            return this.pois(obj);
        } else if(obj.aggregates) {
            return this.aggregates(obj);
        }  else {
            throw new Error('Both are undefined, aggregates and poi. Something is wrong');
        }    
    }

    async getTags() {
        var url = `${this.baseurl}/Types?lang=de`;
        const res = await getJson(url);
        return res;
    }

    aggregates(obj) {
        const dataMap = new Map();
        obj.aggregates.forEach(agg => {
            agg.icontype = 'aggregate';
            agg.id = agg.key;
            dataMap.set(agg.id, agg);
        });
        return dataMap;
    }

    pois(obj){

        var flattened = this.handlePois(obj);
        
        // Convert to map.
        const dataMap = new Map();
        flattened.forEach(x => {
            dataMap.set(x.id, x);
        });

        return dataMap;
    }

    handlePois(poisObj) {
        var flattened = [];
        if (poisObj.pois) {
            poisObj.pois.forEach(element => {                
                if(element.pois) {
                    const len = element.pois.length;
                    element.icontype = 'cluster';
                    element.id = `${element.x},${element.y}`
                    element.name = `cluster: ${len}`;
                } else {
                    element.icontype = 'poi';
                }
                flattened.push(element);
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