const $ = s => document.querySelector(s);
const root = document.documentElement, log = $('#log'), nav = $('nav'), EDGE = 14;
const T = {
  en: { title: 'Heart Atlas', add: 'Add content', clear: 'Clear content', lang: 'عربي', added: 'Added item', remove: 'Remove',
        foot: '© 2026 Heart Atlas', m1: 'Animation', m2: '3D Heart', m3: 'Chambers',
        m4: 'Valves', m5: 'Rhythm', m6: 'Arteries', m7: 'Symptoms', m8: 'Sources' },
  ar: { title: 'أطلس القلب', add: 'إضافة محتوى', clear: 'مسح المحتوى', lang: 'English', added: 'عنصر مضاف', remove: 'إزالة',
        foot: '© 2026 أطلس القلب', m1: 'الحركة', m2: 'القلب', m3: 'الحجرات',
        m4: 'الصمامات', m5: 'النبض', m6: 'الشرايين', m7: 'الأعراض', m8: 'المراجع' }
};
let lang = 'en', count = 0;

// Animate #log from its current height to the height its content needs (0 when empty)
function fit() {
  const from = log.offsetHeight;
  log.style.height = 'auto';
  const to = log.offsetHeight;
  log.style.height = from + 'px';
  log.offsetHeight;                 // force reflow so the transition starts from `from`
  log.style.height = to + 'px';
}

// Sidebar minimum width = widest single word + the sidebar's own padding, so no word is ever cut
const ctx = document.createElement('canvas').getContext('2d');
function setMinWidth() {
  const links = nav.querySelectorAll('a'), a = getComputedStyle(links[0]), n = getComputedStyle(nav);
  ctx.font = `${a.fontStyle} ${a.fontWeight} ${a.fontSize} ${a.fontFamily}`;
  const widest = Math.max(...[...links].flatMap(l => l.textContent.trim().split(/\s+/)).map(w => ctx.measureText(w).width));
  const extra = ['paddingLeft', 'paddingRight'].reduce((s, k) => s + parseFloat(a[k]) + parseFloat(n[k]), 0)
    + Math.max(parseFloat(n.borderLeftWidth), parseFloat(n.borderRightWidth)) + 14; // 14px = scrollbar room
  root.style.setProperty('--min', Math.ceil(widest + extra) + 'px');
}

const chipText = (e, l) => {
  e.textContent = `${T[l].added} ${e.dataset.n}`;
  e.setAttribute('aria-label', `${T[l].remove}: ${T[l].added} ${e.dataset.n}`);
};

function setLang(l) {
  lang = l; root.lang = l; root.dir = l == 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-t]').forEach(e => e.textContent = T[l][e.dataset.t]);
  log.querySelectorAll('button').forEach(e => chipText(e, l));
  setMinWidth(); fit();
}

$('#lang').onclick = () => setLang(lang == 'en' ? 'ar' : 'en');
$('#add').onclick = () => {
  const b = document.createElement('button');
  b.dataset.n = ++count; chipText(b, lang);
  log.append(b); fit();
};
// Click any chip to remove just that one
log.onclick = e => {
  e.target.closest('button')?.remove();
  if (!log.children.length) count = 0;
  fit();
};
$('#clear').onclick = () => { log.replaceChildren(); count = 0; fit(); };
$('#top').onclick = () => $('main').scrollTo({ top: 0, behavior: 'smooth' });

// Sidebar resize: drag its inner edge (right edge in English, left edge in Arabic)
const nearEdge = e => {
  const r = nav.getBoundingClientRect();
  return (root.dir == 'rtl' ? e.clientX - r.left : r.right - e.clientX) < EDGE;
};
let drag = false;
nav.onpointerdown = e => { if (drag = nearEdge(e)) { nav.setPointerCapture(e.pointerId); e.preventDefault(); } };
nav.onpointermove = e => {
  if (!drag) return void (nav.style.cursor = nearEdge(e) ? 'col-resize' : '');
  root.style.setProperty('--sw', (root.dir == 'rtl' ? innerWidth - e.clientX : e.clientX) + 'px');
};
nav.onpointerup = nav.onpointercancel = () => drag = false;

addEventListener('resize', fit);                 // chips re-wrap when the window width changes
setLang('en');
document.fonts.ready.then(setMinWidth);          // re-measure once the real fonts have loaded
