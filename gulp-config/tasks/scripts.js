module.exports = () => 
    $.g.task('scripts', () => 
        $.g.src($.path.src.scripts)
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.concat('all.js'))
            .pipe($.gp.babel())
            .pipe($.gp.babelMinify())
            .pipe($.gp.rename('all.min.js'))
            .pipe($.gp.sourcemaps.write())
            .pipe($.g.dest($.path.dist.scripts))
            .on('end', $.bs.reload)
    )