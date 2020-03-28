googlemapsstuff = {
    googlemapready: false,
    googlemapreadylistener: [],
    addGoogelMapReadyListener: function(func){
        if(googlemapsstuff.googlemapready === true) {
            func();
        }  else {
            googlemapsstuff.googlemapreadylistener.push(func);
        }
    }
};

getApiKeyAndDownloadGoogleMapsModule();

async function getApiKeyAndDownloadGoogleMapsModule() {
    var apiKey = await getApiKey();
    var script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    document.head.appendChild(script);
}


async function getApiKey() {
    var url = `/ApiKey`;
    var respone = await fetch(url);
    var obj = await respone.json();
    return obj;
}


async function initMap() {
    googlemapsstuff.googlemapready = true;
    googlemapsstuff.googlemapreadylistener.forEach(func => {
        func();
    });    
}