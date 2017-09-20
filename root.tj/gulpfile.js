//---------------------------------------------------------------------------------
//
//  Dependencies
//
//---------------------------------------------------------------------------------

var concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    gUtil = require('gulp-util'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

var jsFiles = require('./jsFiles.json');

//---------------------------------------------------------------------------------
//
//  Private Variables
//
//---------------------------------------------------------------------------------

var target = {
    appDev: 'src/',
    appProd: 'build/'
};

//---------------------------------------------------------------------------------
//
//  Gulp Tasks
//
//---------------------------------------------------------------------------------

/**
 * Compiles sass files
 * @param {boolean} env
 * @param src
 * @param dest
 */
function compileSass(env, src, dest) {
    var outputStyle = 'nested';

    if (env) {
        outputStyle = 'compressed';
    }

    gulp.src(src)
        .pipe(sass({
            outputStyle: outputStyle,
            sourceComments: !env,
            omitSourceMapUrl: !env
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('sass:dev', function () {
    compileSass(false, target.appDev + 'sass/main.scss', target.appDev + 'css');
});

/**
 * sass:prod task
 */
gulp.task('sass:prod', function () {
    compileSass(true, target.appDev + 'sass/main.scss', target.appProd + 'css');
});

gulp.task('sass:watch', function () {
    gulp.watch(target.appDev + 'sass/*.sсss', ['sass:dev']);
});

/**
 * Delete build
 */
gulp.task('clean', function () {
    del(['build/**']);
});

/**
 * Update bower
 */
/*gulp.task('bower', /!*['clean'],*!/ function () {
 return gulp.src('')
 .pipe(shell('bower cache clean'))
 .pipe(shell('bower install'))
 });*/

/**
 * Minify files
 */
gulp.task('uglify', /*['bower'],*/ function () {
    return gulp.src(jsFiles)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(target.appProd + 'js'));
});

/**
 * Copy task
 */
gulp.task('copy', function () {
    // img
    gulp.src([target.appDev + 'img/**'])
        .pipe(gulp.dest(target.appProd + 'img'));

    // fonts
    gulp.src([target.appDev + 'fonts/**'])
        .pipe(gulp.dest(target.appProd + 'fonts'));

    // fonts
    gulp.src([target.appDev + 'localization/**'])
        .pipe(gulp.dest(target.appProd + 'localization'));

    // min.js
    gulp.src([
        target.appDev + 'js/bootstrap.min.js',
        target.appDev + 'js/jquery.min.js'
    ]).pipe(gulp.dest(target.appProd + 'js'));

    // index.html
    gulp.src(target.appDev + 'index.min.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest(target.appProd));

    // PHP files
    gulp.src([target.appDev + 'php/**'])
        .pipe(gulp.dest(target.appProd + 'php'));
});

gulp.task('build', ['clean', 'copy', 'uglify', 'sass:prod']);