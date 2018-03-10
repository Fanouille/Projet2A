angular.module('AngularGen')
	.controller('GraphController', function ($scope,$http,$state) {

	//----------------------------GESTION DU MENU DEROULANT----------------------------------------
	var dropdown = document.querySelectorAll('.dropdown');
	var dropdownArray = Array.prototype.slice.call(dropdown,0);
	dropdownArray.forEach(function(el){
		var button = el.querySelector('a[data-toggle="dropdown"]'),
			menu = el.querySelector('.dropdown-menu'),
			arrow = button.querySelector('i.icon-arrow');

		button.onclick = function(event) {
			if(!menu.hasClass('show')) {
				menu.classList.add('show');
				menu.classList.remove('hide');
				arrow.classList.add('open');
				arrow.classList.remove('close');
				event.preventDefault();
			}
			else {
				menu.classList.remove('show');
				menu.classList.add('hide');
				arrow.classList.remove('open');
				arrow.classList.add('close');
				event.preventDefault();
			}
		};
	})

	Element.prototype.hasClass = function(className) {
	return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	}
	//---------------------------------------------------------------------------------------------


	//------------------------LECTURE DE LA BDD----------------------------------------------------
	$scope.parent = "Robotique"
  	$scope.getCompSon = function(){
        $http.get(
          '/getCompSonInBDD/'+$scope.parent
          ).then(function successCallBack(response){
            console.log(response)

        },function errorCallBack(error){
            console.log(error);
        })     
  	}
	//---------------------------------------------------------------------------------------------

	$scope.leaf = function(Feuille){
		return ('<li><a href="#">'+Feuille+'</a></li>');
	}

	$scope.fatherBegin = function(Pere){
		return ('<li class="dropdown"><a href="#" data-toggle="dropdown">'+Pere +'<i class="icon-arrow"></i></a><ul class="dropdown-menu">');
	}

	$scope.fatherEnd = function(){
		return ('</ul></li>');
	}

	$scope.test = $scope.fatherBegin("Test")+$scope.leaf("Feuille")+$scope.fatherEnd();

    });