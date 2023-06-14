const divLigacoes = document.querySelector("#ligacoes");

function criarLigacao(el1, el2) {
  const divLigacao = document.createElement("div");
  divLigacao.id = "ligacao";

  const p1container = document.createElement("div");
  p1container.id = "p1";
  divLigacao.appendChild(p1container);

  const pEl1 = document.createElement("p");
  pEl1.textContent = el1;
  p1container.appendChild(pEl1);

  const p2container = document.createElement("div");
  p2container.id = "p2";
  divLigacao.appendChild(p2container);

  const pEl2 = document.createElement("p");
  pEl2.textContent = el2;
  p2container.appendChild(pEl2);

  divLigacoes.appendChild(divLigacao);
}

const ligacoes = [
  ["+", "4", "÷"],
  ["Plus", "Four", "Divided"],
];

ligacoes[0].forEach((elemento, index) => {
  criarLigacao(elemento, ligacoes[1][index]);
});
