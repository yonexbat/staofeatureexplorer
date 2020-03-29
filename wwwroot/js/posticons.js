export function createIcon(poi) {
    const type = poi.type;
    switch(type) {
        case 'T12':
            return goldMarker();
        default:
            return simpleMarker();
    }
}



function simpleMarker() {
    return `marker.png`;
}

function goldMarker() {
    var goldStar = {
        path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
        fillColor: 'yellow',
        fillOpacity: 0.8,
        scale: 0.1,
        strokeColor: 'gold',
        strokeWeight: 14
    };
    return goldStar;
}