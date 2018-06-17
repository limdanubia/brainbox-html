'use strict';

var gulp           = require('gulp'),
	browserSync   = require('browser-sync').create(),
	reload        = browserSync.reload,
	connect       = require('gulp-connect-php'),
	del           = require('del'),
	watch         = require('gulp-watch'),
	neat          = require('node-neat').includePaths,
	postcss       = require('gulp-postcss'),
	autoprefixer  = require('autoprefixer'),
	cleanCSS      = require('gulp-clean-css');

var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

var prodDir 	= 'src/',
	build	= '../build/',
	assets 	= build + 'assets/',
	endereco 	= 'http://127.0.0.1/',
	bower	= 'bower_components/',
	repo 	= 'brainbox/html/build/';

//Define diretórios
var paths = {
	'prod': {
		'sass'	: prodDir + "/scss/{,*/}*.{scss,sass}",
		'js'		: prodDir + '/scripts/**/*.js',
		'fonts'	: prodDir + '/fonts/**/*.{otf,ttf,woff,woff2,eof,eot,svg}'
	},
	'build': {
		'css'     : assets+'/css/',
		'img'     : assets+'/img/',
		'js'      : assets+'/js/',
		'fonts'   : assets+'/fonts/'
	}
};

//Server watching files
gulp.task('bsync', ['sass', 'scripts', 'fonts', 'watch'], function () {
	connect.server({}, function () {
		browserSync.init({
			proxy: endereco + repo
		});
	});
});

//Task pra concatenar os JS na pasta Scripts
gulp.task('scripts', ['bower'], function () {
	return gulp.src(paths.prod.js)
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.plumber({
		errorHandler: function (err) {
			plugins.notify.onError({
				title: "Erro no JS",
				message: "Error: <%= error.message %>"
			})(err);
			this.emit('end');
		}
	}))
	.pipe(plugins.jshint())
	.pipe(plugins.jshint.reporter('jshint-stylish'))
	.pipe(plugins.concat('main.js'))
	.pipe(plugins.rename({suffix: '.min'}))
	.pipe(plugins.uglify())
	.pipe(plugins.sourcemaps.write())
	.pipe(gulp.dest(paths.build.js))
	.pipe(browserSync.stream());

});

//Task para os arquivos do bower
gulp.task('bower', function () {
	del(paths.build.js+'**/*', {force:true});
	return gulp.src([
		bower+'jquery/dist/jquery.min.js',
		bower+'magnific-popup/dist/jquery.magnific-popup.min.js',
	])
	.pipe(plugins.plumber({
		errorHandler: function (err) {
			plugins.notify.onError({
				title: "Erro no bower",
				message: "Error: <%= error.message %>"
			})(err);
			this.emit('end');
		}
	}))
	.pipe(plugins.concat('vendor.js'))
	.pipe(plugins.rename({suffix: '.min'}))
	.pipe(plugins.uglify())
	.pipe(gulp.dest(paths.build.js));
});


//Task que apanha os css do Bower e junta num vendor
gulp.task('vendorCSS', function () {
	del.sync(paths.build.css + '/**/*', {force: true});
	return gulp.src([
		bower+'animate.css/animate.min.css/',
		bower+'font-awesome/css/font-awesome.css/',
		bower+'magnific-popup/dist/magnific-popup.css',
	])
		.pipe(plugins.concat('vendor.css'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.build.css))
});

// Task para concatenar os arquivos .SCSS na pasta CSS
gulp.task('sass', ['vendorCSS'], function () {
	return gulp.src(paths.prod.sass)
		.pipe(plugins.plumber({
			errorHandler: function (err) {
				plugins.notify.onError({
					title: "Erro no CSS",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end');
			}
		}))
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			includePaths: ['styles'].concat(neat)
		}))
		.pipe(postcss([ autoprefixer({
			browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20', 'iOS >=7'],
			cascade: false
		}) ]))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.build.css))
		.pipe(browserSync.stream({match: '**/*.css'}));
});

//Task fonts
gulp.task('fonts', function () {
	del.sync([paths.build.fonts + '/**/*'], {force: true});
	gulp.src(paths.prod.fonts)
		.pipe(gulp.dest(paths.build.fonts));
});

//Task WATCH
gulp.task('watch', function () {
	gulp.watch(paths.prod.sass, ['sass']);
	gulp.watch(paths.prod.js, ['scripts']).on(['change', 'add', 'unlink'], reload);
	gulp.watch(paths.prod.img, ['images']).on(['change', 'add', 'unlink'], reload);
	gulp.watch([
		build+"**/*.php",
		build+"**/*.html",
	]).on(['change'], reload);
});

gulp.task('build', ['scripts', 'sass', 'fonts']);

// Task Default - $ gulp
gulp.task('default', ['bsync']);