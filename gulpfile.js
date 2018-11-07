let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    minifyCSS = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat');
 
gulp.task('sass', function () {
    return gulp.src('sass/main.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
});
 
gulp.task('sass:watch', function () {
    gulp.watch('sass/**/*.sass', ['sass'])
    gulp.watch('dist/css/*.css', ['styles'])
    gulp.watch('dist/js/*.js', ['scripts'])
});

//jsleri sikistirmak icin
gulp.task('scripts',function(){
	return gulp.src('dist/js/*.js')
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('js'))
});

//css dosyalarini sikirtirmak icin
gulp.task('styles',function(){
	gulp.src('./dist/css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('css'))
});

//resimleri sikistirmak icin
gulp.task('images', () => {
    gulp.src('dist/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
});

gulp.task('default', ['sass:watch', 'scripts', 'styles','images'] )