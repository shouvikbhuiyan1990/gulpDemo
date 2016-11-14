/******* IMPORTANT ***************/


// Most workflows with Gulp tend to only require 4 different globbing patterns:

// *.scss: The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder (project)  **/*.scss: This is a more extreme version of the * pattern that matches any file ending with .scss in the root folder and any child directories.
// !not-me.scss: The ! indicates that Gulp should exclude the pattern from its matches, which is useful if you had to exclude a file from a matched pattern. In this case, not-me.scss would be excluded from the match.
// *.+(scss|sass): The plus + and parentheses () allows Gulp to match multiple patterns, with different patterns separated by the pipe | character. In this case, Gulp will match any file ending with .scss or .sass in the root folder. */

/******** END of Beginning **************/


var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();


//ES6 task
gulp.task('esConv',function(){
	return gulp.src('app/JS/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('app/cjs'))
})

//browserSync config
gulp.task('browserSyncTask',function(){
	browserSync.init({
		server : {
			baseDir : 'app'
		}
	})
});

//This types of task will directly copy files from spurce folder to destination folder
gulp.task('fonts',function(){
	return gulp.src('app/fonts/**/*')
			.pipe(gulp.dest('dist/fonts'))
})

gulp.task('build',function(){
	return gulp.src('app/SCSS/**/*.scss')
			.pipe(sass())  // calling method to convert sass to css
			.pipe(concat('style.css'))  //used to contcatinates files into a single CSS
			.pipe(gulp.dest('app/CSS')) //specifying the destination folder
			.pipe(browserSync.reload({ stream : true }))  //reloading the browser
})


/**************SYNTEXT**************/

/*******
gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
  // ...
})
*******/

gulp.task('watch', ['browserSyncTask','build','esConv','fonts'], function (){
  gulp.watch('app/SCSS/*.scss', ['build']); 
  gulp.watch('app/JS/**/*.js', ['esConv']);
  // Other watchers
})

//gulp.watch('app/SCSS/*.scss', ['build']);