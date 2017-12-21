
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

router.get('/addBdd',function(req,res){
	console.log("hello");
    var res = bdd.addtoBDD(n,p,m,pr,t,a,e,l,c);

    switch(res){
      case 0:
      $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
      $state.go('test') 
      break;

      case 1:
      $scope.varGlobal = "L'utilisateur (adresse email) existe déjà. ";
      $state.go('test') 
      break;

      case 2:
      $scope.name = req.params.n
      $scope.surname=req.params.p
      $scope.mel=req.params.m
      $scope.prom=req.params.pr
      $scope.tel=req.params.t
      $scope.ad=req.params.a
      $scope.ent=req.params.e
      $scope.lang=req.params.l
      $scope.comp=req.params.c
      $scope.varGlobal = 'Vous avez bien été ajouté à la BDD, voici le résumé de vos informations :'
      $state.go('test') 
      break;

      default : 
      $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
      $state.go('test') 
      break;

	res.json(result)
	}
});

/*
router.post('/postData',function(req,res){
	console.log(req.data)
	res.json('Coucou bis')
})
*/



module.exports = router;




