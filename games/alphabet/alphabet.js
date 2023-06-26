const letrasContainer = document.querySelector(".letras");
const audioBtn = document.querySelector("#audio-btn");
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasSplit = letras.split("");
let pontos = 0;
let letraSelecionada;
let audio;

function selecionarAudioAleatorio() {
  letraSelecionada = letrasSplit[Math.floor(Math.random() * letrasSplit.length)];
  audio = new Audio(`../../audios/${letraSelecionada}.mp3`);
}
selecionarAudioAleatorio();

audioBtn.addEventListener("click", () => {
  audio.play();
});

function checarLetra(letra) {
  if (letra === letraSelecionada) {
    pontos+= 1;
    window.alert(`Parabéns, você acertou! Você está com ${pontos} ponto(s)!`);
  } else {
    pontos = Math.max(0, pontos - 1);
    window.alert(`Você errou e perdeu um ponto! Você está com ${pontos} ponto(s)!`);
  }

  selecionarAudioAleatorio();
}

letrasSplit.forEach((letra) => {
  const p = document.createElement("p");
  p.textContent = letra;

  p.addEventListener("click", checarLetra.bind(this, letra));

  letrasContainer.appendChild(p);
});
