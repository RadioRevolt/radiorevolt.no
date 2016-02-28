/*eslint-disable import/no-commonjs */

const gulp = require('gulp');
const eslint = require('gulp-eslint');


gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!gulpfile.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format());
});
