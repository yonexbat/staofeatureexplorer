
import { GisService } from './gisservice.js';
import { UiBridge } from './uibridge.js';

export class GoogleStaoMap {

    constructor() {
        this.gisservice = new GisService();
        this.uiBridge = new UiBridge();
        this.markers = new Map();
    }

    async initialize() {

        const mapStyles = await this.loadMapStyles();

        this.map = new google.maps.Map(this.uiBridge.getMapDiv(), {
            center: { lat: 47.068978, lng: 7.623838 },
            zoom: 17,
            styles: mapStyles,
        });


        this.map.addListener('bounds_changed', () => { this.mapChanged() });
        this.uiBridge.getTagsInputElement().addEventListener('blur', () => {
            this.mapChanged();
        });

        this.uiBridge.getGeoCodeButton().addEventListener('click', () => this.geocodeClicked());

    }

    async geocodeClicked() {
        console.log('geocode clicked');
        const tags = this.uiBridge.getTagsVal();
        const query = this.uiBridge.getGeocodeVal();
        const res = await this.gisservice.geocode(query, tags);
        this.uiBridge.setNumResults(res.length);
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
        const dataMap = await this.gisservice.find(bounds, tags);

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
                let marker = this.createmarker(poi);
                this.markers.set(id, marker);
            }
        }

    }

    createmarker(poi) {
        const iconurl = `marker.png`;
        const location = { lat: poi.y, lng: poi.x };
        return new google.maps.Marker({
            position: location,
            label: poi.name,
            icon: iconurl,
            map: this.map,
        });
    }


    async loadMapStyles() {
        var url = `googlemapstyle.json`;
        var respone = await fetch(url);
        var obj = await respone.json();
        return obj;
    }

}