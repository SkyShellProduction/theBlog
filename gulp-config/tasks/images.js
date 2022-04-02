module.exports = () => 
    $.g.task('images', () =>
        $.g.src($.path.src.images)
            .pipe($.gp.imagemin())
            // .pipe($.gp.webp())
            .pipe($.g.dest($.path.dist.images))
            .on('end', $.bs.reload)
    )