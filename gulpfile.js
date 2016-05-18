var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify', function compileLess() {
  return gulp.src('./src/metrika.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['minify']);
