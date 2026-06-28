const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector(".menu-toggle");
const overlay = document.querySelector(".overlay");

if (window.lucide) {
  window.lucide.createIcons();
}

const closeMenu = () => {
  sidebar.classList.remove("is-open");
  overlay.hidden = true;
  menuToggle?.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  overlay.hidden = !isOpen;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

overlay?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
