/* 
  webgame - three.js project gulp boilerplate
    MrPaws 2014

    livereload, reloads

    TODO: 1) image processing boilerplate 
          2) always use minified bower deps (link)
*/
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var buildDir = 'dist';

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('html',function () {
  return gulp.src('app/*.html')
    .pipe(gulp.dest(buildDir))
    .pipe($.connect.reload());
});

gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe($.concat('project.js'))
  	.pipe($.uglify())
  	.pipe($.rename('project.min.js'))
    .pipe(gulp.dest(buildDir + '/js'));
});

gulp.task('link', ['js'], function () { 
  var jsFiles = require('main-bower-files')();
  jsFiles.push(buildDir + '/js/project.min.js');
  return gulp.src(jsFiles)
  	.pipe($.concat('all.min.js'))
    .pipe(gulp.dest(buildDir + '/js'))
    .pipe($.connect.reload());
})

gulp.task('css', function () {
  return gulp.src('app/css/**/*.css')
  	.pipe(gulp.dest(buildDir + '/css'))
    .pipe($.connect.reload());
});

gulp.task('assets', function () {
  return gulp.src('app/assets/**')
  	.pipe(gulp.dest(buildDir + '/assets'))
    .pipe($.connect.reload());
});

gulp.task('connect', function() {
  $.connect.server({
    root: buildDir,
    livereload: true
  });
  require('opn')('http://localhost:8080');
});

gulp.task('watch', ['connect'], function () {
  gulp.watch(['app/*.html'], ['html']);
  gulp.watch(['app/js/**/*.js'], ['js','link']);
  gulp.watch(['app/css/**/*.css'], ['css']);
  gulp.watch(['app/assets/**'], ['assets']);
  gulp.watch(['bower.json'], ['link']);
});

gulp.task('build', ['html','js','link','css','assets']);

gulp.task('default', ['build'])