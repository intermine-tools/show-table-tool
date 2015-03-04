require('coffee-script/register');
var gulp = require('./gulp/index.coffee')([
  'browserify',
  'serve'
]);

gulp.task('default', ['browserify', 'serve']);
