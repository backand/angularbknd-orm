var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task('build', function() {
    gulp.src('src/backand/*.js')
        .pipe(concat('backand.js'))
        .pipe(gulp.dest('dist'))
});