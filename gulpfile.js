'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');
const clean = require('gulp-clean');

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
