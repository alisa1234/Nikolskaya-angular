/*jslint node: true */
"use strict";
var gulp = require('gulp'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    svgmin = require('gulp-svgmin'),
    raster = require('gulp-raster'),
    svgcss = require('gulp-svg-css'),
    replace = require('gulp-replace'),
    svgspritesheet = require('gulp-svg-spritesheet'),
    svgsprite = require('gulp-svg-sprites'),
    sourcemaps = require('gulp-sourcemaps');

var path = {
    build: {
        scss: 'app/sass/sass/',
        css: 'app/sass/sass/',
        img: 'app/sass/images/',
        icons: 'app/sass/sass/inc',
        svgSpriteCSS: 'app/sass/sass/_svg-sprite.scss',
        svgSprite: 'app/sass/sass/inc/svg-sprite.svg',
        svgSpriteNoSvg: 'app/sass/sass/inc/svg-sprite.png',
        pngSprite: 'app/sass/sass/inc/',
        pngSpriteCSS: 'app/sass/sass/',
        svgSpriteCSSComponent: './sass/sass/inc_component/_svg-sprite-component.scss',
        svgSpriteComponent: './sass/sass/inc_component/svg-sprite-component.svg',
        svgSpriteNoSvgComponent: './sass/sass/inc_component/svg-sprite-component.png',
        pngSpriteComponent: './sass/sass/inc_component/',
        pngSpriteCSSComponent: './sass/sass/inc_component/'
    },
    src: {
        scss: 'app/sass/sass/app.scss',
        icons: 'app/sass/sass/icons/**/*.svg',
        svgSpriteTpl: 'app/sass/sass/tmpl/_svg-sprite-scss.tpl',
        pngSpriteTpl: 'app/sass/sass/tmpl/_png-sprite-scss.tpl',
        svgSprite: 'app/sass/sass/icons/**/*.svg',
        svgSpriteComponent: 'app/sass/sass/icons/**/*.svg',
        pngSprite: 'app/sass/sass/icons/**/*.png',
        pngSpriteComponent: 'app/sass/sass/icons/**/*.png',
        pngRetinaSprite: 'app/sass/sass/icons/**/*-2x.png',
        styles: 'app/sass/sass/'
    },
    watch: {
        scss: 'app/sass/sass/**/*.scss',
        css: 'app/sass/sass/**/*.{css, map}',
        icons: 'app/sass/sass/icons/**/*.*',
        svgSprite: 'app/sass/sass/icons/**/*.svg'
    }
};
var config = {
    server: {
        baseDir: "app/sass/sass/"
    },
    port: 22,
    logPrefix: "set",
    ghostMode: false,
    logConnections: false,
    logFileChanges: false,
    open: false,
    notify: false,
    reloadDebounce: 500,
    online: true
};
gulp.task('webserver', function () {
    browserSync(config);
});
/* SVG sprite */
 gulp.task('svg-sprite', function () {
    return gulp
         .src(path.src.icons)
         .pipe(svgmin())
         .pipe(svgcss({
            fileName: '_icons',
             cssPrefix: 'sp__',
             defaultWidth: '16px',
             defaultHeight: '16px',
             fileExt: 'scss',
             cssSelector: '@mixin',
             addSize: true
         }))
         .pipe(gulp.dest(path.src.styles + 'inc/'));
 });
gulp.task('svg-sprite', function () {
    gulp.src(path.src.svgSprite)
        .pipe(svgspritesheet({
            cssPathNoSvg: '../sass/sass/inc/svg-sprite.png',
            cssPathSvg: '../sass/sass/inc/svg-sprite.svg',
            padding: 5,
            pixelBase: 16,
            positioning: 'packed',
            templateSrc: path.src.svgSpriteTpl,
            templateDest: path.build.svgSpriteCSS,
            units: 'px'
        }))
        .pipe(svgmin())
        .pipe(gulp.dest(path.build.svgSprite))
        .pipe(raster())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.svgSpriteNoSvg));
});
/* PNG Sprite */
gulp.task('png-sprite', function () {
    var spriteData = gulp.src(path.src.pngSprite).pipe(spritesmith({
        imgName: 'png-sprite.png',
        imgPath: '../sass/sass/inc/png-sprite.png',
        padding: 5,
        cssTemplate: path.src.pngSpriteTpl,
        cssFormat: 'scss',
        cssName: '_png-sprite.scss',
        cssVarMap: function (sprite) {
            sprite.name = 'sp__' + sprite.name;
        }
    }));
    spriteData.img
        .pipe(gulp.dest(path.build.pngSprite));
    spriteData.css
        .pipe(gulp.dest(path.build.pngSpriteCSS));
});
gulp.task('style', function () {
    return gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'Opera 12.1', 'IE 8']
        }))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(sourcemaps.write('.'))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.scss));
});
gulp.task('img', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
gulp.task('js', function () {
    gulp.src(path.src.js)
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});
gulp.task('clean', function () {
    return gulp.src(path.clean, {read: false})
        .pipe(clean())
        .on("error", notify.onError("Error: <%= error.message %>"));
});
gulp.task('html', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('etc_copy', function () {
    return gulp.src(path.src.etc)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
gulp.task('video_copy', function () {
    return gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
        .pipe(reload({stream: true}));
});
gulp.task('fonts_copy', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});
gulp.task('css', function () {
    return gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
gulp.task('sass', function () {
    gulp.src('.sass/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../sass/sass/app.css'));
});
gulp.task('sass:watch', function () {
    gulp.watch('.sass/sass/**/*.scss', ['sass']);
});
gulp.task('watch', function () {
    gulp.watch(path.src.css, ['css']);
    gulp.watch(path.watch.scss, ['style']);
    gulp.watch(path.src.img, ['img']);
    gulp.watch(path.src.video, ['video_copy']);
    gulp.watch(path.src.etc, ['etc_copy']);
    gulp.watch(path.src.js, ['js']);
    gulp.watch(path.src.svgSprite, ['svg-sprite']);
    gulp.watch(path.src.pngSprite, ['png-sprite']);
});
gulp.task('build', function (callback) {
    runSequence(
        ['svg-sprite', 'png-sprite'],
        [ 'style'],
        callback);
});
gulp.task('all', function (callback) {
    runSequence('build',
        'watch',
        'webserver',
        callback);
});