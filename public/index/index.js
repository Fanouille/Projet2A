/**
 * Created by Flow on 24/04/2017.
 */

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state,$http,$state){

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

  	$scope.recherche=""
        
    $scope.$watch('recherche',function(){
        console.log($scope.recherche)
    },true)//,true permet de regarder à l'interieur de l'objet
        //il écoute donc si il y a du changement dans l'objet

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
 	
});



