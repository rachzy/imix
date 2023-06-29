// Elementos a serem selecionados
// #: Seleciona por ID
// .: Seleciona por class
const letrasContainer = document.querySelector(".letras");
const audioBtn = document.querySelector("#audio-btn");

// Todas as letras do alfabeto
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasSplit = letras.split(""); // Separa todas

let pontos = 0; // Pontos do usuário
let letraSelecionada; // Letra selecionada aleatoriamente pelo programa
let audio; // Audio que será tocado

// Função que seleciona um audio aleatorio
function selecionarAudioAleatorio() {
  letraSelecionada =
    letrasSplit[Math.floor(Math.random() * letrasSplit.length)];
  audio = new Audio(`../../audios/${letraSelecionada}.mp3`);
}
selecionarAudioAleatorio();

// Adiciona o evento de "jogar" no icone do audio
audioBtn.addEventListener("click", () => {
  audio.play();
});

// Função que checa se a letra selecionada corresponde à letraSelecionada
function checarLetra(letra) {
  if (letra === letraSelecionada) {
    pontos += 1; // Adiciona +1 ponto
    window.alert(`Parabéns, você acertou! Você está com ${pontos} ponto(s)!`);
  } else {
    pontos = Math.max(0, pontos - 1); // Diminui um ponto, caso a pontuação atual seja maior que 0
    window.alert(
      `Você errou e perdeu um ponto! Você está com ${pontos} ponto(s)!`
    );
  }

  // Seleciona um novo audio aleatorio
  selecionarAudioAleatorio();
}

// Função que cria automaticamente um elemento <p> para cada letra do alfabeto
letrasSplit.forEach((letra) => {
  const p = document.createElement("p"); // Cria o elemento <p>
  p.textContent = letra;

  p.addEventListener("click", checarLetra.bind(this, letra)); // Adiciona o evento de clique no elemento

  letrasContainer.appendChild(p); // Anexa o elemento criado no container
});
