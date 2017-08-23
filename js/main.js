var controller = new ScrollMagic.Controller();
$(function() {
  colorNavbar();
  navUlFix();
  sloganMagic();






  function sloganMagic() {
    var window_height = $(window).height();
    var window_width = $(window).width();

    var slogan_first = $('.slogan-split')[0];
    var slogan_last = $('.slogan-split')[1];



    console.log('test');
  //  $(slogan_first).css({transform:"none"});


    console.log($(slogan_first).css('-webkit-transform'));
    console.log($(slogan_first).position());

    var slogan_first_parent = $(slogan_first).parent();
    var slogan_last_parent = $(slogan_last).parent();

    //slogan_first_parent.css('display', 'block');

    var tween_slogan_first;
    var scene_slogan_first;

    var tween_slogan_last;
    var scene_slogan_last;

    createSloganMagic();


    $(window).on('resize', function() {
    //  if (window_height !== $(window).height()) {
        window_height = $(window).height();
        window_width = $(window).width();

        clearMagic(tween_slogan_first, slogan_first, scene_slogan_first);
        clearMagic(tween_slogan_last, slogan_last, scene_slogan_last);

        createSloganMagic();
  //    }
    });


    function createSloganMagic() {

      //  tween_slogan_first = createTweenMoveVerticalEaseNone(slogan_first, 1, 0, $(slogan_last).parent().height());
      //  scene_slogan_first = createScene($('#acasa'), 'onCenter', $(window).height()/2, $(window).height()/2, true, tween_slogan_first, false);
      //  scene_slogan_first.addTo(controller);
    //  tween_slogan_first = createTweenMoveFromToOpacity(slogan_first, 1, 0, -$(slogan_first).width()/2, $(slogan_first).parent().height()/2, -$(slogan_first).width()/2, 1, 0);
/*
      tween_slogan_first = TweenMax.to(slogan_first, 1, {
        opacity: 0,
        ease: Linear.easeNone
      }); */
      tween_slogan_first = TweenMax.to(slogan_first, 1, {
        opacity: 0,
        ease: Linear.easeNone
      });
      scene_slogan_first = createScene($('#acasa'), 'onCenter', $(window).height()/2, $(window).height()/4, true, tween_slogan_first, false);
      scene_slogan_first.addTo(controller);

    //  tween_slogan_last = createTweenMoveVerticalFromToOpacity(slogan_last, 1,  -$(slogan_last).parent().height()/2, -$(slogan_last).height()/2, 0, 1);
    //  tween_slogan_last = createTweenMoveFromToOpacity(slogan_last, 1, -$(slogan_last).parent().height()/2, -$(slogan_last).width()/2, -$(slogan_last).height()/2, -$(slogan_last).width()/2, 0,1);
    // scene_slogan_last = createScene($(slogan_last).parent(), 'onCenter', 0, $(slogan_last).parent().height()/2, true, tween_slogan_last, false);
        tween_slogan_last = TweenMax.to(slogan_last, 1, {
          opacity: 0,
          ease: Linear.easeNone
        });
      scene_slogan_last = createScene($(slogan_last).parent(), 'onCenter', $(slogan_last).parent().height()/2, $(slogan_last).parent().height()/2, true, tween_slogan_last, false);
      scene_slogan_last.addTo(controller);
    }
  }

  function navUlFix() {
    console.log('in');
    var nav_fix_done = 0;
    var nav_ul = $('ul.nav.navbar-nav')[0];
    var tween_nav_ul;
    var scene_nav_ul;
    if ($(window).width() > collapse_breakpoint) {
      tween_nav_ul = createTweenMarginTopFromTo(nav_ul, 1, 40, 0);
      scene_nav_ul = createScene($('#slogan-activitate'), 'onLeave', 0, $('#slogan-activitate').height(), true, tween_nav_ul, false);
      scene_nav_ul
      .addTo(controller);
      nav_fix_done = 1;
          console.log('inx');
    }
    $(window).on('resize', function() {
      if (($(window).width() > collapse_breakpoint) && (nav_fix_done === 0)) {
        tween_nav_ul = createTweenMarginTopFromTo(nav_ul, 1, 40, 0);
        scene_nav_ul = createScene($('#slogan-activitate'), 'onLeave', 0, $('#slogan-activitate').height(), true, tween_nav_ul, false);
        scene_nav_ul
        .addTo(controller);
        nav_fix_done = 1;
      }
      else if (($(window).width() <= collapse_breakpoint) && (nav_fix_done === 1)) {
        clearMagic(tween_nav_ul, nav_ul, scene_nav_ul);
        nav_fix_done = 0;
      }
    });
  }
});
