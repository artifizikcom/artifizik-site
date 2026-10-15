# Kısa adresler (basılı QR kodları)

Basılı A3'lerdeki QR kodları sitenin iç adreslerine değil, kısa adreslere gider. Kısa adres küçük bir yönlendirme sayfasıdır ve ziyaretçiyi haritadaki durağa götürür. Site yapısı değişse bile basılı kâğıtlar çalışmaya devam eder.

**Kural:** Bir kısa kod bir kez basıldıktan sonra asla değiştirilmez ve silinmez. Site yapısı değişirse yalnızca yönlendirme sayfasındaki hedef adres güncellenir.

Biçim: `artifizik.com/<harita kodu>/<durak>` → klasör: `<harita kodu>/<durak>/index.html`

## Harita kodları

| Kod | Harita |
|---|---|
| hg | Hareket grafikleri |

## Hareket grafikleri (hg)

| Kısa adres | Hedef |
|---|---|
| artifizik.com/hg | /haritalar/hareket-grafikleri.html |
| artifizik.com/hg/1 | /haritalar/hareket-grafikleri.html#durak-1 |
| artifizik.com/hg/2 | /haritalar/hareket-grafikleri.html#durak-2 |
| artifizik.com/hg/3 | /haritalar/hareket-grafikleri.html#durak-3 |
| artifizik.com/hg/4 | /haritalar/hareket-grafikleri.html#durak-4 |
| artifizik.com/hg/5 | /haritalar/hareket-grafikleri.html#durak-5 |
| artifizik.com/hg/6 | /haritalar/hareket-grafikleri.html#durak-6 |
| artifizik.com/hg/ileri | /haritalar/hareket-grafikleri.html#durak-ileri |

QR kodu üretilmiş olanlar: `hg/2` ve `hg/3` (Konum-zaman grafiği A3 ders takip föyü).

## Yeni harita eklerken

1. Yeni bir kod seç: iki ya da üç küçük harf, Türkçe karakter yok. Yukarıdaki tabloya ekle.
2. `hg` klasöründeki sayfaları örnek alarak `<kod>/index.html` ve her durak için `<kod>/<durak>/index.html` oluştur. Yalnızca başlığı ve hedef adresi değiştir.
3. Baskıdan önce her QR'ı telefonla okut ve doğru durağa gittiğini kontrol et.
