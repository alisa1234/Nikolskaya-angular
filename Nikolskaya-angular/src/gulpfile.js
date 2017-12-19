/**
 * Created by Алиска on 14.12.2016.
 */
/*jslint node: true */
"use strict";
var gulp = require('gulp'),
//minifyCSS = require('gulp-minify-css'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
//less = require('gulp-less'),
    sass = require('gulp-sass'),
//base64 = require('gulp-base64'),
//uncss = require('gulp-uncss'),
    runSequence = require('run-sequence'),
//pixrem = require('gulp-pixrem'), //for old ie
    plumber = require('gulp-plumber'),
// rename = require("gulp-rename"),
    pngquant = require('imagemin-pngquant'), // PNG plugin for ImageMin
//pxtorem = require('gulp-pxtorem') //for convert px to rem
    spritesmith = require('gulp.spritesmith'), // Convert a set of images into a spritesheet and CSS variables
//gulpif = require("gulp-if"),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    svgmin = require('gulp-svgmin'), // Minify SVG with SVGO
//svg2png = require('gulp-svg2png'), // Convert SVGs to PNGs
    raster = require('gulp-raster'),
    svgcss = require('gulp-svg-css'),
    replace = require('gulp-replace'),
    svgspritesheet = require('gulp-svg-spritesheet'), // Convert a set of SVGs into a spritesheet and CSS variables
    svgsprite = require('gulp-svg-sprites'), // Convert a set of SVGs into a spritesheet and CSS variables

/* moreCSS = require('gulp-more-css')*/
//minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps')

    ;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        // html: 'dist/',
        // js: 'dist/js/',
        scss: 'app/sass/sass/',
        css: 'app/sass/sass/',
        img: 'app/sass/images/',
        // fonts: 'dist/fonts/',
        // video: 'dist/video/',
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
    src: { //Пути откуда брать исходники
        // html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        // js: 'src/js/**/*.js',//В стилях и скриптах нам понадобятся только main файлы
        scss: 'app/sass/sass/app.scss',
        // css: ['scss/sass/style.css', 'scss/**/*.map'],
        // img: 'app/sass/sass/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        // fonts: 'src/fonts/**/*.*',
        icons: 'app/sass/sass/icons/**/*.svg',
        // video: 'src/video/**/*.*',
        // etc: 'src/**/*.{php,pdf}',
        svgSpriteTpl: 'app/sass/sass/tmpl/_svg-sprite-scss.tpl',
        pngSpriteTpl: 'app/sass/sass/tmpl/_png-sprite-scss.tpl',
        svgSprite: 'app/sass/sass/icons/**/*.svg',
        svgSpriteComponent: 'app/sass/sass/icons/**/*.svg',
        pngSprite: 'app/sass/sass/icons/**/*.png',
        pngSpriteComponent: 'app/sass/sass/icons/**/*.png',
        pngRetinaSprite: 'app/sass/sass/icons/**/*-2x.png',
        styles: 'app/sass/sass/'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        // html: 'src/**/*.html',
        // js: 'src/js/**/*.js',
        scss: 'app/sass/sass/**/*.scss',
        css: 'app/sass/sass/**/*.{css, map}',
        // img: 'src/img/**/*.*',
        // fonts: 'src/fonts/**/*.*',
        icons: 'app/sass/sass/icons/**/*.*',
        svgSprite: 'app/sass/sass/icons/**/*.svg'
    }
    // clean: 'dist/'
};


var config = {
    server: {
        baseDir: "app/sass/sass/"
    },
    //tunnel: false,
    //tunnel: "papasha", // project name
    // host: '148.251.67.197',
    port: 22,
    logPrefix: "set",
    //ui: false,
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

 gulp.task('svg-sprite', function () {//old svg-to-css
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

// gulp.task('svg-sprite-component', function () {//old svg-to-css
//     return gulp
//         .src(path.src.icons)
//         .pipe(svgmin())
//         .pipe(svgcss({
//             fileName: '_icons',
//             cssPrefix: 'sp-component__',
//             defaultWidth: '16px',
//             defaultHeight: '16px',
//             fileExt: 'scss',
//             cssSelector: '@mixin',
//             addSize: true
//         }))
//         .pipe(gulp.dest(path.src.styles + 'inc_component/'));
// });

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

        // .pipe(svg2png())
        .pipe(raster())
        .pipe(plumber.stop())
        .pipe(gulp.dest(path.build.svgSpriteNoSvg));

});

// gulp.task('svg-sprite-component', function () {
//     gulp.src(path.src.svgSpriteComponent)
//         .pipe(svgspritesheet({
//             cssPathNoSvgComponent: 'inc_component/svg-sprite-component.png',
//             cssPathSvgComponent: 'inc_component/svg-sprite-component.svg',
//             padding: 5,
//             pixelBase: 16,
//             positioning: 'packed',
//             templateSrc: path.src.svgSpriteTpl,
//             templateDestComponent: path.build.svgSpriteCSSComponent,
//             units: 'px'
//         }))
//         .pipe(svgmin())
//         .pipe(gulp.dest(path.build.svgSpriteComponent))
//
//         // .pipe(svg2png())
//         .pipe(raster())
//         .pipe(plumber.stop())
//         .pipe(gulp.dest(path.build.svgSpriteNoSvgComponent));
//
// });

/* PNG Sprite */
gulp.task('png-sprite', function () {
    // Generate spritesheet
    var spriteData = gulp.src(path.src.pngSprite).pipe(spritesmith({
        imgName: 'png-sprite.png',
        imgPath: '../sass/sass/inc/png-sprite.png',
        // retinaSrcFilter: path.src.pngRetinaSprite,
        // retinaImgName: 'png-sprite-2x.png',
        // retinaImgPath: 'sass/sass/img/png-sprite-2x.png',
        padding: 5,
        cssTemplate: path.src.pngSpriteTpl,
        cssFormat: 'scss',
        cssName: '_png-sprite.scss',
        cssVarMap: function (sprite) {
            sprite.name = 'sp__' + sprite.name;
        }
    }));

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        //.pipe(imagemin())
        .pipe(gulp.dest(path.build.pngSprite))


    // Pipe CSS stream onto disk
    spriteData.css
        .pipe(gulp.dest(path.build.pngSpriteCSS));

});

// gulp.task('png-sprite-component', function () {
//     // Generate spritesheet
//     var spriteData = gulp.src(path.src.pngSpriteComponent).pipe(spritesmith({
//         imgName: 'png-sprite-component.png',
//         imgPathComponent: 'inc_component/png-sprite-component.png',
//         // retinaSrcFilter: path.src.pngRetinaSprite,
//         // retinaImgName: 'png-sprite-2x.png',
//         // retinaImgPath: 'sass/sass/img/png-sprite-2x.png',
//         padding: 5,
//         cssTemplate: path.src.pngSpriteTpl,
//         cssFormat: 'scss',
//         cssName: '_png-sprite-component.scss',
//         cssVarMap: function (sprite) {
//             sprite.name = 'sp-component__' + sprite.name;
//         }
//     }));
//
//     // Pipe image stream through image optimizer and onto disk
//     spriteData.img
//         //.pipe(imagemin())
//         .pipe(gulp.dest(path.build.pngSpriteComponent))
//
//
//     // Pipe CSS stream onto disk
//     spriteData.css
//         .pipe(gulp.dest(path.build.pngSpriteCSSComponent));
//
// });
gulp.task('style', function () {
    return gulp.src(path.src.scss)
        .pipe(plumber())
        //.pipe(less())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .on("error", notify.onError("Error: <%= error.message %>"))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'Opera 12.1', 'IE 8']
        }))
        .on("error", notify.onError("Error: <%= error.message %>"))
        /*.pipe(moreCSS({
         radical: false
         }))*/

        //.pipe(minifyCss({compatibility: 'ie8', aggressiveMerging: 'false'}))
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
        //.pipe(uglify())
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
    // gulp.watch(path.src.html, ['html']);
    gulp.watch(path.src.video, ['video_copy']);
    gulp.watch(path.src.etc, ['etc_copy']);
    // gulp.watch(path.src.fonts, ['fonts_copy']);
    gulp.watch(path.src.js, ['js']);
    gulp.watch(path.src.svgSprite, ['svg-sprite']);
    gulp.watch(path.src.pngSprite, ['png-sprite']);
});


gulp.task('build', function (callback) {
    runSequence(
        ['svg-sprite', 'png-sprite'],
        [ 'style'],
        // 'css',
        callback);
});
gulp.task('all', function (callback) {
    runSequence('build',
        'watch',
        'webserver',
        callback);
});