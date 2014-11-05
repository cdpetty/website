var fs = require('fs'),
    path = require('path');

exports.get_posts = function(callback){
  fs.readFile('./store/posts.txt', function (err, data) {
    if (err) callback(err, null);
    else if (data) callback(null, JSON.parse(data));
    else callback(null, null);
  });
};

exports.get_post = function(title, callback){
  var file_path = path.join('./store', title);
  fs.exists(file_path, function(exists){
    if (exists){
      fs.readFile(file_path, function (err, data) {
        if (err) callback(err);
        else callback(null, JSON.parse(data));
      });
    }
    else{
      callback('Error: post does not exist');
    }
  });

};

exports.save_post = function(title, description, body, callback){
  var file_path = path.resolve('./storage/store', title);
  var general_posts_path = path.resolve('./storage/store', 'posts.txt');
  var post_object = { title: title, description: description, body: body, date: new Date() }
  fs.exists(file_path, function(exists){
    if (exists){
      callback('Error: post already exists');
    }
    else{
      fs.writeFile(file_path, JSON.stringify(post_object), function(err){
        if (err) callback(err);
        else{
          fs.open(general_posts_path, 'r', function(err, fd){
            var data = fd.read();
            console.log('This is the data: ' + data)
            var current_files = JSON.parse(data);
            current_files[title] = {'title': title, 'description': description, 'date': new Date(Date.now())};
            fs.writeFile(general_posts_path, JSON.stringify(current_files), function(err){
              callback(err);
            });
          });
        }
      });
    }
  });
};

exports.delete_post = function(title, callback){
  var file_path = path.join('./store', title);
  var general_posts_path = path.resolve('./store', 'posts.txt');
  fs.exists(file_path, function(exists){
    if (exists){
      fs.unlink(file_path, callback);
      var posts_json = exports.get_posts();
      delete posts_json[title];
      fs.writeFile(general_posts_path, JSON.stringify(posts_json), function(err){
        callback(err);
      });
    }
    else{
      callback('Error: File does not exist');
    }
  });
};

exports.edit_post = function(title, edit_item, replacement, callback){
  if (edit_item === 'title'){

  }
  else if (edit_item === 'description'){

  }
  else if (edit_item === 'body'){

  }
};
