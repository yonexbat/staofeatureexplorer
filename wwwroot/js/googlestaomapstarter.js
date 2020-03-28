import { GoogleStaoMap } from './googlestaomap.js';

console.log(googlemapsstuff);
window.googlemapsstuff.addGoogelMapReadyListener(() => {
    const staoemap = new GoogleStaoMap();
    staoemap.initialize()
});
