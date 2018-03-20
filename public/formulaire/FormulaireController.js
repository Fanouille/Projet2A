angular.module('AngularGen')
    .controller('FormulaireController', function ($scope,$http,$state) {

    $scope.nom=""
    $scope.prenom=""
    $scope.mail=""
    $scope.password=""
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
    $scope.id = []
    $scope.statutAjout = "pas encore ajouté"
    $scope.info = {}

//-----------------Fonction qui ajoute les données utilisateur à la bdd------------------------
    $scope. add = function(){

        $http({
            method:'POST',
            url:'/addUserToBDD',
            //params:{n : name ,p : prenom }
            data : [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville, $scope.promo,$scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, $scope.competences,$scope.password],
        }).then(function successCallBack(response){
            $scope.statutAjout = "user added to BDD";
            $scope.id = [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville, $scope.promo,$scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, $scope.competences];
            $state.go('formulaireSummary');
        },function errorCallBack(error){
            console.log(error);
            $scope.statutAjout = "error happenned";

        })     
    }
//---------------------------------------------------------------------------------------------


//---------------TODO--MODIFIER DONNEE UTILISATEUR---------------------------------------------
    $scope.update = function(){
        $http({
            method: 'POST',
            url: '/updateUserInBDD',
            data: [$scope.id,$scope.info],
        }).then(function successCallBack(response){
            console.log(response);
        },function errorCallBack(error){
            console.log(error);
        })
    }
//---------------------------------------------------------------------------------------------


//----------------------Fonction qui reset le formulaire---------------------------------------
    $scope.clear = function(){
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
    }
//---------------------------------------------------------------------------------------------



//--------------------Ajouter un champ de compétence-------------------------------------------
    $scope.addInput = function(){
        var input = addInput.innerHTML
        addInput.innerHTML = input + '<md-input-container flex="20"> <label>Compétences</label> <input type="text" name="competences" ng-model="competences.third"> </md-input-container>'
    }


/*---------------------------------------------------------------------------------------------

    $scope.addd = function(){
        var input = addInput.innerHTML
        addInput.innerHTML = input + '<label>Mot-clef : </label><input type="text" name="fpsaisiedescripteurA" /><br/>\n';
    }
*/

});

