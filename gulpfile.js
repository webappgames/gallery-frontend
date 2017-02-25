


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
            /*resolve: {
                // Add `.ts` and `.tsx` as a resolvable extension.
                extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
            },*/
            module: {
                loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
                    // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader'
                    }
                ]
            }

        }))
        .pipe(gulp.dest('./dist/'));
});