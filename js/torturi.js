$(function() {
  var torturi;

  $('#lista-torturi').perfectScrollbar();

  $.getJSON('data/torturi.json')
  .done(function(data) {
    torturi = data;
    initMagic();
    minigalerii();
    processJSON();
    initDatabaseUI();
  })
  .fail(function() {
    initMagic();
    minigalerii();
    initDatabaseUI();
    failedDb();
  });

  function minigalerii() {
    $('.minigalerii').on('click touchend', function(e) {
      e.preventDefault();
      $(this).find('.poster').fadeOut(function() {
          $(this).parent().find('[class ^= "minigalerie-item"]').fadeIn();
      });
      $(this).off('click');

    })
  }

  function processJSON() {
    $.each(torturi, function(key) {
      $.each(torturi[key], function(val) {
        var item = torturi[key][val];
        var $tort = $('<div/>');
        $tort.addClass('lista-torturi-item');
        $tort.addClass(key);
        if (item.special !== '') {
          $tort.addClass(item.special);
        }
        if (item.info === '') {
          $tort.append($('<h3 class = "tort-nume">' + item.nume + '</h3>'));
        }
        else {
          $tort.append($('<h3 class = "tort-nume">' + item.nume + '<small class = "tort-info"> ' + item.info +'</small></h3>'));
        }
        $tort.append($('<p class = "tort-continut">' + item.continut + '</p>'));
        $tort.append($('<p class = "tort-descriere">' + item.descriere + '</p>'));
        $tort.append($('<p class = "tort-pret">' + item.pret + '<span>lei/kg</span></p>'));

        item.filtru += ' ' + item.nume + ' ' + item.info + ' ' + item.continut + ' ' + item.descriere + ' ' + item.pret + item.special;

        item.filtru = replaceDiacritice(item.filtru.toLowerCase());
        $tort.attr('data-filtru', item.filtru);

        $('#lista-torturi').append($tort);
      });
    });

  }
  function initDatabaseUI() {
    var categorie_selectata = 'torturi-standard';
    $('.' + categorie_selectata).addClass('show-category');
    var $nav_categorii_torturi = $('.categorie-torturi');
    setupSubcategoriiProduse(categorie_selectata, '#nav-subcategorii-torturi', '#subcategorie-produse-btn-toate', '.subcategorie-produse-btn-data', '#subcategorii-produse-header', '.subcategorie-produse-btn');
    var keywords = new Array();
    filterSearch(keywords, categorie_selectata);
    add_highlights(categorie_selectata);

    $nav_categorii_torturi.on('click', function(e) { //selectare categorie
      e.preventDefault();
      if (categorie_selectata === this.id) {
        return;
      }
      else {
        $('#' + categorie_selectata).removeClass('active');
        $(this).addClass('active');
        $('.' + categorie_selectata).removeClass('show-category');
        categorie_selectata = this.id;
        $('.' + categorie_selectata).addClass('show-category');
        filterSearch(keywords, categorie_selectata);
        setupSubcategoriiProduse(categorie_selectata, '#nav-subcategorii-torturi', '#subcategorie-produse-btn-toate', '.subcategorie-produse-btn-data', '#subcategorii-produse-header', '.subcategorie-produse-btn');
        add_highlights(categorie_selectata);
      }
    });

    var keywords = new Array();
    $('#filtru-search-form').on('submit', function(e) {
      e.preventDefault();
    });

    $('#filtru-search').on('input', function(e) {
      e.preventDefault();
      var input = $(this).val();
      input = replaceDiacritice(input.toLowerCase());
      input = input.replace(/[\W_]+/g," ");
      keywords = input.split(' ');
      filterSearch(keywords, categorie_selectata);
    });

    $('.subcategorie-produse-btn').on('click', function(e) {
      e.preventDefault();
      setupSubcategoriiProduseClickEvent(this, '.subcategorie-produse-btn', '#subcategorie-produse-btn-toate', categorie_selectata);
    });
  }

  function initMagic() {
    var magic_done = 0;
    var $minigalerie_gradina = $('#minigalerie-gradina');
    var $minigalerie_fabrica = $('#minigalerie-fabrica');
    var tween_minigalerie_gradina;
    var tween_minigalerie_fabrica;
    var scene_minigalerie_gradina;
    var scene_minigalerie_fabrica;
    if ($(window).width() >= 992) {
      createMagic();
      magic_done = 1;
    }

    $(window).on('resize', function() {
      if (($(window).width() < 992) && (magic_done === 1)) {
        tween_minigalerie_gradina.pause(0);
        TweenMax.set($minigalerie_gradina, {clearProps:"all"});
        tween_minigalerie_gradina = null;
        tween_minigalerie_fabrica.pause(0);
        TweenMax.set($minigalerie_fabrica, {clearProps:"all"});
        tween_minigalerie_fabrica = null;

        scene_minigalerie_gradina.destroy(true);
        scene_minigalerie_fabrica.destroy(true);

        scene_minigalerie_gradina = null;
        scene_minigalerie_fabrica = null;

        magic_done = 0;
      } else if (($(window).width() >= 992) && (magic_done === 0)) {
        createMagic();
        magic_done = 1;
      }
    });

    function createMagic() {
      tween_minigalerie_gradina = createTweenMoveVerticalFromTo($minigalerie_gradina, 1, $(window).height()/5, 0);
      tween_minigalerie_fabrica = createTweenMoveVerticalFromTo($minigalerie_fabrica, 0.6,  80, 0);
      scene_minigalerie_gradina = createScene($minigalerie_gradina, 'onEnter', 50, 0, true, tween_minigalerie_gradina, true);
      scene_minigalerie_fabrica = createScene($minigalerie_gradina, 'onCenter', $minigalerie_gradina.height()/2, 0, true, tween_minigalerie_fabrica, true);
      controller.addScene(scene_minigalerie_gradina);
      controller.addScene(scene_minigalerie_fabrica);
    }
  }

  function failedDb() {
    $('#lista-torturi').html($('<p>Error: Failed to load Database</p>'));
  }
});
