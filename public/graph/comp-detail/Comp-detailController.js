angular.module('AngularGen')
	.controller('Comp-detailController', function ($scope,$http,$state,$rootScope) {
		$scope.Leaf = $rootScope.selectedLeaf
		$scope.info = $rootScope.Infos

		$scope.currentNavItem = '1';


	    $scope.goto = function(page) {
	      $scope.status = "Goto " + page;
	    }

		$scope.goBack = function(){
			$rootScope.currentPage = "Graphe des Compétences";
			$state.go('graph');
		}


	})
	.config(function($mdThemingProvider) {
     $mdThemingProvider.theme('default')
  		.primaryPalette('blue', {
  			'default' : '800'
  		})
  		.accentPalette('blue', {
  			'default' : '800'
  		});
    });