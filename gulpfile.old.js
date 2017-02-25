


var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');


gulp.task('default',['build']);


gulp.task('build', function() {

    runSequence(/*'documentation',*/'compile'/*, 'test'*/,
        function(){

            console.log('Build finished!');

        });

});




gulp.task('compile',['compile-editor','compile-viewer'/*,'compress-viewer'*/]);



gulp.task('compile-editor', function () {


    var tsProject = ts.createProject('editor/tsconfig.json');


    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./editor/'));



});





var webpack = require('gulp-webpack');


gulp.task('compile-viewer', function () {

    var tsProject = ts.createProject('viewer/tsconfig.json');


    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./viewer/script/'));




    /*return gulp.src('./viewer/src/')
        .pipe(webpack( require('./viewer/webpack.config') ))
        .pipe(gulp.dest('dist/'));*/


});




/*
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('compress-viewer', function (cb) {
    pump([
            gulp.src('viewer/viewer.js'),
            uglify(),
            rename({suffix: '.min'}),
            gulp.dest('./viewer/')
        ],
        cb
    );
});*/









