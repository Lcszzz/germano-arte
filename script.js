const estampas = [
  "ACG-004",
  "ACG-005",
  "ACG-006",
  "ACG-007",
  "ACG-008",
  "ACG-009",
  "ACG-012A",
  "ACG-013",
  "ACG-014",
  "ACG-015A",
  "ACG-016",
  "ACG-017",
  "ACG-018",
  "ACG-019A",
  "ACG-019B",
  "ACG-020",
  "ACG-021A",
  "ACG-021B",
  "ACG-022",
  "ACG-023",
  "ACG-024",
  "ACG-025A",
  "ACG-025B",
  "ACG-026A",
  "ACG-027A",
  "ACG-028",
  "ACG-029",
  "ACG-030",
  "ACG-031A",
  "ACG-031B",
  "ACG-032A",
  "ACG-032B",
  "ACG-033",
  "ACG-034A",
  "ACG-034B",
  "ACG-034C",
  "ACG-035",
  "ACG-035B",
  "ACG-036",
  "ACG-037A",
  "ACG-038",
  "ACG-039A",
  "ACG-040A",
  "ACG-040B",
  "ACG-041A",
  "ACG-042A",
  "ACG-043A",
  "ACG-043B",
  "ACG-044",
  "ACG-045",
  "ACG-046A",
  "ACG-046B",
  "ACG-047",
  "ACG-048",
  "ACG-049",
  "ACG-050A",
  "ACG-050B",
  "ACG-052",
  "ACG-053A",
  "ACG-056A",
  "ACG-056B",
  "ACG-056C",
  "ACG-057A",
  "ACG-057B",
  "ACG-058B",
  "ACG-058D",
  "ACG-059A",
  "ACG-059C",
  "ACG-060",
  "ACG-061A",
  "ACG-062A",
  "ACG-063A",
  "ACG-063B",
  "ACG-063C",
  "ACG-064A",
  "ACG-064B",
  "ACG-065A",
  "ACG-065B",
  "ACG-066A",
  "ACG-066B",
  "ACG-066C",
  "ACG-067A",
  "ACG-067B",
  "ACG-067C",
  "ACG-068",
  "ACG-068A",
  "ACG-068B",
  "ACG-069A",
  "ACG-069B",
  "ACG-069C",
  "ACG-070A",
  "ACG-070B",
  "ACG-070C",
  "ACG-071",
  "ACG-072A",
  "ACG-072B",
  "ACG-073A",
  "ACG-073B",
  "ACG-073C",
  "ACG-074B",
  "ACG-074C",
  "ACG-075A",
  "ACG-075B",
  "ACG-075C"
];

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalCode = document.getElementById("modalCode");
const closeModal = document.getElementById("closeModal");

function abrirModal(codigo) {
  modal.classList.add("show");
  modalImg.src = `estampas/${codigo}.png`;
  modalCode.textContent = codigo;
}

function fecharModal() {
  modal.classList.remove("show");
  modalImg.src = "";
  modalCode.textContent = "";
}

function criarCard(codigo) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-image">
      <img src="estampas/${codigo}.png" alt="${codigo}" loading="lazy">
    </div>
    <div class="card-info">
      <span class="card-code">${codigo}</span>
    </div>
  `;

  const img = card.querySelector("img");
  img.addEventListener("click", () => abrirModal(codigo));

  return card;
}

estampas.forEach((codigo) => {
  carousel.appendChild(criarCard(codigo));
});

function getScrollAmount() {
  const card = document.querySelector(".card");
  if (!card) return 300;
  return card.offsetWidth + 24;
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