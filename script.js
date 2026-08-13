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

// Gentle ambient floating symbols — calm & auspicious (blossom, lotus).
const FLOAT_SYMBOLS = ["🌸", "🌼"];
if (!prefersReducedMotion && heartsLayer) {
  setInterval(() => {
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent = FLOAT_SYMBOLS[Math.floor(Math.random() * FLOAT_SYMBOLS.length)];
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.fontSize = 1 + Math.random() * 1.1 + "rem";
    el.style.animationDuration = 9 + Math.random() * 6 + "s";
    el.style.setProperty("--drift", (Math.random() - 0.5) * 100 + "px");
    el.style.setProperty("--spin", Math.random() * 40 - 20 + "deg");
    heartsLayer.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }, 2200);
}

/* ---------- Button burst ---------- */
const btn = document.getElementById("heart-btn");
if (btn) {
  btn.addEventListener("click", () => {
    const rect = btn.getBoundingClientRect();
    for (let i = 0; i < 110; i++) {
      setTimeout(() => spawnHeart(Math.random() * window.innerWidth), i * 28);
    }
  });
}

/* ---------- Peeking teddies (a smiling pair, at random, from the sides) ---------- */
if (!prefersReducedMotion) {
  // Female teddy: bow, eyelashes, rosy cheeks, warm caramel fur.
  const TEDDY_FEMALE =
    '<svg viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="30" cy="30" r="16" fill="#b57c4e"/>' +
    '<circle cx="90" cy="30" r="16" fill="#b57c4e"/>' +
    '<circle cx="30" cy="30" r="8" fill="#8f5f39"/>' +
    '<circle cx="90" cy="30" r="8" fill="#8f5f39"/>' +
    '<circle cx="60" cy="62" r="44" fill="#c99165"/>' +
    '<circle cx="34" cy="72" r="6.5" fill="#ef7fa4" opacity="0.6"/>' +
    '<circle cx="86" cy="72" r="6.5" fill="#ef7fa4" opacity="0.6"/>' +
    '<ellipse cx="60" cy="74" rx="24" ry="18" fill="#f0d6b4"/>' +
    '<path d="M41 55 Q45 58 49 55" stroke="#3a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M71 55 Q75 58 79 55" stroke="#3a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="60" cy="66" rx="6" ry="4.5" fill="#3a2a1a"/>' +
    '<path d="M51 75 Q60 82 69 75" stroke="#3a2a1a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<polygon points="79,9 79,25 90,17" fill="#ef7fa4"/>' +
    '<polygon points="101,9 101,25 90,17" fill="#ef7fa4"/>' +
    '<circle cx="90" cy="17" r="3.5" fill="#e0648f"/>' +
    '<circle cx="30" cy="112" r="13" fill="#b57c4e"/>' +
    '<circle cx="90" cy="112" r="13" fill="#b57c4e"/>' +
    "</svg>";

  // Male teddy: bow-tie, eyebrows, darker fur.
  const TEDDY_MALE =
    '<svg viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="30" cy="30" r="16" fill="#9a6738"/>' +
    '<circle cx="90" cy="30" r="16" fill="#9a6738"/>' +
    '<circle cx="30" cy="30" r="8" fill="#75492a"/>' +
    '<circle cx="90" cy="30" r="8" fill="#75492a"/>' +
    '<circle cx="60" cy="62" r="44" fill="#b07b4a"/>' +
    '<circle cx="34" cy="72" r="5.5" fill="#e08a6a" opacity="0.35"/>' +
    '<circle cx="86" cy="72" r="5.5" fill="#e08a6a" opacity="0.35"/>' +
    '<ellipse cx="60" cy="74" rx="24" ry="18" fill="#e6c9a1"/>' +
    '<path d="M41 55 Q45 58 49 55" stroke="#3a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M71 55 Q75 58 79 55" stroke="#3a2a1a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="60" cy="66" rx="6" ry="4.5" fill="#3a2a1a"/>' +
    '<path d="M51 75 Q60 82 69 75" stroke="#3a2a1a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<circle cx="30" cy="112" r="13" fill="#9a6738"/>' +
    '<circle cx="90" cy="112" r="13" fill="#9a6738"/>' +
    '<polygon points="48,101 48,113 60,107" fill="#4a6fa5"/>' +
    '<polygon points="72,101 72,113 60,107" fill="#4a6fa5"/>' +
    '<circle cx="60" cy="107" r="3.5" fill="#3a567f"/>' +
    "</svg>";

  const teddyLayer = document.createElement("div");
  teddyLayer.className = "teddy-layer";
  teddyLayer.setAttribute("aria-hidden", "true");
  document.body.appendChild(teddyLayer);

  function makeTeddy(side, svg) {
    const teddy = document.createElement("div");
    teddy.className = "teddy teddy--" + side;
    teddy.setAttribute("aria-hidden", "true");
    teddy.innerHTML = svg;
    teddyLayer.appendChild(teddy);
    return teddy;
  }

  // One peek: slide in from the edge, a little wave, slide back out.
  function peekKeyframes(side) {
    const hidden = side === "left" ? "translateX(-130%)" : "translateX(130%)";
    const inPos = side === "left" ? "translateX(-8%)" : "translateX(8%)";
    const settle = side === "left" ? "translateX(-16%)" : "translateX(16%)";
    const rH = side === "left" ? "rotate(-12deg)" : "rotate(12deg)";
    const rI = side === "left" ? "rotate(6deg)" : "rotate(-6deg)";
    const rS = side === "left" ? "rotate(-2deg)" : "rotate(2deg)";
    return [
      { transform: hidden + " " + rH },
      { transform: inPos + " " + rI, offset: 0.2 },
      { transform: settle + " " + rS, offset: 0.36 },
      { transform: inPos + " " + rI, offset: 0.52 },
      { transform: settle + " " + rS, offset: 0.68 },
      { transform: hidden + " " + rH },
    ];
  }

  // Peek at random gaps, forever.
  function loopPeek(teddy, side) {
    const gap = 2500 + Math.random() * 2000; // 2.5–8.5s between peeks
    setTimeout(() => {
      teddy.style.bottom = 10 + Math.random() * 55 + "vh"; // vary the peek height
      const anim = teddy.animate(peekKeyframes(side), {
        duration: 3000 + Math.random() * 1200,
        easing: "ease-in-out",
      });
      anim.onfinish = () => loopPeek(teddy, side);
    }, gap);
  }

  const leftTeddy = makeTeddy("left", TEDDY_FEMALE);
  const rightTeddy = makeTeddy("right", TEDDY_MALE);
  loopPeek(leftTeddy, "left");
  loopPeek(rightTeddy, "right");
}
