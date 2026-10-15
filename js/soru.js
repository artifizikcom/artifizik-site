// "Takıldığın yeri sor" formu.
// GitHub Pages form verisi alamadığı için mesaj bir sunucuya gitmez: "Soruyu gönder",
// öğrencinin e-posta uygulamasını konu ve metni hazır doldurulmuş olarak açar.
// Durak listesi haritalar/*.js veri dosyalarından doldurulur.

(function () {
  'use strict';

  var form = document.getElementById('soru');
  if (!form) return;

  var adres = form.getAttribute('data-adres');
  var secim = form.querySelector('#durak');
  var digerSecenek = secim.querySelector('option[value="diger"]');

  (window.HARITALAR || []).forEach(function (harita) {
    harita.duraklar.forEach(function (durak) {
      var secenek = document.createElement('option');
      secenek.value = harita.kimlik + '/' + durak.kimlik;
      secenek.textContent =
        harita.ad + ' · ' +
        (durak.hat === 'ileri' ? 'İleri durak' : 'Durak ' + durak.no) + ' · ' +
        durak.kisa;
      secim.insertBefore(secenek, digerSecenek);
    });
  });

  secim.selectedIndex = 0;

  // Durak sayfasındaki "Takıldın mı? Soru sor" bağlantısı ?durak=harita/durak ile gelir.
  var gelen = new URLSearchParams(window.location.search).get('durak');
  if (gelen && secim.querySelector('option[value="' + CSS.escape(gelen) + '"]')) {
    secim.value = gelen;
  }

  form.addEventListener('submit', function (olay) {
    olay.preventDefault();
    var neyi = form.querySelector('#neyi').value.trim();
    var tahmin = form.querySelector('#tahmin').value.trim();
    var durakMetni = secim.options[secim.selectedIndex].textContent;

    var konu = 'Artı Fizik sorusu: ' + durakMetni;
    var govde =
      'Harita ve durak: ' + durakMetni + '\r\n\r\n' +
      'Neyi anlamadım:\r\n' + neyi + '\r\n\r\n' +
      'Tahminim:\r\n' + (tahmin || '-') + '\r\n';

    window.location.href =
      'mailto:' + adres +
      '?subject=' + encodeURIComponent(konu) +
      '&body=' + encodeURIComponent(govde);
  });
})();
