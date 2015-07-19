var jsonfile = require('jsonfile'),
    path = require('path'),
    marked = require('marked'),
    jsesc = require('jsesc');

// marked.setOptions({
//   highlight: function (code) {
//     return highlight.highlightAuto(code).value;
//   }
// });

marked.setOptions({
  highlight: function (code, lang, callback) {
    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

var postsPath = path.join(__dirname, 'store/posts.txt');

exports.get_posts = function(short, callback){
    jsonfile.readFile(postsPath, function(err, j){
        if (err){
            return callback(err);
        } else{
            var json = j;
            Object.keys(json).forEach(function(key){
                if (short) delete json[key].body;
                // var dateObj = new Date(json[key].time);
                // delete json[key].time;
                // json[key].time = dateObj;
                json[key].time = new Date(json[key].time).toDateString();

            });
            return callback(null, json);
        }
    });
};

exports.get_post = function(title, callback){
    exports.get_posts(false, function(err, json){
        if (err){
            return callback(err);
        } else{
          console.log(json);
          // console.log(json[title].time);
            return callback(null, json[title]);
        }
    });
};

exports.save_post = function(title, description, body, callback){
    exports.get_posts(false, function(err, json){
        if (err){
            return callback(err);
        } else{
            marked(body, function (err, html) {
              if (err) return callback(err);
              else{
                // json[title] = { title: title, description: description, body: jsesc(html, {json: true}), time: new Date(Date.now()) }
                // json[title] = { title: title, description: description, body: escape(html), time: new Date(Date.now()) }
                json[title] = { title: title, description: description, body: html, time: new Date(Date.now()) }
                jsonfile.writeFile(postsPath, json, callback);
              }
            });
        }
    });
};

exports.delete_post = function(title, callback){
  exports.get_posts(false, function(err, json){
      if (err) callback(err);
      else{
          delete json[title];
          jsonfile.writeFile(postsPath, json, callback);
      }
  })
};
