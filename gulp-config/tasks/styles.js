const sass = require('gulp-sass')(require('sass'));
module.exports = () => 
    $.g.task('styles', () => 
        $.g.src($.path.src.styles)
            .pipe(sass())
            .pipe($.gp.autoprefixer({grid: "autoplace"}))
            .pipe($.gp.groupCssMediaQueries())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe($.gp.rename('style.min.css'))
            .pipe($.g.dest($.path.dist.styles))
            .on('end', $.bs.reload)
    )
