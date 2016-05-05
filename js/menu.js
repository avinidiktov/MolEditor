/**
  Side menu
*/
var menuWrapper = document.getElementsByClassName('ms-menu-body-wrapper')[0];
//menuWrapper = document.querySelector('.ms-menu-body-wrapper');

var msMenu = document.getElementsByClassName('ms-menu')[0];
//msMenu = document.querySelector('.ms-menu');

var modalMenu = document.getElementsByClassName('modal-menu')[0];
//modalMenu = document.querySelector('.modal-menu');


msMenu.addEventListener('click', function () {
    menuWrapper.classList.toggle('hide-menu');
    modalMenu.classList.toggle('modal-menu-show');
});

modalMenu.addEventListener('click', function () {
    menuWrapper.classList.toggle('hide-menu');
    modalMenu.classList.toggle('modal-menu-show');
});
