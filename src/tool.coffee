Channel = require 'jschannel'
imtables = require 'imtables'

runAsChild = ->

  chan = Channel.build
    window: window.parent
    origin: '*'
    scope: 'CurrentStep'

  chan.bind 'configure', (trans, params) ->
    imtables.configure params
    'ok'

  chan.bind 'init', (trans, params) ->
    trans.delayReturn true
    url = params.url ? params.service?.root
    service = root: url, token: (params.token ? params.service?.token)
    query = params.query
    withTable = (table) ->
      trans.complete 'table loaded'
    onError = (error) ->
      trans.error error

    imtables.loadTable '#results-table', {size: 25}, {service, query}
            .then withTable, onError

showDemo = ->
  service = root: "http://www.flymine.org/query"
  query =
    select: ['*'],
    from: 'Organism'

  imtables.loadTable '#results-table', {size: 10}, {service, query}

window.onload = ->
  if window is window.parent
    console.log "I am my own parent"
    showDemo().then console.log.bind(console), console.error.bind(console)
  else
    console.log "I have a parent"
    runAsChild()

