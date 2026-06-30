/* ============================================================
   AUTH.JS – Login, Register, Session Management
   ============================================================ */

// ── Demo accounts (in production: replace with server-side auth) ──
const DEMO_ACCOUNTS = [
    // Penumpang
    { email: 'penumpang@demo.com',  password: 'demo1234', role: 'penumpang',    subrole: null,           nama: 'Budi Santoso' },
    // Admin Utama
    { email: 'admin@demo.com',      password: 'admin1234', role: 'admin',       subrole: 'admin_utama',  nama: 'Admin Utama' },
    // Tiketing
    { email: 'tiketing@demo.com',   password: 'tkt1234',   role: 'admin',       subrole: 'tiketing',     nama: 'Siti Tiketing' },
    // Pemilik Kapal
    { email: 'pemilik@demo.com',    password: 'kapal1234', role: 'admin',       subrole: 'pemilik_kapal',nama: 'Pak Haji Kapal' },
    // Dishub
    { email: 'dishub@demo.com',     password: 'hub1234',   role: 'admin',       subrole: 'dishub',       nama: 'Dinas Perhubungan' },
];

// ── Session helpers ──
function getSession() {
    try { return JSON.parse(sessionStorage.getItem('t1000_session')) || null; }
    catch { return null; }
}

function setSession(user) {
    sessionStorage.setItem('t1000_session', JSON.stringify(user));
}

function clearSession() {
    sessionStorage.removeItem('t1000_session');
}

function logout() {
    clearSession();
    window.location.href = 'index.html';
}

// ── Role display helpers ──
const ROLE_LABELS = {
    penumpang:    { label: 'Penumpang',    icon: '🧑‍✈️', color: '#1e5a99' },
    admin_utama:  { label: 'Admin Utama',  icon: '👑', color: '#7c3aed' },
    tiketing:     { label: 'Tiketing',     icon: '🎫', color: '#0a7a50' },
    pemilik_kapal:{ label: 'Pemilik Kapal',icon: '🚢', color: '#b45309' },
    dishub:       { label: 'Dishub',       icon: '🏛️', color: '#0050aa' },
};

function getRoleKey(user) {
    return user.subrole || user.role;
}

function getRoleLabel(user) {
    return ROLE_LABELS[getRoleKey(user)] || { label: user.role, icon: '👤', color: '#333' };
}

// ────────────────────────────────────────────────
//  LOGIN PAGE
// ────────────────────────────────────────────────
let selectedRole = null;
let selectedSubrole = 'admin_utama';

function selectRole(role) {
    selectedRole = role;
    const selector = document.getElementById('role-selector');
    const card     = document.getElementById('auth-card');
    const header   = document.getElementById('auth-card-header');
    const subroleWrap = document.getElementById('admin-subrole-wrap');
    const hint     = document.getElementById('auth-hint');

    if (!selector || !card) return;

    const meta = role === 'penumpang'
        ? { icon: '🧑‍✈️', title: 'Login Penumpang', desc: 'Masuk untuk memesan tiket & riwayat perjalanan' }
        : { icon: '🛡️',  title: 'Login Admin',      desc: 'Akses panel manajemen & operasional' };

    header.innerHTML = `
        <div class="auth-icon">${meta.icon}</div>
        <h2>${meta.title}</h2>
        <p>${meta.desc}</p>`;

    if (subroleWrap) subroleWrap.style.display = role === 'admin' ? 'block' : 'none';
    if (hint) { hint.textContent = ''; hint.className = 'auth-hint'; }

    // Show demo hint
    setTimeout(() => {
        if (hint) {
            if (role === 'penumpang') {
                hint.innerHTML = '💡 Demo: <b>penumpang@demo.com</b> / <b>demo1234</b>';
                hint.className = 'auth-hint success';
            } else {
                hint.innerHTML = '💡 Demo: <b>admin@demo.com</b> / <b>admin1234</b>';
                hint.className = 'auth-hint success';
            }
        }
    }, 100);

    selector.style.display = 'none';
    card.style.display = 'block';
}

function backToRoles() {
    document.getElementById('role-selector').style.display = 'block';
    document.getElementById('auth-card').style.display = 'none';
    selectedRole = null;
}

function selectSubrole(btn) {
    document.querySelectorAll('.subrole-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedSubrole = btn.dataset.role;

    // Update demo hint
    const emailMap = {
        admin_utama:   'admin@demo.com / admin1234',
        tiketing:      'tiketing@demo.com / tkt1234',
        pemilik_kapal: 'pemilik@demo.com / kapal1234',
        dishub:        'dishub@demo.com / hub1234',
    };
    const hint = document.getElementById('auth-hint');
    if (hint && emailMap[selectedSubrole]) {
        hint.innerHTML = '💡 Demo: <b>' + emailMap[selectedSubrole] + '</b>';
        hint.className = 'auth-hint success';
    }
}

function togglePassword() {
    const input = document.getElementById('login-pass');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function togglePasswordReg() {
    const input = document.getElementById('reg-pass');
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
}

function submitLogin(e) {
    e.preventDefault();
    const email    = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-pass').value;
    const hint     = document.getElementById('auth-hint');
    const btn      = document.getElementById('login-btn');

    // Loading state
    btn.textContent = 'Memverifikasi…';
    btn.disabled = true;

    setTimeout(() => {
        const account = DEMO_ACCOUNTS.find(a =>
            a.email === email &&
            a.password === password &&
            a.role === selectedRole &&
            (selectedRole === 'penumpang' || a.subrole === selectedSubrole)
        );

        if (account) {
            setSession(account);
            hint.innerHTML = '✅ Login berhasil! Mengalihkan…';
            hint.className = 'auth-hint success';
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
        } else {
            hint.innerHTML = '❌ Email, password, atau jabatan tidak sesuai.';
            hint.className = 'auth-hint error';
            btn.textContent = 'Masuk';
            btn.disabled = false;
        }
    }, 600);
}

// ────────────────────────────────────────────────
//  REGISTER PAGE
// ────────────────────────────────────────────────
function submitRegister(e) {
    e.preventDefault();
    const nama   = document.getElementById('reg-nama').value.trim();
    const email  = document.getElementById('reg-email').value.trim().toLowerCase();
    const pass   = document.getElementById('reg-pass').value;
    const pass2  = document.getElementById('reg-pass2').value;
    const hint   = document.getElementById('reg-hint');

    if (pass.length < 8) {
        hint.textContent = '❌ Password minimal 8 karakter.';
        hint.className = 'auth-hint error';
        return;
    }
    if (pass !== pass2) {
        hint.textContent = '❌ Konfirmasi password tidak cocok.';
        hint.className = 'auth-hint error';
        return;
    }

    // Simulate registration success
    hint.innerHTML = '✅ Pendaftaran berhasil! Silakan login.';
    hint.className = 'auth-hint success';
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
}

// ────────────────────────────────────────────────
//  NAVBAR SESSION INDICATOR (index.html)
// ────────────────────────────────────────────────
function initNavAuth() {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    const session = getSession();
    if (session) {
        const rl = getRoleLabel(session);
        navAuth.innerHTML = `
            <span class="nav-user-name">${rl.icon} ${session.nama.split(' ')[0]}</span>
            <a href="dashboard.html" class="btn-login" style="padding:0.45rem 1.1rem;font-size:0.82rem;">Dashboard</a>
            <button class="btn-logout-nav" onclick="logout()">Keluar</button>`;
    }
    // else: keeps the default "Masuk" link
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    initNavAuth();

    // If on login page and already logged in, redirect
    const onLogin = document.getElementById('login-form');
    if (onLogin && getSession()) window.location.href = 'dashboard.html';
});
