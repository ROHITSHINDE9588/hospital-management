const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navActions = document.querySelector(".nav-actions");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const faqItems = document.querySelectorAll(".faq-item");

if (window.lucide) {
  window.lucide.createIcons();
}

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navActions.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navActions.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const animateCounter = (counter) => {
  if (counter.dataset.counted === "true") return;

  const target = Number(counter.dataset.counter);
  const suffix = counter.dataset.suffix || "";
  const duration = 1350;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.floor(target * eased).toLocaleString()}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = `${target.toLocaleString()}${suffix}`;
      counter.dataset.counted = "true";
    }
  };

  requestAnimationFrame(tick);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) animateCounter(entry.target);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  button?.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const sections = [...document.querySelectorAll("main section[id]")];

const activeNavObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => activeNavObserver.observe(section));

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    const message = document.createElement("p");
    message.className = "form-note";
    message.textContent = "Thank you. Your request has been received.";
    form.appendChild(message);
    setTimeout(() => message.remove(), 3500);
  });
});
