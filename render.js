var WebKit = require('webkit-server');
var fs = require('fs');

new WebKit.Browser(function() {
  //this.setHtml('<!DOCTYPE html><html><head></head><body><h1>Hello, World!</h1></body></html>', function(error) {
  this.visit('http://www.google.com', function(error) {
    if (error) {
      console.error(error);
      this.stop();
    } else {
      this.highlightRender(800, 600, 'google search', function(error, data) {
        if (error) {
          console.error(error);
        } else {
          var self = this;
          var decodedImage = new Buffer(data, 'base64');
          fs.writeFile('test.png', decodedImage, function(error) {
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

