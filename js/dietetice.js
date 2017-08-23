$(function() {
  var $despre = $('#dietetice-despre');
  var tween_despre;
  var scene_despre;

  var $briose = $('#dietetice-biobrio');
  var tween_briose;
  var scene_briose;

  var $saratele = $('#dietetice-saratele-nesarate');
  var tween_saratele;
  var scene_saratele;

  despreMagic();
  magic();
  function despreMagic() {
    var despre_magic_done = 0;
    if ($(window).width() >= 992) {
      createDespreMagic();
      despre_magic_done = 1;
    }


    $(window).on('resize', function() {
      if (($(window).width() < 992) && (despre_magic_done === 1)) {
        clearMagic(tween_despre, $despre, scene_despre);
        despre_magic_done = 0;
      } else if (($(window).width() >= 992) && (despre_magic_done === 0)) {
        createDespreMagic();
        despre_magic_done  = 1;
      }
    });


    function createDespreMagic() {
      tween_despre = createTweenMoveVerticalTo($despre, 0.5, -100);
      scene_despre = createScene($('.produs-welcome-page')[0], 'onEnter', $($('.produs-welcome-page')[0]).height() + 10, 0, false, tween_despre, true);
      controller.addScene(scene_despre);
    }
  }

  function magic() {

    var magic_done = 0;
    if ($(window).width() >= 1200) {
      createMagic();
      magic_done = 1;
    }
    $(window).on('resize', function() {
      if (($(window).width() < 1200) && (magic_done === 1)) {
        clearMagic(tween_briose, $briose, scene_briose);
        clearMagic(tween_saratele, $saratele, scene_saratele);
        magic_done = 0;
      } else if (($(window).width() >= 1200) && (magic_done === 0)) {
        createMagic();
        magic_done  = 1;
      }
    });


    function createMagic() {
      tween_briose = createTweenMoveVerticalTo($briose, 1, -120);
      scene_briose = createScene($despre, 'onCenter', $despre.height()/2, 0, false, tween_briose, true);
      controller.addScene(scene_briose);

      tween_saratele = createTweenMoveVerticalTo($saratele, 1.5, 120);
      scene_saratele = createScene($briose, 'onCenter', 0, 0, false, tween_saratele, true);
      controller.addScene(scene_saratele);
    }
  }

  function clearMagic(tween, element, scene) {
    tween.pause(0);
    TweenMax.set(element, {clearProps:"all"});
    tween = null;
    scene.destroy(true);
    scene = null;
  }


});
