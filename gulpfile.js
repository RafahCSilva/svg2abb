/**
 * Gulp Tasks
 *
 * Created by RafahCSilva.
 */

// https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
// https://github.com/scotch-io/gulp-getting-started/
// https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

const gulp    = require( 'gulp' ),
      minHtml = require( "gulp-minify-html" ),
      minCss  = require( "gulp-minify-css" ),
      uglify  = require( "gulp-uglify" ),
      rename  = require( 'gulp-rename' ),
      concat  = require( "gulp-concat" ),

      input   = {
        html: 'source/index.html',
        css: 'source/css/app.css',
        css_vendor: [
          'source/css/vendor/bootstrap.css',
          'source/css/vendor/bootstrap-theme.css',
          'source/css/vendor/font-awesome.css',
        ],
        fonts: 'source/fonts/*',
        svg: 'source/svg/*',
        js: [
          'source/javascript/utils.js',
          'source/javascript/rapidabb.js',
          'source/javascript/svg2abb.js',
          'source/javascript/app.js',
        ],
        js_vendor: [
          'source/javascript/vendor/underscore.js',
          'source/javascript/vendor/jquery-3.2.1.js',
          'source/javascript/vendor/bootstrap.js',
        ],
      },
      output  = {
        public: 'public',
        public_css: 'public/assets/stylesheets',
        public_fonts: 'public/assets/fonts',
        public_js: 'public/assets/javascript',
        public_svg: 'public/assets/svg',
        html: 'index.html',
        css: 'app.css',
        css_vendor: 'app_vendor.css',
        js: 'app.js',
        js_vendor: 'app_vendor.js',
      },
      name    = {
        html: 'minify-html',
        css: 'minify-css',
        css_vendor: 'minify-css_vendor',
        fonts: 'copy-fonts',
        svg: 'copy-svg',
        js: 'minify-js',
        js_vendor: 'minify-js_vendor',
        default: 'default',
        watch: 'watch',
      };

// TASKs
gulp.task( name.html, function () {
  gulp.src( input.html )
      .pipe( minHtml() )
      .pipe( gulp.dest( output.public ) );
} );

gulp.task( name.css_vendor, function () {
  gulp.src( input.css_vendor )
      .pipe( minCss() )
      .pipe( concat( output.css_vendor ) )
      .pipe( gulp.dest( output.public_css ) );
} );

gulp.task( name.css, function () {
  gulp.src( input.css )
      .pipe( minCss() )
      .pipe( concat( output.css ) )
      .pipe( gulp.dest( output.public_css ) );
} );

gulp.task( name.fonts, function () {
  gulp.src( input.fonts )
      .pipe( gulp.dest( output.public_fonts ) );
} );
gulp.task( name.svg, function () {
  gulp.src( input.svg )
      .pipe( gulp.dest( output.public_svg ) );
} );

gulp.task( name.js_vendor, function () {
  gulp.src( input.js_vendor )
      //.pipe( uglify( { output: { prettify: false } } ) )
      .pipe( concat( output.js_vendor ) )
      .pipe( gulp.dest( output.public_js ) );
} );

gulp.task( name.js, function () {
  gulp.src( input.js )
      //.pipe( uglify( { compress: { unused: false } } ) )
      .pipe( concat( output.js ) )
      .pipe( gulp.dest( output.public_js ) );
  
} );

gulp.task( name.default, [ name.html, name.css_vendor, name.css, name.fonts, name.js_vendor, name.js ] );

gulp.task( name.watch, function () {
  gulp.watch( input.html, [ name.html ] );
  gulp.watch( input.js, [ name.js ] );
} );