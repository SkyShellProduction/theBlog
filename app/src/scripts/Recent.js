try {
    const recentImg = [...document.querySelectorAll('.recent__left-item')],
      recentCube = [...document.querySelectorAll('.recent__cube:not(.recent__cube-last)')],
      recentNext = document.querySelector('.recent__next'),
      recent = document.querySelector('.recent');
function scrollRecent(){
    if(window.innerWidth < 990) {
        recent.scrollIntoView({block: 'start', behavior: "smooth"})
    }
    window.addEventListener('resize', function(){
        if(window.innerWidth < 990) {
            recent.scrollIntoView({block: 'start', behavior: "smooth"})
        }
    })
}
for (let i = 0; i < recentCube.length; i++) {
    recentCube[i].closest('.recent__pers').style.zIndex = 20 - i;
    recentCube[i].addEventListener('click', function(e){
        e.preventDefault();
        for (let k = 0; k < recentCube.length; k++) {
            recentImg[k].classList.remove('active');
            recentCube[k].classList.remove('active');
        }
        this.classList.add('active');
        recentImg[i].classList.add('active');
        scrollRecent();
    })
}
recentNext.addEventListener('click', function(e){
    e.preventDefault();
    let active = recentCube.findIndex(item => item.classList.contains('active'));
    active++;
    if(active == recentCube.length) active = 0;
    for (let k = 0; k < recentCube.length; k++) {
        recentImg[k].classList.remove('active');
        recentCube[k].classList.remove('active');
    }
    recentCube[active].classList.add('active');
    recentImg[active].classList.add('active');
    scrollRecent();
})
} catch (e) {
    
}