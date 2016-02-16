'use strict';

require('babel-register')({
  presets: ['es2015', 'stage-2']
});

const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const eslint = require('gulp-eslint');


gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!gulpfile.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('test', ['lint'], () => {
	return gulp.src('./**/*.spec.js')
		// gulp-jasmine works on filepaths so you can't have any plugins before it
		.pipe(jasmine())
});
