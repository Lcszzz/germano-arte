const estampas = [ // Cria uma lista (Array) guardando todos os nomes/códigos das estampas disponíveis
  "ACG-004", "ACG-005", "ACG-006", "ACG-007", "ACG-008", "ACG-009", "ACG-012", "ACG-013", "ACG-014", "ACG-015",
  "ACG-016", "ACG-017", "ACG-018", "ACG-019", "ACG-019B", "ACG-020", "ACG-021A", "ACG-021B", "ACG-022", "ACG-023",
  "ACG-024", "ACG-025A", "ACG-025B", "ACG-026", "ACG-027", "ACG-028", "ACG-029", "ACG-030", "ACG-031A", "ACG-031B",
  "ACG-032A", "ACG-032B", "ACG-033", "ACG-034A", "ACG-034B", "ACG-034C", "ACG-035", "ACG-035B", "ACG-036", "ACG-037",
  "ACG-038", "ACG-039", "ACG-040", "ACG-040B", "ACG-041", "ACG-042", "ACG-043A", "ACG-043B", "ACG-044", "ACG-045",
  "ACG-046A", "ACG-046B", "ACG-047", "ACG-048", "ACG-049", "ACG-050A", "ACG-050B", "ACG-052", "ACG-053", "ACG-056A",
  "ACG-056B", "ACG-056C", "ACG-057A", "ACG-057B", "ACG-057C", "ACG-058A", "ACG-058B", "ACG-058C", "ACG-058D", "ACG-059A",
  "ACG-059B", "ACG-060", "ACG-061", "ACG-062", "ACG-063A", "ACG-063B", "ACG-063C", "ACG-064A", "ACG-064B", "ACG-065A",
  "ACG-065B", "ACG-066A", "ACG-066B", "ACG-066C", "ACG-067A", "ACG-067B", "ACG-067C", "ACG-068", "ACG-068A", "ACG-068B",
  "ACG-069A", "ACG-069B", "ACG-069C", "ACG-070A", "ACG-070B", "ACG-070C", "ACG-071", "ACG-072A", "ACG-072B", "ACG-073A",
  "ACG-073B", "ACG-073C", "ACG-074A", "ACG-074B", "ACG-074C", "ACG-075A", "ACG-075B", "ACG-075C"
]; // Fim da lista de imagens que serão exibidas automaticamente no site

const carousel = document.getElementById("carousel"); // Localiza no HTML a área onde os produtos devem aparecer
const prevBtn = document.getElementById("prevBtn");   // Localiza o botão da seta para a esquerda (voltar)
const nextBtn = document.getElementById("nextBtn");   // Localiza o botão da seta para a direita (avançar)

const modal = document.getElementById("modal");           // Localiza a janela de zoom (modal) que cobre a tela
const modalImg = document.getElementById("modalImg");     // Localiza a tag de imagem dentro da janela de zoom
const modalCode = document.getElementById("modalCode");   // Localiza o texto que vai mostrar o código no zoom
const closeModal = document.getElementById("closeModal"); // Localiza o botão de fechar (X) da janela de zoom

const scrollThumb = document.getElementById("scrollThumb"); // Localiza o puxador rosa da barra de rolagem customizada

function abrirModal(codigo) { // Função que prepara e mostra a janela de zoom
  modal.classList.add("show");           // Liga a janela (muda o visual para aparecer na tela)
  modalImg.src = `images/${codigo}.png`; // Carrega a foto exata da estampa em que você clicou
  modalCode.textContent = codigo;        // Escreve o código da estampa embaixo da foto grande
} // Fim da função de abrir zoom

function fecharModal() { // Função que esconde a janela de zoom
  modal.classList.remove("show"); // Desliga a janela (muda o visual para sumir da tela)
  modalImg.src = "";              // Limpa o link da imagem para o site não ficar pesado
  modalCode.textContent = "";     // Apaga o texto do código que estava aparecendo
} // Fim da função de fechar zoom

function criarCard(codigo) { // Função que constrói cada "caixinha" de produto automaticamente
  const card = document.createElement("article"); // Cria um novo elemento técnico 'article' na memória do site
  card.className = "card";                        // Aplica a classe CSS 'card' para dar estilo à caixinha

  card.innerHTML = `
    <div class="card-image">
      <img src="images/${codigo}.png" alt="${codigo}" loading="lazy">
    </div>
    <div class="card-info">
      <span class="card-code">${codigo}</span>
    </div>
  `; // Define o HTML interno da caixinha com a imagem e o código da estampa
  
  card.addEventListener("click", () => abrirModal(codigo)); // Diz ao site: "Se clicar nesta foto, abra o zoom!"
  
  carousel.appendChild(card); // Coloca a caixinha recém-criada dentro da galeria do site
} // Fim da criação da caixinha

// Inicializar os cards da coleção
estampas.forEach(codigo => criarCard(codigo)); // Loop: para cada código na lista lá do topo, cria um card no site

function getScrollAmount() { // Função que descobre quantos pixels a galeria deve girar
  const card = document.querySelector('.card'); // Procura por uma caixinha de produto que já existe no site
  if (card) {
    return card.offsetWidth + 24; // Pega a largura da foto + o espaço de 24 pixels entre elas
  }
  return 284; // Valor reserva de segurança caso o site ainda não tenha carregado as fotos
} // Fim do cálculo de pulo

prevBtn.addEventListener("click", () => { // Comando: quando clicar no botão de voltar...
  carousel.scrollBy({
    left: -(getScrollAmount() * 3), // Empurra a galeria para a esquerda pulando 3 fotos de uma vez
    behavior: "smooth"              // Faz o movimento de deslize ser suave e elegante
  });
}); // Fim do comando de voltar

nextBtn.addEventListener("click", () => { // Comando: quando clicar no botão de avançar...
  carousel.scrollBy({
    left: getScrollAmount() * 3, // Empurra a galeria para a direita pulando 3 fotos de uma vez
    behavior: "smooth"           // Faz o movimento de deslize ser suave e elegante
  });
}); // Fim do comando de avançar

closeModal.addEventListener("click", fecharModal); // Comando: fecha o zoom se o usuário clicar no botão 'X'

modal.addEventListener("click", (e) => { // Comando: fica vigiando se o usuário clicar no fundo preto do zoom
  if (e.target === modal) { // Se o clique foi no fundo (e não na foto)...
    fecharModal(); // Fecha a janela de zoom automaticamente
  }
}); // Fim da vigilância do fundo

document.addEventListener("keydown", (e) => { // Comando: fica vigiando as teclas do teclado do usuário
  if (e.key === "Escape") { // Se a tecla apertada for o 'ESC' (no canto superior esquerdo)...
    fecharModal(); // Fecha a janela de zoom na hora
  }
}); // Fim da vigilância do teclado

// Lógica da Barra de Rolagem Personalizada (Barra Rosa no fundo)
function updateScrollThumbPosition() { // Função que move o puxador rosa enquanto você rola as fotos
  const scrollPosition = carousel.scrollLeft;                        // Descobre quantos pixels você já rolou
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth; // Calcula o limite final da galeria
  const scrollbarContainer = scrollThumb.parentElement;              // Localiza o trilho onde a barra corre
  
  if (maxScrollLeft > 0) { // Se a galeria for maior que a tela do usuário...
    const scrollPercentage = scrollPosition / maxScrollLeft;                    // Calcula a porcentagem (%) da rolagem
    const thumbMaxLeft = scrollbarContainer.clientWidth - scrollThumb.offsetWidth; // Calcula o espaço livre no trilho
    const thumbLeft = scrollPercentage * thumbMaxLeft;                          // Descobre a posição exata do puxador
    
    scrollThumb.style.left = `${thumbLeft}px`; // Move fisicamente o puxador rosa na tela do site
  }
} // Fim do movimento da barra

function updateScrollThumbSize() { // Função que define o tamanho do puxador rosa
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth; // Verifica se há conteúdo para rolar
  const scrollbarContainer = scrollThumb.parentElement;              // Localiza o trilho cinza
  
  if (maxScrollLeft <= 0) { // Se todas as fotos couberem na tela sem precisar rolar...
    scrollThumb.style.display = "none"; // Esconde a barra rosa para não poluir o visual
  } else {
    scrollThumb.style.display = "block";                                         // Mostra a barra rosa na tela
    const visibleRatio = carousel.clientWidth / carousel.scrollWidth;            // Calcula quanto do site está visível
    const thumbWidth = Math.max(50, visibleRatio * scrollbarContainer.clientWidth); // Define o tamanho ideal do puxador
    scrollThumb.style.width = `${thumbWidth}px`;                                 // Aplica este tamanho ao puxador rosa
  }
  
  updateScrollThumbPosition(); // Reajusta a posição da barra sempre que mudar de tamanho
} // Fim do ajuste de tamanho

// Atualizar a barra durante a rolagem normal
carousel.addEventListener("scroll", updateScrollThumbPosition); // Diz ao site: "Enquanto rolar as fotos, mova a barra!"
window.addEventListener("resize", updateScrollThumbSize);        // Diz ao site: "Se o usuário girar o celular, ajuste a barra!"

// Funcionalidade de arraste (drag) — Permite segurar a barra rosa com o mouse
let isDragging = false; // Variável "interruptor" que avisa se o mouse está segurando a barra
let startX;             // Guarda o ponto exato onde o clique começou
let startScrollLeft;    // Guarda onde a rolagem estava no momento do clique

scrollThumb.addEventListener("mousedown", (e) => { // Quando o usuário apertar o botão do mouse na barra rosa...
  isDragging = true;                   // Liga o "interruptor" de arraste
  startX = e.pageX;                    // Grava a posição do mouse na tela
  startScrollLeft = carousel.scrollLeft; // Grava a posição da galeria
  
  scrollThumb.style.cursor = "grabbing"; // Muda o ícone do mouse para uma "mão fechada"
  carousel.classList.add("dragging");    // Desativa pausadamente o 'magnetismo' das fotos pelo CSS
  e.preventDefault();                    // Evita que o navegador tente selecionar os textos por erro
}); // Fim do clique inicial

window.addEventListener("mouseup", () => { // Quando o usuário soltar o botão do mouse...
  if (isDragging) { // Se ele estava arrastando...
    isDragging = false;                   // Desliga o "interruptor" de arraste
    scrollThumb.style.cursor = "grab";     // Volta o ícone do mouse para "mão aberta"
    carousel.classList.remove("dragging"); // Religado o 'magnetismo' das fotos
  }
}); // Fim do soltar o mouse

window.addEventListener("mousemove", (e) => { // Quando o usuário move o mouse pela tela toda...
  if (!isDragging) return; // Se ele não estiver segurando a barra, não faz nada e ignora
  e.preventDefault(); // Impede comportamentos estranhos do navegador
  
  const walk = e.pageX - startX; // Calcula quantos centímetros/pixels o mouse andou na mesa
  
  const thumbMaxLeft = scrollThumb.parentElement.clientWidth - scrollThumb.offsetWidth; // Tamanho total do trilho
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;                  // Tamanho total da galeria
  
  const scrollDelta = (walk / thumbMaxLeft) * maxScrollLeft; // Transforma o movimento da mão em movimento das fotos
  
  carousel.scrollLeft = startScrollLeft + scrollDelta; // Faz a galeria rolar fisicamente acompanhando sua mão
}); // Fim do arraste do mouse

// Inicializa as propriedades do thumb após a renderização dos elementos
setTimeout(updateScrollThumbSize, 100); // Espera 0.1 segundo para o site "nascer" e então cria a barra de rolagem

// === Inicialização do GSAP ScrollSmoother (A Mágica da Rolagem Suave) ===
document.addEventListener("DOMContentLoaded", () => { // Comando central: "Quando o site terminar de carregar tudo..."
  if (typeof gsap !== "undefined" && typeof ScrollSmoother !== "undefined") { // Verifica se as ferramentas de animação carregaram
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother); // Ativa os "poderes" de detectar rolagem e suavizar movimento
    
    // Criação do efeito de suavidade luxuosa na página toda (Rolagem de Grife)
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper", // Define quem é o container "parado" (o trilho)
      content: "#smooth-content", // Define quem é o container que "corre" (o vagão)
      smooth: 1.8,                // Define a suavidade: 1.8 segundos de atraso elegante no movimento
      effects: true,              // Ativa efeitos especiais como o parallax (profundidade)
      smoothTouch: 0.1,           // Define uma suavidade menor em celulares para não ficar estranho no toque
    }); // Fim da criação do efeito
  } // Fim da verificação das ferramentas
}); // Fim do carregamento do site
