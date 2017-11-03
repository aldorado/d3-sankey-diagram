# d3-sankey-diagram

[![Build Status](https://travis-ci.org/ricklupton/d3-sankey-diagram.svg?branch=master)](https://travis-ci.org/ricklupton/d3-sankey-diagram)

[Sankey diagrams](https://en.wikipedia.org/wiki/Sankey_diagram) show flows between processes or relationships between sets. This library, is a [reusable d3 diagram](https://bost.ocks.org/mike/chart/) featuring:
- automatic layout
- multiple types of flow
- loops / reversed flows
- flow routing across layers

See the **[demo](https://ricklupton.github.io/d3-sankey-diagram)** for examples of these.

d3-sankey-diagram versions v0.6 and up are based on d3 v4.

## Installation

Install using npm if you are using browserify or the like:
```js
npm install d3-sankey-diagram
```

Or download the [standalone bundle](https://github.com/ricklupton/d3-sankey-diagram/releases/latest) and include in your page as
```html
<script src="d3-sankey-diagram.js" charset="utf-8"></script>
```

## Usage

```js
var layout = d3.sankey()
               .extent([[100, 10], [840, 580]]);

var diagram = d3.sankeyDiagram()
                .linkColor(function(d) { return d.color; });

d3.json('uk_energy.json', function(energy) {
  layout.ordering(energy.order);
  d3.select('#sankey')
      .datum(layout(energy))
      .call(diagram);
});
```

Try more [live examples](https://ricklupton.github.io/d3-sankey-diagram).

If you use the Jupyter notebook, try
[ipysankeywidget](https://github.com/ricklupton/ipysankeywidget).

`d3-sankey-diagram` works both in node (using jsdom) and in the browser.

## Documentation

API docs are on the [wiki](https://github.com/ricklupton/d3-sankey-diagram/wiki).

## Tests

Run the tests:
```js
npm test
```

## Licence

MIT licence.

## Contributions

Contributions are welcome. Open an issue or a pull request!
