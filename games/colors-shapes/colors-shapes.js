const formas = document.querySelectorAll("#forma");
const divFormas = document.querySelector(".formas");
const formaAlvo = document.querySelector("#forma-alvo");
const formasContainer = document.querySelector(".formas");
const erroContainer = document.querySelector("#erro");
const acertoContainer = document.querySelector("#acerto");
const tentarNovamenteBtn = document.querySelectorAll(".tentar-novamente");
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

function iniciarGame() {
    formasContainer.style.display = "flex";
    acertoContainer.style.display = "none";
    erroContainer.style.display = "none";

    let tipoAleatorio = tipos[Math.floor(Math.random() * tipos.length)];

    const tiposRandomizadas = shuffleArray(tipos);
    
    formaAlvo.textContent = tipoAleatorio.label;
    divFormas.innerHTML = "";
    
    tiposRandomizadas.forEach((tipo) => {
      const forma = [...formas].find((forma) => forma.alt === tipo.id);

      function cliqueForma() {
        formasContainer.style.display = "none";
        if (forma.alt === tipoAleatorio.id) {
          acertoContainer.style.display = "flex";
        } else {
          erroContainer.style.display = "flex";
        }
      }
    
      forma.onclick = cliqueForma;
    
      divFormas.appendChild(forma);
    });
}
iniciarGame();

tentarNovamenteBtn.forEach((btn) => {
    btn.addEventListener("click", iniciarGame)
})

