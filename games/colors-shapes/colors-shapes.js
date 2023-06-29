// Elementos a serem selecionados
// #: Seleciona por ID
// .: Seleciona por class
const formas = document.querySelectorAll("#forma");
const divFormas = document.querySelector(".formas");
const formaAlvo = document.querySelector("#forma-alvo");
const formasContainer = document.querySelector(".formas");
const erroContainer = document.querySelector("#erro");
const acertoContainer = document.querySelector("#acerto");
const tentarNovamenteBtn = document.querySelectorAll(".tentar-novamente");

// Todos os tipos de formas disponíveis
let tipos = [
  {
    id: "green-circle",
    label: "Green Circle",
  },
  {
    id: "pink-rectangle",
    label: "Pink Rectangle",
  },
  {
    id: "red-square",
    label: "Red Square",
  },
  {
    id: "yellow-triangle",
    label: "Yellow Triangle",
  },
];

// Função que inicia o game
function iniciarGame() {
  // Faz com que todos os elementos necessários apareçam (mudando o display deles)
  formasContainer.style.display = "flex";
  acertoContainer.style.display = "none";
  erroContainer.style.display = "none";

  // Seleicona um tipo aleatório
  let tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];

  // Randomiza os tipos
  const tiposRandomizadas = shuffleArray(tipos);

  // Seta o texto que mostra qual forma deverá ser selecionada
  formaAlvo.textContent = tipoAleatorio.label;

  // Reseta o HTML do contianer de formas
  divFormas.innerHTML = "";

  // Para cada um dos tipos...
  tiposRandomizadas.forEach((tipo) => {
    // Encontra o elemento da forma que corresponde à esse tipo
    const forma = [...formas].find((forma) => forma.alt === tipo.id);

    // Funçõa que será ativada quando o usuário clicar na forma
    function cliqueForma() {
      // Faz com que o container das formas desapareça
      formasContainer.style.display = "none";

      // Caso o "alt" da forma corresponda ao ID do tipo selecionado, então a forma selecionada
      // é a forma correta! Logo, faça com que o container de acertos apareça
      if (forma.alt === tipoAleatorio.id) {
        acertoContainer.style.display = "flex";
      } else {
        // Caso contrário, o usuário selecionou uma forma errada
        // Portanto, faça com o container de erro apareça
        erroContainer.style.display = "flex";
      }
    }

    // Adiciona a função de clique à forma
    forma.onclick = cliqueForma;

    // Adiciona a forma criada à div de formas
    divFormas.appendChild(forma);
  });
}
iniciarGame();

// Função que adiciona a função de iniciar o game novamente à ambos os botões de tentar novamente
tentarNovamenteBtn.forEach((btn) => {
  btn.addEventListener("click", iniciarGame);
});
