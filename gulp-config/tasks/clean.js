module.exports = () => 
    $.g.task('clean', () => 
        $.g.src(['./app/dist/**/*.*', '!./app/dist/static/**/*.*'])
            .pipe($.gp.clean())
    )