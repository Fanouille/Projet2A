angular.module('AngularGen')
	.controller('GraphController', function ($scope,$http,$state,$mdSidenav,$rootScope) {

//-----------------------------------GRAPH WITH D3JS--------------------------------------------------------

  // size of the graph
  var width = 600,
    height = 500,
    radius = Math.min(width, height) / 2;

  // scales for node drawing. X determines size around
  // circumference of circle, Y the distance from center
  var x = d3.scale.linear().range([0, 2 * Math.PI]);
  var y = d3.scale.sqrt().range([0, radius]);

  //define graph color palette
  var color = d3.scale.ordinal().range(["#ff4d00","#ff7400","#ff9a00", "#ffc100"]); //You can also uses one of the predefined D3 color scales like var color = d3.scale.category20c();

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
  d3.json("graph/graphe.json", function(error, root) { //load data from graph.json file
    var g = svg.selectAll("g") //g element to make it focusable for labels
      .data(partition.nodes(root))
      .enter().append("g");

    var path = g.append("path") //define path to track all the arcs
      .attr("d", arc)
      .style("fill", function(d) {
        return color((d.children ? d : d.parent).name);
      })
      .on("click", click) // zoom on click
      .on('mouseover', function(d) { //executed when mouse on an arc
        if (d.depth > 0) {
          var names = getNameArray(d);
          fade(path, 0.1, names, 'name'); 
          update_crumbs(d);
        }
      })
      .on('mouseout', function(d) { //executed when mouse leave an arc
        fade(path, 1);
        remove_crumbs();
      });



    var text = g.append("text") //append label
      .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; }) //rotate label
      .attr("x", function(d) { return y(d.y); })
      .attr("dx", "5") // margin
      .attr("dy", ".70em") // vertical-align
      .text(function(d) { return d.name; });

    //function for zoom  
    function click(d) {
      if(d.children == undefined){
        $rootScope.selectedLeaf = d.name;
        $scope.leafDetail(d.name);
      };
       // fade out all text elements
      text.transition().attr("opacity", 0);
      path.transition()
        .duration(750)
        .attrTween("d", arcTween(d))
        .each("end", function(e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              var arcText = d3.select(this.parentNode).select("text");
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr("opacity", 1)
                .attr("x", function(d) { return y(d.y); })
                .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
                .text(function(d) { return d.name; });
            }
      
        });
    }
  });
  
  function arcTween(d) {// Interpolate the scales
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

 function computeTextRotation(d) {//Rotate labels
    return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;

  }
//-----------------------------------------------------------------------------------------------------------


//-----------------------------------------NAVUGATION DISPLAY------------------------------------------------  
  function update_crumbs(d) {// Updates breadcrumbs
    var crumb_container = d3.select('.crumbs'),
        sections = getNameArray(d);
    
    // Remove existing crumbs
    remove_crumbs();
    
    // Append new crumbs
    sections.reverse().forEach(function(name) {
      crumb_container.append('span')
        .classed('crumb', true)
        .text(name);
    });
  };

  function remove_crumbs() {// Removes all crumb spans
    d3.select('.crumbs').selectAll('.crumb').remove();
  };

  function getNameArray(d, array) {// Retrieve arc name and parent names
    array = array || [];

    // Push the current objects name to the array
    array.push(d.name);

    // Recurse to retrieve parent names
    if (d.parent) getNameArray(d.parent, array);

    return array;
  };
//---------------------------------------------------------------------------------------------------------


//--------------------------------------FADE THE GRAPH WHEN NOT FOCUSED------------------------------------  
  function fade(selection, opacity, comparators, comparatee) {// Fade a selection filtering out the comparator(s)
    var type = typeof comparators,
        key = comparatee ? comparatee : 'value';

    selection.filter(function(d, i) {
                  // Remove elements based on a string or number
                  if (type === "string" || type === "number") {
                    return d[key] !== comparators;

                  // Remove elements based on an array
                  } else if (type === 'object' && typeof comparators.slice === 'function') {
                    return comparators.indexOf(d[key]) === -1;

                  // If there is no comparator keep everything 
                  } else return true;
              })
              .transition('fade')
              .duration(300)
              .style('opacity', opacity);
  };   
//------------------------------------------------------------------------------------------------------
});

