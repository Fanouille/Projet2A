var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
//var ent = require('ent');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var server = require('./server/server');
// var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Allow Angular to find modules scripts
app.use('/scripts', express.static(__dirname + '/node_modules/'));

//Allow Angular to find tmp dir
app.use('/tmp', express.static(__dirname + '/tmp/'));


app.use('/', server);
// app.use('/users', users);

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
    // res.render('error');
});





//ajout : 

app.post("/addBDD",(req,res) => {
	var myData = new User(req.body);
		myData.save().then(item => {
			res.send("item saved to database");
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});

});



module.exports = app;
