
import { GisService } from './gisservice.js';
import { UiBridge } from './uibridge.js';
import { getJson } from './httpclient.js';
import { createIcon } from './posticons.js';

export class GoogleStaoMap {

    constructor() {
        this.gisservice = new GisService();
        this.uiBridge = new UiBridge();
        this.markers = new Map();
    }

    async initialize() {

        const mapStyles = await getJson('googlemapstyle.json');

        this.map = new google.maps.Map(this.uiBridge.getMapDiv(), {
            center: { lat: 47.068978, lng: 7.623838 },
            zoom: 17,
            styles: mapStyles,
        });


        this.map.addListener('bounds_changed', () => { this.mapChanged() });
        this.uiBridge.getTagsInputElement().addEventListener('blur', () => {
            this.mapChanged();
        });

        this.uiBridge.getclusterDistInputElement().addEventListener('blur', () => {
            this.mapChanged();
        });

        this.uiBridge.getGeoCodeButton().addEventListener('click', () => this.geocodeClicked());
        this.uiBridge.getTagsbutton().addEventListener('click', () => this.getTagsClicked());        
    }

    async getTagsClicked(){
        const res = await this.gisservice.getTags();  
        this.uiBridge.setResult(JSON.stringify(res));   
    }

    async geocodeClicked() {
        const tags = this.uiBridge.getTagsVal();
        const query = this.uiBridge.getGeocodeVal();
        const res = await this.gisservice.geocode(query, tags);
        this.uiBridge.setNumResults(res.length);
        this.uiBridge.setResult(JSON.stringify(res));
        if (res.length > 0) {
            const first = res[0];
            const pt = first.pt;
            const lat = pt[1];
            const lng = pt[0];
            this.centerMap(lat, lng);
        }
    }

    async centerMap(lat, lng) {
        const center = new google.maps.LatLng(lat, lng);
        this.map.panTo(center);
    }


    async mapChanged() {
        const bounds = this.map.getBounds();
        if (!bounds) {
            return;
        }

        const tags = this.uiBridge.getTagsVal();
        const clusterdist = this.uiBridge.getClusterDistVal();
        const findobj = {
            bounds: bounds,
            tags: tags,
            clusterdist: clusterdist,
        };

        const dataMap = await this.gisservice.find(findobj);

        // Marker entfernen, welche nicht mehr auf der Karte sind
        const markersToRemove = [];
        for (let id of this.markers.keys()) {
            if (!dataMap.has(id)) {
                const marker = this.markers.get(id);
                marker.setMap(null);
                markersToRemove.push(id);
            }
        }
        for (let id of markersToRemove) {
            this.markers.delete(id);
        }

        // Marker zum hinzufügen
        for (let id of dataMap.keys()) {
            if (!this.markers.has(id)) {
                let poi = dataMap.get(id);
                let marker = this.createMarker(poi);
                this.markers.set(id, marker);
            }
        }

    }

    createMarker(poi) {
        const icon = createIcon(poi);
        const location = { lat: poi.y, lng: poi.x };
        const label = this.createLabel(poi);
        const marker =  new google.maps.Marker({
            position: location,
            label: label,
            icon: icon,
            map: this.map,
        });
        marker.addListener('click', () => this.markerClicked(poi));
        return marker;
    }

    createLabel(poi){
        const name = poi.name;
        return {
            text: name,
            color: 'yellow',
        };
    }

    markerClicked(poi) {
        this.uiBridge.setResult(JSON.stringify(poi));
        const poiInfo = JSON.stringify(poi);
        console.log(`marker clicked ${poiInfo}`);
        
    }

}