var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


gulp.task('build-js', function() {
  return gulp.src('public/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/js/javascript'));
});


// gulp.task('build-css', function() {
//   return gulp.src('public/assets/css/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(concat('style.css'))
//     .pipe(uglify())
//     .pipe(rename({
//       extname: '.min.css'
//     }))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('public/assets/css/css'));
// });
