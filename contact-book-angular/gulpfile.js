var gulp         = require('gulp'),
    stylus       = require('gulp-stylus'),
    browserSync  = require('browser-sync'),
    plumber      = require('gulp-plumber'),
    notify       = require("gulp-notify"),
    autoprefixer = require('autoprefixer-stylus');

gulp.task('stylus', function() {
  return gulp.src('app/stylus/main.styl')
    .pipe(plumber())
    .pipe(stylus({
      pretty:true,
      use:[autoprefixer('last 10 versions')]
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
  	server: {
  		baseDir: 'app'
  	},
  	notify: false
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('app/stylus/main.styl', ['stylus']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
