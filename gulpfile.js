'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var stripDebug = require('gulp-strip-debug');

var destinationDir = process.env.DESTINATION_DIR || '.';

gulp.task('index', function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./src'));
});

gulp.task('sass', function () {
    return gulp.src('./src/assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/assets/css'));
});


gulp.task('default', ['sass'], function () {
    browserSync.init({
        server: "src"
    });
    browserSync.stream();
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/assets/js/*.js').on('change', browserSync.reload);
    gulp.watch('src/assets/sass/**/*.scss', ['sass']);
    gulp.watch('src/assets/css/*.css').on('change', browserSync.reload);
});


gulp.task('build', function () {
    gulp.src('src/assets/js/app-shopify.js')
        .pipe(stripDebug())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest(destinationDir));
});
