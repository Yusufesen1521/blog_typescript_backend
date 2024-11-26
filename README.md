
# Blog Backend API

Bu proje, **TypeScript** kullanılarak geliştirilmiş basit bir CRUD (Create, Read, Update, Delete) operasyonlarını gerçekleştiren bir blog backend API'sidir.

## Özellikler

- Blog gönderileri oluşturma, okuma, güncelleme ve silme.
- RESTful API tasarımı.
- JSON tabanlı veri iletişimi.

## Gereksinimler

- **Node.js** 
- **npm** 
- Veritabanı MongoDB

## Kurulum

1. Projeyi klonlayın:

   ```bash
   git clone https://github.com/kullaniciadi/blog-backend.git
   cd blog-backend
   ```

2. Gerekli bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Ortam değişkenlerini ayarlayın:

   Proje kök dizininde bir `.env` dosyası oluşturun ve aşağıdaki değişkenleri tanımlayın (örneğin):

   ```
   DATABASE_URL=mongodb://localhost:27017/blog
   JWT_SECRET=your_secret_key
   ```

## Çalıştırma

Geliştirme modunda başlatmak için:

```bash
npm run dev
```

## API Endpoint'leri

API = "http://localhost:3000/api"

### 1. Gönderi Oluşturma

**POST** `/posts`

- **Body:**

  ```json
  {
  "userId":"1234",
  "title": "Başlık",
  "content": "İçerik"
  }
  ```

### 2. Tüm Gönderileri Listeleme

**GET** `/posts`

### 3. ID ile Bir Gönderi Listeleme

**GET** `/posts/:id`

### 4. Gönderi Güncelleme

**PUT** `/posts/:id`

- **Body:**

  ```json
  {
    "title": "Yeni Başlık",
    "content": "Yeni içerik"
  }
  ```

### 5. Gönderi Silme

**DELETE** `/posts/:id`

### 6. Kullanıcı Kayıt Olma

***POST** `/auth/sign-up`

- **Body:**

  ```json
  {
	"username": "Deneme",
	"email": "Deneme@exampled.com",
	"password": "password123"
  }
  ```
  
### 7. Kullanıcı Girişi

***POST** `/auth/sign-in`

- **Body:**

  ```json
  {
	"username": "Deneme",
	"password": "password123"
  }
  ```

## Proje Komutları

- **`npm install`**: Gerekli bağlılıkları indirir.
- **`npm run dev`**: Geliştirme modunda çalıştırır.

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.
