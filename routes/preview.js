/*
 * GET preview png.
 */

var WebKit = require('webkit-server');

exports.index = function(req, res) {
  new WebKit.Browser(function() {
    this.visit(decodeURIComponent(req.query.url.replace(/(\.png)?$/, '')), function(error) {
      if (error) {
        console.error(error);
        this.stop();
      } else {
        // 985 is the default page width number used by Apple
        this.highlightRender(985, decodeURIComponent(req.query.q), function(error, data) {
          if (error) {
            console.error(error);
          } else {
            var self = this;
            // TODO make this streaming
            var decodedImage = new Buffer(data, 'base64');
            res.end(decodedImage);
            res.on('close', function() {
              self.stop();
            });
          }
        });
      }
    });
  });
};

