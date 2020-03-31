//http://www.benjamindickman.com/2017/1/custom-google-map-marker-using-font-awesome-icons
//https://developers.google.com/maps/documentation/javascript/examples/overlay-simple


class MyMarkerly {

    constructor(latlng, map, args) {
       
        this.overlay = new google.maps.OverlayView();
        this.overlay.mylisteners = [];
        this.overlay.latlng = latlng;
        this.overlay.setMap(map);
        this.overlay.remove = function() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        }
        this.overlay.args = args;
        this.overlay.draw = function() {

            var self = this;
            var div = this.div;

            if (!div) {

                div = this.div = document.createElement('div');

                div.className = 'marker';

                div.style.position = 'absolute';

                //set the values passed in from the creation of the custom marker
                div.innerHTML = this.args.htmlContent;
                div.style.color = this.args.color;
                div.style['background-color'] = 'coral';

                if (typeof (self.args.marker_id) !== 'undefined') {
                    div.dataset.marker_id = self.args.marker_id;
                }

                //add events to the marker

                google.maps.event.addDomListener(div, "mouseover", function (e) {
                    //do something on mouseover, maybe show some tooltip text
                })

                google.maps.event.addDomListener(div, "mouseout", function (e) {
                    //do something on mosueout, hide the tooltip text
                })

                google.maps.event.addDomListener(div, "click", function (e) {
                    console.log('clicki');
                    for(let x of self.mylisteners) {
                        x();
                    }              
                })


                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

            //position the custom marker on the map
            if (point) {
                div.style.left = (point.x) + 'px';
                div.style.top = (point.y) + 'px';
            }
        }
    }

    addListener(eventname, fn) {
        this.overlay.mylisteners.push(fn);
    }

    setMap(map) {
        this.overlay.setMap(map);
    }

}


export function CreateMarker(latlng, map, args) {
    const x = new MyMarkerly(latlng, map, args);
    return x;

    /*
    const myclazz = class extends google.maps.OverlayView {

        constructor(latlng, map, args) {
            super();
            this.latlng = latlng;
            this.args = args;
            this.setMap(map);
        }

        draw() {
            var self = this;
            var div = this.div;

            if (!div) {

                div = this.div = document.createElement('div');

                div.className = 'marker';

                div.style.position = 'absolute';

                //set the values passed in from the creation of the custom marker
                div.innerHTML = this.args.htmlContent;
                div.style.color = this.args.color;

                if (typeof (self.args.marker_id) !== 'undefined') {
                    div.dataset.marker_id = self.args.marker_id;
                }

                //add events to the marker

                google.maps.event.addDomListener(div, "mouseover", function (e) {
                    //do something on mouseover, maybe show some tooltip text
                })

                google.maps.event.addDomListener(div, "mouseout", function (e) {
                    //do something on mosueout, hide the tooltip text
                })


                var panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }
            var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

            //position the custom marker on the map
            if (point) {
                div.style.left = (point.x) + 'px';
                div.style.top = (point.y) + 'px';
            }
        }

        remove () {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                this.div = null;
            }
        };
    
        getPosition = function () {
            return this.latlng;
        }
    }

    return new myclazz(latlng, map, args);*/
}