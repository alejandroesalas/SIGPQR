
function load(){
  console.log('cargando recursos');
  $(document).ready(function(){
    console.log('entro al ready');
    $('.sidenav').sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.collapsible').collapsible();
  });
}

function loadCollapsiblle(){
  $('.collapsible').collapsible();
}
function loadSidenav() {
  $('.sidenav-trigger').sideNav();
  $('.sidenav').sideNav();
}
function loadSelect() {
  $('select').material_select();
}
/*
$(document).ready(function(){
  $('.collapsible').collapsible();
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.tooltipped').tooltip();
  $('.modal').modal();
});*/
