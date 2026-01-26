# Web Sitesi Yayınlama Rehberi

Bu projeyi (HTML, CSS, JS dosyalarını) kendi alan adınızla (domain) ücretsiz olarak yayınlamanın en kolay ve güvenilir yolları aşağıdadır.

## Tavsiye Edilen: Netlify (En Kolayı)

**Netlify**, statik siteler (bu proje gibi) için en popüler ve kullanımı en kolay platformlardan biridir. Kendi alan adınızı bağlamak çok basittir ve otomatik olarak ücretsiz SSL (HTTPS) sertifikası verir.

### Adım Adım Kurulum:

1.  **Hesap Açın:** [netlify.com](https://www.netlify.com/) adresine gidip ücretsiz bir hesap oluşturun.
2.  **Siteyi Yükleyin:**
    *   Giriş yaptıktan sonra "Sites" sekmesine gelin.
    *   Bilgisayarınızdaki proje klasörünü (içinde `index.html`, `style.css` vb. olan klasörü) sürükleyip tarayıcıdaki alana bırakın.
    *   Siteniz saniyeler içinde yayına girecektir (örneğin: `random-name-12345.netlify.app`).
3.  **Alan Adı (Domain) Bağlama:**
    *   Sitenizin paneline gidin ve **"Domain Settings"** (Alan Adı Ayarları) butonuna tıklayın.
    *   **"Add custom domain"** butonuna tıklayın.
    *   Sahip olduğunuz alan adını (örneğin: `senguru.co`) yazın ve doğrulayın.
4.  **DNS Ayarları:**
    *   Netlify size yapmanız gereken DNS ayarlarını gösterecektir. Genellikle iki yöntem vardır:
        *   **Yöntem A (Önerilen):** Alan adınızı aldığınız firmanın (Godaddy, İsimtescil, Natro vb.) paneline gidip, "Nameservers" (Ad Sunucuları) kısmını Netlify'ın verdiği adreslerle değiştirmek.
        *   **Yöntem B:** Alan adı panelinizden bir **A Kaydı (A Record)** ekleyerek Netlify'ın IP adresine yönlendirmek.

## Alternatif: GitHub Pages

Eğer kodlarınız zaten GitHub üzerinde duruyorsa, GitHub Pages de harika bir seçenektir.

### Adım Adım Kurulum:

1.  **Repoyu Oluşturun:** Kodlarınızı GitHub'a yükleyin (Public repository olması gerekir).
2.  **Ayarlar:**
    *   Reponuzda **Settings** (Ayarlar) sekmesine gidin.
    *   Sol menüden **Pages** kısmını bulun.
    *   **Source** kısmından `main` (veya `master`) dalını seçip **Save** deyin.
3.  **Alan Adı Bağlama:**
    *   Aynı sayfada (Pages ayarları) **"Custom domain"** kısmına alan adınızı yazın ve kaydedin.
    *   GitHub bir DNS kontrolü (Check) yapacaktır.
4.  **DNS Ayarları:**
    *   Alan adı sağlayıcınızın paneline gidin.
    *   GitHub Pages dokümantasyonunda belirtilen IP adreslerine **A Kaydı** oluşturun veya `username.github.io` adresine **CNAME** kaydı oluşturun.

---

### Özet
*   **En hızlı ve kolay yöntem:** Netlify (Sürükle-bırak mantığı ve kolay DNS).
*   **Kodlar GitHub'daysa:** GitHub Pages.
