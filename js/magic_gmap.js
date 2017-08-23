$(function() {
  var $detalii = $('#detalii');
  var $map = $('#map');
  var tween_detalii;
  var scene_detalii;
  var magic_done = 0;



  if ($(window).width() >= 1139) {
     gmap_magic();
  }

  $(window).resize(function() {
    if (($(window).width() >= 1139) && (magic_done === 0)) {
      gmap_magic()
    }
    else if (($(window).width() < 1139) && (magic_done === 1)) {
      clearMagic(tween_detalii, $detalii, scene_detalii);
      magic_done = 0;
    }
  });

  function gmap_magic() {
    magic_done = 1;
    tween_detalii = createTweenMoveVerticalFromTo($detalii, 0.8, 200, -40);
    scene_detalii = createScene($map, 'onCenter', 0, 0, true, tween_detalii, true);
    scene_detalii.addTo(controller);
  }
});
