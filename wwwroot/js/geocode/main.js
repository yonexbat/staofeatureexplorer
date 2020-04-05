import {Pois} from './pois.js';
import {GisService} from '../gisservice.js';

customElements.define('stao-pois', Pois);
const gisservice = new GisService();

document.addEventListener("DOMContentLoaded", function(event) { 
    const geocodeButton = document.getElementById('querygeocodebutton');
    geocodeButton.addEventListener('click', () => geocode());
});

async function geocode(){
    var geocodeVal = document.getElementById('querygeocode').value;
    var tags = document.getElementById('tags').value;
    const pois = await gisservice.geocode(geocodeVal, tags);
    const poisElement = document.getElementById('pois');
    poisElement.showPois(pois);

}