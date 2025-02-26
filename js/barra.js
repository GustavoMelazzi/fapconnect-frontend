//botao expandir

var btnExp = document.querySelector('#btn-exp');
var btnPesquisa = document.querySelector('#item-menu-pesquisar-exp');
var menuSide = document.querySelector('.menu-lateral');
var overlay = document.querySelector('.overlay');
var inputPesquisar = document.querySelector('.item-menu-pesquisar input');

// Botão original para expandir/recolher a barra lateral
btnExp.addEventListener('click', function(){
  menuSide.classList.toggle('expandir');
  overlay.classList.toggle('active');
});

// Botão novo que expande a barra e foca o input
btnPesquisa.addEventListener('click', function(){
  menuSide.classList.toggle('expandir');
  overlay.classList.toggle('active');
  
});

// Permite fechar a barra e remover o overlay ao clicar fora (no overlay)
overlay.addEventListener('click', function() {
  menuSide.classList.remove('expandir');
  overlay.classList.remove('active');
});


