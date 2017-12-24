
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

router.post('/testConnexionToBDD',function(req,res){
  console.log("on est dans server.js, methode appelée");
  bdd.testConnexion();
  res.json();
});

router.post('/addUserToBDD',function(req,res){
  console.log("on est dans server.js, methode appelée");
  bdd.addUserToBDD(req.body);
  res.json();
});

/*
router.post('/addBdd',function(req,res){
	console.log("methode addBDD appelée")
  console.log(req.body)

    var result_code = bdd.addtoBDD(req.body.nom,req.body.prenom,req.body.mail,req.body.promo,req.body.tel,req.body.adresse,req.body.entreprise,req.body.langue,req.body.ccompetence);
    console.log(result_code);

    switch(result_code){
      case 0:
      $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
      $state.go('test') 
      res.json({ success: "false" });
      break;

      case 1:
      $scope.varGlobal = "L'utilisateur (adresse email) existe déjà. ";
      $state.go('test') 
      res.json({ success: "false" });
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
      res.json({ success: "true" }); 
      break;

      default : 
      $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
      $state.go('test');
      res.json({ success: "false" });
      break;
	}
});
*/
/*
router.post('/postData',function(req,res){
	console.log(req.data)
	res.json('Coucou bis')
})
*/



module.exports = router;




