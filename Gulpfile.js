var gulp = require('gulp'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify');

var paths = {
	js: [
		'app/assets/components/jquery/dist/jquery.js',
		'app/assets/components/bootstrap/dist/js/bootstrap.min.js',
		'app/assets/js/**/*.js'
	],

	css: [
		'app/assets/components/bootstrap/dist/css/bootstrap.min.css',
		'app/assets/css/**/*.css'
	]
}

gulp.task('js', function() {
	gulp.src(paths.js)
		.pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('css', function() {
	gulp.src(paths.css)
		.pipe(concat('build.css'))
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(gulp.dest('./public/css'));
})
