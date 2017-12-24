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
            data : [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville,, $scope.promo $scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, $scope.competences],
        }).then(function successCallBack(response){
            console.log(response)

        },function errorCallBack(error){
            console.log(error)

    })     
    }
//------------------------------------------------------

});