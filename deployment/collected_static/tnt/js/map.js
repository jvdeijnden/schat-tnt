var map;
var image;
var cartoUrl = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
var cartoAttrib='Map data © <a href="https://carto.com/">CARTO</a> contributors';
var carto = new L.TileLayer(cartoUrl, {minZoom: 8, maxZoom: 25, attribution: cartoAttrib});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function initmap() {
	var urlArray = window.location.pathname.split('/');
	for (var i in urlArray) {
		if (urlArray[i] === "filter") {
			urlArray.splice(-1, urlArray.length - i);
        }
	}
	var url = urlArray.join('/');

	$.ajax({
		url: url + '/data',
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
				window.location.protocol + '//' + window.location.hostname + ret.floor.image,
				[ret.floor.botleftcoords, ret.floor.toprightcoords]).addTo(map);

			if (isMobile.any()) {
				map.setView(new L.LatLng(ret.building.latitude, ret.building.longitude), ret.building.zoom);
			}
			else {
				map.setView(new L.LatLng(ret.building.latitude, ret.building.longitude + 0.0015), ret.building.zoom);
			}

			L.marker([51.438130, 5.468477]).addTo(map).bindPopup("Philips IntelliVue X3" + "<br><a href='http://145.93.123.214/product/philips-intellivue-x3/'>Details</a>");
			L.marker([51.437800, 5.468380]).addTo(map).bindPopup("Verathon BladderScan BVI 9400" + "<br><a href='http://145.93.123.214/product/verathon-bladderscan-bvi-9400/'>Details</a>");
		}
	});
}

$(document).ready(function() {
	initmap();
	
	$('#floor-dropdown .dropdown-menu .dropdown-item').click(function() {
		$('#floor-dropdown .dropdown-toggle').text($(this)[0].innerText);
		var urlArray = window.location.pathname.split('/');
    	urlArray.pop();
    	var url = urlArray.join('/');

		$.ajax({
			url: window.location.protocol + url + '/' + $(this)[0].value + "/data",
			timeout: 3000,

			error: function() {
				alert("Error");
			},
			success: function(response) {
				var ret = JSON.parse(response);
				map.removeLayer(image);
				image = L.imageOverlay(
					window.location.protocol + '//' + window.location.hostname + ret.floor.image,
					[ret.floor.botleftcoords, ret.floor.toprightcoords]).addTo(map);
				
			}
		});
	});
});

