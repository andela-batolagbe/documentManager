var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');


gulp.task('build', ['build-js', 'build-css'], function() {
  nodemon({
      script: 'server.js',
      ext: 'js',
      ignore: ['.package.json']
    })
    .on('restart', function() {
      console.log('server restarted');

    });
});
