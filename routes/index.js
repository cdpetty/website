
/*
 * GET home page.
 */
var storage = require('../storage'),
    markdown = require('markdown').markdown;

exports.index = function(req, res){
  res.render('front_page');
};

exports.posts =  function(req,res){
  storage.get_posts(function(err, posts){
    console.log('HEREERERERE');
    if (err) res.send(err);
    res.render('posts_page', { posts: posts });
  });
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

exports.post = function(req,res){
  var post_name = req.params.post_name; 
  storage.get_post(post_name, function(err, post){
    if (err) res.send(err);
    res.render('post_page', {title: post.title, description:post.description, body: markdown.toHTML(post.body)});
  });
};

exports.create_post = function(req, res){
  res.render('create_post');
};

exports.create_post_post = function(req, res){
  if (req.files.body && req.body.title && req.body.description && req.body.password){
    if (req.body.password == 'pass'){
      var storage = require('../storage'),
        fs = require('fs');
      fs.readFile(req.files.body.path, function (err, data) {
        if (err){
          res.send('Error reading file from user: ' + err);
        }
        else{
          storage.save_post(req.body.title, req.body.description, data.toString(), function(err){
            if (err){
              res.send('Error saving post: ' + err);
            }
            else{
              res.send('Post saved: ' + req.body.title);
            }
          });
        }
      });
    }
    else{
      res.send('Password: ' + req.body.password + ' was incorrect.');
    }
  }
};
