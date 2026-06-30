/* ============================================================
   SCRIPT.JS – Tiket1000 Main Script
   ============================================================ */

// ── Harga per rute ──
const HARGA_RUTE = {
    'Marina Ancol': {
        'Pulau Tidung':      150000,
        'Pulau Pramuka':     130000,
        'Pulau Harapan':     140000,
        'Pulau Pari':        120000,
        'Pulau Untung Jawa': 100000,
        'Pulau Kelapa':      160000,
    },
    'Muara Angke': {
        'Pulau Pramuka':     65000,
        'Pulau Kelapa':      75000,
        'Pulau Harapan':     70000,
        'Pulau Tidung':      80000,
        'Pulau Untung Jawa': 55000,
        'Pulau Pari':        72000,
    },
    'Muara Baru': {
        'Pulau Untung Jawa': 45000,
        'Pulau Pari':        65000,
        'Pulau Tidung':      85000,
        'Pulau Pramuka':     70000,
        'Pulau Harapan':     75000,
        'Pulau Kelapa':      90000,
    },
    'Tanjung Priok': {
        'Pulau Untung Jawa': 50000,
        'Pulau Pramuka':     80000,
        'Pulau Tidung':      90000,
        'Pulau Harapan':     85000,
        'Pulau Kelapa':      95000,
        'Pulau Pari':        78000,
    },
};

const WAKTU_BY_ASAL = {
    'Marina Ancol':  ['08:00','09:00','10:00','11:00','12:00','13:00'],
    'Muara Angke':   ['07:00','08:30','09:30','11:00','13:00'],
    'Muara Baru':    ['07:30','09:00','11:00','13:30'],
    'Tanjung Priok': ['08:00','10:00','12:00','14:00'],
};

const rupiah = n => 'Rp ' + Number(n).toLocaleString('id-ID');

// ── Set minimum date ──
const today = new Date().toISOString().split('T')[0];
const tanggalEl = document.getElementById('tanggal');
if (tanggalEl) tanggalEl.setAttribute('min', today);

// ── Payment info ──
const paymentInfo = {
    'BCA':        'Transfer ke rekening BCA: 1234567890 a.n. PT Tiket1000 Indonesia. Konfirmasi otomatis setelah pembayaran terverifikasi (max 1 jam).',
    'Mandiri':    'Transfer ke rekening Mandiri: 0987654321 a.n. PT Tiket1000 Indonesia. Konfirmasi otomatis setelah pembayaran terverifikasi (max 1 jam).',
    'BNI':        'Transfer ke rekening BNI: 1122334455 a.n. PT Tiket1000 Indonesia. Konfirmasi otomatis setelah pembayaran terverifikasi (max 1 jam).',
    'BRI':        'Transfer ke rekening BRI: 5566778899 a.n. PT Tiket1000 Indonesia. Konfirmasi otomatis setelah pembayaran terverifikasi (max 1 jam).',
    'GoPay':      'Scan QR Code GoPay yang akan dikirim via email. Pembayaran terverifikasi secara instant.',
    'OVO':        'Scan QR Code OVO yang akan dikirim via email. Pembayaran terverifikasi secara instant.',
    'Dana':       'Scan QR Code DANA yang akan dikirim via email. Pembayaran terverifikasi secara instant.',
    'ShopeePay':  'Scan QR Code ShopeePay yang akan dikirim via email. Pembayaran terverifikasi secara instant.',
    'LinkAja':    'Scan QR Code LinkAja yang akan dikirim via email. Pembayaran terverifikasi secara instant.',
    'Visa':       'Anda akan diarahkan ke halaman pembayaran aman untuk memasukkan detail kartu Visa Anda.',
    'Mastercard': 'Anda akan diarahkan ke halaman pembayaran aman untuk memasukkan detail kartu Mastercard Anda.',
    'JCB':        'Anda akan diarahkan ke halaman pembayaran aman untuk memasukkan detail kartu JCB Anda.',
    'QRIS':       'Scan QR Code QRIS yang dapat dibayar melalui semua aplikasi e-wallet. Pembayaran terverifikasi instant.',
    'Indomaret':  'Kode pembayaran akan dikirim via email. Bayar di kasir Indomaret terdekat dalam 24 jam.',
    'Alfamart':   'Kode pembayaran akan dikirim via email. Bayar di kasir Alfamart terdekat dalam 24 jam.',
};

function updateModalPaymentInfo() {
    const pembayaran = document.getElementById('m-pembayaran').value;
    const infoDiv    = document.getElementById('modal-payment-info');
    const detailsP   = document.getElementById('modal-payment-details');
    if (pembayaran && paymentInfo[pembayaran]) {
        detailsP.textContent = paymentInfo[pembayaran];
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
    updateRuteSummary();
}

// ── Update tujuan & waktu options based on asal ──
function updateTujuanByAsal() {
    const asal   = document.getElementById('m-asal').value;
    const tujuan = document.getElementById('m-tujuan');
    const waktu  = document.getElementById('m-waktu');

    // Reset selections
    tujuan.value = '';
    waktu.innerHTML = '<option value="">Pilih Waktu</option>';

    if (!asal) { updateRuteSummary(); return; }

    // Update waktu options
    const waktuList = WAKTU_BY_ASAL[asal] || [];
    waktuList.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w; opt.textContent = w + ' WIB';
        waktu.appendChild(opt);
    });

    updateRuteSummary();
}

// ── Show rute + harga summary box ──
function updateRuteSummary() {
    const asal    = document.getElementById('m-asal')?.value;
    const tujuan  = document.getElementById('m-tujuan')?.value;
    const jumlah  = parseInt(document.getElementById('m-jumlah')?.value) || 1;
    const box     = document.getElementById('rute-summary');
    if (!box) return;

    if (asal && tujuan) {
        const harga = HARGA_RUTE[asal]?.[tujuan];
        if (harga) {
            const total = harga * jumlah;
            box.style.display = 'block';
            box.innerHTML = `
                <div class="rute-summary-inner">
                    <div class="rute-path">
                        <span class="rute-point asal">📍 ${asal}</span>
                        <span class="rute-arrow">───⛵──▶</span>
                        <span class="rute-point tujuan">🏝️ ${tujuan}</span>
                    </div>
                    <div class="rute-price">
                        <span>Harga/tiket: <strong>${rupiah(harga)}</strong></span>
                        <span class="rute-total">Total (${jumlah}×): <strong style="color:var(--coral);font-size:1.15rem;">${rupiah(total)}</strong></span>
                    </div>
                </div>`;
        } else {
            box.style.display = 'none';
        }
    } else {
        box.style.display = 'none';
    }
}

// ── Contact form ──
function submitContact(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    alert(`Terima kasih ${data.nama}!\n\nPesan Anda telah terkirim. Tim kami akan segera menghubungi Anda melalui ${data.email}.`);
    e.target.reset();
}

// ── pesanTiket: called from table buttons ──
function pesanTiket(tujuan, waktu, asal) {
    openModal(tujuan, waktu, asal);
}

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── Scroll animation ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


/* ═══════════════════════════════════════════════
   BOOKING MODAL
═══════════════════════════════════════════════ */

function openModal(tujuan, waktu, asal) {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Set min date
    document.getElementById('m-tanggal').setAttribute('min', new Date().toISOString().split('T')[0]);

    // Pre-fill from table click
    if (asal) {
        document.getElementById('m-asal').value = asal;
        updateTujuanByAsal();
    }
    if (tujuan) document.getElementById('m-tujuan').value = tujuan;
    if (waktu)  document.getElementById('m-waktu').value  = waktu;

    updateRuteSummary();

    // Live update on jumlah change
    const jmlEl = document.getElementById('m-jumlah');
    if (jmlEl && !jmlEl.dataset.listener) {
        jmlEl.addEventListener('input', updateRuteSummary);
        jmlEl.dataset.listener = '1';
    }
    const tujuanEl = document.getElementById('m-tujuan');
    if (tujuanEl && !tujuanEl.dataset.listener) {
        tujuanEl.addEventListener('change', updateRuteSummary);
        tujuanEl.dataset.listener = '1';
    }
}

function closeModal() {
    document.getElementById('booking-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeModalOnOverlay(event) {
    if (event.target === document.getElementById('booking-modal')) closeModal();
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeEtiket(); }
});


/* ═══════════════════════════════════════════════
   SUBMIT BOOKING → TAMPILKAN E-TIKET + QR CODE
═══════════════════════════════════════════════ */

function submitModalBooking(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // Validation
    if (!data.asal)    { alert('Pilih pelabuhan asal terlebih dahulu!'); return; }
    if (!data.tujuan)  { alert('Pilih tujuan pulau terlebih dahulu!');   return; }
    if (!data.tanggal) { alert('Pilih tanggal keberangkatan!');           return; }
    if (!data.waktu)   { alert('Pilih waktu keberangkatan!');             return; }

    const noTiket = 'TKT-' + Date.now().toString().slice(-7);
    const harga   = HARGA_RUTE[data.asal]?.[data.tujuan] || 0;
    const total   = harga * parseInt(data.jumlah || 1);
    const tglFmt  = new Date(data.tanggal).toLocaleDateString('id-ID', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

    // QR data – encode all booking info as JSON string
    const qrData = JSON.stringify({
        tiket: noTiket,
        nama:  data.nama,
        asal:  data.asal,
        tujuan:data.tujuan,
        tgl:   data.tanggal,
        jam:   data.waktu,
        jml:   data.jumlah,
        bayar: data.pembayaran,
        total: total,
    });

    closeModal();
    e.target.reset();
    document.getElementById('modal-payment-info').style.display = 'none';
    document.getElementById('rute-summary').style.display = 'none';

    setTimeout(() => showEtiket({
        noTiket, nama: data.nama, email: data.email, telepon: data.telepon,
        asal: data.asal, tujuan: data.tujuan, tanggal: tglFmt, rawTanggal: data.tanggal,
        waktu: data.waktu, jumlah: data.jumlah, pembayaran: data.pembayaran,
        harga, total, qrData,
    }), 250);
}


/* ═══════════════════════════════════════════════
   E-TIKET MODAL + QR CODE
═══════════════════════════════════════════════ */

function showEtiket(d) {
    const modal   = document.getElementById('etiket-modal');
    const content = document.getElementById('etiket-content');

    content.innerHTML = `
        <div class="etiket-wrapper" id="etiket-print-area">

            <!-- Header -->
            <div class="etiket-top-bar">
                <div class="etiket-logo">⚓ TIKET1000</div>
                <div class="etiket-no-badge">${d.noTiket}</div>
            </div>

            <!-- Rute banner -->
            <div class="etiket-rute-banner">
                <div class="etiket-rute-col">
                    <div class="etiket-rute-label">ASAL</div>
                    <div class="etiket-rute-value">${d.asal}</div>
                </div>
                <div class="etiket-rute-divider">
                    <div class="etiket-rute-dot"></div>
                    <div class="etiket-rute-line"></div>
                    <span class="etiket-ship">⛵</span>
                    <div class="etiket-rute-line"></div>
                    <div class="etiket-rute-dot"></div>
                </div>
                <div class="etiket-rute-col right">
                    <div class="etiket-rute-label">TUJUAN</div>
                    <div class="etiket-rute-value">${d.tujuan}</div>
                </div>
            </div>

            <!-- Body: info + QR -->
            <div class="etiket-body-wrap">
                <div class="etiket-info-grid">
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">👤 Penumpang</span>
                        <span class="etiket-info-val">${d.nama}</span>
                    </div>
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">📅 Tanggal</span>
                        <span class="etiket-info-val">${d.tanggal}</span>
                    </div>
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">🕐 Keberangkatan</span>
                        <span class="etiket-info-val">${d.waktu} WIB</span>
                    </div>
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">👥 Penumpang</span>
                        <span class="etiket-info-val">${d.jumlah} Orang</span>
                    </div>
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">💳 Pembayaran</span>
                        <span class="etiket-info-val">${d.pembayaran}</span>
                    </div>
                    <div class="etiket-info-item">
                        <span class="etiket-info-label">📧 Email</span>
                        <span class="etiket-info-val" style="font-size:0.78rem;">${d.email}</span>
                    </div>
                </div>

                <!-- QR Code -->
                <div class="etiket-qr-section">
                    <div id="qrcode-canvas"></div>
                    <p class="etiket-qr-label">Scan untuk verifikasi tiket</p>
                    <p class="etiket-qr-no">${d.noTiket}</p>
                </div>
            </div>

            <!-- Perforated divider -->
            <div class="etiket-perforated"></div>

            <!-- Total footer -->
            <div class="etiket-footer-bar">
                <div>
                    <span class="etiket-footer-label">Harga/Tiket</span>
                    <span class="etiket-footer-val">${rupiah(d.harga)}</span>
                </div>
                <div>
                    <span class="etiket-footer-label">Jumlah</span>
                    <span class="etiket-footer-val">${d.jumlah}×</span>
                </div>
                <div class="etiket-total-box">
                    <span class="etiket-footer-label">TOTAL BAYAR</span>
                    <span class="etiket-total-val">${rupiah(d.total)}</span>
                </div>
            </div>

            <!-- Status -->
            <div class="etiket-status-bar">
                <span class="etiket-status-badge">✅ TIKET TERKONFIRMASI</span>
                <span style="font-size:0.78rem;color:#64748b;">E-tiket dikirim ke ${d.email}</span>
            </div>

        </div>`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Generate QR Code
    setTimeout(() => {
        const qrEl = document.getElementById('qrcode-canvas');
        if (qrEl && typeof QRCode !== 'undefined') {
            qrEl.innerHTML = '';
            new QRCode(qrEl, {
                text: d.qrData,
                width: 128,
                height: 128,
                colorDark: '#0A2463',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H,
            });
        }
    }, 100);
}

function closeEtiket() {
    document.getElementById('etiket-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeEtiketOnOverlay(e) {
    if (e.target === document.getElementById('etiket-modal')) closeEtiket();
}

function printEtiket() {
    const area = document.getElementById('etiket-print-area');
    if (!area) return;
    const win = window.open('', '_blank', 'width=750,height=900');
    win.document.write(`<!DOCTYPE html><html><head>
        <meta charset="UTF-8">
        <title>E-Tiket Tiket1000</title>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
            body { margin: 0; padding: 20px; font-family: 'Poppins', sans-serif; background: #f1f5f9; }
            .etiket-wrapper { max-width: 680px; margin: 0 auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
            ${getEtiketPrintStyles()}
        </style>
    </head><body>${area.outerHTML}</body></html>`);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); }, 600);
}

function getEtiketPrintStyles() {
    // Minimal inline styles for print window
    return `
        .etiket-top-bar{background:linear-gradient(135deg,#0A2463,#1E5A99);color:#fff;padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;}
        .etiket-logo{font-family:'Oswald',sans-serif;font-size:1.4rem;font-weight:700;letter-spacing:2px;}
        .etiket-no-badge{background:rgba(255,255,255,0.2);padding:0.3rem 1rem;border-radius:50px;font-size:0.85rem;}
        .etiket-rute-banner{background:#f8fafc;padding:1.2rem 1.5rem;display:flex;align-items:center;gap:0;}
        .etiket-rute-col{min-width:140px;}.etiket-rute-col.right{text-align:right;}
        .etiket-rute-label{font-size:0.72rem;color:#64748b;text-transform:uppercase;letter-spacing:1px;}
        .etiket-rute-value{font-family:'Oswald',sans-serif;font-size:1.1rem;font-weight:700;color:#0A2463;}
        .etiket-rute-divider{flex:1;display:flex;align-items:center;gap:0;}
        .etiket-rute-line{flex:1;height:2px;background:#bfdbfe;}
        .etiket-rute-dot{width:10px;height:10px;background:#3E92CC;border-radius:50%;}
        .etiket-ship{font-size:1.4rem;margin:0 0.3rem;}
        .etiket-body-wrap{padding:1.2rem 1.5rem;display:flex;gap:1.5rem;align-items:start;}
        .etiket-info-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;}
        .etiket-info-item{display:flex;flex-direction:column;}
        .etiket-info-label{font-size:0.72rem;color:#64748b;margin-bottom:0.15rem;}
        .etiket-info-val{font-size:0.88rem;font-weight:600;color:#1e293b;}
        .etiket-qr-section{display:flex;flex-direction:column;align-items:center;gap:0.4rem;padding:0.8rem;background:#f8fafc;border-radius:12px;min-width:160px;}
        .etiket-qr-label{font-size:0.7rem;color:#64748b;text-align:center;}
        .etiket-qr-no{font-family:'Oswald',sans-serif;font-size:0.85rem;color:#0A2463;letter-spacing:1px;}
        .etiket-perforated{border-top:2px dashed #cbd5e1;margin:0 1rem;}
        .etiket-footer-bar{padding:1rem 1.5rem;display:flex;gap:1.5rem;align-items:center;background:#f8fafc;}
        .etiket-footer-label{font-size:0.72rem;color:#64748b;display:block;}
        .etiket-footer-val{font-size:0.9rem;font-weight:600;color:#1e293b;}
        .etiket-total-box{margin-left:auto;background:linear-gradient(135deg,#FF6B6B,#FD79A8);border-radius:12px;padding:0.6rem 1.2rem;text-align:right;}
        .etiket-total-box .etiket-footer-label{color:rgba(255,255,255,0.8);}
        .etiket-total-val{font-family:'Oswald',sans-serif;font-size:1.3rem;font-weight:700;color:#fff;}
        .etiket-status-bar{padding:0.7rem 1.5rem;background:linear-gradient(90deg,#f0fdf4,#dcfce7);display:flex;justify-content:space-between;align-items:center;}
        .etiket-status-badge{background:#22c55e;color:#fff;padding:0.3rem 1rem;border-radius:50px;font-size:0.8rem;font-weight:700;}
    `;
}
