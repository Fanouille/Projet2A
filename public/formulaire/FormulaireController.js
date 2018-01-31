angular.module('AngularGen')
    .controller('FormulaireController', function ($scope,$http) {
    
    $scope.nom=""
    $scope.prenom=""
    $scope.mail=""
    $scope.promo=""
    $scope.telephone=""
    $scope.adresse={}
    $scope.adresse.rue=""
    $scope.adresse.ville=""
    $scope.entreprise={}
    $scope.entreprise.name=""
    $scope.entreprise.ad_rue=""
    $scope.entreprise.ad_ville=""
    $scope.langue={}
    $scope.competences={}


//Fonction qui teste la connexion à la bdd
    $scope.connexion = function(){

        $http({
            method:'POST',
            url:'/testConnexionToBDD',
            data : ['Contenu de data'],
        }).then(function successCallBack(response){
            console.log(response)

        },function errorCallBack(error){
            console.log(error)

    })     
    }
//-----------------------------------------


//Fonction qui ajoute les données utilisateur à la bdd
    $scope.update = function(){

        $http({
            method:'POST',
            url:'/addUserToBDD',
            //params:{n : name ,p : prenom }
            data : [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville, $scope.promo,$scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, $scope.competences],
        }).then(function successCallBack(response){
            console.log(response)

        },function errorCallBack(error){
            console.log(error)

    })     
    }
//------------------------------------------------------

});