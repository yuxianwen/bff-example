const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");

const entryPath =  "./src/server/**/*.js"

// 清洗垃圾代码
function clearConfig() {
  return gulp
    .src(entryPath)
    .pipe(
      rollup({
        input: "./src/server/config/index.js",
        output: {
          format: 'cjs'
        }
      })
    )
    .pipe(gulp.dest("./dist/server"));
}

function buildDev() {
  return watch(entryPath, { ignoreInitial: false })
    .pipe(
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      })
    )
    .pipe(gulp.dest("dist/server"));
}

function buildProd() {
  return gulp
    .src(entryPath)
    .pipe(
      babel({
        babelrc: false,
        plugins: ["@babel/plugin-transform-modules-commonjs"]
      })
    )
    .pipe(gulp.dest("dist/server"));
}

let build = null;

if (process.env.NODE_ENV === "development") {
  build = gulp.series(buildDev);
}

if (process.env.NODE_ENV === "production") {
  build = gulp.series(buildProd, clearConfig);
}

gulp.task("default", build);
