// Hareket grafikleri haritasının verisi (pilot harita).
// Hem harita sayfası hem de ana sayfadaki "Takıldığın yeri sor" formu bu dosyayı kullanır.
//
// ÖNEMLİ: Durakların "kimlik" değerleri adreslerde kullanılır (hareket-grafikleri.html#durak-2).
// Basılı A3'teki QR kodları kısa adreslere gider (artifizik.com/hg/2); hg/2/index.html ziyaretçiyi
// bu adrese yönlendirir. Kimlikleri değiştirme. Ayrıntı: KISA-ADRESLER.md
//
// video: YouTube video kimliği (adresteki v= kısmından sonraki kod). Boşsa "Video hazırlanıyor" görünür.
// x, y: durağın 860 × 608 piksellik harita üzerindeki merkezi.

(window.HARITALAR = window.HARITALAR || []).push({
  kimlik: "hareket-grafikleri",
  ad: "Hareket grafikleri",
  sinif: "10. sınıf",
  // Kazanım kodları yalnızca TYMM fizik öğretim programından birebir alınır.
  // FİZ.10.1.1. Yatay doğrultuda sabit hızlı hareket ile ilgili tümevarımsal akıl yürütebilme
  altBaslik: "10. SINIF · KUVVET VE HAREKET · FİZ.10.1.1",
  pdfOgrenci: "../notlar/hareket-grafikleri-a3.pdf",
  pdfCevap: "../notlar/hareket-grafikleri-cevap-anahtari.pdf",

  hatlar: [
    { tur: "ana", noktalar: "80,470 220,470 360,470 460,370 800,370" },
    { tur: "ileri", noktalar: "360,470 620,470" }
  ],

  kontrolKosesi: {
    x: 660, y: 160, genislik: 180, yukseklik: 90,
    baglanti: { x1: 800, y1: 370, x2: 800, y2: 252 },
    baslik: "Kontrol köşesi",
    aciklama: "Tüm hattı kapsayan öz değerlendirme"
  },

  duraklar: [
    {
      kimlik: "1", no: "1", hat: "ana", x: 80, y: 470,
      kisa: "Referans ve konum",
      ad: "Referans noktası ve konum",
      video: "",
      yanilgi: "Konum ile alınan yol aynı şeydir.",
      gorev: "Sınıf kapını referans al, koridorda bir yönü (+) seç. Koridordaki üç yerin konumunu işaretli sayılarla yaz.",
      soru: "Bir öğrenci kapıdan 4 m ileri, sonra 6 m geri yürüyor (ileri yön +). Kapıya göre konumu nedir?",
      cevap: "Konumu −2 m, yani kapının 2 m gerisi. Aldığı yol ise 4 m + 6 m = 10 m: konum ve alınan yol farklı büyüklüklerdir."
    },
    {
      kimlik: "2", no: "2", hat: "ana", x: 220, y: 470,
      kisa: "Konum-zaman grafiği",
      ad: "Konum-zaman grafiği çizmek",
      video: "",
      tahmin: {
        soru: "Araba dümdüz bir yolda sabit hızla ileri gidiyor (ileri yön +). Konum-zaman grafiği sence nasıl görünür?",
        secenekler: [
          { metin: "Yatay düz bir çizgi, çünkü yol düz.", dogru: false },
          { metin: "Yükselen bir doğru, çünkü konum zamanla artıyor.", dogru: true },
          { metin: "Arabanın yolunun küçük bir resmi.", dogru: false }
        ],
        dogruYanit: "Doğru. Grafik yolun şeklini değil, konumun zamanla değişimini gösterir.",
        yanlisYanit: "Çok yaygın bir düşünce. Videoyu izle: yatay eksenin zaman olduğuna dikkat et."
      },
      yanilgi: "Konum-zaman grafiği, cismin izlediği yolun resmidir.",
      gorev: "Tablodaki konum değerlerini durağın boş eksenine işaretle ve noktaları birleştir.",
      eksen: { yatay: "t (s)", dusey: "x (m)" },
      soru: "Düz bir yolda ileri giden arabanın grafiği neden bir yokuş gibi görünür?",
      cevap: "Grafik yolun şeklini değil, konumun zamanla nasıl değiştiğini gösterir. Konum arttıkça çizgi yükselir."
    },
    {
      kimlik: "3", no: "3", hat: "ana", x: 360, y: 470,
      kisa: "Eğim ne anlatır?",
      ad: "Eğim ne anlatır?",
      video: "",
      yanilgi: "Grafikte daha yukarıda olan cisim daha hızlıdır.",
      gorev: "İki doğrunun eğimini hesapla ve hangisinin daha hızlı olduğunu yaz.",
      soru: "Aynı anda A'nın konumu 20 m, B'ninki 10 m. A mutlaka daha hızlı mıdır?",
      cevap: "Hayır. Hızı konumun büyüklüğü değil, doğrunun eğimi belirler."
    },
    {
      kimlik: "4", no: "4", hat: "ana", x: 540, y: 370,
      kisa: "Hız-zaman grafiği",
      ad: "Hız-zaman grafiği",
      video: "",
      yanilgi: "Hız-zaman grafiğinde yatay çizgi, cismin durduğunu gösterir.",
      gorev: "Sabit hızla giden bir cismin hız-zaman grafiğini boş eksene çiz.",
      soru: "Hız-zaman grafiğinde 5 m/s düzeyinde yatay bir çizgi ne anlatır?",
      cevap: "Cisim durmuyor; (+) yönde 5 m/s sabit hızla hareket ediyor."
    },
    {
      kimlik: "5", no: "5", hat: "ana", x: 680, y: 370,
      kisa: "Alan ne anlatır?",
      ad: "Grafiğin altındaki alan ne anlatır?",
      video: "",
      yanilgi: "Hız-zaman grafiğinden yer değiştirme bulunamaz.",
      gorev: "Grafiğin altındaki alanı tara ve hesapla.",
      soru: "3 m/s sabit hızla 4 saniye giden cismin yer değiştirmesi grafikte neye karşılık gelir?",
      cevap: "Grafiğin altındaki dikdörtgenin alanına: 3 m/s × 4 s = 12 m."
    },
    {
      kimlik: "6", no: "6", hat: "ana", x: 800, y: 370,
      kisa: "Grafikten grafiğe",
      ad: "Grafikten grafiğe dönüşüm",
      video: "",
      yanilgi: "Konum-zaman ve hız-zaman grafikleri aynı şekle sahip olmalıdır.",
      gorev: "Verilen konum-zaman grafiğinden hız-zaman grafiğini çiz.",
      soru: "Konum-zaman grafiği eğik bir doğruysa, hız-zaman grafiği nasıl görünür?",
      cevap: "Yatay bir doğru: eğim sabit, dolayısıyla hız sabit."
    },
    {
      kimlik: "ileri", no: "İ", hat: "ileri", x: 620, y: 470,
      kisa: "Karışık grafik okuma",
      ad: "İleri durak: Karışık grafik okuma",
      video: "",
      yanilgi: "İki cismin konum-zaman grafikleri kesişiyorsa, o anda hızları eşittir.",
      gorev: "Birden fazla bölümden oluşan bir hareketin grafiğini bölüm bölüm yorumla.",
      soru: "İki cismin konum-zaman grafikleri bir noktada kesişiyor. O an için ne söylenebilir?",
      cevap: "Aynı anda aynı konumdalar; hızlarının eşit olması gerekmez."
    }
  ]
});
