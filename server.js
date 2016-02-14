// MIDDLEWARE =================================================================
var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	favicon = require('serve-favicon'),
	path = require('path'),
	//db = require('./config/db');
	backendRouter = require('./routes/backendRouter'),
	frontEndRouter = require('./routes/frontendRouter');

// CONFIG =====================================================================
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING ====================================================================
app.use('/api', backendRouter);
app.use('/home', frontEndRouter);

// CONNECT TO DB ==============================================================
//mongoose.connect(process.env.ST_BONIFACE_DB || 'mongodb://localhost/St-Boniface');
mongoose.connect(process.env.ST_BONIFACE_DB || 'mongodb://heroku_gr1m9fs2:64a1sq5h5be18m0m9vv6454e0r@ds061355.mongolab.com:61355/heroku_gr1m9fs2')
// LISTEN ON SERVER 
app.listen(port);
console.log('St. Boniface Application served on port: ' + port);