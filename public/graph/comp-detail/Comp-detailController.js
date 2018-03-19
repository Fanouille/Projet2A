angular.module('AngularGen')
	.controller('Comp-detailController', function ($scope,$http,$state,$rootScope) {
		$scope.Leaf = $rootScope.selectedLeaf
		$scope.info = $rootScope.Infos

		$scope.goBack = function(){
			$state.go('graph');
		}
	});