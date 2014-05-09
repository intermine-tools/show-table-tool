'use strict';

var container;

jQuery(function () {
  container = jQuery('#results-table');
  if (window.parent !== window) {
    runAsChild();
  }

});

function runAsChild () {
  var chan;

  chan = Channel.build({
    window: window.parent,
    origin: "*",
    scope: "CurrentStep"
  });

  chan.bind('configure', function (trans, params) {
    merge(intermine.options, params);
    return 'ok';
  });

  chan.bind("init", function(trans, params) {
    var events = {
      'list-creation:success': reportList.bind(null, chan),
      'list-update:success': reportList.bind(null, chan)
    };
    var props = merge({pageSize: 25}, (params.prop || {}));
    console.log(props);
    container.imWidget({
      type: 'table',
      url:   (params.url || (params.service && params.service.root)),
      token: (params.token || (params.service && params.service.token)),
      query: params.query,
      properties: props,
      events: events
    });

    return 'ok';
  });

  // Activate all formatters.
  enableAll(intermine.results.formatsets.genomic);

}

function reportList (channel, list) {
  channel.notify({
    method: 'next-step',
    params: {
      title: 'Created list ' + list.name,
      tool: 'show-list',
      data: {
        listName: list.name,
        service: { root: list.service.root }
      }
    }
  });
}

function enableAll(obj) {
  var key;
  for (key in obj) {
    obj[key] = true;
  }
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
  return x;
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

