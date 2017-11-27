angular.module('AngularGen')
    .controller('TestController', function ($scope,$http,$mdMedia,$state) {

        $scope.test2 = "Bienvenue sur la page test"
        $http({
        	method:'GET',
        	url:'getData',
        	params:{id:1}
        }).then(function successCallBack(response){
        	console.log(response)

        },function errorCallBack(error){
        	console.log(error)

        })

        $http({
        	method:'POST',
        	url:'postData',
        	data:{id:1}
        })

        $scope.isXS = $mdMedia('xs')
        console.log($mdMedia('xs'))

        //$state.go('home') // redirection vers home, affiche pas page test

        $scope.testWatch={} //''
        $scope.testbis = ''
      
        $scope.$watch('testbis',function(){
        	console.log($scope.testbis)

        },true) //pas de true avec ''



       $scope.testClick = function(){
       	//console.log('coucou')
       	console.log($scope.testWatch)
       }

       $scope.add = function(){
       	$scope.testWatch.id = $scope.testbis
       	console.log($scope.testWatch)
       }

    });