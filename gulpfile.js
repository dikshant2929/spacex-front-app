const gulp = require('gulp');
const { series } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

function minifyCSS() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name} (Original): ${details.stats.originalSize}`);
            console.log(`${details.name} (New): ${details.stats.minifiedSize}`);
        }))
    .pipe(gulp.dest('dist/css'));
}

function sassDev() {
	return gulp.src(['public/scss/*.scss'])
    	.pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
};


exports.default = series(sassDev, minifyCSS);