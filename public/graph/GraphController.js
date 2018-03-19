angular.module('AngularGen')
	.controller('GraphController', function ($scope,$http,$q,$state,$mdSidenav) {
	
	

	//------------------------LECTURE DE LA BDD----------------------------------------------------
	/*function delay(t) {
	  return new Promise(function(resolve) {
	    setTimeout(function() {
	      resolve();
	    }, t);
	  });
	}*/

    /*$scope.getSons = function(parent){
    	var res = [];
   		$http.get(
	      '/getCompSonInBDD/'+parent
	      ).then(function successCallBack(response){
	      	res=response.data;
	    },function errorCallBack(error){
            console.log(error);
        });
	    return  res;
	    
	}*/
	


	$scope.treeData = {
		label : '',
		state : 'expanded',
		children : $scope.sons,
	};

	//console.log($scope.treeData);
	//--------------------------------ARBRE DES COMPETENCES MENU--------------------------------------
    /*$scope.treeData = {
      label: 'Parent',
      state: 'expanded',
      children: [{
        label: 'Child1',
        state: 'expanded',
        children: [{
          label: 'Grandchild1',
          state: 'leaf',
          children: []
        }, {
          label: 'Grandchild2',
          state: 'leaf',
          children: []
        }, {
          label: 'Grandchild3',
          state: 'expanded',
          children: [{
            label: 'Greatgrandchild1',
            state: 'leaf',
            children: []
          }]
        }]
      }, {
        label: 'Child2',
        state: 'leaf',
        children: []
      }]
    };*/

    $scope.$on('nodeSelected', function(event, node, context) {
      if (context.selectedNode) {
        context.selectedNode.class = '';
      }

      node.class = 'selectedNode';
      context.selectedNode = node;
    });

    $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function() {
      $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
      $mdSidenav('left').close();
    };
   //-------------------------------------------------------------------------------------------------

    });




//directives du menu déroulant

! function() {
  "use strict";
  var a = angular.module("oci.treeview", []);
  a.controller("oci.treeview.ctrl", ["$scope", function(a) {
    function b(c) {
      "collapsed" !== a.defaultNodeState && (a.defaultNodeState = "expanded"), c && void 0 === c.state && (c.children && c.children.length > 0 ? (c.state = a.defaultNodeState, c.children.forEach(b)) : c.state = "leaf")
    }
    b(a.tree), a.context = a.context || {}, a.selectNode = function(b) {
      function c() {
        "expanded" === b.state ? b.state = "collapsed" : "collapsed" === b.state && (b.state = "expanded")
      }
      a.$emit("nodeSelected", b, a.context);
      var d = a.onSelectNode && a.onSelectNode(b);
      d && d.then ? d.then(c) : c()
    }, "false" !== a.selectTranscluded && (a.clickOnTranscluded = !0)
  }]), a.directive("oci.treeview", ["$compile", function(a) {
    return {
      restrict: "E",
      transclude: !0,
      scope: {
        tree: "=",
        context: "=?",
        onSelectNode: "=?",
        defaultNodeState: "@",
        selectTranscluded: "@"
      },
      controller: "oci.treeview.ctrl",
      template: '<div class="tree">   <span ng-click="clickOnTranscluded && selectNode(tree)" ng-transclude></span>   <ul ng-if="tree.state === \'expanded\'">       <li ng-repeat="node in tree.children">           <i ng-class="node.state" ng-click="selectNode(node)"></i>           <oci.treeview tree="node" context="context" on-select-node="onSelectNode"                select-transcluded="{{selectTranscluded}}" default-node-state="{{defaultNodeState}}">               <span ng-transclude></span>           </oci.treeview>       </li>   </ul></div>',
      compile: function(b, c, d) {
        var e, f = b.contents().remove();
        return function(b, c) {
          e || (e = a(f, d)), e(b, function(a) {
            c.append(a)
          })
        }
      }
    }
  }])
}();

/*code inutile mais a garder pour le moment

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
	*/