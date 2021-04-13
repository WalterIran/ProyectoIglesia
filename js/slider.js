document.addEventListener("DOMContentLoaded", function() {

    var slider = document.getElementsByClassName("slider")[0];
    var slideTrail = document.getElementsByClassName("sliderTrail")[0];
    var slideFrames = document.getElementsByClassName("sliderFrame");
    var imagesToLoad = document.querySelectorAll("[data-srcset], [data-src]");
    var currenSlideIndex = 0;
    var timeRef = null;
    var direction = 1;
    var nextSlide = 0;

    //tarea
    var arrowLeft = document.getElementById("arrowLeft");
    var arrowRight = document.getElementById("arrowRight");
    var circle = document.getElementsByClassName("circle");
    var divPoint;
    var currentBody = document.getElementsByClassName("circles")[0];



    for (var h = 0; h < slideFrames.length; h++) {
        var divPoint = document.createElement("div");
        divPoint.className = "circle";
        divPoint.dataset.index = h;
        divPoint.innerHTML = "&nbsp"
        currentBody.appendChild(divPoint);
    }
    //fin tarea


    //Lazy Loading de la imagenes
    //data-variable html permite agregar atributos custom
    //acceder por medio de un objero dataset
    var loading = 0;
    for (var i = 0; i < imagesToLoad.length; i++) {
        var currentImage = imagesToLoad[i];
        var isSrc = false;


        if ('srcset' in currentImage.dataset) {
            currentImage.srcset = currentImage.dataset.srcset;
        }
        if ('src' in currentImage.dataset) {
            currentImage.addEventListener('load', function(e) {
                loading -= 1;

                if (loading == 0) {
                    //iniciar animacion slider
                    circle[0].className = (0 == currenSlideIndex) ? "circle selected" : "circle";

                    initSlider();
                }
            });
            loading += 1;
            currentImage.srcset = currentImage.dataset.src;
        }
    }

    function initSlider() {
        slideTrail.style.width = (slideFrames.length * 100) + "vw";
        tick();
    }

    //console.log(slideFrames.length);
    //console.log(imagesToLoad);
    function tick() {
        timeRef = setTimeout(
            function() {
                if (direction == 1 && currenSlideIndex == (slideFrames.length - 1)) {
                    direction = -1;
                }
                if (direction == -1 && currenSlideIndex == 0) {
                    direction = 1;
                }
                nextSlide = currenSlideIndex + direction;
                //mover slide
                moveSliderTo(nextSlide);
                tick();
            },
            5000
        );
    }

    function moveSliderTo(slideTo) {
        slideTrail.style.left = (slideTo * -100) + "vw";
        currenSlideIndex = slideTo;
        for (var h = 0; h < circle.length; h++) {
            circle[h].className = (h == currenSlideIndex) ? "circle selected" : "circle";
        }
    }

    arrowRight.addEventListener("click", function(e) {
        direction = -1;
        clearTimeout(timeRef);
        nextSlideMove();
    });
    arrowLeft.addEventListener("click", function(e) {
        direction = 1;
        clearTimeout(timeRef);
        nextSlideMove();
    });

    function nextSlideMove() {
        currenSlideIndex += direction;
        if (currenSlideIndex > circle.length - 1) {
            currenSlideIndex = 0;
        }
        if (currenSlideIndex < 0) {
            currenSlideIndex = circle.length - 1;
        }
        nextSlide = currenSlideIndex;
        moveSliderTo(nextSlide);
        tick();
    }

    for (var j = 0; j < circle.length; j++) {
        circle[j].addEventListener('click', function(e) {
            currenSlideIndex = parseInt(e.target.getAttribute("data-index"));
            console.log(currenSlideIndex);
            clearTimeout(timeRef);
            moveSliderTo(currenSlideIndex);
            tick();
        });
    }
});