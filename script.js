// =====================================
// Footer year
// =====================================
document.getElementById("year").textContent = new Date().getFullYear();

// =====================================
// Elements
// =====================================
const themeBtn = document.getElementById("themeToggle");
const themeEmoji = document.getElementById("themeEmoji");
const themeSky = document.getElementById("themeSky");
const back = document.getElementById("backToTop");

// Mobile detection (same as your CSS breakpoint)
const isMobile = window.matchMedia("(max-width: 760px)").matches;

// =====================================
// Theme: load saved
// =====================================
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeEmoji.textContent = "☀️";
} else {
  themeEmoji.textContent = "🌙";
}

// =====================================
// Moon phases (cycles every time you go dark)
// =====================================
let moonPhaseIndex = Number(localStorage.getItem("moonPhaseIndex") || "0");
const moonPhases = [
  { emoji: "🌒", cut: 62 }, // thin crescent
  { emoji: "🌓", cut: 52 }, // half moon
  { emoji: "🌔", cut: 40 }  // gibbous-ish (still not full)
];

// =====================================
// Sky overlay animation trigger (DESKTOP ONLY)
// =====================================
function playSky(mode) {
  if (!themeSky) return;

  themeSky.classList.remove("to-light", "to-dark");
  void themeSky.offsetWidth; // restart animation reliably
  themeSky.classList.add(mode);

  setTimeout(() => {
    themeSky.classList.remove("to-light", "to-dark");
  }, 2800);
}

// =====================================
// Spawn ONE flying orb (sun/moon) and fly into icon (DESKTOP ONLY)
// =====================================
function spawnFlyingOrb(type) {
  const orb = document.createElement("div");
  orb.className = `flying-orb ${type}`;

  // Start position = horizon center
  orb.style.left = "50%";
  orb.style.top = "78%";

  // Destination = theme button center
  const r = themeBtn.getBoundingClientRect();
  orb.style.setProperty("--to-x", (r.left + r.width / 2) + "px");
  orb.style.setProperty("--to-y", (r.top + r.height / 2) + "px");

  // Apply moon phase cut + set emoji (only when moon)
  if (type === "moon") {
    const phase = moonPhases[moonPhaseIndex % moonPhases.length];
    orb.style.setProperty("--cut", phase.cut + "%");
    themeEmoji.textContent = phase.emoji;

    moonPhaseIndex = (moonPhaseIndex + 1) % moonPhases.length;
    localStorage.setItem("moonPhaseIndex", String(moonPhaseIndex));
  }

  // Performance hint
  orb.style.willChange = "transform,left,top,opacity";
  document.body.appendChild(orb);

  // Start flight after the "rise" moment
  setTimeout(() => orb.classList.add("fly"), 1250);

  // Icon pulse when orb "lands"
  setTimeout(() => {
    themeBtn.classList.remove("pulse");
    void themeBtn.offsetWidth;
    themeBtn.classList.add("pulse");
  }, 2050);

  // Cleanup orb
  setTimeout(() => orb.remove(), 2400);

  // Remove pulse class so it can replay next click
  setTimeout(() => themeBtn.classList.remove("pulse"), 2600);
}

// =====================================
// Theme toggle click
// Mobile: NO effects, smooth wallpaper (CSS handles)
// Desktop: sky + orb + pulse
// =====================================
themeBtn.addEventListener("click", () => {
  const goingLight = !document.body.classList.contains("light");

  // Desktop-only cinematic effects
  if (!isMobile) {
    playSky(goingLight ? "to-light" : "to-dark");
    spawnFlyingOrb(goingLight ? "sun" : "moon");
  }

  // Switch theme (still works on both)
  setTimeout(() => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");

    // Emoji update:
    // Light => Sun
    // Dark  => Moon (phase emoji on desktop, plain moon on mobile)
    if (isLight) {
      themeEmoji.textContent = "☀️";
    } else {
      if (isMobile) {
        themeEmoji.textContent = "🌙";
      }
      // On desktop, moon emoji already set by spawnFlyingOrb phase cycle
    }
  }, isMobile ? 0 : 900);
});

// =====================================
// Back to top show/hide
// =====================================
window.addEventListener("scroll", () => {
  if (!back) return;
  if (window.scrollY > 360) back.classList.add("show");
  else back.classList.remove("show");
});

// =====================================
// Reveal on scroll (blur-in)
// =====================================
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// =====================================
// Neon click ripple (DESKTOP ONLY)
// =====================================
if (!isMobile) {
  document.addEventListener("click", (e) => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;

    const ripple = document.createElement("div");
    ripple.className = "click-ripple";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// =====================================
// Magnetic hover (DESKTOP ONLY)
// =====================================
if (!isMobile) {
  (function magneticHover() {
    const targets = document.querySelectorAll(".btn, .icon-btn, .q");
    targets.forEach((el) => {
      const strength = el.classList.contains("icon-btn") ? 10 : 12;

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  })();
}
