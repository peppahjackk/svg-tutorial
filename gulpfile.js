var gulp = require('gulp');
var sourcemaps = require("gulp-sourcemaps");
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var order = require('gulp-order');

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(newer('dist/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })
});

gulp.task('default', ['html', 'sass', 'images', 'js', 'serve']);

gulp.task('watch', ['default'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/images/*', ['images']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/js/*', ['js']);
});