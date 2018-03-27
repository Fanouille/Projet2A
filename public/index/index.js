'use strict';

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state,$http,$mdPanel,$mdSidenav,$rootScope){


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
    $rootScope.currentPage = "Graphe des Compétences"
    
  	$scope.openTest = function(){
  		  $state.go('test')
  	}

  	$scope.openGraph = function(){
        $rootScope.currentPage = "Graphe des Compétences"
  		  $state.go('graph')
  	}

    $scope.openAdvanced = function(){
        $state.go('advanced-search')
    }

    $scope.openFormulaire = function(){
        $rootScope.currentPage = "Formulaire"
        $state.go('formulaire')
    }

    $scope.openConnexion = function(){
        $state.go('connexion')
    }

    $scope.openComp = function(){
        $state.go('comp-detail')
    }

  	$scope.recherche=""

    $scope.objetRecherche=''
    $scope.rech=[]

  	$scope.search = function(){
        $http.get(
          '/researchBDD/'+$scope.recherche
          ).then(function successCallBack(response){
            //console.log(response)
            $scope.rech = response.data;
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

  //MENU INDEX
  $scope.isOpen = false;
  $scope.selectedMode = 'md-fling';
  $scope.selectedDirection = 'right';


  //---------------

        $scope.treeData = {
        label : '',
        state : 'expanded',
        children : [{
          label: 'Racine',
          state: 'collapsed',
          children: [],
        }],
      };

      $rootScope.selectedLeaf = ''
      $scope.leafDetail = function(leaf){
          $rootScope.currentPage = "Compétence";
          $http.get(
            '/getLeafInBDD/'+ leaf
            ).then(function successCallBack(response){
              //console.log(response)
              $rootScope.Infos = response.data;
              $scope.closeSideNavPanel();
              $state.go('comp-detail',{}, {reload: true});

          },function errorCallBack(error){
              console.log(error);
          })     
      }

       $scope.leafSkilledUsers = function(leaf){
          $http.get(
            '/getUserLeafInBDD/'+ leaf
            ).then(function successCallBack(response){
              //console.log(response)

              $rootScope.Infos.push(response.data);
              $state.go('comp-detail');


          },function errorCallBack(error){
              console.log(error);
          })     
      }   

      $scope.$on('nodeSelected', function(event, node, context) {
        if (context.selectedNode) {
          context.selectedNode.class = '';
          if (node.state === "leaf"){
            $rootScope.selectedLeaf = node.label;
            $scope.leafDetail($rootScope.selectedLeaf);
            //$scope.leafSkilledUsers($rootScope.selectedLeaf);
            
          }
        }

        node.class = 'selectedNode';
        context.selectedNode = node;
      });

      $scope.showMobileMainHeader = true;
      $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
      };
      $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
      };
      
      $scope.getMoreData = function (node) {
        return $http.get('/getCompSonInBDD/' + node.label).then(function successCallBack(response) {
            var data = response.data;
            node.children = data;
        });
      };
});