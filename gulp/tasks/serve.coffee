express = require 'express'

module.exports = ->
  PORT = (process.env.PORT ? 5000)
  app = express().use express.static 'app'
                 .use express.static 'bower_components'
                 .use express.static 'node_modules'
                 .listen PORT
  console.log "Server started on #{ PORT }"

