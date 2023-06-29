// Elementos a serem selecionados
// #: Seleciona por ID
// .: Seleciona por class
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false; // Variável que controla se o usuário já virou uma carta
let lockBoard = false; // Variável que bloqueia ou desbloqueia o usuário de jogar
let firstCard, secondCard; // Armazenam as cartas selecionadas pelo usuário naquela vez

// Função ativada quando o usuário tenta virar uma carta
function flipCard() {
  if (lockBoard) return; // Caso o usuário esteja bloqueado de jogar, retorne
  if (this === firstCard) return; // Caso a carta clicada já esteja selecionada, retorne

  this.classList.add("flip"); // Adiciona a classe "flip" no card

  // Caso o usuário não tenha selecionado nenhuma carta ainda...
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // Caso uma outra carta já tenha sido selecionada
  secondCard = this;
  checkForMatch(); // Chama a função que procura por uma combinação da carta
}

// Função que procura por uma carta match
function checkForMatch() {
  // Variável que verifica se o "dataset" do card selecionado corresponde ao outro card selecionado
  let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

  if (isMatch) {
    // Caso elas se correspondam, desative-as de serem viradas
    disableCards();
  } else {
    // Caso não, vire-as novamente
    unflipCards();
  }
}

// Função que desabilita as funções de clique das cartas selecionadas pelo usuário
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard(); // Chama a função de reset
}

// Função que desvira as cartas
function unflipCards() {
  lockBoard = true; // Bloqueia os movimentos do usuário

  // Adiciona as classes de cartas viradas à ambos os cards
  // Depois de 1500ms, para dar tempo do usuário ver as cartas que selecionou
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

// Reseta todas as variáveis utilizadas durante um round, para permitir que o usuário
// continue jogando
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Função que embaralha os cards
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Adiciona a função de virar a carta ao clicar em cada um dos cards
cards.forEach((card) => card.addEventListener("click", flipCard));
