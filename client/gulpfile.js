'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  csslint = require('gulp-csslint'),
  jscpd = require('gulp-jscpd');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ''
    },
    notify: false
  });
});

gulp.task('scripts', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/selectize/dist/js/standalone/selectize.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
    'node_modules/ui-leaflet/dist/ui-leaflet.min.js',
    'node_modules/bootstrap/dist/main/bootstrap.min.js',
    'node_modules/angular-selectize2/dist/selectize.js',
    'node_modules/sweetalert/dist/sweetalert.min.js',
    './app/app.module.js',
    './app/main/*.js'
  ])
    .on('error', console.log)
    .pipe(concat('build.js'))
    .pipe(jscpd())
    .pipe(gulp.dest('./build/'));
});

gulp.task('styles', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/normalize.css/normalize.css',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/selectize/dist/css/selectize.default.css',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css',
    'node_modules/sweetalert/dist/sweetalert.css',
    'app/assets/css/*.css'
  ])
    .on('error', console.log)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(csslint())
    .pipe(concat('build.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch(['./app/assets/css/*.css'], ['styles']);
  gulp.watch(['./app/*.js', './app/main/*.js'], ['scripts']);
});

gulp.task('clean', function() {
  return del.sync('./dist/');
});

gulp.task('default', ['browser-sync', 'scripts', 'styles', 'watch', 'clean']);