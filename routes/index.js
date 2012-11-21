
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Searchview', description: 'Searchview (SV) is an experimental search engine frontend. SV makes the web more accessible, more understandable, and even more transparent.' });
};
