/* Animasi demo untuk setiap fitur. Dipakai oleh index.html (EN) dan id.html (ID).
   Demo dipasang otomatis di atas tiap item `.items > div`, sesuai urutan. */
(function () {
  var id = document.documentElement.lang === 'id';
  var L = function (e, i) { return id ? i : e; };

  var css = '.demo{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--panel);margin-bottom:14px;font-size:.92rem}' +
    '.dh{display:flex;gap:5px;padding:7px 10px;background:var(--side);border-bottom:1px solid var(--line)}' +
    '.dh i{width:8px;height:8px;border-radius:50%;background:var(--line)}.dh i:first-child{background:var(--red)}' +
    '.db{position:relative;padding:12px 14px;height:150px;--ac:var(--red2)}' +
    '.db .l{min-height:1.6em;line-height:1.6;white-space:pre-wrap;font-family:var(--body)}' +
    '.db .l.r{font:400 .85rem/1.9 var(--mono);color:var(--mute)}' +
    '.db .h1{font:700 1.3rem var(--head)}.db .h2{font:700 1.1rem var(--head)}.db .h3{font:700 .95rem var(--head)}' +
    '.db .lk{color:var(--blue);text-decoration:underline;text-underline-offset:3px}' +
    '.db .as{color:var(--blue);font-weight:700;text-decoration:none}' +
    '.db .d{color:var(--mute);text-decoration:line-through}' +
    '.db .tk{color:#e8822c;font-weight:700}' +
    '.db .td{color:#6f6c6c;font-weight:400;text-decoration:none}' +
    '.db .q{border-left:3px solid var(--mute);padding-left:10px;color:var(--mute)}' +
    '.db .sv{color:var(--ok);font-size:.85rem}' +
    '.db .co{margin:0;font-size:.9rem}' +
    '.db table{width:auto}.db td,.db th{padding:3px 14px;font-size:.85rem}' +
    '.db mark{background:var(--amber);color:#111;border-radius:2px;padding:0 2px}' +
    '.db .ph{display:inline-block;height:.6em;width:5em;background:var(--line);border-radius:3px;margin-right:6px}' +
    // '.db .img{height:64px;width:120px;border-radius:6px;background:linear-gradient(160deg,#4a90d9,#299429);position:relative}' +
    // '.db .img:after{content:"";position:absolute;right:16px;top:10px;width:16px;height:16px;border-radius:50%;background:#faebd7}' +
    '.db img.img{display:block;margin:8px auto 0;height:125px;width:auto;max-width:100%;object-fit:cover;border-radius:6px;animation:imgin .5s ease}' +
    '@keyframes imgin{from{opacity:0;transform:scale(.92)}}' +
    '.db .pill{display:inline-block;background:var(--ac);color:#faebd7;padding:5px 12px;border-radius:7px;font-weight:600;transition:background .5s}' +
    '.db .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:240px}' +
    '.db .cal i{font-style:normal;text-align:center;font-size:.78rem;padding:3px 0;border-radius:5px;color:var(--mute)}' +
    '.db .cal i.m{background:var(--ac);color:#faebd7}' +
    '.db pre{margin:0;padding:8px 10px;font-size:.8rem;line-height:1.5;transition:background .4s}' +
    '.db .k{color:#ee6a5b}.db .s{color:#e8b86b}.db .c{color:var(--mute)}' +
    '.db[data-th=a] pre{background:#2a1f1d}' +
    '.db[data-th=b] pre{background:#0f1a2a}.db[data-th=b] .k{color:#4a90d9}.db[data-th=b] .s{color:#7bd88f}' +
    '.db[data-th=c] pre{background:#1f1530}.db[data-th=c] .k{color:#b05bc7}.db[data-th=c] .s{color:#f2d96b}' +
    '.pp{position:absolute;left:44px;z-index:2;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:3px;box-shadow:0 10px 24px -10px #000;font-size:.85rem;display:none}' +
    '.pp.s{display:block}.pp div{padding:4px 10px;border-radius:5px;white-space:nowrap}.pp .on{background:var(--ac);color:#faebd7}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var MK = [3, 6, 9, 13, 16, 20, 24];
  function cal(n) {
    var h = '<div class="cal">';
    for (var i = 1; i <= 28; i++) h += '<i' + (MK.slice(0, n).indexOf(i) > -1 ? ' class="m"' : '') + '>' + i + '</i>';
    return h + '</div>';
  }
  var calSteps = [];
  for (var n = 0; n < 8; n++) calSteps.push(['h', 0, cal(n)], ['w', n ? 420 : 200]);
  function menu(i) {
    return ['Copy', 'Cut', 'Paste', 'Undo', 'Select All', 'Insert Emoji'].map(function (x, j) {
      return '<div' + (j === i ? ' class="on"' : '') + '>' + x + '</div>';
    }).join('');
  }
  var task = L('Task', 'Tugas'), quote = L('Quote', 'Kutipan'), note = L('NOTE', 'CATATAN'), txt = L('Text here', 'Isi di sini');
  var idea = L('New idea', 'Ide baru'), see = L('See', 'Lihat'), nt = L('Note', 'Catatan');
  var d = '<span class="d">', e = '</span>';

  /* [jumlah baris, langkah]. Langkah: t=ketik, h=ganti html, w=tunggu, p=popup, x=kosongkan, v=warna, k=tema */
  var DEMOS = [
    /* Menulis */
    [2, [['t', 0, '**Text** *Text* <ins>Text</ins>'], ['w', 500], ['h', 0, '<b>Text</b> <i>Text</i> <ins>Text</ins>'],
         ['t', 1, '2<sup>2</sup>  2<sub>2</sub>'], ['w', 500], ['h', 1, '2<sup>2</sup>  2<sub>2</sub>']]],
    [3, [['t', 0, '# ' + L('Title', 'Judul')], ['w', 300], ['h', 0, '<span class="h1">' + L('Title', 'Judul') + e],
         ['t', 1, '## ' + L('Section', 'Bagian')], ['w', 300], ['h', 1, '<span class="h2">' + L('Section', 'Bagian') + e],
         ['t', 2, '### Sub'], ['w', 300], ['h', 2, '<span class="h3">Sub' + e]]],
    [3, [['t', 0, L('Use', 'Pakai') + ' `ls -la`'], ['w', 400], ['h', 0, L('Use', 'Pakai') + ' <code>ls -la</code>'],
         ['t', 1, '```bash'], ['w', 300], ['h', 1, '<pre><span class="k">sudo</span> apt update</pre>']]],
    [3, [['t', 0, '| A | B |'], ['t', 1, '| --- | --- |'], ['t', 2, '| 1 | 2 |'], ['w', 500], ['x'],
         ['h', 0, '<table><tr><th>A</th><th>B</th></tr><tr><td>1</td><td>2</td></tr></table>']]],
    [2, [['t', 0, '>[!' + note + ']'], ['t', 1, '>' + txt], ['w', 500], ['x'],
         ['h', 0, '<div class="co" style="--c:var(--blue)"><b>' + note + '</b>' + txt + '</div>']]],
    [3, [['t', 0, '[ ] ' + task], ['w', 300], ['h', 0, '<span class="tk">⬜ ' + task + e], ['w', 500], ['h', 0, '<span class="td">✅ ' + task + e],
         ['t', 1, '> ' + quote], ['w', 350], ['h', 1, '<div class="q">' + quote + '</div>']]],
    /* Menghubungkan */
    [1, [['t', 0, see + ' [[' + L('Ap', 'Ri')], ['p', 0, '<div class="on">' + L('App research', 'Riset aplikasi') + '</div><div>' + L('Apple notes', 'Ringkasan') + '</div>'],
         ['w', 1000], ['p', 0, ''], ['h', 0, see + ' <span class="lk">' + L('App research', 'Riset aplikasi') + e]]],
    [2, [['h', 0, L('Open', 'Buka') + ' <span class="lk">' + idea + '</span> 👆'], ['w', 800],
         ['h', 1, '📄 ' + L('New page created', 'Halaman baru dibuat') + ': ' + idea]]],
    [2, [['t', 0, '[Site](https://example.com)'], ['w', 400], ['h', 0, '<span class="lk">Site' + e], ['w', 600],
         ['h', 1, '<kbd>Ctrl</kbd> + ' + L('click', 'klik') + ' ➜ 🌐']]],
    [2, [['t', 0, '🔍 ' + L('Ideas', 'Ide')], ['h', 1, d + L('No match', 'Tidak ada') + e], ['w', 600],
         ['h', 1, '<kbd>Enter</kbd> ' + L('creates the note', 'membuat catatan')], ['w', 700],
         ['h', 1, '📄 ' + L('Note created', 'Catatan dibuat') + ': ' + L('Ideas', 'Ide')]]],
    /* Berkas */
    [1, [['t', 0, '/'], ['p', 0, '<div class="on">📎 Upload file</div><div>🖼️ Upload ' + L('image', 'gambar') + '</div>'],
         ['w', 1000], ['p', 0, ''], ['h', 0, '<span class="as">📎 report.pdf' + e]]],
    [2, [['t', 0, '/'], ['p', 0, '<div>📎 Upload file</div><div class="on">🖼️ Upload ' + L('image', 'gambar') + '</div>'],
        //  ['w', 1000], ['p', 0, ''], ['h', 0, '<div class="img"></div>']]],
        ['w', 1000], ['p', 0, ''], ['h', 0, '<img class="img" src="images/preview.jpg" alt="">'],
        // ['h', 1, '<span style="display:block;text-align:center;color:var(--mute);font-size:.85rem">First Date</span>']
      ]],

    [3, [['h', 0, '📎 report.pdf <span class="sv">' + L('linked', 'terhubung') + e], ['w', 500],
         ['h', 1, '🖼️ photo.png <span class="sv">' + L('linked', 'terhubung') + e], ['w', 500],
         ['h', 2, '📎 old.zip ⛓️‍💥 ' + L('unlinked', 'tidak terhubung')]]],
    [2, [['h', 0, '📄 ' + nt], ['h', 1, '📎 file.pdf'], ['w', 700], ['h', 0, d + '📄 ' + nt + e + ' 🗑️'], ['w', 600],
         ['h', 1, '📎 file.pdf 🔒 <span class="sv">' + L('kept in Assets', 'tetap di Assets') + e]]],
    /* Jurnal dan pencarian */
    [3, [['h', 0, '📅 2026-11-16'], ['h', 1, '<i class="ph"></i><i class="ph"></i>'], ['w', 800],
         ['h', 0, '📅 2026-11-17'], ['h', 1, '<i class="ph"></i>'], ['w', 800],
         ['h', 0, '📅 2026-11-18'], ['h', 1, '<i class="ph"></i><i class="ph"></i><i class="ph"></i>']]],
    [1, calSteps],
    [3, [['t', 0, '🔍 plan'], ['w', 350], ['h', 1, '2026-11-12 … <mark>plan</mark> …'], ['w', 350],
         ['h', 2, L('Project ideas', 'Ide proyek') + ' … <mark>plan</mark> …'], ['w', 600],
         ['h', 1, '<span class="lk">2026-11-12' + e + ' … <mark>plan</mark> …']]],
    [2, [['h', 0, '📄 ' + L('Old title', 'Judul lama')], ['h', 1, '📄 ' + L('Other note', 'Catatan lain')],
         ['p', 0, '<div class="on">' + L('Rename', 'Ganti nama') + '</div><div>' + L('Delete', 'Hapus') + '</div>'],
         ['w', 900], ['p', 0, ''], ['t', 0, '📄 ' + L('New title', 'Judul baru')], ['w', 300], ['h', 0, '📄 ' + L('New title', 'Judul baru')]]],
    /* Data dan tampilan */
    [2, [['t', 0, L('Buy milk', 'Beli susu')], ['w', 200], ['h', 0, L('Buy milk', 'Beli susu')],
         ['h', 1, '<span class="sv">💾 Journal/2026-11-18.md ✓' + e]]],
    [1, [['h', 0, L('Select text', 'Pilih teks')], ['p', 0, menu(0)], ['w', 450], ['p', 0, menu(1)], ['w', 450],
         ['p', 0, menu(2)], ['w', 450], ['p', 0, menu(5)], ['w', 800], ['p', 0, '']]],
    [2, [['h', 0, '<span class="pill">' + L('Selected note', 'Catatan terpilih') + e], ['h', 1, '<span style="color:var(--mute)">custom.css</span>'],
         ['w', 600], ['v', '#4a90d9'], ['w', 700], ['v', '#299429'], ['w', 700], ['v', '#b05bc7'], ['w', 700], ['v', '#ee0b0b']]],
    [1, [['h', 0, '<pre><span class="k">def</span> hi():\n  <span class="s">"JurnalTX"</span> <span class="c"># note</span></pre>'],
         ['k', 'a'], ['w', 800], ['k', 'b'], ['w', 800], ['k', 'c'], ['w', 800], ['k', 'a']]]
  ];

  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  function mk(item, def) {
    var box = document.createElement('div');
    box.className = 'demo';
    box.setAttribute('aria-hidden', 'true');
    box.innerHTML = '<div class="dh"><i></i><i></i><i></i></div><div class="db">' +
      new Array(def[0] + 1).join('<div class="l"></div>') + '<div class="pp"></div></div>';
    item.insertBefore(box, item.firstChild);
    var db = box.querySelector('.db'), ls = db.querySelectorAll('.l'), pp = db.querySelector('.pp');
    var steps = def[1], vis = false, running = false;

    function reset() {
      for (var i = 0; i < ls.length; i++) { ls[i].innerHTML = ''; ls[i].className = 'l'; }
      pp.className = 'pp';
      db.style.removeProperty('--ac');
      db.removeAttribute('data-th');
    }

    async function play(fast) {
      reset();
      for (var s = 0; s < steps.length; s++) {
        if (!fast && !vis) return;
        var op = steps[s][0], a = steps[s][1], b = steps[s][2];
        if (op === 't') {
          var l = ls[a];
          l.classList.add('r');
          if (fast) { l.textContent = b; continue; }
          for (var k = 1; k <= b.length; k++) {
            l.innerHTML = esc(b.slice(0, k)) + '<span class="caret"></span>';
            await sleep(45);
          }
          l.textContent = b;
        } else if (op === 'h') {
          ls[a].classList.remove('r');
          ls[a].innerHTML = b;
        } else if (op === 'w') {
          if (!fast) await sleep(a);
        } else if (op === 'p') {
          if (b) {
            pp.innerHTML = b;
            pp.style.top = (ls[a].offsetTop + ls[a].offsetHeight + 2) + 'px';
            pp.classList.add('s');
          } else pp.classList.remove('s');
        } else if (op === 'x') {
          for (var i = 0; i < ls.length; i++) { ls[i].innerHTML = ''; ls[i].classList.remove('r'); }
        } else if (op === 'v') db.style.setProperty('--ac', a);
        else if (op === 'k') db.setAttribute('data-th', a);
      }
    }

    async function loop() {
      running = true;
      while (vis) { await play(false); if (!vis) break; await sleep(2200); }
      running = false;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      play(true);
      return;
    }
    new IntersectionObserver(function (en) {
      vis = en[0].isIntersecting;
      if (vis && !running) loop();
    }, { threshold: 0.4 }).observe(box);
  }

  var items = document.querySelectorAll('.items > div');
  DEMOS.forEach(function (def, i) { if (items[i]) mk(items[i], def); });
})();
