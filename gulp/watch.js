'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');

var paths = gulp.paths;

gulp.task('watch', function () {
  gulp.watch([
   ' public/*.html',
    '/public/assets/css/*.css',
    'public/app/**/*.js',
    'public/assets/js/*.js'
    
  ]);
});

module.exports = gulp;