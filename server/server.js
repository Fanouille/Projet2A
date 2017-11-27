
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var o = require('./services')
var fs = require('fs')

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/getData',function(req,res){
	console.log(req.params)
	res.json('Coucou')
})

router.post('/postData',function(req,res){
	console.log(req.data)
	res.json('Coucou bis')
})

//router.get("/getData",function(req,res){
//	var test = 12;
//    res.json(test)
//	console.log("Hello World !")
//});

module.exports = router;




