var gulp = require('gulp');
gulp.paths = {
  app: 'app',
  publicApp: 'public/app',
  spec: 'spec'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean', 'build-js', 'jshint', 'test-api', 'test-client', 'watch'], function() {
  gulp.start('build');
});

module.exports = gulp;
