


var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var webpack = require('gulp-webpack');




gulp.task('default',['build']);


gulp.task('build', function() {

    runSequence(/*'documentation',*/'compile'/*, 'test'*/,
        function(){

            console.log('Build finished!');

        });

});




gulp.task('compile',['compile-editor','compile-viewer'/*,'compress-viewer'*/]);







/*gulp.task('compile-viewer', function() {
    return gulp.src('./src/*')
        .pipe(webpack({
            entry: {
                //editor: './src/editor/script/index.tsx',
                viewer: './src/viewer/script/index.ts'
            },
            output: {
                filename: '[name].js',
            },
            module: {
                loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
                    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader'
                    }
                ],
                preLoaders: [
                    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                    {
                        test: /\.js$/,
                        loader: "source-map-loader"
                    }
                ]
            },
            //devtool: "source-map",



        }))
        .pipe(gulp.dest('./dist/'));
});*/








gulp.task('compile-viewer', function () {
    var tsProject = ts.createProject('src/viewer/tsconfig.json');
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./dist/'));


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









