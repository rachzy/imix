const divLigacoes = document.querySelector("#ligacoes");
const cores = ["cyan", "red", "yellow"]; // Variável que armazena todas as cores a serem utilizadas
const ligacoes = [
  // Variável que armazena as opções e suas respostas (a resposta é definida pela posição das opções)
  ["+", "4", "÷"], // Coluna 1
  ["Plus", "Four", "Divided"], // Coluna 2
  // Exemplo: "+" é o 1º elemento na 1ª Array, "Plus" é o 1º elemento na 2ª Array
  // Portanto, "Plus" é a resposta de "+"
];
const btnConferir = document.querySelector(".btn-conferir");
const btnTentarNovamente = document.querySelector(".btn-tentar-novamente");

let selecionado = false; // Variável que determina se um usuário está selecionando um elemento
let colunaSelecionado = 0; // Variável que determina qual coluna está o elemento selecionado
let indexSelecionado = 0; // Variável que determina quantos elementos já foram selecionados

// Adiciona a função que reseta os valores atuais e inicia o game novamente no botão de tentar novamente
btnTentarNovamente.addEventListener("click", () => {
  // Faz com que o botão de tentar novamente desapareça
  btnTentarNovamente.style.display = "none";

  // Faz com que o botão de conferir apareça
  btnConferir.style.display = "block";

  // Reseta os valores
  selecionado = false;
  colunaSelecionado = 0;
  indexSelecionado = 0;

  // Cria as ligações novamente
  criarLigacoes();
});

btnConferir.addEventListener("click", () => {
  let pontos = 0;

  const opcoes = document.querySelectorAll("#op1");
  const ligacoesRespostas = document.querySelectorAll("#op2");
  const lpArray = [...ligacoesRespostas];

  // Confere se cada uma das opções possui o valor correto
  opcoes.forEach((opcao) => {
    const cor = opcao.style.color;

    if (!cor) return;

    const valor = opcao.textContent;

    // Procura pela posição da opção correta
    let posicaoOpcao = ligacoes[0].findIndex((op) => op === valor);

    // Seleciona o elemento que corresponderia à opção correta
    let elementoResposta = lpArray.find(
      (lig) => lig.textContent === ligacoes[1][posicaoOpcao]
    );
    // Armazena a cor do elementoResposta
    const corResposta = elementoResposta.style.color;

    if (!corResposta) return;

    // Caso a cor da opção corresponda à cor da resposta, adicione um ponto
    if (cor === corResposta) pontos++;
  });

  // Mostra um diferente alerta pro usuário baseado em sua pontuação final
  if (pontos >= ligacoes[0].length) {
    window.alert(
      `Parabéns, você acertou todas as ligações e conseguiu ${pontos} pontos`
    );
  } else {
    window.alert(`Pontuação: ${pontos}. Tente novamente!`);
  }

  btnConferir.style.display = "none"; // Desabilita o botão de conferir
  btnTentarNovamente.style.display = "block"; // Habilita o botão de tentar novamente
});

function cliqueLigacao(elemento, coluna) {
  // Caso o jogador esteja tentando deselecionar um elemento já selecionado
  // Checa se ele não está selecionando um outro elemento
  // Checa se o elemento possui uma cor diferente de preto ou se não possui cor alguma
  if (elemento.style.color !== "" && elemento.style.color !== "black") {
    elemento.style.color = "black";
    colunaSelecionado = 0;

    // Caso o usuário esteja selecionando um elemento, deselecione-o
    if (selecionado) {
      selecionado = false;
    }
  } else if (coluna !== colunaSelecionado) {
    // O usuário não pode selecionar dois elementos da mesma coluna, por isso, essa verificação é feita

    // Verifica se todas as cores já foram utilizadas
    // Caso tenham sido, resete o valor para zero para começar a utilizar todas de novo
    if (!cores[indexSelecionado]) {
      indexSelecionado = 0;
    }

    // Seta a cor do elemento para a cor atual
    elemento.style.color = cores[indexSelecionado];

    // Caso o usuário já tenha selecionado um elemento...
    if (selecionado) {
      indexSelecionado++; // Faz com que a próxima cor seja selecionada para a próxima seleção
      selecionado = false; // Desseleciona o elemento, pois a operação acabou

      colunaSelecionado = 0; // Reseta a coluna selecionada, pois a operação acabou
    } else {
      // Caso o usuário não tenha selecionado nenhum elemento...
      colunaSelecionado = coluna; // Seta o mesmo valor da coluna, para impedir que o usuário selecione dois elementos iguais
      selecionado = true; // Altera o valor de selecionado para "true"
    }
  }
}

// Função que cria ligações
function criarLigacao(el1, el2) {
  const divLigacao = document.createElement("div"); // Cria uma div para a ligação
  divLigacao.id = "ligacao"; // Seta o id dessa div para "ligacao"

  // Mesma coisa do de cima...
  const p1container = document.createElement("div");
  p1container.id = "p1";

  // Anexa esse elemento á div ligação
  divLigacao.appendChild(p1container);

  // Cria um elemento <p> para armazenar o valor da opção
  const pEl1 = document.createElement("p");
  pEl1.id = "op1";
  pEl1.textContent = el1; // Seta o texto do <p> para o texto do elemento
  pEl1.addEventListener("click", cliqueLigacao.bind(this, pEl1, 1)); // Seta o evento de clique da ligação
  p1container.appendChild(pEl1);

  // Mesma coisa do primeiro...
  const p2container = document.createElement("div");
  p2container.id = "p2";

  divLigacao.appendChild(p2container);

  const pEl2 = document.createElement("p");
  pEl2.id = "op2";
  pEl2.textContent = el2;
  pEl2.addEventListener("click", cliqueLigacao.bind(this, pEl2, 2));
  p2container.appendChild(pEl2);

  // Anexa a divLigacao criada na divLigacoes
  divLigacoes.appendChild(divLigacao);
}

// Função que cria as ligações das opções de forma aleatório
function criarLigacoes() {
  divLigacoes.innerHTML = ""; // Reseta o HTML da div de ligações

  // Coluna 1...
  const copiaOpcopes = [...ligacoes[0]];
  const opcoesEmbaralhadas = shuffleArray(copiaOpcopes);

  // Coluna 2...
  const copiaLigacoes = [...ligacoes[1]];
  const ligacoesEmbaralhadas = shuffleArray(copiaLigacoes);

  // Para cada ligação
  ligacoes[0].forEach((elemento, index) => {
    // Cria uma ligação entre os elementos que possuem a mesma posição na array aleatória
    criarLigacao(opcoesEmbaralhadas[index], ligacoesEmbaralhadas[index]);
  });
}
criarLigacoes();
