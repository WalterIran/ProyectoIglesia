
document.addEventListener("DOMContentLoaded",()=>{
    const toggle = document.getElementById('header-toggle');
    const nav = document.getElementById('nav-menu');
    const dropdown = document.getElementsByClassName('dropdown');
    const dropdownMenu = document.getElementsByClassName('dropdown-menu');
    const dropdownLinkIcon = document.querySelectorAll('.dropdown-icon');

    toggle.addEventListener('click',(e)=>{
        nav.classList.toggle('show');
        toggle.classList.toggle('fa-times');
        toggle.classList.toggle('rotateDer');
        toggle.classList.toggle('rotateIz');
    });

    for(let i = 0; i < dropdown.length; i++){
        dropdown[i].addEventListener('click',(e)=>{
            dropdownMenu[i].classList.toggle('hidden');

            if(dropdownMenu[i].classList.contains('hidden')){
                dropdownLinkIcon[i].style.transform = 'rotate(0deg)';
            }else{
                dropdownLinkIcon[i].style.transform = 'rotate(180deg)';
            }
        });
    }
});

const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
    navLink.forEach(n=>n.classList.remove('active'));
    this.classList.add('active');
}

navLink.forEach(n=> n.addEventListener('click',linkAction));



