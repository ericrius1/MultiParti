var path = require('path');


var gulp = require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');

gulp.task('coffee', function(){
  gulp.src('public/javascripts/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('public/build/js/'))
});