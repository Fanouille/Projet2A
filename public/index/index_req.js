(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Flow on 24/04/2017.
 */
var bdd = require('./BDD/bdd.js');

angular.module('AngularGen')
.controller('IndexController', function ($scope,$state){

    	$scope.varGlobal = ''
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
      $scope.comp={}


      $scope.addBDD = function(n,p,m,pr,t,a,e,l,c){
        console.log("hello");
        var res = bdd.addtoBDD(n,p,m,pr,t,a,e,l,c)

        switch(res){
          case 0:
          $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
          $state.go('test') 
          break;

          case 1:
          $scope.varGlobal = "L'utilisateur (adresse email) existe déjà. ";
          $state.go('test') 
          break;

          case 2:
          $scope.name = n
          $scope.surname=p
          $scope.mel=m
          $scope.prom=pr
          $scope.tel=t
          $scope.ad=a
          $scope.ent=e
          $scope.lang=l
          $scope.comp=c
          $scope.varGlobal = 'Vous avez bien été ajouté à la BDD, voici le résumé de vos informations :'
          $state.go('test') 
          break;

          default : 
          $scope.varGlobal="Une erreur est survenue, veillez réessayer.";
          $state.go('test') 
          break;
        }  
      }
    
    $scope.openHome = function(){
  		  $state.go('home')
  	}

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
  	$scope.recherche='Recherche'
        
    $scope.$watch('recherche',function(){
        console.log($scope.recherche)
    },true)//,true permet de regarder à l'interieur de l'objet
        //il écoute donc si il y a du changement dans l'objet

    $scope.objetRecherche=''

  	$scope.search = function(){
  		  $scope.objetRecherche=$scope.recherche
  		  console.log($scope.objetRecherche)
  		  $state.go('search')
  	}
 	
});




},{}]},{},[1]);
