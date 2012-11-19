$(function() {
  var search_url = 'search';
  var self = this;
  var $q = $('input#q');

  $q.keydown(function(e) {
    if ((e.keyCode || e.which) === 13) { // return key
      self.request();
      e.preventDefault();
    }
  });

  self.request = function() {
    var q = encodeURIComponent($q.val());
    console.log(q);
    var params = {
      q: q
    };
    $.get(search_url, params, function(data) {
      var links = JSON.parse(data);
      for (var i = 0, l = links.length; i < l; i++) {
        console.log(links[i]);
      }
    });
  };
});

