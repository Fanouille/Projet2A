'use strict';

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state,$http,$mdPanel){


    	/*$scope.varGlobal = ''
      $scope.name ="Nom"
      $scope.surname="Prenom"
      $scope.mel=""
      $scope.prom=0
      $scope.tel=""
      $scope.ad={}
      $scope.ad.id1="Rue"
      $scope.ad.id2="Ville"
      $scope.ent={}
      $scope.ent.id1="nom"
      $scope.ent.id2="rue"
      $scope.ent.id3="ville"
      $scope.lang={}
      $scope.comp={}*/
    
  	$scope.openTest = function(){
  		  $state.go('test')
  	}

  	$scope.openGraph = function(){
  		  $state.go('graph')
  	}

    $scope.openAdvanced = function(){
        $state.go('advanced-search')
    }

    $scope.openFormulaire = function(){
        $state.go('formulaire')
    }

    $scope.openConnexion = function(){
        $state.go('connexion')
    }

    $scope.openTestMd = function(){
        $state.go('test_md')
    }

    $scope.openComp = function(){
        $state.go('comp-detail')
    }

  	$scope.recherche=""

    $scope.objetRecherche=''
    $scope.liste=[]

  	$scope.search = function(){
        $http.get(
          '/researchBDD/'+$scope.recherche
          ).then(function successCallBack(response){
            //console.log(response)
            $scope.liste = response;
            $state.go('advanced-search');

        },function errorCallBack(error){
            console.log(error);
        })     
  	}
    

  $scope.liste = [];
  function remplirListe(){
    return $http.get(
        '/load'
        ).then(function successCallBack(response){
          //console.log(response)
          $scope.liste = response.data;

      },function errorCallBack(error){
          console.log(error);
      });
  }

  remplirListe();
});