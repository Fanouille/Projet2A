/**
 * Created by Flow on 24/04/2017.
 */

angular.module('AngularGen')
    .controller('IndexController', function ($scope){
    	$scope.varGlobal = 0
    	$scope.changeVar = function(id){
    		$scope.varGlobal = id
    	}


    });



