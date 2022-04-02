// const gulp = require('gulp');
// const htmlmin = require('gulp-htmlmin');
// function html(){
//     return gulp.src('./app/src/*.html')
//                 .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
//                 .pipe(gulp.dest('./app/dist/'))
// }
// exports.default = html;
global.$ = {
    g: require('gulp'),
    gp: require('gulp-load-plugins')(),
    bs: require('browser-sync').create(),
    path: {
        tasks: require('./gulp-config/tasks.js'),
        serverDir: './app/dist/',
        src: {
            html: ['./app/src/**/*.html', '!./app/src/view/**/*'],
            html2: ['./app/src/**/*.pug', '!./app/src/view/**/*'],
            styles: './app/src/styles/*.scss',
            scripts: './app/src/scripts/*.js',
            fonts: './app/src/fonts/**/*.{ttf,woff,woff2,eot,svg,otf}',
            images: './app/src/images/**/*.{png,jpg,jpeg,svg,gif,webp}'
        },
        dist: {
            html: './app/dist/',
            styles: './app/dist/styles/',
            scripts: './app/dist/scripts/',
            fonts: './app/dist/fonts/',
            images: './app/dist/images/'
        },
        watch: {
            html: './app/src/**/*.{html,json}',
            html2: './app/src/**/*.{pug,html}',
            styles: './app/src/styles/**/*.scss',
            scripts: './app/src/scripts/**/*.js',
            fonts: './app/src/fonts/**/*.{ttf,woff,woff2,eot,svg,otf}',
            images: './app/src/images/**/*.{png,jpg,jpeg,svg,gif,webp}'
        },
    }
}
$.path.tasks.forEach(item => require(item)());
exports.default = $.g.series('clean', 'fonts', 'images', $.g.parallel('html', 'html2', 'styles', 'scripts', 'server', 'watch'));
exports.build = $.g.series('clean', 'fonts', 'images', $.g.parallel('html', 'html2', 'styles', 'scripts'));

