const gulp= require('gulp');

function buildDev() {
  return gulp.src('./src/server/**/*.js')
    .pipe(gulp.dest('dist/server'))
}

exports.default = gulp.series(buildDev)