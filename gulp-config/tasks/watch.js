module.exports = () => 
    $.g.task('watch', () => {
        for (const key in $.path.watch) {
            let pathWatch = $.path.watch[key];
            $.g.watch(pathWatch, $.g.parallel(key));
        }
    })