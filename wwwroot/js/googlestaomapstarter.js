import { GoogleStaoMap } from './googlestaomap.js';

window.googlemapsstuff.addGoogelMapReadyListener(() => {
    const staoemap = new GoogleStaoMap();
    staoemap.initialize()
});
