var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var registration=require('./routes/registration');

var app = express();
var FitbitApiClient = require("fitbit-node"),
    client = new FitbitApiClient("22833Q", "2943c1618c81513efeb6b27dd1fe0350");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/signup',registration.signup);
app.post('/login',registration.login);
app.get('/usermainpage',function(req,res){
  res.render('usermainpage');
});
app.get("/authorize", function (req, res) {
  // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
  res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight', 'http://localhost:3000/callback'));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", function (req, res) {
  // exchange the authorization code we just received for an access token
  client.getAccessToken(req.query.code, 'http://localhost:3000/callback').then(function (result) {
    // use the access token to fetch the user's profile information
    client.get("/profile.json", result.access_token).then(function (results) {
      console.log(results);
      console.log(results[0]);
      res.send(results[0]);
    });
  }).catch(function (error) {
    res.send(error);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
