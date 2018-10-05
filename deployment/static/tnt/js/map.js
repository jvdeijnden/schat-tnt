var map;
var centerLat;
var centerLong;
var image;
var cartoUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
var cartoAttrib='Map data © <a href="https://carto.com/">CARTO</a> contributors';
var carto = new L.TileLayer(cartoUrl, {minZoom: 8, maxZoom: 25, attribution: cartoAttrib});

function initmap() {
	var urlArray = window.location.pathname.split('/');
	for (var i in urlArray) {
		if (urlArray[i] === "filter") {
			urlArray.splice(-1, urlArray.length - i);
        }
	}
	var url = urlArray.join('/');

	$.ajax({
		url: url + 'data',
		timeout: 3000,

		error: function() {
			alert("Error");
		},
		success: function(response) {
			var ret = JSON.parse(response);

			// set up the map
			map = new L.Map('map', {zoomControl:false,
									zoomDelta: 0.1,
									zoomSnap: 0});

			map.dragging.disable();
			map.touchZoom.disable();
			map.doubleClickZoom.disable();
			map.scrollWheelZoom.disable();

			map.addLayer(carto);
			image = L.imageOverlay(
				window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + ret.floor.image,
				[ret.floor.botleftcoords, ret.floor.toprightcoords]).addTo(map);

			centerLat = ret.building.latitude;
			centerLong = ret.building.longitude;

			map.setView(new L.LatLng(ret.building.latitude, ret.building.longitude + $(window).width() * 0.0015 / 1920), ret.building.zoom);

			L.marker([51.438130, 5.468477]).addTo(map).bindPopup("Philips IntelliVue X3" + "<br><a href='http://145.93.123.214/product/philips-intellivue-x3/'>Details</a>");
			L.marker([51.437800, 5.468380]).addTo(map).bindPopup("Verathon BladderScan BVI 9400" + "<br><a href='http://145.93.123.214/product/verathon-bladderscan-bvi-9400/'>Details</a>");
		}
	});
}

$(document).ready(function() {
	initmap();
	
	$('#floor-dropdown .dropdown-menu .dropdown-item').click(function() {
		$('#floor-dropdown .dropdown-toggle').text($(this)[0].innerText);
		var urlArray = window.location.pathname.replace(/\/$/, '').split('/');
		urlArray.pop();
    	var url = urlArray.join('/');

		$.ajax({
			url: window.location.protocol + url + '/' + $(this)[0].value + "/data",
			timeout: 3000,

			error: function() {
			    console.log(window.location.protocol + url + '/' + $(this)[0].value + "/data");
				alert("Error");
			},
			success: function(response) {
				var ret = JSON.parse(response);
				map.removeLayer(image);
				image = L.imageOverlay(
					window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + ret.floor.image,
					[ret.floor.botleftcoords, ret.floor.toprightcoords]).addTo(map);

				console.log(ret.floor.info_text);
				$('#floor-name').text(ret.floor.name_text);
		        $('#floor-info').text(ret.floor.info_text);
			}
		});
	});

	$(window).on('resize', function(e) {
        map.panTo(new L.LatLng(centerLat, centerLong + $(window).width() * 0.0015 / 1920));
    });
});

