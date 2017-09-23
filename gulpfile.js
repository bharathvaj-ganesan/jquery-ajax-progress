'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');
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

gulp.task('release', () => {
	return gulp
		.src('./index.js')
		.pipe(rename('jquery.ajax.progress.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/'));
});
