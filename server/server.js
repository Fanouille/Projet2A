
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var o = require('./services')
var fs = require('fs')

var bdd = require('./bdd')

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

//--------TEST CONNEXION A BDD-----------------------
router.post('/testConnexionToBDD',function(req,res){
  console.log("on est dans server.js, methode appelée");
  console.log(req.body);
  bdd.testConnexion(req.body);
  res.json();
});
//---------------------------------------------------


//-----------TEST AJOUT A BDD------------------------
router.post('/addUserToBDD',function(req,res){
  console.log("on est dans server.js, methode appelée");
  console.log(req.body);
  bdd.addUserToBDD(req.body);
  res.json();
});
//----------------------------------------------------


module.exports = router;