angular.module('AngularGen')
    .controller('FormulaireController', function ($scope,$http,$state,$q, $timeout) {

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
    $scope.add = function(){

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
// If we do not have CryptoJS defined; import it
if (typeof CryptoJS == 'undefined') {
  var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
  var scriptTag = document.createElement('script');
  scriptTag.setAttribute('src', cryptoSrc);
  document.body.appendChild(scriptTag);
}



  var self = this;
  var pendingSearch, cancelSearch = angular.noop;
  var lastSearch;

  self.allCompetences = loadCompetences();
  self.contacts = [self.allCompetences[0]];
  self.asyncContacts = [];
  self.filterSelected = true;


  self.querySearch = querySearch;
  self.delayedQuerySearch = delayedQuerySearch;


  function querySearch (criteria) {
    return criteria ? self.allCompetences.filter(createFilterFor(criteria)) : [];
  }


  function delayedQuerySearch(criteria) {
    if ( !pendingSearch || !debounceSearch() )  {
      cancelSearch();

      return pendingSearch = $q(function(resolve, reject) {
        console.log(self.asyncContacts);
        // Simulate async search... (after debouncing)
        cancelSearch = reject;
        $timeout(function() {

          resolve( self.querySearch(criteria) );

          refreshDebounce();
        }, Math.random() * 500, true);
      });
    }

    return pendingSearch;
  }

  function refreshDebounce() {
    lastSearch = 0;
    pendingSearch = null;
    cancelSearch = angular.noop;
  }


  function debounceSearch() {
    var now = new Date().getMilliseconds();
    lastSearch = lastSearch || now;

    return ((now - lastSearch) < 300);
  }


  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(contact) {
      return (contact._lowername.indexOf(lowercaseQuery) != -1);
    };

  }



  function loadCompetences() {
    
    console.log($scope.liste);
    var liste = $scope.liste;

    /*var contacts = [
      'Marina Augustine',
      'Oddr Sarno',
      'Nick Giannopoulos',
      'Narayana Garner',
      'Anita Gros',
      'Megan Smith',
      'Tsvetko Metzger',
      'Hector Simek',
      'Some-guy withalongalastaname'
    ];*/

    return liste.map(function (c, index) {
      var cParts = c.split(' ');
      //var email = cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com';
      //var hash = CryptoJS.MD5(email);

      var contact = {
        name: c,
        //email: email,
        //image: '//www.gravatar.com/avatar/' + hash + '?s=50&d=retro'
      };
      contact._lowername = contact.name.toLowerCase();
      return contact;
    });
  }

})
.directive('custom-chip', function(){ /*pour changer couleur md-chips en theorie*/
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var chipClass = 'pink';
      var mdChip = elem.parent().parent();
      mdChip.addClass(chipClass);
    }
  }
});



