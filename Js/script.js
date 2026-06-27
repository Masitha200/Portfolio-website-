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
    try { localStorage.setItem('theme', newTheme); } catch(e) {}
    updateIcon();
  });
}

// ===== Custom Cursor Logic =====
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
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