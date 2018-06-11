// If we do not have CryptoJS defined; import it
if (typeof CryptoJS == 'undefined') {
  var cryptoSrc = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
  var scriptTag = document.createElement('script');
  scriptTag.setAttribute('src', cryptoSrc);
  document.body.appendChild(scriptTag);
};

angular.lowercase = text => text.toLowerCase(); //override lowercase function to prevent errors with some angular versions


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
    $scope.competences=[]
    $scope.id = []
    $scope.statutAjout = "pas encore ajouté"
    $scope.info = {}

//-----------------ADD USER TO BDD WITH POST METHOD-------------------------------------------------------
    $scope.add = function(){
        $http({
            method:'POST',
            url:'/addUserToBDD',
            data : [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville, $scope.promo,$scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, self.asyncContacts,$scope.password],
        }).then(function successCallBack(response){//in case of success
            $scope.statutAjout = "user added to BDD";
            $scope.id = [$scope.nom, $scope.prenom,$scope.adresse.rue, $scope.adresse.ville, $scope.promo,$scope.mail, $scope.telephone, $scope.entreprise.name, $scope.entreprise.ad_rue ,$scope.entreprise.ad_ville, $scope.langue, $scope.competences];
            $state.go('formulaireSummary');
        },function errorCallBack(error){//in case of error
            console.log(error);
            $scope.statutAjout = "error happenned";
        })     
    }
//----------------------------------------------------------------------------------------------------------


//---------------------------CLEAR DATAS ENTERED IN THE PAGE------------------------------------------------
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
//--------------------------------------------------------------------------------------------------------


//-----------------------------------------------AUTOCOMPLETION AND MD-CHIPS------------------------------
  var self = this;
  var pendingSearch, cancelSearch = angular.noop;
  var lastSearch;

  self.allCompetences = loadCompetences();
  self.contacts = [];
  self.asyncContacts = [];
  self.filterSelected = true;


  self.querySearch = querySearch;
  self.delayedQuerySearch = delayedQuerySearch;



  function querySearch (criteria) {
    return criteria ? self.allCompetences.filter(createFilterFor(criteria)) : [];
  }

  function addChip(chip) {
    $scope.competences.push(chip);
    console.log($scope.competences);
  }

  function removeChip(chip) {
    $scope.competences.pop(chip);
    console.log($scope.competences);
  }


  function delayedQuerySearch(criteria) {
    if ( !pendingSearch || !debounceSearch() )  {
      cancelSearch();

      return pendingSearch = $q(function(resolve, reject) {
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
    
    var liste = $scope.liste;

    return liste.map(function (c, index) {
      var cParts = c.split(' ');
      var comp = {
        name: c,};
      comp._lowername = comp.name.toLowerCase();
      return comp;
    });
  }
//--------------------------------------------------------------------------------------------------
});




