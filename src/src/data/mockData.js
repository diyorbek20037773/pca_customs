export const NAMES = [
  "\"INTER ABSOLYUT\" MCHJ",
  "\"ALYANS DISTRIBUTIONS\" MCHJ XK",
  "\"QIBRAY TRANSFORMATOR\" QMJ",
  "\"AZIYA SAFAR-TRANS\" MCHJ",
  "\"BLOOMSHOP\" MCHJ",
  "\"FU XING ZHAO\" MCHJ",
  "\"SATTOR SANJAR TRANS\" MCHJ",
  "\"HOLOS\" MCHJ",
  "\"RETAIL TRADE EAST\" MCHJ",
  "\"ART-ELECTRO\" MCHJ",
];

export const STIRS = [
  "308581808", "305866650", "302653974", "303445298", "308170528",
  "306839889", "303775465", "207023238", "309532637", "308173887",
];

export const STATUSES = [
  "Yangi", "Jarayonda", "Ijobiy yakunlangan", "Salbiy yakunlangan", "Tayyorgarlikda",
];

export const REGIONS = [
  "Toshkent shahri", "Andijon viloyati", "Toshkent viloyati",
  "Samarqand viloyati", "Xorazm viloyati", "Buxoro viloyati",
];

export const EMPS = [
  "Salimov Dostonbek", "Isroilov Sheroz", "Ismaylov Kamoliddin",
  "Akramov Bahriddin", "Abdijamilov Islam",
];

export const ADDRS = [
  "1-kichik daха 23a/29",
  "O'rta ovul kfi, Saydgoziev ko'chasi, 21-uy",
  "Kibray shaharcha A.Navoiy shox ko'chasi, 186-uy",
  "O'zbekiston 50-yilligi",
  "Arnaсay ko'chasi 1a-uy",
  "Zanjirbog' ko'chasi. 2",
];

export const ACTS = [
  "46690 - Optovaya torgovlya",
  "46730 - Optovaya torgovlya",
  "27110 - Ishlab chiqarish",
  "49410 - Yuk tashish",
  "47190 - Chakana savdo",
];

export const ATYPES = ["Kompleks", "Individual", "Maqsadli"];

export const CANDIDATES = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10],
  name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  region: REGIONS[i % REGIONS.length],
  activity: ACTS[i % ACTS.length],
  status: STATUSES[i % STATUSES.length],
  shape: ["Kameral", "Sayyor"][i % 2],
  employee: EMPS[i % EMPS.length],
  assignedDate: "20.05.2025 13:06",
  daysLeft: i % 2 === 0 ? null : `${(i % 10) + 1} kun`,
}));

export const DOCS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10],
  name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3],
  shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: `${String(i + 1).padStart(7, "0")}`,
  qarorSanasi: "20.05.2025",
}));
