

var AngularGen = angular.module('AngularGen', ['ngMessages','ngMaterial', 'ngAnimate', 'ngAria','ui.router', 'ngScrollbars']);
//,'material.svgAssetsCache'     POUR EDGE

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/graph');

            $stateProvider			
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

                .state('graph', {
                    url: '/graph',
                    templateUrl: 'graph/graph.html',
                    controller: 'GraphController',

                })

                .state('advanced-search', {
                    url: '/advanced-search',
                    templateUrl: 'advanced-search/advanced-search.html',
                    controller: 'Advanced-searchController',

                })

                .state('formulaire', {
                    url: '/formulaire',
                    templateUrl: 'formulaire/formulaire.html',
                    controller: 'FormulaireController',

                })

                .state('connexion', {
                    url: '/connexion',
                    templateUrl: 'connexion/connexion.html',
                    controller: 'ConnexionController',

                })

                .state('formulaireSummary', {
                    url: '/formulaireSummary',
                    templateUrl: 'formulaireSummary/formulaireSummary.html',
                    controller: 'FormulaireSummaryController',

                })

                .state('test_md', {
                    url: '/test_md',
                    templateUrl: 'test_md/test_md.html',
                    controller: 'Test_mdController',

                })

        }]);
})(AngularGen);
