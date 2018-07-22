'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucks = require('gulp-nunjucks-render');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var svgSymbols = require("gulp-svg-symbols");
var autoprefixer  = require("gulp-autoprefixer");
var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return gulp.src('./scripts/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(uglify().on('error', console.log))
        .pipe(gulp.dest('./js/'))
        .pipe(browserSync.stream())
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
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

gulp.task('serve', ['scripts', 'sass', 'nunjucks', 'sprites'], function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch(['./sass/*.scss', './scripts/**/*.js', 'pages/**/*.njk'], ['sass', 'scripts', 'nunjucks']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
 
gulp.task('default', ['serve']);
