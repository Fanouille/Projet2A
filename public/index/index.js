'use strict';

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state,$http,){


    	/*$scope.varGlobal = ''
      $scope.name ="Nom"
      $scope.surname="Prenom"
      $scope.mel=""
      $scope.prom=0
      $scope.tel=""
      $scope.ad={}
      $scope.ad.id1="Rue"
      $scope.ad.id2="Ville"
      $scope.ent={}
      $scope.ent.id1="nom"
      $scope.ent.id2="rue"
      $scope.ent.id3="ville"
      $scope.lang={}
      $scope.comp={}*/
    
  	$scope.openTest = function(){
  		  $state.go('test')
  	}

  	$scope.openGraph = function(){
  		  $state.go('graph')
  	}

    $scope.openAdvanced = function(){
        $state.go('advanced-search')
    }

    $scope.openFormulaire = function(){
        $state.go('formulaire')
    }

    $scope.openConnexion = function(){
        $state.go('connexion')
    }

    $scope.openTestMd = function(){
        $state.go('test_md')
    }

  	$scope.recherche=""
        
    $scope.$watch('recherche',function(){
        console.log($scope.recherche)
    },true)//,true permet de regarder à l'interieur de l'objet
        //il écoute donc si il y a du changement dans l'objet

    $scope.objetRecherche=''
    $scope.liste=[]

  	$scope.search = function(){
        $http.get(
          '/researchBDD/'+$scope.recherche
          ).then(function successCallBack(response){
            //console.log(response)
            $scope.liste = response;
            $state.go('advanced-search');

        },function errorCallBack(error){
            console.log(error);
        })     
  	}


    function PanelGroupsCtrl($mdPanel) {
      this.settings = {
        name: 'settings',
        items: [
          'Home',
          'About',
          'Contact'
        ]
      };

      this.menuTemplate = '' +
          '<div class="menu-panel" md-whiteframe="4">' +
          '  <div class="menu-content">' +
          '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
          '      <button class="md-button">' +
          '        <span>{{item}}</span>' +
          '      </button>' +
          '    </div>' +
          '    <md-divider></md-divider>' +
          '    <div class="menu-item">' +
          '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
          '        <span>Close Menu</span>' +
          '      </button>' +
          '    </div>' +
          '  </div>' +
          '</div>';

      $mdPanel.newPanelGroup('toolbar', {
        maxOpen: 2
      });

      $mdPanel.newPanelGroup('menus', {
        maxOpen: 3
      });

      this.showToolbarMenu = function($event, menu) {
        var template = this.menuTemplate;

        var position = $mdPanel.newPanelPosition()
            .relativeTo($event.srcElement)
            .addPanelPosition(
              $mdPanel.xPosition.ALIGN_START,
              $mdPanel.yPosition.BELOW
            );

        var config = {
          id: 'toolbar_' + menu.name,
          attachTo: angular.element(document.body),
          controller: PanelMenuCtrl,
          controllerAs: 'ctrl',
          template: template,
          position: position,
          panelClass: 'menu-panel-container',
          locals: {
            items: menu.items
          },
          openFrom: $event,
          focusOnOpen: false,
          zIndex: 100,
          propagateContainerEvents: true,
          groupName: ['toolbar', 'menus']
        };

        $mdPanel.open(config);
      };

      this.showContentMenu = function($event, menu) {
        var template = this.menuTemplate;

        var position = $mdPanel.newPanelPosition()
            .relativeTo($event.srcElement)
            .addPanelPosition(
              $mdPanel.xPosition.ALIGN_START,
              $mdPanel.yPosition.BELOW
            );

        var config = {
          id: 'content_' + menu.name,
          attachTo: angular.element(document.body),
          controller: PanelMenuCtrl,
          controllerAs: 'ctrl',
          template: template,
          position: position,
          panelClass: 'menu-panel-container',
          locals: {
            items: menu.items
          },
          openFrom: $event,
          focusOnOpen: false,
          zIndex: 100,
          propagateContainerEvents: true,
          groupName: 'menus'
        };

        $mdPanel.open(config);
      };
    }

    function PanelMenuCtrl(mdPanelRef) {
      this.closeMenu = function() {
        mdPanelRef && mdPanelRef.close();
      }
    }

});