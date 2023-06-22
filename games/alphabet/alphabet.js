const letrasContainer = document.querySelector(".letras");
const audioBtn = document.querySelector("#audio-btn");
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasSplit = letras.split("");
let letraSelecionada;
let audio;

letraSelecionada = letrasSplit[Math.floor(Math.random() * letrasSplit.length)];
audio = new Audio(`../../audios/${letraSelecionada}.mp3`);

audioBtn.addEventListener("click", () => {
  audio.play();
});

function checarLetra(letra) {
  if (letra === letraSelecionada) {
    window.alert("Parabéns, você acertou!");
    window.location.href = "../../index.html";
  } else {
    window.alert("Você errou! Tente de novo!");
  }
}

letrasSplit.forEach((letra) => {
  const p = document.createElement("p");
  p.textContent = letra;

  p.addEventListener("click", checarLetra.bind(this, letra));

  letrasContainer.appendChild(p);
});
