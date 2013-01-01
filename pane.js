var Pane = require('Pane');

var opt = {
  title: 'Test',
  height: 500,
  width: 800,
  url: 'http://nodejs.org'
};

var window = new Pane(opt);

window.on('console', function(msg, line, src) {
  console.log(msg, line, src);
});

window.on('loaded', function(succ) {
  window.screenshot(__dirname + '/test.png');
  process.exit();
});

