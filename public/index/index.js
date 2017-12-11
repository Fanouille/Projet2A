/**
 * Created by Flow on 24/04/2017.
 */

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state){

    	$scope.varGlobal = ''
      $scope.name ="Nom"
      $scope.surname="Prenom"
      $scope.mel=""
      $scope.prom=0
      $scope.tel=0
      $scope.ad={}
      $scope.ad.id1="Rue"
      $scope.ad.id2="Ville"
      $scope.ent={}
      $scope.ent.id1="nom"
      $scope.ent.id2="rue"
      $scope.ent.id3="ville"
      $scope.lang={}
      $scope.comp={}


      $scope.addBDD = function(n,p,m,pr,t,a,e,l,c){
        $scope.name = n
        $scope.surname=p
        $scope.mel=m
        $scope.prom=pr
        $scope.tel=t
        $scope.ad=a
        $scope.ent=e
        $scope.lang=l
        $scope.comp=c
        $scope.varGlobal = 'Vous avez bien été ajouté à la BDD, voici le résumé de vos informations :'
        $state.go('test')
      }
    
    $scope.openHome = function(){
  		  $state.go('home')
  	}

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
  	$scope.recherche='Recherche'
        
    $scope.$watch('recherche',function(){
        console.log($scope.recherche)
    },true)//,true permet de regarder à l'interieur de l'objet
        //il écoute donc si il y a du changement dans l'objet

    $scope.objetRecherche=''

  	$scope.search = function(){
  		  $scope.objetRecherche=$scope.recherche
  		  console.log($scope.objetRecherche)
  		  $state.go('search')
  	}
 	
});



