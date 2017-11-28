angular.module('AngularGen')
    .controller('SearchController', function ($scope,$state) {

    $scope.goBack = function(){
  		$state.go('home')
  	}

    });
