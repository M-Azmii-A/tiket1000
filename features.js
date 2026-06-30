/* ============================================================
   FEATURES.JS – Dark Mode, Notifications, Global Search,
                 Progress Bar, Back-to-Top, Mini Charts
   ============================================================ */

/* ════════════════════════════════════════
   PROGRESS BAR
════════════════════════════════════════ */
(function initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'progress-bar';
    document.body.prepend(bar);

    let prog = 0, interval;

    function startProgress() {
        prog = 0; bar.style.opacity = '1';
        interval = setInterval(() => {
            prog += Math.random() * 12;
            if (prog > 85) prog = 85;
            bar.style.width = prog + '%';
        }, 120);
    }
    function endProgress() {
        clearInterval(interval);
        prog = 100; bar.style.width = '100%';
        setTimeout(() => { bar.style.opacity = '0'; bar.style.width = '0%'; }, 400);
    }

    // Simulate page load
    startProgress();
    window.addEventListener('load', endProgress);

    // Intercept link clicks for SPA-feel
    document.addEventListener('click', e => {
        const a = e.target.closest('a[href]');
        if (a && !a.href.startsWith('#') && !a.target && !e.ctrlKey && !e.metaKey) {
            const url = a.href;
            if (url && !url.startsWith('javascript')) {
                startProgress();
                setTimeout(endProgress, 600);
            }
        }
    });

    window._endProgress = endProgress;
    window._startProgress = startProgress;
})();


/* ════════════════════════════════════════
   DARK MODE
════════════════════════════════════════ */
(function initDarkMode() {
    const saved = localStorage.getItem('t1000_darkmode');
    if (saved === 'true') document.body.classList.add('dark-mode');

    const btn = document.createElement('button');
    btn.id = 'dark-mode-toggle-btn';
    btn.className = 'dark-mode-toggle';
    btn.title = 'Toggle Dark Mode';
    btn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    btn.setAttribute('aria-label', 'Toggle Dark Mode');
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        btn.innerHTML = isDark ? '☀️' : '🌙';
        localStorage.setItem('t1000_darkmode', isDark);
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { dark: isDark } }));
    });
})();


/* ════════════════════════════════════════
   BACK TO TOP
════════════════════════════════════════ */
(function initBackToTop() {
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.innerHTML = '▲';
    btn.title = 'Kembali ke atas';
    btn.setAttribute('aria-label', 'Kembali ke atas');
    document.body.appendChild(btn);

    const scrollable = document.querySelector('.dash-main') || window;

    const onScroll = () => {
        const y = scrollable === window ? window.scrollY : scrollable.scrollTop;
        btn.classList.toggle('visible', y > 400);
    };
    scrollable.addEventListener('scroll', onScroll);

    btn.addEventListener('click', () => {
        if (scrollable === window) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            scrollable.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
})();


/* ════════════════════════════════════════
   NOTIFICATION SYSTEM
════════════════════════════════════════ */
const Notifications = (() => {
    // Demo notification data
    const notifData = [
        { id:1, icon:'🎫', title:'Tiket TKT-347 berhasil dikonfirmasi', time:'2 menit lalu',      unread:true },
        { id:2, icon:'💳', title:'Pembayaran GoPay Rp 150.000 diterima', time:'15 menit lalu',    unread:true },
        { id:3, icon:'⚠️', title:'Sertifikat KM Kelapa Jaya akan kadaluarsa 30 Apr 2026', time:'1 jam lalu', unread:true },
        { id:4, icon:'🚢', title:'KM Harapan Baru: kapasitas penuh hari ini', time:'2 jam lalu',  unread:false },
        { id:5, icon:'📊', title:'Laporan harian siap diunduh', time:'Kemarin 18:00',              unread:false },
        { id:6, icon:'👤', title:'Pengguna baru Andi Pratama mendaftar', time:'Kemarin 14:30',    unread:false },
    ];

    let unreadCount = notifData.filter(n => n.unread).length;
    let isOpen = false;

    function init(container) {
        if (!container) return;
        container.innerHTML = `
            <div class="notif-wrap" id="notif-wrap">
                <button class="notif-bell" onclick="Notifications.toggle()" aria-label="Notifikasi" title="Notifikasi">
                    🔔
                    <span class="notif-badge" id="notif-badge">${unreadCount}</span>
                </button>
                <div class="notif-dropdown" id="notif-dropdown">
                    <div class="notif-dropdown-header">
                        <span>🔔 NOTIFIKASI</span>
                        <button class="notif-clear-btn" onclick="Notifications.markAllRead()">Tandai Semua Dibaca</button>
                    </div>
                    <div class="notif-list" id="notif-list"></div>
                    <div class="notif-footer" onclick="Notifications.close()">Lihat Semua Notifikasi</div>
                </div>
            </div>`;
        renderList();
        // Close on outside click
        document.addEventListener('click', e => {
            if (isOpen && !document.getElementById('notif-wrap')?.contains(e.target)) close();
        });
    }

    function renderList() {
        const list = document.getElementById('notif-list');
        if (!list) return;
        list.innerHTML = notifData.map(n => `
            <div class="notif-item${n.unread?' unread':''}" onclick="Notifications.read(${n.id})">
                <span class="notif-icon">${n.icon}</span>
                <div class="notif-content">
                    <div class="notif-title">${n.title}</div>
                    <div class="notif-time">${n.time}</div>
                </div>
                <div class="notif-dot"></div>
            </div>`).join('');
    }

    function toggle() {
        isOpen ? close() : open();
    }
    function open() {
        document.getElementById('notif-dropdown')?.classList.add('open');
        isOpen = true;
    }
    function close() {
        document.getElementById('notif-dropdown')?.classList.remove('open');
        isOpen = false;
    }
    function read(id) {
        const n = notifData.find(x => x.id === id);
        if (n && n.unread) {
            n.unread = false;
            unreadCount = Math.max(0, unreadCount - 1);
            updateBadge();
            renderList();
        }
    }
    function markAllRead() {
        notifData.forEach(n => n.unread = false);
        unreadCount = 0;
        updateBadge();
        renderList();
    }
    function updateBadge() {
        const badge = document.getElementById('notif-badge');
        if (!badge) return;
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    function add(icon, title, time = 'Baru saja') {
        const id = Date.now();
        notifData.unshift({ id, icon, title, time, unread: true });
        unreadCount++;
        updateBadge();
        renderList();
    }

    return { init, toggle, open, close, read, markAllRead, add };
})();


/* ════════════════════════════════════════
   GLOBAL SEARCH (dashboard)
════════════════════════════════════════ */
const GlobalSearch = (() => {
    const searchData = [
        // Jadwal
        { icon:'🚢', label:'KM Seribu Jaya – Pulau Tidung',   sub:'Jadwal 08:00 WIB',   action:'jadwal' },
        { icon:'🚢', label:'KM Ancol Indah – Pulau Pramuka',  sub:'Jadwal 09:00 WIB',   action:'jadwal' },
        { icon:'🚢', label:'KM Harapan Baru – Pulau Harapan', sub:'Jadwal 10:00 WIB',   action:'jadwal' },
        { icon:'🚢', label:'KM Pari Mas – Pulau Pari',        sub:'Jadwal 11:00 WIB',   action:'jadwal' },
        // Tiket
        { icon:'🎫', label:'TKT-347 – Budi Santoso',          sub:'Pulau Tidung, 17 Apr 2026', action:'tiket' },
        { icon:'🎫', label:'TKT-346 – Dewi Rahayu',           sub:'Pulau Pramuka, 17 Apr 2026',action:'tiket' },
        { icon:'🎫', label:'TKT-345 – Andi Pratama',          sub:'Pulau Kelapa, 17 Apr 2026', action:'tiket' },
        // Menu
        { icon:'📊', label:'Laporan & Statistik',  sub:'Menu Dashboard',  action:'laporan' },
        { icon:'👥', label:'Kelola Pengguna',       sub:'Menu Admin',      action:'users' },
        { icon:'🔐', label:'Hak Akses Admin',       sub:'Menu Admin',      action:'akses' },
        { icon:'💰', label:'Pendapatan Kapal',      sub:'Menu Pemilik',    action:'pendapatan' },
        { icon:'⚠️', label:'Laporan Insiden',       sub:'Menu Dishub',     action:'insiden' },
        { icon:'📄', label:'Manifes Penumpang',     sub:'Menu Tiketing',   action:'manifes' },
        { icon:'⚙️', label:'Pengaturan Sistem',    sub:'Menu Admin Utama',action:'setting' },
        // Pages
        { icon:'🏠', label:'Beranda / Landing Page', sub:'Halaman utama',  action:'home_page' },
        { icon:'🔐', label:'Halaman Login',           sub:'Autentikasi',    action:'login_page' },
    ];

    function init(inputEl) {
        if (!inputEl) return;

        const dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        dropdown.id = 'search-dropdown';
        inputEl.parentElement.appendChild(dropdown);

        inputEl.addEventListener('input', () => query(inputEl.value));
        inputEl.addEventListener('focus', () => { if (inputEl.value) query(inputEl.value); });
        inputEl.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

        document.addEventListener('click', e => {
            if (!inputEl.parentElement.contains(e.target)) closeSearch();
        });
    }

    function query(q) {
        const dropdown = document.getElementById('search-dropdown');
        if (!dropdown) return;
        q = q.trim().toLowerCase();
        if (!q) { closeSearch(); return; }

        const results = searchData.filter(d =>
            d.label.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q)
        ).slice(0, 6);

        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-no-result">🔍 Tidak ada hasil untuk "<strong>${q}</strong>"</div>`;
        } else {
            dropdown.innerHTML = results.map(r => `
                <div class="search-result-item" onclick="GlobalSearch.navigate('${r.action}')">
                    <span class="search-result-icon">${r.icon}</span>
                    <div>
                        <div class="search-result-label">${highlight(r.label, q)}</div>
                        <div class="search-result-sub">${r.sub}</div>
                    </div>
                </div>`).join('');
        }
        dropdown.classList.add('open');
    }

    function highlight(text, q) {
        const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(re, '<mark style="background:#fef9c3;border-radius:2px;padding:0 1px;">$1</mark>');
    }

    function closeSearch() {
        document.getElementById('search-dropdown')?.classList.remove('open');
    }

    function navigate(action) {
        closeSearch();
        const input = document.getElementById('global-search-input');
        if (input) input.value = '';
        // Try to call showSection if it exists (dashboard context)
        if (typeof showSection === 'function') {
            showSection(action);
            // Also trigger panel render if it exists
            const clickTarget = document.getElementById('nav-' + action);
            if (clickTarget) clickTarget.click();
        } else if (action === 'home_page') {
            window.location.href = 'index.html';
        } else if (action === 'login_page') {
            window.location.href = 'login.html';
        }
    }

    return { init, query, closeSearch, navigate };
})();


/* ════════════════════════════════════════
   MINI CHART HELPERS
════════════════════════════════════════ */
function renderMiniChart(containerId, data, maxVal) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = maxVal || Math.max(...data.map(d => d.value));
    el.innerHTML = data.map(d => {
        const pct = max > 0 ? Math.round((d.value / max) * 100) : 0;
        return `<div class="mini-bar" style="height:${Math.max(pct, 4)}%;" title="${d.label}: ${d.display}">
            <span class="bar-tooltip">${d.label}<br>${d.display}</span>
        </div>`;
    }).join('');
}

function renderDonutChart(containerId, slices) {
    // slices: [{label, pct, color}]  – pct sum must be 100
    const el = document.getElementById(containerId);
    if (!el) return;
    let cum = 0;
    const stops = slices.map(s => {
        const start = cum;
        cum += s.pct;
        return `${s.color} ${start}% ${cum}%`;
    });
    // Set CSS vars on parent .donut-chart
    const chart = el.querySelector('.donut-chart');
    if (chart) {
        chart.style.background = `conic-gradient(${stops.join(', ')})`;
    }
    // Legend
    const legend = el.querySelector('.donut-legend');
    if (legend) {
        legend.innerHTML = slices.map(s => `
            <div class="donut-legend-item">
                <div class="donut-dot" style="background:${s.color};"></div>
                <span>${s.label} <strong>${s.pct}%</strong></span>
            </div>`).join('');
    }
}


/* ════════════════════════════════════════
   DASHBOARD TOPBAR INJECTION
   (adds search + notifications to dashboard)
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const topbar = document.querySelector('.dash-topbar');
    if (!topbar) return;

    // Inject search bar + notification bell
    const rightDiv = document.createElement('div');
    rightDiv.className = 'dash-topbar-right';
    rightDiv.innerHTML = `
        <div class="global-search-wrap">
            <span class="global-search-icon">🔍</span>
            <input type="text" id="global-search-input"
                class="global-search-input"
                placeholder="Cari tiket, kapal, menu…"
                autocomplete="off">
        </div>
        <div id="notif-container"></div>`;
    topbar.appendChild(rightDiv);

    // Init search
    GlobalSearch.init(document.getElementById('global-search-input'));

    // Init notifications (only when session exists)
    if (typeof getSession === 'function' && getSession()) {
        Notifications.init(document.getElementById('notif-container'));
    }
});


/* ════════════════════════════════════════
   NAVBAR SEARCH (index.html)
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    if (!nav || document.querySelector('.dash-layout')) return; // skip on dashboard

    // Inject search into navbar
    const searchWrap = document.createElement('div');
    searchWrap.className = 'global-search-wrap';
    searchWrap.style.cssText = 'position:relative;max-width:220px;';
    searchWrap.innerHTML = `
        <span class="global-search-icon" style="left:0.7rem;">🔍</span>
        <input type="text" id="nav-search-input" class="global-search-input"
            placeholder="Cari jadwal…" autocomplete="off"
            style="font-size:0.82rem;padding:0.45rem 0.8rem 0.45rem 2rem;">`;

    const navAuth = document.getElementById('nav-auth');
    if (navAuth) nav.insertBefore(searchWrap, navAuth);

    const navInput = document.getElementById('nav-search-input');
    if (!navInput) return;

    // Simple nav search – filter table rows
    const dropdown = document.createElement('div');
    dropdown.className = 'search-results-dropdown';
    dropdown.style.top = 'calc(100% + 0.5rem)';
    searchWrap.appendChild(dropdown);

    navInput.addEventListener('input', () => {
        const q = navInput.value.trim().toLowerCase();
        if (!q) { dropdown.innerHTML=''; dropdown.classList.remove('open'); return; }

        const rows = document.querySelectorAll('#jadwal tbody tr');
        let found = [];
        rows.forEach(r => {
            const cells = [...r.querySelectorAll('td')];
            const text  = cells.map(c=>c.textContent).join(' ').toLowerCase();
            if (text.includes(q)) {
                found.push({
                    tujuan:  cells[1]?.textContent || '',
                    jam:     cells[2]?.textContent || '',
                    harga:   cells[4]?.textContent || '',
                    pelabuhan: cells[0]?.textContent || '',
                });
            }
        });

        if (found.length === 0) {
            dropdown.innerHTML = `<div class="search-no-result">Tidak ada jadwal untuk "<b>${q}</b>"</div>`;
        } else {
            dropdown.innerHTML = found.slice(0,5).map(f => `
                <div class="search-result-item" onclick="
                    document.getElementById('jadwal').scrollIntoView({behavior:'smooth'});
                    document.getElementById('nav-search-input').value='';
                    document.querySelector('.search-results-dropdown').classList.remove('open');
                ">
                    <span class="search-result-icon">🚢</span>
                    <div>
                        <div class="search-result-label">${f.pelabuhan} → ${f.tujuan}</div>
                        <div class="search-result-sub">${f.jam} &bull; ${f.harga}</div>
                    </div>
                </div>`).join('');
        }
        dropdown.classList.add('open');
    });

    document.addEventListener('click', e => {
        if (!searchWrap.contains(e.target)) dropdown.classList.remove('open');
    });
});


/* ════════════════════════════════════════
   ENHANCE DASHBOARD: inject charts into
   Laporan & Statistik panel
════════════════════════════════════════ */
window.addEventListener('dashboardPanelRendered', e => {
    if (e.detail?.panel !== 'laporan') return;

    // Inject mini chart into pendapatan per tujuan section
    setTimeout(() => {
        const chartWrap = document.getElementById('mini-chart-pendapatan');
        if (chartWrap) {
            renderMiniChart('mini-chart-pendapatan', [
                { label:'Tidung',      value:450000, display:'Rp 450.000' },
                { label:'Pramuka',     value:390000, display:'Rp 390.000' },
                { label:'Harapan',     value:280000, display:'Rp 280.000' },
                { label:'Pari',        value:360000, display:'Rp 360.000' },
                { label:'Untung Jawa', value:400000, display:'Rp 400.000' },
                { label:'Kelapa',      value:160000, display:'Rp 160.000' },
            ]);
        }

        const donutWrap = document.getElementById('donut-pembayaran');
        if (donutWrap) {
            renderDonutChart('donut-pembayaran', [
                { label:'GoPay',    pct:28, color:'var(--palm)' },
                { label:'BCA',      pct:22, color:'var(--ocean-light)' },
                { label:'QRIS',     pct:19, color:'var(--coral)' },
                { label:'OVO',      pct:15, color:'#a855f7' },
                { label:'Lainnya',  pct:16, color:'#f59e0b' },
            ]);
        }
    }, 50);
});
