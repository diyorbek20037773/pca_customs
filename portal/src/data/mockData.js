// Tashqi portal — joriy tashkilot ma'lumotlari (mock).
// Real loyihada bu API'dan keladi.

export const ORG = {
  stir:        "302845671",
  name:        "\"BARAKAT-SAVDO\" MChJ",
  shortName:   "Barakat-Savdo",
  legalForm:   "Mas'uliyati cheklangan jamiyat",
  registered:  "12.04.2018",
  oked:        "47.11 — Oziq-ovqat mahsulotlari ulgurji savdosi",
  director:    "Karimov Akmal Sodiqovich",
  chiefAcc:    "Yusupova Dilfuza Rahmatovna",
  email:       "info@barakat-savdo.uz",
  phone:       "+998 71 200-44-22",
  address:     "Toshkent shahri, Yunusobod tumani, Amir Temur ko'chasi 47-uy",
  factAddress: "Toshkent shahri, Sergeli tumani, Yangi Sergeli MFY, 12-uy",
  taxRegime:   "Aylanmadan to'lanadigan soliq (4%)",
  bankAccount: "20208000400123456001",
  bank:        "AT \"Asaka bank\" Toshkent filiali",
  mfo:         "00451",
  employees:   42,
  wageFund:    "186 400 000 so'm/oy",
  riskLevel:   "O'rta",
  riskScore:   58,
};

export const KPIS = {
  openRequests:   3,
  pendingDocs:    5,
  activeAudits:   1,
  unreadMessages: 2,
};

export const REQUESTS = [
  {
    id: "REQ-2026-0421",
    title: "2025-yil 4-chorak balansi va kassa hisobotlari",
    auditor: "Abdullayeva Nargiza",
    sent: "02.05.2026",
    deadline: "10.05.2026",
    status: "Yangi",
    priority: "Yuqori",
    description: "2025-yil 4-chorak uchun balans, daromad-xarajat hisoboti va kassa kitoblarini yuklang. Imzolangan PDF formatda.",
    attachments: 0,
  },
  {
    id: "REQ-2026-0418",
    title: "Asosiy vositalar inventarizatsiyasi",
    auditor: "Abdullayeva Nargiza",
    sent: "29.04.2026",
    deadline: "08.05.2026",
    status: "Jarayonda",
    priority: "O'rta",
    description: "Asosiy vositalar ro'yxati, ularning balans qiymati va amortizatsiya hisoboti.",
    attachments: 2,
  },
  {
    id: "REQ-2026-0410",
    title: "Bank ko'chirmalari (yanvar-mart 2026)",
    auditor: "Tursunov Bekzod",
    sent: "20.04.2026",
    deadline: "05.05.2026",
    status: "Tayyorgarlikda",
    priority: "Past",
    description: "Yanvar-mart oylari uchun barcha hisob raqamlari bo'yicha bank ko'chirmalarini taqdim eting.",
    attachments: 1,
  },
  {
    id: "REQ-2026-0395",
    title: "Xodimlar shtat jadvali va mehnat shartnomalari",
    auditor: "Tursunov Bekzod",
    sent: "10.04.2026",
    deadline: "20.04.2026",
    status: "Yakunlangan",
    priority: "O'rta",
    description: "Joriy shtat jadvali va so'nggi yarim yilda imzolangan mehnat shartnomalari.",
    attachments: 6,
  },
  {
    id: "REQ-2026-0382",
    title: "Yetkazib beruvchilar bilan shartnomalar",
    auditor: "Abdullayeva Nargiza",
    sent: "01.04.2026",
    deadline: "12.04.2026",
    status: "Yakunlangan",
    priority: "Past",
    description: "Top-10 yetkazib beruvchi bilan tuzilgan shartnomalar nusxalari.",
    attachments: 10,
  },
];

export const DOCUMENTS = [
  { id: 1, name: "Ustav (yangi tahriri).pdf",          category: "Tashkiliy",  size: "1.2 MB", uploaded: "15.03.2026", status: "Qabul qilindi", uploader: "Karimov A." },
  { id: 2, name: "Davlat ro'yxatidan o'tish.pdf",      category: "Tashkiliy",  size: "456 KB", uploaded: "12.04.2018", status: "Qabul qilindi", uploader: "Karimov A." },
  { id: 3, name: "2025 yillik balans.xlsx",            category: "Moliyaviy",  size: "892 KB", uploaded: "20.01.2026", status: "Qabul qilindi", uploader: "Yusupova D." },
  { id: 4, name: "2025-Q4 kassa kitobi.pdf",           category: "Moliyaviy",  size: "3.4 MB", uploaded: "05.05.2026", status: "Ko'rib chiqilmoqda", uploader: "Yusupova D." },
  { id: 5, name: "Asosiy vositalar ro'yxati.xlsx",     category: "Inventarizatsiya", size: "245 KB", uploaded: "30.04.2026", status: "Qabul qilindi", uploader: "Yusupova D." },
  { id: 6, name: "Shartnoma — \"Olcha-Mart\".pdf",      category: "Shartnomalar", size: "678 KB", uploaded: "11.04.2026", status: "Qabul qilindi", uploader: "Karimov A." },
  { id: 7, name: "Shtat jadvali 2026.pdf",             category: "Kadrlar",    size: "189 KB", uploaded: "15.04.2026", status: "Qabul qilindi", uploader: "Karimov A." },
  { id: 8, name: "Bank ko'chirmasi yanvar.pdf",        category: "Moliyaviy",  size: "1.8 MB", uploaded: "02.05.2026", status: "Ko'rib chiqilmoqda", uploader: "Yusupova D." },
  { id: 9, name: "Litsenziya (savdo).pdf",             category: "Tashkiliy",  size: "312 KB", uploaded: "05.06.2024", status: "Qabul qilindi", uploader: "Karimov A." },
  { id: 10, name: "Soliq deklaratsiyasi 2025.pdf",     category: "Soliq",      size: "1.1 MB", uploaded: "10.02.2026", status: "Rad etildi",   uploader: "Yusupova D.", note: "Imzo aniq emas — qayta yuboring" },
];

export const INSPECTIONS = [
  {
    id: "INS-2026-019",
    type: "Kameral audit",
    leadAuditor: "Abdullayeva Nargiza Rustamovna",
    team: ["Tursunov Bekzod", "Sayfullayev Otabek"],
    started:  "15.04.2026",
    deadline: "30.05.2026",
    stage:    "Hujjatlarni tekshirish",
    progress: 45,
    status:   "Jarayonda",
    timeline: [
      { date: "15.04.2026", title: "Audit boshlandi",        done: true },
      { date: "20.04.2026", title: "Hujjatlarni so'rash",   done: true },
      { date: "05.05.2026", title: "Hujjatlarni tekshirish", done: false, active: true },
      { date: "20.05.2026", title: "Tahliliy tekshirish",   done: false },
      { date: "30.05.2026", title: "Yakuniy hisobot",        done: false },
    ],
  },
  {
    id: "INS-2025-042",
    type: "Sayyor audit",
    leadAuditor: "Sodiqov Jasur Karimovich",
    team: ["Mahmudov Sherzod"],
    started:  "10.09.2025",
    deadline: "25.10.2025",
    stage:    "Yakunlangan",
    progress: 100,
    status:   "Ijobiy yakunlangan",
    result:   "Jiddiy buzilishlar aniqlanmadi. 2 ta tavsiya berildi.",
  },
  {
    id: "INS-2024-087",
    type: "Kameral audit",
    leadAuditor: "Rasulova Madina",
    team: [],
    started:  "01.03.2024",
    deadline: "15.04.2024",
    stage:    "Yakunlangan",
    progress: 100,
    status:   "Ijobiy yakunlangan",
    result:   "Barcha hujjatlar tartibda. E'tirozlar yo'q.",
  },
];

export const MESSAGES = [
  {
    id: 1, from: "Abdullayeva Nargiza", role: "Yetakchi auditor",
    time: "Bugun, 14:25", unread: true,
    text: "Assalomu alaykum. 4-chorak kassa kitoblari bo'yicha qo'shimcha tushuntirish kerak — 23.12.2025 sanasidagi 12 mln so'mlik kirim qaysi shartnoma asosida bo'lgan?",
  },
  {
    id: 2, from: "Abdullayeva Nargiza", role: "Yetakchi auditor",
    time: "Bugun, 11:40", unread: true,
    text: "Asosiy vositalar inventarizatsiyasini qabul qildim, rahmat. Bir nechta savol yuboraman.",
  },
  {
    id: 3, from: "Tursunov Bekzod", role: "Auditor",
    time: "Kecha, 16:10", unread: false,
    text: "Bank ko'chirmalari to'liq tushdi. Tahlil qilib, sizga keyingi haftada javob qaytaramiz.",
  },
  {
    id: 4, from: "Siz", role: "",
    time: "Kecha, 09:15", unread: false,
    text: "Salom, asosiy vositalar ro'yxatini yukladim. Iltimos, qabul qilinganligini tasdiqlang.",
    own: true,
  },
  {
    id: 5, from: "Tizim", role: "Avtomatik xabar",
    time: "01.05.2026", unread: false,
    text: "Yangi audit boshlandi: INS-2026-019 (Kameral audit). Yetakchi auditor — Abdullayeva Nargiza.",
    system: true,
  },
];

export const REPORTS = [
  { id: 1, title: "Audit yakuniy hisoboti — INS-2025-042",   date: "25.10.2025", type: "Sayyor audit",   status: "Ijobiy", size: "2.4 MB", signed: true },
  { id: 2, title: "Audit yakuniy hisoboti — INS-2024-087",   date: "15.04.2024", type: "Kameral audit",  status: "Ijobiy", size: "1.8 MB", signed: true },
  { id: 3, title: "Tavsiyalar ro'yxati — 2025-yil",         date: "30.10.2025", type: "Tavsiyalar",     status: "Neytral", size: "342 KB", signed: true },
  { id: 4, title: "Audit sertifikati — 2024",                date: "20.04.2024", type: "Sertifikat",     status: "Ijobiy", size: "189 KB", signed: true },
];

export const NOTIFICATIONS = [
  { id: 1, type: "request",    title: "Yangi so'rov keldi",      desc: "REQ-2026-0421 — 2025-yil 4-chorak balansi", time: "2 soat oldin", unread: true },
  { id: 2, type: "message",    title: "Yangi xabar",             desc: "Abdullayeva Nargiza dan", time: "3 soat oldin", unread: true },
  { id: 3, type: "document",   title: "Hujjat rad etildi",       desc: "Soliq deklaratsiyasi 2025.pdf — imzo aniq emas", time: "Kecha", unread: false },
  { id: 4, type: "inspection", title: "Audit bosqichi yangilandi", desc: "INS-2026-019 — \"Hujjatlarni tekshirish\" bosqichida", time: "2 kun oldin", unread: false },
  { id: 5, type: "system",     title: "Profil ma'lumotlari yangilandi", desc: "Soliq xizmatidan yangilangan ma'lumot tushdi", time: "1 hafta oldin", unread: false },
];

export const TEAM = [
  { name: "Karimov Akmal Sodiqovich",   role: "Direktor",         email: "akmal@barakat-savdo.uz",   phone: "+998 90 123-45-67", access: "To'liq" },
  { name: "Yusupova Dilfuza Rahmatovna", role: "Bosh hisobchi",   email: "dilfuza@barakat-savdo.uz", phone: "+998 91 234-56-78", access: "Hujjatlar, hisobotlar" },
  { name: "Olimov Sherzod Bahromovich",  role: "Yurist",          email: "sherzod@barakat-savdo.uz", phone: "+998 93 345-67-89", access: "Faqat o'qish" },
];
