/* =====================================================================
   Engagement invite — a little interactivity, zero libraries.
   The only thing you MUST set is CONFIG.eventDate below.
   ===================================================================== */
const CONFIG = {
  // Date & time of your celebration (guest's local time).
  // Format: "YYYY-MM-DDTHH:MM:SS"  (24-hour clock)
  eventDate: "2026-08-16T10:00:00",
};

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- Countdown ---------- */
(function initCountdown() {
  const grid = document.getElementById("countdown-grid");
  if (!grid) return;

  const target = new Date(CONFIG.eventDate).getTime();

  if (isNaN(target)) {
    grid.innerHTML =
      '<p style="color:var(--ink-soft)">Set your date in <code>script.js</code> &#128578;</p>';
    return;
  }

  const units = [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Minutes" },
    { key: "seconds", label: "Seconds" },
  ];

  const nums = {};
  units.forEach((u) => {
    const box = document.createElement("div");
    box.className = "count-box";
    box.innerHTML =
      '<div class="count-box__num" id="cd-' + u.key + '">--</div>' +
      '<div class="count-box__label">' + u.label + "</div>";
    grid.appendChild(box);
    nums[u.key] = box.querySelector(".count-box__num");
  });

  const timer = setInterval(tick, 1000);
  tick();

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(nums).forEach((n) => (n.textContent = "0"));
      clearInterval(timer);
      grid.insertAdjacentHTML(
        "afterend",
        '<p style="text-align:center;margin-top:1.5rem;color:var(--rose-dark)">The day is here! &#129346;</p>'
      );
      return;
    }
    nums.days.textContent = Math.floor(diff / 86400000);
    nums.hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0");
    nums.minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    nums.seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  }
})();

/* ---------- Scroll reveal ---------- */
(function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------- Floating hearts ---------- */
const HEART_EMOJIS = ["💕", "💖", "💗", "🌸", "❤️"];
const heartsLayer = document.getElementById("hearts");

function spawnHeart(x) {
  if (!heartsLayer) return;
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  heart.style.left = (x != null ? x : Math.random() * window.innerWidth) + "px";
  heart.style.fontSize = 0.9 + Math.random() * 1.6 + "rem";
  heart.style.animationDuration = 6 + Math.random() * 5 + "s";
  heart.style.setProperty("--drift", (Math.random() - 0.5) * 120 + "px");
  heart.style.setProperty("--spin", Math.random() * 60 - 30 + "deg");
  heartsLayer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

// Gentle ambient hearts (skipped if the guest prefers reduced motion).
if (!prefersReducedMotion) {
  setInterval(() => spawnHeart(), 1400);
}

/* ---------- Button burst ---------- */
const btn = document.getElementById("heart-btn");
if (btn) {
  btn.addEventListener("click", () => {
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 28; i++) {
      setTimeout(() => spawnHeart(rect.left + Math.random() * rect.width), i * 40);
    }
  });
}
