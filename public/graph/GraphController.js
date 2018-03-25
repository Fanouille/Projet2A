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

       $scope.leafSkilledUsers = function(leaf){
          $http.get(
            '/getUserLeafInBDD/'+ leaf
            ).then(function successCallBack(response){
              //console.log(response)
              $rootScope.Infos.push(response.data);
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
            //$scope.leafSkilledUsers($rootScope.selectedLeaf);
            
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


    //------------------------GRAPHE COMPETENCES D3----------------------------------------------------

    // size of the graph
    var width = 600,
      height = 500,
      radius = Math.min(width, height) / 2;

    // scales for node drawing. X determines size around
    // circumference of circle, Y the distance from center
    var x = d3.scale.linear().range([0, 2 * Math.PI]);
    var y = d3.scale.sqrt().range([0, radius]);

    // just uses one of the predefined D3 color scales
    var color = d3.scale.category20c();

    // add the SVG element to the HTML w/ size, add g container,
    // and center the g within the SVG element
     d3.select("#chart").selectAll("svg").remove();//clear page
    var svg = d3.select("#chart").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    // initialize the layout, don't need to do anything
    // special because data is well formatted
    var partition = d3.layout.partition();

    // define the arc shape. Scary math!
    var arc = d3.svg.arc()
      .startAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x)));
      })
      .endAngle(function(d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
      })
      .innerRadius(function(d) {
        return Math.max(0, y(d.y));
      })
      .outerRadius(function(d) {
        return Math.max(0, y(d.y + d.dy));
      });

    // add tooltip div to the graph, make it always 
    // display above graph layer but not visible by default
    var tooltip = d3.select("#chart")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("z-index", "1")
      .style("opacity", 0);

    // request JSON data, populate partition
    d3.json("graph/graphe.json", function(error, root) { //https://api.myjson.com/bins/25k9j
      var path = svg.selectAll("path")
        .data(partition.nodes(root))
        .enter().append("path")
        .attr("d", arc)
        .style("fill", function(d) {
          return color((d.children ? d : d.parent).name);
        })
      // zoom on click
        .on("click", zoom)
      // display name and value in tooltip
        .on("mouseover", function(d) {
          tooltip.html(function() {
            var text = '<b>' + d.name + '</b><br>';
            return text;
          });
          // make tooltip visible when mouse is on graph
          return tooltip.transition()
            .duration(50)
            .style("opacity", 0.9);
        })
      // place tooltip based on where mouse is
        .on("mousemove", function(d) {
          return tooltip
            .style("top", (d3.event.pageY - 10) + "px")
            .style("left", (d3.event.pageX + 10) + "px");
        })
      // remove tooltip when mouse leaves graph
        .on("mouseout", function() {
          return tooltip.style("opacity", 0);
        });

      // zoom in when clicked
      function zoom(d) {
        path.transition()
          .duration(750)
          .attrTween("d", arcTween(d));
        if(d.children == undefined){
          $rootScope.selectedLeaf = d.name;
          $scope.leafDetail(d.name);
        }
      }

    });

    // Interpolate the scales
    function arcTween(d) {
      var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, 1]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
      return function(d, i) {
        return i ? function(t) {
          return arc(d);
        } : function(t) {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
          return arc(d);
        };
      };
    }
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