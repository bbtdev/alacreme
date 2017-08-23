$(function() {
  //header
  controllerx = new ScrollMagic.Controller();
  window_height = $(window).height();
  var welcome_page =  $('.traditionale-page-wrapper')[0];
  var welcome_page_header = $('.produs-title')[0];
  var tween_welcome_page_header = createTweenMoveVerticalEaseNone(welcome_page_header, 1, 0, -50);
  var scene_welcome_page_header = createSceneWelcomePageHeader(welcome_page, welcome_page_header);

  scene_welcome_page_header
  .setTween(tween_welcome_page_header)
  .addTo(controllerx);

  $(window).on('resize', function() {
    if ($(window).height() !== window_height) {
      scene_welcome_page_header.offset($('#acasa').height()/2);
      scene_welcome_page_header.duration(50);
      window_height = $(window).height();
    }
  });

  var trad_magic_done = 0;
  var body_height = $('body').height();

  var controller;
  var $trigger_text;
  var change_overflow;
  var wipeAnimation_panels;
  var dur_panel_text = 200;
  var increment;
  var $panel_special = $($('.panel-text.special')[0]);
  var scenes;
  var scenes_count;
  var wipeAnimation_panels_scene;

  doMenu();

  if ($(window).width() >= 992) {
    traditionaleDoMagic();
    trad_magic_done = 1;

  }

  $(window).on('resize', function() {
    if (($(window).width() < 992) && (trad_magic_done === 1)) {
      traditionaleDestroyMagic();
      trad_magic_done = 0;
    } else if (($(window).width() >= 992) && (trad_magic_done === 0)) {
      traditionaleDoMagic();
      trad_magic_done = 1;
    } else if ((body_height !== $('body').height()) && (trad_magic_done === 1)) {
      traditionaleDestroyMagic();
      traditionaleDoMagic();

    }
  });

  function doMenu() {
    $($('.navbar-brand.md > img')[0]).on('click', function() {
      window.location.href = "index.html";
    });
    console.log('in');
    console.log($('a[href=#branzoaice]'));
    $('a[href=#branzoaice]').on('click', function(e) {
      console.log('x');
      e.preventDefault();
      $(window).scrollTo($('body').height()/2, {
        interrupt: true,
        duration: scrollFormula(),
        offset: 50,
        easing: 'easeOutExpo'
      });
    });
    $('a[href=#acasa]').on('click', function(e) {
      console.log($(document).height() - $('window').scrollTop());
      e.preventDefault();
      $(window).scrollTo('0', {
        interrupt: true,
        duration: scrollFormula(),
        offset: 50,
        easing: 'easeOutExpo'
      });
    });
    $('a[href=#contact]').on('click', function(e) {
      console.log('x');
      e.preventDefault();
      $(window).scrollTo($('body').height() * 6, {
        interrupt: true,
        duration: scrollFormula(),
        offset: 0,
        easing: 'easeOutExpo'
      });
    });

  }


  function traditionaleDoMagic() {

    scenes = new Array();
    scene_count = 0;


    body_height = $('body').height();
    controller = new ScrollMagic.Controller();

    $trigger_text = $('<div>');
    $($('body')[0]).append($trigger_text);
    $trigger_text.addClass('grid-row no-pointer');
    $trigger_text.css('position','absolute');
    $trigger_text.css('top','0');
    $trigger_text.css('width','50%');
    //$trigger_text.css('border','1px solid red');
    $trigger_text.height($('body').height() * 6);

    change_overflow = new TweenMax.set($(".traditionale-page-wrapper"),{ css: {'overflow' : 'hidden'}} );
    if ($(".traditionale-page-wrapper").css('overflow') === 'hidden') { //if tweenmax works
      $('.panels-wrapper').css('position', 'static'); //logical it should not work without, but it works without if you apply the height changes
      $('.panels-wrapper:not(.normal)').css('height', '0');
      $('.panel:not(.normal)').css('height', $('body').height());
    //  $('.contact-layer').css('top', $('body').height() * 5);
    }

    wipeAnimation_panels = new TimelineMax()
      .fromTo($(".panel.branzoaice")[0], 1, {y: "100%"}, {y: "0%", ease: Linear.easeNone})
      .fromTo($(".panel.cozonac")[0], 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})
      .fromTo($(".panel.pasca")[0], 1, {x: "100%"}, {x: "0%", ease: Linear.easeNone})
      .fromTo($(".panel.sfinti")[0],    1, {y:  "-100%"}, {y: "0%", ease: Linear.easeNone})  // in from right
      .fromTo($(".panel.normal")[0],    1, {y:  $('body').height()}, {y: $('body').height()-$($(".panel.normal")[0]).height(), ease: Linear.easeNone});  // in from right

    wipeAnimation_panels_scene = new ScrollMagic.Scene({
        triggerElement: $('.traditionale-page-wrapper')[0],
        triggerHook: "onLeave",
        duration: "500%"
      //  offset: $('body').height()
      })
      .setPin($('.traditionale-page-wrapper')[0])
      .setTween(wipeAnimation_panels)
  //  .addIndicators() // add indicators (requires plugin)
      .addTo(controller);

    increment = $('body').height();
    var off_panel_text = increment;
    $('.panel-text:not(.special)').each(function() {
    scenes[ scene_count++ ] =   new ScrollMagic.Scene({
          triggerElement: $trigger_text,
          triggerHook: "onEnter",
          offset: off_panel_text,
          duration: dur_panel_text
        })
        .setTween(new TweenMax.to(this, 1, {opacity: 1, ease: Linear.easeNone}))
      //  .addIndicators() // add indicators (requires plugin)
      //  .tweenChanges(true)
        .addTo(controller);
        off_panel_text += increment;
      if (!($(this).hasClass('last'))) {
          scenes[ scene_count++ ] = new ScrollMagic.Scene({
              triggerElement: $trigger_text,
              triggerHook: "onEnter",
              offset: off_panel_text,
              duration: dur_panel_text
            })
            .setTween(new TweenMax.to(this, 1, {opacity: 0, ease: Linear.easeNone}))
          //  .addIndicators() // add indicators (requires plugin)
          //  .tweenChanges(true)
            .addTo(controller);
      }
      TweenMax.set(this, {opacity: 0});

    });

    TweenMax.set($panel_special, {opacity: 0});
    scenes[ scene_count++ ] = new ScrollMagic.Scene({
        triggerElement: $trigger_text,
        triggerHook: "onEnter",
        offset: (off_panel_text - (increment)/2),
        duration: (increment)/2
      })
      .setTween(new TweenMax.to($panel_special, 1, {opacity: 1, ease: Linear.easeNone}))
    //  .addIndicators() // add indicators (requires plugin)
    //  .tweenChanges(true)
      .addTo(controller);

      scenes[ scene_count++ ] = new ScrollMagic.Scene({
          triggerElement: $trigger_text,
          triggerHook: "onEnter",
          offset: off_panel_text + $($(".panel.normal")[0]).height(),
          duration: $($(".panel.normal")[0]).height()
        })
        .setTween(new TweenMax.to($panel_special, 1, {opacity: 0, ease: Linear.easeNone}))
    //    .addIndicators() // add indicators (requires plugin)
      //  .tweenChanges(true)
        .addTo(controller);
      scenes[ scene_count++ ] = new ScrollMagic.Scene({
          triggerElement: $trigger_text,
          triggerHook: "onEnter",
          offset: off_panel_text + $($(".panel.normal")[0]).height(),
          duration: $($(".panel.normal")[0]).height()
        })
        .setTween(new TweenMax.to($('.panel-text.last'), 1, {opacity: 0, ease: Linear.easeNone}))
    //    .addIndicators() // add indicators (requires plugin)
      //  .tweenChanges(true)
        .addTo(controller);

  }

  function traditionaleDestroyMagic() {
    console.log('destroy');

   TweenMax.set($(".traditionale-page-wrapper"), {clearProps: "all"});



  //  console.log(TweenMax.getAllTweens());
    $.each(TweenMax.getAllTweens(), function() {
      var test = this;
      test.pause(0);
      test = null;
    });
    //needs killAll(false, true, false)

    /* //works like this
    TweenMax.set($(".timeline"), {clearProps: "all"});
  //  wipeAnimation_panels.pause(0);
  //  wipeAnimation_panels.clear();
    TweenMax.killAll(false,true,false);
    //wipeAnimation_panels.kill(); //not needed
*/  wipeAnimation_panels_scene.destroy(true);
    TweenMax.set($(".timeline"), {clearProps: "all"});
  //  wipeAnimation_panels.pause(0);
  //  wipeAnimation_panels.clear();
    TweenMax.killAll(false,true,false);
    //wipeAnimation_panels.kill(); //not needed


  //

    /*
    $('.timeline').each(function() {
      wipeAnimation_panels.set(this, { clearProps: "all" });
    });
    var tl = TimelineLite.exportRoot();
    tl.pause(0);
    wipeAnimation_panels.kill();
    wipeAnimation_panels_scene.destroy(true);
    */

    change_overflow = null;
    wipeAnimation_panels = null;
  //  wipeAnimation_panels_scene.destroy(true);


    $('.panels-wrapper').css('position', 'relative'); //logical it should not work without, but it works without if you apply the height changes
    $('.timeline').css('position', 'relative');
    $('.panels-wrapper:not(.normal)').css('height', '100%');
    $('.panel:not(.normal)').css('height', '100%');
    $trigger_text.remove();
    $.each(scenes, function() {
      this.destroy(true);
    });
    controller = controller.destroy( true );
    controller = null;

    $('.tweenmax').css('opacity', '1');
  }
















/*

  var wipeAnimation_panelstext = new TweenMax.fromTo($(".panel-text.branzoaice")[0], 1, {opacity: 0}, {opacity: 1, ease: Linear.easeNone});








      var app_o = $('body').height();
      var app_d =  200;

      var diss_o = $('body').height() * 2 -200;
      var diss_d =  200;



      new ScrollMagic.Scene({
          triggerElement: $trigger_text,
          triggerHook: "onEnter",
          offset: diss_o,
          duration: diss_d
        })
        .setTween(new TweenMax.fromTo($(".panel-text.branzoaice")[0], 1, {opacity: 1}, {opacity: 0, ease: Linear.easeNone}))
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);




        new ScrollMagic.Scene({
            triggerElement: $trigger_text,
            triggerHook: "onEnter",
            offset: app_o,
            duration: app_d
          })
          .setTween(wipeAnimation_panelstext)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);

       TweenMax.set($(".panel-text.branzoaice")[0], {opacity: 0});

*/

});
