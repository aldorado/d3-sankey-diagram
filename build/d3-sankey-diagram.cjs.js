'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var d3Array = require('d3-array');
var graphlib = require('graphlib');
var d3Collection = require('d3-collection');
var d3Interpolate = require('d3-interpolate');
var d3Selection = require('d3-selection');
var d3Transition = require('d3-transition');
var d3Dispatch = require('d3-dispatch');
var d3Format = require('d3-format');

/**
 * Create a new graph where nodes in the same rank set are merged into one node.
 *
 * Depends on the "backwards" attribute of the nodes in G, and the "delta"
 * atribute of the edges.
 *
 */
function groupedGraph (G, rankSets) {
  if ( rankSets === void 0 ) rankSets = [];

  // Not multigraph because this is only used for calculating ranks
  var GG = new graphlib.Graph({directed: true});
  if (G.nodes().length === 0) { return GG }

  // Make sure there is a minimum-rank set
  rankSets = ensureSmin(G, rankSets);

  // Construct map of node ids to the set they are in, if any
  var nodeSets = d3Collection.map();
  var set$$1;
  var id;
  var i;
  var j;
  for (i = 0; i < rankSets.length; ++i) {
    set$$1 = rankSets[i];
    if (!set$$1.nodes || set$$1.nodes.length === 0) { continue }
    id = '' + i;
    for (j = 0; j < set$$1.nodes.length; ++j) {
      nodeSets.set(set$$1.nodes[j], id);
    }
    GG.setNode(id, { type: set$$1.type, nodes: set$$1.nodes });
  }

  // use i to keep counting new ids
  var nodes = G.nodes();
  G.nodes().forEach(function (u) {
    var d = G.node(u);
    if (!nodeSets.has(u)) {
      id = '' + (i++);
      set$$1 = { type: 'same', nodes: [u] };
      nodeSets.set(u, id);
      GG.setNode(id, set$$1);
    }
  });

  // Add edges between nodes/groups
  G.edges().forEach(function (e) {
    var d = G.edge(e);
    var sourceSet = nodeSets.get(e.v);
    var targetSet = nodeSets.get(e.w);

    // Minimum edge length depends on direction of nodes:
    //  -> to -> : 1
    //  -> to <- : 0
    //  <- to -> : 0 (in opposite direction??)
    //  <- to <- : 1 in opposite direction
    var edge = GG.edge(sourceSet, targetSet) || { delta: 0 };
    if (sourceSet === targetSet) {
      edge.delta = 0;
      GG.setEdge(sourceSet, targetSet, edge);
    } else if (G.node(e.v).backwards) {
      edge.delta = Math.max(edge.delta, G.node(e.w).backwards ? 1 : 0);
      GG.setEdge(targetSet, sourceSet, edge);
    } else {
      edge.delta = Math.max(edge.delta, G.node(e.w).backwards ? 0 : 1);
      GG.setEdge(sourceSet, targetSet, edge);
    }
  });

  return GG
}

// export function linkDelta (nodeBackwards, link) {
//   if (nodeBackwards(link.source)) {
//     return nodeBackwards(link.target) ? 1 : 0
//   } else {
//     return nodeBackwards(link.target) ? 0 : 1
//   }
// }

function ensureSmin (G, rankSets) {
  for (var i = 0; i < rankSets.length; ++i) {
    if (rankSets[i].type === 'min') {
      return rankSets  // ok
    }
  }

  // find the first sourceSet node, or else use the first node
  var sources = G.sources();
  var n0 = sources.length ? sources[0] : G.nodes()[0];
  return [{ type: 'min', nodes: [ n0 ] }].concat(rankSets)
}

/**
 * Reverse edges in G to make it acyclic
 */
function makeAcyclic (G, v0) {
  var tree = findSpanningTree(G, v0);

  G.edges().forEach(function (e) {
    var rel = nodeRelationship(tree, e.v, e.w);
    if (rel < 0) {
      var label = G.edge(e) || {};
      label.reversed = true;
      G.removeEdge(e);
      G.setEdge(e.w, e.v, label);
    }
  });

  return G
}

// find spanning tree, starting from the given node.
// return new graph where nodes have depth and thread
function findSpanningTree (G, v0) {
  var visited = d3Collection.set();
  var tree = new graphlib.Graph({directed: true});
  var thread = [];

  if (!G.hasNode(v0)) { throw Error('node not in graph') }

  doDfs(G, v0, visited, tree, thread);
  G.nodes().forEach(function (u) {
    if (!visited.has(u)) {
      doDfs(G, u, visited, tree, thread);
    }
  });

  thread.forEach(function (u, i) {
    tree.node(u).thread = (i + 1 < thread.length) ? thread[i + 1] : thread[0];
  });

  return tree
}

/**
 * Returns 1 if w is a descendent of v, -1 if v is a descendent of w, and 0 if
 * they are unrelated.
 */
function nodeRelationship (tree, v, w) {
  var V = tree.node(v);
  var W = tree.node(w);
  if (V.depth < W.depth) {
    var u = V.thread;  // next node
    while (tree.node(u).depth > V.depth) {
      if (u === w) { return 1 }
      u = tree.node(u).thread;
    }
  } else if (W.depth < V.depth) {
    var u$1 = W.thread;  // next node
    while (tree.node(u$1).depth > W.depth) {
      if (u$1 === v) { return -1 }
      u$1 = tree.node(u$1).thread;
    }
  }
  return 0
}

function doDfs (G, v, visited, tree, thread, depth) {
  if ( depth === void 0 ) depth = 0;

  if (!visited.has(v)) {
    visited.add(v);
    thread.push(v);
    tree.setNode(v, { depth: depth });

    // It doesn't seem to cause a problem with letters as node ids, but numbers
    // are sorted when using G.successors(). So use G.outEdges() instead.
    var next = G.outEdges(v).map(function (e) { return e.w; });
    next.forEach(function (w, i) {
      if (!visited.has(w)) {
        tree.setEdge(v, w, { delta: 1 });
      }
      doDfs(G, w, visited, tree, thread, depth + 1);
    });
  }
}

/**
 * Take an acyclic graph and assign initial ranks to the nodes
 */
function assignInitialRanks (G) {
  // Place nodes on queue when they have no unmarked in-edges. Initially, this
  // means sources.
  var queue = G.sources();
  var seen = d3Collection.set();
  var marked = d3Collection.set();

  // Mark any loops, since they don't affect rank assignment
  G.edges().forEach(function (e) {
    if (e.v === e.w) { marked.add(edgeIdString(e)); }
  });

  G.nodes().forEach(function (v) {
    G.node(v).rank = 0;
  });

  var loop = function () {
    var v = queue.shift();
    seen.add(v);

    var V = G.node(v);
    if (!V) { G.setNode(v, (V = {})); }

    // Set rank to minimum of incoming edges
    V.rank = 0;
    G.inEdges(v).forEach(function (e) {
      var delta = G.edge(e).delta === undefined ? 1 : G.edge(e).delta;
      V.rank = Math.max(V.rank, G.node(e.v).rank + delta);
    });

    // Mark outgoing edges
    G.outEdges(v).forEach(function (e) {
      marked.add(edgeIdString(e));
    });

    // Add nodes to queue when they have no unmarked in-edges.
    G.nodes().forEach(function (n) {
      if (queue.indexOf(n) < 0 && !seen.has(n) &&
          !G.inEdges(n).some(function (e) { return !marked.has(edgeIdString(e)); })) {
        queue.push(n);
      }
    });
  };

  while (queue.length > 0) loop();
}

function edgeIdString (e) {
  return e.v + '\x01' + e.w + '\x01' + e.name
}

/**
 * Assign ranks to the nodes in G, according to rankSets.
 */
function assignRanks (G, rankSets) {
  // Group nodes together, and add additional edges from Smin to sources
  var GG = groupedGraph(G, rankSets);
  if (GG.nodeCount() === 0) { return }

  // Add additional edges from Smin to sources
  addTemporaryEdges(GG);

  // Make the graph acyclic
  makeAcyclic(GG, '0');

  // Assign the initial ranks
  assignInitialRanks(GG);

  // XXX improve initial ranking...
  moveSourcesRight(GG);

  // Apply calculated ranks to original graph
  // const ranks = []
  GG.nodes().forEach(function (u) {
    var groupedNode = GG.node(u);
    // while (node.rank >= ranks.length) ranks.push([])
    groupedNode.nodes.forEach(function (v) {
      G.node(v).rank = groupedNode.rank;
    });
  });
  // return ranks
}

// export function nodeBackwards (link) {
//   if (link.source.direction === 'l') {
//     return link.target.direction === 'l' ? 1 : 0
//   } else {
//     return link.target.direction === 'l' ? 0 : 1
//   }
// }

function addTemporaryEdges (GG) {
  // Add temporary edges between Smin and sources
  GG.sources().forEach(function (u) {
    if (u !== '0') {
      GG.setEdge('0', u, { temp: true, delta: 0 });
    }
  });

  // XXX Should also add edges from sinks to Smax

  // G.nodes().forEach(u => {
  //   if (!nodeSets.has(u)) {
  //     GG.
  //   }
  // });
}

function moveSourcesRight (GG) {
  GG.edges().forEach(function (e) {
    var edge = GG.edge(e);
    if (edge.temp) { moveRight(e.w); }
  });

  function moveRight (v) {
    var V = GG.node(v);
    var rank = d3Array.min(GG.outEdges(v), function (e) { return GG.node(e.w).rank - GG.edge(e).delta; });
    if (rank !== undefined) { V.rank = rank; }
  }
}

function initialOrdering (G, ranks) {
  var order = [];
  if (ranks.length === 0) { return order }

  // Start with sources & nodes in rank 0
  var start = G.sources();
  var nodeRanks = d3Collection.map();
  ranks.forEach(function (nodes, i) {
    order.push([]);
    nodes.forEach(function (u) {
      if (i === 0 && start.indexOf(u) < 0) { start.push(u); }
      nodeRanks.set(u, i);
    });
  });

  graphlib.alg.preorder(G, start).forEach(function (u) {
    order[nodeRanks.get(u)].push(u);
  });

  return order
}

/** @module node-ordering/count-crossings */

/**
 * Count the total number of crossings between 2 layers.
 *
 * This is the sum of the countBetweenCrossings and countLoopCrossings.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
function countCrossings (G, orderA, orderB) {
  return (
    countBetweenCrossings(G, orderA, orderB) // +
    // countLoopCrossings(G, orderA, orderB)
  )
}

/**
 * Count the number of crossings of edges passing between 2 layers.
 *
 * Algorithm from
 * http://jgaa.info/accepted/2004/BarthMutzelJuenger2004.8.2.pdf
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */
function countBetweenCrossings (G, orderA, orderB) {
  var north;
  var south;
  var q;

  if (orderA.length > orderB.length) {
    north = orderA;
    south = orderB;
  } else {
    north = orderB;
    south = orderA;
  }
  q = south.length;

  // lexicographically sorted edges from north to south
  var southSeq = [];
  north.forEach(function (u) {
    south.forEach(function (v, j) {
      if (G.hasEdge(u, v) || G.hasEdge(v, u)) { southSeq.push(j); }
    });
  });

  // build accumulator tree
  var firstIndex = 1;
  while (firstIndex < q) { firstIndex *= 2; }
  var treeSize = 2 * firstIndex - 1;  // number of tree nodes
  firstIndex -= 1;                      // index of leftmost leaf

  var tree = new Array(treeSize);
  for (var i = 0; i < treeSize; i++) { tree[i] = 0; }

  // count the crossings
  var count = 0;
  southSeq.forEach(function (k) {
    var index = k + firstIndex;
    tree[index]++;
    while (index > 0) {
      if (index % 2) { count += tree[index + 1]; }
      index = Math.floor((index - 1) / 2);
      tree[index]++;
    }
  });

  return count
}

/**
 * Count the number of crossings from within-layer edges.
 *
 * @param {Graph} G - The graph.
 * @param {Array} orderA - List of node ids on left side.
 * @param {Array} orderB - List of node ids on right side.
 */

function swapNodes (G, order) {
  var improved = true;
  while (improved) {
    improved = false;
    for (var i = 0; i < order.length; ++i) {
      for (var j = 0; j < order[i].length - 1; ++j) {
        var count0 = allCrossings$1(G, order, i);
        transpose(order[i], j, j + 1);
        var count1 = allCrossings$1(G, order, i);

        if (count1 < count0) {
          improved = true;
        } else {
          transpose(order[i], j, j + 1);  // put back
        }
      }
    }
  }
}

function allCrossings$1 (G, order, i) {
  var count = 0;
  if (i > 0) {
    count += countCrossings(G, order[i - 1], order[i]);
  }
  if (i + 1 < order.length) {
    count += countCrossings(G, order[i], order[i + 1]);
  }
  return count
}

function transpose (list, i, j) {
  var tmp = list[i];
  list[i] = list[j];
  list[j] = tmp;
}

function medianValue (positions) {
  var m = Math.floor(positions.length / 2);
  if (positions.length === 0) {
    return -1
  } else if (positions.length % 2 === 1) {
    return positions[m]
  } else if (positions.length === 2) {
    return (positions[0] + positions[1]) / 2
  } else {
    var left = positions[m - 1] - positions[0];
    var right = positions[positions.length - 1] - positions[m];
    return (positions[m - 1] * right + positions[m] * left) / (left + right)
  }
}

function neighbourPositions (G, order, i, j, u, includeLoops) {
  if ( includeLoops === void 0 ) includeLoops = false;

  // current rank i
  // neighbour rank j
  var thisRank = order[i];
  var otherRank = order[j];

  var positions = [];

  // neighbouring positions on other rank
  otherRank.forEach(function (n, i) {
    if (G.nodeEdges(n, u).length > 0) {
      positions.push(i);
    }
  });

  if (positions.length === 0 && includeLoops) {
    // if no neighbours in other rank, look for loops to this rank
    // XXX only on one side?
    thisRank.forEach(function (n, i) {
      if (G.nodeEdges(n, u).length > 0) {
        positions.push(i + 0.5);
      }
    });
  }

  positions.sort(function (a, b) { return a - b; });

  return positions
}

/**
 * Sort arr according to order. -1 in order means stay in same position.
 */
function sortByPositions (arr, order) {
  var origOrder = d3Collection.map(arr.map(function (d, i) { return [d, i]; }), function (d) { return d[0]; });

  // console.log('sorting', arr, order, origOrder)
  for (var i = 1; i < arr.length; ++i) {
    // console.group('start', i, arr[i])
    for (var k = i; k > 0; --k) {
      var j = k - 1;
      var a = order.get(arr[j]);
      var b = order.get(arr[k]);

      // count back over any fixed positions (-1)
      while ((a = order.get(arr[j])) === -1 && j > 0) { j--; }

      // console.log(j, k, arr[j], arr[k], a, b)
      if (b === -1 || a === -1) {
        // console.log('found -1', a, b, 'skipping', j, k)
        break
      }

      if (a === b) {
        a = origOrder.get(arr[j]);
        b = origOrder.get(arr[k]);
        // console.log('a == b, switching to orig order', a, b)
      }

      if (b >= a) {
        // console.log('k > k -1, stopping')
        break
      }
      // console.log('swapping', arr[k], arr[j])
      // swap arr[k], arr[j]
      var assign;
      (assign = [arr[j], arr[k]], arr[k] = assign[0], arr[j] = assign[1]);
      // console.log(arr)
    }
    // console.groupEnd()
  }
  // console.log('-->', arr)
}

function sortNodes$1 (G, order, sweepDirection, includeLoops) {
  if ( sweepDirection === void 0 ) sweepDirection = 1;
  if ( includeLoops === void 0 ) includeLoops = false;

  if (sweepDirection > 0) {
    var loop = function ( r ) {
      var medians = d3Collection.map();
      order[r].forEach(function (u) {
        var neighbour = medianValue(neighbourPositions(G, order, r, r - 1, u, includeLoops));
        medians.set(u, neighbour);
      });
      sortByPositions(order[r], medians);
    };

    for (var r = 1; r < order.length; ++r) loop( r );
  } else {
    var loop$1 = function ( r ) {
      var medians$1 = d3Collection.map();
      order[r].forEach(function (u) {
        var neighbour = medianValue(neighbourPositions(G, order, r, r + 1, u, includeLoops));
        medians$1.set(u, neighbour);
      });
      sortByPositions(order[r], medians$1);
    };

    for (var r$1 = order.length - 2; r$1 >= 0; --r$1) loop$1( r$1 );
  }
}

/** @module node-ordering */

/**
 * Sorts the nodes in G, setting the `depth` attribute on each.
 *
 * @param {Graph} G - The graph. Nodes must have a `rank` attribute.
 *
 */
function sortNodes (G, maxIterations) {
  if ( maxIterations === void 0 ) maxIterations = 25;

  var ranks = getRanks(G);
  var order = initialOrdering(G, ranks);
  var best = order;
  var i = 0;

  while (i++ < maxIterations) {
    sortNodes$1(G, order, (i % 2 === 0));
    swapNodes(G, order);
    if (allCrossings(G, order) < allCrossings(G, best)) {
      // console.log('improved', allCrossings(G, order), order);
      best = copy(order);
    }
  }

  // Assign depth to nodes
  // const depths = map()
  best.forEach(function (nodes) {
    nodes.forEach(function (u, i) {
      // depths.set(u, i)
      G.node(u).depth = i;
    });
  });
}

function getRanks (G) {
  var ranks = [];
  G.nodes().forEach(function (u) {
    var r = G.node(u).rank || 0;
    while (r >= ranks.length) { ranks.push([]); }
    ranks[r].push(u);
  });
  return ranks
}

function allCrossings (G, order) {
  var count = 0;
  for (var i = 0; i < order.length - 1; ++i) {
    count += countCrossings(G, order[i], order[i + 1]);
  }
  return count
}

function copy (order) {
  var result = [];
  order.forEach(function (rank) {
    result.push(rank.map(function (d) { return d; }));
  });
  return result
}

function addDummyNodes (G) {
  // Add edges & dummy nodes
  if (typeof G.graph() !== 'object') { G.setGraph({}); }
  G.graph().dummyChains = [];
  G.edges().forEach(function (e) { return normaliseEdge(G, e); });
}

// based on https://github.com/cpettitt/dagre/blob/master/lib/normalize.js
function normaliseEdge (G, e) {
  var edge = G.edge(e);
  var dummies = dummyNodes(G.node(e.v), G.node(e.w));
  if (dummies.length === 0) { return }

  G.removeEdge(e);

  var v = e.v;
  dummies.forEach(function (dummy, i) {
    var id = "__" + (e.v) + "_" + (e.w) + "_" + i;
    if (!G.hasNode(id)) {
      dummy.dummy = 'edge';
      G.setNode(id, dummy);
      if (i === 0) {
        G.graph().dummyChains.push(id);
      }
    }
    addDummyEdge(v, (v = id));
  });
  addDummyEdge(v, e.w);

  function addDummyEdge (v, w) {
    var label = { points: [], value: edge.value, origEdge: e, origLabel: edge };
    G.setEdge(v, w, label, e.name);
  }
}

function removeDummyNodes (G) {
  var chains = G.graph().dummyChains || [];
  chains.forEach(function (v) {
    var node = G.node(v);
    var dummyEdges = G.inEdges(v).map(function (e) { return G.edge(e); });

    // Set dy and starting point of edge and add back to graph
    dummyEdges.forEach(function (dummyEdge) {
      dummyEdge.origLabel.dy = dummyEdge.dy;
      dummyEdge.origLabel.x0 = dummyEdge.x0;
      dummyEdge.origLabel.y0 = dummyEdge.y0;
      dummyEdge.origLabel.r0 = dummyEdge.r0;
      dummyEdge.origLabel.d0 = dummyEdge.d0;
      G.setEdge(dummyEdge.origEdge, dummyEdge.origLabel);
    });
    var r1s = dummyEdges.map(function (dummyEdge) { return dummyEdge.r1; });

    // Walk through chain
    var w;
    while (node.dummy) {
      dummyEdges = G.outEdges(v).map(function (e) { return G.edge(e); });
      dummyEdges.forEach(function (dummyEdge, i) {
        dummyEdge.origLabel.points.push({
          x: (node.x0 + node.x1) / 2,
          y: dummyEdge.y0,
          d: dummyEdge.d0,
          ro: dummyEdge.r0,
          ri: r1s[i]  // from last edge
        });
      });
      r1s = dummyEdges.map(function (dummyEdge) { return dummyEdge.r1; });

      // move on
      w = G.successors(v)[0];
      G.removeNode(v);
      node = G.node(v = w);
    }

    // Set ending point of edge
    dummyEdges.forEach(function (dummyEdge) {
      dummyEdge.origLabel.x1 = dummyEdge.x1;
      dummyEdge.origLabel.y1 = dummyEdge.y1;
      dummyEdge.origLabel.r1 = dummyEdge.r1;
      dummyEdge.origLabel.d1 = dummyEdge.d1;
    });
  });
}

function dummyNodes (source, target) {
  var dummyNodes = [];
  var r = source.rank;

  if (r + 1 <= target.rank) {
    // add more to get forwards
    if (source.backwards) {
      dummyNodes.push({rank: r, backwards: false});  // turn around
    }
    while (++r < target.rank) {
      dummyNodes.push({rank: r, backwards: false});
    }
    if (target.backwards) {
      dummyNodes.push({rank: r, backwards: false});  // turn around
    }
  } else if (r > target.rank) {
    // add more to get backwards
    if (!source.backwards) {
      dummyNodes.push({rank: r, backwards: true});  // turn around
    }
    while (r-- > target.rank + 1) {
      dummyNodes.push({rank: r, backwards: true});
    }
    if (!target.backwards) {
      dummyNodes.push({rank: r, backwards: true});  // turn around
    }
  }

  return dummyNodes
}

function nestGraph (nodes) {
  var maxRank = d3Array.max(nodes, function (d) { return d.rank || 0; }) || 0;
  var maxBand = d3Array.max(nodes, function (d) { return d.band || 0; }) || 0;

  // const nodes = graph.nodes().concat(graph.dummyNodes())

  var nested = d3Collection.nest()
    .key(function (d) { return d.rank || 0; })
    .key(function (d) { return d.band || 0; })
    .sortValues(function (a, b) { return a.depth - b.depth; })
    .map(nodes);

  var result = new Array(maxRank + 1);
  var rank;
  for (var i = 0; i <= maxRank; ++i) {
    result[i] = new Array(maxBand + 1);
    rank = nested.get(i);
    if (rank) {
      for (var j = 0; j <= maxBand; ++j) {
        result[i][j] = rank.get(j) || [];
      }
    } else {
      for (var j$1 = 0; j$1 <= maxBand; ++j$1) {
        result[i][j$1] = [];
      }
    }
  }

  result.bandValues = bandValues(result);

  return result
}

function bandValues (nested) {
  if (nested.length === 0 || nested[0].length === 0) { return [] }

  var Nb = nested[0].length;
  var values = new Array(Nb);
  for (var i = 0; i < Nb; i++) { values[i] = 0; }

  nested.forEach(function (rank) {
    rank.forEach(function (band, j) {
      var total = d3Array.sum(band, function (d) { return d.value; });
      values[j] = Math.max(values[j], total);
    });
  });

  return values
}

// export function minEdgeDx (w, y0, y1) {
//   console.log('mindx', w, y0, y1)
//   const dy = y1 - y0
//   const ay = Math.abs(dy) - w  // final sign doesn't matter
//   const dx2 = w * w - ay * ay
//   const dx = dx2 >= 0 ? Math.sqrt(dx2) : w
//   return dx
// }

function positionHorizontally (G, width, nodeWidth) {
  // const minWidths = new Array(maxRank).fill(0)
  // G.edges().forEach(e => {
  //   const r0 = G.node(e.v).rank || 0
  //   minWidths[r0] = Math.max(minWidths[r0], minEdgeDx(G.edge(e).dy, G.node(e.v).y, G.node(e.w).y))
  // })
  // for (let i = 0; i < nested.length - 1; ++i) {
  //   minWidths[i] = 0
  //   nested[i].forEach(band => {
  //     band.forEach(d => {
  //       // edges for dummy nodes, outgoing for real nodes
  //       (d.outgoing || d.edges).forEach(e => {
  //         minWidths[i] = Math.max(minWidths[i], minEdgeDx(e))
  //       })
  //     })
  //   })
  // }
  // const totalMinWidth = sum(minWidths)
  // let dx
  // if (totalMinWidth > width) {
  //   // allocate fairly
  //   dx = minWidths.map(w => width * w / totalMinWidth)
  // } else {
  //   const spare = (width - totalMinWidth) / (nested.length - 1)
  //   dx = minWidths.map(w => w + spare)
  // }

  var maxRank = d3Array.max(G.nodes(), function (u) { return G.node(u).rank || 0; }) || 0;
  var dx = (width - nodeWidth) / maxRank;

  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.x0 = dx * (node.rank || 0);
    node.x1 = node.x0 + nodeWidth;
  });
}

function defaultSeparation (a, b) {
  return 1
}

function positionNodesVertically () {
  var separation = defaultSeparation;

  function layout (nested, totalHeight, whitespace) {
    nested.forEach(function (layer) {
      var y = 0;
      layer.forEach(function (band, j) {
        // Height of this band, based on fraction of value
        var bandHeight = nested.bandValues[j] / d3Array.sum(nested.bandValues) * totalHeight;

        var margin = whitespace * bandHeight / 5;
        var height = bandHeight - 2 * margin;
        var total = d3Array.sum(band, function (d) { return d.dy; });
        var gaps = band.map(function (d, i) {
          if (!d.value) { return 0 }
          return band[i + 1] ? separation(band[i], band[i + 1], layout) : 0
        });
        var space = Math.max(0, height - total);
        var kg = d3Array.sum(gaps) ? space / d3Array.sum(gaps) : 0;

        var isFirst = true;
        var isLast = true;  // XXX bands

        var yy = y + margin;
        if (band.length === 1) {
          // centre vertically
          yy += (height - band[0].dy) / 2;
        }

        var prevGap = isFirst ? Number.MAX_VALUE : 0;  // edge of graph
        band.forEach(function (node, i) {
          node.y = yy;
          node.spaceAbove = prevGap;
          node.spaceBelow = gaps[i] * kg;
          yy += node.dy + node.spaceBelow;
          prevGap = node.spaceBelow;

          // XXX is this a good idea?
          if (node.data && node.data.forceY !== undefined) {
            node.y = margin + node.data.forceY * (height - node.dy);
          }
        });
        if (band.length > 0) {
          band[band.length - 1].spaceBelow = isLast ? Number.MAX_VALUE : 0;  // edge of graph
        }

        y += bandHeight;
      });
    });
  }

  layout.separation = function (x) {
    if (!arguments.length) { return separation }
    separation = required$1(x);
    return layout
  };

  return layout
}

function required$1 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function prepareNodePorts (G, sortPorts) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    var ports = d3Collection.map();
    function getOrSet (id, side) {
      if (ports.has(id)) { return ports.get(id) }
      var port = { id: id, node: node.data, side: side, incoming: [], outgoing: [] };
      ports.set(id, port);
      return port
    }

    G.inEdges(u).forEach(function (e) {
      var edge = G.edge(e);
      var port = getOrSet(edge.targetPortId || 'in', node.direction !== 'l' ? 'west' : 'east');
      port.incoming.push(e);
      edge.targetPort = port;
    });
    G.outEdges(u).forEach(function (e) {
      var edge = G.edge(e);
      var port = getOrSet(edge.sourcePortId || 'out', node.direction !== 'l' ? 'east' : 'west');
      port.outgoing.push(e);
      edge.sourcePort = port;
    });

    node.ports = ports.values();
    node.ports.sort(sortPorts);

    // Set positions of ports, roughly -- so the other endpoints of links are
    // known approximately when being sorted.
    var y = {west: 0, east: 0};
    var i = {west: 0, east: 0};
    node.ports.forEach(function (port) {
      port.y = y[port.side];
      port.index = i[port.side];
      port.dy = Math.max(d3Array.sum(port.incoming, function (e) { return G.edge(e).dy; }),
                         d3Array.sum(port.outgoing, function (e) { return G.edge(e).dy; }));
      var x = (port.side === 'west' ? node.x0 : node.x1);

      port.outgoing.forEach(function (e) {
        var link = G.edge(e);
        link.x0 = x;
        link.y0 = node.y + port.y + link.dy / 2;
      });
      port.incoming.forEach(function (e) {
        var link = G.edge(e);
        link.x1 = x;
        link.y1 = node.y + port.y + link.dy / 2;
      });
      y[port.side] += port.dy;
      i[port.side] += 1;
    });
  });
}

function linkDirection (G, e, head) {
  if ( head === void 0 ) head = true;

  if (e.v === e.w) {
    // pretend self-links go downwards
    return Math.PI / 2 * (head ? +1 : -1)
  } else {
    // const source = G.node(e.v)
    // const target = G.node(e.w)
    // return Math.atan2(target.y - source.y,
    //                   target.x0 - source.x1)
    var link = G.edge(e);
    return Math.atan2(link.y1 - link.y0,
                      link.x1 - link.x0)
  }
}

/** @module edge-ordering */

/**
 * Order the edges at all nodes.
 */
function orderEdges (G, opts) {
  G.nodes().forEach(function (u) { return orderEdgesOne(G, u, opts); });
}

/**
 * Order the edges at the given node.
 * The ports have already been setup and sorted.
 */
function orderEdgesOne (G, v) {
  var node = G.node(v);
  node.ports.forEach(function (port) {
    port.incoming.sort(compareDirection(G, node, false));
    port.outgoing.sort(compareDirection(G, node, true));
  });
}

/**
 * Sort links based on their endpoints & type
 */
function compareDirection (G, node, head) {
  if ( head === void 0 ) head = true;

  return function (a, b) {
    var da = linkDirection(G, a, head);
    var db = linkDirection(G, b, head);
    var c = head ? 1 : -1;

    // links between same node, sort on type
    if (a.v === b.v && a.w === b.w && Math.abs(da - db) < 1e-3) {
      if (typeof a.name === 'number' && typeof b.name === 'number') {
        return a.name - b.name
      } else if (typeof a.name === 'string' && typeof b.name === 'string') {
        return a.name.localeCompare(b.name)
      } else {
        return 0
      }
    }

    // loops to same slice based on y-position
    if (Math.abs(da - db) < 1e-3) {
      if (a.w === b.w) {
        return G.node(b.v).y - G.node(a.v).y
      } else if (a.v === b.v) {
        return G.node(b.w).y - G.node(a.w).y
      } else {
        return 0
      }
    }

    // otherwise sort by direction
    return c * (da - db)
  }
}

function findFirst(links, p) {
  var jmid = null;
  for (var j = 0; j < links.length; ++j) {
    if (p(links[j])) { jmid = j; break; }
  }
  return jmid;
}


/**
 * Adjust radii of curvature to avoid overlaps, as much as possible.
 * @param links - the list of links, ordered from outside to inside of bend
 * @param rr - "r0" or "r1", the side to work on
 */
function sweepCurvatureInwards(links, rr) {
  if (links.length === 0) { return; }

  // sweep from inside of curvature towards outside
  var Rmin = 0, h;
  for (var i = links.length - 1; i >= 0; --i) {
    h = links[i].dy / 2;
    if (links[i][rr] - h < Rmin) {  // inner radius
      links[i][rr] = Math.min(links[i].Rmax, Rmin + h);
    }
    Rmin = links[i][rr] + h;
  }

  // sweep from outside of curvature towards centre
  var Rmax = links[0].Rmax + links[0].dy / 2;
  for (var i$1 = 0; i$1 < links.length; ++i$1) {
    h = links[i$1].dy / 2;
    if (links[i$1][rr] + h > Rmax) {  // outer radius
      links[i$1][rr] = Math.max(h, Rmax - h);
    }
    Rmax = links[i$1][rr] - h;
  }

}

/**
 * Edge positioning.
 *
 * @module link-positioning
 */

/*
 * Requires incoming and outgoing attributes on nodes
 */
function layoutLinks (G) {
  setEdgeEndpoints(G);
  setEdgeCurvatures(G);
  return G
}

function setEdgeEndpoints (G) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.ports.forEach(function (port) {
      var sy = node.y + port.y;
      var ty = node.y + port.y;

      port.outgoing.forEach(function (e) {
        var link = G.edge(e);
        // link.x0 = node.x1
        link.y0 = sy + link.dy / 2;
        link.d0 = node.backwards ? 'l' : 'r';
        link.dy = link.dy;
        sy += link.dy;
      });

      port.incoming.forEach(function (e) {
        var link = G.edge(e);
        // link.x1 = node.x0
        link.y1 = ty + link.dy / 2;
        link.d1 = node.backwards ? 'l' : 'r';
        link.dy = link.dy;
        ty += link.dy;
      });
    });
  });
}

function setEdgeCurvatures (G) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.ports.forEach(function (port) {
      setEdgeEndCurvatures(G, port.outgoing, 'r0');
      setEdgeEndCurvatures(G, port.incoming, 'r1');
    });
  });
}

function maximumRadiusOfCurvature (link) {
  var Dx = link.x1 - link.x0;
  var Dy = link.y1 - link.y0;
  if (link.d0 !== link.d1) {
    return Math.abs(Dy) / 2.1
  } else {
    return (Dy !== 0) ? (Dx * Dx + Dy * Dy) / Math.abs(4 * Dy) : Infinity
  }
}

function setEdgeEndCurvatures (G, edges, rr) {
  var links = edges.map(function (e) { return G.edge(e); });

  // initialise segments, find reversal of curvature
  links.forEach(function (link) {
    // const link = (i < 0) ? link.segments[link.segments.length + i] : link.segments[i]
    link.Rmax = maximumRadiusOfCurvature(link);
    link[rr] = Math.max(link.dy / 2, (link.d0 === link.d1 ? link.Rmax * 0.6 : (5 + link.dy / 2)));
  });

  var jmid = (rr === 'r0'
              ? findFirst(links, function (f) { return f.y1 > f.y0; })
              : findFirst(links, function (f) { return f.y0 > f.y1; }));
  if (jmid === null) { jmid = links.length; }

  // Set maximum radius down from middle
  sweepCurvatureInwards(links.slice(jmid), rr);

  // Set maximum radius up from middle
  if (jmid > 0) {
    var links2 = [];
    for (var j = jmid - 1; j >= 0; j--) { links2.push(links[j]); }
    sweepCurvatureInwards(links2, rr);
  }
}

function buildGraph (graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue) {
  var G = new graphlib.Graph({ directed: true, multigraph: true });
  graph.nodes.forEach(function (node, i) {
    var id = nodeId(node, i);
    if (G.hasNode(id)) { throw new Error('duplicate: ' + id) }
    G.setNode(id, {
      data: node,
      index: i,
      backwards: nodeBackwards(node, i),
      // XXX don't need these now have nodePositions?
      x0: node.x0,
      x1: node.x1,
      y: node.y0
    });
  });

  graph.links.forEach(function (link, i) {
    var v = idAndPort(sourceId(link, i));
    var w = idAndPort(targetId(link, i));
    var label = {
      data: link,
      sourcePortId: v.port,
      targetPortId: w.port,
      index: i,
      points: [],
      value: linkValue(link, i),
      type: linkType(link, i)
    };
    if (!G.hasNode(v.id)) { throw new Error('missing: ' + v.id) }
    if (!G.hasNode(w.id)) { throw new Error('missing: ' + w.id) }
    G.setEdge(v.id, w.id, label, linkType(link, i));
  });

  G.setGraph({});

  return G
}

function idAndPort (x) {
  if (typeof x === 'object') { return x }
  return {id: x, port: undefined}
}

/**
 */

function defaultNodes (graph) {
  return graph.nodes
}

function defaultLinks (graph) {
  return graph.links
}

function defaultNodeId (d) {
  return d.id
}

function defaultNodeBackwards (d) {
  return d.direction && d.direction.toLowerCase() === 'l'
}

function defaultSourceId (d) {
  // return typeof d.source === 'object' ? d.source.id : d.source
  return {
    id: typeof d.source === 'object' ? d.source.id : d.source,
    port: typeof d.sourcePort === 'object' ? d.sourcePort.id : d.sourcePort
  }
}

function defaultTargetId (d) {
  // return typeof d.target === 'object' ? d.target.id : d.target
  return {
    id: typeof d.target === 'object' ? d.target.id : d.target,
    port: typeof d.targetPort === 'object' ? d.targetPort.id : d.targetPort
  }
}

function defaultLinkType (d) {
  return d.type
}

function defaultSortPorts (a, b) {
  // XXX weighted sum
  return a.id.localeCompare(b.id)
}

// function defaultNodeSubdivisions

function sankeyLayout () {
  var nodes = defaultNodes;
  var links = defaultLinks;
  var nodeId = defaultNodeId;
  var nodeBackwards = defaultNodeBackwards;
  var sourceId = defaultSourceId;
  var targetId = defaultTargetId;
  var linkType = defaultLinkType;
  var ordering = null;
  var rankSets = [];
  var maxIterations = 25; // XXX setter/getter
  var nodePosition = null;
  var sortPorts = defaultSortPorts;

  // extent
  var x0 = 0;
  var y0 = 0;
  var x1 = 1;
  var y1 = 1;

  // node width
  var dx = 1;

  var scale = null;
  var linkValue = function (e) { return e.value };
  var whitespace = 0.5;
  var verticalLayout = positionNodesVertically();

  function sankey () {
    var graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    var G = buildGraph(graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue);

    setNodeValues(G, linkValue);

    if (nodePosition) {
      // hard-coded node positions

      G.nodes().forEach(function (u) {
        var node = G.node(u);
        var pos = nodePosition(node.data);
        node.x0 = pos[0];
        node.x1 = pos[0] + dx;
        node.y = pos[1];
      });
      setWidths(G, scale);
    } else {
      // calculate node positions

      if (ordering !== null) {
        applyOrdering(G, ordering);
      } else {
        assignRanks(G, rankSets);
        sortNodes(G, maxIterations);
      }

      addDummyNodes(G);
      setNodeValues(G, linkValue);
      if (ordering === null) {
        // XXX sort nodes?
        sortNodes(G, maxIterations);
      }

      var nested = nestGraph(G.nodes().map(function (u) { return G.node(u); }));
      maybeScaleToFit(G, nested);
      setWidths(G, scale);

      // position nodes
      verticalLayout(nested, y1 - y0, whitespace);
      positionHorizontally(G, x1 - x0, dx);

      // adjust origin
      G.nodes().forEach(function (u) {
        var node = G.node(u);
        node.x0 += x0;
        node.x1 += x0;
        node.y += y0;
      });
    }

    // sort & position links
    prepareNodePorts(G, sortPorts);
    orderEdges(G);
    layoutLinks(G);

    removeDummyNodes(G);
    addLinkEndpoints(G);

    copyResultsToGraph(G, graph);

    return graph
  }

  sankey.update = function (graph, doOrderLinks) {
    var G = buildGraph(graph, nodeId, nodeBackwards, sourceId, targetId, linkType, linkValue);
    setNodeValues(G, linkValue);
    var nested = nestGraph(G.nodes().map(function (u) { return G.node(u); }));
    maybeScaleToFit(G, nested);
    setWidths(G, scale);

    prepareNodePorts(G, sortPorts);
    orderEdges(G);
    layoutLinks(G);

    // removeDummyNodes(G)
    addLinkEndpoints(G);

    copyResultsToGraph(G, graph);

    return graph
  };
  //   if (scale === null) sankey.scaleToFit(graph)
  //   // set node and edge sizes
  //   setNodeValues(graph, linkValue, scale)
  //   if (doOrderLinks) {
  //     orderLinks(graph)
  //   }
  //   layoutLinks(graph)
  //   return graph
  // }

  sankey.nodes = function (x) {
    if (arguments.length) {
      nodes = required(x);
      return sankey
    }
    return nodes
  };

  sankey.links = function (x) {
    if (arguments.length) {
      links = required(x);
      return sankey
    }
    return links
  };

  sankey.nodeId = function (x) {
    if (arguments.length) {
      nodeId = required(x);
      return sankey
    }
    return nodeId
  };

  sankey.nodeBackwards = function (x) {
    if (arguments.length) {
      nodeBackwards = required(x);
      return sankey
    }
    return nodeBackwards
  };

  sankey.sourceId = function (x) {
    if (arguments.length) {
      sourceId = required(x);
      return sankey
    }
    return sourceId
  };

  sankey.targetId = function (x) {
    if (arguments.length) {
      targetId = required(x);
      return sankey
    }
    return targetId
  };

  sankey.linkType = function (x) {
    if (arguments.length) {
      linkType = required(x);
      return sankey
    }
    return linkType
  };

  sankey.sortPorts = function (x) {
    if (arguments.length) {
      sortPorts = required(x);
      return sankey
    }
    return sortPorts
  };

  // sankey.scaleToFit = function (graph) {
  function maybeScaleToFit (G, nested) {
    if (scale !== null) { return }
    var maxValue = d3Array.sum(nested.bandValues);
    if (maxValue <= 0) {
      scale = 1;
    } else {
      scale = (y1 - y0) / maxValue;
      if (whitespace !== 1) { scale *= (1 - whitespace); }
    }
  }

  sankey.ordering = function (x) {
    if (!arguments.length) { return ordering }
    ordering = x;
    return sankey
  };

  sankey.rankSets = function (x) {
    if (!arguments.length) { return rankSets }
    rankSets = x;
    return sankey
  };

  sankey.nodeWidth = function (x) {
    if (!arguments.length) { return dx }
    dx = x;
    return sankey
  };

  sankey.nodePosition = function (x) {
    if (!arguments.length) { return nodePosition }
    nodePosition = x;
    return sankey
  };

  sankey.size = function (x) {
    if (!arguments.length) { return [x1 - x0, y1 - y0] }
    x0 = y0 = 0;
    x1 = +x[0];
    y1 = +x[1];
    return sankey
  };

  sankey.extent = function (x) {
    if (!arguments.length) { return [[x0, y0], [x1, y1]] }
    x0 = +x[0][0];
    y0 = +x[0][1];
    x1 = +x[1][0];
    y1 = +x[1][1];
    return sankey
  };

  sankey.whitespace = function (x) {
    if (!arguments.length) { return whitespace }
    whitespace = x;
    return sankey
  };

  sankey.scale = function (x) {
    if (!arguments.length) { return scale }
    scale = x;
    return sankey
  };

  sankey.linkValue = function (x) {
    if (!arguments.length) { return linkValue }
    linkValue = x;
    return sankey
  };

  sankey.verticalLayout = function (x) {
    if (!arguments.length) { return verticalLayout }
    verticalLayout = required(x);
    return sankey
  };

  function applyOrdering (G, ordering) {
    ordering.forEach(function (x, i) {
      x.forEach(function (u, j) {
        if (u.forEach) {
          u.forEach(function (v, k) {
            var d = G.node(v);
            if (d) {
              d.rank = i;
              d.band = j;
              d.depth = k;
            }
          });
        } else {
          var d = G.node(u);
          if (d) {
            d.rank = i;
            // d.band = 0
            d.depth = j;
          }
        }
      });
    });
  }

  return sankey
}

function setNodeValues (G, linkValue) {
  G.nodes().forEach(function (u) {
    var d = G.node(u);
    var incoming = d3Array.sum(G.inEdges(u), function (e) { return G.edge(e).value; });
    var outgoing = d3Array.sum(G.outEdges(u), function (e) { return G.edge(e).value; });
    d.value = Math.max(incoming, outgoing);
  });
}

function setWidths (G, scale) {
  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.dy = edge.value * scale;
  });
  G.nodes().forEach(function (u) {
    var node = G.node(u);
    node.dy = node.value * scale;
  });
}

function required (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function addLinkEndpoints (G) {
  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.points.unshift({x: edge.x0, y: edge.y0, ro: edge.r0, d: edge.d0});
    edge.points.push({x: edge.x1, y: edge.y1, ri: edge.r1, d: edge.d1});
  });
}

function copyResultsToGraph (G, graph) {
  G.nodes().forEach(function (u) {
    var node = G.node(u);

    // Build lists of edge data objects
    node.data.incoming = [];
    node.data.outgoing = [];
    node.data.ports = node.ports;
    node.data.ports.forEach(function (port) {
      port.incoming = [];
      port.outgoing = [];
    });

    node.data.dy = node.dy;
    node.data.x0 = node.x0;
    node.data.x1 = node.x1;
    node.data.y0 = node.y;
    node.data.y1 = node.y + node.dy;
    node.data.rank = node.rank;
    node.data.band = node.band;
    node.data.depth = node.depth;
    node.data.value = node.value;
    node.data.spaceAbove = node.spaceAbove;
    node.data.spaceBelow = node.spaceBelow;
  });

  G.edges().forEach(function (e) {
    var edge = G.edge(e);
    edge.data.source = G.node(e.v).data;
    edge.data.target = G.node(e.w).data;
    edge.data.sourcePort = edge.sourcePort;
    edge.data.targetPort = edge.targetPort;
    // console.log(edge)
    edge.data.source.outgoing.push(edge.data);
    edge.data.target.incoming.push(edge.data);
    if (edge.data.sourcePort) { edge.data.sourcePort.outgoing.push(edge.data); }
    if (edge.data.targetPort) { edge.data.targetPort.incoming.push(edge.data); }
    edge.data.value = edge.value;
    edge.data.type = edge.type;
    edge.data.dy = edge.dy;
    edge.data.points = edge.points || [];
    // edge.data.id = `${e.v}-${e.w}-${e.name}`
  });
}

function positionNodesVertically$1 () {
  var iterations = 25;
  var nodePadding = 8;

  function layout (nested, height) {
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1, i = iterations; i > 0; --i) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth () {
      nested.forEach(function (layer) {
        var i = 0;
        layer.forEach(function (band) {
          // ignore bands for this layout
          band.forEach(function (node) {
            node.y = i++;
          });
        });
      });
    }

    function relaxLeftToRight (alpha) {
      nested.forEach(function (layer) {
        layer.forEach(function (band) {
          band.forEach(function (node) {
            var edges = node.incoming || node.edges;
            if (edges.length) {
              var y = d3Array.sum(edges, weightedSource) / d3Array.sum(edges, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });
      });

      function weightedSource (link) {
        return center(link.source) * link.value
      }
    }

    function relaxRightToLeft (alpha) {
      nested.slice().reverse().forEach(function (layer) {
        layer.forEach(function (band) {
          band.forEach(function (node) {
            var edges = node.outgoing || node.edges;
            if (edges.length) {
              var y = d3Array.sum(edges, weightedTarget) / d3Array.sum(edges, value);
              node.y += (y - center(node)) * alpha;
            }
          });
        });
      });

      function weightedTarget (link) {
        return center(link.target) * link.value
      }
    }

    function resolveCollisions () {
      nested.forEach(function (layer) {
        layer.forEach(function (nodes) {
          var node;
          var dy;
          var y0 = 0;
          var n = nodes.length;
          var i;

          // Push any overlapping nodes down.
          nodes.sort(ascendingDepth);
          for (i = 0; i < n; ++i) {
            node = nodes[i];
            dy = y0 - node.y;
            if (dy > 0) { node.y += dy; }
            y0 = node.y + node.dy + nodePadding;
          }

          // If the bottommost node goes outside the bounds, push it back up.
          dy = y0 - nodePadding - height;
          if (dy > 0) {
            y0 = node.y -= dy;

            // Push any overlapping nodes back up.
            for (i = n - 2; i >= 0; --i) {
              node = nodes[i];
              dy = node.y + node.dy + nodePadding - y0;
              if (dy > 0) { node.y -= dy; }
              y0 = node.y;
            }
          }
        });
      });
    }
  }

  layout.iterations = function (x) {
    if (!arguments.length) { return iterations }
    iterations = +x;
    return layout
  };

  layout.padding = function (x) {
    if (!arguments.length) { return nodePadding }
    nodePadding = +x;
    return layout
  };

  return layout
}

function center (node) {
  return 0
}

function value (link) {
  return link.value
}

function ascendingDepth (a, b) {
  return a.y - b.y
}

// function defaultSegments (d) {
//   return d.segments
// }

function defaultMinWidth (d) {
  return (d.dy === 0) ? 0 : 2
}

function sankeyLink() {
  // var segments = defaultSegments
  var minWidth = defaultMinWidth;

  function radiusBounds(d) {
    var Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        Rmin = d.dy / 2,
        Rmax = (Dx*Dx + Dy*Dy) / Math.abs(4*Dy);
    return [Rmin, Rmax];
  }

  function link(d) {
    var path = '';
    var seg;
    for (var i = 0; i < d.points.length - 1; ++i) {
      seg = {
        x0: d.points[i].x,
        y0: d.points[i].y,
        x1: d.points[i + 1].x,
        y1: d.points[i + 1].y,
        r0: d.points[i].ro,
        r1: d.points[i + 1].ri,
        d0: d.points[i].d,
        d1: d.points[i + 1].d,
        dy: d.dy
      };
      path += segmentPath(seg);
    }
    return path
  }

  function segmentPath (d) {
    var dir = (d.d0 || 'r') + (d.d1 || 'r');
    if (d.source && d.source === d.target) {
      return selfLink(d);
    }
    if (dir === 'rl') {
      return fbLink(d);
    }
    if (dir === 'rd') {
      return fdLink(d);
    }
    if (dir === 'dr') {
      return dfLink(d);
    }
    if (dir === 'lr') {
      return bfLink(d);
    }

    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1;

    if (x1 < x0) {
      var assign;
      (assign = [x1, x0], x0 = assign[0], x1 = assign[1]);
      var assign$1;
      (assign$1 = [y1, y0], y0 = assign$1[0], y1 = assign$1[1]);
    }

    var f = y1 > y0 ? 1 : -1,
        fx = 1;  // dir === 'll' ? -1 : 1;

    var Rlim = radiusBounds(d),
          defaultRadius = Math.max(Rlim[0], Math.min(Rlim[1], (x1 - x0)/3));

    var r0 = Math.max(Rlim[0], Math.min(Rlim[1], (d.r0 || defaultRadius))),
        r1 = Math.max(Rlim[0], Math.min(Rlim[1], (d.r1 || defaultRadius)));

    var dcx = (x1 - x0),
          dcy = (y1 - y0) - f * (r0 + r1),
          D = Math.sqrt(dcx*dcx + dcy*dcy);

    var phi = -f * Math.acos(Math.min(1, (r0 + r1) / D)),
          psi = Math.atan2(dcy, dcx);

    var theta = Math.PI/2 + f * (psi + phi);

    var hs = h * f * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = x0 + fx * r0 * Math.sin(Math.abs(theta)),
        x3 = x1 - fx * r1 * Math.sin(Math.abs(theta)),
        y2 = y0 + r0 * f * (1 - Math.cos(theta)),
        y3 = y1 - r1 * f * (1 - Math.cos(theta));

    if (isNaN(theta) || Math.abs(theta) < 1e-3) {
      theta = r0 = r1 = 0;
      x2 = x0;
      x3 = x1;
      y2 = y0;
      y3 = y1;
      hs = 0;
      hc = h;
    }

    function arc(dir, r) {
      var f = ( dir * (y1-y0) > 0) ? 1 : 0,
          rr = (fx * dir * (y1-y0) > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    var path;
    // if (fx * (x2 - x3) < 0 || Math.abs(y1 - y0) > 4*h) {
    // XXX this causes juddering during transitions

    path =  ("M"     + [x0,    y0-h ] + " " +
              arc(+1, r0) + [x2+hs, y2-hc] + " " +
            "L"     + [x3+hs, y3-hc] + " " +
              arc(-1, r1) + [x1,    y1-h ] + " " +
            "L"     + [x1,    y1+h ] + " " +
              arc(+1, r1) + [x3-hs, y3+hc] + " " +
            "L"     + [x2-hs, y2+hc] + " " +
              arc(-1, r0) + [x0,    y0+h ] + " " +
            "Z");
    
    if (/NaN/.test(path)) {
      console.error('path NaN', d, path);
    }
    return path;
  }

  function selfLink(d) {
    var h = Math.max(minWidth(d), d.dy) / 2,
        r = h*1.5,
        theta = 2 * Math.PI,
        x0 = d.x0,
        y0 = d.y0;

    function arc(dir) {
      var f = (dir > 0) ? 1 : 0,
          rr = (dir > 0) ? (r + h) : (r - h);
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 1 " + f + " ";
    }

    return ("M"     + [x0+0.1, y0-h] + " " +
            arc(+1) + [x0-0.1, y0-h] + " " +
            "L"     + [x0-0.1, y0+h] + " " +
            arc(-1) + [x0+0.1, y0+h] + " " +
            "Z");
  }

  function fbLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        //Rlim = radiusBounds(d),
        defaultRadius = ((d.r0 + d.r1) / 2) || (5 + h), //Math.max(Rlim[0], Math.min(Rlim[1], Dx/3)),
        r = Math.min(Math.abs(y1-y0)/2.1, defaultRadius), //2*(d.r || defaultRadius),
        theta = Math.atan2(Dy - 2*r, Dx),
        l = Math.sqrt(Math.max(0, Dx*Dx + (Dy-2*r)*(Dy-2*r))),
        f = d.y1 > d.y0 ? 1 : -1,
        hs = h * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = d.x0 + r * Math.sin(Math.abs(theta)),
        x3 = d.x1 + r * Math.sin(Math.abs(theta)),
        y2 = d.y0 + r * f * (1 - Math.cos(theta)),
        y3 = d.y1 - r * f * (1 - Math.cos(theta));

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(+1) + [x2+hs, y2-hc] + " " +
            "L"     + [x3+hs, y3-hc] + " " +
            arc(+1) + [x1,    y1+h ] + " " +
            "L"     + [x1,    y1-h ] + " " +
            arc(-1) + [x3-hs, y3+hc] + " " +
            "L"     + [x2-hs, y2+hc] + " " +
            arc(-1) + [x0,    y0+h ] + " " +
            "Z");
  }

  function fdLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        theta = Math.PI / 2,
        r = Math.max(0, x1 - x0),
        f = d.y1 > d.y0,  // = 1
        y2 = y0 + r;

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(+1) + [x1+h,  y2   ] + " " +
            "L"     + [x1+h,  y1   ] + " " +
            ""      + [x1-h,  y1   ] + " " +
            ""      + [x1-h,  y2   ] + " " +
            arc(-1) + [x0,    y0+h ] + " " +
            "Z");
  }

  function dfLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        theta = Math.PI / 2,
        r = Math.max(0, x1 - x0),
        f = d.y1 > d.y0,  // = 1
        y2 = y1 - r;

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0-h,  y0   ] + " " +
            "L"     + [x0+h,  y0   ] + " " +
            ""      + [x0+h,  y2   ] + " " +
            arc(-1) + [x1  ,  y1-h ] + " " +
            "L"     + [x1  ,  y1+h ] + " " +
            arc(+1) + [x0-h,  y2   ] + " " +
            "Z");
  }

  function bfLink(d) {
    // Minimum thickness 2px
    var h = Math.max(minWidth(d), d.dy) / 2,
        x0 = d.x0,
        x1 = d.x1,
        y0 = d.y0,
        y1 = d.y1,
        Dx = d.x1 - d.x0,
        Dy = d.y1 - d.y0,
        //Rlim = radiusBounds(d),
        defaultRadius = ((d.r0 + d.r1) / 2) || (5 + h), //Math.max(Rlim[0], Math.min(Rlim[1], Dx/3)),
        r = Math.min(Math.abs(Dy)/2.1, defaultRadius), //2*(d.r || defaultRadius),
        theta = Math.atan2(Dy - 2*r, Dx),
        l = Math.sqrt(Math.max(0, Dx*Dx + (Dy-2*r)*(Dy-2*r))),
        f = d.y1 > d.y0 ? 1 : -1,
        hs = h * Math.sin(theta),
        hc = h * Math.cos(theta),
        x2 = d.x0 - r * Math.sin(Math.abs(theta)),
        x3 = d.x1 - r * Math.sin(Math.abs(theta)),
        y2 = d.y0 + r * f * (1 - Math.cos(theta)),
        y3 = d.y1 - r * f * (1 - Math.cos(theta));

    function arc(dir) {
      var f = (dir * theta > 0) ? 1 : 0,
          rr = (-dir * theta > 0) ? (r + h) : (r - h);
      // straight line
      if (theta === 0) { rr = r; }
      return "A" + rr + " " + rr + " " + Math.abs(theta) + " 0 " + f + " ";
    }

    return ("M"     + [x0,    y0-h ] + " " +
            arc(-1) + [x2-hs, y2-hc] + " " +
            "L"     + [x3-hs, y3-hc] + " " +
            arc(-1) + [x1,    y1+h ] + " " +
            "L"     + [x1,    y1-h ] + " " +
            arc(+1) + [x3+hs, y3-hc] + " " +
            "L"     + [x2+hs, y2-hc] + " " +
            arc(+1) + [x0,    y0+h ] + " " +
            "Z");
  }

  link.minWidth = function (x) {
    if (arguments.length) {
      minWidth = required$2(x);
      return link
    }
    return minWidth
  };

  return link;
}

function required$2 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

var sankeyNode = function () {
  var nodeTitle = function (d) { return d.title !== undefined ? d.title : d.id; };
  var nodeValue = function (d) { return null; };
  var nodeVisible = function (d) { return !!nodeTitle(d); };

  function sankeyNode (context) {
    var selection = context.selection ? context.selection() : context;

    if (selection.select('text').empty()) {
      selection.append('title');
      selection.append('line')
        .attr('x1', 0)
        .attr('x2', 0);
      selection.append('rect')
        .attr('class', 'node-body');
      selection.append('text')
        .attr('class', 'node-value')
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle');
      selection.append('text')
        .attr('class', 'node-title')
        .attr('dy', '.35em');
      selection.append('rect')
        .attr('class', 'node-click-target')
        .attr('x', -5)
        .attr('y', -5)
        .attr('width', 10)
        .style('fill', 'none')
        .style('visibility', 'hidden')
        .style('pointer-events', 'all');

      selection
        .attr('transform', nodeTransform);
    }

    selection.each(function (d) {
      var title = d3Selection.select(this).select('title');
      var value = d3Selection.select(this).select('.node-value');
      var text = d3Selection.select(this).select('.node-title');
      var line = d3Selection.select(this).select('line');
      var body = d3Selection.select(this).select('.node-body');
      var clickTarget = d3Selection.select(this).select('.node-click-target');

      // Local var for title position of each node
      var layoutData = titlePosition(d);
      layoutData.dy = (d.y0 === d.y1) ? 0 : Math.max(1, d.y1 - d.y0);

      var separateValue = (d.x1 - d.x0) > 2;
      var titleText = nodeTitle(d) + ((!separateValue && nodeValue(d))
                                        ? ' (' + nodeValue(d) + ')' : '');

      // Update un-transitioned
      title
        .text(titleText);

      value
        .text(nodeValue)
        .style('display', separateValue ? 'inline' : 'none');

      text
        .attr('text-anchor', layoutData.right ? 'end' : 'start')
        .text(titleText)
        .each(wrap, 100);

      // Are we in a transition?
      if (context !== selection) {
        text = text.transition(context);
        line = line.transition(context);
        body = body.transition(context);
        clickTarget = clickTarget.transition(context);
      }

      // Update
      context
        .attr('transform', nodeTransform);

      line
        .attr('y1', function (d) { return layoutData.titleAbove ? -5 : 0 })
        .attr('y2', function (d) { return layoutData.dy })
        .style('display', function (d) {
          return (d.y0 === d.y1 || !nodeVisible(d)) ? 'none' : 'inline'
        });

      clickTarget
        .attr('height', function (d) { return layoutData.dy + 5 });

      body
        .attr('width', function (d) { return d.x1 - d.x0 })
        .attr('height', function (d) { return layoutData.dy });

      text
        .attr('transform', textTransform)
        .style('display', function (d) {
          return (d.y0 === d.y1 || !nodeVisible(d)) ? 'none' : 'inline'
        });

      value
        .style('font-size', function (d) { return Math.min(d.x1 - d.x0 - 4, d.y1 - d.y0 - 4) + 'px' })
        .attr('transform', function (d) {
          var dx = d.x1 - d.x0;
          var dy = d.y1 - d.y0;
          var theta = dx > dy ? 0 : -90;
          return 'translate(' + (dx / 2) + ',' + (dy / 2) + ') rotate(' + theta + ')'
        });

      function textTransform (d) {
        var layout = layoutData;
        var y = layout.titleAbove ? -10 : (d.y1 - d.y0) / 2;
        var x;
        if (layout.titleAbove) {
          x = (layout.right ? 4 : -4);
        } else {
          x = (layout.right ? -4 : d.x1 - d.x0 + 4);
        }
        return 'translate(' + x + ',' + y + ')'
      }
    });
  }

  sankeyNode.nodeVisible = function (x) {
    if (arguments.length) {
      nodeVisible = required$3(x);
      return sankeyNode
    }
    return nodeVisible
  };

  sankeyNode.nodeTitle = function (x) {
    if (arguments.length) {
      nodeTitle = required$3(x);
      return sankeyNode
    }
    return nodeTitle
  };

  sankeyNode.nodeValue = function (x) {
    if (arguments.length) {
      nodeValue = required$3(x);
      return sankeyNode
    }
    return nodeValue
  };

  return sankeyNode
};

function nodeTransform (d) {
  return 'translate(' + d.x0 + ',' + d.y0 + ')'
}

function titlePosition (d) {
  var titleAbove = false;
  var right = false;

  // If thin, and there's enough space, put above
  if (d.spaceAbove > 20 && d.style !== 'type') {
    titleAbove = true;
  } else {
    titleAbove = false;
  }

  if (d.incoming.length === 0) {
    right = true;
    titleAbove = false;
  } else if (d.outgoing.length === 0) {
    right = false;
    titleAbove = false;
  }

  return {titleAbove: titleAbove, right: right}
}

function wrap (d, width) {
  var text = d3Selection.select(this);
  var lines = text.text().split(/\n/);
  var lineHeight = 1.1; // ems
  if (lines.length === 1) { return }
  text.text(null);
  lines.forEach(function (line, i) {
    text.append('tspan')
      .attr('x', 0)
      .attr('dy', (i === 0 ? 0.7 - lines.length / 2 : 1) * lineHeight + 'em')
      .text(line);
  });
}

function required$3 (f) {
  if (typeof f !== 'function') { throw new Error() }
  return f
}

function positionGroup (nodes, group) {
  var rect = {
    top: Number.MAX_VALUE,
    left: Number.MAX_VALUE,
    bottom: 0,
    right: 0
  };

  group.nodes.forEach(function (n) {
    var node = nodes.get(n);
    if (!node) { return }
    if (node.x0 < rect.left) { rect.left = node.x0; }
    if (node.x1 > rect.right) { rect.right = node.x1; }
    if (node.y0 < rect.top) { rect.top = node.y0; }
    if (node.y1 > rect.bottom) { rect.bottom = node.y1; }
  });

  group.rect = rect;
  return group
}

// The reusable SVG component for the sliced Sankey diagram

function linkTitleGenerator (nodeTitle, typeTitle, fmt) {
  return function (d) {
    var parts = [];
    var sourceTitle = nodeTitle(d.source);
    var targetTitle = nodeTitle(d.target);
    var matTitle = typeTitle(d);

    parts.push((sourceTitle + " → " + targetTitle));
    if (matTitle) { parts.push(matTitle); }
    parts.push(fmt(d.value));
    return parts.join('\n')
  }
}

function sankeyDiagram () {
  var margin = {top: 0, right: 0, bottom: 0, left: 0};

  var selectedNode = null;
  var selectedEdge = null;

  var groups = [];

  var fmt = d3Format.format('.3s');
  var node = sankeyNode();
  var link = sankeyLink();

  var linkColor = function (d) { return null; };
  var linkTitle = linkTitleGenerator(node.nodeTitle(), function (d) { return d.type; }, fmt);
  var linkLabel = defaultLinkLabel;

  var listeners = d3Dispatch.dispatch('selectNode', 'selectGroup', 'selectLink');

  /* Main chart */

  function exports (context) {
    var selection = context.selection ? context.selection() : context;

    selection.each(function (G) {
      // Create the skeleton, if it doesn't already exist
      var svg = d3Selection.select(this);

      var sankey = svg.selectAll('.sankey')
            .data([{type: 'sankey'}]);

      var sankeyEnter = sankey.enter()
            .append('g')
            .classed('sankey', true);

      sankeyEnter.append('g').classed('groups', true);
      sankeyEnter.append('g').classed('links', true);  // Links below nodes
      sankeyEnter.append('g').classed('nodes', true);
      sankeyEnter.append('g').classed('slice-titles', true);  // Slice titles

      sankey = sankey.merge(sankeyEnter);

      // Update margins
      sankey
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        // .select('.slice-titles')
        // .attr('transform', 'translate(' + margin.left + ',0)')

      // Groups of nodes
      var nodeMap = d3Collection.map(G.nodes, function (n) { return n.id; });
      var groupsPositioned = (groups || []).map(function (g) { return positionGroup(nodeMap, g); });

      // Render
      updateNodes(sankey, context, G.nodes);
      updateLinks(sankey, context, G.links);
      updateGroups(svg, groupsPositioned);
      // updateSlices(svg, layout.slices(nodes));

      // Events
      svg.on('click', function () {
        listeners.call('selectNode', this, null);
        listeners.call('selectLink', this, null);
      });
    });
  }

  function updateNodes (sankey, context, nodes) {
    var nodeSel = sankey
        .select('.nodes')
        .selectAll('.node')
        .data(nodes, function (d) { return d.id; });

    // EXIT
    nodeSel.exit().remove();

    nodeSel = nodeSel.merge(
      nodeSel.enter()
        .append('g')
        .attr('class', 'node')
        .call(node)
        .on('click', selectNode));

    if (context instanceof d3Transition.transition) {
      nodeSel.transition(context)
        .call(node);
    } else {
      nodeSel.call(node);
    }
  }

  function updateLinks (sankey, context, edges) {
    var linkSel = sankey
        .select('.links')
        .selectAll('.link')
        .data(edges, function (d) { return d.source.id + '-' + d.target.id + '-' + d.type; });

    // EXIT

    linkSel.exit().remove();

    // ENTER

    var linkEnter = linkSel.enter()
        .append('g')
        .attr('class', 'link')
        .on('click', selectLink);

    linkEnter.append('path')
      .attr('d', link)
      .style('fill', 'white')
      .each(function (d) { this._current = d; });

    linkEnter.append('title');

    linkEnter.append('text')
      .attr('class', 'label')
      .attr('dy', '0.35em')
      .attr('x', function (d) { return d.points[0].x + 4; })
      .attr('y', function (d) { return d.points[0].y; });

    // UPDATE

    linkSel = linkSel.merge(linkEnter);

    // Non-transition updates
    linkSel.classed('selected', function (d) { return d.id === selectedEdge; });
    linkSel.sort(linkOrder);

    // Transition updates, if available
    if (context instanceof d3Transition.transition) {
      linkSel = linkSel.transition(context);
      linkSel
        .select('path')
        .style('fill', linkColor)
        .each(function (d) {
          d3Selection.select(this)
            .transition(context)
            .attrTween('d', interpolateLink);
        });
    } else {
      linkSel
        .select('path')
        .style('fill', linkColor)
        .attr('d', link);
    }

    linkSel.select('title')
      .text(linkTitle);

    linkSel.select('.label')
      .text(linkLabel)
      .attr('x', function (d) { return d.points[0].x + 4; })
      .attr('y', function (d) { return d.points[0].y; });
  }

  // function updateSlices(svg, slices) {
  //   var slice = svg.select('.slice-titles').selectAll('.slice')
  //         .data(slices, function(d) { return d.id; });

  //   var textWidth = (slices.length > 1 ?
  //                    0.9 * (slices[1].x - slices[0].x) :
  //                    null);

  //   slice.enter().append('g')
  //     .attr('class', 'slice')
  //     .append('foreignObject')
  //     .attr('requiredFeatures',
  //           'http://www.w3.org/TR/SVG11/feature#Extensibility')
  //     .attr('height', margin.top)
  //     .attr('class', 'title')
  //     .append('xhtml:div')
  //     .style('text-align', 'center')
  //     .style('word-wrap', 'break-word');
  //   // .text(pprop('sliceMetadata', 'title'));

  //   slice
  //     .attr('transform', function(d) {
  //       return 'translate(' + (d.x - textWidth / 2) + ',0)'; })
  //     .select('foreignObject')
  //     .attr('width', textWidth)
  //     .select('div');
  //   // .text(pprop('sliceMetadata', 'title'));

  //   slice.exit().remove();
  // }

  function updateGroups (svg, groups) {
    var group = svg.select('.groups').selectAll('.group')
      .data(groups);

    // EXIT
    group.exit().remove();

    // ENTER
    var enter = group.enter().append('g')
            .attr('class', 'group')
            .on('click', selectGroup);

    enter.append('rect');
    enter.append('text')
      .attr('x', -10)
      .attr('y', -25);

    group = group.merge(enter);

    group
      .style('display', function (d) { return d.title ? 'inline' : 'none'; })
      .attr('transform', function (d) { return ("translate(" + (d.rect.left) + "," + (d.rect.top) + ")"); })
      .select('rect')
      .attr('x', -10)
      .attr('y', -20)
      .attr('width', function (d) { return d.rect.right - d.rect.left + 20; })
      .attr('height', function (d) { return d.rect.bottom - d.rect.top + 30; });

    group.select('text')
      .text(function (d) { return d.title; });
  }

  function interpolateLink (b) {
    // XXX should limit radius better
    b.points.forEach(function (p) {
      if (p.ri > 1e3) { p.ri = 1e3; }
      if (p.ro > 1e3) { p.ro = 1e3; }
    });
    var interp = d3Interpolate.interpolate(linkGeom(this._current), b);
    var that = this;
    return function (t) {
      that._current = interp(t);
      return link(that._current)
    }
  }

  function linkGeom (l) {
    return {
      points: l.points,
      dy: l.dy
    }
  }

  function linkOrder (a, b) {
    if (a.id === selectedEdge) { return +1 }
    if (b.id === selectedEdge) { return -1 }
    if (!a.source || a.target && a.target.direction === 'd') { return -1 }
    if (!b.source || b.target && b.target.direction === 'd') { return +1 }
    if (!a.target || a.source && a.source.direction === 'd') { return -1 }
    if (!b.target || b.source && b.source.direction === 'd') { return +1 }
    return a.dy - b.dy
  }

  function selectLink (d) {
    d3Selection.event.stopPropagation();
    var el = d3Selection.select(this).node();
    listeners.call('selectLink', el, d);
  }

  function selectNode (d) {
    d3Selection.event.stopPropagation();
    var el = d3Selection.select(this).node();
    listeners.call('selectNode', el, d);
  }

  function selectGroup(d) {
    d3.event.stopPropagation();
    var el = d3.select(this)[0][0];
    d3Dispatch.dispatch.selectGroup.call(el, d);
  }

  exports.margins = function (_x) {
    if (!arguments.length) { return margin }
    margin = {
      top: _x.top === undefined ? margin.top : _x.top,
      left: _x.left === undefined ? margin.left : _x.left,
      bottom: _x.bottom === undefined ? margin.bottom : _x.bottom,
      right: _x.right === undefined ? margin.right : _x.right
    };
    return this
  };

  exports.groups = function (_x) {
    if (!arguments.length) { return groups }
    groups = _x;
    return this
  };

  // Node styles and title
  exports.nodeTitle = function (_x) {
    if (!arguments.length) { return node.nodeTitle() }
    node.nodeTitle(_x);
    linkTitle = linkTitleGenerator(_x, function (d) { return d.type; }, fmt);
    return this
  };

  exports.nodeValue = function (_x) {
    if (!arguments.length) { return node.nodeValue() }
    node.nodeValue(_x);
    return this
  };

  // Link styles and titles
  exports.linkTitle = function (_x) {
    if (!arguments.length) { return linkTitle }
    linkTitle = _x;
    return this
  };

  exports.linkLabel = function (_x) {
    if (!arguments.length) { return linkLabel }
    linkLabel = _x;
    return this
  };

  exports.linkColor = function (_x) {
    if (!arguments.length) { return linkColor }
    linkColor = _x;
    return this
  };

  exports.linkMinWidth = function (_x) {
    if (!arguments.length) { return link.minWidth() }
    link.minWidth(_x);
    return this
  };

  exports.selectNode = function (_x) {
    selectedNode = _x;
    return this
  };

  exports.selectLink = function (_x) {
    selectedEdge = _x;
    return this
  };

  exports.on = function () {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? exports : value
  };

  return exports
}

function defaultLinkLabel (d) {
  return null
}

exports.sankey = sankeyLayout;
exports.sankeyPositionJustified = positionNodesVertically;
exports.sankeyPositionRelaxation = positionNodesVertically$1;
exports.sankeyLink = sankeyLink;
exports.sankeyNode = sankeyNode;
exports.sankeyDiagram = sankeyDiagram;
exports.sankeyLinkTitle = linkTitleGenerator;
