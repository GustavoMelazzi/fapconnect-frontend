// Se estivermos na página de login (verifica se o botão existe)
if (document.getElementById("login-btn")) {
    document.getElementById("login-btn").addEventListener("click", function() {
      // Redireciona para a tela de carregamento
      window.location.href = "tela_carregamento.html";
    });
  }
  
  // Se estivermos na página de carregamento (verifica se o elemento de carregamento existe)
  if (document.getElementById("loading-screen")) {
    window.addEventListener("load", function() {
      // Simula um tempo de carregamento (ex.: 2 segundos)
      setTimeout(function() {
        // Redireciona para a página do feed
        window.location.href = "feed.html";
      }, 3000); // 2000 milissegundos = 2 segundos
    });
  }
  