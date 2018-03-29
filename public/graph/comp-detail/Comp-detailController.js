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
  		.primaryPalette('deep-orange', {
  			'default' : '800'
  		})
  		.accentPalette('deep-orange', {
  			'default' : '800'
  		});
    });