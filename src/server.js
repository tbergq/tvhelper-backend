var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var http = require('http');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var compression    = require('compression');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');

var root = __dirname + '/';

var app = express();
var server = require('http').createServer(app);

app.use(cors());
app.use(morgan('dev'));
app.use(express.static(root));
app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());



require('./routes')(app);

var port = process.env.PORT || 9005;

server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});