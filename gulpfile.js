var	gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	watchify = require( 'watchify' ),
	browserify = require( 'browserify' ),
	source = require( 'vinyl-source-stream' ),
	buffer = require( 'vinyl-buffer' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	strip = require( 'gulp-strip-comments' ),
	scss = require( 'gulp-sass' ),
	prefixer = require( 'gulp-autoprefixer' ),
	rename = require( 'gulp-rename' ),
	rev = require( 'gulp-rev-append' ),
	watch = require( 'gulp-watch' )
;

gulp.task( 'js', () => {

	watchify( browserify({

		entries: './js/main.js',
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: false

	}))

		.bundle()

			.on( 'error', error => {

				gutil.log( 'Browserify Error', error );

			})

		.pipe( source( 'bundle.js' ) )

		.pipe( buffer() )

		.pipe( sourcemaps.init({

			loadMaps: true

		}))

		.pipe( sourcemaps.write( './' ) )

		.pipe( strip() )

		.pipe( gulp.dest( './public/' ) )

	;

});

gulp.task( 'scss', () => {

	return gulp.src( './scss/main.scss' )

		.pipe( sourcemaps.init({

			loadMaps: true

		}))

		.pipe( scss({

			outputStyle: 'compressed'

		})
			.on( 'error', scss.logError

		))

		.pipe( prefixer() )

		.pipe( rename( 'style.css' ) )

		.pipe( sourcemaps.write( './' ) )

		.pipe( gulp.dest( './public/' ) )

	;

});

gulp.task( 'rev', () => {

	return gulp.src( './index.html' )

		.pipe( rev() )

		.pipe( gulp.dest( './' ) )

	;

});

gulp.task( 'watch', () => {

	gulp.watch( './js/**/*.js', ['js', 'rev'] );

	gulp.watch( './scss/**/*.scss', ['scss', 'rev'] );

});

gulp.task( 'default', [

	'js',
	'scss',
	'rev',
	'watch'

]);