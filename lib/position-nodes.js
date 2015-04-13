"use strict";

var util = require("./util"),
    d3 = require("./d3");

module.exports = positionNodes;

function positionNodes(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  // rasifix - added support for subgraphs
  created.each(function() {
    var s = d3.select(this).select(".subgraph");
    if (!s.empty()) {
      var r = d3.select(this).select("rect");
      s.attr("transform", "translate(" + r.attr("x") + "," + r.attr("y") + ")");
    }
  });

  util.applyTransition(selection, g)
    .style("opacity", 1)
    .attr("transform", translate);
}
