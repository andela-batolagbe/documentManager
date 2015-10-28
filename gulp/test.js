var gulp = require('gulp');
var Server = require('karma').Server;
var jasmineNode = require('gulp-jasmine-node');

gulp.task('test-api', function() {
  return gulp.src(['spec/api-spec/**/*spec.js']).pipe(jasmineNode({
    timeout: 10000
  }));
});

gulp.task('test-client', function(done) {
  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true,
  }, done).start();
});
