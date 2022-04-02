module.exports = () => 
    $.g.task('html2', () => 
        $.g.src($.path.src.html2)
            .pipe($.gp.pug())
            .pipe($.g.dest($.path.dist.html))
            .on('end', $.bs.reload)
    )