document.addEventListener("DOMContentLoaded", function() {
    var facebook = document.getElementById("facebook");
    //var btnEnviar = document.getElementById("btnEnviar");

    function abrirVentana(url) {
        var tab = window.open(url, '_blank');
        tab.focus();
    }

    facebook.addEventListener("click", function(e) {
        abrirVentana('https://www.facebook.com/IglesiaCorazondeMaria');
    })

    //Ingreso de datos
    var emptyRegex = /^\s*$/;
    var nameRegex = /^[A-Z a-zÁÉÍÓÚÑñáéíóú]{2,}$/; //2 en adelante
    var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var txtName = document.getElementById("txtName");
    var txtEmail = document.getElementById("txtEmail");
    var txtMsg = document.getElementById("txtMsg");
    var txtNameError = document.getElementById("txtNameError");
    var txtEmailError = document.getElementById("txtEmailError");
    var txtMsgError = document.getElementById("txtMsgError");
    var emailError = true;
    var msgError = true;
    var nameError = true;
    var btnEnviar = document.getElementById("btnEnviar");

    txtEmail.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!emailRegex.test(value)) {
            txtEmail.classList.add("error");
            txtEmailError.classList.remove("hiddenk");
            txtEmailError.innerHTML = "Debe ingresar un correo electrónico válido"
            emailError = true;
        } else {
            txtEmail.classList.remove("error");
            txtEmailError.classList.add("hiddenk");
            txtEmailError.innerHTML = ""
            emailError = false;
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

    txtMsg.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (emptyRegex.test(value)) {
            txtMsg.classList.add("error");
            txtMsgError.classList.remove("hiddenk");
            txtMsgError.innerHTML = "Por favor, verifique los datos ingresados."
            msgError = true;
        } else {
            txtMsg.classList.remove("error");
            txtMsgError.classList.add("hiddenk");
            txtMsgError.innerHTML = ""
            msgError = false;
        }
        enableButton();
    });

    function enableButton() {
        if (!emailError && !nameError && !msgError) {
            btnEnviar.classList.remove("hiddenk");
        }
    }

    /*Kenia hasta aqui*/
});