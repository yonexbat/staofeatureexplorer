export class Poi extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const container = document.createElement('p');
        shadow.appendChild(container);
        if(this.hasAttribute('templateid')) {
            this.templatid =  this.getAttribute('templateid');
            console.log(this.templatid);
            const template = document.querySelector(`#${this.templatid}`);
            const clone = template.content.cloneNode(true);
            container.appendChild(clone);
        }        
    }

    showPois(pois) {
        console.log('show pois');
    }

}