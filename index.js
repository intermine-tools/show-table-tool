'use strict';

var container;

jQuery(function () {
  container = jQuery('#results-table');
  if (window.parent !== window) {
    runAsChild();
  }

});

function runAsChild () {
  var chan = Channel.build({
    window: window.parent,
    origin: "*",
    scope: "CurrentStep"
  });

  chan.bind('configure', function (trans, params) {
    merge(intermine.options, params);
    return 'ok';
  });

  chan.bind("init", function(trans, params) {
    console.log(params, container.length);

    container.imWidget({
      type: 'table',
      url:   params.url,
      token: params.token,
      query: params.query
    });

    return 'ok';
  });

}

function merge(x, y) {
  var key, value;
  if (!y) return;
  for (key in y) {
    value = y[key];
    if (_.isArray(value) || !_.isObject(value) || !x[key]) {
      x[key] = value;
    } else {
      merge(x[key], value);
    }
  }
}

function showDemo () {
  return container.imWidget({
    type: 'table',
    url: "http://www.flymine.org/query",
    query: {
      select: ['*'],
      from: 'Organism'
    }
  });
}

