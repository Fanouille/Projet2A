// If we do not have CryptoJS defined; import it
if (typeof CryptoJS == 'undefined') {
  var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
  var scriptTag = document.createElement('script');
  scriptTag.setAttribute('src', cryptoSrc);
  document.body.appendChild(scriptTag);
}

angular
    .module('AngularGen')
    .controller('Test_mdController', Test_mdController);

function Test_mdController ($q, $timeout, $http,$scope) {
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
    
    //console.log($scope.liste);
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
}
