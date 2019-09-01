
function load(){
  $(document).ready(function(){
    $('.sidenav').sideNav();
    $('.modal').modal();
    $('select').material_select();
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
  });
}
function loadAllResources() {
  $('.sidenav').sideNav();
  $('.modal').modal();
  $('select').material_select();
  $('.collapsible').collapsible();
  $('.tooltipped').tooltip();
}
function loadCollapsiblle(){
  $('.collapsible').collapsible();
}
function loadSidenav() {
  $(".button-collapse").sideNav();
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
