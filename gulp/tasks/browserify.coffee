browserify = require 'browserify'
gulp = require 'gulp'
source = require 'vinyl-source-stream'

module.exports = ->
  browserify('./src/tool.coffee').bundle()
                                .pipe source 'tool.js'
                                .pipe gulp.dest './app/js/'
