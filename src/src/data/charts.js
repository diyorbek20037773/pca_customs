export const MONTHS = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

export const LINE_DATA = MONTHS.map((m, i) => ({
  month: m,
  ijobiy: 120 + Math.round(Math.sin(i * 0.6) * 60),
  salbiy: 140 + Math.round(Math.cos(i * 0.5) * 60),
}));

// Audit shakli bo'yicha — rasmiy duo-hue:
// "Ijobiy" — teal oilasidagi soyalar (ijobiy ohang)
// "Salbiy" — slate oilasidagi neytral soyalar (haddan tashqari ogohlantiruvchi rang yo'q)
export const PIE_DATA = [
  { name: "Sayyor Ijobiy",  value: 15, color: "#5EEAD4", colorLight: "#A7F3D0", colorDark: "#14B8A6" },
  { name: "Kameral Salbiy", value: 35, color: "#475569", colorLight: "#94A3B8", colorDark: "#334155" },
  { name: "Sayyor Salbiy",  value: 15, color: "#94A3B8", colorLight: "#CBD5E1", colorDark: "#64748B" },
  { name: "Kameral Ijobiy", value: 35, color: "#0F766E", colorLight: "#14B8A6", colorDark: "#134E4A" },
];

// Audit maqsadi bo'yicha — yagona teal soyaning monochromatik 3 darajasi.
export const PIE_MAQSAD = [
  { name: "Individual", value: 28, color: "#5EEAD4", colorLight: "#A7F3D0", colorDark: "#14B8A6" },
  { name: "Maxsus",     value: 32, color: "#14B8A6", colorLight: "#5EEAD4", colorDark: "#0F766E" },
  { name: "Maqsadli",   value: 40, color: "#0F766E", colorLight: "#14B8A6", colorDark: "#134E4A" },
];

// 14 ta viloyat — `id` xaritada (mapPaths.js) ishlatiladigan tugma bilan mos.
export const REGS = [
  { name: "Qoraqalpog'iston Resp.", id: "qoraqalpog", s: 77.3,  i: 77.3,  sa: 77.3,  sum: 77.3  },
  { name: "Andijon",                id: "andijan",    s: 70.6,  i: 70.6,  sa: 70.6,  sum: 70.6  },
  { name: "Buxoro",                 id: "buxoro",     s: 130.7, i: 130.7, sa: 130.7, sum: 130.7 },
  { name: "Jizzax",                 id: "jizzax",     s: 9.6,   i: 9.6,   sa: 9.6,   sum: 9.6   },
  { name: "Qashqadaryo",            id: "qashqa",     s: 11.3,  i: 11.3,  sa: 11.3,  sum: 11.3  },
  { name: "Navoiy",                 id: "navoiy",     s: 10.8,  i: 10.8,  sa: 10.8,  sum: 10.8  },
  { name: "Namangan",               id: "namangan",   s: 16.4,  i: 16.4,  sa: 16.4,  sum: 16.4  },
  { name: "Samarqand",              id: "samarqand",  s: 39.4,  i: 39.4,  sa: 39.4,  sum: 39.4  },
  { name: "Surxondaryo",            id: "surxon",     s: 178.3, i: 178.3, sa: 178.3, sum: 178.3 },
  { name: "Sirdaryo",               id: "sirdaryo",   s: 63.3,  i: 63.3,  sa: 63.3,  sum: 63.3  },
  { name: "Toshkent shahri",        id: "toshkent",   s: 318.6, i: 318.6, sa: 318.6, sum: 318.6 },
  { name: "Toshkent viloyati",      id: "toshkent-v", s: 90.5,  i: 50.2,  sa: 40.3,  sum: 88.7  },
  { name: "Xorazm",                 id: "xorazm",     s: 25.4,  i: 14.1,  sa: 11.3,  sum: 24.8  },
  { name: "Farg'ona",               id: "fergana",    s: 55.7,  i: 30.4,  sa: 25.3,  sum: 53.9  },
];
