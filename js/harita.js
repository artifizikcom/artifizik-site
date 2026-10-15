// Harita sayfası.
// <body data-harita="..."> ile seçilen haritanın verisini (haritalar/<harita>.js) okur;
// hatları ve durakları çizer, seçili durağın panelini doldurur.
// Adresler: <harita>.html#durak-<kimlik>. Basılı A3'teki QR kodları bu adresleri açar.
// Videolar oynat düğmesine basılana kadar YouTube'dan yüklenmez (youtube-nocookie.com).
// Masaüstü paneli tasarımdaki "A3 harita sayfası"nı, telefon görünümü "Durak sayfası"nı izler:
// .yalniz-masaustu ve .yalniz-mobil sınıfları blokların hangi ekranda görüneceğini belirler.

(function () {
  'use strict';

  var haritaKimligi = document.body.getAttribute('data-harita');
  var H = (window.HARITALAR || []).filter(function (h) {
    return h.kimlik === haritaKimligi;
  })[0];
  if (!H) return;

  var RENK = {
    vurgu: '#d9651b',
    vurguKoyu: '#b04a0c',
    mavi: '#1f5fa8',
    kart: '#fffdf8',
    murekkep: '#1b2433',
    gecilen: '#8c8574',
    bos: '#ddd5c3',
    kesik: '#cfc6b2'
  };
  var SVGNS = 'http://www.w3.org/2000/svg';

  var haritaEl = document.getElementById('harita');
  var cerceve = haritaEl.parentElement;
  var panel = document.getElementById('durak-paneli');
  var duyuru = document.getElementById('duyuru');
  var duraklar = H.duraklar;
  var anaHat = duraklar.filter(function (d) { return d.hat === 'ana'; });
  var dar = window.matchMedia('(max-width: 1000px)');

  var durum = { secili: 0, cevapAcik: false, tahmin: -1 };

  function kac(metin) {
    return String(metin)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function hatRengi(d) { return d.hat === 'ileri' ? RENK.mavi : RENK.vurgu; }
  function koyuRenk(d) { return d.hat === 'ileri' ? RENK.mavi : RENK.vurguKoyu; }

  function svgEleman(ad, ozellikler) {
    var e = document.createElementNS(SVGNS, ad);
    Object.keys(ozellikler).forEach(function (k) { e.setAttribute(k, ozellikler[k]); });
    return e;
  }

  // ---------- Hatlar, kontrol köşesi ve duraklar ----------
  var hatlarSvg = svgEleman('svg', {
    class: 'harita__hatlar', width: 860, height: 608, viewBox: '0 0 860 608', 'aria-hidden': 'true'
  });
  H.hatlar.forEach(function (hat) {
    hatlarSvg.appendChild(svgEleman('polyline', {
      points: hat.noktalar, fill: 'none',
      stroke: hat.tur === 'ileri' ? RENK.mavi : RENK.vurgu,
      'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    }));
  });
  var kk = H.kontrolKosesi;
  if (kk) {
    hatlarSvg.appendChild(svgEleman('line', {
      x1: kk.baglanti.x1, y1: kk.baglanti.y1, x2: kk.baglanti.x2, y2: kk.baglanti.y2,
      stroke: RENK.murekkep, 'stroke-width': 3, 'stroke-dasharray': '5 7'
    }));
  }
  var not = haritaEl.querySelector('.harita__not');
  haritaEl.insertBefore(hatlarSvg, not);

  if (kk) {
    var kutu = document.createElement('div');
    kutu.className = 'kontrol-kosesi';
    kutu.style.left = kk.x + 'px';
    kutu.style.top = kk.y + 'px';
    kutu.style.width = kk.genislik + 'px';
    kutu.style.height = kk.yukseklik + 'px';
    kutu.innerHTML = '<strong>' + kac(kk.baslik) + '</strong><span>' + kac(kk.aciklama) + '</span>';
    haritaEl.insertBefore(kutu, not);
  }

  var dugmeler = duraklar.map(function (d, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'durak-dugme';
    b.style.left = (d.x - 60) + 'px';
    b.style.top = (d.y - 22) + 'px';
    b.setAttribute('aria-label', 'Durak ' + d.no + ': ' + d.ad);
    b.innerHTML =
      '<span class="durak-dugme__daire">' + kac(d.no) + '</span>' +
      '<span class="durak-dugme__ad">' + kac(d.kisa) + '</span>';
    b.addEventListener('click', function () { sec(i, true); });
    haritaEl.insertBefore(b, not);
    return b;
  });

  function haritayiGuncelle() {
    dugmeler.forEach(function (b, i) {
      var d = duraklar[i];
      var secili = i === durum.secili;
      var daire = b.firstChild;
      daire.style.borderColor = secili ? koyuRenk(d) : hatRengi(d);
      daire.style.background = secili ? koyuRenk(d) : RENK.kart;
      daire.style.color = secili ? '#ffffff' : RENK.murekkep;
      daire.style.boxShadow = secili ? '0 0 0 7px rgba(27,36,51,0.14)' : 'none';
      b.lastChild.style.fontWeight = secili ? '700' : '500';
      b.setAttribute('aria-pressed', secili ? 'true' : 'false');
    });
  }

  // Harita tasarımdaki gibi 860 piksel genişliğinde; dar ekranda en fazla %75'e küçülür, gerisi kaydırılır.
  function olcekle() {
    var k = Math.max(0.75, Math.min(1, cerceve.clientWidth / 860));
    haritaEl.style.zoom = k;
  }
  if ('ResizeObserver' in window) {
    new ResizeObserver(olcekle).observe(cerceve);
  } else {
    window.addEventListener('resize', olcekle);
  }
  olcekle();

  // ---------- Durak paneli ----------
  var OYNAT_SIMGESI =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>';

  function ilerlemeSvg(d) {
    var sira = anaHat.indexOf(d);
    if (sira < 0) return '';
    var n = anaHat.length;
    var xler = anaHat.map(function (_, j) { return 16 + (n > 1 ? j * (322 / (n - 1)) : 0); });
    var s = '<svg class="mobil-ilerleme" viewBox="0 0 354 44" role="img" aria-label="Hattaki ilerleme: durak ' +
      (sira + 1) + ' / ' + n + '">';
    s += '<line x1="16" y1="22" x2="338" y2="22" stroke="' + RENK.bos + '" stroke-width="6" stroke-linecap="round"/>';
    if (sira > 0) {
      s += '<line x1="16" y1="22" x2="' + xler[sira] + '" y2="22" stroke="' + RENK.vurgu + '" stroke-width="6" stroke-linecap="round"/>';
    }
    xler.forEach(function (x, j) {
      if (j === sira) {
        s += '<circle cx="' + x + '" cy="22" r="13" fill="' + RENK.vurguKoyu + '"/>' +
          '<text x="' + x + '" y="27" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="13" fill="#ffffff">' +
          kac(anaHat[j].no) + '</text>';
      } else {
        s += '<circle cx="' + x + '" cy="22" r="9" fill="' + RENK.kart + '" stroke="' +
          (j < sira ? RENK.vurgu : RENK.kesik) + '" stroke-width="4"/>';
      }
    });
    return s + '</svg>';
  }

  function eksenSvg(eksen) {
    return '<svg class="bos-eksen yalniz-mobil" viewBox="0 0 320 120" role="img" aria-label="Boş ' + kac(eksen.dusey) + ' – ' + kac(eksen.yatay) + ' ekseni">' +
      '<line x1="48" y1="96" x2="310" y2="96" stroke="#4a5363" stroke-width="2"/>' +
      '<line x1="48" y1="96" x2="48" y2="10" stroke="#4a5363" stroke-width="2"/>' +
      '<line x1="48" y1="68" x2="310" y2="68" stroke="#e6dfd0" stroke-width="1"/>' +
      '<line x1="48" y1="40" x2="310" y2="40" stroke="#e6dfd0" stroke-width="1"/>' +
      '<line x1="113" y1="10" x2="113" y2="96" stroke="#e6dfd0" stroke-width="1"/>' +
      '<line x1="178" y1="10" x2="178" y2="96" stroke="#e6dfd0" stroke-width="1"/>' +
      '<line x1="243" y1="10" x2="243" y2="96" stroke="#e6dfd0" stroke-width="1"/>' +
      '<text x="310" y="114" text-anchor="end" font-family="IBM Plex Mono, monospace" font-size="12" fill="#4a5363">' + kac(eksen.yatay) + '</text>' +
      '<text x="4" y="16" font-family="IBM Plex Mono, monospace" font-size="12" fill="#4a5363">' + kac(eksen.dusey) + '</text>' +
      '</svg>';
  }

  function paneliCiz() {
    var i = durum.secili;
    var d = duraklar[i];
    var ileri = d.hat === 'ileri';
    var onceki = duraklar[i - 1];
    var sonraki = duraklar[i + 1];
    var haritaAdiBuyuk = H.ad.toLocaleUpperCase('tr-TR');

    var ilerleme = ileri
      ? 'İLERİ HAT · İSTEĞE BAĞLI'
      : 'DURAK ' + d.no + ' / ' + anaHat.length + ' · ANA HAT';
    var mobilEtiket = haritaAdiBuyuk + ' · ' +
      (ileri ? 'İLERİ DURAK · İSTEĞE BAĞLI' : 'DURAK ' + d.no + ' / ' + anaHat.length);

    var noktalar = duraklar.map(function (x, j) {
      var renk = j === i ? koyuRenk(d) : (j < i ? RENK.gecilen : RENK.bos);
      return '<span style="background:' + renk + '"></span>';
    }).join('');

    var video = '<div class="video-kutu"><div class="video-kutu__etiket yalniz-masaustu">YOUTUBE</div>';
    if (d.video) {
      video +=
        '<button type="button" class="video-kutu__oynat" aria-label="Durak videosunu oynat">' + OYNAT_SIMGESI + '</button>' +
        '<div class="video-kutu__not"><span class="masaustu">Durak videosu · yanılgıyla başlar</span>' +
        '<span class="mobil">Kısa video · yanılgıyla başlar</span></div>';
    } else {
      video += '<div class="video-kutu__not">Video hazırlanıyor</div>';
    }
    video += '</div>';

    var tahmin = '';
    if (d.tahmin) {
      var t = d.tahmin;
      tahmin =
        '<div class="bilgi bilgi--tahmin yalniz-mobil">' +
        '<div class="bilgi__etiket">ÖNCE TAHMİN ET</div>' +
        '<div class="bilgi__metin bilgi__metin--orta bilgi__metin--soru">' + kac(t.soru) + '</div>' +
        '<div class="secenekler">' +
        t.secenekler.map(function (s, j) {
          var secildi = durum.tahmin === j;
          var sinif = secildi ? (s.dogru ? 'dogru' : 'yanlis') : '';
          return '<button type="button" class="' + sinif + '" data-tahmin="' + j + '" aria-pressed="' + secildi + '">' +
            kac(s.metin) + '</button>';
        }).join('') +
        '</div>';
      if (durum.tahmin >= 0) {
        var dogru = t.secenekler[durum.tahmin].dogru;
        tahmin += '<div class="geri-bildirim ' + (dogru ? 'dogru' : 'yanlis') + '" role="status">' +
          kac(dogru ? t.dogruYanit : t.yanlisYanit) + '</div>';
      }
      tahmin += '</div>';
    }

    var soruAdresi = '../index.html?durak=' + encodeURIComponent(H.kimlik + '/' + d.kimlik) + '#soru';

    panel.innerHTML =
      '<div class="panel__ust">' +
        '<div class="panel__ilerleme mono-etiket" style="color:' + koyuRenk(d) + '">' + ilerleme + '</div>' +
        '<div class="noktalar" aria-hidden="true">' + noktalar + '</div>' +
      '</div>' +
      '<div class="panel__mobil-ust"><div class="panel__mobil-etiket mono-etiket">' + kac(mobilEtiket) + '</div></div>' +
      '<h2 class="panel__ad" id="durak-adi" tabindex="-1">' + kac(d.ad) + '</h2>' +
      ilerlemeSvg(d) +
      video +
      tahmin +
      '<div class="bilgi bilgi--yanilgi"><div class="bilgi__etiket">YAYGIN YANILGI</div>' +
        '<div class="bilgi__metin bilgi__metin--orta">“' + kac(d.yanilgi) + '”</div></div>' +
      '<div class="bilgi"><div class="bilgi__etiket">GÖREV · BASILI A3\'TE</div>' +
        '<div class="bilgi__metin">' + kac(d.gorev) + '</div>' +
        (d.eksen ? eksenSvg(d.eksen) : '') + '</div>' +
      '<div class="bilgi bilgi--kontrol yalniz-masaustu"><div class="bilgi__etiket">KONTROL SORUSU</div>' +
        '<div class="bilgi__metin bilgi__metin--orta">' + kac(d.soru) + '</div>' +
        (durum.cevapAcik ? '<div class="cevap" id="cevap">' + kac(d.cevap) + '</div>' : '') +
        '<button type="button" class="dugme-cerceve" data-cevap aria-expanded="' + durum.cevapAcik + '">' +
          (durum.cevapAcik ? 'Cevabı gizle' : 'Önce düşün, sonra cevabı göster') + '</button></div>' +
      '<a class="soru-bagi yalniz-mobil" href="' + soruAdresi + '">Takıldın mı? Soru sor <span aria-hidden="true">→</span></a>' +
      '<div class="panel__gezinme">' +
        '<button type="button" class="dugme-cerceve" data-yon="-1"' + (onceki ? '' : ' disabled') + '>' +
          '<span class="masaustu">← Önceki durak</span><span class="mobil">← ' +
          (onceki ? (onceki.hat === 'ileri' ? 'İleri durak' : 'Durak ' + kac(onceki.no)) : 'Başlangıç') + '</span></button>' +
        '<button type="button" class="dugme-koyu" data-yon="1"' + (sonraki ? '' : ' disabled') + '>' +
          '<span class="masaustu">Sonraki durak →</span><span class="mobil">' +
          (sonraki ? (sonraki.hat === 'ileri' ? 'İleri durak' : 'Durak ' + kac(sonraki.no)) : 'Son durak') + ' →</span></button>' +
      '</div>' +
      '<div class="panel__imza">Reklamsız · ücretsiz · Artı Fizik</div>';

    var oynat = panel.querySelector('.video-kutu__oynat');
    if (oynat) {
      oynat.addEventListener('click', function () {
        var cerceveVideo = document.createElement('iframe');
        cerceveVideo.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(d.video) + '?autoplay=1&rel=0';
        cerceveVideo.title = d.ad;
        cerceveVideo.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        cerceveVideo.allowFullscreen = true;
        cerceveVideo.referrerPolicy = 'strict-origin-when-cross-origin';
        var kutu = panel.querySelector('.video-kutu');
        kutu.replaceChildren(cerceveVideo);
        cerceveVideo.focus();
      });
    }

    panel.querySelectorAll('[data-tahmin]').forEach(function (b) {
      b.addEventListener('click', function () {
        durum.tahmin = Number(b.getAttribute('data-tahmin'));
        paneliCiz();
        var yeni = panel.querySelector('[data-tahmin="' + durum.tahmin + '"]');
        if (yeni) yeni.focus({ preventScroll: true });
      });
    });

    panel.querySelector('[data-cevap]').addEventListener('click', function () {
      durum.cevapAcik = !durum.cevapAcik;
      paneliCiz();
      panel.querySelector('[data-cevap]').focus({ preventScroll: true });
    });

    panel.querySelectorAll('[data-yon]').forEach(function (b) {
      b.addEventListener('click', function () {
        var yon = Number(b.getAttribute('data-yon'));
        sec(durum.secili + yon, true);
        var ayni = panel.querySelector('[data-yon="' + yon + '"]');
        var diger = panel.querySelector('[data-yon="' + (-yon) + '"]');
        if (ayni && !ayni.disabled) ayni.focus({ preventScroll: true });
        else if (diger) diger.focus({ preventScroll: true });
      });
    });
  }

  function sec(i, kullanici) {
    if (i < 0 || i >= duraklar.length) return;
    durum = { secili: i, cevapAcik: false, tahmin: -1 };
    var adres = '#durak-' + duraklar[i].kimlik;
    if (window.location.hash !== adres) {
      window.history.replaceState(null, '', adres);
    }
    haritayiGuncelle();
    paneliCiz();
    if (kullanici) {
      duyuru.textContent = 'Durak ' + duraklar[i].no + ': ' + duraklar[i].ad;
      if (dar.matches) panel.scrollIntoView({ block: 'start' });
    }
  }

  function adrestenSec() {
    var eslesme = /^#durak-(.+)$/.exec(decodeURIComponent(window.location.hash));
    var i = 0;
    if (eslesme) {
      duraklar.forEach(function (d, j) { if (d.kimlik === eslesme[1]) i = j; });
    }
    sec(i, false);
  }

  window.addEventListener('hashchange', adrestenSec);
  adrestenSec();
})();
