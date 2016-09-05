


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






gulp.task('compile', function () {


    var tsProject = ts.createProject('editor/script/tsconfig.json');


    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./editor/'));



});








