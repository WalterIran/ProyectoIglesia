class Navbar extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <header id="header" class="header">
            <div class="nav-img">
            <a href="index.html"><img src="img/LogoSinFondo.png" alt=""></a>
            </div>
            <div class="header-toggle">
                <i class="fas fa-bars rotateIz" id="header-toggle"></i>
            </div>
            <nav class="nav" id="nav-menu">
                <div class="nav-content bd-grid">
                    <a href="index.html" class="nav-perfil">
                        <div class="nav-img">
                            <img src="img/LogoSinFondo.png" alt="">
                        </div>
                        <div>
                            <span class="nav-name">
                                Iglesia Católica
                            </span>
                            <span class="nav-name">
                                Corazón de María
                            </span>
                        </div>
                    </a>
                    <div class="nav-menu">
                        <ul class="nav-list">
                            <li class="nav-item"><a href="index.html" class="nav-link"><i class="fas fa-church"></i><span>Inicio</span></a></li>
                            <li class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-link"><i class="fas fa-bible"></i><span>Nosotros</span> <i class="fas fa-chevron-down dropdown-icon"></i></a>
                                <ul class="dropdown-menu hidden">
                                    <li class="dropdown-item"><a href="quienes_somos.html" class="nav-link"><i class="fas fa-chevron-right"></i> ¿Quienes Somos?</a></li>
                                    <li class="dropdown-item"><a href="Historia.html" class="nav-link"><i class="fas fa-chevron-right"></i> Historia</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-link"><i class="fas fa-photo-video"></i><span>Multimedia</span> <i class="fas fa-chevron-down dropdown-icon"></i></a>
                                <ul class="dropdown-menu hidden">
                                    <li class="dropdown-item"><a href="grids.html" class="nav-link"><i class="fas fa-chevron-right"></i> Galería</a></li>
                                    <li class="dropdown-item"><a href="comunicados.html" class="nav-link"><i class="fas fa-chevron-right"></i>Comunicados</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-link"><i class="fas fa-calendar-day"></i><span>Eventos</span> <i class="fas fa-chevron-down dropdown-icon"></i></a>
                                <ul class="dropdown-menu hidden">
                                    <li class="dropdown-item"><a href="actividades.html" class="nav-link"><i class="fas fa-chevron-right"></i> Actividades</a></li>
                                    <li class="dropdown-item"><a href="horario.html" class="nav-link"><i class="fas fa-chevron-right"></i> Horarios de Misa</a></li>
                                    <li class="dropdown-item"><a href="formaciones.html" class="nav-link"><i class="fas fa-chevron-right"></i> Formaciones</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a href="Oracion.html" class="nav-link"><i class="fas fa-pray"></i><span>Oraciones</span></a></li>
                            <li class="nav-item"><a href="contacto.html" class="nav-link"><i class="fas fa-hand-holding-heart"></i><span>Contacto</span></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="hide"></div>
        </header>
        `
    } 
}

customElements.define('app-navbar',Navbar);

let path = window.location.pathname;
let page = path.split('/').pop();


document.addEventListener("DOMContentLoaded",()=>{

    document.getElementsByTagName('body')[0].innerHTML += 
    `<footer>
        <div class="ubicacion">
            <h3>Visitanos</h3>
            <p>Residencial Francisco Morazán, Ave. Paladín en la cuesta pasando la Calle 03 de Octubre a mano derecha. <a href="https://goo.gl/maps/auCrPK59DisrBznH8">Click aquí para abrir en Google Maps</a></p>
        </div>
        <div class="contacto">
            <h3>Contacto</h3>
            <p>Visita nuestra página de contacto al hacer <a href="contacto.html">click aquí</a>.</p>
        </div>
    </footer>`;

    const toggle = document.getElementById('header-toggle');
    const nav = document.getElementById('nav-menu');
    const hide = document.getElementById('hide');
    const dropdown = document.getElementsByClassName('dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');
    const dropdownLinkIcon = document.querySelectorAll('.dropdown-icon');

    toggle.addEventListener('click',(e)=>{
        nav.classList.toggle('show');
        hide.classList.toggle('hideAll');
        toggle.classList.toggle('fa-times');
        toggle.classList.toggle('rotateDer');
        toggle.classList.toggle('rotateIz');
        hideBlur(hide);
    });

    hide.addEventListener('click',(e)=>{
        nav.classList.toggle('show');
        hide.classList.toggle('hideAll');
        toggle.classList.toggle('fa-times');
        toggle.classList.toggle('rotateDer');
        toggle.classList.toggle('rotateIz');
        hideBlur(hide);
    })

    for(let i = 0; i < dropdown.length; i++){
        dropdown[i].addEventListener('click',(e)=>{
            dropdownMenu[i].classList.toggle('hidden');

            if(dropdownMenu[i].classList.contains('hidden')){
                dropdownLinkIcon[i].style.transform = 'rotate(0deg)';
                dropdownMenu[i].style.animation = 'ocultarSubMenu .2s linear';
            }else{
                dropdownLinkIcon[i].style.transform = 'rotate(180deg)';
                dropdownMenu[i].style.animation = 'mostrarSubMenu 0.3s ease-out';
            }
        });
    }

    const navLink = document.querySelectorAll('.nav-item > .nav-link:first-child');
    const tipo = document.getElementById('tipo');
    let j = 0;
    j = getActualLink(tipo.className.toString(),navLink);
    
    navLink[j].classList.add('active');

});

function getActualLink(cName, navLink){
    let j;
    
    for(var i = 0; i < navLink.length; i++){

        let content = navLink[i].innerText.toLowerCase().valueOf();
        let name = cName.valueOf();
        
        if(content === name){
            j = i;
            break;
        }
    }
    return j;
}

function hideBlur(hide){
    hide.style.display = hide.classList.contains('hideAll')?'block':'none';
}
