//http://www.benjamindickman.com/2017/1/custom-google-map-marker-using-font-awesome-icons

function  CustomMarker(latlng, map, args) {
	this.latlng = latlng;	
	this.args = args;	
	this.setMap(map);	
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
	
	var self = this;
	
	var div = this.div;
	
	if (!div) {
	
		div = this.div = document.createElement('div');
		
		div.className = 'marker';
		
		div.style.position = 'absolute';

                //set the values passed in from the creation of the custom marker
		div.innerHTML = this.args.htmlContent;
		div.style.color = this.args.color;
		
		if (typeof(self.args.marker_id) !== 'undefined') {
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
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}	
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;	
};