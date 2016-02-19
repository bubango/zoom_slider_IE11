/**
 * Creates the zoom slider object.
 * 
 * @param {object}	map			Google.maps.map object to be used for the georeports.
 * @param {int}		minZoom 	Min. zoom level -> Default value is 0.
 * @param {int}		maxZoom 	Max. zoom level -> Default value is 21.
 * @param {divId}   String		Id of the div where the slider will be inserted -> Default value is "zoomSlider".
 * 
 * @constructor
 * @version 0.1
 * @Author			JMTT		2016/02/19
 */
function zoomSlider(map, minZoom, maxZoom, divId) {
	
	this.map_ = map;
	this.minZoom_ = minZoom || 0;
	this.maxZoom_ = maxZoom || 21;
	this.divId_ = divId || "zoomSlider";
	
	this.initZoomSlider();
	
}

/**
 * Initialises the object, creating the two zoom bottons and the slider between them.
 * 
 * @param {object}	map			Google.maps.map object to be used for the georeports.
 * @param {int}		minZoom 	Min. zoom level -> Default value is 0
 * @param {int}		maxZoom 	Max. zoom level -> Default value is 21
 */
zoomSlider.prototype.initZoomSlider = function() {
	
	var btnInc = document.createElement("div"),
		btnDec = document.createElement("div"),
		slider = document.createElement("input"),
		zoomSlider = document.getElementById(this.divId_),
		that = this;
	
	btnInc.setAttribute("id","incZoom");
	btnInc.setAttribute("class","zoomBtn");
	btnInc.onclick = function () {
		that.increaseZoom();
	};
	
	btnDec.setAttribute("id","decZoom");
	btnDec.setAttribute("class","zoomBtn");
	btnDec.onclick = function () {
		that.decreaseZoom();
	};

	slider.value = this.map_.getZoom();
	slider.setAttribute("min", this.minZoom_);
	slider.setAttribute("max", this.maxZoom_);
	slider.setAttribute("step", "1");
	slider.setAttribute("type", "range");
	slider.setAttribute("id", "slide");
	slider.onchange=function() {
		that.updateSlider(this.value);
	}; 
 	
	zoomSlider.appendChild(btnInc);
	zoomSlider.appendChild(slider);
	zoomSlider.appendChild(btnDec);
	
	// Updates the slider when the zoom level of the map changes.
	this.map_.addListener('zoom_changed', function() {
		var sl = document.getElementById("slide");
		if (sl.value != that.map_.getZoom()) {
			sl.value = that.map_.getZoom();
		}
	});
	
};

/**
 * Increases the zoom level by 1
 */
zoomSlider.prototype.increaseZoom = function() {
	
	var currentZoom = this.map_.getZoom();
	this.map_.setZoom(++currentZoom);
	
};

/**
 * Decreases the zoom level by 1
 */
zoomSlider.prototype.decreaseZoom = function() {

	var currentZoom = this.map_.getZoom();
	this.map_.setZoom(--currentZoom);
	
};

/**
 * Sets the zoom level to the given value
 */
zoomSlider.prototype.updateSlider = function(slideAmount) {
	
	this.map_.setZoom(parseInt(slideAmount));

};
