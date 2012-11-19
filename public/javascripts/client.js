$(function() {
  var search_url = 'search';
  var self = this;
  var $q = $('input#q').focus();
  var maxPosition = 9;
  var topPosition = - 1;
  //var position = topPosition;
  var baseLinkId = 'link';
  var scrollDone = true;

  $q.keydown(function(e) {
    var keyCode = (e.keyCode || e.which);
    if (keyCode === 13) { // return key
      self.request();
      $q.blur();
      e.preventDefault();
    }
  });

  self.request = function() {
    // clean up old results
    $('a.l').remove();
    location.hash = '';

    var q = encodeURIComponent($q.val());
    console.log(q);
    var params = {
      q: q
    };
    $body = $('body');
    $.get(search_url, params, function(data) {
      var links = JSON.parse(data);
      maxPosition = links.length;
      for (var i = 0; i < maxPosition; i++) {
        var link = links[i];
        var page = '<a id="' + baseLinkId + i + '" class="l" target="_blank" href="' + link.url + '"><h3>' + link.title + '</h3><div class="url">' + link.url + '</div><iframe src="' + link.url + '" sandbox scrolling="no"></iframe></a>';
        $body.append(page);
      }
      $('a.l').waypoint(function(e, direction) {
        location.hash = $(this).attr('id');
      });
    });
  };

  var smoothScroll = function(scrollAmount) {
    if (!scrollDone) {
      // too busy!
      return;
    } else {
      scrollDone = false;
    }
    var position = parseInt(location.hash.replace('#' + baseLinkId, ''), 10);
    if (isNaN(position)) {
      position = topPosition;
    }
    position = Math.max(topPosition, Math.min(maxPosition, position + scrollAmount));
    if (position < 0) {
      $('html,body').animate({
        scrollTop: 0
      },
      150, 'easeOutQuad', function() {
        location.hash = '';
        setTimeout(function(){scrollDone = true;}, 900);
      });
    } else {
      var $targetOffset = $('#' + baseLinkId + position).offset();
      if ($targetOffset) {
        $('html,body').animate({
          scrollTop: $targetOffset.top
        },
        350, 'easeOutQuad', function() {
          location.hash = baseLinkId + position;
          setTimeout(function(){scrollDone = true;}, 900);
        });
      }
    }
  };

  $('h1').waypoint(function(e, direction) {
    location.hash = '';
  });

  $('body').keydown(function(e) {
    var keyCode = (e.keyCode || e.which);
    //if (keyCode === 37 || keyCode === 38 || (keyCode === 9 && keyCode === 32)) { // left arrow, up arrow, shift+space
    if (keyCode === 38) { // up arrow
      smoothScroll( - 1); // scroll up
      e.preventDefault();
      //} else if (keyCode === 39 || keyCode === 40 || keyCode === 32) { // right arrow, down arrow, space
    } else if (keyCode === 40) { // down arrow
      smoothScroll(1); // scroll down
      e.preventDefault();
    }
  });

  //var lastDelta = 0;
  $(window).on('DOMMouseScroll mousewheel', function(e) {
    // http://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers/5542105#5542105
    e = e.originalEvent;
    //var delta = 0;
    //var w = e.wheelDelta;
    //var d = e.detail;
    //if (d) {
    //  if (w) {
    //    delta = w / d / 40 * d > 0 ? 1: - 1; // Opera
    //  } else {
    //    delta = - d / 3; // Firefox;         TODO: do not /3 for OS X
    //  }
    //} else {
    //  delta = w / 120; // IE/Safari/Chrome TODO: /3 for Chrome OS X
    //}
    //if (lastDelta < delta) {
    //  scrollDone = true;
    //}
    //lastDelta = delta;

    var direction = (e.detail < 0 || e.wheelDelta > 0) ? - 1: 1;
    smoothScroll(direction);
    e.preventDefault();
    e.returnValue = false;
  });
});

