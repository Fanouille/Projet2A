
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var o = require('./services');
var fs = require('fs');

var bdd = require('./bdd');

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
})



//--------------- AJOUT A BDD--------------------------
router.post('/addUserToBDD',function(req,res){
  //console.log("on est dans server.js, methode appelée");
  //console.log(req.body);
  bdd.addUserToBDD(req.body);
  
  res.json();
})
//-----------------------------------------------------


//-----------RECHERCHE PAR MOT CLE---------------------
router.get('/researchBDD/:id',function(req,res){
  //console.log(req.params.id);
  var promise = bdd.searchInBDD(req.params.id);
  promise.then(function(result){
    //console.log(result);
    res.json(result);
  });
  
})
//----------------------------------------------------

module.exports = router;

