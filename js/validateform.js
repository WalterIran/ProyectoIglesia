document.addEventListener("DOMContentLoaded", function() {

    var today = new Date();
    var maxToday = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var MAXmm = today.getMonth() + 3;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
        MAXmm = '0' + MAXmm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    maxToday = yyyy + '-' + MAXmm + '-' + dd;
    var date = document.getElementById("date");
    date.setAttribute("value", today);
    date.setAttribute("min", today);
    date.setAttribute("max", MAXmm);
    var time = document.getElementById("time");
    time.setAttribute("value", "08:00");

    var emptyTextRegex = /^\s*$/;
    var idRegex = /^^[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{5}$/;
    var nameRegex = /^[a-zA-Z ]*$/;
    var phoneRegex = /^^[-\s]?\d{4}[-\s]?\d{4}$/;

    var formLogin = document.getElementById("form");
    var txtId = document.getElementById("txtIdentidad");
    var txtIdError = document.getElementById("txtIdError");
    var txtName = document.getElementById("txtName");
    var txtNameError = document.getElementById("txtNameError");
    var txtPhone = document.getElementById("txtPhone");
    var txtPhoneError = document.getElementById("txtPhoneError");
    var dateError = document.getElementById("dateError");
    var timeError = document.getElementById("timeError");
    var btnSend = document.getElementById("btnSend");
    var txtIdHasErrors = true;
    var txtNameHasErrors = true;
    var txtPhoneHasErrors = true;
    var dateHasErrors = true;
    var timeHasErrors = true;

    txtId.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!idRegex.test(value)) {
            txtId.classList.add("error");
            txtIdError.classList.remove("hiddenk");
            txtIdError.innerHTML = "Debe ingresar una identidad válida.";
            txtIdHasErrors = true;
        } else {
            txtId.classList.remove("error");
            txtIdError.classList.add("hiddenk");
            txtIdError.innerHTML = "";
            txtIdHasErrors = false;
        }
        enableBtn();
    });

    txtName.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!nameRegex.test(value) || emptyTextRegex.test(value)) {
            txtName.classList.add("error");
            txtNameError.classList.remove("hiddenk");
            txtNameError.innerHTML = "Ingresar nombre completo .";
            txtNameHasErrors = true;
        } else {
            txtName.classList.remove("error");
            txtNameError.classList.add("hiddenk");
            txtNameError.innerHTML = "";
            txtNameHasErrors = false;
        }
        enableBtn();
    });

    txtPhone.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (!phoneRegex.test(value)) {
            txtPhone.classList.add("error");
            txtPhoneError.classList.remove("hiddenk");
            txtPhoneError.innerHTML = "Debe ingresar un número de teléno válido.";
            txtPhoneHasErrors = true;
        } else {
            txtPhone.classList.remove("error");
            txtPhoneError.classList.add("hiddenk");
            txtPhoneError.innerHTML = "";
            txtPhoneHasErrors = false;
        }
        enableBtn();
    });

    time.addEventListener("blur", function(e) {
        var value = e.target.value;
        if (('08:00' > value) && (value < '17:00')) {
            time.classList.add("error");
            timeError.classList.remove("hiddenk");
            timeError.innerHTML = "Escoger un horario entre 8:00am y 5:00pm.";
            timeHasErrors = true;
        } else {
            time.classList.remove("error");
            timeError.classList.add("hiddenk");
            timeError.innerHTML = "";
            timeHasErrors = false;
        }
        enableBtn();
    });

    function enableBtn() {
        if (txtPhoneHasErrors || txtIdHasErrors || txtNameHasErrors || timeHasErrors) {
            btnSend.setAttribute("disabled", "true");
        } else {
            btnSend.removeAttribute("disabled");
        }
    }
});