angular.module('AngularGen')
	.controller('GraphController', function ($scope,$http,$state,$mdSidenav,$rootScope) {
	


  	$scope.treeData = {
  		label : '',
  		state : 'expanded',
  		children : [{
        label: 'Racine',
        state: 'collapsed',
        children: [],
      }],
    };

    $rootScope.selectedLeaf = ''
    $scope.leafDetail = function(leaf){
        $http.get(
          '/getLeafInBDD/'+ leaf
          ).then(function successCallBack(response){
            //console.log(response)
            $rootScope.Infos = response.data;
            $state.go('comp-detail');

        },function errorCallBack(error){
            console.log(error);
        })     
    }

    $scope.$on('nodeSelected', function(event, node, context) {
      if (context.selectedNode) {
        context.selectedNode.class = '';
        if (node.state === "leaf"){
          $rootScope.selectedLeaf = node.label;
          $scope.leafDetail($rootScope.selectedLeaf);
          
        }
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
    
    $scope.getMoreData = function (node) {
      return $http.get('/getCompSonInBDD/' + node.label).then(function successCallBack(response) {
          var data = response.data;
          node.children = data;
      });
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