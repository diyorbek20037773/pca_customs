import { useState } from "react";
import { Search, Download, Settings, Check } from "lucide-react";

import { C, ST } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";
import { NAMES, STIRS } from "../data/mockData";

import { Card } from "../components/Card";
import { Pager } from "../components/Pager";
import { PeriodBtns } from "../components/PeriodBtns";
import { FillerRows } from "../components/TableFiller";

const NAZ_DATA = Array.from({ length: 40 }, (_, i) => {
  const turlar = ["Profilaktik tashrif", "Monitoring", "Tekshiruv", "Qayta tekshiruv", "Nazorat o'lchovi"];
  const holatlari = ["Rejalashtirilgan", "Jarayonda", "Yakunlangan", "Bekor qilingan"];
  const natijalar = ["Ijobiy", "Salbiy", "Neytral", null];
  return {
    id: i + 1,
    sana: `${String(1 + i % 28).padStart(2, "0")}.${String(1 + i % 12).padStart(2, "0")}.2025`,
    korxona: NAMES[i % 10],
    stir: STIRS[i % 10],
    tur: turlar[i % 5],
    masul: ["Salimov D.", "Isroilov Sh.", "Ismaylov K.", "Akramov B.", "Abdijamilov I."][i % 5],
    holat: holatlari[i % 4],
    natija: natijalar[i % 4],
    muddat: `${String(5 + i % 23).padStart(2, "0")}.${String(1 + i % 12).padStart(2, "0")}.2025`,
  };
});

export const NazoratPage = () => {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [period, setPeriod] = useState("Barchasi");
  const pp = 15;
  const tabs = ["Barchasi", "Rejalashtirilgan", "Jarayonda", "Yakunlangan", "Bekor qilingan"];

  const filtered = NAZ_DATA.filter(n => {
    const qOk = n.korxona.toLowerCase().includes(q.toLowerCase()) || n.stir.includes(q);
    if (tab === 0) return qOk;
    return qOk && n.holat === tabs[tab];
  });

  const stats = [
    { l: "Jami tadbirlar",   v: 40,                                                            c: C.primary },
    { l: "Rejalashtirilgan", v: NAZ_DATA.filter(n=>n.holat==="Rejalashtirilgan").length,      c: C.primary },
    { l: "Jarayonda",        v: NAZ_DATA.filter(n=>n.holat==="Jarayonda").length,             c: C.warning },
    { l: "Yakunlangan",      v: NAZ_DATA.filter(n=>n.holat==="Yakunlangan").length,           c: C.success },
    { l: "Bekor qilingan",   v: NAZ_DATA.filter(n=>n.holat==="Bekor qilingan").length,        c: C.danger },
  ];

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{display:"flex",gap:12}}>
        {stats.map(s=>(
          <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 16px",flex:1}}>
            <div style={{fontSize:10.5,color:C.textMuted,fontWeight:700,letterSpacing:.5,marginBottom:4}}>{s.l.toUpperCase()}</div>
            <div style={{fontSize:28,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
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
        <PeriodBtns active={period} onChange={p=>{setPeriod(p);setPage(1);}}/>
        <span style={{fontSize:11,color:C.textMuted,whiteSpace:"nowrap"}}>01.01.2025 — 22.11.2025</span>
        <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px",gap:6,background:C.bg}}>
          <Search size={13} color={C.textMuted}/>
          <input value={q} onChange={e=>{setQ(e.target.value);setPage(1);}} placeholder="Qidiruv..." style={{border:"none",outline:"none",fontSize:12,width:140,background:"transparent",color:C.textPrimary}}/>
        </div>
        <button style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer",fontSize:12}}><Download size={13}/>Export</button>
        <button style={{padding:"5px 8px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer"}}><Settings size={14}/></button>
      </div>

      <Card style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,overflow:"auto"}}>
          <table style={{...tblWrap,height:"100%"}}>
            <thead>
              <tr>{["T/r","Sana","Korxona nomi","STIR","Tadbir turi","Mas'ul xodim","Holati","Natija","Muddat"].map((h,i,a)=><th key={h} style={i===a.length-1?THl:TH()}>{h}</th>)}</tr>
              <tr style={{background:C.filterBg}}>
                {Array(9).fill(0).map((_,i)=>(
                  <td key={i} style={{padding:"4px 6px",borderBottom:`1px solid ${C.border}`,borderRight:`1px solid ${C.borderLight}`}}>
                    {(i===1||i===2||i===3)&&<input placeholder="Mezon" style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 5px",fontSize:10.5,outline:"none",color:C.textPrimary,background:C.card}}/>}
                    {i===4&&<select style={{width:"100%",border:`1px solid ${C.border}`,borderRadius:4,padding:"2px 3px",fontSize:10.5,outline:"none",background:C.card,color:C.textPrimary}}><option>—</option>{["Profilaktik tashrif","Monitoring","Tekshiruv","Qayta tekshiruv"].map(t=><option key={t}>{t}</option>)}</select>}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page-1)*pp,page*pp).map((n,i)=>{
                const hb = n.holat==="Jarayonda"?ST.violet:n.holat==="Yakunlangan"?ST.green:n.holat==="Bekor qilingan"?ST.red:ST.blue;
                const nb = n.natija==="Ijobiy"?ST.green:n.natija==="Salbiy"?ST.red:ST.gray;
                return (
                <tr key={n.id} onMouseEnter={e=>e.currentTarget.style.background=C.rowHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={TD({color:C.textMuted})}>{(page-1)*pp+i+1}</td>
                  <td style={TD({whiteSpace:"nowrap",fontSize:11})}>{n.sana}</td>
                  <td style={TD({maxWidth:170,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"})}>{n.korxona}</td>
                  <td style={TD({color:C.primary,fontWeight:700})}>{n.stir}</td>
                  <td style={TD({whiteSpace:"nowrap",fontSize:11})}>{n.tur}</td>
                  <td style={TD({whiteSpace:"nowrap",fontSize:11})}>{n.masul}</td>
                  <td style={TD()}>
                    <span style={{
                      background: hb.bg, color: hb.txt,
                      padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,whiteSpace:"nowrap",
                    }}>{n.holat}</span>
                  </td>
                  <td style={TD()}>
                    {n.natija ? (
                      <span style={{
                        background: nb.bg, color: nb.txt,
                        padding:"2px 8px",borderRadius:20,fontSize:11,fontWeight:700,
                      }}>{n.natija}</span>
                    ) : (
                      <span style={{color:C.textLight,fontSize:11}}>—</span>
                    )}
                  </td>
                  <td style={TDl({whiteSpace:"nowrap",fontSize:11,color:C.textMuted})}>{n.muddat}</td>
                </tr>
                );
              })}
              <FillerRows
                count={pp - filtered.slice((page-1)*pp,page*pp).length}
                cols={9} />
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
