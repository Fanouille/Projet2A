

var AngularGen = angular.module('AngularGen', ['ngMessages','ngMaterial', 'ngAnimate', 'ngAria','ui.router', 'ngScrollbars']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/home.html',
                    controller: 'HomeController',

                })

			
                .state('test', {
                    url: '/test',
                    templateUrl: 'test/test.html',
                    controller: 'TestController',

                })

                .state('search', {
                    url: '/search',
                    templateUrl: 'search/search.html',
                    controller: 'SearchController',

                })

        }]);
})(AngularGen);
