document.addEventListener("DOMContentLoaded", function() {


    var slideTrail = document.getElementsByClassName("otros-sacerdotes")[0];
    var slideFrames = document.getElementsByClassName("card-priest");
    var imagesToLoad = document.querySelectorAll("[data-srcset], [data-src]");
    var currentSlideIndex = 0;
    var direction = 1;
    var timerRef = null;



    var loading = 0;
    for (var i = 0; i < imagesToLoad.length; i++) {
        var currentImage = imagesToLoad[i];



        if ('srcset' in currentImage.dataset) {
            currentImage.srcset = currentImage.dataset.srcset;
        }

        if ('src' in currentImage.dataset) {

            currentImage.addEventListener('load', function(e) {
                loading -= 1;


                if (loading == 0) {
                    initSlider();
                }
            });
            loading += 1;
            currentImage.src = currentImage.dataset.src;
        }
    }

    function initSlider() {

        slideTrail.style.width = (slideFrames.length * 100) + "vw";

        tick();

    }

    function tick() {

        timerRef = setTimeout(
            function() {

                if (direction == 1 && currentSlideIndex == (slideFrames.length - 1)) {
                    direction = -1;
                }

                if (direction == -1 && currentSlideIndex == 0) {
                    direction = 1;
                }

                var nextSlide = currentSlideIndex + direction;
                //Mover Slide
                moveSliderTo(nextSlide);
                tick();
            },
            5000 //tiempo
        );
    }

    function moveSliderTo(slideTo) {
        slideTrail.style.left = (slideTo * -100) + "vw";
        currentSlideIndex = slideTo;
    }


    var left = document.getElementById("previous");
    var right = document.getElementById("next");

    left.addEventListener("click", function(e) {
        clearTimeout(timerRef);
        if (currentSlideIndex == 0) {
            moveSliderTo(currentSlideIndex);
        } else {
            moveSliderTo(--currentSlideIndex);
        }
        tick();
    });

    right.addEventListener("click", function(e) {
        clearTimeout(timerRef);
        if (currentSlideIndex == (slideFrames.length - 1)) {
            moveSliderTo(currentSlideIndex);
        } else {
            moveSliderTo(++currentSlideIndex);
        }
        tick();
    });

});