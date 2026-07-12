// ===== Theme Toggle Logic =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

function updateIcon() {
  if (htmlElement.getAttribute('data-theme') === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}
updateIcon();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch (e) { }
    updateIcon();
  });
}

// ===== Language Toggle Logic =====
const langToggle = document.getElementById('langToggle');

function updateLangButton() {
  if (langToggle) {
    if (htmlElement.getAttribute('data-lang') === 'si') {
      langToggle.textContent = 'EN';
    } else {
      langToggle.textContent = 'සිං';
    }
  }
}
updateLangButton();

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const currentLang = htmlElement.getAttribute('data-lang') || 'en';
    let newLang = currentLang === 'en' ? 'si' : 'en';
    htmlElement.setAttribute('data-lang', newLang);
    try { localStorage.setItem('lang', newLang); } catch (e) { }
    updateLangButton();
  });
}

// ===== Custom Cursor Logic =====
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline && !document.body.classList.contains('software-page')) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 300, fill: 'forwards' });
  });

  // ===== Mobile Menu Logic =====
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.className = 'fas fa-times';
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fas fa-bars';
      }
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fas fa-bars';
      });
    });
  }

  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '70px';
      cursorOutline.style.height = '70px';
      cursorOutline.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });
}

// ===== Poson Poya Day Special Animation & Greeting =====
(function initPosonCelebration() {
  const styles = `
    .poson-lantern {
      position: fixed;
      bottom: -100px;
      pointer-events: none;
      z-index: 9990;
      opacity: 0;
      animation: floatUp 22s linear forwards;
      filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.5));
    }
    
    @keyframes floatUp {
      0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      50% {
        transform: translateY(-50vh) translateX(var(--sway)) rotate(10deg);
        opacity: 0.8;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-110vh) translateX(calc(var(--sway) * 2)) rotate(-5deg);
        opacity: 0;
      }
    }
  `;

  // Inject styles
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // SVG representation of a traditional Sri Lankan Vesak/Poson Octagonal Lantern
  const lanternSVG = `
    <svg width="40" height="75" viewBox="0 0 40 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Central Gem / Diamond -> Main Frame -->
      <polygon points="20,5 34,19 20,33 6,19" fill="rgba(251, 191, 36, 0.35)" stroke="rgba(251, 191, 36, 0.85)" stroke-width="1.2"/>
      <polygon points="20,8 31,19 20,30 9,19" fill="rgba(249, 115, 22, 0.2)" stroke="rgba(249, 115, 22, 0.6)" stroke-width="0.8"/>
      <!-- Side triangles (traditional panels) with Buddhist Flag Colors -->
      <polygon points="20,5 20,19 34,19" fill="rgba(59, 130, 246, 0.2)" stroke="rgba(59, 130, 246, 0.5)" stroke-width="0.8"/>
      <polygon points="20,5 20,19 6,19" fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.5)" stroke-width="0.8"/>
      <polygon points="20,33 20,19 34,19" fill="rgba(16, 185, 129, 0.2)" stroke="rgba(16, 185, 129, 0.5)" stroke-width="0.8"/>
      <polygon points="20,33 20,19 6,19" fill="rgba(251, 191, 36, 0.2)" stroke="rgba(251, 191, 36, 0.5)" stroke-width="0.8"/>
      
      <!-- Under-hanging ribbons / tassels -->
      <path d="M20,33 Q18,48 21,58 T20,73" fill="none" stroke="rgba(251, 191, 36, 0.85)" stroke-width="1.2"/>
      <path d="M12,25 Q9,40 12,50 T10,65" fill="none" stroke="rgba(249, 115, 22, 0.7)" stroke-width="1"/>
      <path d="M28,25 Q31,40 28,50 T30,65" fill="none" stroke="rgba(249, 115, 22, 0.7)" stroke-width="1"/>
    </svg>
  `;

  function spawnLantern() {
    if (document.hidden) return;

    const lantern = document.createElement("div");
    lantern.className = "poson-lantern";
    lantern.innerHTML = lanternSVG;

    const size = Math.random() * 0.7 + 0.5; // Scale: 0.5 to 1.2
    const startX = Math.random() * 90 + 5; // Start: 5vw to 95vw to avoid offscreen crop
    const swayDistance = Math.random() * 60 - 30; // -30px to 30px
    const duration = Math.random() * 12 + 18; // Duration: 18s to 30s
    const delay = Math.random() * 2;

    lantern.style.left = `${startX}vw`;
    lantern.style.transform = `scale(${size})`;
    lantern.style.animationDuration = `${duration}s`;
    lantern.style.animationDelay = `${delay}s`;
    lantern.style.setProperty('--sway', `${swayDistance}px`);

    document.body.appendChild(lantern);

    setTimeout(() => {
      lantern.remove();
    }, (duration + delay) * 1000);
  }

  // Inject Greeting Badge into DOM
  const greetingEl = document.createElement("div");
  greetingEl.id = "posonGreeting";
  // Responsive bottom placement with glassmorphic styles
  greetingEl.className = "fixed bottom-6 left-6 z-[9995] p-4 rounded-2xl flex items-center gap-4 border border-yellow-500/20 max-w-[90vw] sm:max-w-sm shadow-[0_0_30px_rgba(234,179,8,0.1)] transition-all duration-300 hover:scale-102";
  greetingEl.style.cssText = "background: rgba(28, 25, 23, 0.75); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-sizing: border-box; color: var(--fg);";
  greetingEl.innerHTML = `
    <div class="relative flex-shrink-0">
        <!-- Glowing dynamic Lotus Icon -->
        <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 animate-pulse text-2xl" style="box-shadow: 0 0 10px rgba(234, 179, 8, 0.2);">
            🪷
        </span>
        <span class="absolute -top-1 -right-1 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
        </span>
    </div>
    <div class="flex-grow select-none">
        <h4 class="font-display font-bold text-sm text-yellow-400 uppercase tracking-wider">Blessed Poson Poya</h4>
        <p class="text-xs text-stone-300 mt-0.5 leading-relaxed font-sans">
            පින්බර පොසොන් පොහොය දිනයක් වේවා!<br>
            <span class="text-[10px] text-stone-500">Wishing you a peaceful Arahant Mahinda Commemoration Day.</span>
        </p>
    </div>
    <button onclick="document.getElementById('posonGreeting').remove()" class="text-stone-500 hover:text-stone-300 transition-colors p-1" aria-label="Close Greeting" style="cursor: pointer;">
        <i class="fas fa-times text-xs"></i>
    </button>
  `;
  document.body.appendChild(greetingEl);

  // Periodic lantern spawning logic
  for (let i = 0; i < 3; i++) {
    setTimeout(spawnLantern, i * 2000);
  }
  setInterval(spawnLantern, 6000);
})();