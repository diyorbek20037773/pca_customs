# Audit portali — Tadbirkor kabineti

Bu Audit dasturining **tashqi qismi** — tadbirkorlar (auditdan o'tayotgan tashkilotlar) uchun mo'ljallangan veb-kabinet.

Ichki dastur (`../src/`) auditorlar uchun bo'lsa, bu dastur tadbirkorlarga o'z profilini boshqarish, auditor so'rovlariga javob berish, hujjat yuklash va muloqot qilish imkonini beradi.

## Tuzilma

```
portal/
├── index.html
├── package.json
├── vite.config.js          ← port 5174
└── src/
    ├── main.jsx
    ├── App.jsx             ← marshrutlash
    ├── index.css           ← global stillar va CSS o'zgaruvchilari
    ├── theme/              ← rang shabloni va shrift sozlamalari
    │   ├── colors.js
    │   └── ThemeContext.jsx
    ├── components/         ← qayta ishlatiladigan UI bo'laklari
    │   ├── Sidebar.jsx
    │   ├── Header.jsx
    │   ├── Card.jsx
    │   ├── Badge.jsx
    │   ├── KPI.jsx
    │   ├── FormFields.jsx
    │   └── ThemeSwitcher.jsx
    ├── pages/              ← marshrut sahifalari
    │   ├── Dashboard.jsx
    │   ├── Profil.jsx
    │   ├── Sorovlar.jsx
    │   ├── Hujjatlar.jsx
    │   ├── Tekshiruvlar.jsx
    │   ├── Muloqot.jsx
    │   ├── Hisobotlar.jsx
    │   ├── Bildirishnomalar.jsx
    │   ├── Sozlamalar.jsx
    │   └── Yordam.jsx
    ├── data/               ← mock data (keyinchalik API'ga almashtiriladi)
    │   ├── menu.js
    │   └── mockData.js
    └── utils/
        └── routing.js      ← breadcrumbs
```

## Ishga tushirish

```bash
cd portal
npm install
npm run dev
```

Brauzerda: <http://localhost:5174>

## Sahifalar

| Marshrut | Tavsif |
|---|---|
| `/` | Dashboard — KPI, faol audit, muhim so'rovlar, risk |
| `/profil` | Tashkilot profili — barcha ma'lumotlar, tahrirlash |
| `/sorovlar` | Auditor so'rovlari ro'yxati va tafsiloti |
| `/hujjatlar` | Hujjatlar arxivi, yuklash, kategoriya bo'yicha filtrlash |
| `/tekshiruvlar` | Tekshiruvlar tarixi, bosqichlar timeline |
| `/muloqot` | Auditorlar bilan chat |
| `/hisobotlar` | Yakuniy hisobotlar va sertifikatlar |
| `/bildirishnomalar` | Tizim xabarlari |
| `/sozlamalar` | Akkaunt, xavfsizlik, xodimlar, bildirishnoma sozlamalari |
| `/yordam` | SSS va aloqa |

## Asosiy farq (ichki dasturdan)

- **Brend rangi**: Royal Blue (ichki dasturda Teal)
- **Sidebarda**: tashkilot nomi va STIR ko'rsatilgan
- **Headerda**: foydalanuvchi nomi va lavozim
- **Menyu**: tadbirkor ehtiyojlariga qaratilgan (so'rovlar, hujjatlar, muloqot)
- **Port**: 5174 (ichki dastur 5173 da bo'ladi)
