var WebKit = require('webkit-server');
var fs = require('fs');

new WebKit.Browser(function() {
  //this.setHtml('<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1></body></html>', function(error) {
  this.visit('http://www.nodejs.org', function(error) {
    if (error) {
      console.error(error);
      this.stop();
    } else {
      this.highlightRender('http://www.nodejs.org', 985, 'node event-driven', function(error, data) {
        if (error) {
          console.error(error);
        } else {
          var self = this;
          var decodedImage = new Buffer(data, 'base64');
          fs.writeFile('test0.png', decodedImage, function(error) {
            if (error) {
              console.error(error);
            }
            self.stop();
          });
        }
      });
    }
  });
});

