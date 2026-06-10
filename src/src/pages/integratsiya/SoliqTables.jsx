import { C } from "../../theme/colors";
import { TH, THl, TD, TDl } from "../../styles/table";
import { ROYXATGA_ROWS, XODIMLAR_ROWS, EHF_ROWS, ONK_ROWS } from "../../data/integration";

// ─── Umumiy helperlar ──────────────────────────────────────────────────

const TABLE_BASE = {
  width: "100%",
  height: "100%",
  borderCollapse: "collapse",
  fontSize: 12,
  tableLayout: "fixed",
};

const THw  = (extra = {}) => TH({ whiteSpace: "normal", ...extra });
const THwl = TH({ whiteSpace: "normal", borderRight: "none" });

const Link = ({ children }) => (
  <a href="#" onClick={e => e.preventDefault()}
    style={{ color: C.primary, textDecoration: "underline" }}>{children}</a>
);

const FilterInput = ({ type = "text" }) => (
  <input type={type}
    style={{
      width: "100%", padding: "4px 6px", boxSizing: "border-box",
      border: `1px solid ${C.border}`, borderRadius: 4,
      fontSize: 11, outline: "none",
      background: C.card, color: C.textPrimary,
    }} />
);

const FilterSelect = () => (
  <select style={{
    width: "100%", padding: "4px 6px", boxSizing: "border-box",
    border: `1px solid ${C.border}`, borderRadius: 4,
    fontSize: 11, outline: "none",
    background: C.card, color: C.textPrimary,
  }}><option></option></select>
);

const renderRows = (rows, renderRow, page, pp, colCount) => {
  const visible = rows.slice((page - 1) * pp, page * pp);
  const fillerCount = pp - visible.length;
  return (
    <>
      {visible.map((r, i) => {
        const idx   = (page - 1) * pp + i;
        const zebra = idx % 2 ? C.rowAlt : C.card;
        return (
          <tr key={idx} style={{ background: zebra }}
            onMouseEnter={e => e.currentTarget.style.background = C.rowHover}
            onMouseLeave={e => e.currentTarget.style.background = zebra}>
            <td style={TD({ color: C.textMuted, textAlign: "center" })}>{idx + 1}</td>
            {renderRow(r)}
          </tr>
        );
      })}
      {Array.from({ length: fillerCount }).map((_, i) => (
        <tr key={`f-${i}`} aria-hidden="true">
          {Array.from({ length: colCount }).map((_, j) => {
            const isLast = j === colCount - 1;
            return <td key={j} style={isLast ? TDl() : TD()}>&nbsp;</td>;
          })}
        </tr>
      ))}
      <tr style={{ height: "100%" }} aria-hidden="true">
        {Array.from({ length: colCount }).map((_, j) => {
          const isLast = j === colCount - 1;
          return (
            <td key={j} style={{
              borderRight: isLast ? "none" : `1px solid ${C.borderLight}`,
              verticalAlign: "top",
            }}>&nbsp;</td>
          );
        })}
      </tr>
    </>
  );
};

// ─── 1 — Ro'yxatga olish ma'lumotlari ──────────────────────────────────

export const SoliqRoyxatgaOlish = ({ page, pp }) => (
  <table style={{ ...TABLE_BASE, minWidth: 1400 }}>
    <colgroup>
      <col style={{ width: 45  }} />
      <col style={{ width: 170 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 130 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 130 }} />
      <col style={{ width: 100 }} />
      <col style={{ width: 130 }} />
      <col style={{ width: 220 }} />
      <col style={{ width: 220 }} />
    </colgroup>
    <thead>
      <tr>
        <th style={THw()}>T/r</th>
        <th style={THw()}>Nomi</th>
        <th style={THw()}>STIR/JSHSHIR</th>
        <th style={THw()}>Davlat ro'yxatidan o'tgan sana</th>
        <th style={THw()}>Faoliyat yuritish holati</th>
        <th style={THw()}>Faoliyatini tugatgan vaqti</th>
        <th style={THw()}>Faoliyat turi</th>
        <th style={THw()}>Tashkiliy-huquqiy shakli</th>
        <th style={THw()}>Barqarorlik reytingi</th>
        <th style={THwl}>Ustav fondi</th>
      </tr>
      <tr>
        <th style={TH()}></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput type="date" /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput type="date" /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={THl}><FilterInput /></th>
      </tr>
    </thead>
    <tbody>
      {renderRows(ROYXATGA_ROWS, r => (
        <>
          <td style={TD({ fontWeight: 500 })}>{r.nomi}</td>
          <td style={TD()}><Link>{r.stir}</Link></td>
          <td style={TD()}>{r.royxatSana}</td>
          <td style={TD()}>{r.holat}</td>
          <td style={TD()}>{r.tugatganVaqti}</td>
          <td style={TD()}>{r.tur}</td>
          <td style={TD()}>{r.shakl}</td>
          <td style={TD({ fontSize: 11, color: C.textMuted, lineHeight: 1.4 })}>{r.barqarorlik}</td>
          <td style={TDl({ fontSize: 11, color: C.textMuted, lineHeight: 1.4 })}>{r.ustav}</td>
        </>
      ), page, pp, 10)}
    </tbody>
  </table>
);

// ─── 2 — Korxonaning xodimlari ma'lumotlari ────────────────────────────

export const SoliqXodimlar = ({ page, pp }) => (
  <table style={{ ...TABLE_BASE, minWidth: 1300 }}>
    <colgroup>
      <col style={{ width: 45  }} />
      <col style={{ width: 100 }} />
      <col style={{ width: 190 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 150 }} />
      <col style={{ width: 140 }} />
      <col style={{ width: 130 }} />
      <col style={{ width: 150 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 130 }} />
    </colgroup>
    <thead>
      <tr>
        <th style={THw()}>T/r</th>
        <th style={THw()}>STIR</th>
        <th style={THw()}>Korxona nomi</th>
        <th style={THw()}>JSHSHIR</th>
        <th style={THw()}>Xodimning F.I.SH</th>
        <th style={THw()}>Xodimning tug'ilgan sanasi</th>
        <th style={THw()}>Xodimning lavozimi</th>
        <th style={THw()}>Pasport seriyasi va raqami</th>
        <th style={THw()}>Fuqaroligi</th>
        <th style={THwl}>Telefon raqami</th>
      </tr>
      <tr>
        <th style={TH()}></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput type="date" /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={THl}><FilterInput /></th>
      </tr>
    </thead>
    <tbody>
      {renderRows(XODIMLAR_ROWS, r => (
        <>
          <td style={TD()}><Link>{r.stir}</Link></td>
          <td style={TD({ fontWeight: 500 })}>{r.korxona}</td>
          <td style={TD()}>{r.jshshir}</td>
          <td style={TD()}>{r.fish}</td>
          <td style={TD()}>{r.tugSana}</td>
          <td style={TD()}>{r.lavozim}</td>
          <td style={TD()}>{r.pasport}</td>
          <td style={TD()}>{r.fuqarolik}</td>
          <td style={TDl()}>{r.tel}</td>
        </>
      ), page, pp, 10)}
    </tbody>
  </table>
);

// ─── 3 — Elektron hisobvaraq-fakturalar ────────────────────────────────

export const SoliqEHF = ({ page, pp }) => (
  <table style={{ ...TABLE_BASE, minWidth: 1400 }}>
    <colgroup>
      <col style={{ width: 45  }} />
      <col style={{ width: 100 }} />
      <col style={{ width: 100 }} />
      <col style={{ width: 120 }} />
      <col style={{ width: 140 }} />
      <col style={{ width: 140 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 200 }} />
      <col style={{ width: 120 }} />
      <col style={{ width: 140 }} />
    </colgroup>
    <thead>
      <tr>
        <th style={THw()}>T/r</th>
        <th style={THw()}>EHF raqami</th>
        <th style={THw()}>EFH sanasi</th>
        <th style={THw()}>Sotuvchi nomi</th>
        <th style={THw()}>Sotuvchi STIR/JSHSHIR</th>
        <th style={THw()}>QQS guvohnoma holati</th>
        <th style={THw()}>Xaridor nomi</th>
        <th style={THw()}>Xaridor STIR/QQS guvohnoma holati</th>
        <th style={THw()}>Komitent STIR</th>
        <th style={THwl}>Komitent nomi</th>
      </tr>
      <tr>
        <th style={TH()}></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput type="date" /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={THl}><FilterInput /></th>
      </tr>
    </thead>
    <tbody>
      {renderRows(EHF_ROWS, r => (
        <>
          <td style={TD()}><Link>{r.ehfRaqam}</Link></td>
          <td style={TD()}><Link>{r.ehfSana}</Link></td>
          <td style={TD()}><Link>{r.sotuvchiNomi}</Link></td>
          <td style={TD()}>{r.sotuvchiStir}</td>
          <td style={TD()}>{r.qqsSotuvchi}</td>
          <td style={TD()}>{r.xaridorNomi}</td>
          <td style={TD()}>{r.xaridorStir}</td>
          <td style={TD()}>{r.qqsXaridor}</td>
          <td style={TDl()}>{r.komitentNomi}</td>
        </>
      ), page, pp, 10)}
    </tbody>
  </table>
);

// ─── 4 — Onlayn nazorat kassa texnikasi cheklari ───────────────────────

export const SoliqONK = ({ page, pp }) => (
  <table style={{ ...TABLE_BASE, minWidth: 1500 }}>
    <colgroup>
      <col style={{ width: 45  }} />
      <col style={{ width: 130 }} />
      <col style={{ width: 170 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 120 }} />
      <col style={{ width: 95  }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 140 }} />
      <col style={{ width: 110 }} />
      <col style={{ width: 80  }} />
      <col style={{ width: 110 }} />
    </colgroup>
    <thead>
      <tr>
        <th style={THw()}>T/r</th>
        <th style={THw()}>Sotuvchi STIR/JSHSHIR</th>
        <th style={THw()}>Sotuvchi nomi</th>
        <th style={THw()}>Tovar cheki raqami</th>
        <th style={THw()}>Tovar cheki sanasi</th>
        <th style={THw()}>MXIK kodi</th>
        <th style={THw()}>MXIK nomi</th>
        <th style={THw()}>Mahsulot nomi</th>
        <th style={THw()}>O'lchov birligi</th>
        <th style={THw()}>Soni</th>
        <th style={THwl}>Narxi</th>
      </tr>
      <tr>
        <th style={TH()}></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterInput type="date" /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={TH()}><FilterSelect /></th>
        <th style={TH()}><FilterInput /></th>
        <th style={THl}><FilterInput /></th>
      </tr>
    </thead>
    <tbody>
      {renderRows(ONK_ROWS, r => (
        <>
          <td style={TD({ fontWeight: 500 })}>{r.sotuvchiStir}</td>
          <td style={TD()}><Link>{r.sotuvchiNomi}</Link></td>
          <td style={TD()}>{r.checkRaqam}</td>
          <td style={TD()}>{r.checkSana}</td>
          <td style={TD()}>{r.mxikKodi}</td>
          <td style={TD()}>{r.mxikNomi}</td>
          <td style={TD()}>{r.mahsulot}</td>
          <td style={TD()}>{r.olchov}</td>
          <td style={TD()}>{r.soni}</td>
          <td style={TDl()}>{r.narxi}</td>
        </>
      ), page, pp, 11)}
    </tbody>
  </table>
);

// ─── 5 — Moliyaviy hisobotlar (1-jadval bilan bir xil) ─────────────────

export const SoliqMoliya = ({ page, pp }) => <SoliqRoyxatgaOlish page={page} pp={pp} />;
