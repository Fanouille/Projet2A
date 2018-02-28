angular.module('AngularGen')
    .controller('ConnexionController', function ($scope,$http) {
    	$scope.email=""
    	$scope.password=""

    	$scope.connexionStatus = "not connected"

    	$scope.testConnexion = function(){
         $http.get(
          '/connexion/'+$scope.email+'/'+$scope.password
          ).then(function successCallBack(response){
            console.log(response)
            $scope.connexionStatus = "you are connected";

        },function errorCallBack(error){
            console.log(error);
        })     
  		}

    });