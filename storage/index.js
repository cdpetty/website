var fs = require('fs'),
    path = require('path');

exports.get_posts = function(callback){
  fs.readFile('./storage/store/posts.txt', 'utf-8', function(err, data){
    if (err){ 
      callback(err, null);
    }
    else{
      console.log('IT WORKED');
      if (data){
        var to_be_transmitted = JSON.parse(data);
        callback(null, to_be_transmitted);
      }
      else{
        callback(null, {}); 
      }
    }
  });
};

/*exports.get_post = function (title, callback){
  exports.get_posts(function(err, posts){
    callback(null, posts[title]);
  });

}*/

/*exports.save_post = function(title, description, body, callback){
  exports.get_posts(function(err, posts){
    if (!posts) posts = {};
    posts[title] = {'title': title, 'description': description, 'body':body, 'date':new Date()};
    fs.unlink(path.resolve('./storage/store/posts.txt'), function(err){
      if (err)
      callback(err);
      else{
        fs.writeFile(path.resolve('./storage/store/posts.txt'), JSON.stringify(posts), function(err){
          callback(err); 
        });
      }
    });

  });
}
*/
