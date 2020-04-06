import {GisService} from '../gisservice.js';

const gisservice = new GisService();

document.addEventListener("DOMContentLoaded", function(event) { 
    setupGui();
});

async function setupGui() {
    const id = getId();
    if(id) {
        const jsonString = await gisservice.getPoiDetailJsonString(id);
        const textarea = document.getElementById('jsontextarea');
        textarea.value = jsonString;
    }
}

function getId() {
    const urlString = window.location.href;
    var url = new URL(urlString);
    var id = url.searchParams.get("id");
    return id;
}