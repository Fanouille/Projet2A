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


(function () {
  'use strict';

  // If we do not have CryptoJS defined; import it
  if (typeof CryptoJS == 'undefined') {
    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);
  }

  angular
      .module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
      .controller('ContactChipDemoCtrl', DemoCtrl);

  function DemoCtrl ($q, $timeout) {
    var self = this;
    var pendingSearch, cancelSearch = angular.noop;
    var lastSearch;

    self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
    self.asyncContacts = [];
    self.filterSelected = true;

    self.querySearch = querySearch;
    self.delayedQuerySearch = delayedQuerySearch;

    /**
     * Search for contacts; use a random delay to simulate a remote call
     */
    function querySearch (criteria) {
      return criteria ? self.allContacts.filter(createFilterFor(criteria)) : [];
    }

    /**
     * Async search for contacts
     * Also debounce the queries; since the md-contact-chips does not support this
     */
    function delayedQuerySearch(criteria) {
      if ( !pendingSearch || !debounceSearch() )  {
        cancelSearch();

        return pendingSearch = $q(function(resolve, reject) {
          // Simulate async search... (after debouncing)
          cancelSearch = reject;
          $timeout(function() {

            resolve( self.querySearch(criteria) );

            refreshDebounce();
          }, Math.random() * 500, true)
        });
      }

      return pendingSearch;
    }

    function refreshDebounce() {
      lastSearch = 0;
      pendingSearch = null;
      cancelSearch = angular.noop;
    }

    /**
     * Debounce if querying faster than 300ms
     */
    function debounceSearch() {
      var now = new Date().getMilliseconds();
      lastSearch = lastSearch || now;

      return ((now - lastSearch) < 300);
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);
      };

    }

    function loadContacts() {
      var contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
        'Anita Gros',
        'Megan Smith',
        'Tsvetko Metzger',
        'Hector Simek',
        'Some-guy withalongalastaname'
      ];

      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var email = cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com';
        var hash = CryptoJS.MD5(email);

        var contact = {
          name: c,
          email: email,
          image: '//www.gravatar.com/avatar/' + hash + '?s=50&d=retro'
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }
  }


})();
