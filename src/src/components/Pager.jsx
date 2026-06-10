import { C } from "../theme/colors";

export const Pager = ({ total, page, pp, onChange }) => {
  const pages = Math.ceil(total / pp) || 1;
  const from = (page - 1) * pp + 1;
  const to = Math.min(page * pp, total);

  const Btn = ({ label, p, active = false, disabled = false }) => (
    <button onClick={() => { if (!disabled) onChange(p); }}
      style={{
        border: `1px solid ${active ? C.primary : C.border}`,
        background: active ? C.primary : C.card,
        color: active ? "white" : C.textPrimary,
        padding: "3px 7px", borderRadius: 4,
        cursor: disabled ? "default" : "pointer",
        fontSize: 11.5, minWidth: 26,
        opacity: disabled ? 0.4 : 1,
        fontWeight: active ? 700 : 400,
      }}>{label}</button>
  );

  const pageNums = Array.from({ length: Math.min(5, pages) }, (_, i) => {
    let p = i + 1;
    if (pages > 5) {
      if (page <= 3) p = i + 1;
      else if (page >= pages - 2) p = pages - 4 + i;
      else p = page - 2 + i;
    }
    return p;
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, flexWrap: "wrap" }}>
      <span style={{ color: C.textMuted, whiteSpace: "nowrap" }}>
        {pages} tadan {page} ta sahifa, jami {total} tadan {from}-{to} gacha
      </span>
      <div style={{ display: "flex", gap: 2, marginLeft: 6 }}>
        <Btn label="«" p={1} disabled={page === 1} />
        <Btn label="‹" p={Math.max(1, page - 1)} disabled={page === 1} />
        {pageNums.map(p => <Btn key={p} label={p} p={p} active={p === page} />)}
        <Btn label="›" p={Math.min(pages, page + 1)} disabled={page === pages} />
        <Btn label="»" p={pages} disabled={page === pages} />
      </div>
      <select value={pp} onChange={() => {}} style={{
        border: `1px solid ${C.border}`, borderRadius: 4,
        padding: "3px 5px", fontSize: 11.5, marginLeft: 2,
        background: C.card, color: C.textPrimary,
      }}>
        {[10, 15, 25, 50, 100].map(v => <option key={v} value={v}>{v}</option>)}
      </select>
    </div>
  );
};
