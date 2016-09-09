


var gulp = require('gulp');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');


gulp.task('default',['build']);


gulp.task('build', function() {

    runSequence(/*'documentation',*/'compile'/*, 'test'*/,
        function(){

            console.log('Build finished!');

        });

});




gulp.task('compile',['compile-editor','compile-viewer']);



gulp.task('compile-editor', function () {


    var tsProject = ts.createProject('editor/tsconfig.json');


    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./editor/'));



});



gulp.task('compile-viewer', function () {


    var tsProject = ts.createProject('viewer/tsconfig.json');


    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./viewer/'));



});







