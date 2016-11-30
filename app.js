var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongooseConnection = require('./models/mongooseConnection');
var session = require('client-sessions');
var index = require('./routes/index');
var users = require('./routes/users');
var registration=require('./routes/registration');
var dashboard=require('./routes/dashboard');
var appointment=require('./routes/appointment');
var app = express();
var fs      = require( 'fs' );
var config  = require( './config.json' );
var Fitbit  = require( 'fitbit-oauth2' );
// view engine setup





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var tfile = 'fb-token.json';

var persist = {
  read: function( filename, cb ) {
    fs.readFile( filename, { encoding: 'utf8', flag: 'r' }, function( err, data ) {
      if ( err ) return cb( err );
      try {
        var token = JSON.parse( data );
        cb( null, token );
      } catch( err ) {
        cb( err );
      }
    });
  },
  write: function( filename, token, cb ) {
    console.log( 'persisting new token:', JSON.stringify( token ) );
    fs.writeFile( filename, JSON.stringify( token ), cb );
  }
};

// Instanciate a fitbit client.  See example config below.
//
var fitbit = new Fitbit( config.fitbit );
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({

  cookieName: 'session',
  secret: 'cmpe280_test_string',
  duration: 30 * 60 * 1000,    //setting the time for active session
  activeDuration: 5 * 60 * 1000,  }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// In a browser, http://localhost:4000/fitbit to authorize a user for the first time.
//
app.get('/fitbitAuth', function (req, res) {
  if(req.session.user){
    console.log("Session created : "+ req.session.user);
  res.redirect( fitbit.authorizeURL() );
  }
  else
  {
    console.log("Session Error");
  }
});

// Callback service parsing the authorization token and asking for the access token.  This
// endpoint is refered to in config.fitbit.authorization_uri.redirect_uri.  See example
// config below.
//
app.get('/callback', function (req, res, next) {
  var code = req.query.code;
  fitbit.fetchToken( code, function( err, token ) {
    if ( err ) return next( err );

    // persist the token
    persist.write( tfile, token, function( err ) {
      if ( err ) return next( err );

    });
  });
  res.render('patientDashBoard');
});

app.get('/patientDashboard', function (req,res,next) {
  res.render('patientDashBoard');

})
app.get( '/fb-profile', function( req, res, next ) {
  console.log("abcd : ");
  persist.read( tfile, function( err, token ) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Set the client's token
    console.log("token : " + token.toString());
    fitbit.setToken(token);


    fitbit.request({
      uri: "https://api.fitbit.com/1/user/-/activities/heart/date/2016-11-21/1d/1sec/time/00:00/12:01.json",
      method: 'GET',
    }, function( err, body, token ) {
      if ( err ) return next( err );
      var profile = JSON.parse( body );
      // if token is not null, a refesh has happened and we need to persist the new token
     // console.log("token : " + token + "aaa " + JSON.stringify(profile));
      if ( token ) {
        console.log("abcd123 : " + token);
        persist.write( tfile, token, function( err ) {
          if ( err ) return next( err );
          res.send({statusCode:200},{data1 : profile });
          //res.send( '<pre>' + JSON.stringify( profile, null, 2 ) + '</pre>' );
        });

      }
      else
       // res.status(200).send({data1 : profile});
        res.send({statusCode:200 , data1 : profile });
    });
  });
});


app.get('/logout', function (req,res,next) {
  console.log(req.session.user);
  req.session.destroy();
  res.redirect("/");

})

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



//post requests
app.post('/signup',registration.signup);
app.post('/signupDoctor', registration.signupDoctor);

app.post('/login', registration.login);
app.post('/loginDoctor' , registration.loginDoctor);
app.post('/bookAppointment', appointment.bookAppointment);

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

  // render the error pagenpm
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
