try {
    class Slider {
        constructor({ el, active, duration, direction, autoplay, autoplayTime, prev, next, showNums }) {
            this.slider = el instanceof HTMLElement ? el : document.querySelector(el);
            this.sliderLines = this.slider.querySelector('.sliderLines');
            this.slides = [...this.sliderLines.children];
            this.active = active;
            this.duration = duration > 399 && duration !== undefined ? duration : 400;
            this.direction = direction.toUpperCase();
            this.autoplay = autoplay;
            this.autoplayTime = autoplayTime;
            this.prev = this.slider.querySelector(prev);
            this.next = this.slider.querySelector(next);
            this.touch = true;
            this.width = this.sliderLines.clientWidth;
            this.height = this.sliderLines.clientHeight;
            this.moveSize = this.direction == 'X' ? this.width : this.height;
            this.posHold = this.direction == 'X' ? this.width/100*18 : this.height/100*18;
            this.posX1 = 0;
            this.posX2 = 0;
            this.posInit = 0;
            this.interval = '';
            this.showNums = showNums;
            if(this.direction == 'X'){
                window.addEventListener('scroll', () => this.scroll());
            }
            // if(this.showNums){
            //     let div = document.createElement('div');
            //     div.className = 'slider__abs';
            //     div.innerHTML = `${this.active+1}/${this.slides.length}`;
            //     this.slider.append(div);
            // }
            this.setClass();
            this.adaptive();
            this.autoplaying();
            window.addEventListener('resize', () =>this.adaptive());
            // this.slidePosition();
            this.prev.addEventListener('click', this.moveLeft);
            this.next.addEventListener('click', this.moveRight);
            this.slider.addEventListener('mousedown', this.swipeStart);
            this.slider.addEventListener('touchstart', this.swipeStart);
        }
        changeInt(){
            let abs = this.slider.querySelector('.slider__abs');
            abs.innerHTML = `${this.active+1}/${this.slides.length}`;
        }
        disableButtons() {
            this.prev.disabled = true;
            this.next.disabled = true;
            setTimeout(() => {
                this.prev.disabled = false;
                this.next.disabled = false;
            }, this.duration);
        }
        setClass() {
          if(this.slides.length > 2){
            this.slides.forEach(item=>{
                item.classList.remove('activeSlide');
                item.classList.remove('prevSlide');
                item.classList.remove('nextSlide');
            })
            this.slides[this.active].classList.add('activeSlide');
            if(this.active == 0) this.slides[this.slides.length -1].classList.add('prevSlide');
            else this.slides[this.active].previousElementSibling.classList.add('prevSlide');
            if(this.active == this.slides.length -1) this.slides[0].classList.add('nextSlide');
            else this.slides[this.active].nextElementSibling.classList.add('nextSlide');
          }
        }
        moveLeft = () => {
            clearInterval(this.interval);
            this.autoplaying();
            this.disableButtons();
            this.slides.forEach(item=>{
                item.style.transition = '0ms';
                if(!item.classList.contains('activeSlide') || !item.classList.contains('nextSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
                }
            });
            // this.slidePosition();
            this.slides[this.active].style.transform = `translate${this.direction}(${this.moveSize}px)`;
            this.slides[this.active].style.transition = `${this.duration}ms`;
            this.active--;
            if(this.active < 0) this.active = this.slides.length-1;
            this.setClass();
            // this.changeInt();
            this.slides[this.active].style.transform = `translate${this.direction}(0px)`;
            this.slides[this.active].style.transition = `${this.duration}ms`;
        }
        moveRight = () => {
            clearInterval(this.interval);
            this.autoplaying();
            this.disableButtons();
            this.slides.forEach(item=>{
                item.style.transition = '0ms'
                if(!item.classList.contains('activeSlide') || !item.classList.contains('prevSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize}px)`;
                }
            });
            // this.slidePosition();
            this.slides[this.active].style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
            this.slides[this.active].style.transition = `${this.duration}ms`;
            this.active++;
            if(this.active == this.slides.length) this.active = 0;
            this.setClass();
            // this.changeInt();
            this.slides[this.active].style.transform = `translate${this.direction}(0px)`;
            this.slides[this.active].style.transition = `${this.duration}ms`;
        }
        slidePosition(){
            this.slides.forEach((item, index)=>{
                item.style.transition = '0ms';
                if(this.active > index){
                    item.style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
                }
                if(this.active < index){
                    item.style.transform = `translate${this.direction}(${this.moveSize}px)`;
                }
                if(item.classList.contains('prevSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
                }
                if(item.classList.contains('nextSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize}px)`;
                }
            })
        }
        adaptive(){
            this.width = this.sliderLines.clientWidth;
            this.height = this.sliderLines.clientHeight;
            this.moveSize = this.direction == 'X' ? this.width : this.height;
            this.posHold = this.direction == 'X' ? this.width/100*18 : this.height/100*18;
            this.slides.forEach(item => {
                item.style = `
                    position: absolute;
                    width: ${this.width}px;
                    height: ${this.height}px;
                    overflow: hidden;
                `;
                this.slidePosition();
            })
        }
        swipeStart = (e) =>{
            if(this.direction == 'X'){
                this.posX1 = e.type == 'touchstart' ? e.touches[0].clientX : e.clientX;
            }
            else  this.posX1 = e.type == 'touchstart' ? e.touches[0].clientY : e.clientY;
            clearInterval(this.interval);
            this.slider.addEventListener('mousemove', this.swipeMove);
            this.slider.addEventListener('touchmove', this.swipeMove);
            document.addEventListener('mouseup', this.swipeEnd);
            document.addEventListener('touchend', this.swipeEnd);
        }
        swipeMove = (e) =>{
            if(this.direction == 'X'){
                this.posInit = e.type == 'touchmove' ? e.changedTouches[0].clientX : e.clientX;
            }
            else  this.posInit = e.type == 'touchmove' ? e.changedTouches[0].clientY : e.clientY;
            this.posX2 = this.posInit - this.posX1;
            this.slides.forEach(item=>{
                item.style.transition = '0ms';
                this.slides[this.active].style.transform = `translate${this.direction}(${this.posX2}px)`;
                if(item.classList.contains('prevSlide')){
                    item.style.transform = `translate${this.direction}(${-(this.moveSize-this.posX2)}px)`;
                }
                if(item.classList.contains('nextSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize+this.posX2}px)`;
                }
            })
        }
        swipeEnd = (e) =>{
            if(this.posX2 > this.posHold){
                this.moveLeft();
            }
            else if(this.posX2 < 0 && this.posX2 < -this.posHold){
                this.moveRight();
            }
            else this.moveCenter();
            this.posInit = 0;
            this.posX1 = 0;
            this.posX2 = 0;
            this.scroll();
        }
        scroll(){
            this.slider.removeEventListener('mousemove', this.swipeMove);
            this.slider.removeEventListener('touchmove', this.swipeMove);
            document.removeEventListener('mouseup', this.swipeEnd);
            document.removeEventListener('touchend', this.swipeEnd);
        }
        moveCenter(){
            this.autoplaying();
             this.slides.forEach(item=>{
                 item.style.transition = `${this.duration}ms`;
                 this.slides[this.active].style.transform = `translate${this.direction}(0px)`;
                 if(item.classList.contains('prevSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
                }
                if(item.classList.contains('nextSlide')){
                    item.style.transform = `translate${this.direction}(${this.moveSize}px)`;
                }
             })
        }
        autoplaying(){
            if(this.autoplay){
                this.interval = setInterval(() => {
                    this.moveRight();
                }, this.autoplayTime+this.duration);
            }
        }
    }
    const mySlider = new Slider({
        el: '.slider',
        active: 0,
        duration: 500,
        direction: 'x',
        autoplay: false,
        autoplayTime: 4000,
        prev: '.slider__prev',
        next: '.slider__next'
    });
        
} catch (e) {
    
}