
/*
 * GET home page.
 */
var storage = require('../storage'),
    fs = require('fs');


exports.index = function(req, res){
    res.render('front_page');
};

exports.posts =  function(req,res){
    storage.get_posts(true, function(err, posts, json){
        //console.log('THESE ARE THE POSTS:', posts);
        if (err) res.send('Error:' + err);
        res.render('posts_page', { posts: posts });
    });
};

exports.links =  function(req,res){
    storage.get_links(function(err, links){
        console.log('THESE ARE THE LINKS:', links);
        if (err) res.send('Error:' + err);
        res.render('links_page', { links: links });
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
        //console.log('Posts:', post);
        if (err) res.send(err);
        else{
            // console.log(post);
            // res.json(post);
            // console.log(unescape(post.body));
            // post.time = post.time.toDateString();
            res.render('post_page', post);
            // res.render('post_page', {title: post.title, description:post.description, body: post.body, time: post.time });
            // console.log('Post title:', post.title);
            // console.log('apple');
            // res.render('post_page', {title: post.title, description:post.description, body: markdown.toHTML(post.body), time: post.time });
            // res.render('post_page', {title: post.title, description:post.description, body: marked(post.body), time: post.time });
            // res.send('apple');
            // marked(post.body, function (err, content) {
            //   if (err) throw err;
            //   res.render('post_page', {title: post.title, description:post.description, body: content, time: post.time });
            // });
        }
    });
};

exports.create_post = function(req, res){
    res.render('create_post');
};

exports.create_post_post = function(req, res){
    fs.readFile('.password.txt', 'utf8', function(err, password){
        password = password.trim();
        // console.log('Password:', password, '<');
        // console.log('Needed Password:', password, '<');
        // console.log('Received Password:', req.body.password, '<');
        if (req.body.password === password){
            var storage = require('../storage'),
            fs = require('fs');
            if (req.files.body && req.body.title && req.body.description){
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
            } else if (req.body.delete){
                storage.delete_post(req.body.delete, function(err){
                    if (err) res.send('Error deleting post:' + err);
                    else res.send('Post: ' + req.body.delete + ' deleted.')
                });
            }
        }
        else{
            res.send('Password: ' + req.body.password + ' was incorrect.');
        }

    });
}

exports.create_link = function(req, res){
    res.render('create_link');
};

exports.create_link_post = function(req, res){
    fs.readFile('.password.txt', 'utf8', function(err, password){
        password = password.trim();
        // console.log('Password:', password, '<');
        // console.log('Needed Password:', password, '<');
        // console.log('Received Password:', req.body.password, '<');
        if (req.body.password === password){
            var storage = require('../storage');
            if (req.body.title && req.body.description && req.body.link){
                storage.save_link(req.body.title, req.body.description, req.body.link, function(err){
                    console.log('Title:', req.body.title, 'Desc', req.body.description, 'link:', req.body.link);
                    if (err){
                        res.send('Error saving link: ' + err);
                    }
                    else{
                        res.send('Link saved: ' + req.body.title);
                    }
                });
            }
        } else{
            res.send('Password: ' + req.body.password + ' was incorrect.');
        }

    });
}
