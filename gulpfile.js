/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var webpack = require('webpack-stream');

var config = require("./webpack.config.js");
var sass = require('gulp-sass');

concat = require('gulp-concat');
config.watch=true;

gulp.task('javascript', function () {
    delete config.plugins;
    return gulp.src('App/index.js')
               .pipe(webpack(config))
               .pipe(gulp.dest('App/'));
});


gulp.task("css", function () {
    gulp.src(['./Content/styles/main.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./Content/styles/'));
});

gulp.task("watch-css", function () {
    gulp.watch(['./Content/styles/main.scss'], ["css"])
});


gulp.task("css-prod", function () {
    gulp.src(['./Content/styles/main.scss'])
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest('./Content/styles/'));
});

gulp.task('javascript-prod', function () {
    config.watch = false;
    config.devtool = "source-map";
    return gulp.src('App/index.js')
               .pipe(webpack(config))
               .pipe(gulp.dest('App/'));
});

gulp.task('javascript-ci', function () {
    config.watch = false;
    delete config.plugins;
    return gulp.src('App/index.js')
               .pipe(webpack(config))
               .pipe(gulp.dest('App/'));
});

gulp.task("default", ["javascript", "watch-css"]);