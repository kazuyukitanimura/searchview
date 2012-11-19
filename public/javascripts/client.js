$(function() {
  var search_url = 'search';
  var self = this;
  var $q = $('input#q').focus();
  var maxPosition = 9;
  var baseLinkId = 'link';

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
    console.log(location.hash);
    var position = parseInt(location.hash.replace('#' + baseLinkId, ''), 10);
    console.log(position);
    if (isNaN(position)) {
      position = - 1;
    }
    position += scrollAmount;
    if (position < 0) {
      $('html,body').animate({
        scrollTop: 0
      },
      150, 'easeOutQuad', function() {});
    } else {
      $target = $('#' + baseLinkId + position);
      if ($target) {
        var $targetOffset = $target.offset().top;
        $('html,body').animate({
          scrollTop: $targetOffset
        },
        350, 'easeOutQuad', function() {
          location.hash = baseLinkId + position;
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

});

