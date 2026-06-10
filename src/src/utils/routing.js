import { INTEGRATION_MENU, SOLIQ_TABS } from "../data/integration";

export const getBC = (r, intState = null) => {
  if (r === "/") return ["Bosh sahifa"];
  if (r === "/nomzodlar") return ["Bosh sahifa", "Nomzodlar"];
  if (r.startsWith("/nomzodlar/")) {
    return ["Bosh sahifa", "Nomzodlar", `STIR: ${r.split("/")[2]}`];
  }
  if (r.startsWith("/hujjatlar")) return ["Bosh sahifa", "Hujjatlar"];

  if (r.startsWith("/integratsiya")) {
    const bc = ["Bosh sahifa", "Integratsiya"];
    if (!intState) return bc;
    const section = INTEGRATION_MENU.find(m => m.key === intState.section);
    if (section) bc.push(section.label);
    if (intState.section === "soliq" && intState.tab) {
      const tab = SOLIQ_TABS.find(t => t.key === intState.tab);
      if (tab) bc.push(tab.label);
    }
    return bc;
  }

  const map = {
    "/mezonlar":    "Mezonlar",
    "/hisobotlar":  "Hisobotlar",
    "/nazorat":     "Nazorat tadbirlari",
    "/modullar":    "Modullar",
  };
  return map[r] ? ["Bosh sahifa", map[r]] : ["Bosh sahifa"];
};
