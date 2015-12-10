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
var linksPath = path.join(__dirname, 'store/links.txt');

exports.get_posts = function(short, callback){
    jsonfile.readFile(postsPath, function(err, j){
        if (err){
            return callback(err);
        } else{
            var json = j;
            var posts_arr = [];
            Object.keys(json).forEach(function(key){
                if (short) delete json[key].body;
                // var dateObj = new Date(json[key].time);
                // delete json[key].time;
                // json[key].time = dateObj;
                json[key].sortTime = new Date(json[key].time);
                json[key].displayTime = json[key].sortTime.toDateString();
                //json[key].time = json[key].sortTime.toDateString();
                posts_arr.push(json[key]);
            });
            posts_arr.sort(function(a, b){
            //    return a.sortTime - b.sortTime;
                return b.sortTime - a.sortTime;
            });
            //console.log('json:', json);
            return callback(null, posts_arr, json);
        }
    });
};

exports.get_post = function(title, callback){
    exports.get_posts(false, function(err, json_arr, json){
        if (err){
            return callback(err);
        } else{
          // console.log(json[title].time);
            // console.log(title);
            // console.log('jsonA_arr:', json_arr);
            // console.log('json:', json);
            // console.log('should be a post here:', title);
            // console.log('should be a post here:', json[title]);
            return callback(null, json[title]);
        }
    });
};

exports.save_post = function(title, description, body, callback){
    exports.get_posts(false, function(err, json_arr, json){
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
  exports.get_posts(false, function(err, json_arr, json){
      if (err) callback(err);
      else{
          delete json[title];
          jsonfile.writeFile(postsPath, json, callback);
      }
  })
};

exports.get_links = function(callback){
    jsonfile.readFile(linksPath, function(err, json){
        if (err){
            return callback(err);
        } else{
            return callback(null, json.links);
        }
    });
};

exports.save_link = function(title, description, link, callback){
    exports.get_links(function(err, links){
        if (err) return callback(err);
        else {
            if (err) return callback(err);
            else {
                console.log('json:', links);
                links.push({
                    title: title,
                    description: description,
                    link: link
                })
                jsonfile.writeFile(linksPath, {links: links}, callback);
            }
        }
    });
}
