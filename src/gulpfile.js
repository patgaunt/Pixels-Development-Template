'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var svgSymbols = require("gulp-svg-symbols");


gulp.task('scripts', function() {
  gulp.src('./scripts/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('nunjucks', function () {
    return gulp.src('./pages/*.njk')
        .pipe(nunjucks({
            path: ['./pages']
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sprites', function () {
    return gulp.src('./img/icons/*.svg')
        .pipe(svgSymbols({ 
            id: "icon-%f",
            templates: ['default-svg']
        }))     
        .pipe(gulp.dest("./img"));
});

gulp.task('automate', function () {
    gulp.watch(['./sass/*.scss', './scripts/**/*.js', 'pages/**/*.njk'], ['sass', 'scripts', 'nunjucks']);
});
 
gulp.task('default', ['scripts', 'styles', 'nunjucks', 'sprites']);