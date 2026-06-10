const ROUTE_LABELS = [
  { path: "/",                 bc: ["Bosh sahifa"] },
  { path: "/profil",           bc: ["Bosh sahifa", "Mening profilim"] },
  { path: "/sorovlar",         bc: ["Bosh sahifa", "So'rovlar"] },
  { path: "/sorovlar/",        bc: ["Bosh sahifa", "So'rovlar", "Tafsilot"] },
  { path: "/hujjatlar",        bc: ["Bosh sahifa", "Hujjatlar"] },
  { path: "/tekshiruvlar",     bc: ["Bosh sahifa", "Tekshiruvlar"] },
  { path: "/tekshiruvlar/",    bc: ["Bosh sahifa", "Tekshiruvlar", "Tafsilot"] },
  { path: "/muloqot",          bc: ["Bosh sahifa", "Muloqot"] },
  { path: "/hisobotlar",       bc: ["Bosh sahifa", "Hisobotlar"] },
  { path: "/bildirishnomalar", bc: ["Bosh sahifa", "Bildirishnomalar"] },
  { path: "/sozlamalar",       bc: ["Bosh sahifa", "Sozlamalar"] },
  { path: "/yordam",           bc: ["Bosh sahifa", "Yordam"] },
];

export const getBC = (route) => {
  if (route.startsWith("/sorovlar/") && route.length > 10) {
    return ["Bosh sahifa", "So'rovlar", "Tafsilot"];
  }
  if (route.startsWith("/tekshiruvlar/") && route.length > 14) {
    return ["Bosh sahifa", "Tekshiruvlar", "Tafsilot"];
  }
  const exact = ROUTE_LABELS.find(r => r.path === route);
  return exact?.bc || ["Bosh sahifa"];
};
