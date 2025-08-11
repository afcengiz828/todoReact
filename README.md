# Todo App - Frontend (React + Vite)

Vite + React 19 ile geliştirilmiş, Redux Toolkit tabanlı durum yönetimi, Tailwind CSS ile stillendirme, framer-motion ile sayfa geçiş animasyonları ve react-hook-form + Yup ile form doğrulama içeren bir Todo uygulaması.

## 🚀 Özellikler

- **CRUD İşlemleri**: Görev ekleme, listeleme, güncelleme, silme
- **Filtreleme & Arama**: Duruma ve önceliğe göre filtreleme, metin arama
- **Sıralama**: ID, başlık veya son tarih; artan/azalan yön desteği
- **Sayfalama**: 10 kayıt/sayfa (istemci tarafı)
- **Tema Desteği**: Koyu/Açık tema geçişi (Tailwind `dark` class)
- **Form Doğrulama**: react-hook-form + Yup ile kapsamlı validasyon
- **Animasyonlar**: framer-motion ile sayfa geçişleri
- **Duyarlı Tasarım**: Mobil uyumlu tablo görünümü

## 🛠️ Teknoloji Stack'i

- **React 19** + **React Router 7**
- **Redux Toolkit 2** + **React-Redux 9**
- **Tailwind CSS 4**
- **Vite 7**
- **framer-motion 12**
- **react-hook-form 7** + **Yup 1**
- **axios 1**
- **date-fns 4**
- **lucide-react** (ikonlar)

## 📁 Proje Yapısı

```
src/
├── pages/
│   ├── Dashboard.jsx          # Ana dashboard sayfası
│   ├── TodoListPage.jsx       # Todo listesi ve filtreleme
│   └── TodoDetail.jsx         # Ekleme/güncelleme formu
├── components/
│   ├── Header.jsx             # Navigasyon ve tema değiştirici
│   ├── TodoList.jsx           # Ana todo listesi
│   ├── TodoItem.jsx           # Tek todo öğesi
│   ├── TodoForm.jsx           # Form bileşeni
│   ├── TodoFilter.jsx         # Filtreleme ve arama
│   ├── Dashboard/
│   │   ├── SpecialStats.jsx   # İstatistikler
│   │   └── IncomingTodos.jsx  # Gelen görevler
│   └── DeleteConfirmationModal.jsx
├── redux/
│   ├── app/store.js           # Redux store
│   └── features/todo/
│       ├── TodoSlice.js       # API istekleri ve ana durum
│       ├── AllTodoSlice.js    # Tüm kayıtlar
│       ├── FilteredSlice.js   # Filtrelenmiş sonuçlar
│       └── ThemeSlice.js      # Tema durumu
├── App.jsx                    # Ana uygulama bileşeni
├── AppRouter.jsx              # Router tanımları
└── main.jsx                   # Giriş noktası
```

## ⚡ Kurulum

### Gereksinimler
- Node.js 18+ (önerilir)
- npm 9+ veya pnpm/yarn

### Adımlar
1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

3. **Tarayıcıda açın:**
   - Vite varsayılan olarak `http://localhost:5173` üzerinde çalışır

## 🚀 Çalıştırma

### Geliştirme Modu
```bash
npm run dev
```

### Üretim Derlemesi
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

## 📱 Sayfalar ve Navigasyon

- **`/dashboard`**: Özet, istatistikler ve bitiş tarihi önümüzdeki 30 gün olan görevler.
- **`/todolist`**: Listeleme, filtreleme, sıralama ve sayfalama
- **`/tododetail/:idTodo?`**: Ekleme/güncelleme formu (`idTodo` verilirse güncelleme modunda)
- **`/todoitem/:c`**: Tek bir görevin detay ekranı

## 🔄 Durum Yönetimi (Redux)

- **`TodoSlice.js`**: API istekleri (createAsyncThunk) ve ana todo durumu
  - `getAllTodo`, `addTodo`, `delTodo`, `updateTodo`, `updateTodoStatus`
- **`AllTodoSlice.js`**: Tüm kayıtların tek yerde tutulduğu yapı
- **`FilteredSlice.js`**: Arama/filtre/sıralama sonuçları ve filtre durumu
- **`ThemeSlice.js`**: Koyu/Açık tema durumu

## 🎨 Stil ve Tema

- **Tailwind CSS 4** kullanılır (`darkMode: 'class'`)
- Tema geçişi `Header` üzerinden sağlanır
- Global CSS: `src/index.css`, `src/App.css`
- Responsive tasarım ve mobil uyumluluk

## 📋 Örnek Kullanım Senaryoları

### Görev Ekleme
1. `Add` sayfasına gidin
2. Formu doldurun (başlık, açıklama, durum, öncelik, son tarih)
3. Submit butonuna tıklayın

### Görev Arama ve Filtreleme
1. `List` sayfasında üst bardan metin araması yapın
2. Durum/öncelik filtrelerini seçin
3. Sıralama ölçütü ve yönünü belirleyin

### Görev Güncelleme
1. `List`'te bir kaydın `Edit` linkine tıklayın
2. Veya `Add` sayfasında "Id to update" alanına ID girerek formu güncelleme modunda doldurun
3. Submit butonuna tıklayın

### Durum Güncelleme
- `List` veya `TodoItem` sayfasındaki durum açılır menüsünden durumu değiştirin

### Görev Silme
- `List`'ten `Delete` butonuna tıklayın

## 🌟 Bonus Özellikler

- **Koyu/Açık Tema**: Tailwind `dark` modu ile otomatik tema geçişi
- **Sayfa Animasyonları**: framer-motion ile yumuşak geçişler
- **Form Validasyonu**: Kapsamlı form doğrulama ve hata mesajları
- **Responsive Tablo**: Mobil uyumlu tablo görünümü
- **İstemci Sayfalama**: Hızlı sayfa geçişleri
- **Gelişmiş Filtreleme**: Çoklu filtre kombinasyonları

## 🔧 Geliştirici Notları

### Önemli Uyarılar
- API adresi şu an kod içinde sabit: `http://localhost:8000/api/todos`
- Üretimde `.env` ile `VITE_API_BASE_URL` kullanmanız önerilir
- Bazı dosya isimlendirmelerinde büyük/küçük harf tutarlılığına dikkat edin

### Komutlar
```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Üretim derlemesi
npm run preview  # Derlemeyi önizleme
npm run lint     # ESLint kontrolü
```

### Yapılandırma Dosyaları
- **`vite.config.js`**: Vite yapılandırması
- **`tailwind.config.js`**: Tailwind CSS ayarları
- **`eslint.config.js`**: ESLint kuralları
- **`package.json`**: Bağımlılıklar ve script'ler

## 📚 API Beklentisi

Uygulama aşağıdaki uç noktaları sağlayan bir API bekler:
- **GET** `/api/todos` - Tüm görevleri getir
- **POST** `/api/todos` - Yeni görev oluştur
- **PUT** `/api/todos/:id` - Görevi güncelle
- **PATCH** `/api/todos/:id` - Durum güncelle
- **DELETE** `/api/todos/:id` - Görevi sil

> **Not**: Backend API kurulumu için ayrı bir README dosyasına bakın.



**Not**: Bu frontend uygulaması çalışmak için bir backend API'ye ihtiyaç duyar. Backend kurulumu için ilgili README dosyasına bakın.
