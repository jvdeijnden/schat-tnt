var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var imageUrl = "../static/tnt/img/-1.png";
var imageBounds = [[51.437650, 5.468185], [51.438515, 5.468765]];

function initmap() {
	$.ajax({
		url: window.location.pathname + '/data',
		timeout: 3000,

		error: function() {
			alert("Error");
		},
		success: function(response) {
			var ret = JSON.parse(response);

		}
	});

	// set up the map
	map = new L.Map('map', {zoomControl:false,
							zoomDelta: 0.1,
							zoomSnap: 0});

	map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();

	// create the tile layer with correct attribution
	var cartoUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
	var cartoAttrib='Map data © <a href="https://carto.com/">CARTO</a> contributors';
	var carto = new L.TileLayer(cartoUrl, {minZoom: 8, maxZoom: 25, attribution: cartoAttrib});

	if (!L.browser.mobile) {
		map.setView(new L.LatLng(51.438119, 5.468248), 19);
	}
	else {
		map.setView(new L.LatLng(51.438119, 5.468248), 19);
	}
	map.addLayer(carto);

	// L.marker([51.438121, 5.468477]).addTo(map).bindPopup("ECG" + '<br><a href="#">Details</a>');
}

$(document).ready(function() {
	initmap();
	
	$('#floor-dropdown .dropdown-menu .dropdown-item').click(function() {
		$('#floor-dropdown .dropdown-toggle').text($(this)[0].innerText);
		$.ajax({
			url: 'plan/' + $(this)[0].value,
			timeout: 3000,

			error: function() {
				alert("Error");
			},
			success: function(response) {
				ret = JSON.parse(response);
				
			}
		});
	});
});

