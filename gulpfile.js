const gulp = require('gulp')

const ts = require('gulp-typescript')
const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const webserver = require('gulp-webserver')

gulp.task('ts', () => {
  gulp.src('src/index.ts')
  .pipe(webpack( require('./webpack.config.js') ))
  .on('error', (e) => {
    console.log('Webpack error', e)
  })
  .pipe(gulp.dest('dist'))
})

gulp.task('sass', () => {
  gulp.src('src/styles/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist'))
})

gulp.task('html', () => {
  gulp.src('src/templates/*.html')
  .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', ['ts'])
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/**/*.scss', ['sass'])
})

gulp.task('webserver', () => {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }))
})

gulp.task('build', ['ts', 'html', 'sass'])
gulp.task('dev', ['build', 'watch', 'webserver'])
gulp.task('default', ['dev'])
