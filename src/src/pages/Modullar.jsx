import { useState } from "react";
import { Search, Check } from "lucide-react";

import { C, ST } from "../theme/colors";

const MOD_DATA = [
  { id:1,  nom:"Nomzodlar moduli",       tavsif:"Audit uchun nomzod korxonalarni boshqarish, xavf darajasini aniqlash va taqsimlash",                          icon:"👥", rang:C.primary,  aktiv:true,  versiya:"2.4.1", sorovlar:1847 },
  { id:2,  nom:"Hujjatlar moduli",       tavsif:"Audit hujjatlarini shakllantirish, qaror, dastur, xabarnoma va dalolatnoma boshqaruvi",                       icon:"📋", rang:"#7C3AED",  aktiv:true,  versiya:"3.1.0", sorovlar:956 },
  { id:3,  nom:"Mezonlar moduli",        tavsif:"Xavf mezonlarini sozlash, koeffitsiyentlarni boshqarish va yangilash",                                         icon:"⚖️", rang:"#059669",  aktiv:true,  versiya:"1.8.3", sorovlar:423 },
  { id:4,  nom:"Integratsiya moduli",    tavsif:"Tashqi axborot tizimlari bilan ma'lumot almashish va sinxronizatsiya",                                         icon:"🔗", rang:"#0891B2",  aktiv:true,  versiya:"2.0.5", sorovlar:3241 },
  { id:5,  nom:"Hisobotlar moduli",      tavsif:"Statistik ma'lumotlar, analitik hisobotlar va dashboardlarni shakllantirish",                                  icon:"📊", rang:"#D97706",  aktiv:true,  versiya:"1.5.2", sorovlar:678 },
  { id:6,  nom:"Nazorat tadbirlari",     tavsif:"Profilaktik va monitoring tadbirlarini rejalashtirish va bajarish nazorati",                                   icon:"🛡️", rang:"#DC2626",  aktiv:true,  versiya:"1.2.0", sorovlar:312 },
  { id:7,  nom:"Bildirishnomalar",       tavsif:"Push bildirishnomalar, email xabarlar va tizim ogohlantirishlarini boshqarish",                               icon:"🔔", rang:"#9333EA",  aktiv:false, versiya:"0.9.1", sorovlar:89 },
  { id:8,  nom:"Foydalanuvchilar",       tavsif:"Foydalanuvchi akkauntlari, huquqlar va rolllar boshqaruvi",                                                    icon:"👤", rang:"#0369A1",  aktiv:true,  versiya:"3.0.2", sorovlar:145 },
  { id:9,  nom:"Jurnallash",             tavsif:"Tizim hodisalari, xatolar va audit izlarini kuzatish",                                                          icon:"📝", rang:"#64748B",  aktiv:true,  versiya:"2.1.0", sorovlar:5678 },
  { id:10, nom:"Zaxira nusxa",           tavsif:"Ma'lumotlar bazasini zaxiralash, tiklash va arxivlash",                                                         icon:"💾", rang:"#065F46",  aktiv:false, versiya:"1.0.4", sorovlar:12 },
  { id:11, nom:"Xavflarni tahlil qilish",tavsif:"AI yordamida xavflarni avtomatik aniqlash va darajasini baholash",                                              icon:"🤖", rang:"#4338CA",  aktiv:true,  versiya:"1.1.0", sorovlar:2341 },
  { id:12, nom:"Ma'lumotlar eksporti",   tavsif:"Excel, PDF va CSV formatlarida ma'lumotlarni yuklash va ulashish",                                              icon:"📤", rang:"#B45309",  aktiv:true,  versiya:"2.3.1", sorovlar:789 },
];

export const ModullarPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Barchasi");

  const filtered = MOD_DATA.filter(m => {
    const qOk = m.nom.toLowerCase().includes(search.toLowerCase())
             || m.tavsif.toLowerCase().includes(search.toLowerCase());
    if (filter === "Aktiv")  return qOk && m.aktiv;
    if (filter === "Nofaol") return qOk && !m.aktiv;
    return qOk;
  });
  const aktiv = MOD_DATA.filter(m => m.aktiv).length;

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{display:"flex",gap:12}}>
        {[
          { l: "Jami modullar",          v: MOD_DATA.length,       c: C.primary },
          { l: "Aktiv",                  v: aktiv,                 c: C.success },
          { l: "Nofaol",                 v: MOD_DATA.length - aktiv, c: C.danger },
          { l: "Jami so'rovlar (bugun)", v: "16 589",              c: C.warning },
        ].map(s=>(
          <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"14px 18px",flex:1}}>
            <div style={{fontSize:10.5,color:C.textMuted,fontWeight:700,letterSpacing:.5,marginBottom:4}}>{s.l.toUpperCase()}</div>
            <div style={{fontSize:28,fontWeight:800,color:s.c,lineHeight:1}}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",display:"flex",gap:8,alignItems:"center"}}>
        {["Barchasi","Aktiv","Nofaol"].map(f=>{
          const on=filter===f;
          return(
            <button key={f} onClick={()=>setFilter(f)} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${on?C.primary:C.border}`,background:on?C.primary:C.card,color:on?"white":C.textMuted,cursor:"pointer",fontSize:12,fontWeight:on?700:400,display:"flex",alignItems:"center",gap:4}}>
              {on&&<Check size={11}/>}{f}
            </button>
          );
        })}
        <div style={{flex:1}}/>
        <div style={{display:"flex",alignItems:"center",border:`1px solid ${C.border}`,borderRadius:6,padding:"5px 10px",gap:6,background:C.bg}}>
          <Search size={13} color={C.textMuted}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Modul qidirish..." style={{border:"none",outline:"none",fontSize:12,width:180,background:"transparent",color:C.textPrimary}}/>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {filtered.map(m=>(
          <div key={m.id}
            style={{
              background:C.card,
              border:`2px solid ${m.aktiv?C.borderLight:C.border}`,
              borderRadius:10,padding:"16px",
              opacity:m.aktiv?1:0.75,
              transition:"all .15s",cursor:"default",
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=m.rang; e.currentTarget.style.boxShadow=`0 4px 16px ${m.rang}22`;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=m.aktiv?C.borderLight:C.border; e.currentTarget.style.boxShadow="none";}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:46,height:46,borderRadius:12,background:m.rang+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>{m.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:C.textPrimary}}>{m.nom}</div>
                  <div style={{fontSize:10.5,color:C.textLight,marginTop:1}}>v{m.versiya}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <div style={{width:34,height:18,borderRadius:9,background:m.aktiv?m.rang:C.progressBg,position:"relative",cursor:"pointer",transition:"background .2s"}}>
                  <div style={{position:"absolute",top:2,left:m.aktiv?16:2,width:14,height:14,borderRadius:"50%",background:"#FFFFFF",transition:"left .2s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
                </div>
              </div>
            </div>
            <p style={{fontSize:11.5,color:C.textMuted,lineHeight:1.5,marginBottom:12,minHeight:36}}>{m.tavsif}</p>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:10,borderTop:`1px solid ${C.borderLight}`}}>
              <div style={{fontSize:11,color:C.textMuted}}>
                So'rovlar: <span style={{fontWeight:700,color:m.rang}}>{m.sorovlar.toLocaleString()}</span>
              </div>
              <span style={{
                background: m.aktiv?m.rang+"22":ST.gray.bg,
                color:      m.aktiv?m.rang:ST.gray.txt,
                padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700,
              }}>{m.aktiv?"Aktiv":"Nofaol"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
