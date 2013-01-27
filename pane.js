var Pane = require('Pane');
var fs = require('fs');

var opt = {
  url: 'http://nodejs.org'
};

var pane = new Pane(opt);

pane.on('console', function(msg, line, src) {
  console.log(msg, line, src);
});

pane.on('loaded', function(succ) {
  pane.markWordsTest();
  var imageBuf = pane.screenshot('node event-driven');
  fs.writeFile('test0.png', imageBuf, function(error) {
    if (error) {
      console.error(error);
    }
    process.exit();
  });
});

