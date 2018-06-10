'use strict';

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state,$http,$mdPanel,$mdSidenav,$rootScope,$mdDialog){


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

  function testWriteJson(){
    return $http.get(
        '/write'
        ).then(function successCallBack(response){
          //console.log(response)
      },function errorCallBack(error){
          console.log(error);
      });
  } 

  testWriteJson();

//--------------------------MENU INDEX-----------------------------------
  $scope.isOpen = false;
  $scope.selectedMode = 'md-fling';
  $scope.selectedDirection = 'right';
//----------------------------------------------------------------------

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

//-----------------------------------------------POPUP----------------------------------------------
    $scope.showConDialog = function(ev) {
    $mdDialog.show({
      controller: "ConnexionController",
      templateUrl: 'connexion/connexion.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

//--------------------------------------------------------------------------------------------------
});

//directives du menu déroulant
! function() {
  "use strict";
  var a = angular.module("oci.treeview", []);
  a.controller("oci.treeview.ctrl", ["$scope", function(a) {
    function b(c) {
      "collapsed" !== a.defaultNodeState && (a.defaultNodeState = "expanded"), c && void 0 === c.state && (c.children && c.children.length > 0 ? (c.state = a.defaultNodeState, c.children.forEach(b)) : c.state = "leaf")
    }
    b(a.tree), a.context = a.context || {}, a.selectNode = function(b) {
      function c() {
        "expanded" === b.state ? b.state = "collapsed" : "collapsed" === b.state && (b.state = "expanded")
      }
      a.$emit("nodeSelected", b, a.context);
      var d = a.onSelectNode && a.onSelectNode(b);
      d && d.then ? d.then(c) : c()
    }, "false" !== a.selectTranscluded && (a.clickOnTranscluded = !0)
  }]), a.directive("oci.treeview", ["$compile", function(a) {
    return {
      restrict: "E",
      transclude: !0,
      scope: {
        tree: "=",
        context: "=?",
        onSelectNode: "=?",
        defaultNodeState: "@",
        selectTranscluded: "@"
      },
      controller: "oci.treeview.ctrl",
      template: '<div class="tree">   <span ng-click="clickOnTranscluded && selectNode(tree)" ng-transclude></span>   <ul ng-if="tree.state === \'expanded\'">       <li ng-repeat="node in tree.children">           <i ng-class="node.state" ng-click="selectNode(node)"></i>           <oci.treeview tree="node" context="context" on-select-node="onSelectNode"                select-transcluded="{{selectTranscluded}}" default-node-state="{{defaultNodeState}}">               <span ng-transclude></span>           </oci.treeview>       </li>   </ul></div>',
      compile: function(b, c, d) {
        var e, f = b.contents().remove();
        return function(b, c) {
          e || (e = a(f, d)), e(b, function(a) {
            c.append(a)
          })
        }
      }
    }
  }])
}();