/*
 * GET preview png.
 */

var Pane = require('Pane');

exports.index = function(req, res) {
  var opt = {
    url: decodeURIComponent(req.query.url.replace(/(\.png)?$/, ''))
  };
  var pane = new Pane(opt);

  pane.on('console', function(msg, line, src) {
    console.log(msg, line, src);
  });
  pane.on('loaded', function(succ) {
    if (succ) {
      var imageBuf = pane.screenshot(decodeURIComponent(req.query.q));
      res.end(imageBuf);
    } else {
      res.end();
    }
  });
};

