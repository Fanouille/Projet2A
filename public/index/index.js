/**
 * Created by Flow on 24/04/2017.
 */

angular.module('AngularGen')
    .controller('IndexController', function ($scope,$state){
    	$scope.varGlobal = 0
    	$scope.changeVar = function(id){
    		$scope.varGlobal = id
    	}
    
    $scope.openHome = function(){
  		$state.go('home')
  	}

  	$scope.openTest = function(){
  		$state.go('test')
  	}

  	$scope.recherche=''
        
    $scope.$watch('recherche',function(){
        console.log($scope.recherche)
    },true)//,true permet de regarder à l'interieur de l'objet
        //il écoute donc si il y a du changement dans l'objet
  	
    });



