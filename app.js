function pesquisar() {
  // Obtém a seção HTML onde os resultados da pesquisa serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  // Obtém o valor do campo de pesquisa
  let termoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();

  // se termopesquisa for igual a uma string vazia, não executa.
  if (termoPesquisa.trim() == "") {
    section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de um livro ou autor</p>"
    return
  }

  // Inicializa uma string vazia para armazenar os resultados formatados em HTML
  let resultados = "";

  // Itera sobre cada dado na array 'dados'
  for (let dado of dados) {

    if (dado.titulo.toLowerCase().includes(termoPesquisa) || dado.descricao.toLowerCase().includes(termoPesquisa) || dado.autor.toLowerCase().includes(termoPesquisa)) {

      // Constrói o HTML para cada item do resultado da pesquisa
      resultados += `
        <div class="item-resultado">
          <h2>${dado.titulo}</h2>
          <p class="descricao-meta">${dado.descricao}</p>
          <span class="mais-info" data-titulo="${dado.titulo}" data-descricao="${dado.descricao}" data-paginas="${dado.paginas}" data-autor="${dado.autor}" data-link="${dado.link}" >Mais informações</span>
        </div>
      `;
    }
  }

  if (resultados === "") {
    resultados = "<p>Nenhum livro encontrado para o termo pesquisado.</p>";
  }

  // Atribui o HTML gerado para a seção de resultados
  section.innerHTML = resultados;

  // Após adicionar os resultados, seleciona os botões 'mais informações' e adiciona os eventos de clique
  const botoesMaisInfo = document.querySelectorAll('.mais-info');
  botoesMaisInfo.forEach(botao => {
    botao.addEventListener('click', () => {
      // Obter os dados do livro a partir do dataset do botão
      const titulo = botao.dataset.titulo;
      const descricao = botao.dataset.descricao;
      const paginas = botao.dataset.paginas;
      const autor = botao.dataset.autor;
      const link = botao.dataset.link;
      
      // chamar a função abrirModal com os dados obtidos
      abrirModal(titulo, descricao, paginas, autor, link);
    });
  });
}

const modal = document.getElementById('modal-livro');
const span = document.getElementsByClassName("close")[0];

// Função para abrir o modal
function abrirModal(titulo, descricao, paginas, autor, link) {
  modal.style.display = "block";
  document.querySelector("#modal-livro h2").textContent = titulo;
  document.querySelector("#modal-livro p:nth-of-type(1)").textContent = descricao;
  document.querySelector("#modal-livro p:nth-of-type(2)").textContent = "Paginas: " + paginas;
  document.querySelector("#modal-livro p:nth-of-type(3)").textContent = "Autor: " + autor;
  document.querySelector("#modal-livro a").href = link;
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = "none";
}

// Adicionar evento de clique ao botão de fechar
span.onclick = function() {
  fecharModal();
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function(event) {
  if (event.target == modal) {
    fecharModal();
  }
}