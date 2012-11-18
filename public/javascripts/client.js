$(function() {
  var base_url = 'http://www.google.com/#hl=en';
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
    $.get(base_url, params, function(data) {
      console.log(data);
    });
  };
});

