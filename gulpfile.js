


var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
//var add = require('gulp-add');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
//var closureCompiler = require('gulp-closure-compiler');
var uglify = require('gulp-uglifyjs');
gulpMerge = require('gulp-merge');




gulp.task('default',['build']);


gulp.task('build', function() {

    runSequence(/*'documentation',*/'compile'/*, 'test'*/,
        function(){

            console.log('Build finished!');

        });

});




gulp.task('compile',['compile-editor','compile-viewer-libs','compile-viewer'/*,'compress-viewer'*/]);







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




//var webpack = require('webpack-stream');

['editor'/*,'viewer'*/].forEach(function (part) {

    gulp.task('compile-'+part, function () {
        return gulp.src('src/'+part+'/script/index.tsx')
            .pipe(sourcemaps.init()) // This means sourcemaps will be generated
            .pipe(ts({
                //"module": "commonjs",
                "target": "es3",//es6
                //"moduleResolution": "Classic",

                "sourceMap": true,
                "inlineSourceMap": true,
                "inlineSources": true,


                "jsx": "react",

                "outFile": part+'.js'
            }))
            //.pipe(webpack())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/'))

            ;
    });

});






/**/
gulp.task('compile-viewer-libs', function () {


    return gulp.src([
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/react-draggable/dist/react-draggable.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jszip/dist/jszip.min.js',
        'node_modules/file-saver/FileSaver.min.js',
        'node_modules/mustache/mustache.min.js',
        'node_modules/html2canvas/dist/html2canvas.js',
        'node_modules/jsuri/Uri.js',
        'node_modules/lodash/lodash.js',
        'node_modules/babylonjs/babylon.js',
        'node_modules/handjs/hand.min.js'
    ])
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('viewer.libs.js'))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
    ;
});


/**/
gulp.task('compile-viewer', function () {


    return gulp.src('src/viewer/script/index.tsx')
        .pipe(sourcemaps.init())
        .pipe(ts({
            //"module": "commonjs",
            "target": "es3",//es6
            //"moduleResolution": "Classic",

            "sourceMap": true,
            "inlineSourceMap": true,
            "inlineSources": true,


            "jsx": "react",

            "outFile": 'viewer-gallery.js',

        }))
        .pipe(concat('viewer.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'))
        ;
});









/*
gulp.task('compile-viewer', function () {
    var tsProject = ts.createProject('src/viewer/tsconfig.json');
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./dist/'));


});
*/








/*

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









