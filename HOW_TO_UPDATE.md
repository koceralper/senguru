# Site Güncelleme ve Yönetim Rehberi

Bu belge, **Şenguru** web sitesindeki ürünleri, fiyatları ve kargo ayarlarını teknik bilgiye ihtiyaç duymadan nasıl değiştirebileceğinizi anlatır.

Tüm ayarlar tek bir dosyada toplanmıştır: **`products.js`**.

---

## 1. Kargo Ayarlarını Değiştirmek

`products.js` dosyasını açtığınızda en tepede şu bölümü göreceksiniz:

```javascript
const storeConfig = {
    freeShippingThreshold: 2500,  // Kargo Bedava Limiti (TL)
    shippingCost: 125             // Kargo Ücreti (TL)
};
```

*   **Kampanya Yapmak İçin:** Örneğin "1000 TL üzeri kargo bedava" kampanyası için `2500` sayısını `1000` yapmanız yeterlidir.
*   **Kayan Yazı:** Bu değerleri değiştirdiğinizde, sitenin en üstündeki kayan yazı (örn: "2500 TL ve üzeri kargo ücretsiz") **otomatik olarak** güncellenir.
*   **Sepet Hesabı:** Sepetteki kargo ücreti hesaplaması da bu değerlere göre otomatik yapılır.

---

## 2. Ürün ve Fiyat Değiştirmek

Aynı dosyanın (`products.js`) devamında ürünlerin listesi bulunur. Her ürün süslü parantezler `{ ... }` içindedir.

### Mevcut Bir Ürünün Fiyatını Değiştirmek
Her ürünün altında `options` (seçenekler) listesi vardır. İlgili gramajın yanındaki fiyatı değiştirin.

```javascript
    {
        id: 2,
        title: "Kuru Elma",
        // ... diğer bilgiler ...
        options: [
            { weight: "50 Gr", price: 60 },   <-- Burayı 70 yaparsanız fiyat 70 TL olur
            { weight: "100 Gr", price: 100 },
            { weight: "250 Gr", price: 240 }
        ]
    },
```

### Yeni Bir Ürün Eklemek
Mevcut bir ürün bloğunu (süslü parantezden süslü paranteze kadar) kopyalayıp listenin sonuna yapıştırın ve bilgileri değiştirin:

1.  **id:** Bir önceki ürünün numarasından bir fazlasını verin (Örn: 7).
2.  **title:** Ürün adı.
3.  **image:** Görselin dosya yolu (Örn: `"images/yeni_urun.png"`).
    *   *Not: Görsel dosyasını `images` klasörüne atmayı unutmayın.*
4.  **description:** Kısa açıklama.
5.  **badge:** "Yeni", "Popüler" gibi etiketler. İstemiyorsanız boş bırakın `""`.
6.  **options:** Gramaj ve fiyat seçenekleri.

---

## 3. Görsel Yüklemek

Yeni bir ürün görseli ekleyecekseniz:

1.  Görselinizi **.png** formatında hazırlayın (Arka planı şeffaf olursa daha şık durur).
2.  Dosya adını Türkçe karakter ve boşluk kullanmadan verin (Örn: `kuru-cilek.png`).
3.  Proje klasöründeki **`images`** klasörünün içine atın.
4.  `products.js` dosyasında ürünün `image` kısmına bu adı yazın (`"images/kuru-cilek.png"`).

---

## İpucu
Değişiklikleri yaptıktan sonra dosyayı kaydedip sitenizi yenilemeniz (F5) yeterlidir.
