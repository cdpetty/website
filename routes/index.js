
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('front_page');
};

exports.posts =  function(req,res){
  res.render('posts_page');
};

exports.about = function(req,res){
  res.render('about_page');
};

exports.projects = function(req,res){
  res.render('projects_page');
};

exports.clayton = function(req,res){
  res.render('clayton_page');
};