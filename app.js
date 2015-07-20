
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ua = require('universal-analytics');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'release/imgs/favicon.ico')));
// app.use(express.logger('dev'));
app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'release')));
app.use(function(req, res, next) {
    // respond with html page
    if (req.accepts('html')) {
        res.status(404); //custom 404 page
        // res.send('404 not found');
        res.render('404', {
            url: req.url
        });
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }
    // default to plain-text. send()
    res.type('txt').send('Not found');
})

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/posts', routes.posts);
app.get('/about', routes.about);
app.get('/projects', routes.projects);
app.get('/clayton', routes.clayton);
app.get('/post/:post_name', routes.post);
app.get('/create_post', routes.create_post);
app.post('/create_post', routes.create_post_post);
// app.get('/cdp', routes.cdp);
// app.get('/resume', function(req,res){
//   res.download(path.join(__dirname, 'Resume/CPetty_Resume.pdf'));
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
