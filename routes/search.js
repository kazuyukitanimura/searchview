/*
 * GET search page.
 */

var request = require('request');
var cheerio = require('cheerio');
var parse = require('cheerio/lib/parse');
var updateDOM = parse.update;
var reqobj = {
  method: 'GET',
  encoding: null,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
    'dnt': '1'
  },
  uri: 'http://www.google.com/search?q='
};
var cache = {} // for test

exports.index = function(req, res) {
  console.log(req.query.q);
  reqobj.uri += req.query.q;
  var clientRes = res;

  if(cache[req.query.q]){
    clientRes.send(JSON.stringify(cache[req.query.q]));
  }
  // TODO make request stereaming
  request(reqobj, function(err, res, body) {
    if (err || res.statusCode != 200) {
      console.error('error happened', err, res);
    } else {
      var $ = cheerio.load(body.toString());

      var $links = $('a.l');
      var result = $links.map(function(i, link) {
        return {
          title: $(link).html(),
          url: $(link).attr('href')
        };
      });
      cache[req.query.q] = result;
      clientRes.send(JSON.stringify(result));
    }
  });
};

