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
    // remove existing results
    $('a.l').remove();

    var q = encodeURIComponent($q.val());
    console.log(q);
    var params = {
      q: q
    };
    $body = $('body');
    $.get(search_url, params, function(data) {
      var links = JSON.parse(data);
      for (var i = 0, l = links.length; i < l; i++) {
        console.log(links[i]);
        var link = links[i];
        var page = '<a id="link' + i + '" class="l" href="' + link.url + '"><h3>' + link.title + '</h3><div class="url">' + link.url + '</div><iframe src="' + link.url + '" sandbox="allow-scripts" scrolling="no"></iframe></a>'
        $body.append(page);
      }
    });
  };
});

