/* 
  webgame - three.js project gulp boilerplate
    MrPaws 2014

  TODO: 1) image processing boilerplate 2) always use minified bower deps (link)
*/
var gulp = require('gulp');

var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var connect = require('gulp-connect');
var bower = require('main-bower-files');

var htmlSrc = '*.html';
var jsSrc = 'js/**/*.js';
var cssSrc = 'css/**/*.css';
var assetsSrc = 'assets/**';
var buildDir = 'dist';

gulp.task('clean', function(cb) {
  return del([buildDir], cb);
});

gulp.task('html',function () {
  return gulp.src(htmlSrc)
    .pipe(gulp.dest(buildDir))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  return gulp.src(jsSrc)
    .pipe(concat('project.js'))
  	.pipe(uglify())
  	.pipe(rename('project.min.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

gulp.task('link', ['js'], function () { 
  var jsFiles = bower();
  jsFiles.push(buildDir + '/js/project.min.js');
  return gulp.src(jsFiles)
  	.pipe(concat('all.js'))
  	.pipe(rename('all.min.js'))
    .pipe(gulp.dest(buildDir + '/js'))
    .pipe(connect.reload());
})

gulp.task('css', function () {
  return gulp.src(cssSrc)
  	.pipe(gulp.dest(buildDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('assets', function () {
  return gulp.src(assetsSrc)
  	.pipe(gulp.dest(buildDir + '/assets'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: buildDir,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch([htmlSrc], ['html']);
  gulp.watch([jsSrc], ['js','link']);
  gulp.watch([cssSrc], ['css']);
  gulp.watch([assetsSrc], ['assets']);
  gulp.watch(['bower.json'], ['link']);
});

gulp.task('default', ['clean','html','js','link','css','assets','connect','watch']);
