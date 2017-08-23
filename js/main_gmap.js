function init() {
  var alacremeLatLng = {lat: 47.132424, lng: 27.574881};
  var selgrosLatLng = {lat: 47.132665, lng: 27.574305};

         var map = new google.maps.Map(document.getElementById('map'), {
           zoom: 17,
           center: alacremeLatLng,
           scrollwheel: false,
           disableDefaultUI: true,
           styles: [
             { "stylers": [ { "hue": "#fcc6e2" }, { "saturation": -20 } ] },
             { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "hue": "#e70066" }]},
             { "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [{ "hue": "#d6005e" }, { "visibility": "on" }]},
             { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "off" }]},
             { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "visibility": "on" }]},
             { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }]}
           ]
         });

         var icon_alacreme = {
           url: 'img/icon-map-cake.png',
           labelOrigin: new google.maps.Point(10, 35),
           anchor: new google.maps.Point(30, 0)
         };

         var icon_selgros = {
           url: 'img/icon-map-cart.png',
           labelOrigin: new google.maps.Point(25, 45),
          anchor: new google.maps.Point(20, 40)

         };

         var marker_alacreme = new google.maps.Marker({
           position: alacremeLatLng,
           map: map,
           title: 'A La Creme',
           label:  {
             color: 'brown',
             text: 'a la creme'
           },
           icon: icon_alacreme
         });

         var marker_selgros = new google.maps.Marker({
           position: selgrosLatLng,
           map: map,
           title: 'Selgros',
           label:  {
             color: 'purple',
             text: 'selgros'
           },
           icon: icon_selgros
         });
}

function loadScript() {
  var script = document.createElement('script');     // Create <script> element
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCTNF1_cpAkkJz_dAEV6DjVEUPfCq1VqOs&callback=init';
  document.body.appendChild(script);                 // Add element to page
}

window.onload = loadScript;
