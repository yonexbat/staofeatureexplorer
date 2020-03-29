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

    getclusterDistInputElement(){
        return document.getElementById('clusterdist');
    }

    getClusterDistVal(){
        return this.getclusterDistInputElement().value;
    }

    getGeocodeVal() {
        return document.getElementById('querygeocode').value;
    }

    setNumResults(val) {
        document.getElementById('numhits').innerHTML = '' + val;
    }

    setError(val) {
        const elem = document.getElementById('outputelem');
        elem.innerHTML = '' + val;
        elem.classList.add('error');
    }

    setResult(val){
        const elem = document.getElementById('outputelem');
        elem.innerHTML = '' + val;
        elem.classList.remove('error');
    }

    getGeoCodeButton(){
        return document.getElementById('querygeocodebutton');
    }

    getTagsbutton() {
        return document.getElementById('gettagsbutton');
    }
}