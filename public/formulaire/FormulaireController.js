angular.module('AngularGen')
    .controller('FormulaireController', function ($scope,$http) {
    
    $scope.nom="Nom"
    $scope.prenom="Prenom"
    $scope.mail=""
    $scope.promo=0
    $scope.telephone=""
    $scope.adresse={}
    $scope.adresse.id1="Rue"
    $scope.adresse.id2="Ville"
    $scope.entreprise={}
    $scope.entreprise.id1="nom"
    $scope.entreprise.id2="rue"
    $scope.entreprise.id3="ville"
    $scope.langue={}
    $scope.competences={}


    $http({
        method:'ADD',
        url:'/addBdd',
        params:{nom : "",prenom : "",mail : "",promo : 0,telephone : "",adresse : {},entreprise : {},langue : {},competences : {}}
    }).then(function successCallBack(response){
        console.log(response)

    },function errorCallBack(error){
        console.log(error)

    })

    $scope.update = function(nom,prenom,mail,promo,telephone,adresse,entreprise,langue,competences){
        var data = $.params({nom : $scope.nom,prenom : $scope.prenom,mail : $scope.mail,promo : $scope.promo,telephone : $scope.telephone,
                        adresse : $scope.adresse,entreprise : $scope.entreprise,langue : $scope.langue,competences : $scope.competences})     
    }

    //$scope.$watch('n',function(){
      //      $scope.nom=$scope.n
        //},true)

});