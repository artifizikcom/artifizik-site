# Artı Fizik web sitesi: Claude Code talimatları

## Proje
- artifizik.com'un kaynak dosyaları; artifizik.com.tr bu adrese yönlendirilir. GitHub Pages, `main` dalının kök klasöründen yayınlar. Derleme adımı yok: düz HTML, CSS ve JavaScript.
- Site sahibi fizik öğretmeni, programcı değil. Açıklamaları sade Türkçeyle yap; teknik bir terim gerekiyorsa bir cümleyle açıkla. Commit mesajları kısa ve Türkçe olsun.
- Hedef kitle lise öğrencileri. Pilot harita (Hareket grafikleri) 10. sınıf Kuvvet ve Hareket ünitesine aittir (FİZ.10.1.1). Diğer kapsam ve sınıf düzeyi kararları henüz kesin değil; bunları varsayma.

## Tasarım (değiştirme)
- Tasarım kaynağı: "Artı Fizik — Web Sitesi Önizleme" tasarımı (27.09.2026; 10. sınıf etiketi ve telif ibaresi sonradan işlendi). Ana sayfa, A3 harita sayfası ve telefonda açılan durak sayfası bu tasarımın birebir karşılığıdır.
- Kendi başına yeni bir görsel dil, renk, yazı tipi ya da sayfa düzeni önerme veya uygulama. Yeni sayfalar mevcut bileşenlerle ve `css/site.css` içindeki değişkenlerle yapılır. Tasarımda değişiklik yalnızca kullanıcı açıkça isterse yapılır.
- Renkler: kâğıt `#f5f1e8`, kart `#fffdf8`, mürekkep `#1b2433`, turuncu vurgu `#d9651b` (ana hat), koyu turuncu `#b04a0c` (seçili durak), mavi `#1f5fa8` (ileri hat), yeşil `#2f7d5b`. Kareli kâğıt dokusu `.kareli` ve `.kareli-acik` sınıflarında.
- Yazı tipleri: Bricolage Grotesque (başlıklar), IBM Plex Sans (metin), IBM Plex Mono (büyük harfli etiketler). `fonts/` klasöründen yüklenir.
- SVG çizimlerindeki renkler doğrudan yazılıdır. Vurgu rengi değişirse SVG'lerdeki `#d9651b` değerlerini de güncelle.
- Henüz yayında olmayan bir dosyanın düğmesi (ör. A3 PDF) `href`'siz `<a>` ve `.dugme--yakinda` sınıfıyla, "· yakında" ekiyle gösterilir. Dosya eklenince `href` verilir ve sınıf kaldırılır.
- Alt bilgideki telif satırı bütün sayfalarda aynıdır: "artifizik.com · © 2026 Sercan Şahin — Artı Fizik · Tüm hakları saklıdır."

## Git düzeni
- Düzenlemeler yalnızca bu klasörde, Claude Code ile yapılır. GitHub web arayüzünden dosya düzenlenmez.
- Oturum başında `git pull` çalıştır. GitHub ayarlarından yapılan bazı işlemler (ör. özel alan adını kaydetmek) depoya kendiliğinden commit ekler.
- `git push` öncesinde değişikliklerin kısa özetini göster ve onay al.
- Depo herkese açık. Taslak, kaynak dosya (.pptx, .key vb.), kişisel veri ya da öğrenci bilgisi ekleme.

## İçerik ilkeleri
- Ticari yönlendirme yok: reklam, sponsor, ücretli ürün, kurs ya da hizmet bağlantısı eklenmez. İletişim metinleri içerikle ilgili soru, hata bildirimi ve öneri çerçevesinde kalır; özel ders çağrışımı yapan ifade kullanılmaz.
- Sorulara yanıt süresi taahhüt edilmez ("Her soru okunur; yanıt vermek zaman alabilir.").
- Sitede henüz olmayan bir içeriğe (ör. simülasyon rehberi) metinde gönderme yapılmaz.
- Fizik doğruluğu en yüksek önceliktir. Birimleri kontrol et, grafiklerde eksen ve işaret kurallarını açıkça yaz (ör. "ileri yön +"), emin olmadığın bir sonucu kesinmiş gibi sunma.
- Kazanım kodları ve ifadeleri yalnızca TYMM fizik öğretim programından birebir alınır; asla tahmin edilmez. Program elinde yoksa kullanıcıdan iste.

## Gizlilik (kullanıcıların çoğu reşit olmayan öğrenciler)
- Çerez, analitik ya da izleme betiği, üçüncü taraf yazı tipi veya CDN ekleme.
- "Takıldığın yeri sor" formu bir sunucuya veri göndermez; `js/soru.js` e-posta uygulamasını hazır mesajla açar. Üçüncü taraf form servisi kullanıcının açık onayı olmadan eklenmez.
- Formlara `action="mailto:..."` ya da `http://` hedef yazma. Chrome böyle bir formu görünce adres çubuğundaki kilidi kaldırır ve siteyi "tam olarak güvenli değil" diye gösterir.
- YouTube videoları yalnızca tıkla-yükle yapısıyla gömülür (`js/harita.js`, youtube-nocookie.com). Oynat'a basılmadan YouTube'a istek gitmez.
- Bunlardan biri değişirse `hakkimda.html` içindeki Gizlilik bölümünü de güncelle.

## Dosya düzeni
- `index.html` ana sayfa; `hakkimda.html` hakkımda, iletişim ve gizlilik; `404.html` hata sayfası (kökten başlayan yollar kullanır).
- `haritalar/<harita>.html` harita sayfası (masaüstünde harita + durak paneli, telefonda durak sayfası). `<body data-harita="...">` hangi veri dosyasının kullanılacağını belirler.
- `haritalar/<harita>.js` haritanın verisi: hatlar, kontrol köşesi, duraklar (kısa ad, ad, video kimliği, tahmin, yanılgı, görev, eksen, kontrol sorusu ve cevabı). Ana sayfadaki soru formu da bu dosyaları kullanır.
- `js/harita.js` haritayı ve durak panelini çizer; `js/soru.js` soru formunu çalıştırır.
- `hg/` ve benzeri kısa kod klasörleri: basılı QR kodlarının açtığı yönlendirme sayfaları (`KISA-ADRESLER.md`).
- `notlar/<harita>-a3.pdf` (öğrenci sürümü) ve `notlar/<harita>-cevap-anahtari.pdf`.
- `css/site.css` bütün stiller; `fonts/` yazı tipleri ve OFL lisansları; `_config.yml` README.md, CLAUDE.md ve KISA-ADRESLER.md'nin sitede yayınlanmasını engeller.
- Dosya adlarında Türkçe karakter ve boşluk kullanma.

## Durak adresleri ve kısa adresler (QR)
- Her durağın sitedeki adresi: `haritalar/<harita>.html#durak-<kimlik>` (ör. `#durak-2`, ileri durak için `#durak-ileri`).
- Basılı A3'teki QR kodları bu adrese değil, kısa adrese gider: `artifizik.com/<harita kodu>/<durak>` (ör. `artifizik.com/hg/2`). `hg/2/index.html` ziyaretçiyi durağa yönlendirir.
- Basılmış bir kısa kodu, klasörünü ya da durak kimliğini asla değiştirme veya silme. Site yapısı değişirse yalnızca yönlendirme sayfasındaki hedef güncellenir. Tablo ve adımlar: `KISA-ADRESLER.md`.

## Yeni harita ekleme
1. `haritalar/hareket-grafikleri.html` ve `.js` dosyalarını yeni adla kopyala; HTML'de başlığı, iz bağlantısını, PDF adlarını ve `data-harita` değerini değiştir.
2. Veri dosyasında hatların noktalarını ve durakların x, y konumlarını basılı A3 ile aynı düzende gir (harita 860 × 608 piksel).
3. Ana sayfadaki "Haritalar" kartlarına yeni kartı ekle ve `index.html`'e yeni veri dosyasının `<script>` satırını ekle (soru formunun durak listesi için).
4. Haritaya bir kısa kod seç ve `KISA-ADRESLER.md`'deki adımlarla yönlendirme sayfalarını oluştur.
5. Yayından önce kontrol et: telefon genişliği, kısa adresler, bütün bağlantılar ve PDF'ler.

## Yayından önce eksikler
- A3 PDF'leri: `notlar/hareket-grafikleri-a3.pdf` ve `notlar/hareket-grafikleri-cevap-anahtari.pdf`. Eklenince `index.html` ve `haritalar/hareket-grafikleri.html` içindeki "yakında" düğmelerini yorumlardaki bağlantılarla değiştir; harita sayfasındaki `<noscript>` metnine "A3 haritayı PDF olarak indirebilirsin." cümlesini geri ekle.
- Veri dosyasında `video` kimlikleri.
- `[Sıradaki konu]` kartları.
- iletisim@artifizik.com için e-posta yönlendirmesi.

## Bekleyen kararlar (kendiliğinden doldurma)
- Öğretmenlere yönelik bölüm (ana sayfadaki "Öğretmen misin?" bandı, menüdeki "Öğretmenler için", Hakkımda'daki "Öğretmenler ve okullar") ve Hakkımda'daki tanıtım cümlesi 15.10.2026'da kaldırıldı. Site sahibi yeniden karar verene kadar bunları geri ekleme, yerlerine metin de yazma. Bandın stilleri `css/site.css` içinde `.ogretmen` olarak duruyor.
