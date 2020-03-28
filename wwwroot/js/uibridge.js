export class UiBridge {

    constructor() {

    } 

    getTagsVal() {
        return this.getTagsInputElement().value;
    }

    getTagsInputElement() {
        return document.getElementById('queryfind');
    }

    getMapDiv() {
        return document.getElementById('map');
    }

    getGeocodeVal() {
        return document.getElementById('querygeocode').value;
    }

    setNumResults(val) {
        document.getElementById('numhits').innerHTML = '' + val;
    }

    getGeoCodeButton(){
        return document.getElementById('querygeocodebutton');
    }
}