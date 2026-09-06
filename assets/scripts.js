// ==========================================================================
// 다크모드 토글
// - 사용자가 직접 고른 테마는 <html data-theme>와 localStorage에 저장
// - 저장값이 없으면 OS 설정(prefers-color-scheme)을 따름 (CSS가 처리)
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const osDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function isDarkNow() {
  const forced = document.documentElement.getAttribute('data-theme');
  if (forced) return forced === 'dark';
  return osDarkQuery.matches;
}

// 현재 테마의 반대를 아이콘으로 보여줌 (다크일 때 해, 라이트일 때 달)
function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  icon.className = isDarkNow() ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

// 수동 선택이 없는 상태에서 OS 테마가 바뀌면 아이콘도 따라 바뀌도록
osDarkQuery.addEventListener('change', updateThemeIcon);

themeToggle.addEventListener('click', () => {
  // 전환 순간에만 배경색 트랜지션을 걸어 부드럽게 바뀌도록 (styles.css .theme-anim)
  document.documentElement.classList.add('theme-anim');
  const next = isDarkNow() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
  themeToggle.blur();  // 모바일에서 탭 후 포커스 하이라이트가 남지 않도록
  setTimeout(() => document.documentElement.classList.remove('theme-anim'), 300);
});

// ==========================================================================
// 사이드바 내비 스크롤스파이 — 화면 상단(120px 선)을 지난 마지막 섹션을 활성화
// ==========================================================================
const navLinks = document.querySelectorAll('#sidebar-nav a');
const navSections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href')));

function updateActiveNav() {
  let idx = 0;
  navSections.forEach((sec, i) => {
    if (sec && sec.getBoundingClientRect().top <= 120) idx = i;
  });
  // 페이지 맨 아래에 닿으면 마지막 섹션이 짧아도 활성화되도록
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) {
    idx = navSections.length - 1;
  }
  navLinks.forEach((a, i) => a.classList.toggle('active', i === idx));
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
