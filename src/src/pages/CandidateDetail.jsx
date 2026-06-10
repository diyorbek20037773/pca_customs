import { useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  User, Download, Search, Copy,
  Check, ChevronLeft, ArrowRight, Calendar,
  RefreshCw, FileCheck, FileX, AlertTriangle, Upload, Save, Send,
} from "lucide-react";

import { C } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";

import { Card, CHead } from "../components/Card";
import { Pager } from "../components/Pager";
import { RBar } from "../components/Badge";
import { FF, FI, FS, FA } from "../components/FormFields";

/* ====================== Step3 data ====================== */
const RISKS = [
  { id: 1, num: "1-mezon", name: "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi", ind: "18 ta",   byud: "18 ta", koef: 10,  risk: 100 },
  { id: 2, num: "1-mezon", name: "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi", ind: "25 ta",   byud: "25 ta", koef: 9.5, risk: 95 },
  { id: 3, num: "1-mezon", name: "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi", ind: "24 ta",   byud: "24 ta", koef: 5.6, risk: 56 },
  { id: 4, num: "1-mezon", name: "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi", ind: "20 ta",   byud: "20 ta", koef: 4.3, risk: 43 },
  { id: 5, num: "1-mezon", name: "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi", ind: "1-toifa", byud: "53 ta", koef: 3.5, risk: 35 },
];

const TASKS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  byud: "26004/10.06.2024/0015840",
  tovar: "6,7,11",
  regime: "ИМ-40",
  task: "Mazkur tovarning bojxona qiymati bo'yicha eng yuqori xavf aniqlanib eksport BYuD taqdim etilmagan tovarlarning ...",
  risk: ["yuqori", "past", "o'rta"][i % 3],
  studied: i < 4,
}));

const XBT = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  profil: ["3-mezon", "4-mezon", "8-mezon", "31-mezon", "33-mezon"][Math.min(i, 4)],
  text:
    i < 1 ? "TIF ishtirokchisiga nisbatan yuritilgan huquqbuzarliklar darajasi" :
    i < 2 ? "TIF RN kodi o'zgargan holatlar" :
    i < 3 ? "Avvalgi yillarga nisbatan importhajmi oshgan lekin, bojxona to'lovlari kamaygam holatlar" :
    i < 4 ? "Vakolatli iqtisodiy operator" :
    "TIF RN kodi o'zgargan holatlar",
  tanlangan:     i < 4 ? [18, 25, 24, 20][i] : 15,
  tasdiqlangan:  i < 4 ? [18, 25, 24, 20][i] : 10,
  risk:          [100, 95, 56, 43][Math.min(i, 3)],
}));

/* ====================== Step4 data ====================== */
const PREVS = [
  {
    title: "Kameral bojxona auditini o'tkazish to'g'risida bojxona organi QARORI\n0000003-son  18.12.2025",
    body: "Davlat bojxona qo'itasi\n\n17.12.2022 dan 17.12.2025 gacha\n\nBojxona organlari axborot dasturlarining ma'lumotlari tahlili natijasida kameral bojxona auditini o'tkazish bo'yicha aniqlangan xavf darajalari\n\nPEPSICO HOLDINGS TOSHKENT MCHJ OYBEK KO'CHASI 24-UY\n\nJO'RAYEV ULUG'BEK SAYFIDDIN O'G'LI\n\nQAROR QILAMAN:\nINSPEKTOR, JURAYEV G'AFURJAN G'ULOM O'G'LI\nBOSH INSPEKTOR, SULTONOV SAIDJON XOSHIMOVCH\n\nKameral bojxona auditini o'tkazish muddati 18.12.2025 sanadan boshlab 28.12.2025 sanagacha etib belgilansin.",
  },
  {
    title: "Kameral bojxona auditini o'tkazish to'g'risida bojxona organi DASTURI\n000001 - son",
    body: "18.12.2025\n\n1. Vakolatli shaxs: \"SHAMS-WAY\" MCHJ (STIR: 307645101).\n\n2. Bojxona auditi maqsadi: Tovarlarni chiqarishga ruxsat berilgandan so'ng bojxona to'g'risidagi qonunchilik hujjatlariga rioya etilganligini vakolatli shaxslar tomonidan bojxona rasmiylashtiruvi jarayonida taqdim etilgan hujjatlarni moliya-xo'jalik faoliyatiga bog'liq hujjatlarda aks ettirilgan ma'lumotlar bilan solishtirgan holda o'rganish va tekshirishga asoslangan bojxona nazoratini amalga oshirish.\n\n3. Bojxona auditi predmeti: Bojxona kodeksining 201-moddasi...",
  },
  {
    title: "Kameral bojxona auditini o'tkazish to'g'risida XABARNOMA\n000001-son",
    body: "18.12.2025\n\nDavlat bojxona qo'mitasi\n\n'PEPSICO HOLDINGS TOSHKENT' MCHJ vakolatli shaxs sifatida tavsiflanadi.\n\nBojxona auditi 03.05.2022 yildan 01.04.2025 yilga qadar o'tkaziladi.\n\nKatta inspektor G'.G'.Jurayev",
  },
  {
    title: "BILDIRGI",
    body: "\"Bojxona auditi\" AAT dasturida bojxona auditidan o'tkazish uchun avtomatik ravishda tanlangan \"ABSTERGENT\" MCHJ (STIR 30848795) joriy yilning 19 noyabr kunidan bojxona auditidan o'tkazish belgilangan edi.\n\nMazkur jamiyat faoliyatini belgilanishi tekshirilishi belgilangan muddatda (05.11.2022 yildan 05.11.2025 yilgacha bo'lgan davr) u tomonidan jami 424 partiyadagi (1575 ta tovar pozitsiyasida) qiymati 12,19 mln AQSH dollariga teng bo'lgan tovarlar import qilingan.",
  },
  {
    title: "Kameral bojxona auditi natijalari to'g'risida DALOLATNOMA\n000001-son  18.12.2025",
    body: "I. Kirish qismi\n\n1) Qoraqalpoqiston respublika bojxona boshqarmasi\n2) Katta inspektor Jilvonov Amin Qaxramon o'g'li\n3) ACWA POWER BERUNIY WIND MChK, Toshkent shahri\n4) p/c 20208000107010660001, INN: 200542776\n\nII. Asosiy qismi\n\nVakolatli shaxsning 02.12.2022 dan 18.11.2025 yil oraligida rasmiylashtirilgan BYuDlar...\n\nIII. Dalolatnomaning yakuniy qismi\n\nKameral bojxona auditi ACWA POWER BERUNIY WIND MChkning import operatsiyalari bo'yicha amalga oshirildi.",
  },
  {
    title: "Bojxona to'lovlarini to'lash bo'yicha qarzdorlikni undirish to'g'risidagi TALABNOMA\n000001-son",
    body: "18.12.2025\n\nO'zbekiston Respublikasi Bojxona kodeksining 348-moddasiga muvofiq:\n\nJami: 143 261 856 so'm\n\nbir yuz qirq uch million ikki yuz oltmish bir ming besh yuz oltmish olti so'm\n\nBojxona to'lovlari bo'yicha qarzdorlik to'lash muddati talabnoma to'lovchiga topshirilgan kundan boshlab o'n ish kunini tashkil etadi.",
  },
];

/* ====================== Step 1 ====================== */
const Step1 = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
    <Card><CHead>KORXONA RAHBARI</CHead><div style={{padding:14,display:"flex",gap:12}}><div style={{width:72,height:82,borderRadius:6,background:"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><User size={30} color={C.textLight}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:12}}>{[["JSHSHIRR","3125894785623244"],["Sudlanganligi","Sudlanmagan"],["Pasport","AA 9983560"],["Modda","—"],["F.I.O","Axmedjanov Ravshanbek Faxriddin o'g'li"],["Sud organi","—"]].map(([k,v])=>(<div key={k}><div style={{color:C.textMuted,fontSize:10.5}}>{k}</div><div style={{fontWeight:600}}>{v}</div></div>))}</div></div></Card>
    <Card><CHead>XODIMLAR MA'LUMOTI</CHead><div style={{padding:"8px 14px 4px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:12}}>Jami: <b>170 nafar</b></span><button style={{border:`1px solid ${C.border}`,borderRadius:5,background:C.card,padding:"3px 8px",cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",gap:4}}><Download size={11}/>Export</button></div><table style={tblWrap}><thead><tr>{["№","Lavozimi","F.I.O","JSHSHIR"].map((h,i,a)=><th key={h} style={i===a.length-1?{...THl,fontSize:11}:{...TH(),fontSize:11}}>{h}</th>)}</tr></thead><tbody>{[["1","Rahbar","Axmedjanov Ravshanbek","3125894785623244"],["2","Bosh hisobchi","Axmedjanov Ravshanbek","3125894785623244"],["3","Xodim","Axmedjanov Ravshanbek","3125894785623244"],["4","Xodim","Axmedjanov Ravshanbek","3125894785623244"]].map(r=>(<tr key={r[0]}>{r.map((v,i,a)=><td key={i} style={i===a.length-1?TDl({fontSize:11}):TD({fontSize:11})}>{v}{i===3&&<Copy size={10} color={C.textMuted} style={{marginLeft:4,cursor:"pointer"}}/>}</td>)}</tr>))}</tbody></table></Card>
    <Card><CHead>BOSHQA KORXONALARGA ALOQADORLIGI</CHead>
      <div style={{padding:"5px 10px",borderBottom:`1px solid ${C.borderLight}`,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:11,whiteSpace:"nowrap"}}>Jami: <b>15 ta</b></span>
        <div style={{display:"flex",alignItems:"center",flex:1,border:`1px solid ${C.border}`,borderRadius:5,padding:"3px 7px",gap:4,background:C.bg}}><Search size={11} color={C.textMuted}/><input placeholder="Qidiruv" style={{border:"none",outline:"none",fontSize:11,background:"transparent",width:"100%"}}/></div>
        <button style={{border:`1px solid ${C.border}`,borderRadius:4,background:C.card,padding:"3px 6px",cursor:"pointer",display:"flex",alignItems:"center"}}><Download size={11}/></button>
        <button style={{border:`1px solid ${C.border}`,borderRadius:4,background:C.card,padding:"3px 6px",cursor:"pointer",fontSize:11}}>↗</button>
      </div>
      <div style={{padding:"6px 10px"}}>
        {[{n:'"YUKSALISH AVTO" MASULIYATI CHEKLANGAN JAMIYATI',s:"308 123 489"},{n:'"YUKSALISH AVTO" MASULIYATI CHEKLANGAN JAMIYATI',s:"308 123 489"},{n:'"YUKSALISH AVTO" MASULIYATI CHEKLANGAN JAMIYATI',s:"308 123 489"},{n:'"YUKSALISH AVTO" MASULIYATI CHEKLANGAN JAMIYATI',s:"308 123 489"}].map((c,i)=>(<div key={i} style={{padding:"5px 0",borderBottom:`1px solid ${C.borderLight}`,display:"flex",gap:6}}><span style={{color:C.textMuted,fontSize:11,flexShrink:0,minWidth:14}}>{i+1}</span><div><div style={{fontSize:11,fontWeight:500}}>{c.n}</div><div style={{fontSize:10.5,color:C.primary}}>{c.s}</div></div></div>))}
      </div>
    </Card>
    <Card><CHead>UMUMIY MA'LUMOTLAR</CHead><div style={{padding:14}}><div style={{fontWeight:700,fontSize:12,marginBottom:10}}>KORXONA NOMI MA'SULIYATI CHEKLANGAN JAMIYATI QO'SHMA KORXONASI</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:12}}>{[["STIR","308 123 489"],["Tashkiliy-huquqiy shakl","MA'SULIYATI CHEKLANGAN"],["Ro'yxatga olish sanasi","2017-06-08"],["Asosiy faoliyat turi","YOQILG'I, METALLAR..."],["Ustav fondi (so'm)","227 974 418 715.07"],["VIO toifasi","I & II toifa"],["Faoliyat davri","7 yil 1 oy 20 kun"],["Holati","Faol"]].map(([k,v])=>(<div key={k}><div style={{color:C.textMuted,fontSize:10.5}}>{k}</div><div style={{fontWeight:600}}>{v}</div></div>))}</div><div style={{marginTop:10,paddingTop:8,borderTop:`1px solid ${C.borderLight}`,fontSize:12}}><div style={{color:C.textMuted,fontSize:10.5}}>Yuridik manzili</div><div style={{fontWeight:600}}>📍 Toshkent shahri, Yunusobod tumani, Gulchi ko'chasi 15 uy</div></div></div></Card>
    <Card><CHead>TIF ISHTIROKCHILARI MA'LUMOTI</CHead>
      <div style={{padding:"8px 12px"}}>
        {[{num:1,l:"Brokerlik firma",v:'354 785 687 - OOO "Super Broker"',p:4},{num:2,l:"Deklaratsiyalovchi shaxs",v:"Botirov Doston Alibekovich",p:4}].map(t=>(
          <div key={t.l} style={{background:C.bg,borderRadius:8,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${C.borderLight}`,marginBottom:8}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:C.primary,color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{t.num}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:12,marginBottom:1}}>{t.l}</div>
              <div style={{fontSize:11,color:C.textMuted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{t.v}</div>
            </div>
            <div style={{position:"relative",width:46,height:46,flexShrink:0}}>
              <svg viewBox="0 0 46 46" width="46" height="46">
                <circle cx="23" cy="23" r="19" fill="none" stroke="#E2E8F0" strokeWidth="3.5"/>
                <circle cx="23" cy="23" r="19" fill="none" stroke={C.primary} strokeWidth="3.5" strokeDasharray={`${2*Math.PI*19*t.p/100} ${2*Math.PI*19}`} transform="rotate(-90 23 23)"/>
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:C.primary}}>{t.p}%</div>
            </div>
            <div style={{fontSize:10,color:C.textMuted}}>ulushi</div>
          </div>
        ))}
      </div>
    </Card>
    <Card><CHead>TASISCHILAR</CHead><div style={{padding:14}}><div style={{fontSize:12,marginBottom:10}}>Ustav fondi: <b>1 000 000,0 mln so'm</b></div><div style={{display:"flex",gap:12}}>{[{n:"Axmedjanov Ravshanbek Faxriddin o'g'li",p:40},{n:"Axmedjanov Ravshanbek Faxriddin o'g'li",p:40}].map((f,i)=>(<div key={i} style={{flex:1,background:C.bg,borderRadius:8,padding:10,border:`1px solid ${C.borderLight}`}}><div style={{fontSize:11,fontWeight:600,marginBottom:8}}>{f.n}</div><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{flex:1,height:5,background:C.border,borderRadius:3,overflow:"hidden"}}><div style={{width:`${f.p}%`,height:"100%",background:C.primary}}/></div><span style={{fontSize:12,fontWeight:700,color:C.primary}}>{f.p}%</span></div></div>))}</div></div></Card>
  </div>
);

/* ====================== Step 2 ====================== */
const Step2 = () => {
  const [sub, setSub] = useState(0);
  const barData = [40,52,35,62,80,47,40].map(v => ({ n: String(1724), v }));
  const donut = [{ value: 8, color: C.primary }, { value: 2, color: C.danger }];
  const expCnt = [{f:"🇹🇷",n:"Turkiya"},{f:"🇹🇯",n:"Tojikiston"},{f:"🇦🇫",n:"Afg'oniston"},{f:"🇰🇿",n:"Qozog'iston"}];
  const impCnt = [{f:"🇨🇳",n:"Xitoy"},{f:"🇷🇺",n:"Rossiya"},{f:"🇰🇿",n:"Qozog'iston"},{f:"🇮🇷",n:"Eron"}];
  const expGoods = ["Oziq-ovqat mahsulotlari","To'quv-trikotaj materiallari","Mo'yna, teri va qolqob mahsulotlari","Kimyoviy moddalar"];
  const impGoods = ["Qadoqlash mahsulotlari","Yuqori kuchlanishli mahsulotlar","Asbob-uskuna, texnik mahsulotlar","Oziq-ovqat xom ashyosi"];

  const TradeTable = ({ label, rows, isCountry }) => (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4,padding:"0 2px"}}>
        <span style={{color:C.primary,fontWeight:700,fontSize:12}}>{label}</span>
        <div style={{display:"flex",gap:3}}>
          <button style={{border:`1px solid ${C.border}`,borderRadius:4,background:C.card,padding:"2px 5px",cursor:"pointer",display:"flex",alignItems:"center"}}><Download size={10}/></button>
          <button style={{border:`1px solid ${C.border}`,borderRadius:4,background:C.card,padding:"2px 6px",cursor:"pointer",fontSize:11}}>↗</button>
        </div>
      </div>
      <table style={{...tblWrap,fontSize:11}}>
        <thead><tr>
          <th style={{...TH({padding:"4px 6px"})}}>№</th>
          <th style={{...TH({padding:"4px 6px"})}}>{isCountry?"Davlat nomi":"Tovar nomi"}</th>
          <th style={{...TH({padding:"4px 6px",textAlign:"right"})}}><span style={{fontSize:10}}>Stat. qiymati</span></th>
          <th style={{...THl,padding:"4px 6px"}}>Ulushi</th>
        </tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i} onMouseEnter={e=>e.currentTarget.style.background=C.rowHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <td style={TD({padding:"4px 6px",color:C.textMuted})}>{i+1}</td>
            <td style={TD({padding:"4px 6px"})}>{isCountry?<span>{r.f} {r.n}</span>:<span style={{maxWidth:120,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r}</span>}</td>
            <td style={TD({padding:"4px 6px",textAlign:"right",fontWeight:600})}>999 999 999</td>
            <td style={TDl({padding:"4px 6px"})}>
              <div style={{display:"flex",alignItems:"center",gap:4}}>
                <span style={{color:C.textMuted,minWidth:28,fontSize:10.5}}>50%</span>
                <div style={{width:36,height:4,background:C.borderLight,borderRadius:2}}><div style={{width:"50%",height:"100%",background:C.primary,borderRadius:2}}/></div>
              </div>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:4}}>{["Statistik ma'lumotlar","Bank va to'lov ma'lumotlari"].map((t,i)=>(<button key={t} onClick={()=>setSub(i)} style={{padding:"6px 16px",border:`1px solid ${sub===i?C.primary:C.border}`,borderRadius:6,background:sub===i?C.primary:"white",color:sub===i?"white":C.textMuted,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:4}}>{sub===i&&<Check size={11}/>}{t}</button>))}</div>
      {sub===0?(<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          <Card><CHead>XAVFLARNI BOSHQARISH TIZIMLARI</CHead><div style={{padding:12}}><table style={tblWrap}><thead><tr>{["Xavf yo'nalishi","Xavf darajasi","Ko'satgich"].map((h,i,a)=><th key={h} style={i===a.length-1?{...THl,fontSize:11}:{...TH(),fontSize:11}}>{h}</th>)}</tr></thead><tbody>{[["Bojxona organi","O'rta",C.warning],["Soliq organi","Past",C.success],["Audit natijasi","Salbiy",C.danger]].map(([n,v,c])=>(<tr key={n}><td style={TD({fontSize:11})}>{n}</td><td style={TD({fontSize:11})}><span style={{background:c+"22",color:c,padding:"2px 8px",borderRadius:10,fontSize:11,fontWeight:700}}>{v}</span></td><td style={TDl()}><div style={{height:7,background:c,borderRadius:3}}/></td></tr>))}</tbody></table></div></Card>
          <Card><CHead>BOJXONA POSTLARIDA RASMIYLASHTIRUV</CHead><div style={{fontSize:11,textAlign:"center",color:C.textMuted,paddingTop:4}}>BYuD soni bo'yicha</div><div style={{padding:"0 8px 8px"}}><ResponsiveContainer width="100%" height={130}><BarChart data={barData} margin={{top:6,right:4,bottom:0,left:-20}}><CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} vertical={false}/><XAxis dataKey="n" tick={{fontSize:10}} tickLine={false}/><YAxis tick={{fontSize:10}} tickLine={false}/><Tooltip contentStyle={{fontSize:11}} formatter={v=>[`${v} ta`]}/><Bar dataKey="v" radius={[4,4,0,0]}>{barData.map((_,i)=><Cell key={i} fill={i===4?C.primary:"#BFDBFE"}/>)}</Bar></BarChart></ResponsiveContainer></div></Card>
          <Card><CHead>BQB HOLATLARI</CHead>
            <div style={{padding:"10px 12px",display:"flex",alignItems:"center",gap:10}}>
              <div style={{position:"relative",width:88,height:88,flexShrink:0}}>
                <ResponsiveContainer width="100%" height={88}><PieChart><Pie data={donut} cx="50%" cy="50%" innerRadius={28} outerRadius={40} dataKey="value">{donut.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart></ResponsiveContainer>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800}}>10 ta</div>
              </div>
              <div style={{flex:1}}>
                {[{c:C.primary,l:"Ma'muriy",v:"8 ta",p:"90%"},{c:C.danger,l:"Jinoiy",v:"2 ta",p:"10%"}].map(item=>(
                  <div key={item.l} style={{marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:C.textMuted}}><div style={{width:7,height:7,background:item.c,borderRadius:"50%"}}/>{item.l}</div>
                    <div style={{fontSize:18,fontWeight:800,color:item.c,lineHeight:1.1,marginLeft:11}}>{item.v}</div>
                    <div style={{fontSize:9.5,color:C.textMuted,marginLeft:11}}>{item.p} jamiga nisbatan</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card><CHead>HAMKOR DAVLATLAR</CHead>
            <div style={{padding:"8px 10px"}}>
              <TradeTable label="Eksport" rows={expCnt} isCountry={true}/>
              <TradeTable label="Import"  rows={impCnt} isCountry={true}/>
            </div>
          </Card>
          <Card><CHead>ASOSIY TOVARLAR</CHead>
            <div style={{padding:"8px 10px"}}>
              <TradeTable label="Eksport" rows={expGoods} isCountry={false}/>
              <TradeTable label="Import"  rows={impGoods} isCountry={false}/>
            </div>
          </Card>
        </div>
      </>):(<>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card><CHead>BANK MA'LUMOTLARI VA QARZDORLIK (MLN.SO'M)</CHead><div style={{padding:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,fontSize:12}}>{[["Bank hisob raqami","20208000805086863001"],["Bank STIRi va nomi","200242936 — SANOATKURILISHBANKI"],["Bojxonadan qarzdorlik","222 222 222"],["Soliqdan qarzdorlik","222 222 222"],["Jarimalar miqdori","Mavjud emas"],["Musodara qiymati","Mavjud emas"]].map(([k,v])=>(<div key={k}><div style={{color:C.textMuted,fontSize:10.5}}>{k}</div><div style={{fontWeight:600}}>{v}</div></div>))}</div></Card>
          <Card><CHead>BOJXONA TO'LOVLARI TO'GRISIDA (MLN.SO'M)</CHead><div style={{padding:14}}><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,fontSize:11,paddingBottom:10,borderBottom:`1px solid ${C.borderLight}`}}>{[["Jami to'lovlar","222 222 222"],["Bojxona boji","222"],["Aksiz solig'i","0"],["QQS","222"],["Boshqalar","10"]].map(([k,v])=>(<div key={k} style={{textAlign:"center"}}><div style={{color:C.textMuted}}>{k}</div><div style={{fontWeight:700}}>{v}</div></div>))}</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,fontSize:11,padding:"10px 0",borderBottom:`1px solid ${C.borderLight}`}}>{[["Jami imtiyozlar","222 222 222"],["Bojxona boji","222"],["Aksiz solig'i","0"],["QQS","222"],["Boshqalar","10"]].map(([k,v])=>(<div key={k} style={{textAlign:"center"}}><div style={{color:C.textMuted}}>{k}</div><div style={{fontWeight:700}}>{v}</div></div>))}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,paddingTop:10,fontSize:12}}>{[["Nazoratdagi bo'lib to'lash","444 444 444"],["Nazoratdagi kechiktirib to'lash","444 444 444"],["Depozit balansi","777 777 777"]].map(([k,v])=>(<div key={k}><div style={{color:C.textMuted,fontSize:10.5}}>{k}</div><div style={{fontWeight:700}}>{v}</div></div>))}</div></div></Card>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <Card>
            <CHead>RASMIYLASHTIRILGAN BOJXONA YUK DEKLARATSIYALARI</CHead>
            {(() => {
              const byudSegs = [
                {c:C.primary,l:"Oddiy",soni:783,vazni:500,qiymati:600},
                {c:C.success,l:"Yashil yo'lak",soni:391,vazni:325,qiymati:260},
                {c:C.warning,l:"Sariq yo'lak",soni:392,vazni:125,qiymati:120},
              ];
              const byudGroups = [
                { t:"JAMI",    total:1566, segs: byudSegs },
                { t:"EKSPORT", total:783,  segs:[
                  {c:C.primary,l:"Oddiy",soni:400,vazni:250,qiymati:320},
                  {c:C.success,l:"Yashil yo'lak",soni:200,vazni:160,qiymati:140},
                  {c:C.warning,l:"Sariq yo'lak",soni:183,vazni:60,qiymati:60},
                ]},
                { t:"IMPORT",  total:783, segs:[
                  {c:C.primary,l:"Oddiy",soni:383,vazni:250,qiymati:280},
                  {c:C.success,l:"Yashil yo'lak",soni:191,vazni:165,qiymati:120},
                  {c:C.warning,l:"Sariq yo'lak",soni:209,vazni:65,qiymati:60},
                ]},
              ];
              return (
                <div style={{padding:"10px 10px",display:"flex",gap:8}}>
                  {byudGroups.map(g=>(
                    <div key={g.t} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",minWidth:0}}>
                      <div style={{fontSize:11.5,fontWeight:700,color:C.textMuted,marginBottom:8,letterSpacing:.5}}>{g.t}</div>
                      <div style={{position:"relative",width:110,height:110}}>
                        <svg width="110" height="110" viewBox="0 0 110 110">
                          <circle cx="55" cy="55" r="42" fill="none" stroke="#F1F5F9" strokeWidth="16"/>
                          <circle cx="55" cy="55" r="42" fill="none" stroke={C.primary} strokeWidth="16"
                            strokeDasharray={`${2*Math.PI*42*0.50} ${2*Math.PI*42}`}
                            strokeDashoffset={`${2*Math.PI*42*0.25}`}/>
                          <circle cx="55" cy="55" r="42" fill="none" stroke={C.success} strokeWidth="16"
                            strokeDasharray={`${2*Math.PI*42*0.25} ${2*Math.PI*42}`}
                            strokeDashoffset={`${-2*Math.PI*42*0.25}`}/>
                          <circle cx="55" cy="55" r="42" fill="none" stroke={C.warning} strokeWidth="16"
                            strokeDasharray={`${2*Math.PI*42*0.25} ${2*Math.PI*42}`}
                            strokeDashoffset={`${-2*Math.PI*42*0.50}`}/>
                        </svg>
                        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <span style={{fontSize:18,fontWeight:900,color:C.textPrimary}}>{g.total}</span>
                        </div>
                      </div>
                      <table style={{...tblWrap,marginTop:10,fontSize:10.5,width:"100%"}}>
                        <thead><tr>
                          <th style={{...TH({padding:"3px 4px"}),width:8}}></th>
                          <th style={TH({padding:"3px 4px",textAlign:"right"})}>Soni<br/><span style={{fontWeight:400,color:C.textMuted}}>(dona)</span></th>
                          <th style={TH({padding:"3px 4px",textAlign:"right"})}>Vazni<br/><span style={{fontWeight:400,color:C.textMuted}}>(tn)</span></th>
                          <th style={{...THl,padding:"3px 4px",textAlign:"right"}}>Qiymati<br/><span style={{fontWeight:400,color:C.textMuted}}>(ming)</span></th>
                        </tr></thead>
                        <tbody>
                          {g.segs.map((s,i)=>(
                            <tr key={i} style={{background:i%2===0?"white":C.bg}}>
                              <td style={{...TD({padding:"3px 4px"}),textAlign:"center"}}><div style={{width:8,height:8,borderRadius:"50%",background:s.c,display:"inline-block"}}/></td>
                              <td style={TD({padding:"3px 4px",textAlign:"right",color:s.c,fontWeight:600})}>{s.soni}</td>
                              <td style={TD({padding:"3px 4px",textAlign:"right"})}>{s.vazni}</td>
                              <td style={{...TDl,padding:"3px 4px",textAlign:"right"}}>{s.qiymati}</td>
                            </tr>
                          ))}
                          <tr style={{background:C.headerBg,borderTop:`2px solid ${C.border}`}}>
                            <td style={{...TD({padding:"3px 4px"}),fontWeight:700,textAlign:"center",fontSize:9}}>Jami</td>
                            <td style={TD({padding:"3px 4px",textAlign:"right",fontWeight:700})}>{g.segs.reduce((a,s)=>a+s.soni,0)}</td>
                            <td style={TD({padding:"3px 4px",textAlign:"right",fontWeight:700})}>{g.segs.reduce((a,s)=>a+s.vazni,0)}</td>
                            <td style={{...TDl,padding:"3px 4px",textAlign:"right",fontWeight:700}}>{g.segs.reduce((a,s)=>a+s.qiymati,0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Card>
          <Card><CHead>XATOLIK MAVJUD DEKLARATSIYALAR</CHead><div style={{padding:14}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>{[{l:"Qayta ro'yxatga olingan",v:"850",i:<RefreshCw size={18} color={C.primary}/>},{l:"Qayta rasmiylashtirilgan",v:"850",i:<FileCheck size={18} color={C.success}/>},{l:"Bekor qilingan",v:"850",i:<FileX size={18} color={C.danger}/>}].map(c=>(<div key={c.l} style={{textAlign:"center",background:C.bg,borderRadius:8,padding:"10px 6px",border:`1px solid ${C.borderLight}`}}><div style={{marginBottom:4}}>{c.i}</div><div style={{fontSize:20,fontWeight:800}}>{c.v}</div><div style={{fontSize:10.5,color:C.textMuted}}>{c.l}</div><div style={{fontSize:11,color:C.primary,marginTop:2}}>55%</div></div>))}</div><CHead>QO'SHIMCHA HISOBLANGAN BOJXONA TO'LOVLARI</CHead><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>{[{l:"Rasmiylashtiruv jarayonida",v:"850"},{l:"Tovar chiqarib yuborilgandan keyin",v:"850"}].map(c=>(<div key={c.l} style={{textAlign:"center",background:C.bg,borderRadius:8,padding:"10px 6px",border:`1px solid ${C.borderLight}`}}><div style={{fontSize:20,fontWeight:800}}>{c.v}</div><div style={{fontSize:11,color:C.textMuted}}>{c.l}</div><div style={{fontSize:11,color:C.primary}}>55%</div></div>))}</div></div></Card>
        </div>
      </>)}
    </div>
  );
};

/* ====================== Step 3 ====================== */
const Step3 = () => {
  const [sub, setSub] = useState(0);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{display:"flex",gap:4}}>{["Asosiy ko'rsatgichlar","Xavflar va topshiriqlar","XBT samaradorligi"].map((t,i)=>(<button key={t} onClick={()=>setSub(i)} style={{padding:"6px 14px",border:`1px solid ${sub===i?C.primary:C.border}`,borderRadius:6,background:sub===i?C.primary:"white",color:sub===i?"white":C.textMuted,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:4}}>{sub===i&&<Check size={11}/>}{t}</button>))}</div>
      {sub===0&&(<Card><div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:700,flex:1,textAlign:"center"}}>BOJXONA AUDITIGA TANLAB OLISHGA SABAB BO'LGAN ASOSIY KO'RSATKICHLAR</span><button style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,cursor:"pointer",fontSize:12}}><Download size={12}/>Yuklash</button></div><div style={{overflowX:"auto"}}><table style={tblWrap}><thead><tr>{["T/r","Mezon raqami","Mezon nomi","Ko'rsatkich","Tanlangan BYuDlar","Koeffitsient","Xavf darajasi"].map((h,i,a)=><th key={h} style={i===a.length-1?THl:TH()}>{h}</th>)}</tr></thead><tbody>{RISKS.map(r=>(<tr key={r.id}><td style={TD({color:C.textMuted})}>{r.id}</td><td style={TD({fontWeight:600})}>{r.num}</td><td style={TD({maxWidth:300})}>{r.name}</td><td style={TD()}>{r.ind}</td><td style={TD()}>{r.byud}</td><td style={TD({fontWeight:700})}>{r.koef}</td><td style={TDl({minWidth:130})}><RBar v={r.risk}/></td></tr>))}<tr style={{background:C.headerBg,borderTop:`2px solid ${C.border}`}}><td colSpan={5} style={{...TD({textAlign:"center"}),fontWeight:700}}>JAMI</td><td style={TD({fontWeight:700})}>25,6</td><td style={TDl()}><span style={{background:"#FEF3C7",color:"#92400E",padding:"3px 12px",borderRadius:20,fontSize:12,fontWeight:700}}>O'rta xavf</span></td></tr></tbody></table></div><div style={{padding:"10px 16px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"center"}}><Pager total={5} page={1} pp={5} onChange={()=>{}}/></div></Card>)}
      {sub===1&&(<Card><div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:700,textAlign:"center"}}>BYUDLAR BO'YICHA BIRLAMCHI ANIQLANGAN XAVFLAR VA TOPSHIRIQLAR</div><div style={{padding:"8px 14px",display:"flex",gap:8,alignItems:"center",borderBottom:`1px solid ${C.border}`}}><div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",gap:4,fontSize:12}}><Calendar size={12} color={C.textMuted}/>01.01.2025</div><span>—</span><div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",gap:4,fontSize:12}}><Calendar size={12} color={C.textMuted}/>15.12.2025</div><div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"4px 8px",gap:6,flex:1,background:C.bg}}><Search size={12} color={C.textMuted}/><input placeholder="Qidiruv" style={{border:"none",outline:"none",fontSize:12,background:"transparent",width:"100%"}}/></div><button style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,cursor:"pointer",fontSize:12}}><Download size={12}/>Yuklash</button></div><div style={{overflowX:"auto"}}><table style={tblWrap}><thead><tr>{["T/r","BYuD ro'yxat raqami","Tovar №","Bojxona rejimi","Topshiriq mazmuni","Xavf","O'rganildi"].map((h,i,a)=><th key={h} style={i===a.length-1?THl:TH()}>{h}</th>)}</tr></thead><tbody>{TASKS.map(r=>(<tr key={r.id}><td style={TD({color:C.textMuted})}>{r.id}</td><td style={TD({whiteSpace:"nowrap",fontSize:11})}>{r.byud}</td><td style={TD()}>{r.tovar}</td><td style={TD({fontWeight:600})}>{r.regime}</td><td style={TD({maxWidth:240,fontSize:11})}>{r.task}</td><td style={TD()}><span style={{background:r.risk==="yuqori"?"#FEE2E2":r.risk==="o'rta"?"#FEF3C7":"#D1FAE5",color:r.risk==="yuqori"?"#991B1B":r.risk==="o'rta"?"#92400E":"#065F46",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700}}>{r.risk}</span></td><td style={TDl()}><div style={{width:17,height:17,border:`2px solid ${r.studied?C.primary:C.border}`,borderRadius:3,background:r.studied?C.primary:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>{r.studied&&<Check size={10} color="white"/>}</div></td></tr>))}</tbody></table></div><div style={{padding:"10px 16px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"center"}}><Pager total={20} page={1} pp={12} onChange={()=>{}}/></div></Card>)}
      {sub===2&&(<Card><div style={{padding:"10px 16px",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:700,textAlign:"center"}}>RASMIYLASHTIRUV VAQTIDA ANIQLANGAN XAVFLAR NATIJADORLIGI</div><div style={{overflowX:"auto"}}><table style={tblWrap}><thead><tr>{["T/r","Profil raqami","Profil mazmuni","Tanlangan BYuDlar","Tasdiqlangan BYuDlar","Xavf darajasi"].map((h,i,a)=><th key={h} style={i===a.length-1?THl:TH()}>{h}</th>)}</tr></thead><tbody>{XBT.map(r=>(<tr key={r.id}><td style={TD({color:C.textMuted})}>{r.id}</td><td style={TD({fontWeight:600})}>{r.profil}</td><td style={TD({maxWidth:280,fontSize:11})}>{r.text}</td><td style={TD({textAlign:"center"})}>{r.tanlangan}</td><td style={TD({textAlign:"center"})}>{r.tasdiqlangan}</td><td style={TDl({minWidth:130})}><RBar v={r.risk}/></td></tr>))}</tbody></table></div><div style={{padding:"10px 16px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"center"}}><Pager total={20} page={1} pp={12} onChange={()=>{}}/></div></Card>)}
    </div>
  );
};

/* ====================== Step 4 ====================== */
const Step4 = () => {
  const [sub, setSub] = useState(0);
  const TABS = ["Qaror","Tekshiruv dasturi","Xabarnoma","Uzaytirish/To'xtatish","Dalolatnoma","Talabnoma"];
  const p = PREVS[sub];
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:14,flexWrap:"wrap"}}>{TABS.map((t,i)=>(<button key={t} onClick={()=>setSub(i)} style={{padding:"6px 14px",border:`1px solid ${sub===i?C.primary:C.border}`,borderRadius:6,background:sub===i?C.primary:"white",color:sub===i?"white":C.textMuted,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",gap:4}}>{sub===i&&<Check size={11}/>}{t}</button>))}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,minHeight:420}}>
        <div style={{overflowY:"auto",paddingRight:4}}>
          {sub===0&&<><FF label="Audit shakli"><FS/></FF><FF label="Bojxona organi nomi"><FS opts={["Davlat bojxona qo'mitasi"]}/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Qamrab olish muddati (dan)"><FI value="17.12.2022"/></FF><FF label="(gacha)"><FI value="17.12.2025"/></FF></div><FF label="Kameral bojxona auditini o'tkazish uchun asos bo'lgan holatlar"><FA rows={3} val="Bojxona organlari axborot dasturlarining ma'lumotlari tahlili natijasida kameral bojxona auditini o'tkazish bo'yicha aniqlangan xavf darajalari"/></FF><FF label="Jalb qilingan shaxslarning F.I.Sh. va lavozimi"><FI value="Jo'rayev Ulug'bek Sayfiddin O'g'li"/></FF><FF label="Qo'shimcha jalb ilingan bojxona xodimlarining F.I.Sh."><FI value="Sultonov Saidjon Xoshimovcih"/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Audit o'tkazish muddati (dan)"><FI value="17.12.2022"/></FF><FF label="(gacha)"><FI value="17.12.2025"/></FF></div><FF label="Bojxona auditining vazifalari"><FS opts={["Tovarlarni tekshirish","Hujjatlarni tekshirish"]}/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Ijrochi"><FI value="Jo'rayev Ulug'bek Sayfiddin O'g'li"/></FF><FF label="Telefon raqami"><FI value="+998 55 502-76-00 (72-36)"/></FF></div></>}
          {sub===1&&<><FF label="Audit shakli"><FS/></FF><FF label="Bojxona auditi maqsadi"><FA rows={5} val="Tovarlarni chiqarishga ruxsat berilgandan so'ng bojxona to'g'risidagi qonunchilik hujjatlariga rioya etilganligini vakolatli shaxslar tomonidan bojxona rasmiylashtiruvi jarayonida taqdim etilgan hujjatlarni moliya-xo'jalik faoliyatiga bog'liq hujjatlarda aks ettirilgan ma'lumotlar bilan solishtirgan holda o'rganish."/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Qamrab olish muddati (dan)"><FI value="17.12.2022"/></FF><FF label="(gacha)"><FI value="17.12.2025"/></FF></div><FF label="Asos bo'lgan holatlar"><FA rows={3}/></FF><FF label="Bojxona auditining vazifalari"><FS opts={["Tovarlarni tekshirish"]}/></FF></>}
          {sub===2&&<><div style={{fontSize:13,fontWeight:700,marginBottom:12}}>XABARNOMADA QUYIDAGILARNI SO'RAB OLINADIGAN HUJJATLAR</div>{["tovar va transport vositalariga tegishli bo'lgan hujjatlar (tovarlarni buyurtma qilish, sotib olish va boshqalar)","olib kiriladigan va (yoki) olib chiqiladigan tovarlar va transport vositalarining buxgalterlik hisobi va hisoboti hujjatlari","tovarlarga nisbatan tarif preferensiyalarini qo'llash uchun asos bo'lgan tovarlarning kelib chiqishi to'g'risidagi sertifikatlari","tashqi savdo faoliyatida valyuta operatsiyalarini amalga oshirish maqsadida moliya-xo'jalik faoliyati bilan bog'liq hujjatlar","vakolatli shaxsning bank operatsiyalariga oid hujjatlar"].map((item,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}><div style={{width:16,height:16,border:`2px solid ${C.border}`,borderRadius:3,marginTop:1,flexShrink:0}}/><span style={{fontSize:12.5,lineHeight:1.5}}>{item}</span></div>))}<div style={{display:"flex",gap:8,marginTop:10}}><input placeholder="Qo'shimcha hujjat" style={{flex:1,border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 10px",fontSize:12.5,outline:"none"}}/><button style={{padding:"6px 14px",background:C.primary,color:"white",border:"none",borderRadius:6,cursor:"pointer",fontSize:12.5}}>+ Qo'shish</button></div></>}
          {sub===3&&<>{["KAMERAL BOJXONA AUDITI","SAYYOR BOJXONA AUDITI"].map((sec,si)=>(<div key={sec} style={{marginBottom:16}}><div style={{fontSize:13,fontWeight:700,marginBottom:8}}>{sec}</div>{["O'tkazish muddatini to'xtatib turish","O'tkazish muddatini uzaytirish"].map((opt,oi)=>(<div key={opt} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}><div style={{width:17,height:17,borderRadius:"50%",border:`2px solid ${si===0&&oi===0?C.primary:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{si===0&&oi===0&&<div style={{width:8,height:8,borderRadius:"50%",background:C.primary}}/>}</div><span style={{fontSize:12.5}}>{opt}</span></div>))}</div>))}<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Jarayon sanasi (dan)"><FI value="17.12.2022"/></FF><FF label="(gacha)"><FI value="17.12.2025"/></FF></div><FF label="Hujjat biriktirish"><div style={{border:`1px solid ${C.border}`,borderRadius:6,padding:"6px 10px",display:"flex",alignItems:"center",gap:6,fontSize:12.5,cursor:"pointer",background:C.bg}}><Upload size={13} color={C.textMuted}/>Bildirgi.pdf</div></FF></>}
          {sub===4&&<><FF label="Bojxona auditi amalga oshirgan F.I.Sh. va lavozimi"><FS opts={["Jilvonov Amin Qaxramon o'g'li"]}/></FF><FF label="Vakolatli shaxsning bank rekvizitlari"><FI value="p/c 20208000107010660001, ИНН: 200542776, МФО: 00423"/></FF><FF label="Jalb qilingan boshqa shaxslarning F.I.Sh."><FI value="Mutaxassis jalb qilinmadi"/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Audit o'tkazilgan sana (dan)"><FI value="17.12.2022"/></FF><FF label="(gacha)"><FI value="17.12.2025"/></FF></div><FF label="O'rganilgan hujjat va ma'lumotlar turi"><FA rows={2} val="Vakolatli shaxsning 02.12.2022 dan 18.11.2025 gacha rasmiylashtirilgan BYuDlar, tashqi savdo kontraktlari, buxgalteriya hisoboti"/></FF><FF label="Buxgalterlik hisoboti hujjatlarini yuritish holati"><FI value="Buxgalteriya hisobi 1C elektron shaklda yuritiladi"/></FF><FF label="Bojxona auditi natijalari bo'yicha xulosa"><FA rows={4}/></FF><div style={{fontSize:13,fontWeight:700,marginBottom:8}}>BOJXONA AUDITI NATIJASI</div><div style={{display:"flex",gap:16,marginBottom:12}}>{["Ijobiy","Salbiy"].map((opt,i)=>(<div key={opt} style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:17,height:17,borderRadius:"50%",border:`2px solid ${i===0?C.primary:C.border}`,display:"flex",alignItems:"center",justifyContent:"center"}}>{i===0&&<div style={{width:8,height:8,borderRadius:"50%",background:C.primary}}/>}</div><span style={{fontSize:12.5}}>{opt}</span></div>))}</div><div style={{background:"#FFFBEB",border:`1px solid #FCD34D`,borderRadius:6,padding:"8px 12px",fontSize:12,color:"#92400E",display:"flex",alignItems:"center",gap:8}}><AlertTriangle size={14} color={C.warning}/>O'rganilgan BYuDlardagi to'grisida ma'lumotlarni kiriting!<button style={{marginLeft:"auto",background:C.warning,color:"white",border:"none",borderRadius:4,padding:"2px 10px",cursor:"pointer",fontSize:11,fontWeight:600}}>O'rganilgan BYuDlar ?</button></div></>}
          {sub===5&&<><FF label="Jami qarzdorlik summasi"><FI value="586 000 000.00"/></FF><FF label="Jami qarzdorlik summasi (so'z bilan)"><FI value="Besh yuz sakson olti million, nol tiyin"/></FF><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}><FF label="Mansabdor shaxsning lavozimi"><FS opts={["Boshqarma boshlig'i"]}/></FF><FF label="F.I.Sh"><FS opts={["Jilvonov Amin Qaxramon o'g'li"]}/></FF></div><FF label="Ijrochi"><FI value="Jo'rayev Ulug'bek Sayfiddin O'g'li"/></FF><FF label="Telefon raqami"><FI value="+998 55 502-76-00 (72-36)"/></FF></>}
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{background:"#374151",padding:"6px 12px",display:"flex",alignItems:"center",gap:8,color:"white",fontSize:12}}>
            <span style={{flex:1}}>📄 Ko'rinish</span><span style={{fontSize:11,color:"#9CA3AF"}}>1/1</span><span style={{fontSize:11,color:"#9CA3AF"}}>99%</span>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 24px",background:"#FFFFFF",fontSize:11,lineHeight:1.7,fontFamily:"Georgia,serif",color:"#1a1a1a"}}>
            <div style={{textAlign:"center",marginBottom:16}}>{p.title.split("\n").map((line,i)=>(<div key={i} style={{fontWeight:i===0?700:400,fontSize:i===0?12:11}}>{line}</div>))}</div>
            {p.body.split("\n").map((line,i)=>(<div key={i} style={{marginBottom:line?0:6}}>{line||<br/>}</div>))}
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:8,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
        <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 22px",background:C.primary,color:"white",border:"none",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600}}><Save size={14}/>Saqlash</button>
        <button style={{display:"flex",alignItems:"center",gap:6,padding:"8px 22px",background:C.success,color:"white",border:"none",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600}}><Send size={14}/>Tasdiqlash uchun yuborish</button>
      </div>
    </div>
  );
};

/* ====================== Main page ====================== */
const SCFG = ["Umumiy ma'lumotlar", "Faoliyati", "Xavf topshiriqlari", "Hujjat rasmiylashtiruvi"];

export const CandidateDetailPage = () => {
  const [step, setStep] = useState(0);
  return (
    <div style={{padding:20,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 20px",marginBottom:16,display:"flex",alignItems:"center"}}>
        {SCFG.map((s,i)=>(
          <div key={s} style={{display:"flex",alignItems:"center",flex:i<SCFG.length-1?1:"none"}}>
            <button onClick={()=>setStep(i)} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",padding:0}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:i<step?"#D1FAE5":i===step?C.primary:"#E2E8F0",color:i<step?C.success:i===step?"white":C.textMuted,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,flexShrink:0}}>{i<step?<Check size={13}/>:i+1}</div>
              <span style={{fontSize:12.5,fontWeight:i===step?700:400,color:i===step?C.primary:i<step?C.textPrimary:C.textMuted,whiteSpace:"nowrap"}}>{s}</span>
            </button>
            {i<SCFG.length-1&&<div style={{flex:1,height:2,background:i<step?C.success:i===step?C.primary:C.border,margin:"0 12px",borderRadius:1}}/>}
          </div>
        ))}
      </div>
      {step===0&&<Step1/>}
      {step===1&&<Step2/>}
      {step===2&&<Step3/>}
      {step===3&&<Step4/>}
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:16,gap:8}}>
        {step>0&&<button onClick={()=>setStep(step-1)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 22px",background:C.card,color:C.primary,border:`1px solid ${C.primary}`,borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600}}><ChevronLeft size={14}/>Oldingi</button>}
        {step<SCFG.length-1&&<button onClick={()=>setStep(step+1)} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 22px",background:C.primary,color:"white",border:"none",borderRadius:20,cursor:"pointer",fontSize:13,fontWeight:600}}>keyingi<ArrowRight size={14}/></button>}
      </div>
    </div>
  );
};
