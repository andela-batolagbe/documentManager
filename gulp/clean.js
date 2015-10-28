var gulp = require('gulp');
var del = require('del');


gulp.task('clean', function() {
  del(['public/assets/css/css', 'public/assets/js/javascript']).then(function() {
    console.log("removed previous build");
  });
});
