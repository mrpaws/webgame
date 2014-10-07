/* 
  webgame - three.js project gulp boilerplate
    MrPaws 2014

    Support:
    livereload, bower integration, minification and concatenation.
    serves from the build directory but watches on source and 
    runs build tasks on the fly for production view.

    TODO: 1) image processing boilerplate 
          2) always use minified bower deps (link)
          3) Consider adjust live reload as build
             tasks per save scale with project deps
*/
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var buildDir = 'dist';

/* clean build directory */
gulp.task('clean', require('del').bind(null, ['dist']));

/* process html */
gulp.task('html',function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest(buildDir))
    .pipe($.connect.reload());
});

/* process js */
gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe($.concat('project.js'))
  	.pipe($.uglify())
  	.pipe($.rename('project.min.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

/* link bower js dependencies */
gulp.task('link', ['js'], function () { 
  var jsFiles = require('main-bower-files')();
  jsFiles.push(buildDir + '/js/project.min.js');
  return gulp.src(jsFiles)
  	.pipe($.concat('all.min.js'))
    .pipe(gulp.dest(buildDir + '/js'))
    .pipe($.connect.reload());
})

/* process css */
gulp.task('css', function () {
  return gulp.src('app/css/**/*.css')
  	.pipe(gulp.dest(buildDir + '/css'))
    .pipe($.connect.reload());
});

/* process assets */
gulp.task('assets', function () {
  return gulp.src('app/assets/**')
  	.pipe(gulp.dest(buildDir + '/assets'))
    .pipe($.connect.reload());
});

/* serve content from distribution dir */
gulp.task('connect', function() {
  $.connect.server({
    root: buildDir,
    livereload: true
  });
  require('opn')('http://localhost:8080');
});

/* watch for changes and process */
gulp.task('watch', ['connect'], function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/js/**/*.js'], ['js','link']);
  gulp.watch(['app/css/**/*.css'], ['css']);
  gulp.watch(['app/assets/**'], ['assets']);
  gulp.watch(['bower.json'], ['link']);
});

/* build all */
gulp.task('build', ['html','js','link','css','assets']);

/* default is to build */
gulp.task('default', ['build'])