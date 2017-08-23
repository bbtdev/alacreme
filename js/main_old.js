  /*$(function() {


  var magic_done = 0;

  var controller = new ScrollMagic.Controller();
  var $dietetice_welcome_header = $('#dietetice-welcome-header');
  produseWelcomeHeaderDisappearTop($dietetice_welcome_header, controller);

  function doMagic() {
    cardMoveTopAndStay($card_dietetice_despre, controller, 1.5, -150, $dietetice_welcome_header.parent(), 'onCenter', ($dietetice_welcome_header.parent().height()/2), 50, false, true);
    cardMoveTopAndStay($card_dietetice_biobrio, controller, 1.5, -200,  $card_dietetice_biscuiti, 'onEnter', 0, 500, true, false);
    cardMoveTopAndStay($card_dietetice_saratele_nesarate, controller, 1.5, 150,  $card_dietetice_biscuiti, 'onEnter', 0, 0, false, true);
  }

  var $card_dietetice_despre = $('#dietetice-despre');
  var $dietetice_welcome_header = $('#dietetice-welcome-header');
  var $card_dietetice_biscuiti = $('#dietetice-biscuiti');
  var $card_dietetice_biobrio = $('#dietetice-biobrio');
  var $card_dietetice_saratele_nesarate = $('#dietetice-saratele-nesarate');

  if ($(window).width() >= 1200) {
    magic_done = 1;
    doMagic();
  }

  $(window).on('resize', function() {
    if (($(window).width() < 1200) && (magic_done === 1)) {
      magic_done = 0;
      controller = controller.destroy(true);
      controller = new ScrollMagic.Controller();
      produseWelcomeHeaderDisappearTop($dietetice_welcome_header, controller);
    }
    else if (($(window).width() >= 1200) && (magic_done === 0)) {
      magic_done = 1;
      doMagic();
    }
  });

}());
/*


//google map

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





$window = $(window);

var original_offset_top = new Array();

var $slogan_one = $('#slogan-part-one');
var $slogan_two = $('.slogan-split');
original_offset_top[$slogan_one] = $slogan_one.offset().top;
original_offset_top[$slogan_two] = $slogan_one.offset().two;


console.log($('#acasa').height());

var tween = TweenMax.to('#slogan-part-one', 1, {
  opacity: 0,
  y : $('#acasa').height()/2,
  ease: Linear.easeNone
});


var controller = new ScrollMagic.Controller();

// create a scene
new ScrollMagic.Scene({
  triggerElement: '#acasa',
  offset: $('#acasa').height()/2,
  duration: $('#acasa').height()/2
})
    .setTween(tween) // pins the element for the the scene's duration
    .addTo(controller) // assign the scene to the controller
    .addIndicators({zindex: 99999});

var tweenx = TweenMax.to('#slogan-part-two', 1, {
  opacity: 1,
  y : $('#commercial').height()/2,
  ease: Linear.easeNone
});

new ScrollMagic.Scene({
  triggerElement: '#commercial',
  triggerHook: 'onEnter',
  offset: 200,
  duration: $('#commercial').height()/2

})
    .setTween(tweenx) // pins the element for the the scene's duration
    .addTo(controller) // assign the scene to the controller
    .addIndicators({zindex: 99999});

    var tweenz = TweenMax.to('#slogan-part-two', 1, {
      opacity: 0,
      ease: Linear.easeNone
    });

    new ScrollMagic.Scene({
      triggerElement: '#commercial',
      offset: $('#commercial').height()/2,
      duration: $('#commercial').height()/2
    })
        .setTween(tweenz) // pins the element for the the scene's duration
        .addTo(controller) // assign the scene to the controller
        .addIndicators({zindex: 99999});
