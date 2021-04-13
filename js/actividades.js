document.addEventListener("DOMContentLoaded", function(){
    var slider = [];
    var main = document.getElementsByTagName('main')[0];

    function createSliders(){
        var htmlSliders = slider.map(
            function(currentItem, indexOfItem){

                var sliderComponent = document.createElement('section');
                sliderComponent.classList.add('slider');
                var sliderYear = `
                <div class="sliderYear">
                    <h2>${currentItem.Anio}</h2>
                </div>`;

                sliderComponent.innerHTML = sliderYear;

                var trail = document.createElement('section');
                trail.classList.add('slideTrail');

                var lens = document.createElement('section');
                lens.classList.add('slideLens');

                var frames = currentItem.slideFrame.map(function(item, index){
                    return`
                    <div class="slideFrame">
                        <div class="slideImg">
                            <picture>
                                <source srcset="${item.lg}" media="(min-width:1025px)" />
                                <source srcset="${item.md}" media="(min-width:640px" ) />
                                <img alt="img1" src="${item.sm}" />
                            </picture>
                        </div>
                        <div class="frameDescription">
                            <time>${item.date}</time>
                            <h3>${item.title}</h3>
                            <p class="description">${item.description}</p>
                        </div>
                    </div>
                    `
                });

                trail.innerHTML = frames.join('');
                lens.append(trail);
                lens.innerHTML += 
                `<div class="arrowsPosition">
                    <div class="arrow arrow-left"><i class="fas fa-chevron-left"></i></div>
                    <div class="arrow arrow-right"><i class="fas fa-chevron-right"></i></div>
                </div>
                <div class="dotsPosition"></div>`;

                sliderComponent.append(lens);

                return sliderComponent;
            }
        );
        htmlSliders.forEach(ele => {
            main.append(ele);
        });
        afterLoad();
    }

    fetch("js/actividades.json")
    .then(function(response){
        return response.json();
    }).then(function(jsonData){
        slider = jsonData;
        createSliders();
    }).catch(function(err){
        console.log(err);
    })

    
});

//All content loaded including resources ------------------------------------------------------
function afterLoad(){

    var slideTrail;
    var currentSlideIndex = [];
    var timerRef = [];
    var direction = [];

    var slideFrames = []; 

    slideTrail = document.getElementsByClassName("slideTrail");
    for(var i = 0; i < slideTrail.length; i++){
        slideFrames.push(slideTrail[i].children);
        timerRef.push(null);
        currentSlideIndex.push(0);
        direction.push(1);
    }

    initSlider();
    
    function initSlider(){
        for(var i = 0; i < slideFrames.length; i++){
            slideTrail[i].style.width = (slideFrames[i].length * 100) + "%";
            tick(i);
        }
    }
    function tick(index){
        timerRef[index] = setTimeout(
        function(){
            
            if (direction[index] == 1 && currentSlideIndex[index] == (slideFrames[index].length - 1)) {
            direction[index] = -1;
            }
            if (direction[index] == -1 && currentSlideIndex[index] == 0) {
            direction[index] = 1;
            }
            if(slideFrames[index].length == 1){
                direction[index] = 0;
            }
            var nextSlide = currentSlideIndex[index] + direction[index];
            // Mover el slide
            moveSliderTo(nextSlide,index);
            tick(index);
        },
        5000
        );
    }

    function moveSliderTo(slideTo,index) {
        slideTrail[index].style.left = (slideTo * -100) + "%";
        
        changeSlideIndex(slideTo, index);
    }

    function changeSlideIndex(slideTo,index){
        var dots = document.getElementsByClassName('dotsPosition')[index].children;
        
        dots[currentSlideIndex[index]].classList.remove('currentDot');

        currentSlideIndex[index] = slideTo;

        dots[currentSlideIndex[index]].classList.add('currentDot');
    }

    var divContainer = document.getElementsByClassName('dotsPosition');

    //Puntos
    for(var j = 0; j < slideFrames.length; j++){
        for(var i = 0; i < slideFrames[j].length; i++){
            var divPoint = document.createElement('DIV');
            divPoint.className = 'dot';
            divPoint.dataset.slideIndex = i;
            divPoint.dataset.trailIndex = j;
            
            divContainer[j].appendChild(divPoint);
        }
        
        changeSlideIndex(0,j);
    }
    

    var divPoints = document.getElementsByClassName('dot');
    for(var j = 0; j < divPoints.length; j++){

        divPoints[j].addEventListener('click',function(e){
        clearTimeout(timerRef[Number(this.dataset.trailIndex)]);
        moveSliderTo(Number(this.dataset.slideIndex),Number(this.dataset.trailIndex));
        if(window.getComputedStyle(document.getElementsByClassName('arrowsPosition')[0]).display != "none"){
            tick(Number(this.dataset.trailIndex));
        }
        
        });
    }
    
    //Arrows ---------------------------------------------------------------------
    var leftArrow = document.getElementsByClassName('arrow-left');
    for(var i = 0; i < leftArrow.length; i++){
        leftArrow[i].dataset.trailIndex = i;
        leftArrow[i].addEventListener('click',function(e){

            var index = Number(this.dataset.trailIndex);
            clearTimeout(timerRef[index]);
            var slideTo = currentSlideIndex[index] - 1;
            if(slideTo < 0){
                slideTo = 0;
            }
            console.log(slideTo)
            moveSliderTo(slideTo,index);
            tick(index);

        });
    }
    

    var rightArrow = document.getElementsByClassName('arrow-right');
    for(var i = 0; i < rightArrow.length; i++){
        rightArrow[i].dataset.trailIndex = i;
        rightArrow[i].addEventListener('click',function(e){

            var index = Number(this.dataset.trailIndex);

            clearTimeout(timerRef[index]);
            var slideTo = currentSlideIndex[index] + 1;
            if(slideTo > slideFrames[index].length - 1){
                slideTo = slideFrames[index].length - 1;
            }
            
            moveSliderTo(slideTo,index);
            tick(index);
        });
    }

    // -----------------------------------------------------------------------------
    //Touch events

    var touchStart;
    var newTouch;
    var slideImg = document.getElementsByClassName('slideImg');
    var arrPosition = document.getElementsByClassName('arrowsPosition');
    if(window.getComputedStyle(arrPosition[0]).display === "none"){
        timerRef.map((val)=>{clearTimeout(val)})
        for(var i = 0; i < slideImg.length; i++){
            slideImg[i].addEventListener('touchstart',function(e){
                touchStart = e.touches[0].clientX;
            });

            slideImg[i].addEventListener('touchmove',function(e){
                newTouch = e.touches[0].clientX;
            });
            slideImg[i].addEventListener('touchend',function(e){
                var nextImg = touchStart > newTouch? 1:-1;
                var ind = this.parentNode.parentNode.parentNode.getElementsByClassName('dotsPosition')[0].getElementsByClassName('dot')[0].dataset.trailIndex;
                var slideTo = currentSlideIndex[ind] + nextImg;

                if(slideTo > slideFrames[ind].length - 1){
                    slideTo = slideFrames[ind].length -1;
                }else if(slideTo < 0){
                    slideTo = 0;
                }
                moveSliderTo(slideTo,ind);
                touchStart = 0;
                newTouch = 0;
            });
        }

    }
}