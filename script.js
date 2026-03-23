const estampas = [
  "ACG-004", "ACG-005", "ACG-006", "ACG-007", "ACG-008", "ACG-009", "ACG-012", "ACG-013", "ACG-014", "ACG-015",
  "ACG-016", "ACG-017", "ACG-018", "ACG-019", "ACG-019B", "ACG-020", "ACG-021A", "ACG-021B", "ACG-022", "ACG-023",
  "ACG-024", "ACG-025A", "ACG-025B", "ACG-026", "ACG-027", "ACG-028", "ACG-029", "ACG-030", "ACG-031A", "ACG-031B",
  "ACG-032A", "ACG-032B", "ACG-033", "ACG-034A", "ACG-034B", "ACG-034C", "ACG-035", "ACG-035B", "ACG-036", "ACG-037",
  "ACG-038", "ACG-039", "ACG-040", "ACG-041", "ACG-042", "ACG-043A", "ACG-043B", "ACG-044", "ACG-045",
  "ACG-046A", "ACG-046B", "ACG-047", "ACG-048", "ACG-049", "ACG-050A", "ACG-050B", "ACG-052", "ACG-053", "ACG-056A",
  "ACG-056B", "ACG-056C", "ACG-057A", "ACG-057B", "ACG-057C", "ACG-058A", "ACG-058B", "ACG-058C", "ACG-058D", "ACG-059A",
  "ACG-059B", "ACG-060", "ACG-061", "ACG-062", "ACG-063A", "ACG-063B", "ACG-063C", "ACG-064A", "ACG-064B", "ACG-065A",
  "ACG-065B", "ACG-066A", "ACG-066B", "ACG-066C", "ACG-067A", "ACG-067B", "ACG-067C", "ACG-068", "ACG-068A", "ACG-068B",
  "ACG-069A", "ACG-069B", "ACG-069C", "ACG-070A", "ACG-070B", "ACG-070C", "ACG-071", "ACG-072A", "ACG-072B", "ACG-073A",
  "ACG-073B", "ACG-073C", "ACG-074A", "ACG-074B", "ACG-074C", "ACG-075A", "ACG-075B", "ACG-075C"
];

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCode = document.getElementById("modalCode");
const closeModal = document.getElementById("closeModal");
const modalWhatsappBtn = document.getElementById("modalWhatsappBtn");

const scrollThumb = document.getElementById("scrollThumb");

// Variáveis para o zoom
let currentScale = 1;
let isZoomDragging = false;
let zoomStartX = 0;
let zoomStartY = 0;
let translateX = 0;
let translateY = 0;

function abrirModal(codigo) {
  // Reseta o zoom ao abrir
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  modalImg.style.transform = `translate(0px, 0px) scale(1)`;
  modalImg.style.cursor = "zoom-in";

  modal.classList.add("show");
  modalImg.src = `images/${codigo}.png`;
  modalCode.textContent = codigo;
  
  const phoneNumber = "5511985366989";
  const message = `Olá! Gostaria de pedir a estampa ${codigo}.`;
  modalWhatsappBtn.href = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

function fecharModal() {
  modal.classList.remove("show");
  modalImg.src = "";
  modalCode.textContent = "";

  // Reseta o zoom ao fechar
  currentScale = 1;
  translateX = 0;
  translateY = 0;
  modalImg.style.transform = `translate(0px, 0px) scale(1)`;
}

function criarCard(codigo) {
  const card = document.createElement("article");
  card.className = "card";

  const phoneNumber = "5511985366989";
  const message = `Olá! Gostaria de solicitar a estampa ${codigo}.`;
  const wpUrl = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

  card.innerHTML = `
    <div class="card-image" onclick="abrirModal('${codigo}')">
      <img src="images/${codigo}.png" alt="${codigo}" loading="lazy">
    </div>
    <div class="card-info">
      <span class="card-code">${codigo}</span>
      <a class="btn-solicitar" href="${wpUrl}" target="_blank">Solicitar essa estampa</a>
    </div>
  `;
  
  carousel.appendChild(card);
}

// Inicializar os cards da coleção
estampas.forEach(codigo => criarCard(codigo));

function getScrollAmount() {
  const card = document.querySelector('.card');
  if (card) {
    return card.offsetWidth + 24; // Largura + espaçamento (gap)
  }
  return 284;
}

prevBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: -(getScrollAmount() * 3),
    behavior: "smooth"
  });
});

nextBtn.addEventListener("click", () => {
  carousel.scrollBy({
    left: getScrollAmount() * 3,
    behavior: "smooth"
  });
});

closeModal.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModal();
  }
});

// Lógica de Zoom na Imagem do Modal
modalImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  
  const zoomSensitivity = 0.15;
  const delta = e.deltaY > 0 ? -1 : 1;
  const newScale = currentScale + delta * zoomSensitivity;
  
  if (newScale >= 1 && newScale <= 5) {
    currentScale = newScale;
    
    // Se voltar ao tamanho original, reseta a posição
    if (currentScale === 1) {
      translateX = 0;
      translateY = 0;
    }
    
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    modalImg.style.cursor = currentScale > 1 ? "grab" : "zoom-in";
  }
}, { passive: false });

modalImg.addEventListener("mousedown", (e) => {
  if (currentScale > 1) {
    isZoomDragging = true;
    zoomStartX = e.pageX - translateX;
    zoomStartY = e.pageY - translateY;
    modalImg.style.cursor = "grabbing";
    e.preventDefault(); // previne arrasto padrão da imagem
  }
});

window.addEventListener("mouseup", () => {
  if (isZoomDragging) {
    isZoomDragging = false;
    modalImg.style.cursor = currentScale > 1 ? "grab" : "zoom-in";
  }
});

window.addEventListener("mousemove", (e) => {
  if (!isZoomDragging) return;
  e.preventDefault();
  
  translateX = e.pageX - zoomStartX;
  translateY = e.pageY - zoomStartY;
  
  modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
});

// Lógica da Barra de Rolagem Personalizada
function updateScrollThumbPosition() {
  const scrollPosition = carousel.scrollLeft;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const scrollbarContainer = scrollThumb.parentElement;
  
  if (maxScrollLeft > 0) {
    const scrollPercentage = scrollPosition / maxScrollLeft;
    // Usa a largura real do container da barra em vez da largura do carrossel
    const thumbMaxLeft = scrollbarContainer.clientWidth - scrollThumb.offsetWidth;
    const thumbLeft = scrollPercentage * thumbMaxLeft;
    
    scrollThumb.style.left = `${thumbLeft}px`;
  }
}

function updateScrollThumbSize() {
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  const scrollbarContainer = scrollThumb.parentElement;
  
  if (maxScrollLeft <= 0) {
    scrollThumb.style.display = "none";
  } else {
    scrollThumb.style.display = "block";
    // Proporção da área visível em relação à área total rolável
    const visibleRatio = carousel.clientWidth / carousel.scrollWidth;
    // Define a largura do thumb (puxador) com base na largura real do container
    const thumbWidth = Math.max(50, visibleRatio * scrollbarContainer.clientWidth);
    scrollThumb.style.width = `${thumbWidth}px`;
  }
  
  updateScrollThumbPosition();
}

// Atualizar a barra durante a rolagem normal
carousel.addEventListener("scroll", updateScrollThumbPosition);
window.addEventListener("resize", updateScrollThumbSize);

// Funcionalidade de arraste (drag) para a barra de rolagem customizada
let isDragging = false;
let startX;
let startScrollLeft;

scrollThumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
  
  scrollThumb.style.cursor = "grabbing";
  carousel.classList.add("dragging");
  e.preventDefault();
});

window.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    scrollThumb.style.cursor = "grab";
    carousel.classList.remove("dragging");
  }
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  
  const walk = e.pageX - startX;
  
  // Converte o movimento em pixels do thumb para a rolagem proporcional do carrossel
  const thumbMaxLeft = scrollThumb.parentElement.clientWidth - scrollThumb.offsetWidth;
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  
  const scrollDelta = (walk / thumbMaxLeft) * maxScrollLeft;
  
  carousel.scrollLeft = startScrollLeft + scrollDelta;
});

// Inicializa as propriedades do thumb após a renderização dos elementos
setTimeout(updateScrollThumbSize, 100);

// === Inicialização do GSAP ScrollSmoother ===
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o GSAP e o plugin ScrollSmoother foram carregados
  if (typeof gsap !== "undefined" && typeof ScrollSmoother !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    // Criação do ScrollSmoother
    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.8, // DURAÇÃO DA SUAVIDADE EM SEGUNDOS - Altere aqui a velocidade
      effects: true,
      smoothTouch: 0.1,
    });

    // Corrige os links da página (menu e logo) para rolar com o ScrollSmoother
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId !== "#") {
          const targetElem = document.querySelector(targetId);
          if (targetElem) {
            e.preventDefault();
            // Pega a altura do header para compensar na rolagem
            const headerHeight = document.querySelector(".site-header").offsetHeight;
            smoother.scrollTo(targetElem, true, "top " + headerHeight + "px");
          }
        }
      });
    });
  }
});


