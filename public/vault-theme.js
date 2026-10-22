try { const saved = localStorage.getItem('hidy-appearance'); if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved; } catch {}
document.addEventListener('DOMContentLoaded', () => {
 const control = document.getElementById('theme-toggle');
 if (!control) return;
 const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
 const update = () => { control.textContent = isDark() ? 'Light' : 'Dark'; control.setAttribute('aria-label', isDark() ? 'Use light appearance' : 'Use dark appearance'); };
 control.addEventListener('click', () => { const next = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = next; try { localStorage.setItem('hidy-appearance', next); } catch {} update(); });
 update();
});
