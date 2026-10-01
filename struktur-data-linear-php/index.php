<?php
$page = $_GET['page'] ?? 'array';
$pages = ['array' => 'Array', 'linked-list' => 'Linked List', 'stack' => 'Stack'];
if (!array_key_exists($page, $pages)) $page = 'array';
function active($key, $page) { return $key === $page ? 'active' : ''; }
?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lab Struktur Data Linear</title>
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar">
      <a class="brand" href="index.php"><span class="brand-mark">DS</span><span><b>DataStruct</b><small>Interactive Lab</small></span></a>
      <p class="nav-label">STRUKTUR DATA</p>
      <nav>
        <a class="<?= active('array', $page) ?>" href="?page=array"><span class="nav-icon">▦</span> Array <span class="nav-tag">01</span></a>
        <a class="<?= active('linked-list', $page) ?>" href="?page=linked-list"><span class="nav-icon">⛓</span> Linked List <span class="nav-tag">02</span></a>
        <a class="<?= active('stack', $page) ?>" href="?page=stack"><span class="nav-icon">▤</span> Stack <span class="nav-tag">03</span></a>
      </nav>
      <div class="sidebar-note"><div class="note-icon">✦</div><b>Belajar sambil mencoba</b><p>Ubah data, jalankan operasi, dan amati bagaimana struktur data bekerja.</p></div>
      <div class="sidebar-footer"><span class="status-dot"></span> PHP Learning Project</div>
    </aside>
    <main class="main">
      <header class="topbar"><div><span class="eyebrow">PLAYGROUND / <?= strtoupper($pages[$page]) ?></span><h1>Struktur Data Linear</h1></div><span class="top-pill"><span class="status-dot"></span> Interactive demo</span></header>
      <section class="intro"><div><h2><?= $page === 'array' ? 'Array' : ($page === 'linked-list' ? 'Linked List' : 'Stack') ?></h2>
        <p><?= $page === 'array' ? 'Kumpulan elemen yang disimpan berurutan dan dapat diakses melalui indeks.' : ($page === 'linked-list' ? 'Kumpulan node yang saling terhubung menggunakan pointer ke node berikutnya.' : 'Struktur data dengan prinsip LIFO — Last In, First Out.') ?></p></div>
        <div class="intro-badge"><?= $page === 'array' ? 'INDEX-BASED' : ($page === 'linked-list' ? 'NODE-BASED' : 'LIFO') ?></div>
      </section>
      <?php if ($page === 'array'): ?>
        <section class="content-grid">
          <div class="panel wide"><div class="panel-head"><div><span class="step">01 / VISUALISASI</span><h3>Elemen Array</h3></div><span class="count" id="arrayCount">5 elemen</span></div>
            <div class="array-stage"><div class="index-row" id="arrayIndexes"></div><div class="array-row" id="arrayView"></div></div>
            <div class="legend"><span><i class="legend-dot purple"></i> Indeks</span><span><i class="legend-dot green"></i> Elemen terpilih</span></div>
          </div>
          <div class="panel"><div class="panel-head"><div><span class="step">02 / OPERASI</span><h3>Kelola Array</h3></div></div>
            <label class="field-label" for="arrayValue">Nilai elemen</label><div class="input-action"><input id="arrayValue" maxlength="18" placeholder="Contoh: 42"><button class="btn primary" id="arrayAdd">Tambah</button></div>
            <div class="field-gap"></div><label class="field-label" for="arrayIndex">Indeks untuk akses</label><div class="input-action"><input id="arrayIndex" type="number" min="0" placeholder="0"><button class="btn secondary" id="arrayGet">Akses</button></div>
            <div class="button-row"><button class="btn secondary" id="arrayRemove">Hapus terakhir</button><button class="btn ghost" id="arrayReset">Reset</button></div>
            <div class="result-box" id="arrayResult"><span class="result-icon">↳</span><span>Pilih operasi untuk melihat hasilnya.</span></div>
          </div>
          <div class="panel wide"><div class="panel-head"><div><span class="step">03 / CARA KERJA</span><h3>Log operasi</h3></div><button class="text-btn" id="arrayClearLog">Bersihkan log</button></div><div class="log-list" id="arrayLog"><div class="empty-log">Belum ada operasi. Coba akses salah satu indeks.</div></div></div>
        </section>
      <?php elseif ($page === 'linked-list'): ?>
        <section class="content-grid">
          <div class="panel wide"><div class="panel-head"><div><span class="step">01 / VISUALISASI</span><h3>Rantai Node</h3></div><span class="count" id="listCount">4 node</span></div>
            <div class="linked-stage" id="listView"></div><div class="legend"><span><i class="legend-dot purple"></i> Data</span><span><i class="legend-dot green"></i> Node baru</span><span>NULL = akhir list</span></div>
          </div>
          <div class="panel"><div class="panel-head"><div><span class="step">02 / OPERASI</span><h3>Kelola Linked List</h3></div></div>
            <label class="field-label" for="listValue">Nilai node</label><input class="full-input" id="listValue" maxlength="18" placeholder="Contoh: 50">
            <div class="button-row"><button class="btn primary" id="listAppend">Tambah di akhir</button><button class="btn secondary" id="listPrepend">Tambah di awal</button></div>
            <div class="field-gap"></div><label class="field-label" for="listIndex">Indeks node (mulai dari 0)</label><div class="input-action"><input id="listIndex" type="number" min="0" placeholder="0"><button class="btn secondary" id="listDelete">Hapus</button></div>
            <div class="button-row"><button class="btn ghost" id="listReset">Reset</button></div>
            <div class="result-box" id="listResult"><span class="result-icon">↳</span><span>Pilih operasi untuk melihat hasilnya.</span></div>
          </div>
          <div class="panel wide"><div class="panel-head"><div><span class="step">03 / CARA KERJA</span><h3>Log operasi</h3></div><button class="text-btn" id="listClearLog">Bersihkan log</button></div><div class="log-list" id="listLog"><div class="empty-log">Belum ada operasi. Tambahkan node baru.</div></div></div>
        </section>
      <?php else: ?>
        <section class="content-grid">
          <div class="panel wide"><div class="panel-head"><div><span class="step">01 / VISUALISASI</span><h3>Tumpukan Stack</h3></div><span class="count" id="stackCount">3 item</span></div>
            <div class="stack-stage"><div class="stack-label">TOP <span>↓</span></div><div class="stack-tower" id="stackView"></div><div class="stack-base">STACK BASE</div></div>
            <div class="legend"><span><i class="legend-dot green"></i> Top (elemen berikutnya keluar)</span><span>Prinsip: LIFO</span></div>
          </div>
          <div class="panel"><div class="panel-head"><div><span class="step">02 / OPERASI</span><h3>Kelola Stack</h3></div></div>
            <label class="field-label" for="stackValue">Nilai item</label><div class="input-action"><input id="stackValue" maxlength="18" placeholder="Contoh: Buku"><button class="btn primary" id="stackPush">Push</button></div>
            <div class="button-row"><button class="btn secondary" id="stackPop">Pop (ambil top)</button><button class="btn ghost" id="stackPeek">Peek</button></div>
            <div class="button-row"><button class="btn ghost" id="stackReset">Reset</button></div>
            <div class="result-box" id="stackResult"><span class="result-icon">↳</span><span>Pilih operasi untuk melihat hasilnya.</span></div>
          </div>
          <div class="panel wide"><div class="panel-head"><div><span class="step">03 / CARA KERJA</span><h3>Log operasi</h3></div><button class="text-btn" id="stackClearLog">Bersihkan log</button></div><div class="log-list" id="stackLog"><div class="empty-log">Belum ada operasi. Coba lakukan push, lalu pop.</div></div></div>
        </section>
      <?php endif; ?>
      <footer class="footer"><span>DataStruct <b>·</b> Demo struktur data linear</span><span>Dibuat dengan PHP, HTML, CSS & JavaScript</span></footer>
    </main>
  </div>
  <script src="assets/app.js"></script>
</body>
</html>
