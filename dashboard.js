/* ============================================================
   DASHBOARD.JS – Full-featured role-based dashboard
   ============================================================ */

// ── Shared data store (simulates a lightweight in-memory DB) ──
const DB = {
  jadwal: [
    { id:1, kapal:'KM Seribu Jaya',  tujuan:'Pulau Tidung',      jam:'08:00', durasi:'2.5 Jam', harga:150000, kapasitas:80, terisi:72, status:'Beroperasi' },
    { id:2, kapal:'KM Ancol Indah',  tujuan:'Pulau Pramuka',     jam:'09:00', durasi:'2 Jam',   harga:130000, kapasitas:60, terisi:45, status:'Beroperasi' },
    { id:3, kapal:'KM Harapan Baru', tujuan:'Pulau Harapan',     jam:'10:00', durasi:'2.5 Jam', harga:140000, kapasitas:80, terisi:80, status:'Penuh' },
    { id:4, kapal:'KM Pari Mas',     tujuan:'Pulau Pari',        jam:'11:00', durasi:'1.5 Jam', harga:120000, kapasitas:60, terisi:31, status:'Beroperasi' },
    { id:5, kapal:'KM Untung Jaya',  tujuan:'Pulau Untung Jawa', jam:'12:00', durasi:'1 Jam',   harga:100000, kapasitas:50, terisi:28, status:'Beroperasi' },
    { id:6, kapal:'KM Kelapa Jaya',  tujuan:'Pulau Kelapa',      jam:'13:00', durasi:'3 Jam',   harga:160000, kapasitas:80, terisi:55, status:'Beroperasi' },
  ],
  tiket: [
    { id:'TKT-347', nama:'Budi Santoso',  tujuan:'Pulau Tidung',      tgl:'17 Apr 2026', jam:'08:00', jml:1, bayar:'GoPay',    total:150000, status:'lunas' },
    { id:'TKT-346', nama:'Dewi Rahayu',   tujuan:'Pulau Pramuka',     tgl:'17 Apr 2026', jam:'09:00', jml:2, bayar:'BCA',      total:260000, status:'pending' },
    { id:'TKT-345', nama:'Andi Pratama',  tujuan:'Pulau Kelapa',      tgl:'17 Apr 2026', jam:'13:00', jml:1, bayar:'QRIS',     total:160000, status:'lunas' },
    { id:'TKT-344', nama:'Sari Melati',   tujuan:'Pulau Pari',        tgl:'16 Apr 2026', jam:'11:00', jml:3, bayar:'OVO',      total:360000, status:'refund' },
    { id:'TKT-343', nama:'Hendra K.',     tujuan:'Pulau Harapan',     tgl:'16 Apr 2026', jam:'10:00', jml:2, bayar:'Mandiri',  total:280000, status:'lunas' },
    { id:'TKT-342', nama:'Lina Sari',     tujuan:'Pulau Tidung',      tgl:'15 Apr 2026', jam:'08:00', jml:1, bayar:'Dana',     total:150000, status:'lunas' },
    { id:'TKT-341', nama:'Rudi Hartono',  tujuan:'Pulau Untung Jawa', tgl:'15 Apr 2026', jam:'12:00', jml:4, bayar:'BRI',      total:400000, status:'lunas' },
    { id:'TKT-340', nama:'Putri Ayu',     tujuan:'Pulau Pramuka',     tgl:'14 Apr 2026', jam:'09:00', jml:1, bayar:'ShopeePay',total:130000, status:'lunas' },
  ],
  kapal: [
    { id:1, nama:'KM Seribu Jaya',  operator:'PT Lautan Maju', kapasitas:80, rute:'Ancol → Tidung',       awak:5, kondisi:'Baik',      sertifikat:'Des 2026', status:'Beroperasi' },
    { id:2, nama:'KM Ancol Indah',  operator:'PT Lautan Maju', kapasitas:60, rute:'Ancol → Pramuka',      awak:4, kondisi:'Baik',      sertifikat:'Nov 2026', status:'Beroperasi' },
    { id:3, nama:'KM Harapan Baru', operator:'CV Nusantara',   kapasitas:80, rute:'Ancol → Harapan',      awak:5, kondisi:'Baik',      sertifikat:'Okt 2026', status:'Beroperasi' },
    { id:4, nama:'KM Pari Mas',     operator:'CV Nusantara',   kapasitas:60, rute:'Ancol → Pari',         awak:4, kondisi:'Baik',      sertifikat:'Sep 2026', status:'Beroperasi' },
    { id:5, nama:'KM Untung Jaya',  operator:'PT Marina',      kapasitas:50, rute:'Ancol → Untung Jawa',  awak:3, kondisi:'Baik',      sertifikat:'Agu 2026', status:'Beroperasi' },
    { id:6, nama:'KM Kelapa Jaya',  operator:'PT Marina',      kapasitas:80, rute:'Ancol → Kelapa',       awak:5, kondisi:'Perawatan', sertifikat:'Apr 2026', status:'Docking' },
  ],
  pengguna: [
    { id:1, nama:'Budi Santoso',   email:'penumpang@demo.com', role:'Penumpang',    tgl:'01 Jan 2026', status:'Aktif' },
    { id:2, nama:'Siti Tiketing',  email:'tiketing@demo.com',  role:'Tiketing',     tgl:'15 Des 2025', status:'Aktif' },
    { id:3, nama:'Pak Haji Kapal', email:'pemilik@demo.com',   role:'Pemilik Kapal',tgl:'10 Des 2025', status:'Aktif' },
    { id:4, nama:'Dinas Perhub.',  email:'dishub@demo.com',    role:'Dishub',       tgl:'01 Des 2025', status:'Aktif' },
    { id:5, nama:'Admin Utama',    email:'admin@demo.com',     role:'Admin Utama',  tgl:'01 Nov 2025', status:'Aktif' },
    { id:6, nama:'Dewi Rahayu',    email:'dewi@mail.com',      role:'Penumpang',    tgl:'05 Apr 2026', status:'Aktif' },
    { id:7, nama:'Andi Pratama',   email:'andi@mail.com',      role:'Penumpang',    tgl:'10 Apr 2026', status:'Aktif' },
  ],
  insiden: [
    { id:'INC-001', tgl:'10 Mar 2026', kapal:'KM Kelapa Jaya', jenis:'Mekanik',    lokasi:'Selat Kepulauan', desc:'Kerusakan mesin minor, kapal kembali ke dermaga. Tidak ada korban.', status:'Selesai' },
    { id:'INC-002', tgl:'22 Feb 2026', kapal:'KM Pari Mas',    jenis:'Cuaca',      lokasi:'Perairan Pari',   desc:'Penundaan keberangkatan 2 jam akibat gelombang tinggi.', status:'Selesai' },
    { id:'INC-003', tgl:'05 Jan 2026', kapal:'KM Ancol Indah', jenis:'Administrasi',lokasi:'Dermaga Ancol',  desc:'Kelebihan manifes penumpang 3 orang, diselesaikan di lokasi.', status:'Selesai' },
  ],
};

// ── Tiket Aktif Penumpang (data per-user) ──
const TIKET_AKTIF = [
  { id:'TKT-20260301', nama:'Budi Santoso', asal:'Marina Ancol',  tujuan:'Pulau Tidung',   tgl:'15 Apr 2026', jam:'08:00', jml:1, bayar:'GoPay', total:150000, status:'terkonfirmasi' },
  { id:'TKT-20260289', nama:'Budi Santoso', asal:'Marina Ancol',  tujuan:'Pulau Pramuka',  tgl:'20 Apr 2026', jam:'09:00', jml:2, bayar:'BCA',   total:260000, status:'pending' },
  { id:'TKT-20260275', nama:'Budi Santoso', asal:'Muara Angke',   tujuan:'Pulau Harapan',  tgl:'28 Apr 2026', jam:'09:30', jml:3, bayar:'QRIS',  total:210000, status:'terkonfirmasi' },
];

// ── Show QR Code modal untuk tiket aktif ──
function showQRTiket(id) {
  const t = TIKET_AKTIF.find(x => x.id === id);
  if (!t) return;
  if (t.status !== 'terkonfirmasi') { toast(t.status==='ditolak' ? 'Pembayaran tiket ini ditolak!' : 'Tiket masih menunggu konfirmasi petugas tiketing!', 'error'); return; }

  const qrData = JSON.stringify({
    tiket: t.id, nama: t.nama, asal: t.asal, tujuan: t.tujuan,
    tgl: t.tgl, jam: t.jam, jml: t.jml, bayar: t.bayar, total: t.total,
    verified: true, issued: new Date().toISOString()
  });

  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>

    <div class="qr-modal-wrap">
      <!-- Header -->
      <div class="qr-modal-header">
        <div class="qr-modal-logo">⚓ TIKET1000</div>
        <div class="qr-modal-badge">${t.id}</div>
      </div>

      <!-- Rute -->
      <div class="qr-rute-strip">
        <div class="qr-rute-side">
          <div class="qr-rute-lbl">ASAL</div>
          <div class="qr-rute-val">📍 ${t.asal}</div>
        </div>
        <div class="qr-rute-mid">
          <div class="qr-ship-anim">⛵</div>
          <div class="qr-rute-line"></div>
        </div>
        <div class="qr-rute-side right">
          <div class="qr-rute-lbl">TUJUAN</div>
          <div class="qr-rute-val">🏝️ ${t.tujuan}</div>
        </div>
      </div>

      <!-- QR + Info -->
      <div class="qr-body">
        <!-- QR Code utama -->
        <div class="qr-code-section">
          <div class="qr-pulse-ring">
            <div id="qr-tiket-canvas"></div>
          </div>
          <p class="qr-scan-label">📷 Tunjukkan QR ini di dermaga</p>
        </div>

        <!-- Info tiket -->
        <div class="qr-info-section">
          <div class="qr-info-row"><span>👤 Penumpang</span><strong>${t.nama}</strong></div>
          <div class="qr-info-row"><span>📅 Tanggal</span><strong>${t.tgl}</strong></div>
          <div class="qr-info-row"><span>🕐 Jam</span><strong>${t.jam} WIB</strong></div>
          <div class="qr-info-row"><span>👥 Jumlah</span><strong>${t.jml} Orang</strong></div>
          <div class="qr-info-row"><span>💳 Bayar</span><strong>${t.bayar}</strong></div>
          <div class="qr-info-row total-row">
            <span>💰 Total</span>
            <strong style="color:var(--coral);font-size:1.1rem;">${rupiah(t.total)}</strong>
          </div>
        </div>
      </div>

      <!-- Status bar -->
      <div class="qr-status-bar">
        <span class="qr-verified-badge">✅ TIKET VALID & TERKONFIRMASI</span>
        <span class="qr-no-small">${t.id}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="qr-modal-actions">
      <button class="action-btn primary" onclick="printQRTiket('${t.id}')">🖨️ Cetak / Simpan PDF</button>
      <button class="action-btn" onclick="shareQRTiket('${t.id}')">📤 Bagikan</button>
      <button class="action-btn" onclick="closeDashModal()">Tutup</button>
    </div>`);

  // Generate QR Code
  setTimeout(() => {
    const el = document.getElementById('qr-tiket-canvas');
    if (el && typeof QRCode !== 'undefined') {
      el.innerHTML = '';
      new QRCode(el, {
        text: qrData,
        width: 180,
        height: 180,
        colorDark: '#0A2463',
        colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  }, 150);
}

function printQRTiket(id) {
  const t = TIKET_AKTIF.find(x => x.id === id);
  if (!t) return;
  const area = document.querySelector('.qr-modal-wrap');
  if (!area) return;
  const win = window.open('', '_blank', 'width=600,height=750');
  win.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><title>QR Tiket – ${id}</title>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      body{margin:0;padding:20px;font-family:'Poppins',sans-serif;background:#f1f5f9;}
      .qr-modal-wrap{max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.15);}
      .qr-modal-header{background:linear-gradient(135deg,#0A2463,#1E5A99);color:#fff;padding:.9rem 1.4rem;display:flex;justify-content:space-between;align-items:center;}
      .qr-modal-logo{font-family:'Oswald',sans-serif;font-size:1.3rem;font-weight:700;letter-spacing:2px;}
      .qr-modal-badge{background:rgba(255,255,255,.2);padding:.25rem .9rem;border-radius:50px;font-size:.82rem;}
      .qr-rute-strip{background:#f8fafc;padding:1rem 1.4rem;display:flex;align-items:center;border-bottom:1px solid #e2e8f0;}
      .qr-rute-side{min-width:120px;}.qr-rute-side.right{text-align:right;}
      .qr-rute-lbl{font-size:.68rem;color:#64748b;text-transform:uppercase;letter-spacing:1px;}
      .qr-rute-val{font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;color:#0A2463;}
      .qr-rute-mid{flex:1;display:flex;flex-direction:column;align-items:center;gap:.2rem;}
      .qr-ship-anim{font-size:1.4rem;}
      .qr-rute-line{width:100%;height:2px;background:linear-gradient(90deg,#bfdbfe,#93c5fd);}
      .qr-body{padding:1.2rem 1.4rem;display:flex;gap:1.2rem;align-items:center;}
      .qr-code-section{display:flex;flex-direction:column;align-items:center;gap:.5rem;}
      .qr-scan-label{font-size:.72rem;color:#64748b;text-align:center;margin:0;}
      .qr-pulse-ring{padding:10px;background:#f0f9ff;border-radius:14px;border:2px solid #bfdbfe;}
      .qr-info-section{flex:1;}
      .qr-info-row{display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px dashed #f1f5f9;font-size:.84rem;}
      .qr-info-row span{color:#64748b;}.qr-info-row strong{color:#1e293b;}
      .total-row{border-bottom:none;padding-top:.5rem;}
      .qr-status-bar{padding:.7rem 1.4rem;background:linear-gradient(90deg,#f0fdf4,#dcfce7);display:flex;justify-content:space-between;align-items:center;}
      .qr-verified-badge{background:#22c55e;color:#fff;padding:.25rem .9rem;border-radius:50px;font-size:.78rem;font-weight:700;}
      .qr-no-small{font-family:'Oswald',sans-serif;font-size:.8rem;color:#64748b;letter-spacing:1px;}
    </style>
  </head><body>${area.outerHTML}</body></html>`);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 700);
}

function shareQRTiket(id) {
  const t = TIKET_AKTIF.find(x => x.id === id);
  if (!t) return;
  const text = `Tiket Tiket1000\nNo: ${t.id}\n${t.asal} → ${t.tujuan}\nTanggal: ${t.tgl} ${t.jam} WIB\nPenumpang: ${t.jml} orang`;
  if (navigator.share) {
    navigator.share({ title: 'E-Tiket Tiket1000', text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => toast('📋 Info tiket disalin ke clipboard!'));
  }
}

// ── Format helpers ──
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const statusBadge = s => {
  const m = { lunas:'green', pending:'yellow', refund:'red', selesai:'blue', aktif:'green', nonaktif:'red' };
  return badge(s.charAt(0).toUpperCase()+s.slice(1), m[s.toLowerCase()] || 'blue');
};

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();
  if (!session) { window.location.href = 'login.html'; return; }

  const roleKey = getRoleKey(session);
  const rl      = getRoleLabel(session);

  document.getElementById('sidebar-avatar').textContent = session.nama.charAt(0).toUpperCase();
  document.getElementById('sidebar-name').textContent   = session.nama;
  document.getElementById('sidebar-role-badge').textContent = rl.icon + ' ' + rl.label;

  const configs = {
    penumpang:     buildPenumpang,
    admin_utama:   buildAdminUtama,
    tiketing:      buildTiketing,
    pemilik_kapal: buildPemilikKapal,
    dishub:        buildDishub,
  };
  (configs[roleKey] || buildAccessDenied)(session, rl);
});

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ── HTML helpers ──
function statCard(icon, value, label, sub='') {
  return `<div class="stat-card">
    <div class="stat-icon">${icon}</div>
    <div class="stat-info">
      <div class="stat-value">${value}</div>
      <div class="stat-label">${label}</div>
      ${sub ? `<div class="stat-sub">${sub}</div>` : ''}
    </div>
  </div>`;
}
function tableRow(...cells) {
  return '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
}
function badge(text, type) {
  return `<span class="badge badge-${type}">${text}</span>`;
}
function sidebarNav(links) {
  return links.map(l => {
    if (l.section) return `<span class="nav-section-label">${l.section}</span>`;
    return `<a href="#" onclick="showSection('${l.id}');return false;" id="nav-${l.id}">${l.icon} ${l.label}</a>`;
  }).join('');
}
function showSection(id) {
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  const link = document.getElementById('nav-' + id);
  if (link) link.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
}
function setActive(id) {
  setTimeout(() => { const el = document.getElementById('nav-'+id); if(el) el.classList.add('active'); }, 50);
}
function setTitle(t) { document.getElementById('dash-title').textContent = t; }
function setContent(html) { document.getElementById('dash-content').innerHTML = html; }

// ── Notification toast ──
function toast(msg, type='success') {
  const t = document.createElement('div');
  t.className = 'dash-toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3000);
}

// ── Modal system ──
function openDashModal(html) {
  let overlay = document.getElementById('dash-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'dash-modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.onclick = e => { if(e.target===overlay) closeDashModal(); };
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal-container" style="max-width:600px;">${html}</div>`;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeDashModal() {
  const o = document.getElementById('dash-modal-overlay');
  if (o) { o.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeDashModal(); });


// ══════════════════════════════════════════════════════
//  PENUMPANG
// ══════════════════════════════════════════════════════
function buildPenumpang(session) {
  document.getElementById('sidebar-nav').innerHTML = sidebarNav([
    { id:'home',    icon:'🏠', label:'Beranda' },
    { section:'Tiket' },
    { id:'pesan',   icon:'🎫', label:'Pesan Tiket' },
    { id:'riwayat', icon:'📋', label:'Riwayat Perjalanan' },
    { id:'etiket',  icon:'📱', label:'E-Tiket Saya' },
    { id:'refund',  icon:'↩️', label:'Ajukan Refund' },
    { section:'Akun' },
    { id:'profil',  icon:'👤', label:'Profil Saya' },
  ]);

  // Sidebar link click handlers
  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const a = e.target.closest('a[id^="nav-"]');
    if (!a) return;
    const id = a.id.replace('nav-', '');
    const panels = {
      home:    () => showPenumpangHome(session),
      pesan:   () => showPesanTiket(),
      riwayat: () => showRiwayat(),
      etiket:  () => showETiket(),
      refund:  () => showRefund(),
      profil:  () => showProfil(session),
    };
    if (panels[id]) panels[id]();
  });

  showPenumpangHome(session);
  setActive('home');
}

function showPenumpangHome(session) {
  setTitle('Dashboard Penumpang');
  setContent(`
    <div class="dash-welcome">
      <div>
        <h2>Halo, ${session.nama.split(' ')[0]}! 👋</h2>
        <p>Siap berlayar ke Kepulauan Seribu hari ini?</p>
      </div>
      <div class="dash-welcome-emoji">🏝️</div>
    </div>
    <div class="stats-grid">
      ${statCard('🎫','3','Tiket Aktif')}
      ${statCard('✅','12','Perjalanan Selesai')}
      ${statCard('⭐','4.8','Rating Rata-rata')}
      ${statCard('🏝️','5','Pulau Dikunjungi')}
    </div>
    <div class="dash-panel">
      <h3>🚀 Aksi Cepat</h3>
      <div class="quick-actions">
        <button class="action-btn primary" onclick="showPesanTiket()">🎫 Pesan Tiket Baru</button>
        <button class="action-btn" onclick="showETiket()">📱 Lihat E-Tiket</button>
        <button class="action-btn" onclick="showRefund()">↩️ Ajukan Refund</button>
        <button class="action-btn" onclick="showProfil(getSession())">👤 Edit Profil</button>
      </div>
    </div>
    <div class="dash-panel">
      <h3>📋 Tiket Aktif</h3>
      <p style="font-size:0.82rem;color:#64748b;margin-bottom:1rem;">Klik baris tiket atau tombol 🔲 untuk melihat QR Code</p>
      <div style="overflow-x:auto;">
        <table class="dash-table tiket-aktif-table">
          <thead><tr><th>No. Tiket</th><th>Asal → Tujuan</th><th>Tanggal</th><th>Waktu</th><th>Penumpang</th><th>Bayar</th><th>Status</th><th>QR</th></tr></thead>
          <tbody>
            ${TIKET_AKTIF.map(t => `<tr class="tiket-row ${t.status==='terkonfirmasi'?'tiket-clickable':''}"
              onclick="${t.status==='terkonfirmasi'?`showQRTiket('${t.id}')`:''}">
              <td><strong>${t.id}</strong></td>
              <td>📍 ${t.asal}<br><small style="color:#64748b;">🏝️ ${t.tujuan}</small></td>
              <td>${t.tgl}</td>
              <td>${t.jam} WIB</td>
              <td>${t.jml} org</td>
              <td>${t.bayar}</td>
              <td>${t.status==='terkonfirmasi' ? badge('Terkonfirmasi','green') : t.status==='ditolak' ? badge('Ditolak','red') : badge('Menunggu Konfirmasi','yellow')}</td>
              <td>
                ${t.status==='terkonfirmasi'
                  ? `<button class="qr-btn" onclick="event.stopPropagation();showQRTiket('${t.id}')" title="Lihat QR Code">🔲</button>`
                  : `<button class="qr-btn qr-btn-disabled" disabled title="${t.status==='ditolak'?'Pembayaran ditolak':'Menunggu konfirmasi petugas'}">🔒</button>`}
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('home');
}

function showPesanTiket() {
  setTitle('Pesan Tiket');
  const today = new Date().toISOString().split('T')[0];
  setContent(`
    <div class="dash-panel">
      <h3>🎫 Form Pemesanan Tiket</h3>
      <form onsubmit="submitPesanTiket(event)" style="max-width:600px;">
        <div class="form-row-2">
          <div class="form-group"><label>Nama Lengkap</label><input type="text" id="pt-nama" required placeholder="Nama sesuai KTP" value="${getSession().nama}"></div>
          <div class="form-group"><label>Email</label><input type="email" id="pt-email" required placeholder="email@contoh.com" value="${getSession().email}"></div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label>📍 Pelabuhan Asal</label>
            <select id="pt-asal" required onchange="updateDashTujuan()">
              <option value="">-- Pilih Asal --</option>
              <option value="Marina Ancol">Marina Ancol, Jakarta Utara</option>
              <option value="Muara Angke">Muara Angke, Jakarta Utara</option>
              <option value="Muara Baru">Muara Baru, Jakarta Utara</option>
              <option value="Tanjung Priok">Tanjung Priok, Jakarta Utara</option>
            </select>
          </div>
          <div class="form-group"><label>🏝️ Tujuan Pulau</label>
            <select id="pt-tujuan" required onchange="hitungTotal()">
              <option value="">-- Pilih Tujuan --</option>
              ${DB.jadwal.map(j=>`<option value="${j.tujuan}" data-harga="${j.harga}">${j.tujuan}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label>Tanggal Berangkat</label><input type="date" id="pt-tgl" required min="${today}"></div>
          <div class="form-group"><label>Jumlah Penumpang</label><input type="number" id="pt-jml" min="1" max="10" value="1" required onchange="hitungTotal()"></div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label>Metode Pembayaran</label>
            <select id="pt-bayar" required>
              <option value="">-- Pilih --</option>
              <optgroup label="Transfer Bank"><option>BCA</option><option>Mandiri</option><option>BNI</option><option>BRI</option></optgroup>
              <optgroup label="E-Wallet"><option>GoPay</option><option>OVO</option><option>Dana</option><option>ShopeePay</option><option>LinkAja</option></optgroup>
              <optgroup label="Lainnya"><option>QRIS</option><option>Indomaret</option><option>Alfamart</option></optgroup>
            </select>
          </div>
        </div>
        <div class="total-box" id="total-box" style="display:none;"></div>
        <div style="display:flex;gap:1rem;margin-top:1rem;">
          <button type="submit" class="action-btn primary" style="flex:1;padding:0.9rem;">🎫 Konfirmasi Pemesanan</button>
          <button type="button" class="action-btn" onclick="showPenumpangHome(getSession())">Batal</button>
        </div>
      </form>
    </div>
    <div class="dash-panel">
      <h3>📅 Jadwal Tersedia Hari Ini</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Tujuan</th><th>Jam</th><th>Kapasitas</th><th>Sisa Kursi</th><th>Harga</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>`<tr>
              <td>${j.kapal}</td><td>${j.tujuan}</td><td>${j.jam} WIB</td>
              <td>${j.kapasitas} org</td>
              <td>${j.status==='Penuh'?badge('Penuh','red'):badge((j.kapasitas-j.terisi)+' kursi','green')}</td>
              <td>${rupiah(j.harga)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);

  document.getElementById('pt-asal').addEventListener('change', updateDashTujuan);
  document.getElementById('pt-tujuan').addEventListener('change', hitungTotal);
  setActive('pesan');
}

function updateDashTujuan() {
  const asal = document.getElementById('pt-asal').value;
  const HARGA = typeof HARGA_RUTE !== 'undefined' ? HARGA_RUTE : {};
  const tujuanSel = document.getElementById('pt-tujuan');
  tujuanSel.innerHTML = '<option value="">-- Pilih Tujuan --</option>';
  const dests = HARGA[asal] ? Object.keys(HARGA[asal]) : DB.jadwal.map(j=>j.tujuan);
  dests.forEach(d => {
    const harga = HARGA[asal]?.[d] || DB.jadwal.find(j=>j.tujuan===d)?.harga || 0;
    tujuanSel.innerHTML += `<option value="${d}" data-harga="${harga}">${d} – ${rupiah(harga)}</option>`;
  });
  hitungTotal();
}

function hitungTotal() {
  const asal   = document.getElementById('pt-asal')?.value;
  const sel    = document.getElementById('pt-tujuan');
  const jml    = parseInt(document.getElementById('pt-jml')?.value) || 1;
  const opt    = sel?.selectedOptions[0];
  const box    = document.getElementById('total-box');
  if (!opt || !opt.dataset.harga || !box) return;
  const harga = parseInt(opt.dataset.harga);
  const total = harga * jml;
  box.style.display = 'block';
  box.innerHTML = `<div class="total-inner">
    <div class="rute-path" style="font-size:0.85rem;">
      <span>📍 <strong>${asal||'—'}</strong></span>
      <span style="color:var(--ocean-light);">──⛵──▶</span>
      <span>🏝️ <strong>${opt.value}</strong></span>
    </div>
    <span style="margin-left:auto;">💰 Total: <strong style="font-size:1.3rem;color:var(--coral);">${rupiah(total)}</strong>
    <small style="color:#64748b;display:block;">${jml} tiket × ${rupiah(harga)}</small></span>
  </div>`;
}

function submitPesanTiket(e) {
  e.preventDefault();
  const asal   = document.getElementById('pt-asal').value;
  const tujuan = document.getElementById('pt-tujuan').value;
  const tgl    = document.getElementById('pt-tgl').value;
  const jml    = document.getElementById('pt-jml').value;
  const bayar  = document.getElementById('pt-bayar').value;
  const nama   = document.getElementById('pt-nama').value;
  const email  = document.getElementById('pt-email').value;

  if (!asal || !tujuan || !tgl || !bayar) { toast('Lengkapi semua field terlebih dahulu!','error'); return; }

  const noTiket = 'TKT-' + Date.now().toString().slice(-6);
  const harga   = (typeof HARGA_RUTE !== 'undefined' ? HARGA_RUTE[asal]?.[tujuan] : null)
                  || DB.jadwal.find(j=>j.tujuan===tujuan)?.harga || 0;
  const total   = harga * parseInt(jml);
  const tglFmt  = new Date(tgl).toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const jam     = DB.jadwal.find(j=>j.tujuan===tujuan)?.jam || '08:00';

  // ── Tiket baru WAJIB berstatus pending sampai dikonfirmasi petugas tiketing ──
  const tiketBaru = {
    id: noTiket, nama, asal, tujuan, tgl: tglFmt, jam,
    jml: parseInt(jml), bayar, total, status: 'pending'
  };
  DB.tiket.unshift(tiketBaru);
  TIKET_AKTIF.unshift({
    id: noTiket, nama, asal, tujuan, tgl: tglFmt, jam,
    jml: parseInt(jml), bayar, total, status: 'pending'
  });

  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="etiket-wrapper" id="dash-etiket-print">
      <div class="etiket-top-bar">
        <div class="etiket-logo">⚓ TIKET1000</div>
        <div class="etiket-no-badge">${noTiket}</div>
      </div>
      <div class="etiket-rute-banner">
        <div class="etiket-rute-col"><div class="etiket-rute-label">ASAL</div><div class="etiket-rute-value">${asal}</div></div>
        <div class="etiket-rute-divider">
          <div class="etiket-rute-dot"></div>
          <div class="etiket-rute-line"></div>
          <span class="etiket-ship">⛵</span>
          <div class="etiket-rute-line"></div>
          <div class="etiket-rute-dot"></div>
        </div>
        <div class="etiket-rute-col right"><div class="etiket-rute-label">TUJUAN</div><div class="etiket-rute-value">${tujuan}</div></div>
      </div>
      <div class="etiket-body-wrap">
        <div class="etiket-info-grid">
          <div class="etiket-info-item"><span class="etiket-info-label">👤 Penumpang</span><span class="etiket-info-val">${nama}</span></div>
          <div class="etiket-info-item"><span class="etiket-info-label">📅 Tanggal</span><span class="etiket-info-val">${tglFmt}</span></div>
          <div class="etiket-info-item"><span class="etiket-info-label">🕐 Jam Berangkat</span><span class="etiket-info-val">${jam} WIB</span></div>
          <div class="etiket-info-item"><span class="etiket-info-label">👥 Penumpang</span><span class="etiket-info-val">${jml} Orang</span></div>
          <div class="etiket-info-item"><span class="etiket-info-label">💳 Pembayaran</span><span class="etiket-info-val">${bayar}</span></div>
          <div class="etiket-info-item"><span class="etiket-info-label">📧 Email</span><span class="etiket-info-val" style="font-size:0.78rem;">${email}</span></div>
        </div>
        <div class="etiket-qr-section">
          <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;">🔒</div>
          <p class="etiket-qr-label">QR terkunci hingga<br>pembayaran dikonfirmasi</p>
          <p class="etiket-qr-no">${noTiket}</p>
        </div>
      </div>
      <div class="etiket-perforated"></div>
      <div class="etiket-footer-bar">
        <div><span class="etiket-footer-label">Harga/Tiket</span><span class="etiket-footer-val">${rupiah(harga)}</span></div>
        <div><span class="etiket-footer-label">Jumlah</span><span class="etiket-footer-val">${jml}×</span></div>
        <div class="etiket-total-box"><span class="etiket-footer-label">TOTAL BAYAR</span><span class="etiket-total-val">${rupiah(total)}</span></div>
      </div>
      <div class="etiket-status-bar" style="background:linear-gradient(90deg,#fffbeb,#fef3c7);">
        <span class="etiket-status-badge" style="background:#f59e0b;">⏳ MENUNGGU KONFIRMASI PEMBAYARAN</span>
        <span style="font-size:0.78rem;color:#64748b;">Info dikirim ke ${email}</span>
      </div>
    </div>
    <p style="font-size:0.82rem;color:#64748b;margin-top:0.8rem;text-align:center;">
      Tiket Anda akan aktif dan QR Code dapat dilihat setelah petugas tiketing memverifikasi pembayaran Anda.
      Pantau statusnya di menu <strong>Riwayat Perjalanan</strong>.
    </p>
    <div style="display:flex;gap:1rem;margin-top:1rem;">
      <button class="action-btn primary" style="flex:1;" onclick="closeDashModal();showRiwayat()">📋 Lihat Status Pemesanan</button>
      <button class="action-btn" style="flex:1;" onclick="closeDashModal();showPenumpangHome(getSession())">Selesai</button>
    </div>`);
}


function showRiwayat() {
  setTitle('Riwayat Perjalanan');
  setContent(`
    <div class="dash-panel">
      <h3>🕒 Semua Riwayat Perjalanan</h3>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Cari tujuan..." oninput="filterRiwayat(this.value)" style="flex:1;max-width:300px;">
        <select onchange="filterRiwayatStatus(this.value)">
          <option value="">Semua Status</option>
          <option value="lunas">Lunas</option>
          <option value="pending">Pending</option>
          <option value="refund">Refund</option>
        </select>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table" id="riwayat-table">
          <thead><tr><th>No. Tiket</th><th>Tujuan</th><th>Tanggal</th><th>Penumpang</th><th>Total</th><th>Pembayaran</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody id="riwayat-tbody">
            ${DB.tiket.filter(t=>t.nama===getSession().nama||true).map(t=>`<tr data-status="${t.status}" data-tujuan="${t.tujuan.toLowerCase()}">
              <td><strong>${t.id}</strong></td>
              <td>${t.tujuan}</td>
              <td>${t.tgl}</td>
              <td>${t.jml} org</td>
              <td>${rupiah(t.total)}</td>
              <td>${t.bayar}</td>
              <td>${statusBadge(t.status)}</td>
              <td><button class="action-btn" style="padding:0.3rem 0.7rem;font-size:0.8rem;" onclick="lihatETiketById('${t.id}')">🎫 Tiket</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('riwayat');
}

function filterRiwayat(q) {
  document.querySelectorAll('#riwayat-tbody tr').forEach(r => {
    r.style.display = r.dataset.tujuan.includes(q.toLowerCase()) ? '' : 'none';
  });
}
function filterRiwayatStatus(s) {
  document.querySelectorAll('#riwayat-tbody tr').forEach(r => {
    r.style.display = (!s || r.dataset.status === s) ? '' : 'none';
  });
}

function showETiket() {
  setTitle('E-Tiket Saya');
  const konfirmasi = TIKET_AKTIF.filter(t => t.status === 'terkonfirmasi');
  const pending    = TIKET_AKTIF.filter(t => t.status !== 'terkonfirmasi');
  setContent(`
    <div class="dash-panel">
      <h3>📱 E-Tiket Aktif <span style="font-size:0.8rem;font-weight:400;color:#64748b;">(klik tiket untuk melihat QR Code)</span></h3>
      ${konfirmasi.length === 0 ? '<p style="color:#64748b;text-align:center;padding:2rem;">Belum ada e-tiket aktif.</p>' : ''}
      <div class="etiket-grid">
        ${konfirmasi.map(t=>`
          <div class="etiket-box etiket-clickable" onclick="showQRTiket('${t.id}')" title="Klik untuk lihat QR Code">
            <div class="etiket-header">
              <span>⚓ TIKET1000</span>
              <span class="etiket-no">${t.id}</span>
            </div>
            <!-- Mini QR preview area -->
            <div class="etiket-qr-preview-bar">
              <span class="etiket-qr-hint">🔲 Tap untuk QR Code</span>
              <span class="etiket-qr-arrow">›</span>
            </div>
            <div class="etiket-body">
              <div class="etiket-row"><span>👤 Penumpang</span><strong>${t.nama}</strong></div>
              <div class="etiket-row"><span>📍 Asal</span><strong>${t.asal}</strong></div>
              <div class="etiket-row"><span>🏝️ Tujuan</span><strong>${t.tujuan}</strong></div>
              <div class="etiket-row"><span>📅 Tanggal</span><strong>${t.tgl}</strong></div>
              <div class="etiket-row"><span>🕐 Jam</span><strong>${t.jam} WIB</strong></div>
              <div class="etiket-row"><span>👥 Penumpang</span><strong>${t.jml} orang</strong></div>
              <div class="etiket-row total"><span>💰 Total</span><strong style="color:var(--coral);">${rupiah(t.total)}</strong></div>
            </div>
            <div class="etiket-footer">${badge('✅ Terkonfirmasi','green')} &nbsp; <small>Tap untuk QR</small></div>
          </div>`).join('')}
      </div>

      ${pending.length > 0 ? `
      <h3 style="margin-top:2rem;">⏳ Menunggu Konfirmasi Petugas</h3>
      <div class="etiket-grid">
        ${pending.map(t=>`
          <div class="etiket-box" style="opacity:0.7;">
            <div class="etiket-header" style="background:linear-gradient(135deg,${t.status==='ditolak'?'#991b1b,#dc2626':'#475569,#64748b'});">
              <span>⚓ TIKET1000</span><span class="etiket-no">${t.id}</span>
            </div>
            <div class="etiket-body">
              <div class="etiket-row"><span>📍 Asal</span><strong>${t.asal}</strong></div>
              <div class="etiket-row"><span>🏝️ Tujuan</span><strong>${t.tujuan}</strong></div>
              <div class="etiket-row"><span>📅 Tanggal</span><strong>${t.tgl}</strong></div>
              <div class="etiket-row"><span>🕐 Jam</span><strong>${t.jam} WIB</strong></div>
              <div class="etiket-row total"><span>💰 Total</span><strong>${rupiah(t.total)}</strong></div>
            </div>
            <div class="etiket-footer">${t.status==='ditolak' ? badge('❌ Ditolak','red') : badge('⏳ Menunggu Konfirmasi','yellow')} &nbsp; <small>🔒 QR terkunci</small></div>
          </div>`).join('')}
      </div>` : ''}
    </div>`);
  setActive('etiket');
}

function lihatETiketById(id) {
  const t = DB.tiket.find(x=>x.id===id);
  if (!t) return;

  const isLunas   = t.status === 'lunas';
  const isPending = t.status === 'pending';
  const isRefund  = t.status === 'refund';

  const qrData = JSON.stringify({
    tiket: t.id, nama: t.nama, tujuan: t.tujuan, tgl: t.tgl,
    jam: t.jam, jml: t.jml, bayar: t.bayar, total: t.total,
    verified: true
  });

  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="modal-header"><div class="modal-icon-wrap">🎫</div><h3>Detail E-Tiket</h3></div>
    <div class="etiket-box">
      <div class="etiket-header"><span>⚓ TIKET1000</span><span class="etiket-no">${t.id}</span></div>
      <div class="etiket-body" style="display:flex;gap:1.2rem;align-items:flex-start;flex-wrap:wrap;">
        <div style="flex:1;min-width:180px;">
          <div class="etiket-row"><span>Penumpang</span><strong>${t.nama}</strong></div>
          <div class="etiket-row"><span>Tujuan</span><strong>${t.tujuan}</strong></div>
          <div class="etiket-row"><span>Tanggal</span><strong>${t.tgl}</strong></div>
          <div class="etiket-row"><span>Jam</span><strong>${t.jam} WIB</strong></div>
          <div class="etiket-row"><span>Penumpang</span><strong>${t.jml} orang</strong></div>
          <div class="etiket-row"><span>Pembayaran</span><strong>${t.bayar}</strong></div>
          <div class="etiket-row total"><span>Total</span><strong style="color:var(--coral);font-size:1.2rem;">${rupiah(t.total)}</strong></div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:1rem;min-width:150px;">
          ${isLunas ? `
            <div id="riwayat-qr-canvas"></div>
            <p style="font-size:0.7rem;color:#64748b;text-align:center;margin:0;">Tunjukkan QR ini di dermaga</p>
          ` : isPending ? `
            <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border-radius:10px;font-size:2.5rem;">🔒</div>
            <p style="font-size:0.72rem;color:#b45309;text-align:center;margin:0;font-weight:600;">⏳ Menunggu Konfirmasi<br>Pembayaran</p>
          ` : isRefund ? `
            <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;background:#fee2e2;border-radius:10px;font-size:2.5rem;">↩️</div>
            <p style="font-size:0.72rem;color:#b30000;text-align:center;margin:0;font-weight:600;">Tiket Direfund<br>QR Tidak Berlaku</p>
          ` : `
            <div style="width:120px;height:120px;display:flex;align-items:center;justify-content:center;background:#f1f5f9;border-radius:10px;font-size:2.5rem;">❌</div>
            <p style="font-size:0.72rem;color:#64748b;text-align:center;margin:0;">QR tidak tersedia</p>
          `}
        </div>
      </div>
      <div class="etiket-footer">${statusBadge(t.status)}
        ${isPending ? '<br><small style="color:#b45309;">Petugas tiketing akan memverifikasi pembayaran Anda</small>' : ''}
      </div>
    </div>
    <div style="display:flex;gap:1rem;margin-top:1rem;">
      ${isLunas ? `<button class="action-btn primary" style="flex:1;" onclick="printRiwayatEtiket('${t.id}')">🖨️ Cetak</button>` : ''}
      <button class="action-btn" style="flex:1;" onclick="closeDashModal()">Tutup</button>
    </div>`);

  if (isLunas) {
    setTimeout(() => {
      const el = document.getElementById('riwayat-qr-canvas');
      if (el && typeof QRCode !== 'undefined') {
        el.innerHTML = '';
        new QRCode(el, {
          text: qrData, width: 120, height: 120,
          colorDark: '#0A2463', colorLight: '#FFFFFF',
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
    }, 150);
  }
}

function printRiwayatEtiket(id) {
  const t = DB.tiket.find(x=>x.id===id);
  if (!t) return;
  toast('🖨️ Menyiapkan cetak tiket ' + t.id + '…');
  setTimeout(() => window.print(), 300);
}


function showRefund() {
  setTitle('Ajukan Refund');
  setContent(`
    <div class="dash-panel">
      <h3>↩️ Form Pengajuan Refund</h3>
      <p style="color:#64748b;margin-bottom:1.5rem;font-size:0.9rem;">Refund dapat diajukan maksimal H-1 sebelum keberangkatan. Proses 3-5 hari kerja.</p>
      <form onsubmit="submitRefund(event)" style="max-width:500px;">
        <div class="form-group"><label>Nomor Tiket</label>
          <select id="rf-tiket" required>
            <option value="">-- Pilih Tiket --</option>
            <option value="TKT-20260301">TKT-20260301 – Pulau Tidung, 15 Apr 2026</option>
            <option value="TKT-20260275">TKT-20260275 – Pulau Harapan, 28 Apr 2026</option>
          </select>
        </div>
        <div class="form-group"><label>Alasan Refund</label>
          <select id="rf-alasan" required>
            <option value="">-- Pilih Alasan --</option>
            <option>Perubahan jadwal mendadak</option>
            <option>Kondisi darurat keluarga</option>
            <option>Sakit / kondisi kesehatan</option>
            <option>Bencana alam / cuaca ekstrem</option>
            <option>Lainnya</option>
          </select>
        </div>
        <div class="form-group"><label>Keterangan Tambahan</label>
          <textarea id="rf-ket" rows="3" placeholder="Jelaskan alasan lebih detail (opsional)..." style="width:100%;padding:0.8rem;border:2px solid var(--ocean-light);border-radius:10px;font-family:Poppins,sans-serif;resize:vertical;"></textarea>
        </div>
        <div class="form-group"><label>Nomor Rekening / E-Wallet untuk Pengembalian Dana</label>
          <input type="text" id="rf-rekening" required placeholder="Contoh: BCA 1234567890 a.n. Nama Anda">
        </div>
        <div style="display:flex;gap:1rem;">
          <button type="submit" class="action-btn primary" style="flex:1;padding:0.9rem;">↩️ Ajukan Refund</button>
          <button type="button" class="action-btn" onclick="showPenumpangHome(getSession())">Batal</button>
        </div>
      </form>
    </div>
    <div class="dash-panel">
      <h3>📋 Status Refund</h3>
      <table class="dash-table">
        <thead><tr><th>No. Tiket</th><th>Tujuan</th><th>Tgl Pengajuan</th><th>Alasan</th><th>Status</th></tr></thead>
        <tbody>
          ${tableRow('TKT-344','Pulau Pari','16 Apr 2026','Perubahan jadwal',badge('Diproses','yellow'))}
        </tbody>
      </table>
    </div>`);
  setActive('refund');
}

function submitRefund(e) {
  e.preventDefault();
  const tiket = document.getElementById('rf-tiket').value;
  const alasan = document.getElementById('rf-alasan').value;
  if (!tiket || !alasan) { toast('Lengkapi form refund!','error'); return; }
  toast(`✅ Refund untuk ${tiket} berhasil diajukan! Estimasi 3-5 hari kerja.`);
  setTimeout(() => showRefund(), 1500);
}

function showProfil(session) {
  setTitle('Profil Saya');
  setContent(`
    <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:1.5rem;">
      <div class="dash-panel" style="text-align:center;">
        <div style="width:80px;height:80px;background:linear-gradient(135deg,var(--coral),var(--sunset));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:700;color:#fff;margin:0 auto 1rem;">${session.nama.charAt(0)}</div>
        <h3 style="margin:0 0 0.3rem;font-family:Oswald,sans-serif;color:var(--ocean-deep);">${session.nama}</h3>
        <p style="color:#64748b;font-size:0.85rem;">${session.email}</p>
        <div style="margin-top:1rem;">${badge(getRoleLabel(session).icon+' '+getRoleLabel(session).label,'blue')}</div>
        <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:0.5rem;">
          ${statCard('🎫','15','Total Tiket')}
          ${statCard('🏝️','5','Pulau Dikunjungi')}
        </div>
      </div>
      <div class="dash-panel">
        <h3>✏️ Edit Profil</h3>
        <form onsubmit="submitEditProfil(event)">
          <div class="form-group"><label>Nama Lengkap</label><input type="text" id="ep-nama" value="${session.nama}" required></div>
          <div class="form-group"><label>Email</label><input type="email" id="ep-email" value="${session.email}" required></div>
          <div class="form-group"><label>No. Telepon</label><input type="tel" id="ep-tlp" placeholder="+62 8xx xxxx xxxx"></div>
          <div class="form-group"><label>Alamat</label><input type="text" id="ep-alamat" placeholder="Alamat lengkap Anda"></div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:1.2rem 0;">
          <h3>🔒 Ganti Password</h3>
          <div class="form-group"><label>Password Lama</label><input type="password" id="ep-pass-old" placeholder="••••••••"></div>
          <div class="form-row-2">
            <div class="form-group"><label>Password Baru</label><input type="password" id="ep-pass-new" placeholder="Min. 8 karakter"></div>
            <div class="form-group"><label>Konfirmasi</label><input type="password" id="ep-pass-conf" placeholder="Ulangi password baru"></div>
          </div>
          <button type="submit" class="action-btn primary" style="width:100%;padding:0.9rem;">💾 Simpan Perubahan</button>
        </form>
      </div>
    </div>`);
  setActive('profil');
}

function submitEditProfil(e) {
  e.preventDefault();
  const nama  = document.getElementById('ep-nama').value;
  const passO = document.getElementById('ep-pass-old').value;
  const passN = document.getElementById('ep-pass-new').value;
  const passC = document.getElementById('ep-pass-conf').value;
  if (passN && passN !== passC) { toast('Konfirmasi password baru tidak cocok!','error'); return; }
  const s = getSession();
  s.nama = nama;
  setSession(s);
  document.getElementById('sidebar-name').textContent = nama;
  toast('✅ Profil berhasil diperbarui!');
}


// ══════════════════════════════════════════════════════
//  ADMIN UTAMA
// ══════════════════════════════════════════════════════
function buildAdminUtama(session) {
  document.getElementById('sidebar-nav').innerHTML = sidebarNav([
    { id:'home',    icon:'🏠', label:'Beranda' },
    { section:'Manajemen' },
    { id:'users',   icon:'👥', label:'Kelola Pengguna' },
    { id:'kapal',   icon:'🚢', label:'Kelola Kapal' },
    { id:'jadwal',  icon:'🗓️', label:'Kelola Jadwal' },
    { section:'Laporan' },
    { id:'tiket',   icon:'🎫', label:'Semua Transaksi' },
    { id:'laporan', icon:'📊', label:'Laporan & Statistik' },
    { section:'Sistem' },
    { id:'akses',   icon:'🔐', label:'Hak Akses Admin' },
    { id:'setting', icon:'⚙️', label:'Pengaturan Sistem' },
  ]);

  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const a = e.target.closest('a[id^="nav-"]');
    if (!a) return;
    const id = a.id.replace('nav-', '');
    const panels = {
      home:    () => showAdminHome(session),
      users:   () => showKelolaPengguna(),
      kapal:   () => showAdminKelolaMapal(),
      jadwal:  () => showAdminKelolaMadwal(),
      tiket:   () => showSemuaTransaksi(),
      laporan: () => showLaporanStatistik(),
      akses:   () => showHakAkses(),
      setting: () => showPengaturan(),
    };
    if (panels[id]) panels[id]();
  });

  showAdminHome(session);
  setActive('home');
}

function showAdminHome(session) {
  setTitle('Admin Utama');
  setContent(`
    <div class="dash-welcome">
      <div><h2>👑 Admin Utama</h2><p>Akses penuh ke seluruh sistem Tiket1000</p></div>
      <div class="dash-welcome-emoji">⚙️</div>
    </div>
    <div class="stats-grid">
      ${statCard('👥','1.284','Total Pengguna','↑ 23 minggu ini')}
      ${statCard('🎫','347','Tiket Hari Ini','↑ 12% vs kemarin')}
      ${statCard('🚢','6','Kapal Aktif','1 docking')}
      ${statCard('💰','Rp 48,2jt','Pendapatan Hari Ini','↑ 8% vs kemarin')}
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi Cepat</h3>
      <div class="quick-actions">
        <button class="action-btn primary" onclick="showAdminKelolaMadwal()">➕ Tambah Jadwal</button>
        <button class="action-btn" onclick="showKelolaPengguna()">👤 Tambah Admin</button>
        <button class="action-btn" onclick="showLaporanStatistik()">📥 Lihat Laporan</button>
        <button class="action-btn" onclick="showSemuaTransaksi()">🎫 Semua Transaksi</button>
      </div>
    </div>
    <div class="dash-panel">
      <h3>🎫 Transaksi Terbaru</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Pembayaran</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.tiket.slice(0,5).map(t=>`<tr>
              <td><strong>${t.id}</strong></td><td>${t.nama}</td><td>${t.tujuan}</td>
              <td>${t.bayar}</td><td>${rupiah(t.total)}</td><td>${statusBadge(t.status)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('home');
}

function showKelolaPengguna() {
  setTitle('Kelola Pengguna');
  setContent(`
    <div class="dash-panel">
      <h3>👥 Daftar Pengguna</h3>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Cari nama / email..." oninput="filterPengguna(this.value)" style="flex:1;max-width:300px;">
        <button class="action-btn primary" onclick="formTambahAdmin()">➕ Tambah Admin</button>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table" id="tbl-pengguna">
          <thead><tr><th>ID</th><th>Nama</th><th>Email</th><th>Role</th><th>Bergabung</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${DB.pengguna.map(u=>`<tr>
              <td>${u.id}</td><td><strong>${u.nama}</strong></td><td>${u.email}</td>
              <td>${badge(u.role,'blue')}</td><td>${u.tgl}</td><td>${badge(u.status,'green')}</td>
              <td>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="editPengguna(${u.id})">✏️</button>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;background:#fee2e2;color:#dc2626;border-color:#fca5a5;" onclick="hapusPengguna(${u.id},'${u.nama}')">🗑️</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('users');
}

function filterPengguna(q) {
  const rows = document.querySelectorAll('#tbl-pengguna tbody tr');
  rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none'; });
}

function formTambahAdmin() {
  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="modal-header"><div class="modal-icon-wrap">👤</div><h3>Tambah Admin Baru</h3></div>
    <form onsubmit="simpanAdmin(event)">
      <div class="form-group"><label>Nama Lengkap</label><input type="text" id="ta-nama" required placeholder="Nama admin"></div>
      <div class="form-group"><label>Email</label><input type="email" id="ta-email" required placeholder="email@tiket1000.id"></div>
      <div class="form-group"><label>Jabatan / Role</label>
        <select id="ta-role" required>
          <option value="">-- Pilih Jabatan --</option>
          <option>Admin Utama</option><option>Tiketing</option><option>Pemilik Kapal</option><option>Dishub</option>
        </select>
      </div>
      <div class="form-group"><label>Password Awal</label><input type="password" id="ta-pass" required placeholder="Min. 8 karakter"></div>
      <button type="submit" class="cta-button" style="width:100%;margin-top:0.5rem;">✅ Simpan Admin</button>
    </form>`);
}

function simpanAdmin(e) {
  e.preventDefault();
  const nama = document.getElementById('ta-nama').value;
  toast(`✅ Admin "${nama}" berhasil ditambahkan!`);
  closeDashModal();
  showKelolaPengguna();
}
function editPengguna(id) { const u = DB.pengguna.find(x=>x.id===id); if(u) toast(`✏️ Edit pengguna: ${u.nama}`); }
function hapusPengguna(id, nama) {
  if (confirm(`Hapus pengguna "${nama}"? Tindakan ini tidak dapat dibatalkan.`)) {
    toast(`🗑️ Pengguna ${nama} dihapus.`,'error');
    showKelolaPengguna();
  }
}

function showAdminKelolaMapal() {
  setTitle('Kelola Kapal');
  setContent(`
    <div class="dash-panel">
      <h3>🚢 Daftar Armada Kapal</h3>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Cari kapal..." oninput="filterKapal(this.value)" style="flex:1;max-width:300px;">
        <button class="action-btn primary" onclick="formTambahKapal()">➕ Tambah Kapal</button>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table" id="tbl-kapal">
          <thead><tr><th>Nama Kapal</th><th>Operator</th><th>Kapasitas</th><th>Rute</th><th>Sertifikat</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${DB.kapal.map(k=>`<tr>
              <td><strong>${k.nama}</strong></td><td>${k.operator}</td><td>${k.kapasitas} org</td>
              <td>${k.rute}</td><td>${badge('s/d '+k.sertifikat, k.sertifikat.includes('Apr 2026')?'yellow':'green')}</td>
              <td>${badge(k.status, k.status==='Beroperasi'?'green':'red')}</td>
              <td>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="editKapal(${k.id})">✏️ Edit</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('kapal');
}

function filterKapal(q) {
  document.querySelectorAll('#tbl-kapal tbody tr').forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(q.toLowerCase()) ? '' : 'none';
  });
}
function formTambahKapal() {
  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="modal-header"><div class="modal-icon-wrap">🚢</div><h3>Tambah Kapal Baru</h3></div>
    <form onsubmit="simpanKapal(event)">
      <div class="form-row-2">
        <div class="form-group"><label>Nama Kapal</label><input type="text" id="tk-nama" required placeholder="KM ..."></div>
        <div class="form-group"><label>Operator</label><input type="text" id="tk-op" required placeholder="PT / CV ..."></div>
      </div>
      <div class="form-row-2">
        <div class="form-group"><label>Kapasitas</label><input type="number" id="tk-kap" required min="1" placeholder="80"></div>
        <div class="form-group"><label>Jumlah Awak</label><input type="number" id="tk-awak" required min="1" placeholder="5"></div>
      </div>
      <div class="form-group"><label>Rute</label><input type="text" id="tk-rute" required placeholder="Ancol → Pulau ..."></div>
      <div class="form-group"><label>Masa Berlaku Sertifikat</label><input type="date" id="tk-sert" required></div>
      <button type="submit" class="cta-button" style="width:100%;margin-top:0.5rem;">✅ Simpan Kapal</button>
    </form>`);
}
function simpanKapal(e) { e.preventDefault(); toast('✅ Kapal berhasil ditambahkan!'); closeDashModal(); showAdminKelolaMapal(); }
function editKapal(id) { const k = DB.kapal.find(x=>x.id===id); if(k) toast(`✏️ Edit kapal: ${k.nama}`); }

function showAdminKelolaMadwal() {
  setTitle('Kelola Jadwal');
  setContent(`
    <div class="dash-panel">
      <h3>🗓️ Jadwal Keberangkatan</h3>
      <div class="filter-bar">
        <button class="action-btn primary" onclick="formTambahJadwal()">➕ Tambah Jadwal</button>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Tujuan</th><th>Jam</th><th>Durasi</th><th>Harga</th><th>Kapasitas</th><th>Terisi</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>`<tr>
              <td>${j.kapal}</td><td>${j.tujuan}</td><td>${j.jam} WIB</td><td>${j.durasi}</td>
              <td>${rupiah(j.harga)}</td><td>${j.kapasitas}</td><td>${j.terisi}</td>
              <td>${badge(j.status, j.status==='Penuh'?'red':'green')}</td>
              <td>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="editJadwal(${j.id})">✏️</button>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;background:#fee2e2;color:#dc2626;border-color:#fca5a5;" onclick="hapusJadwal(${j.id})">🗑️</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('jadwal');
}
function formTambahJadwal() {
  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="modal-header"><div class="modal-icon-wrap">🗓️</div><h3>Tambah Jadwal Baru</h3></div>
    <form onsubmit="simpanJadwal(event)">
      <div class="form-group"><label>Pilih Kapal</label>
        <select id="tj-kapal" required>
          <option value="">-- Pilih --</option>
          ${DB.kapal.map(k=>`<option>${k.nama}</option>`).join('')}
        </select>
      </div>
      <div class="form-row-2">
        <div class="form-group"><label>Tujuan</label>
          <select id="tj-tujuan" required>
            <option>Pulau Tidung</option><option>Pulau Pramuka</option><option>Pulau Harapan</option>
            <option>Pulau Pari</option><option>Pulau Untung Jawa</option><option>Pulau Kelapa</option>
          </select>
        </div>
        <div class="form-group"><label>Jam Berangkat</label><input type="time" id="tj-jam" required></div>
      </div>
      <div class="form-row-2">
        <div class="form-group"><label>Durasi</label><input type="text" id="tj-dur" placeholder="cth: 2.5 Jam" required></div>
        <div class="form-group"><label>Harga (Rp)</label><input type="number" id="tj-harga" required min="0" placeholder="150000"></div>
      </div>
      <button type="submit" class="cta-button" style="width:100%;margin-top:0.5rem;">✅ Simpan Jadwal</button>
    </form>`);
}
function simpanJadwal(e) { e.preventDefault(); toast('✅ Jadwal berhasil ditambahkan!'); closeDashModal(); showAdminKelolaMadwal(); }
function editJadwal(id) { toast(`✏️ Edit jadwal ID-${id}`); }
function hapusJadwal(id) { if(confirm('Hapus jadwal ini?')) { toast('🗑️ Jadwal dihapus.','error'); showAdminKelolaMadwal(); } }

function showSemuaTransaksi() {
  setTitle('Semua Transaksi');
  setContent(`
    <div class="dash-panel">
      <h3>🎫 Semua Transaksi</h3>
      <div class="filter-bar">
        <input type="text" placeholder="🔍 Cari nama / tiket..." oninput="filterTransaksi(this.value)" style="flex:1;max-width:280px;">
        <select onchange="filterTransaksiStatus(this.value)">
          <option value="">Semua Status</option>
          <option value="lunas">Lunas</option><option value="pending">Pending</option><option value="refund">Refund</option>
        </select>
        <button class="action-btn" onclick="exportTransaksi()">📥 Export CSV</button>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table" id="tbl-transaksi">
          <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Tanggal</th><th>Penumpang</th><th>Pembayaran</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody id="tbody-transaksi">
            ${DB.tiket.map(t=>`<tr data-status="${t.status}">
              <td><strong>${t.id}</strong></td><td>${t.nama}</td><td>${t.tujuan}</td>
              <td>${t.tgl}</td><td>${t.jml} org</td><td>${t.bayar}</td>
              <td>${rupiah(t.total)}</td><td>${statusBadge(t.status)}</td>
              <td>
                ${t.status==='pending'?`<button class="action-btn primary" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="verifikasiPembayaran('${t.id}')">✅ Verif</button>`:''}
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="lihatETiketById('${t.id}')">🎫</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('tiket');
}
function filterTransaksi(q) {
  document.querySelectorAll('#tbody-transaksi tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q.toLowerCase())?'':'none';});
}
function filterTransaksiStatus(s) {
  document.querySelectorAll('#tbody-transaksi tr').forEach(r=>{r.style.display=(!s||r.dataset.status===s)?'':'none';});
}
function exportTransaksi() {
  const header = 'No Tiket,Penumpang,Tujuan,Tanggal,Jumlah,Pembayaran,Total,Status\n';
  const rows = DB.tiket.map(t=>`${t.id},${t.nama},${t.tujuan},${t.tgl},${t.jml},${t.bayar},${t.total},${t.status}`).join('\n');
  const blob = new Blob([header+rows], {type:'text/csv'});
  const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='transaksi_tiket1000.csv'; a.click();
  toast('📥 File CSV berhasil diunduh!');
}
function verifikasiPembayaran(id) {
  const t = DB.tiket.find(x=>x.id===id);
  if (t) t.status = 'lunas';
  const ta = TIKET_AKTIF.find(x=>x.id===id);
  if (ta) ta.status = 'terkonfirmasi';
  toast(`✅ Pembayaran ${id} berhasil diverifikasi! Tiket aktif & QR Code tersedia.`);
  setTimeout(showSemuaTransaksi, 1000);
}

function showLaporanStatistik() {
  setTitle('Laporan & Statistik');
  const totalPendapatan = DB.tiket.filter(t=>t.status==='lunas').reduce((a,t)=>a+t.total,0);
  const totalTiket = DB.tiket.length;
  const tiketLunas = DB.tiket.filter(t=>t.status==='lunas').length;
  setContent(`
    <div class="stats-grid">
      ${statCard('💰',rupiah(totalPendapatan),'Total Pendapatan Bulan Ini')}
      ${statCard('🎫',totalTiket,'Total Tiket Terjual')}
      ${statCard('✅',tiketLunas,'Pembayaran Lunas')}
      ${statCard('📈',Math.round(tiketLunas/totalTiket*100)+'%','Tingkat Konversi')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <div class="dash-panel" style="margin:0;">
        <h3>📊 Pendapatan Per Tujuan</h3>
        <div id="mini-chart-pendapatan" class="mini-chart" style="height:80px;margin:1rem 0 0.5rem;align-items:flex-end;"></div>
        <div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:0.3rem;">
          ${DB.jadwal.map(j=>`<span style="font-size:0.68rem;color:#64748b;flex:1;text-align:center;">${j.tujuan.replace('Pulau ','')}</span>`).join('')}
        </div>
        <div style="overflow-x:auto;margin-top:1rem;">
          <table class="dash-table">
            <thead><tr><th>Tujuan</th><th>Tiket</th><th>Pendapatan</th></tr></thead>
            <tbody>
              ${DB.jadwal.map(j=>{
                const tkt=DB.tiket.filter(t=>t.tujuan===j.tujuan&&t.status==='lunas');
                const total=tkt.reduce((a,t)=>a+t.total,0);
                return '<tr><td>'+j.tujuan+'</td><td>'+tkt.length+'</td><td>'+rupiah(total)+'</td></tr>';
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="dash-panel" style="margin:0;">
        <h3>💳 Metode Pembayaran</h3>
        <div id="donut-pembayaran" class="donut-wrap" style="margin-top:1rem;">
          <div class="donut-chart"></div>
          <div class="donut-legend"></div>
        </div>
      </div>
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi</h3>
      <div class="quick-actions">
        <button class="action-btn" onclick="exportTransaksi()">📥 Export CSV</button>
        <button class="action-btn" onclick="window.print()">🖨️ Cetak Laporan</button>
      </div>
    </div>`);
  setActive('laporan');

  setTimeout(() => {
    if (typeof renderMiniChart === 'function') {
      renderMiniChart('mini-chart-pendapatan', DB.jadwal.map(j=>{
        const total = DB.tiket.filter(t=>t.tujuan===j.tujuan&&t.status==='lunas').reduce((a,t)=>a+t.total,0);
        return { label:j.tujuan.replace('Pulau ',''), value:total, display:rupiah(total) };
      }));
    }
    if (typeof renderDonutChart === 'function') {
      const bayarMap = DB.tiket.reduce((acc,t)=>{acc[t.bayar]=(acc[t.bayar]||0)+1;return acc;},{});
      const total = DB.tiket.length;
      const sorted = Object.entries(bayarMap).sort((a,b)=>b[1]-a[1]);
      const colors = ['var(--palm)','var(--ocean-light)','var(--coral)','#a855f7','#f59e0b'];
      const top4 = sorted.slice(0,4);
      const rest = sorted.slice(4).reduce((a,x)=>a+x[1],0);
      const slices = top4.map(([bayar,jml],i)=>({label:bayar,pct:Math.round(jml/total*100),color:colors[i]}));
      if(rest>0) slices.push({label:'Lainnya',pct:Math.round(rest/total*100),color:colors[4]});
      renderDonutChart('donut-pembayaran', slices);
    }
  }, 100);
}

function showHakAkses() {
  setTitle('Hak Akses Admin');
  setContent(`
    <div class="dash-panel">
      <h3>🔐 Matriks Hak Akses Per Role</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Fitur</th><th>👑 Admin Utama</th><th>🎫 Tiketing</th><th>🚢 Pemilik Kapal</th><th>🏛️ Dishub</th><th>🧑‍✈️ Penumpang</th></tr></thead>
          <tbody>
            ${[
              ['Pesan Tiket',           '✅','✅','❌','❌','✅'],
              ['Kelola Pengguna',       '✅','❌','❌','❌','❌'],
              ['Kelola Kapal',          '✅','❌','✅','❌','❌'],
              ['Kelola Jadwal',         '✅','✅','✅','❌','❌'],
              ['Verifikasi Pembayaran', '✅','✅','❌','❌','❌'],
              ['Manifes Penumpang',     '✅','✅','✅','✅','❌'],
              ['Laporan Keuangan',      '✅','❌','✅','❌','❌'],
              ['Statistik Global',      '✅','❌','❌','✅','❌'],
              ['Sertifikasi Kapal',     '✅','❌','❌','✅','❌'],
              ['Laporan Insiden',       '✅','❌','✅','✅','❌'],
              ['Pengaturan Sistem',     '✅','❌','❌','❌','❌'],
            ].map(([fitur,...roles])=>`<tr>
              <td><strong>${fitur}</strong></td>
              ${roles.map(r=>`<td style="text-align:center;font-size:1.1rem;">${r}</td>`).join('')}
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('akses');
}

function showPengaturan() {
  setTitle('Pengaturan Sistem');
  setContent(`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div class="dash-panel">
        <h3>⚙️ Pengaturan Umum</h3>
        <form onsubmit="simpanSetting(event)">
          <div class="form-group"><label>Nama Aplikasi</label><input type="text" value="Tiket1000" required></div>
          <div class="form-group"><label>Email Notifikasi</label><input type="email" value="admin@tiket1000.id" required></div>
          <div class="form-group"><label>Jam Operasional Mulai</label><input type="time" value="07:00"></div>
          <div class="form-group"><label>Jam Operasional Selesai</label><input type="time" value="18:00"></div>
          <div class="form-group"><label>Batas Pemesanan (jam sebelum berangkat)</label><input type="number" value="2" min="1"></div>
          <button type="submit" class="action-btn primary" style="width:100%;padding:0.9rem;">💾 Simpan Pengaturan</button>
        </form>
      </div>
      <div class="dash-panel">
        <h3>🔔 Notifikasi Sistem</h3>
        ${[
          ['Email konfirmasi tiket','on'],['SMS notifikasi','off'],['WhatsApp notifikasi','on'],
          ['Email pengingat H-1','on'],['Notifikasi refund','on'],['Laporan harian otomatis','off'],
        ].map(([label,state])=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 0;border-bottom:1px solid #f1f5f9;">
            <span style="font-size:0.9rem;">${label}</span>
            <label class="toggle-switch">
              <input type="checkbox" ${state==='on'?'checked':''} onchange="toast('Pengaturan diperbarui!')">
              <span class="toggle-slider"></span>
            </label>
          </div>`).join('')}
      </div>
    </div>`);
  setActive('setting');
}
function simpanSetting(e) { e.preventDefault(); toast('✅ Pengaturan berhasil disimpan!'); }


// ══════════════════════════════════════════════════════
//  TIKETING
// ══════════════════════════════════════════════════════
function buildTiketing(session) {
  document.getElementById('sidebar-nav').innerHTML = sidebarNav([
    { id:'home',   icon:'🏠', label:'Beranda' },
    { section:'Tiket' },
    { id:'input',  icon:'➕', label:'Input Tiket Manual' },
    { id:'cek',    icon:'🔍', label:'Cek & Cari Tiket' },
    { id:'verify', icon:'✅', label:'Verifikasi Pembayaran' },
    { section:'Laporan' },
    { id:'harian', icon:'📋', label:'Laporan Harian' },
    { id:'manifes',icon:'📄', label:'Manifes Penumpang' },
  ]);

  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const a = e.target.closest('a[id^="nav-"]');
    if (!a) return;
    const id = a.id.replace('nav-', '');
    const panels = {
      home:    () => showTiketingHome(session),
      input:   () => showInputTiket(),
      cek:     () => showCekTiket(),
      verify:  () => showVerifikasiPembayaran(),
      harian:  () => showLaporanHarian(),
      manifes: () => showManifesPenumpang(),
    };
    if (panels[id]) panels[id]();
  });

  showTiketingHome(session);
  setActive('home');
}

function showTiketingHome(session) {
  setTitle('Panel Tiketing');
  const pending = DB.tiket.filter(t=>t.status==='pending').length;
  setContent(`
    <div class="dash-welcome">
      <div><h2>🎫 Panel Tiketing</h2><p>Kelola penjualan tiket dan verifikasi pembayaran</p></div>
      <div class="dash-welcome-emoji">🎟️</div>
    </div>
    <div class="stats-grid">
      ${statCard('🎫',DB.tiket.length,'Tiket Terjual Hari Ini')}
      ${statCard('⏳',pending,'Menunggu Verifikasi')}
      ${statCard('✅',DB.tiket.filter(t=>t.status==='lunas').length,'Pembayaran Lunas')}
      ${statCard('↩️',DB.tiket.filter(t=>t.status==='refund').length,'Refund Diproses')}
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi Cepat</h3>
      <div class="quick-actions">
        <button class="action-btn primary" onclick="showInputTiket()">➕ Input Tiket Manual</button>
        <button class="action-btn" onclick="showVerifikasiPembayaran()">✅ Verifikasi Pembayaran</button>
        <button class="action-btn" onclick="showManifesPenumpang()">📄 Cetak Manifes</button>
        <button class="action-btn" onclick="showLaporanHarian()">📋 Laporan Harian</button>
      </div>
    </div>
    <div class="dash-panel">
      <h3>⏳ Menunggu Verifikasi</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Metode</th><th>Total</th><th>Aksi</th></tr></thead>
          <tbody>
            ${DB.tiket.filter(t=>t.status==='pending').map(t=>`<tr>
              <td><strong>${t.id}</strong></td><td>${t.nama}</td><td>${t.tujuan}</td>
              <td>${t.bayar}</td><td>${rupiah(t.total)}</td>
              <td><button class="action-btn primary" style="padding:0.3rem 0.8rem;font-size:0.82rem;" onclick="verifikasiPembayaran('${t.id}')">✅ Verifikasi</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('home');
}

function showInputTiket() {
  setTitle('Input Tiket Manual');
  const today = new Date().toISOString().split('T')[0];
  setContent(`
    <div class="dash-panel">
      <h3>➕ Input Tiket Manual</h3>
      <p style="color:#64748b;font-size:0.88rem;margin-bottom:1.5rem;">Gunakan form ini untuk input tiket pembelian langsung di loket.</p>
      <form onsubmit="submitInputTiket(event)" style="max-width:600px;">
        <div class="form-row-2">
          <div class="form-group"><label>Nama Penumpang</label><input type="text" id="it-nama" required placeholder="Nama lengkap"></div>
          <div class="form-group"><label>No. Telepon</label><input type="tel" id="it-tlp" required placeholder="+62 8xx xxxx xxxx"></div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label>Tujuan</label>
            <select id="it-tujuan" required>
              <option value="">-- Pilih --</option>
              ${DB.jadwal.map(j=>`<option value="${j.tujuan}" data-jam="${j.jam}" data-harga="${j.harga}">${j.tujuan} – ${j.jam} WIB (${rupiah(j.harga)})</option>`).join('')}
            </select>
          </div>
          <div class="form-group"><label>Tanggal</label><input type="date" id="it-tgl" required min="${today}" value="${today}"></div>
        </div>
        <div class="form-row-2">
          <div class="form-group"><label>Jumlah Penumpang</label><input type="number" id="it-jml" min="1" max="20" value="1" required onchange="hitungTotalTiketing()"></div>
          <div class="form-group"><label>Metode Pembayaran</label>
            <select id="it-bayar" required>
              <option>Tunai</option><option>BCA</option><option>Mandiri</option><option>GoPay</option><option>OVO</option><option>QRIS</option>
            </select>
          </div>
        </div>
        <div class="total-box" id="total-box-tkt" style="display:none;"></div>
        <button type="submit" class="action-btn primary" style="width:100%;padding:0.9rem;margin-top:1rem;">🖨️ Buat & Cetak Tiket</button>
      </form>
    </div>`);
  document.getElementById('it-tujuan').addEventListener('change', hitungTotalTiketing);
  setActive('input');
}
function hitungTotalTiketing() {
  const sel = document.getElementById('it-tujuan');
  const jml = parseInt(document.getElementById('it-jml')?.value)||1;
  const opt = sel?.selectedOptions[0];
  const box = document.getElementById('total-box-tkt');
  if(!opt||!opt.dataset.harga||!box) return;
  const total = parseInt(opt.dataset.harga)*jml;
  box.style.display='block';
  box.innerHTML=`<div class="total-inner"><span>💰 Total:</span><strong style="font-size:1.4rem;color:var(--coral);">${rupiah(total)}</strong></div>`;
}
function submitInputTiket(e) {
  e.preventDefault();
  const nama = document.getElementById('it-nama').value;
  const noTiket = 'TKT-' + Date.now().toString().slice(-6);
  toast(`✅ Tiket ${noTiket} untuk ${nama} berhasil dibuat!`);
  e.target.reset(); document.getElementById('total-box-tkt').style.display='none';
}

function showCekTiket() {
  setTitle('Cek & Cari Tiket');
  setContent(`
    <div class="dash-panel">
      <h3>🔍 Cari Tiket</h3>
      <div style="display:flex;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap;">
        <input type="text" id="cek-q" placeholder="Nomor tiket atau nama penumpang..." style="flex:1;min-width:250px;padding:0.8rem 1rem;border:2px solid var(--ocean-light);border-radius:10px;font-family:Poppins,sans-serif;">
        <button class="action-btn primary" onclick="cariTiket()">🔍 Cari</button>
      </div>
      <div id="cek-result">
        <div style="overflow-x:auto;">
          <table class="dash-table" id="tbl-cek">
            <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Tanggal</th><th>Jam</th><th>Total</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              ${DB.tiket.map(t=>`<tr>
                <td><strong>${t.id}</strong></td><td>${t.nama}</td><td>${t.tujuan}</td>
                <td>${t.tgl}</td><td>${t.jam} WIB</td><td>${rupiah(t.total)}</td>
                <td>${statusBadge(t.status)}</td>
                <td><button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="lihatETiketById('${t.id}')">🎫</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`);
  setActive('cek');
}
function cariTiket() {
  const q = document.getElementById('cek-q').value.toLowerCase();
  document.querySelectorAll('#tbl-cek tbody tr').forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none';});
}

function showVerifikasiPembayaran() {
  setTitle('Verifikasi Pembayaran');
  const pending = DB.tiket.filter(t=>t.status==='pending');
  setContent(`
    <div class="dash-panel">
      <h3>✅ Pembayaran Menunggu Verifikasi <span style="background:var(--coral);color:#fff;border-radius:50px;padding:0.1rem 0.6rem;font-size:0.85rem;">${pending.length}</span></h3>
      ${pending.length === 0 ? '<p style="color:#64748b;text-align:center;padding:2rem;">Tidak ada pembayaran yang menunggu verifikasi ✅</p>' :
      `<div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Tanggal</th><th>Metode</th><th>Total</th><th>Aksi</th></tr></thead>
          <tbody>
            ${pending.map(t=>`<tr>
              <td><strong>${t.id}</strong></td><td>${t.nama}</td><td>${t.tujuan}</td>
              <td>${t.tgl}</td><td>${t.bayar}</td><td>${rupiah(t.total)}</td>
              <td style="display:flex;gap:0.4rem;">
                <button class="action-btn primary" style="padding:0.3rem 0.7rem;font-size:0.8rem;" onclick="konfirmasiVerif('${t.id}','${t.nama}')">✅ Konfirmasi</button>
                <button class="action-btn" style="padding:0.3rem 0.7rem;font-size:0.8rem;background:#fee2e2;color:#dc2626;" onclick="tolakVerif('${t.id}')">❌ Tolak</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`}
    </div>`);
  setActive('verify');
}
function konfirmasiVerif(id, nama) {
  const t = DB.tiket.find(x=>x.id===id);
  if(t) t.status='lunas';
  const ta = TIKET_AKTIF.find(x=>x.id===id);
  if(ta) ta.status='terkonfirmasi';
  toast(`✅ Pembayaran ${id} (${nama}) berhasil dikonfirmasi! QR Code kini aktif.`);
  setTimeout(showVerifikasiPembayaran, 800);
}
function tolakVerif(id) {
  if(confirm(`Tolak pembayaran ${id}? Tiket akan dibatalkan.`)) {
    const t = DB.tiket.find(x=>x.id===id); if(t) t.status='refund';
    const ta = TIKET_AKTIF.find(x=>x.id===id); if(ta) ta.status='ditolak';
    toast(`❌ Pembayaran ${id} ditolak.`,'error');
    setTimeout(showVerifikasiPembayaran, 800);
  }
}

function showLaporanHarian() {
  setTitle('Laporan Harian');
  const today = new Date().toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const totalHari = DB.tiket.filter(t=>t.status==='lunas').reduce((a,t)=>a+t.total,0);
  setContent(`
    <div class="dash-panel">
      <h3>📋 Laporan Harian – ${today}</h3>
      <div class="stats-grid" style="margin-bottom:1.5rem;">
        ${statCard('🎫',DB.tiket.length,'Total Tiket')}
        ${statCard('✅',DB.tiket.filter(t=>t.status==='lunas').length,'Tiket Lunas')}
        ${statCard('⏳',DB.tiket.filter(t=>t.status==='pending').length,'Menunggu Verif')}
        ${statCard('💰',rupiah(totalHari),'Total Pendapatan')}
      </div>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>No. Tiket</th><th>Penumpang</th><th>Tujuan</th><th>Jam</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.tiket.map(t=>`<tr>
              <td>${t.id}</td><td>${t.nama}</td><td>${t.tujuan}</td>
              <td>${t.jam} WIB</td><td>${rupiah(t.total)}</td><td>${statusBadge(t.status)}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top:1rem;">
        <button class="action-btn" onclick="exportTransaksi()">📥 Export CSV</button>
        <button class="action-btn" onclick="window.print()">🖨️ Cetak Laporan</button>
      </div>
    </div>`);
  setActive('harian');
}

function showManifesPenumpang() {
  setTitle('Manifes Penumpang');
  setContent(`
    <div class="dash-panel">
      <h3>📄 Manifes Penumpang Per Kapal</h3>
      <div class="filter-bar">
        <select id="manifes-filter" onchange="filterManifesByKapal(this.value)" style="min-width:220px;">
          <option value="">Semua Kapal</option>
          ${DB.jadwal.map(j=>`<option value="${j.tujuan}">${j.kapal} → ${j.tujuan} (${j.jam} WIB)</option>`).join('')}
        </select>
        <button class="action-btn" onclick="window.print()">🖨️ Cetak Manifes</button>
        <button class="action-btn" onclick="exportTransaksi()">📥 Export</button>
      </div>
      <div style="overflow-x:auto;margin-top:1rem;">
        <table class="dash-table" id="tbl-manifes">
          <thead><tr><th>No.</th><th>Nama Penumpang</th><th>Kapal / Tujuan</th><th>Jam</th><th>Jml</th><th>Pembayaran</th><th>Status</th></tr></thead>
          <tbody id="tbody-manifes">
            ${DB.tiket.filter(t=>t.status==='lunas').map((t,i)=>{
              const j = DB.jadwal.find(x=>x.tujuan===t.tujuan);
              return `<tr data-tujuan="${t.tujuan}">
                <td>${i+1}</td><td><strong>${t.nama}</strong></td>
                <td>${j?j.kapal:'-'} → ${t.tujuan}</td>
                <td>${t.jam} WIB</td><td>${t.jml} org</td><td>${t.bayar}</td>
                <td>${badge('Terkonfirmasi','green')}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('manifes');
}
function filterManifesByKapal(tujuan) {
  document.querySelectorAll('#tbody-manifes tr').forEach(r=>{
    r.style.display=(!tujuan||r.dataset.tujuan===tujuan)?'':'none';
  });
}


// ══════════════════════════════════════════════════════
//  PEMILIK KAPAL
// ══════════════════════════════════════════════════════
function buildPemilikKapal(session) {
  document.getElementById('sidebar-nav').innerHTML = sidebarNav([
    { id:'home',       icon:'🏠', label:'Beranda' },
    { section:'Armada' },
    { id:'kapal',      icon:'🚢', label:'Armada Kapal' },
    { id:'jadwal',     icon:'🗓️', label:'Jadwal Operasional' },
    { id:'awak',       icon:'👨‍✈️', label:'Manajemen Awak' },
    { section:'Penumpang' },
    { id:'manifes',    icon:'📄', label:'Manifes' },
    { id:'histori',    icon:'📋', label:'Histori Pelayaran' },
    { section:'Keuangan' },
    { id:'pendapatan', icon:'💰', label:'Pendapatan Kapal' },
  ]);

  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const a = e.target.closest('a[id^="nav-"]');
    if (!a) return;
    const id = a.id.replace('nav-', '');
    const panels = {
      home:       () => showPemilikHome(session),
      kapal:      () => showArmadaKapal(),
      jadwal:     () => showJadwalPemilik(),
      awak:       () => showManajemenAwak(),
      manifes:    () => showManifesPenumpang(),
      histori:    () => showHistoriPelayaran(),
      pendapatan: () => showPendapatanKapal(),
    };
    if (panels[id]) panels[id]();
  });

  showPemilikHome(session);
  setActive('home');
}

function showPemilikHome(session) {
  setTitle('Panel Pemilik Kapal');
  setContent(`
    <div class="dash-welcome">
      <div><h2>🚢 Pemilik Kapal</h2><p>Kelola armada, jadwal, dan operasional kapal Anda</p></div>
      <div class="dash-welcome-emoji">⚓</div>
    </div>
    <div class="stats-grid">
      ${statCard('🚢','3','Total Kapal')}
      ${statCard('✅','2','Kapal Beroperasi')}
      ${statCard('🔧','1','Dalam Perawatan')}
      ${statCard('💰','Rp 12,4jt','Pendapatan Hari Ini')}
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi Cepat</h3>
      <div class="quick-actions">
        <button class="action-btn primary" onclick="showJadwalPemilik()">➕ Tambah Jadwal</button>
        <button class="action-btn" onclick="showArmadaKapal()">🚢 Lihat Armada</button>
        <button class="action-btn" onclick="showManifesPenumpang()">📄 Manifes Hari Ini</button>
        <button class="action-btn" onclick="showPendapatanKapal()">💰 Laporan Pendapatan</button>
      </div>
    </div>
    <div class="dash-panel">
      <h3>🗓️ Status Kapal Hari Ini</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Rute</th><th>Berangkat</th><th>Penumpang</th><th>Kapasitas</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>{ const k=DB.kapal.find(x=>x.nama===j.kapal); return `<tr>
              <td><strong>${j.kapal}</strong></td><td>${j.tujuan}</td><td>${j.jam} WIB</td>
              <td>${j.terisi} org</td><td>${j.kapasitas} org</td>
              <td>${badge(j.status,j.status==='Penuh'?'red':j.status==='Beroperasi'?'green':'yellow')}</td>
            </tr>`; }).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('home');
}

function showArmadaKapal() {
  setTitle('Armada Kapal');
  setContent(`
    <div class="dash-panel">
      <h3>🚢 Daftar Armada</h3>
      <button class="action-btn primary" onclick="formTambahKapal()" style="margin-bottom:1rem;">➕ Tambah Kapal</button>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.2rem;">
        ${DB.kapal.map(k=>`
          <div class="dash-panel" style="margin:0;border:2px solid ${k.status==='Docking'?'#fca5a5':'#bfdbfe'};">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem;">
              <div>
                <h3 style="margin:0;font-size:1.1rem;">${k.nama}</h3>
                <small style="color:#64748b;">${k.operator}</small>
              </div>
              ${badge(k.status,k.status==='Beroperasi'?'green':'red')}
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.85rem;">
              <div>👥 Kapasitas: <strong>${k.kapasitas} org</strong></div>
              <div>👨‍✈️ Awak: <strong>${k.awak} orang</strong></div>
              <div>🗺️ Rute: <strong>${k.rute}</strong></div>
              <div>📋 Sertif: <strong>${badge('s/d '+k.sertifikat,k.sertifikat.includes('Apr 2026')?'yellow':'green')}</strong></div>
            </div>
            <div style="margin-top:1rem;display:flex;gap:0.5rem;">
              <button class="action-btn" style="flex:1;font-size:0.82rem;" onclick="editKapal(${k.id})">✏️ Edit</button>
              <button class="action-btn" style="flex:1;font-size:0.82rem;" onclick="showManajemenAwak()">👨‍✈️ Awak</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`);
  setActive('kapal');
}

function showJadwalPemilik() {
  setTitle('Jadwal Operasional');
  setContent(`
    <div class="dash-panel">
      <h3>🗓️ Jadwal Keberangkatan</h3>
      <button class="action-btn primary" onclick="formTambahJadwal()" style="margin-bottom:1rem;">➕ Tambah Jadwal</button>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Tujuan</th><th>Jam</th><th>Durasi</th><th>Harga</th><th>Terisi/Kapasitas</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>`<tr>
              <td>${j.kapal}</td><td>${j.tujuan}</td><td>${j.jam} WIB</td><td>${j.durasi}</td>
              <td>${rupiah(j.harga)}</td>
              <td>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                  <div style="width:60px;height:6px;background:#e2e8f0;border-radius:3px;">
                    <div style="width:${Math.round(j.terisi/j.kapasitas*100)}%;height:100%;background:${j.terisi>=j.kapasitas?'#ef4444':'#22c55e'};border-radius:3px;"></div>
                  </div>
                  <span>${j.terisi}/${j.kapasitas}</span>
                </div>
              </td>
              <td>${badge(j.status,j.status==='Penuh'?'red':'green')}</td>
              <td>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="editJadwal(${j.id})">✏️</button>
                <button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;background:#fee2e2;color:#dc2626;" onclick="hapusJadwal(${j.id})">🗑️</button>
              </td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('jadwal');
}

function showManajemenAwak() {
  setTitle('Manajemen Awak Kapal');
  const awak = [
    { nama:'Capt. Bimo Santoso',   jabatan:'Nakhoda',       kapal:'KM Seribu Jaya',  masa:'5 thn', status:'Aktif' },
    { nama:'Ahmad Fauzi',          jabatan:'Mualim I',      kapal:'KM Seribu Jaya',  masa:'3 thn', status:'Aktif' },
    { nama:'Soni Wijaya',          jabatan:'Nakhoda',       kapal:'KM Ancol Indah',  masa:'7 thn', status:'Aktif' },
    { nama:'Dani Kurniawan',       jabatan:'Masinis',       kapal:'KM Ancol Indah',  masa:'4 thn', status:'Aktif' },
    { nama:'Rendi Pratama',        jabatan:'Nakhoda',       kapal:'KM Harapan Baru', masa:'6 thn', status:'Aktif' },
    { nama:'Eko Susanto',          jabatan:'Masinis',       kapal:'KM Harapan Baru', masa:'2 thn', status:'Aktif' },
  ];
  setContent(`
    <div class="dash-panel">
      <h3>👨‍✈️ Daftar Awak Kapal</h3>
      <button class="action-btn primary" onclick="toast('Form tambah awak')" style="margin-bottom:1rem;">➕ Tambah Awak</button>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Nama</th><th>Jabatan</th><th>Kapal</th><th>Masa Kerja</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            ${awak.map(a=>`<tr>
              <td><strong>${a.nama}</strong></td><td>${a.jabatan}</td><td>${a.kapal}</td>
              <td>${a.masa}</td><td>${badge(a.status,'green')}</td>
              <td><button class="action-btn" style="padding:0.25rem 0.6rem;font-size:0.78rem;" onclick="toast('Edit awak: ${a.nama}')">✏️ Edit</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('awak');
}

function showHistoriPelayaran() {
  setTitle('Histori Pelayaran');
  const histori = [
    { tgl:'16 Apr 2026', kapal:'KM Seribu Jaya', rute:'Ancol → Tidung PP', pnp:138, kondisi:'Normal', catatan:'—' },
    { tgl:'15 Apr 2026', kapal:'KM Ancol Indah',  rute:'Ancol → Pramuka PP',pnp: 91, kondisi:'Normal', catatan:'—' },
    { tgl:'14 Apr 2026', kapal:'KM Harapan Baru', rute:'Ancol → Harapan PP',pnp:155, kondisi:'Normal', catatan:'Sedikit terlambat 20 mnt' },
    { tgl:'13 Apr 2026', kapal:'KM Pari Mas',      rute:'Ancol → Pari PP',   pnp: 68, kondisi:'Cuaca',  catatan:'Gelombang 0.5m' },
    { tgl:'12 Apr 2026', kapal:'KM Kelapa Jaya',   rute:'Ancol → Kelapa PP', pnp:112, kondisi:'Normal', catatan:'—' },
  ];
  setContent(`
    <div class="dash-panel">
      <h3>📋 Histori Pelayaran (7 Hari Terakhir)</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Tanggal</th><th>Kapal</th><th>Rute</th><th>Total Penumpang</th><th>Kondisi</th><th>Catatan</th></tr></thead>
          <tbody>
            ${histori.map(h=>`<tr>
              <td>${h.tgl}</td><td>${h.kapal}</td><td>${h.rute}</td>
              <td>${h.pnp} org</td>
              <td>${badge(h.kondisi, h.kondisi==='Normal'?'green':'yellow')}</td>
              <td style="color:#64748b;font-size:0.85rem;">${h.catatan}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('histori');
}

function showPendapatanKapal() {
  setTitle('Pendapatan Kapal');
  const totalBulan = DB.tiket.filter(t=>t.status==='lunas').reduce((a,t)=>a+t.total,0);
  setContent(`
    <div class="stats-grid">
      ${statCard('💰',rupiah(totalBulan),'Total Pendapatan Bulan Ini')}
      ${statCard('📈','Rp 14,2jt','Pendapatan Tertinggi (KM Seribu Jaya)')}
      ${statCard('🎫',DB.tiket.filter(t=>t.status==='lunas').length,'Tiket Terjual')}
      ${statCard('📊','12%','Pertumbuhan vs Bulan Lalu')}
    </div>
    <div class="dash-panel">
      <h3>💰 Pendapatan Per Kapal</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Rute</th><th>Tiket Terjual</th><th>Pendapatan</th><th>% Total</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>{
              const tkt=DB.tiket.filter(t=>t.tujuan===j.tujuan&&t.status==='lunas');
              const total=tkt.reduce((a,t)=>a+t.total,0);
              const pct=totalBulan?Math.round(total/totalBulan*100):0;
              return `<tr>
                <td>${j.kapal}</td><td>${j.tujuan}</td><td>${tkt.length} tiket</td>
                <td>${rupiah(total)}</td>
                <td><div style="display:flex;align-items:center;gap:0.5rem;">
                  <div style="width:${pct*1.5}px;height:8px;background:var(--ocean-light);border-radius:4px;min-width:4px;"></div>
                  <span>${pct}%</span>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi</h3>
      <div class="quick-actions">
        <button class="action-btn" onclick="exportTransaksi()">📥 Export Laporan CSV</button>
        <button class="action-btn" onclick="window.print()">🖨️ Cetak Laporan</button>
      </div>
    </div>`);
  setActive('pendapatan');
}


// ══════════════════════════════════════════════════════
//  DISHUB
// ══════════════════════════════════════════════════════
function buildDishub(session) {
  document.getElementById('sidebar-nav').innerHTML = sidebarNav([
    { id:'home',       icon:'🏠', label:'Beranda' },
    { section:'Monitoring' },
    { id:'operasional',icon:'📡', label:'Operasional Real-Time' },
    { id:'keselamatan',icon:'🛡️', label:'Keselamatan & Sertifikasi' },
    { id:'manifes',    icon:'📄', label:'Manifes Penumpang' },
    { section:'Laporan' },
    { id:'statistik',  icon:'📊', label:'Statistik Penumpang' },
    { id:'insiden',    icon:'⚠️', label:'Laporan Insiden' },
    { id:'regulasi',   icon:'📋', label:'Kepatuhan Regulasi' },
  ]);

  document.getElementById('sidebar-nav').addEventListener('click', e => {
    const a = e.target.closest('a[id^="nav-"]');
    if (!a) return;
    const id = a.id.replace('nav-', '');
    const panels = {
      home:        () => showDishubHome(session),
      operasional: () => showOperasionalRealtime(),
      keselamatan: () => showKeselamatan(),
      manifes:     () => showManifesPenumpang(),
      statistik:   () => showStatistikDishub(),
      insiden:     () => showLaporanInsiden(),
      regulasi:    () => showKepatuhanRegulasi(),
    };
    if (panels[id]) panels[id]();
  });

  showDishubHome(session);
  setActive('home');
}

function showDishubHome(session) {
  setTitle('Panel Dishub');
  setContent(`
    <div class="dash-welcome">
      <div><h2>🏛️ Dinas Perhubungan</h2><p>Monitoring operasional & keselamatan pelayaran Kepulauan Seribu</p></div>
      <div class="dash-welcome-emoji">🔭</div>
    </div>
    <div class="stats-grid">
      ${statCard('🚢','6','Kapal Beroperasi')}
      ${statCard('👥','256','Penumpang Hari Ini')}
      ${statCard('✅','5','Sertifikat Aktif')}
      ${statCard('⚠️','0','Insiden Aktif')}
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi Cepat</h3>
      <div class="quick-actions">
        <button class="action-btn primary" onclick="showLaporanInsiden()">⚠️ Laporkan Insiden</button>
        <button class="action-btn" onclick="showOperasionalRealtime()">📡 Monitoring Real-Time</button>
        <button class="action-btn" onclick="showStatistikDishub()">📊 Lihat Statistik</button>
        <button class="action-btn" onclick="showKeselamatan()">🛡️ Cek Sertifikasi</button>
      </div>
    </div>
    <div class="dash-panel">
      <h3>📡 Status Kapal Aktif</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Operator</th><th>Rute</th><th>Penumpang</th><th>Sertifikat</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.kapal.map(k=>`<tr>
              <td><strong>${k.nama}</strong></td><td>${k.operator}</td><td>${k.rute}</td>
              <td>${DB.jadwal.find(j=>j.kapal===k.nama)?.terisi||'-'} org</td>
              <td>${badge('s/d '+k.sertifikat,k.sertifikat.includes('Apr 2026')?'yellow':'green')}</td>
              <td>${badge(k.status,k.status==='Beroperasi'?'green':'red')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('home');
}

function showOperasionalRealtime() {
  setTitle('Operasional Real-Time');
  // Simulated live clock
  setContent(`
    <div class="dash-panel">
      <h3>📡 Status Operasional Real-Time <span id="live-clock" style="font-size:0.85rem;font-weight:400;color:#64748b;margin-left:1rem;"></span></h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Operator</th><th>Rute</th><th>Jam Berangkat</th><th>Penumpang</th><th>Kapasitas</th><th>Sertifikat</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.kapal.map(k=>{
              const j = DB.jadwal.find(x=>x.kapal===k.nama);
              return `<tr>
                <td><strong>${k.nama}</strong></td><td>${k.operator}</td>
                <td>${k.rute}</td><td>${j?j.jam+' WIB':'—'}</td>
                <td>${j?j.terisi:'—'} org</td><td>${j?j.kapasitas:'—'} org</td>
                <td>${badge('s/d '+k.sertifikat,k.sertifikat.includes('Apr 2026')?'yellow':'green')}</td>
                <td>${badge(k.status,k.status==='Beroperasi'?'green':k.status==='Docking'?'red':'yellow')}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  // Live clock
  const tick = () => { const el=document.getElementById('live-clock'); if(el) el.textContent='🕐 '+new Date().toLocaleTimeString('id-ID'); };
  tick(); setInterval(tick, 1000);
  setActive('operasional');
}

function showKeselamatan() {
  setTitle('Keselamatan & Sertifikasi');
  setContent(`
    <div class="dash-panel">
      <h3>🛡️ Status Sertifikasi Kapal</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Kapal</th><th>Sertifikat Laik Laut</th><th>Sertifikat Keselamatan</th><th>Asuransi</th><th>Awak Bersertifikat</th><th>Keterangan</th></tr></thead>
          <tbody>
            ${DB.kapal.map(k=>{
              const isExpiring = k.sertifikat.includes('Apr 2026');
              return `<tr>
                <td><strong>${k.nama}</strong></td>
                <td>${badge('s/d '+k.sertifikat, isExpiring?'yellow':'green')}</td>
                <td>${badge('s/d '+k.sertifikat, isExpiring?'yellow':'green')}</td>
                <td>${badge('Aktif','green')}</td>
                <td>${badge(k.awak+'/'+k.awak+' orang','green')}</td>
                <td style="color:#64748b;font-size:0.85rem;">${isExpiring?'⚠️ Perpanjang segera!':'—'}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="dash-panel">
      <h3>⚠️ Peringatan & Tindakan</h3>
      <div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:12px;padding:1rem;margin-bottom:1rem;">
        <strong style="color:#b45309;">⚠️ KM Kelapa Jaya</strong> – Sertifikat Laik Laut akan kadaluarsa pada 30 April 2026. Segera hubungi operator untuk perpanjangan.
        <div style="margin-top:0.8rem;">
          <button class="action-btn" onclick="toast('Notifikasi dikirim ke PT Marina!')">📢 Kirim Notifikasi Operator</button>
        </div>
      </div>
    </div>`);
  setActive('keselamatan');
}

function showStatistikDishub() {
  setTitle('Statistik Penumpang');
  const totalBulan = DB.tiket.filter(t=>t.status==='lunas').reduce((a,t)=>a+t.jml,0);
  setContent(`
    <div class="stats-grid">
      ${statCard('👥',totalBulan,'Total Penumpang Bulan Ini')}
      ${statCard('🚢',DB.jadwal.length+'×30','Total Pelayaran Bulan Ini')}
      ${statCard('⚠️',DB.insiden.length,'Insiden Tercatat')}
      ${statCard('✅','100%','Tingkat Keselamatan')}
    </div>
    <div class="dash-panel">
      <h3>📊 Distribusi Penumpang Per Tujuan</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Tujuan</th><th>Total Penumpang</th><th>Frekuensi</th><th>Visualisasi</th></tr></thead>
          <tbody>
            ${DB.jadwal.map(j=>{
              const pnp = DB.tiket.filter(t=>t.tujuan===j.tujuan&&t.status==='lunas').reduce((a,t)=>a+t.jml,0);
              const freq = DB.tiket.filter(t=>t.tujuan===j.tujuan).length;
              return `<tr>
                <td>${j.tujuan}</td><td>${pnp} orang</td><td>${freq} perjalanan</td>
                <td><div style="display:flex;align-items:center;gap:0.5rem;">
                  <div style="width:${Math.max(pnp*8,10)}px;height:10px;background:var(--ocean-light);border-radius:5px;"></div>
                  <span>${pnp}</span>
                </div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="dash-panel">
      <h3>⚡ Aksi</h3>
      <div class="quick-actions">
        <button class="action-btn" onclick="exportTransaksi()">📥 Export Statistik CSV</button>
        <button class="action-btn" onclick="window.print()">🖨️ Cetak Laporan</button>
      </div>
    </div>`);
  setActive('statistik');
}

function showLaporanInsiden() {
  setTitle('Laporan Insiden');
  setContent(`
    <div class="dash-panel">
      <h3>⚠️ Daftar Insiden Tercatat</h3>
      <button class="action-btn primary" onclick="formTambahInsiden()" style="margin-bottom:1rem;">➕ Laporkan Insiden Baru</button>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>ID</th><th>Tanggal</th><th>Kapal</th><th>Jenis</th><th>Lokasi</th><th>Deskripsi</th><th>Status</th></tr></thead>
          <tbody>
            ${DB.insiden.map(inc=>`<tr>
              <td><strong>${inc.id}</strong></td><td>${inc.tgl}</td>
              <td>${inc.kapal}</td><td>${badge(inc.jenis,'blue')}</td><td>${inc.lokasi}</td>
              <td style="font-size:0.83rem;max-width:250px;">${inc.desc}</td>
              <td>${badge(inc.status,'green')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`);
  setActive('insiden');
}

function formTambahInsiden() {
  openDashModal(`
    <button class="modal-close" onclick="closeDashModal()">&times;</button>
    <div class="modal-header"><div class="modal-icon-wrap">⚠️</div><h3>Laporkan Insiden</h3></div>
    <form onsubmit="simpanInsiden(event)">
      <div class="form-row-2">
        <div class="form-group"><label>Kapal Terlibat</label>
          <select id="ins-kapal" required>
            <option value="">-- Pilih --</option>
            ${DB.kapal.map(k=>`<option>${k.nama}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Tanggal Kejadian</label>
          <input type="date" id="ins-tgl" required value="${new Date().toISOString().split('T')[0]}">
        </div>
      </div>
      <div class="form-row-2">
        <div class="form-group"><label>Jenis Insiden</label>
          <select id="ins-jenis" required>
            <option>Mekanik</option><option>Cuaca</option><option>Administrasi</option><option>Keselamatan</option><option>Lainnya</option>
          </select>
        </div>
        <div class="form-group"><label>Lokasi Kejadian</label>
          <input type="text" id="ins-lok" required placeholder="Perairan / Dermaga ...">
        </div>
      </div>
      <div class="form-group"><label>Deskripsi Kejadian</label>
        <textarea id="ins-desc" required rows="3" placeholder="Jelaskan kronologi kejadian..." style="width:100%;padding:0.8rem;border:2px solid var(--ocean-light);border-radius:10px;font-family:Poppins,sans-serif;resize:vertical;"></textarea>
      </div>
      <div class="form-group"><label>Tindakan yang Dilakukan</label>
        <textarea id="ins-tindak" rows="2" placeholder="Tindakan penanganan yang sudah dilakukan..." style="width:100%;padding:0.8rem;border:2px solid var(--ocean-light);border-radius:10px;font-family:Poppins,sans-serif;resize:vertical;"></textarea>
      </div>
      <button type="submit" class="cta-button" style="width:100%;margin-top:0.5rem;">📝 Simpan Laporan</button>
    </form>`);
}
function simpanInsiden(e) {
  e.preventDefault();
  const kapal = document.getElementById('ins-kapal').value;
  const id = 'INC-' + String(DB.insiden.length + 1).padStart(3,'0');
  toast(`✅ Insiden ${id} untuk ${kapal} berhasil dilaporkan!`);
  closeDashModal();
  showLaporanInsiden();
}

function showKepatuhanRegulasi() {
  setTitle('Kepatuhan Regulasi');
  setContent(`
    <div class="dash-panel">
      <h3>📋 Status Kepatuhan Per Operator</h3>
      <div style="overflow-x:auto;">
        <table class="dash-table">
          <thead><tr><th>Operator</th><th>Jumlah Kapal</th><th>Sertifikat Lengkap</th><th>Perlu Perpanjangan</th><th>Tingkat Kepatuhan</th></tr></thead>
          <tbody>
            ${['PT Lautan Maju','CV Nusantara','PT Marina'].map(op=>{
              const kapalOp = DB.kapal.filter(k=>k.operator===op);
              const expiring = kapalOp.filter(k=>k.sertifikat.includes('Apr 2026')).length;
              const pct = kapalOp.length ? Math.round((kapalOp.length-expiring)/kapalOp.length*100) : 100;
              return `<tr>
                <td><strong>${op}</strong></td><td>${kapalOp.length} kapal</td>
                <td>${badge((kapalOp.length-expiring)+' kapal','green')}</td>
                <td>${expiring>0?badge(expiring+' kapal','yellow'):badge('Tidak ada','green')}</td>
                <td>${badge(pct+'%',pct===100?'green':pct>=80?'yellow':'red')}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="dash-panel">
      <h3>📜 Regulasi Berlaku</h3>
      ${[
        ['PM 7 Tahun 2019','Standar Keselamatan Kapal Penumpang','Berlaku','Des 2019'],
        ['PM 91 Tahun 2021','Manajemen Keselamatan Kapal','Berlaku','Jan 2022'],
        ['Permenhub No. 14/2021','Manifest Penumpang Digital','Berlaku','Mar 2021'],
        ['SKD Dishub DKI 2023','Operasional Kapal Kepulauan Seribu','Berlaku','Jan 2023'],
      ].map(([no,nama,status,berlaku])=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 0;border-bottom:1px solid #f1f5f9;flex-wrap:wrap;gap:0.5rem;">
          <div><strong style="font-size:0.88rem;">${no}</strong><br><span style="font-size:0.82rem;color:#64748b;">${nama}</span></div>
          <div style="display:flex;align-items:center;gap:0.5rem;">${badge(status,'green')}<small style="color:#94a3b8;">Sejak ${berlaku}</small></div>
        </div>`).join('')}
    </div>`);
  setActive('regulasi');
}

function buildAccessDenied() {
  setContent(`<div class="access-denied"><div class="denied-icon">🚫</div><h2>Akses Ditolak</h2><p>Anda tidak memiliki hak akses ke halaman ini.</p><br><a href="index.html" class="action-btn primary">← Kembali ke Beranda</a></div>`);
}

function printDashEtiket() {
  const area = document.getElementById('dash-etiket-print');
  if (!area) return;
  const win = window.open('', '_blank', 'width=750,height=900');
  win.document.write(`<!DOCTYPE html><html><head>
    <meta charset="UTF-8"><title>E-Tiket Tiket1000</title>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      body{margin:0;padding:20px;font-family:'Poppins',sans-serif;background:#f1f5f9;}
      .etiket-wrapper{max-width:680px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);}
      .etiket-top-bar{background:linear-gradient(135deg,#0A2463,#1E5A99);color:#fff;padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;}
      .etiket-logo{font-family:'Oswald',sans-serif;font-size:1.4rem;font-weight:700;letter-spacing:2px;}
      .etiket-no-badge{background:rgba(255,255,255,0.2);padding:0.3rem 1rem;border-radius:50px;font-size:0.85rem;}
      .etiket-rute-banner{background:#f8fafc;padding:1.2rem 1.5rem;display:flex;align-items:center;gap:0;border-bottom:1px solid #e2e8f0;}
      .etiket-rute-col{min-width:130px;}.etiket-rute-col.right{text-align:right;}
      .etiket-rute-label{font-size:0.7rem;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:0.2rem;}
      .etiket-rute-value{font-family:'Oswald',sans-serif;font-size:1.05rem;font-weight:700;color:#0A2463;}
      .etiket-rute-divider{flex:1;display:flex;align-items:center;gap:0;}
      .etiket-rute-line{flex:1;height:2px;background:#bfdbfe;}
      .etiket-rute-dot{width:10px;height:10px;background:#3E92CC;border-radius:50%;}
      .etiket-ship{font-size:1.5rem;margin:0 0.4rem;}
      .etiket-body-wrap{padding:1.2rem 1.5rem;display:flex;gap:1.5rem;align-items:start;}
      .etiket-info-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0.9rem 1.2rem;}
      .etiket-info-item{display:flex;flex-direction:column;}
      .etiket-info-label{font-size:0.7rem;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.18rem;}
      .etiket-info-val{font-size:0.88rem;font-weight:600;color:#1e293b;}
      .etiket-qr-section{display:flex;flex-direction:column;align-items:center;gap:0.5rem;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:1rem;min-width:158px;}
      .etiket-qr-label{font-size:0.68rem;color:#64748b;text-align:center;margin:0;}
      .etiket-qr-no{font-family:'Oswald',sans-serif;font-size:0.82rem;color:#0A2463;letter-spacing:1px;margin:0;font-weight:700;}
      .etiket-perforated{border-top:2px dashed #cbd5e1;margin:0 1rem;}
      .etiket-footer-bar{padding:1rem 1.5rem;display:flex;gap:2rem;align-items:center;background:#f8fafc;flex-wrap:wrap;}
      .etiket-footer-label{font-size:0.7rem;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:0.1rem;}
      .etiket-footer-val{font-size:0.95rem;font-weight:700;color:#1e293b;}
      .etiket-total-box{margin-left:auto;background:linear-gradient(135deg,#FF6B6B,#FD79A8);border-radius:12px;padding:0.6rem 1.4rem;text-align:right;}
      .etiket-total-box .etiket-footer-label{color:rgba(255,255,255,0.85);}
      .etiket-total-val{font-family:'Oswald',sans-serif;font-size:1.4rem;font-weight:700;color:#fff;}
      .etiket-status-bar{padding:0.7rem 1.5rem;background:linear-gradient(90deg,#f0fdf4,#dcfce7);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;}
      .etiket-status-badge{background:#22c55e;color:#fff;padding:0.3rem 1rem;border-radius:50px;font-size:0.8rem;font-weight:700;}
    </style>
  </head><body>${area.outerHTML}</body></html>`);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 600);
}
