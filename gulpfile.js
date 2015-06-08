'use strict';

var browserify = require('browserify'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    concatCss = require('gulp-concat-css'),
    del = require('del'),    
    gulp = require('gulp'),    
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),        
    reload = browserSync.reload,
    p = {
      jsx: ['./scripts/app.jsx'],  
      css: ['./styles/main.css'], 
      images: ['./images/*'],             
      bundle: 'app.js',
      distJs: 'dist/js',
      distCss: 'dist/css',      
      distImages: 'dist/images'
    };

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.jsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()      
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(reactify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(reactify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(gulp.dest(p.distJs));
});

gulp.task('styles', function() {
  return gulp.src(p.css)
    .pipe(changed(p.distCss))
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

gulp.task('images', function() {
  return gulp.src(p.images)
    .pipe(gulp.dest(p.distImages));
});

gulp.task('watchTask', function() {
  gulp.watch(p.css, ['styles']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start(['browserSync', 'watchTask', 'watchify', 'styles', 'images']);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'development';
  gulp.start(['browserify', 'styles', 'images']);
});

gulp.task('default', ['build', 'watch']);