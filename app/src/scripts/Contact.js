try {
    const infoRight = document.querySelector('.info__abs'),
          footer = document.querySelector('.footer');
function changeHeight(){
    let footerOffset = footer.offsetTop;
    if(window.innerWidth > 990){
        infoRight.style.height = footerOffset+200 + 'px';
    }
    else infoRight.style.height = 'auto';
}
changeHeight();
    window.addEventListener('resize', function(e){
        changeHeight();
    })      
} catch (e) {
    
}