// Main express configuration
var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  app = express();

config = require('./config');
db = mongoose.connect('mongodb://localhost/survey');

app.set('port', process.env.PORT || 30000);
app.use(config.setHeaders);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


// Include everything from models
require('./models/survey')();
require('./models/step')();
require('./models/question')();
require('./models/answer')();

// Creates the survey
//require('./insertSurvey')();

// Include everything from routes
require('./routes/results')(app);
require('./routes/survey')(app);


// Handle 404 and 500
app.all('*', function(req, res){
  res.status(404).json({status: '404'});
});
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.json({results: 'error'});
});


// Server launch
http.createServer(app).listen(app.get('port'), function(){
  console.log('Survey api listening to ' + app.get('port'));
});
