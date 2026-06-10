import { useState, useMemo } from "react";

import { C } from "../theme/colors";
import { Card } from "../components/Card";
import { Pager } from "../components/Pager";
import { IntegrationTabs } from "../components/IntegrationTabs";
import { IntegrationToolbar } from "../components/IntegrationToolbar";
import { INTEGRATION_MENU, SOLIQ_TABS } from "../data/integration";

import {
  SoliqRoyxatgaOlish, SoliqXodimlar, SoliqEHF, SoliqONK, SoliqMoliya,
} from "./integratsiya/SoliqTables";

const SOLIQ_TABLES = {
  "royxatga-olish": SoliqRoyxatgaOlish,
  "xodimlar":       SoliqXodimlar,
  "ehf":            SoliqEHF,
  "onk":            SoliqONK,
  "moliya":         SoliqMoliya,
};

const Placeholder = ({ label }) => (
  <div style={{
    padding: "60px 20px", textAlign: "center",
    color: C.textMuted, fontSize: 13,
  }}>
    "{label}" bo'limi ma'lumotlari tayyorlanmoqda.
  </div>
);

export const IntegratsiyaPage = ({ section, tab, setTab }) => {
  const [page, setPage]     = useState(1);
  const [period, setPeriod] = useState("Barchasi");
  const [query, setQuery]   = useState("312026173");
  const pp = 15;

  const sectionMeta = useMemo(
    () => INTEGRATION_MENU.find(m => m.key === section),
    [section],
  );

  if (section !== "soliq") {
    return (
      <div style={{ padding: 20 }}>
        <Card style={{ padding: 0 }}>
          <Placeholder label={sectionMeta?.label || ""} />
        </Card>
      </div>
    );
  }

  const tabMeta = SOLIQ_TABS.find(t => t.key === tab) || SOLIQ_TABS[0];
  const Table   = SOLIQ_TABLES[tabMeta.key];
  const total   = 375;

  return (
    <div style={{
      padding: 20, display: "flex", flexDirection: "column",
      gap: 0, minHeight: "100%", boxSizing: "border-box",
    }}>
      <IntegrationTabs
        tabs={SOLIQ_TABS}
        active={tabMeta.key}
        onChange={k => { setTab(k); setPage(1); }}
      />

      <IntegrationToolbar
        title={tabMeta.label}
        period={period} setPeriod={setPeriod}
        query={query}   setQuery={setQuery}
      />

      <Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflow: "auto" }}>
          {Table
            ? <Table page={page} pp={pp} />
            : <Placeholder label={tabMeta.label} />}
        </div>
        <div style={{
          padding: "12px 16px", borderTop: `1px solid ${C.border}`,
          display: "flex", justifyContent: "center", flexShrink: 0,
        }}>
          <Pager total={total} page={page} pp={pp} onChange={setPage} />
        </div>
      </Card>
    </div>
  );
};
