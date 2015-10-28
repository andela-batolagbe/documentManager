var gulp = require('gulp'),
  jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src(['public/app/**/*.js', 'app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(['public/app/**/*.js', 'app/**/*.js'], ['jshint']);
});
