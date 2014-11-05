var fs = require('fs'),
    path = require('path');
exports.get_posts = function(callback){
  fs.readFile('./storage/store/posts.txt', /*{encoding: 'utf-8'},*/ function(err, data){
    if (err) callback(err);
    else{
      callback(null, JSON.parse(data.toString()));
    }

  });
};

exports.get_post = function (title, callback){
  exports.get_posts(function(err, posts){
    callback(null, posts[title]);
  });

}

exports.save_post = function(title, description, body, callback){
  exports.get_posts(function(err, posts){
    if (!posts) posts = {};
    posts[title] = {'title': title, 'description': description, 'body':body};
    fs.unlink(path.resolve('./storage/store/posts.txt'), function(err){
      if (err) callback(err);
      else
      console.log(path.resolve('./storage/store/posts.txt'));
      fs.writeFile(path.resolve('./storage/store/posts.txt'), JSON.stringify(posts), function(err){
        callback(err); 
      }) 
    });

  })
}

