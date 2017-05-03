'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-minify-css'),
  refresh = require('gulp-livereload'),
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
    'node_modules/selectize/dist/main/standalone/selectize.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/leaflet/dist/leaflet.js',
    'node_modules/bootstrap/dist/main/bootstrap.min.js',
    'node_modules/angular-selectize2/dist/selectize.js',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.min.js',
    'node_modules/sweetalert/dist/sweetalert.min.js',
    './main/*.js',
    './main/Main/*.js'
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
    'css/*.css',
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/selectize/dist/css/selectize.default.css',
    'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css',
    'node_modules/sweetalert/dist/sweetalert.css'
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
  gulp.watch(['css/*'], ['styles']);
  gulp.watch(['main/*'], ['scripts']);
  gulp.watch(['main/*.js', 'main/Main/*.js'], ['jshint']);
});

gulp.task('default', ['scripts', 'styles', 'watch', 'browser-sync']);