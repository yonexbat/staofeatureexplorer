export class Pois extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        this.container = document.createElement('div');
        shadow.appendChild(this.container);
        this.createTemplate();
    }

    static get observedAttributes() {
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }

    createDefaultTemplate(){

    }

    createTemplate() {
        if(this.hasAttribute('templateid')) {
            this.templatid =  this.getAttribute('templateid');
            console.log(this.templatid);
            this.template = document.querySelector(`#${this.templatid}`);           
        }
        else {
            this.templatid = 'no template';
            this.template = this.createDefaultTemplate();
        }
    }

    showPois(pois) {
        console.log('show pois');

        this.container.innerHTML = '';

        if(pois && pois.length) {
            for(let poi of pois) {
                const poiDiv = this.createPoiDiv(poi);
                this.container.appendChild(poiDiv);
            }
        }
    }


    createPoiDiv(poi) {
        const poidiv = document.createElement('div');
        const p = this.template.content.cloneNode(true);
        for(let key in poi) {
            const valElement = p.querySelector(`[name="${key}"]`);
            if(valElement) {
                valElement.innerHTML = JSON.stringify(poi[key]);
            }
        }
        poidiv.appendChild(p);
        const hr = document.createElement('hr');
        poidiv.appendChild(hr);
        return poidiv;
    }

}