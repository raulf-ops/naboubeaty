// ===========================================================
// Nabou Beauty — site script
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  setupBurgerMenu();
  computeOpenStatus();
  highlightToday();
  setupContactForm();
  setupScrollSpy();
  setupBackToTop();
  setupLightbox();
});

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function setupBurgerMenu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("main-nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    nav.classList.toggle("open");
    burger.classList.toggle("active");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Opening hours, mirrored from the #hours-table markup.
// Each entry: [openHour, openMinute, closeHour, closeMinute] or null when closed.
const WEEKLY_HOURS = {
  0: null,                 // Dimanche
  1: null,                 // Lundi
  2: [10, 30, 19, 0],       // Mardi
  3: [10, 30, 19, 0],       // Mercredi
  4: [10, 30, 19, 0],       // Jeudi
  5: [10, 30, 20, 0],       // Vendredi
  6: [9, 0, 18, 0],         // Samedi
};

const DAY_NAMES = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];

function computeOpenStatus() {
  const statusEl = document.getElementById("open-status");
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay();
  const todayHours = WEEKLY_HOURS[day];
  const minutesNow = now.getHours() * 60 + now.getMinutes();

  let isOpen = false;
  if (todayHours) {
    const openMinutes = todayHours[0] * 60 + todayHours[1];
    const closeMinutes = todayHours[2] * 60 + todayHours[3];
    isOpen = minutesNow >= openMinutes && minutesNow < closeMinutes;
  }

  if (isOpen) {
    statusEl.innerHTML = '<i class="fa-solid fa-circle-check"></i> Ouvert maintenant';
    statusEl.style.color = "#8ee6a8";
  } else {
    const nextOpening = findNextOpening(day, minutesNow);
    statusEl.innerHTML = `<i class="fa-solid fa-clock"></i> Fermé · ${nextOpening}`;
  }
}

function findNextOpening(startDay, minutesNow) {
  for (let offset = 0; offset < 8; offset++) {
    const day = (startDay + offset) % 7;
    const hours = WEEKLY_HOURS[day];
    if (!hours) continue;

    const openMinutes = hours[0] * 60 + hours[1];
    if (offset === 0 && minutesNow >= openMinutes) continue;

    const h = String(hours[0]).padStart(2, "0");
    const m = String(hours[1]).padStart(2, "0");
    const label = offset === 0 ? "aujourd'hui" : offset === 1 ? "demain" : DAY_NAMES[day];
    return `Ouvre à ${h} h ${m} ${label}`;
  }
  return "Horaires sur demande";
}

function highlightToday() {
  const table = document.getElementById("hours-table");
  if (!table) return;
  const today = new Date().getDay();
  const row = table.querySelector(`tr[data-day="${today}"]`);
  if (row) row.classList.add("is-today");
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  if (!form || !note) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      note.textContent = "Veuillez remplir votre nom et votre numéro de téléphone.";
      note.className = "form-note error";
      return;
    }

    // No backend is connected yet: confirm locally and invite the client to call directly.
    note.textContent = `Merci ${name} ! Votre demande a été notée. Nous vous recommandons aussi d'appeler le (438) 938-3630 pour confirmer rapidement.`;
    note.className = "form-note success";
    form.reset();
  });
}

function setupScrollSpy() {
  const navLinks = document.querySelectorAll(".main-nav a[href^='#']");
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close");
  const triggers = document.querySelectorAll(".gallery-item[data-full]");
  if (!lightbox || !lightboxImg || !triggers.length) return;

  const open = (src, alt, caption) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const img = trigger.querySelector("img");
      open(trigger.dataset.full, img ? img.alt : "", trigger.dataset.caption);
    });
  });

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}
