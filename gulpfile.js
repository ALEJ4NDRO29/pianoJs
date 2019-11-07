var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync').create()
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var cssFiles = "src/**/*.css";

var interceptErrors = function (err) { console.error(err); this.emit('end'); };

gulp.task('html', function () {
    return gulp.src("src/index.html")
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

gulp.task('css', function () {
    return gulp.src(cssFiles)
        .on('error', interceptErrors)
        .pipe(gulp.dest('./build/'));
});

function compile(watch) {
    var bundler = watchify(browserify('./src/main.js', { debug: true }).transform(babel, { presets: ['@babel/preset-env'] }));

    function rebundle() {
        bundler.bundle()
            .on('error', function (err) { console.error(err); this.emit('end'); })
            .pipe(source('main.js'))
            .pipe(buffer())
            //   .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', function () {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

gulp.task('deploy', function () {
    browserSync.init({
        port: 7000,
        server: "./build",
        ui: false,
        open: false
    });
});

gulp.task('build', function () { return compile(); });
gulp.task('watch', function () { return watch(); });

gulp.watch(['./src/**/*']).on('change', function () {
    gulp.series("html")();
    gulp.series("css")();
    gulp.series("watch")();
    browserSync.reload();
})

gulp.task('default', function () {
    gulp.series("html")();
    gulp.series("css")();
    gulp.series('watch')();
    gulp.series('deploy')();
});

