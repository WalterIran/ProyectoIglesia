document.addEventListener("DOMContentLoaded", function() {
    var carouselTrack = document.getElementsByClassName("carousel-track")[0];
    var carouselSlide = document.getElementsByClassName("carousel-slide");
    var slidesToLoad = document.querySelectorAll("[data-srcset], [data-src]");
    var currentSlideIndex = 0;
    var timerRef = null;
    var direction = 1;
    var loading = 0;

    for (var i = 0; i < slidesToLoad.length; i++) {
        var currentImage = slidesToLoad[i];
        console.log(currentImage.dataset);
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
        carouselTrack.style.width = (carouselSlide.length * 100) + "vw";
        tick();
    }

    function tick() {
        timerRef = setTimeout(
            function() {
                if (direction == 1 && currentSlideIndex == (carouselSlide.length - 1)) {
                    direction = -1;
                }
                if (direction == -1 && currentSlideIndex == 0) {
                    direction = 1;
                }
                var nextSlide = currentSlideIndex + direction;
                moveSliderTo(nextSlide);
                tick();
            },
            3000
        );
    }

    function moveSliderTo(slideTo) {
        carouselTrack.style.left = (slideTo * -100) + "vw";
        currentSlideIndex = slideTo;
    }

    //Arrows
    var prevArrow = document.getElementsByClassName("prev")[0];
    prevArrow.addEventListener("click", function(e) {
        clearTimeout(timerRef);
        var slideTo = currentSlideIndex == 0 ? currentSlideIndex : --currentSlideIndex;
        moveSliderTo(slideTo);
        tick();
    });

    var nextArrow = document.getElementsByClassName("next")[0];
    nextArrow.addEventListener("click", function(e) {
        clearTimeout(timerRef);
        var slideTo = currentSlideIndex == carouselSlide.length - 1 ? currentSlideIndex : ++currentSlideIndex;
        moveSliderTo(slideTo);
        tick();
    });

    //dots
    var divPointer = document.getElementsByClassName("dotsPosition")[0];
    for (var i = 0; i < carouselSlide.length; i++) {
        var divPoint = document.createElement("DIV");
        divPoint.className = "dot";
        divPoint.dataset.slideIndex = i;

        divPointer.appendChild(divPoint);
    }

    var divPoints = document.getElementsByClassName("dot");
    for (var j = 0; j < divPoints.length; j++) {
        divPoints[j].addEventListener("click", function(e) {
            clearTimeout(timerRef);
            moveSliderTo(Number(this.dataset.slideIndex));
            tick();
        });
    }

    //Date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    var date = document.getElementById("datefield");
    date.setAttribute("value", today);
    date.setAttribute("min", today);
    date.setAttribute("max", "2021-06-30");

    //Ingreso de datos
    var nameRegex = /^[A-Z a-zÁÉÍÓÚÑñáéíóú]{2,}$/; //2 en adelante
    var idRegex = /^[0-9]{13}$/; //longitud 13
    var telRegex = /^[0-9]{8}$/; //longitud 8
    var txtName = document.getElementById("txtName");
    var txtId = document.getElementById("txtId");
    var txtTel = document.getElementById("txtTel");
    var txtNameError = document.getElementById("txtNameError");
    var txtIdError = document.getElementById("txtIdError");
    var txtTelError = document.getElementById("txtTelError");
    var idError = true;
    var telError = true;
    var nameError = true;
    var btnVisita = document.getElementById("btnRegistrar");

    txtId.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!idRegex.test(value)) {
            txtIdError.classList.add("error");
            txtIdError.classList.remove("hiddenk");
            txtIdError.innerHTML = "Por favor, verifique los datos ingresados."
            idError = true;
        } else {
            txtId.classList.remove("error");
            txtIdError.classList.add("hiddenk");
            txtIdError.innerHTML = ""
            idError = false;
        }
        enableButton();
    });

    txtName.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!nameRegex.test(value)) {
            txtName.classList.add("error");
            txtNameError.classList.remove("hiddenk");
            txtNameError.innerHTML = "Por favor, verifique los datos ingresados."
            nameError = true;
        } else {
            txtName.classList.remove("error");
            txtNameError.classList.add("hiddenk");
            txtNameError.innerHTML = ""
            nameError = false;
        }
        enableButton();
    });

    txtTel.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!telRegex.test(value)) {
            txtTel.classList.add("error");
            txtTelError.classList.remove("hiddenk");
            txtTelError.innerHTML = "Por favor, verifique los datos ingresados."
            telError = true;
        } else {
            txtTel.classList.remove("error");
            txtTelError.classList.add("hiddenk");
            txtTelError.innerHTML = ""
            telError = false;
        }
        enableButton();
    });

    function enableButton() {
        if (!idError && !nameError && !telError) {
            btnVisita.classList.remove("hiddenk");
        }
    }
});