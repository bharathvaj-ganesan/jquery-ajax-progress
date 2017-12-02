'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');
const banner = require('gulp-banner');
const eslint = require('gulp-eslint');
const jasmineBrowser = require('gulp-jasmine-browser');
const clean = require('gulp-clean');

const bannerString =
	'/*\n' +
	' * <%= pkg.name %> <%= pkg.version %>\n' +
	' * <%= pkg.description %>\n' +
	' * <%= pkg.homepage %>\n' +
	' *\n' +
	' * Copyright ' +
	new Date().getFullYear() +
	', <%= pkg.author %>\n' +
	' * Released under the <%= pkg.license %> license.\n' +
	'*/\n\n';

gulp.task('clean', () => {
	return gulp.src('dist/*.js', { read: false }).pipe(clean());
});

gulp.task('lint', () => {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return (
		gulp
			.src(['./index.js'])
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failAfterError last.
			.pipe(eslint.failAfterError())
	);
});

gulp.task('test', function() {
	return gulp
		.src(['./index.js', './spec/progressSpec.js'])
		.pipe(jasmineBrowser.specRunner())
		.pipe(jasmineBrowser.server({ port: 8888 }));
});

gulp.task('release', () => {
	return gulp
		.src('./index.js')
		.pipe(rename('jquery.ajax.progress.min.js'))
		.pipe(uglify())
		.pipe(
			banner(bannerString, {
				pkg: pkg
			})
		)
		.pipe(gulp.dest('dist/'));
});
