const header = document.querySelector('.header'),
      headerBtn = document.querySelector('.header__btn'),
      headerAbs = document.querySelector('.header__abs'),
      headerList = document.querySelector('.header__list'),
      headerLinks = document.querySelectorAll('.header__link');
window.addEventListener('scroll', function(){
    if(this.scrollY > 200) header.classList.add('active');
    else header.classList.remove('active');
})
headerBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.body.classList.toggle('hidden');
    this.classList.toggle('active');
    headerList.classList.toggle('active');
    headerAbs.classList.toggle('active');
})
headerAbs.addEventListener('click', function(){
    document.body.classList.remove('hidden');
    this.classList.remove('active');
    headerList.classList.remove('active');
    headerBtn.classList.remove('active');
})
headerLinks.forEach(item => {
    let page = item.getAttribute('data-page');
    if(document.body.classList.contains(page)){
        item.classList.add('active');
    }
})