angular.module('AngularGen')
    .controller('FormulaireController', function ($scope) {
    
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

    //$scope.$watch('n',function(){
      //      $scope.nom=$scope.n
        //},true)

});