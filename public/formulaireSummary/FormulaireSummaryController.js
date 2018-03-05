angular.module('AngularGen')
    .controller('FormulaireSummaryController', function ($scope,$state) {

    	$scope.update = function(){
    		$state.go('formulaire');
    	}

    	$scope.continue = function(){
    		$state.go('graph');
    	}
    })