


var gulp = require('gulp');
var webpack = require('gulp-webpack');



gulp.task('default', function() {
    return gulp.src('./src/*')
        .pipe(webpack({
            entry: {
                editor: './src/editor/script/index.ts',
                viewer: './src/viewer/script/index.ts'
            },
            output: {
                filename: '[name].js',
            },
        }))
        .pipe(gulp.dest('./dist/'));
});