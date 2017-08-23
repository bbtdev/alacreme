var controller = new ScrollMagic.Controller();

$(function() {
  window_height = $(window).height();
  var welcome_page = $('.produs-welcome-page')[0];
  var welcome_page_header = $(welcome_page).children('header')[0];
  var tween_welcome_page_header = createTweenMoveVerticalEaseNone(welcome_page_header, 1, 0, -50);
  var scene_welcome_page_header = createSceneWelcomePageHeader(welcome_page, welcome_page_header);

  scene_welcome_page_header
  .setTween(tween_welcome_page_header)
  .addTo(controller);


  $(window).on('resize', function() {
    if ($(window).height() !== window_height) {
      scene_welcome_page_header.offset($(welcome_page).height()/2);
      scene_welcome_page_header.duration(50);
      window_height = $(window).height();
    }
  });

});
