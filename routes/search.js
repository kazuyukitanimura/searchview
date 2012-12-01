/*
 * GET search page.
 */

var WebKit = require('webkit-server');
var fs = require('fs');
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
  }
};
var base_url = 'http://www.google.com/search?q=';

exports.index = function(req, res) {
  console.log(req.query.q);
  reqobj.uri = base_url + req.query.q;
  var clientRes = res;

  // TODO make request stereaming
  request(reqobj, function(err, res, body) {
    if (err || res.statusCode != 200) {
      console.error('error happened', err, res);
    } else {
      var $ = cheerio.load(body.toString());

      var $links = $('a.l');
      var result = [];
      $links.each(function(i, link) {
        var $link = $(link);
        var href = $link.attr('href');
        new WebKit.Browser(function() {
          this.visit(href, function(err) {
            if (err) {
              console.error(err);
            } else {
              this.highlightRender(800, 600, decodeURIComponent(req.query.q), function(err, data) {
                if (err) {
                  console.error(err);
                } else {
                  result.push({
                    i: i,
                    title: $link.html(),
                    url: href,
                    image: data
                  });
                  if(result.length === $links.length){
                    clientRes.send(JSON.stringify(result));
                  }
                  this.stop();
                }
              });
            }
          });
        });
      });
    }
  });
};

