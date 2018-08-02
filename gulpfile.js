var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var cleanCSS = require('gulp-clean-css');
// var del = require('del');

var paths = {
  scripts: 'src/js/*.js',
  styles: 'src/css/*.css',
  images: 'src/images/*',
  pugs: 'src/pug/*.pug',
  sass: 'src/sass/*.scss'
}

gulp.task('uglify-js', function() {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/javascripts'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('docs/img'));
});


gulp.task('pugs', function buildHTML() {
  return gulp.src(paths.pugs)
  .pipe(pug({ // Your options in here.
  }))
  .pipe(gulp.dest('docs/'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('uglify-css', function(){
  return gulp.src(paths.styles)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('styles.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/stylesheets'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['uglify-js']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.pugs, ['pugs']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.styles, ['uglify-css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'uglify-js', 'images', 'pugs', 'sass', 'uglify-css']);
