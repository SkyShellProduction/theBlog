module.exports = () => 
    $.g.task('fonts', () => 
        $.g.src($.path.src.fonts)
            .pipe($.gp.fonter({
                formats: ['woff', 'ttf']
            }))
            .pipe($.g.dest($.path.dist.fonts))
            .on('end', $.bs.reload)
    )