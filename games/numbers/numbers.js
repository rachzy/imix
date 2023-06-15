const divLigacoes = document.querySelector("#ligacoes");
const cores = ["cyan", "red", "yellow"];
const ligacoes = [
  ["+", "4", "÷"],
  ["Plus", "Four", "Divided"],
];
let selecionado = false;
let colunaSelecionado = 0;
let indexSelecionado = 0;

function cliqueLigacao(elemento, coluna) {
  // Caso o jogador esteja tentando deselecionar um elemento já selecionado
  // Checa se ele não está selecionando um outro elemento
  // Checa se o elemento possui uma cor diferente de preto ou se não possui cor alguma
  if (elemento.style.color !== "" && elemento.style.color !== "black") {
    elemento.style.color = "black";
    colunaSelecionado = 0;

    if (selecionado) {
      selecionado = false;
    }
  } else if (coluna !== colunaSelecionado) {
    if (!cores[indexSelecionado]) {
      indexSelecionado = 0;
    }
    elemento.style.color = cores[indexSelecionado];

    if (selecionado) {
      indexSelecionado++;
      selecionado = false;

      colunaSelecionado = 0;
    } else {
      colunaSelecionado = coluna;
      selecionado = true;
    }
  }
}

function criarLigacao(el1, el2) {
  const divLigacao = document.createElement("div");
  divLigacao.id = "ligacao";

  const p1container = document.createElement("div");
  p1container.id = "p1";
  divLigacao.appendChild(p1container);

  const pEl1 = document.createElement("p");
  pEl1.textContent = el1;
  pEl1.addEventListener("click", cliqueLigacao.bind(this, pEl1, 1));
  p1container.appendChild(pEl1);

  const p2container = document.createElement("div");
  p2container.id = "p2";
  divLigacao.appendChild(p2container);

  const pEl2 = document.createElement("p");
  pEl2.textContent = el2;
  pEl2.addEventListener("click", cliqueLigacao.bind(this, pEl2, 2));
  p2container.appendChild(pEl2);

  divLigacoes.appendChild(divLigacao);
}

ligacoes[0].forEach((elemento, index) => {
  criarLigacao(elemento, ligacoes[1][index]);
});
