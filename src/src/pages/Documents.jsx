import { useState } from "react";
import { Search, Download, Settings, Check } from "lucide-react";

import { C } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";
import { STIRS, NAMES, ADDRS, ATYPES } from "../data/mockData";

import { Card } from "../components/Card";
import { Pager } from "../components/Pager";
import { PeriodBtns } from "../components/PeriodBtns";
import { FillerRows } from "../components/TableFiller";

const DTABS = ["Qaror","Tekshiruv dasturi","Xabarnoma","Uzaytirish","To'xtatib turish","Dalolatnoma","Talabnoma"];

const DTITLES = [
  "Bojxona auditini o'tkazish to'g'risida bojxona organi qarorlari ro'yxati",
  "Bojxona auditini o'tkazish to'g'risida bojxona organi tekshiruv dasturlari ro'yxati",
  "Bojxona auditini o'tkazish to'g'risida bojxona organi xabarnomalari ro'yxati",
  "Bojxona auditini o'tkazish muddatini uzaytirishlar ro'yxati",
  "Bojxona auditini o'tkazish muddatini to'xtatib turishlar ro'yxati",
  "Bojxona auditini yakuni bo'yicha rasmiylashtirilgan dalolatnomalar ro'yxati",
  "Bojxona auditi yakuniga ko'ra yuborilgan talabnomalar ro'yxati",
];

// Base record generators per document type
const QAROR_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  qamrovBoshlanishi: "17.12.2022", qamrovTugashi: "17.12.2025",
  asoslar: "Bojxona organlari axborot dasturlarining ma'lumotlari tahlili natijasida kameral bojxona auditini o'tkazish bo'yicha aniqlangan xavf darajalari",
  vazifalar: "Tovarlarni muayyan bojxona rejimiga joylashtirishning qonuniyligi; bojxona deklaratsiyasida ko'rsatilgan ma'lumotlarning haqiqiyligi",
}));

const TEKSHIRUV_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  maqsad: "Bojxona organlari axborot dasturlarining ma'lumotlari tahlili natijasida aniqlangan xavf darajalari",
  predmet: "Bojxona deklaratsiyasida ko'rsatilgan ma'lumotlarning haqiqiyligi; TIF TN kodiga muvofiq to'g'ri tasniflanganligini tekshirish",
}));

const XABARNOMA_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  auditBoshlanish: "20.05.2025", xabarSanasi: "22.05.2025", xabarImzolangan: "24.05.2025",
}));

const UZAYTIRISH_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  uzBoshlanish: "20.06.2025", uzTugashi: "20.07.2025",
}));

const TOXTATISH_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  toxBoshlanish: "15.06.2025", toxTugashi: "15.07.2025",
}));

const DALOLATNOMA_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  bankRekvizit: `p/c 2020800010706600${i + 1}, MFO: 00423`,
  qamrovBoshlanish: "17.12.2022", qamrovTugashi: "17.12.2025",
}));

const TALABNOMA_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  stir: STIRS[i % 10], name: NAMES[i % 10],
  address: ADDRS[i % ADDRS.length],
  auditTuri: ATYPES[i % 3], shape: ["Kameral", "Sayyor"][i % 2],
  qarorRaqami: String(i + 1).padStart(7, "0"), qarorSanasi: "20.05.2025",
  talabRaqami: String(i + 1).padStart(7, "0"), talabSanasi: "25.05.2025",
  talabSummasi: `${(586 + i * 10).toLocaleString()} 000.00`,
  undirilgan:   `${(200 + i * 5).toLocaleString()} 000.00`,
  bartaraf:     `${(100 + i * 3).toLocaleString()} 000.00`,
  qoldiq:       `${(286 + i * 2).toLocaleString()} 000.00`,
  dalolatRaqami: String(i + 1).padStart(7, "0"), dalolatSanasi: "22.05.2025",
}));

const DOC_DATASETS = [
  QAROR_DATA, TEKSHIRUV_DATA, XABARNOMA_DATA,
  UZAYTIRISH_DATA, TOXTATISH_DATA, DALOLATNOMA_DATA, TALABNOMA_DATA,
];

const COLS = [
  // 0 Qaror
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:160},{h:"Manzili",k:"address",w:150},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Qamrov davri boshlanishi",k:"qamrovBoshlanishi"},{h:"Qamrov davri tugashi",k:"qamrovTugashi"},{h:"Audit uchun asoslar",k:"asoslar",w:200},{h:"Auditda o'rganiladigan vazifalar",k:"vazifalar",w:220,last:true}],
  // 1 Tekshiruv dasturi
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:160},{h:"Manzili",k:"address",w:140},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Audit maqsadi",k:"maqsad",w:200},{h:"Audit predmeti",k:"predmet",w:220,last:true}],
  // 2 Xabarnoma
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:160},{h:"Manzili",k:"address",w:140},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Audit boshlanish sanasi",k:"auditBoshlanish"},{h:"Xabarnoma sanasi",k:"xabarSanasi"},{h:"Xabarnoma imzolangan sana",k:"xabarImzolangan",last:true}],
  // 3 Uzaytirish
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:160},{h:"Manzili",k:"address",w:140},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Muddatni uzaytirish boshlanish sanasi",k:"uzBoshlanish"},{h:"Muddatni uzaytirish tugallanish sanasi",k:"uzTugashi",last:true}],
  // 4 To'xtatib turish
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:160},{h:"Manzili",k:"address",w:140},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Muddatni to'xtatib turish boshlanish sanasi",k:"toxBoshlanish"},{h:"Muddatni to'xtatib turish tugallanish sanasi",k:"toxTugashi",last:true}],
  // 5 Dalolatnoma
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:140},{h:"Manzili",k:"address",w:130},{h:"Audit turi",k:"auditTuri"},{h:"Audit shakli",k:"shape"},{h:"Qaror raqami",k:"qarorRaqami"},{h:"Qaror sanasi",k:"qarorSanasi"},{h:"Bank rekvizitlari",k:"bankRekvizit",w:200},{h:"Qamrov davri boshlanish",k:"qamrovBoshlanish"},{h:"Qamrov davri tugashi",k:"qamrovTugashi",last:true}],
  // 6 Talabnoma
  [{h:"T/r"},{h:"STIR",k:"stir",c:C.primary,fw:700},{h:"Nomi",k:"name",w:130},{h:"Manzili",k:"address",w:120},{h:"Talabnoma raqami",k:"talabRaqami"},{h:"Talabnoma sanasi",k:"talabSanasi"},{h:"Talabnoma summasi",k:"talabSummasi"},{h:"Undirilgan summa",k:"undirilgan",c:C.success},{h:"Bartaraf etilgan summa",k:"bartaraf",c:C.warning},{h:"Qoldiq summa",k:"qoldiq",c:C.danger},{h:"Dalolatnoma raqami",k:"dalolatRaqami"},{h:"Dalolatnoma sanasi",k:"dalolatSanasi",last:true}],
];

export const DocumentsPage = () => {
  const [sub, setSub] = useState(0);
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState("Barchasi");
  const [search, setSearch] = useState("");
  const pp = 15;
  const dataset = DOC_DATASETS[sub];
  const filtered = dataset.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) || d.stir.includes(search)
  );
  const cols = COLS[sub];

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>
        {DTABS.map((t,i)=>{
          const on=sub===i;
          return(
            <button key={t} onClick={()=>{setSub(i);setPage(1);setSearch("");}}
              style={{padding:"6px 16px",borderRadius:6,border:`1px solid ${on?C.primary:C.border}`,
                background:on?C.primary:C.card,color:on?"white":C.textMuted,
                cursor:"pointer",fontSize:12.5,fontWeight:on?600:400,
                display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap",transition:"all .15s"}}>
              {on&&<Check size={12}/>}{t}
            </button>
          );
        })}
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10,flexWrap:"wrap"}}>
        <div style={{fontSize:14,fontWeight:700,color:C.textPrimary,maxWidth:420,lineHeight:1.4}}>{DTITLES[sub]}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          <PeriodBtns active={period} onChange={p=>{setPeriod(p);setPage(1);}}/>
          <span style={{fontSize:11,color:C.textMuted,whiteSpace:"nowrap"}}>01.01.2025 — 22.11.2025</span>
          <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px",gap:6,background:C.bg,minWidth:160}}>
            <Search size={13} color={C.textMuted}/>
            <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="Qidiruv..." style={{border:"none",outline:"none",fontSize:12,width:120,background:"transparent",color:C.textPrimary}}/>
          </div>
          <button style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}>
            <Download size={13}/>Export
          </button>
          <button style={{width:32,height:32,border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><Settings size={14}/></button>
        </div>
      </div>

      <Card style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,overflow:"auto"}}>
          <table style={{...tblWrap,height:"100%"}}>
            <thead>
              <tr>
                {cols.map((col,i)=>{
                  const s=col.last?THl:TH({whiteSpace:"nowrap"});
                  return <th key={i} style={s}>{col.h}</th>;
                })}
              </tr>
              <tr style={{background:C.filterBg}}>
                {cols.map((_,i)=>(
                  <td key={i} style={{padding:"4px 6px",borderBottom:`1px solid ${C.border}`,borderRight:`1px solid ${C.borderLight}`}}>
                    {(i===1||i===2||i===3) && <input placeholder="Mezon" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 5px",fontSize:10.5,outline:"none",background:C.card,color:C.textPrimary}}/>}
                    {i===4 && <select style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 3px",fontSize:10.5,outline:"none",background:C.card,color:C.textPrimary}}><option>—</option>{ATYPES.map(t=><option key={t}>{t}</option>)}</select>}
                    {i===5 && <select style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 3px",fontSize:10.5,outline:"none",background:C.card,color:C.textPrimary}}><option>—</option><option>Kameral</option><option>Sayyor</option></select>}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page-1)*pp,page*pp).map((d,ri)=>(
                <tr key={d.id}
                  onMouseEnter={e=>e.currentTarget.style.background=C.rowHover}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  {cols.map((col,ci,ca)=>{
                    const isLast=col.last||ci===ca.length-1;
                    const val=ci===0?(page-1)*pp+ri+1:col.k?d[col.k]:"";
                    const baseStyle = {
                      color: col.c || C.textPrimary,
                      fontWeight: col.fw,
                      maxWidth: col.w,
                      whiteSpace: col.w ? "nowrap" : "normal",
                      overflow: col.w ? "hidden" : "visible",
                      textOverflow: col.w ? "ellipsis" : "clip",
                      fontSize: col.w && col.w < 150 ? 10.5 : 12,
                    };
                    return <td key={ci} style={isLast?TDl(baseStyle):TD(baseStyle)}>{val}</td>;
                  })}
                </tr>
              ))}
              <FillerRows
                count={pp - filtered.slice((page-1)*pp,page*pp).length}
                cols={cols.length} />
            </tbody>
          </table>
        </div>
        <div style={{padding:"12px 16px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"center",flexShrink:0}}>
          <Pager total={filtered.length} page={page} pp={pp} onChange={setPage}/>
        </div>
      </Card>
    </div>
  );
};
