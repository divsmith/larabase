var gulp = require('gulp'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	sequence = require('gulp-watch-sequence');

var paths = {
	js: [


		'app/assets/components/jquery/dist/jquery.js',
		'app/assets/components/bootstrap/dist/js/bootstrap.min.js',
		'app/assets/js/**/*.js'
	],

	css: [
		'app/assets/components/bootstrap/dist/css/bootstrap.min.css',
		'app/assets/build/*.css',
		'app/assets/css/**/*.css'
	],

	scss: [
		'app/assets/scss/**/*.scss'
	],

	reload: [
		'app/views/**/*.php',
		'public/js/**/*.js',
		'public/css/**/*.css'
	]
};

gulp.task('watch', ['js', 'css', 'scss'], function() {
	var queue = sequence(300),
		server = livereload();

	watch({
		name: 'js',
		emitOnGlob: false,
		glob: paths.js
	}, queue.getHandler('js'));

	watch({
		name: 'css',
		emitOnGlob: false,
		glob: paths.css
	}, queue.getHandler('css'));

	watch({
		name: 'scss',
		emitOnGlob: false,
		glob: paths.scss
	}, queue.getHandler('scss', 'css'));

	watch({
		name: 'reload',
		emitOnGlob: false,
		glob: paths.reload
	}, function(file) {
		server.changed(file.path);
	});

});

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
});

gulp.task('scss', function() {
	gulp.src(paths.scss)
		.pipe(sass())
		.pipe(concat('temp.css'))
		.pipe(gulp.dest('./app/assets/build/'));
})
