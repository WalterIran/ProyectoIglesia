document.addEventListener("DOMContentLoaded", function() {


    var forward = document.getElementById('forward');
    var playpause = document.getElementById('play-pause');
    var back = document.getElementById('back');



    var santiguarse = document.getElementById('tx-persinarse');
    var credo = document.getElementById('tx-credo');
    var padre = document.getElementById('tx-padre');
    var avemaria = document.getElementById('tx-avemaria');
    var gloria = document.getElementById('tx-gloria');

    var color_mistery = getComputedStyle(document.documentElement).getPropertyValue("--mistery_color");
    var color_hailmary = getComputedStyle(document.documentElement).getPropertyValue("--hailmary_color");

    var g_misterios = document.getElementsByClassName("Grupo-Misterios")[0];
    var m_gloria = document.getElementsByClassName("M-Gloria")[0];
    var img_gloria = document.getElementsByClassName("img_Gloria")[0];

    var visibilidadMisterio = document.getElementById('Segundo_M');
    var estado = getComputedStyle(visibilidadMisterio).visibility;




    var imagesToLoad = document.querySelectorAll("[data-srcset], [data-src]");
    var image;
    var virtudesID = document.querySelectorAll("[data-virtudes]");
    var cuentasID = document.querySelectorAll("[data-set]");
    var numeromisterio = 0;
    var positionAV = 0;
    var positionVirtudes = 0;
    var conteogeneral = 0;

    var goingback = 1;
    var automatico = 0;
    var time = 1000;






    for (var i = 0; i < g_misterios.children.length; i++) {


        for (var j = 0; j < g_misterios.children[i].childElementCount; j++) {


            g_misterios.children[i].children[j].style.opacity = 0;
        }
    }



    playpause.addEventListener("click", function(e) {

        automatico = 1;
        auto();

    });

    forward.addEventListener('click', function(e) {

        if (goingback == 1) {
            conteogeneral = conteogeneral - numeromisterio;
        }

        goingback = 0;

        SumarPosicion();

    });

    back.addEventListener('click', function(e) {
        if (goingback == 0) {
            conteogeneral = conteogeneral + numeromisterio;
        }

        goingback = 1;
        RestarPosicion();

    });


    function SumarPosicion() {

        if (conteogeneral < 0) {
            conteogeneral = 0;
        }
        conteogeneral += 1;
        //Inicio
        console.log(positionVirtudes);
        if (conteogeneral < 2) {
            santiguarse.style.opacity = 1;
        } else if (conteogeneral < 3) {

            santiguarse.style.opacity = 0;
            credo.style.opacity = 1;
            padre.style.opacity = 0;


        } else if (conteogeneral < 7) {
            image = imagesToLoad[0];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';

            credo.style.opacity = 0;
            Virtudes();
            positionVirtudes += 1;
        } else if (conteogeneral < 8) {
            avemaria.style.opacity = 0;
            gloria.style.opacity = 1;
        }
        //1er Misterio
        else if (conteogeneral < 9) {

            gloria.style.opacity = 0;
            m_gloria.childNodes[1].style.opacity = 1;
            image = imagesToLoad[1];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';
            numeromisterio += 1;


        } else if (conteogeneral < 20) {
            m_gloria.childNodes[1].style.opacity = 0;
            Misterios();
            positionAV += 1;
        } else if (conteogeneral < 21) {
            Gloria();
            if (estado == 'hidden')
                resetCuentas();
        }

        //2do Misterio
        else if (conteogeneral < 22) {
            m_gloria.childNodes[3].style.opacity = 1;
            image = imagesToLoad[2];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';
            numeromisterio += 1;


            gloria.style.opacity = 0;
        } else if (conteogeneral < 33) {
            m_gloria.childNodes[3].style.opacity = 0;
            Misterios();
            positionAV += 1;
        } else if (conteogeneral < 34) {
            Gloria();
            if (estado == 'hidden')
                resetCuentas();
        }

        //3er Misterio
        else if (conteogeneral < 35) {
            m_gloria.childNodes[5].style.opacity = 1;
            gloria.style.opacity = 0;
            image = imagesToLoad[3];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';
            numeromisterio += 1;

        } else if (conteogeneral < 46) {
            m_gloria.childNodes[5].style.opacity = 0;
            Misterios();
            positionAV += 1;
        } else if (conteogeneral < 47) {
            Gloria();
            if (estado == 'hidden')
                resetCuentas();
        }

        //4to Misterio
        else if (conteogeneral < 48) {
            m_gloria.childNodes[7].style.opacity = 1;
            gloria.style.opacity = 0;
            image = imagesToLoad[4];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';
            numeromisterio += 1;
        } else if (conteogeneral < 59) {
            m_gloria.childNodes[7].style.opacity = 0;
            Misterios();
            positionAV += 1;
        } else if (conteogeneral < 60) {
            Gloria();
            if (estado == 'hidden')
                resetCuentas();
        }

        //5to Misterio
        else if (conteogeneral < 61) {
            m_gloria.childNodes[9].style.opacity = 1;
            gloria.style.opacity = 0;
            image = imagesToLoad[5];
            image.src = image.dataset.src;
            image.style.visibility = 'visible';
            numeromisterio += 1;
        } else if (conteogeneral < 72) {
            m_gloria.childNodes[9].style.opacity = 0;
            Misterios();
            positionAV += 1;

        } else if (conteogeneral < 73) {
            Gloria();
            if (estado == 'hidden')
                resetCuentas();

        } else if (conteogeneral < 74) {
            gloria.style.opacity = 0;
            santiguarse.style.opacity = 1;
        } else {
            conteogeneral = 79;
            santiguarse.style.opacity = 0;
            for (var i = 0; i < 6; i++) {
                image = img_gloria.children[i];
                image.style.visibility = 'hidden';
            }


        }


    } //Fin de Funcion Sumar


    function RestarPosicionv2() {

        conteogeneral -= 1;

        //Inicio
        if (conteogeneral >= 74) {
            santiguarse.style.opacity = 1;

        } else if (conteogeneral >= 73) {
            santiguarse.style.opacity = 0;
            gloria.style.opacity = 1;

            //5to
        } else if (conteogeneral >= 72) {

            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            unresetCuentas();

        } else if (conteogeneral >= 61) {
            positionAV -= 1;
            Misterios();

        } else if (conteogeneral >= 60) {
            padre.style.opacity = 0;
            m_gloria.childNodes[9].style.opacity = 1;

        }


        //4to
        else if (conteogeneral >= 59) {
            m_gloria.childNodes[9].style.opacity = 0;
            gloria.style.opacity = 1;
        } else if (conteogeneral >= 58) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            unresetCuentas();
        } else if (conteogeneral >= 47) {
            positionAV -= 1;
            Misterios();

        } else if (conteogeneral >= 46) {
            padre.style.opacity = 0;
            m_gloria.childNodes[7].style.opacity = 1;

        }

        //3er
        else if (conteogeneral >= 45) {
            m_gloria.childNodes[7].style.opacity = 0;
            gloria.style.opacity = 1;
        } else if (conteogeneral >= 44) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            unresetCuentas();
        } else if (conteogeneral >= 33) {
            positionAV -= 1;
            Misterios();

        } else if (conteogeneral >= 32) {
            padre.style.opacity = 0;
            m_gloria.childNodes[5].style.opacity = 1;

        }

        //2do
        else if (conteogeneral >= 31) {
            m_gloria.childNodes[5].style.opacity = 0;
            gloria.style.opacity = 1;
        } else if (conteogeneral >= 30) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            unresetCuentas();
        } else if (conteogeneral >= 19) {
            positionAV -= 1;
            Misterios();

        } else if (conteogeneral >= 18) {
            padre.style.opacity = 0;
            m_gloria.childNodes[3].style.opacity = 1;

        }

        //1er
        else if (conteogeneral >= 17) {
            m_gloria.childNodes[3].style.opacity = 0;
            gloria.style.opacity = 1;
        } else if (conteogeneral >= 16) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            unresetCuentas();
        } else if (conteogeneral >= 5) {
            positionAV -= 1;
            Misterios();

        } else if (conteogeneral >= 4) {
            padre.style.opacity = 0;
            m_gloria.childNodes[1].style.opacity = 1;

        }

        //Virtudes
        else if (conteogeneral >= 3) {
            m_gloria.childNodes[1].style.opacity = 0;
            gloria.style.opacity = 1;
            positionVirtudes = 4;
        } else if (conteogeneral >= 0) {

            gloria.style.opacity = 0;
            positionVirtudes -= 1;
            Virtudes();

        } else if (conteogeneral >= -1) {
            avemaria.style.opacity = 0;
            padre.style.opacity = 1;
        } else if (conteogeneral >= -2) {
            padre.style.opacity = 0;
            santiguarse.style.opacity = 1;
        } else {
            conteogeneral = -2;

        }


    }

    function RestarPosicion() {
        conteogeneral -= 1;
        console.log(positionVirtudes);


        //Inicio
        if (conteogeneral <= -1) {
            conteogeneral = -1;
            santiguarse.style.opacity = 0;
            credo.style.opacity = 0;
        } else if (conteogeneral <= 0) {

            santiguarse.style.opacity = 1;
            credo.style.opacity = 0;
        } else if (conteogeneral <= 1) {

            credo.style.opacity = 1;
            padre.style.opacity = 0;
            image = img_gloria.children[0];
            image.style.visibility = 'hidden';

            avemaria.style.opacity = 0;
            positionVirtudes = 0;

        } else if (conteogeneral <= 5) {


            gloria.style.opacity = 0;
            positionVirtudes -= 1;
            Virtudes();


        }

        //1er Misterio
        else if (conteogeneral <= 6) {

            gloria.style.opacity = 1;
            m_gloria.childNodes[1].style.opacity = 0;
            image = img_gloria.children[1];
            image.style.visibility = 'hidden';
            numeromisterio -= 1;


        } else if (conteogeneral <= 7) {
            m_gloria.childNodes[1].style.opacity = 1;
            padre.style.opacity = 0;



        } else if (conteogeneral <= 18) {

            positionAV -= 1;
            Misterios();

        } else if (conteogeneral <= 19) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            if (estado == 'hidden')
                unresetCuentas();
        }

        //2do Misterio
        else if (conteogeneral <= 21) {

            gloria.style.opacity = 1;
            m_gloria.childNodes[3].style.opacity = 0;
            image = img_gloria.children[2];
            image.style.visibility = 'hidden';


        } else if (conteogeneral <= 22) {
            m_gloria.childNodes[3].style.opacity = 1;
            padre.style.opacity = 0;
            numeromisterio -= 1;

            avemaria.style.opacity = 0; //Hay que corregir esta transicion
        } else if (conteogeneral <= 33) {

            positionAV -= 1;

            Misterios();

        } else if (conteogeneral <= 34) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            if (estado == 'hidden')
                unresetCuentas();
        }

        //3er Misterio
        else if (conteogeneral <= 35) {

            gloria.style.opacity = 1;
            m_gloria.childNodes[5].style.opacity = 0;
            image = img_gloria.children[3];
            image.style.visibility = 'hidden';
            numeromisterio -= 1;

        } else if (conteogeneral <= 36) {
            m_gloria.childNodes[5].style.opacity = 1;
            padre.style.opacity = 0;
            avemaria.style.opacity = 0;

        } else if (conteogeneral <= 47) {

            positionAV -= 1;

            Misterios();

        } else if (conteogeneral <= 48) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            if (estado == 'hidden')
                unresetCuentas();
        }
        //4to Misterio
        else if (conteogeneral <= 49) {

            gloria.style.opacity = 1;
            m_gloria.childNodes[7].style.opacity = 0;
            image = img_gloria.children[4];
            image.style.visibility = 'hidden';
            numeromisterio -= 1;

        } else if (conteogeneral <= 50) {
            m_gloria.childNodes[7].style.opacity = 1;

            padre.style.opacity = 0;
            avemaria.style.opacity = 0;
        } else if (conteogeneral <= 61) {

            positionAV -= 1;

            Misterios();

        } else if (conteogeneral <= 62) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            if (estado == 'hidden')
                unresetCuentas();
        }

        //5to Misterio
        else if (conteogeneral <= 63) {

            gloria.style.opacity = 1;
            m_gloria.childNodes[9].style.opacity = 0;
            image = img_gloria.children[5];
            image.style.visibility = 'hidden';
            numeromisterio -= 1;

        } else if (conteogeneral <= 64) {
            m_gloria.childNodes[9].style.opacity = 1;

            padre.style.opacity = 0;
            avemaria.style.opacity = 0;
        } else if (conteogeneral <= 75) {

            positionAV -= 1;

            Misterios();

        } else if (conteogeneral <= 76) {
            gloria.style.opacity = 0;
            avemaria.style.opacity = 1;
            if (estado == 'hidden')
                unresetCuentas();
        } else if (conteogeneral <= 77) {
            gloria.style.opacity = 1;
            santiguarse.style.opacity = 0;

        } else if (conteogeneral <= 78) {
            santiguarse.style.opacity = 1;
            for (var i = 0; i < 6; i++) {
                image = img_gloria.children[i];
                image.style.visibility = 'visible';
            }
        }


    } //Fin de Funcion Restar



    function Virtudes() {
        var virtud = virtudesID[positionVirtudes];


        if (goingback == 1) {
            if (positionVirtudes == 0)
                virtud.style.backgroundColor = color_mistery;
            else {
                virtud.style.backgroundColor = color_hailmary;
            }
        } else {
            virtud.style.backgroundColor = "#eee";
        }



        if (positionVirtudes < 1) {
            padre.style.opacity = 1;
            avemaria.style.opacity = 0;
        } else if (positionVirtudes < 4) {
            padre.style.opacity = 0;
            avemaria.style.opacity = 1;
        } else {}


    }

    function Misterios() {
        var cuenta;
        var posMisterio;
        var posAvemaria;

        if (positionAV < 0)
            positionAV = 0;


        if (estado == 'hidden') {
            cuenta = cuentasID[positionAV];
            posMisterio = 1;
            posAvemaria = 11;
        } else {


            cuenta = cuentasID[positionAV];
            posMisterio = 11 * numeromisterio - 10;
            posAvemaria = posMisterio + 10;
        }

        if (goingback == 1) {
            if (positionAV == (posMisterio - 1)) {
                cuenta.style.backgroundColor = color_mistery;
            } else {
                cuenta.style.backgroundColor = color_hailmary;
            }
        } else {
            cuenta.style.backgroundColor = "#eee";
        }



        if (positionAV < posMisterio) {
            padre.style.opacity = 1;
            avemaria.style.opacity = 0;
        } else if (positionAV < posAvemaria) {
            padre.style.opacity = 0;
            avemaria.style.opacity = 1;
        } else {
            //Espacio Vacio
        }



    }



    function Gloria() {
        avemaria.style.opacity = 0;
        gloria.style.opacity = 1;
    }


    function resetCuentas() {
        var cuenta;


        cuenta = cuentasID[0];
        cuenta.style.backgroundColor = color_mistery;
        for (var i = 1; i < cuentasID.length; i++) {
            cuenta = cuentasID[i];

            cuenta.style.backgroundColor = color_hailmary;
        }
        positionAV = 0;


    }

    function unresetCuentas() {
        var cuenta;

        for (var i = 0; i < cuentasID.length; i++) {
            cuenta = cuentasID[i];

            cuenta.style.backgroundColor = '#eee';
        }
        positionAV = 11;
    }

});