angular.module('AngularGen')
    .controller('FormulaireController', function ($scope,$http) {
    
    $scope.nom="Nom"
    $scope.prenom="Prenom"
    $scope.mail=""
    $scope.promo=0
    $scope.telephone=""
    $scope.adresse={}
    $scope.adresse.rue="Rue"
    $scope.adresse.ville="Ville"
    $scope.entreprise={}
    $scope.entreprise.name="nom"
    $scope.entreprise.ad_rue="rue"
    $scope.entreprise.ad_ville="ville"
    $scope.langue={}
    $scope.competences={}

/*
    $http({
        method:'ADD',
        url:'/addBdd',
        params:{n : "",p : "",mail : "",promo : 0,telephone : "",adresse : {},entreprise : {},langue : {},competences : {}}
    }).then(function successCallBack(response){
        console.log(response)

    },function errorCallBack(error){
        console.log(error)

    })

*/

    $scope.update = function(name,prenom,mail,promo,telephone,adresse,entreprise,langue,competences){
        /*$http.params = {
            nom : name
            prenom : prenom
        }*/

        $http({
            method:'POST',
            url:'/addBdd',
            params:{n : name ,p : prenom }//,mail : "",promo : 0,telephone : "",adresse : {},entreprise : {},langue : {},competences : {}}
        }).then(function successCallBack(response){
            console.log(response)

        },function errorCallBack(error){
            console.log(error)

    })     
    }

    //$scope.$watch('n',function(){
      //      $scope.nom=$scope.n
        //},true)

});