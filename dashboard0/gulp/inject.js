'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var bower = require('main-bower-files');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var cssFilter = $.filter('**/*.css',{restore: true});

gulp.task('inject', ['scripts', 'styles'], function () {
  var injectBowers = gulp.src(bower())
    .pipe(cssFilter)
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/components/css')))
    .pipe(cssFilter.restore);

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectBowers, {name: 'components'}))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
