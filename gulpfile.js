var gulp = require('gulp')
var babel = require('gulp-babel')
var webpack = require('gulp-webpack')

gulp.task('default', function () {
  return gulp.src('js/app.js')
    .pipe(babel())
    .pipe(webpack({
      output: {
        filename: 'app.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest('build/'))
})
