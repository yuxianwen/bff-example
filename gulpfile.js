const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require('gulp-watch');


function buildDev() {
  return watch("./src/server/**/*.js")
    .pipe(
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      })
    )
    .pipe(gulp.dest("dist/server"));
}

let build = null

if(process.env.NODE_ENV === "development") {
    build = gulp.series(buildDev);
}

gulp.task("default", build)
