//Initialise map above Vitalis Vonderhof with zoom 19 and no zoom control, also add layers
var mymap = L.map('map_tillift', { zoomControl:false }).setView([51.4380614, 5.468464300000051], 19);

//Standard map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    maxZoom: 22,
    accessToken: 'pk.eyJ1IjoiamFyaTR3ZCIsImEiOiJjamd4cmN6emsxZmF5MnhuMGdoeGpvcDljIn0.6OL_tr2S7I2pG9OOx7SO3w'
}).addTo(mymap);

//Disable moving the location or zooming in/out
mymap.scrollWheelZoom.disable();
mymap.dragging.disable();
mymap.touchZoom.disable();
mymap.doubleClickZoom.disable();
mymap.scrollWheelZoom.disable();

//Image kelder
var KRImageUrl = "Vonderhof_gebouw_kelder_ABCD_blauw.png";
var KRImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];

//Image beganegrond
var BGImageUrl = "Vonderhof_gebouw_beganegrond_ABCD_blauw.png";
var BGImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];

//Image 1e verdieping
var V1ImageUrl = "Vonderhof_gebouw_1e_verdieping_ABCD_blauw.png";
var V1ImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];

//Image 2e verdieping
var V2ImageUrl = "Vonderhof_gebouw_2e_verdieping_ABCD_blauw.png";
var V2ImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];

//Image 3e verdieping
var V3ImageUrl = "Vonderhof_gebouw_3e_verdieping_ABCD_blauw.png";
var V3ImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];

//Image 4e verdieping
var V4ImageUrl = "Vonderhof_gebouw_4e_verdieping_ABCD_blauw.png";
var V4ImageBounds = [[51.437645, 5.467755], [51.438521, 5.468812
]];



//floor: kelder
var kelder_map = L.imageOverlay(KRImageUrl, KRImageBounds);
//floor: beganegrond, standard view upon opening page
var begane_grond_map = L.imageOverlay(BGImageUrl, BGImageBounds);
//floor: 1e verdieping
var V1_map = L.imageOverlay(V1ImageUrl, V1ImageBounds);
//floor: 2e verdieping
var V2_map = L.imageOverlay(V2ImageUrl, V2ImageBounds);
//floor: 3e verdieping
var V3_map = L.imageOverlay(V3ImageUrl, V3ImageBounds);
//floor: 4e verdieping
var V4_map = L.imageOverlay(V4ImageUrl, V4ImageBounds);

//style group for pins
var Pin = L.Icon.extend({
    options: {
        iconSize:     [32, 45],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

//Style all pins
var orangePin = new Pin({iconUrl: 'Pin_oranje.png'}),
    greenPin = new Pin({iconUrl: 'Pin_groen.png'}),
    purplePin = new Pin({iconUrl: 'Pin_paars.png'});

//Pin: Tillift_1
var tillift_1 = L.marker([51.437725, 5.46830], {icon: orangePin});
tillift_1.bindPopup(
'<table style="width:100%", border-collapse: collapse;> <tr> <th rowspan="2"><img src="tillift.png" style="width:100px"</th> <th>tillift_1</th></tr> <tr> <td><a href="tillift_1.html">Meer info</a></td> </tr>'
);


//Pin: Tillift_2
var tillift_2 = L.marker([51.437930, 5.46840], {icon: greenPin});
tillift_2.bindPopup(
'<table style="width:100%", border-collapse: collapse;> <tr> <th rowspan="2"><img src="tillift.png" style="width:100px"</th> <th>tillift_2</th></tr> <tr> <td><a href="tillift_2.html">Meer info</a></td> </tr>'
);

//Pin: Tillift_3
var tillift_3 = L.marker([51.438150, 5.468320], {icon: purplePin});
tillift_3.bindPopup(
'<table style="width:100%", border-collapse: collapse;> <tr> <th rowspan="2"><img src="tillift.png" style="width:100px"</th> <th>tillift_3</th></tr> <tr> <td><a href="tillift_3.html">Meer info</a></td> </tr>'
);



//Groups of floors and pins
var kelder  = L.layerGroup([kelder_map]);
var begane_grond = L.layerGroup([begane_grond_map]).addTo(mymap);
var V1 = L.layerGroup([V1_map]);
var V2 = L.layerGroup([V2_map]);
var V3 = L.layerGroup([V3_map,tillift_1,tillift_2,tillift_3]);
var V4 = L.layerGroup([V4_map]);

// List of floors
var Floors = { 
'kelder' : kelder,
'begane grond' : begane_grond,
'1e verdieping' : V1,
'2e verdieping' : V2,
'3e verdieping' : V3,
'4e verdieping' : V4
};


// Make control element for basemaps & pins
L.control.layers(Floors, null, {collapsed:false}).addTo(mymap);


//control map from table (pin 1)
document.getElementById("Pin_1").addEventListener("click", MoveToPin_1);

document.getElementById("Tillift_1_text").addEventListener("click", MoveToPin_1);

//control map from table (pin 2)
document.getElementById("Pin_2").addEventListener("click", MoveToPin_2);

document.getElementById("Tillift_2_text").addEventListener("click", MoveToPin_2);

//control map from table (pin 3)
document.getElementById("Pin_3").addEventListener("click", MoveToPin_3);

document.getElementById("Tillift_3_text").addEventListener("click", MoveToPin_3);

function MoveToPin_1() {
    mymap.removeLayer(kelder);
    mymap.removeLayer(begane_grond);
    mymap.removeLayer(V1);
    mymap.removeLayer(V2);
    mymap.removeLayer(V3);
    mymap.addLayer(V3);
    mymap.removeLayer(V4);
    tillift_1.openPopup();  
};

function MoveToPin_2() {
    mymap.removeLayer(kelder);
    mymap.removeLayer(begane_grond);
    mymap.removeLayer(V1);
    mymap.removeLayer(V2);
    mymap.removeLayer(V3);
    mymap.addLayer(V3);
    mymap.removeLayer(V4);
    tillift_2.openPopup();  
};

function MoveToPin_3() {
    mymap.removeLayer(kelder);
    mymap.removeLayer(begane_grond);
    mymap.removeLayer(V1);
    mymap.removeLayer(V2);
    mymap.removeLayer(V3);
    mymap.addLayer(V3);
    mymap.removeLayer(V4);
    tillift_3.openPopup();  
};




