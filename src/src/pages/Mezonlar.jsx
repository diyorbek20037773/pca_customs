import { useState } from "react";
import { Search, Download, Check } from "lucide-react";

import { C, ST } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";

import { Card } from "../components/Card";
import { Pager } from "../components/Pager";
import { RBar } from "../components/Badge";
import { FillerRows } from "../components/TableFiller";

const MEZON_DATA = Array.from({ length: 40 }, (_, i) => {
  const toifalar = ["Moliyaviy", "Huquqiy", "Statistik", "Operatsion", "Bojxona"];
  const holatlari = ["Aktiv", "Nofaol", "Baholash kutilmoqda"];
  const nomlar = [
    "TIF ishtirokchisiga nisbatan huquqbuzarliklar darajasi",
    "TIF RN kodi o'zgargan holatlar",
    "Avvalgi yillarga nisbatan importhajmi oshgan holatlar",
    "Vakolatli iqtisodiy operator holati",
    "Bojxona to'lovlarining o'sishi",
    "Soliq qarzdorligining mavjudligi",
    "Deklaratsiya qayta rasmiylashtirilish soni",
    "Import/eksport nisbatining o'zgarishi",
    "Bank operatsiyalarida anomaliyalar",
    "Tashqi savdo sherigining o'zgarishi",
  ];
  const risk = i % 5 === 0 ? 100 : i % 5 === 1 ? 80 : i % 5 === 2 ? 56 : i % 5 === 3 ? 43 : 35;
  return {
    id: i + 1,
    raqam: `${Math.floor(i / 10) + 1}-mezon.${(i % 10) + 1}`,
    nom: nomlar[i % 10],
    toifa: toifalar[i % 5],
    koef: (10 - (i % 10) * 0.5).toFixed(1),
    holat: holatlari[i % 3],
    risk,
    byud: Math.floor(15 + i * 2),
    aktiv: i % 3 !== 1,
  };
});

export const MezonlarPage = () => {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const pp = 15;
  const tabs = ["Barchasi", "Aktiv", "Nofaol", "Baholash kutilmoqda"];

  const filtered = MEZON_DATA.filter(m => {
    const qOk = m.nom.toLowerCase().includes(q.toLowerCase()) || m.raqam.includes(q);
    if (tab === 1) return qOk && m.holat === "Aktiv";
    if (tab === 2) return qOk && m.holat === "Nofaol";
    if (tab === 3) return qOk && m.holat === "Baholash kutilmoqda";
    return qOk;
  });
  const paged = filtered.slice((page - 1) * pp, page * pp);

  const stats = [
    { l: "Jami mezonlar",        v: 40,                                                              c: C.primary },
    { l: "Aktiv",                v: MEZON_DATA.filter(m=>m.holat==="Aktiv").length,                 c: C.success },
    { l: "Nofaol",               v: MEZON_DATA.filter(m=>m.holat==="Nofaol").length,                c: C.danger },
    { l: "Baholash kutilmoqda",  v: MEZON_DATA.filter(m=>m.holat==="Baholash kutilmoqda").length,   c: C.warning },
  ];

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{display:"flex",gap:12}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",flex:1}}>
            <div style={{fontSize:10.5,color:C.textMuted,fontWeight:700,letterSpacing:.5,marginBottom:4}}>{s.l.toUpperCase()}</div>
            <div style={{fontSize:30,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        {tabs.map((t,i)=>{
          const on=tab===i;
          return(
            <button key={t} onClick={()=>{setTab(i);setPage(1);}} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${on?C.primary:C.border}`,background:on?C.primary:C.card,color:on?"white":C.textMuted,cursor:"pointer",fontSize:12,fontWeight:on?700:400,display:"flex",alignItems:"center",gap:4}}>
              {on&&<Check size={11}/>}{t}
            </button>
          );
        })}
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px",gap:6,background:C.bg}}>
          <Search size={13} color={C.textMuted}/>
          <input value={q} onChange={e=>{setQ(e.target.value);setPage(1);}} placeholder="Qidiruv..." style={{border:"none",outline:"none",fontSize:12,width:160,background:"transparent",color:C.textPrimary}}/>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer",fontSize:12}}><Download size={13}/>Export</button>
      </div>

      <Card style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,overflow:"auto"}}>
          <table style={{...tblWrap,height:"100%"}}>
            <thead>
              <tr>{["T/r","Mezon raqami","Mezon nomi","Toifasi","Koeffitsient","BYuDlar soni","Holati","Xavf darajasi"].map((h,i,a)=>(<th key={h} style={i===a.length-1?THl:TH()}>{h}</th>))}</tr>
            </thead>
            <tbody>
              {paged.map((m,i)=>{
                const sb = m.holat==="Aktiv"?ST.green:m.holat==="Nofaol"?ST.red:ST.amber;
                return (
                <tr key={m.id} onMouseEnter={e=>e.currentTarget.style.background=C.rowHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={TD({color:C.textMuted})}>{(page-1)*pp+i+1}</td>
                  <td style={TD({fontWeight:700,color:C.primary,whiteSpace:"nowrap"})}>{m.raqam}</td>
                  <td style={TD({maxWidth:300,fontSize:11.5})}>{m.nom}</td>
                  <td style={TD()}><span style={{background:ST.blue.bg,color:ST.blue.txt,padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{m.toifa}</span></td>
                  <td style={TD({textAlign:"center",fontWeight:700})}>{m.koef}</td>
                  <td style={TD({textAlign:"center"})}>{m.byud}</td>
                  <td style={TD()}>
                    <span style={{
                      background: sb.bg, color: sb.txt,
                      padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap",
                    }}>{m.holat}</span>
                  </td>
                  <td style={TDl({minWidth:140})}><RBar v={m.risk}/></td>
                </tr>
                );
              })}
              <FillerRows count={pp - paged.length} cols={8} />
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
