import { useState } from "react";
import {
  LineChart, Line, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Download, Check } from "lucide-react";

import { C } from "../theme/colors";
import { tblWrap, TH, THl, TD, TDl } from "../styles/table";
import { MONTHS, REGS } from "../data/charts";

import { Card } from "../components/Card";
import { PeriodBtns } from "../components/PeriodBtns";

const HISOB_LINE = MONTHS.map((m, i) => ({
  month: m,
  undirilgan: 60 + Math.round(Math.sin(i * .6) * 25),
  aniqlangan: 90 + Math.round(Math.cos(i * .5) * 30),
  bartaraf:   40 + Math.round(Math.sin(i * .8) * 20),
}));

const HISOB_BAR = REGS.slice(0, 8).map(r => ({
  name: r.name.replace("viloyati", "v.").replace("shahri", "sh.").replace("Qoraqalpog'iston Resp.", "QQ Resp."),
  ijobiy: Math.round(r.i * 3),
  salbiy: Math.round(r.sa * 2),
}));

const HISOB_PIE = [
  { name: "Kameral", value: 68, color: C.primary },
  { name: "Sayyor",  value: 32, color: C.success },
];

export const HisobotlarPage = () => {
  const [tab, setTab] = useState(0);
  const [period, setPeriod] = useState("Barchasi");
  const tabs = ["Umumiy statistika", "Regional ko'rsatkichlar", "Moliyaviy ko'rsatkichlar", "Soliqlar bo'yicha"];
  const kpiData = [
    { l: "Jami aniqlangan",  v: "160,2 mlrd", c: C.primary, pct: null },
    { l: "Undirilgan",       v: "80,3 mlrd",  c: C.success, pct: 52 },
    { l: "Nazoratda",        v: "44,2 mlrd",  c: C.warning, pct: 28 },
    { l: "Bartaraf etilgan", v: "35,7 mlrd",  c: C.danger,  pct: 20 },
  ];

  return (
    <div style={{padding:20,display:"flex",flexDirection:"column",gap:14,minHeight:"100%",boxSizing:"border-box"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
        {tabs.map((t,i)=>{
          const on=tab===i;
          return(
            <button key={t} onClick={()=>setTab(i)} style={{padding:"6px 16px",borderRadius:6,border:`1px solid ${on?C.primary:C.border}`,background:on?C.primary:C.card,color:on?"white":C.textMuted,cursor:"pointer",fontSize:12.5,fontWeight:on?600:400,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
              {on&&<Check size={12}/>}{t}
            </button>
          );
        })}
        <div style={{flex:1}}/>
        <PeriodBtns active={period} onChange={setPeriod}/>
        <span style={{fontSize:11,color:C.textMuted}}>01.01.2025 — 22.11.2025</span>
        <button style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",border:`1px solid ${C.border}`,borderRadius:6,background:C.card,color:C.textPrimary,cursor:"pointer",fontSize:12}}><Download size={13}/>Export</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {kpiData.map(k=>(
          <div key={k.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"16px 18px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:4}}>{k.l}</div>
              <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v} <span style={{fontSize:12,fontWeight:400,color:C.textMuted}}>so'm</span></div>
            </div>
            {k.pct && (
              <div style={{position:"relative",width:48,height:48}}>
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="19" fill="none" stroke={C.progressBg} strokeWidth="4"/>
                  <circle cx="24" cy="24" r="19" fill="none" stroke={k.c} strokeWidth="4"
                    strokeDasharray={`${2*Math.PI*19*k.pct/100} ${2*Math.PI*19}`}
                    strokeDashoffset={`${2*Math.PI*19*0.25}`}/>
                </svg>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:k.c}}>{k.pct}%</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {tab===0 && (
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14}}>
          <Card style={{padding:16}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Yil davomida aniqlangan va undirilgan summalar dinamikasi (mlrd so'm)</div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={HISOB_LINE} margin={{top:6,right:16,bottom:0,left:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} vertical={false}/>
                <XAxis dataKey="month" tick={{fontSize:10}} tickLine={false}/>
                <YAxis tick={{fontSize:10}} tickLine={false}/>
                <Tooltip contentStyle={{fontSize:11,borderRadius:6}} formatter={(v,n)=>[`${v} mlrd`,n]}/>
                <Line type="monotone" dataKey="aniqlangan" stroke={C.primary} strokeWidth={2.5} dot={{r:3}} name="Aniqlangan"/>
                <Line type="monotone" dataKey="undirilgan" stroke={C.success} strokeWidth={2.5} dot={{r:3}} name="Undirilgan"/>
                <Line type="monotone" dataKey="bartaraf"   stroke={C.warning} strokeWidth={2}   dot={{r:3}} name="Bartaraf etilgan" strokeDasharray="5 3"/>
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card style={{padding:16}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>Audit shakli taqsimoti</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={HISOB_PIE} cx="50%" cy="50%" outerRadius={72} dataKey="value" label={({value})=>`${value}%`}>
                  {HISOB_PIE.map((e,i)=><Cell key={i} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:6}}>
              {HISOB_PIE.map(p=>(
                <div key={p.name} style={{display:"flex",alignItems:"center",gap:5,fontSize:12}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:p.color}}/>
                  {p.name}: <b>{p.value}%</b>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab===1 && (
        <Card style={{padding:16}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>Hududlar bo'yicha audit natijalari</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={HISOB_BAR} margin={{top:6,right:16,bottom:40,left:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:10}} tickLine={false} angle={-30} textAnchor="end"/>
              <YAxis tick={{fontSize:10}} tickLine={false}/>
              <Tooltip contentStyle={{fontSize:11,borderRadius:6}}/>
              <Bar dataKey="ijobiy" fill={C.primary} name="Ijobiy" radius={[3,3,0,0]}/>
              <Bar dataKey="salbiy" fill={C.danger}  name="Salbiy" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {tab===2 && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[{title:"Undirilgan summalar (mlrd so'm)",color:C.success},{title:"Aniqlangan xatolar (mlrd so'm)",color:C.danger}].map((sec,si)=>(
            <Card key={sec.title} style={{padding:16}}>
              <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>{sec.title}</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MONTHS.slice(0,6).map((m,i)=>({month:m,val:40+i*8+si*15}))} margin={{top:4,right:8,bottom:0,left:-20}}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} vertical={false}/>
                  <XAxis dataKey="month" tick={{fontSize:10}} tickLine={false}/>
                  <YAxis tick={{fontSize:10}} tickLine={false}/>
                  <Tooltip contentStyle={{fontSize:11}} formatter={v=>[`${v} mlrd`]}/>
                  <Bar dataKey="val" fill={sec.color} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          ))}
        </div>
      )}

      {tab===3 && (
        <Card>
          <div style={{overflowX:"auto"}}>
            <table style={tblWrap}>
              <thead>
                <tr>
                  {["Hudud","Bojxona boji","Aksiz solig'i","QQS","Boshqa to'lovlar","Jami","O'sish"].map((h,i,a)=>(
                    <th key={h} style={i===a.length-1?THl:TH({textAlign:i>0?"right":"left"})}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{REGS.map(r=>{
                const jami=(r.sum*12.5).toFixed(1);
                const osi=((Math.random()-.3)*30).toFixed(1);
                return(
                  <tr key={r.name} onMouseEnter={e=>e.currentTarget.style.background=C.rowHover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={TD({fontSize:11})}>{r.name}</td>
                    <td style={TD({textAlign:"right"})}>{(r.s*8.2).toFixed(1)}</td>
                    <td style={TD({textAlign:"right"})}>{(r.s*1.5).toFixed(1)}</td>
                    <td style={TD({textAlign:"right"})}>{(r.s*2.3).toFixed(1)}</td>
                    <td style={TD({textAlign:"right"})}>{(r.s*0.5).toFixed(1)}</td>
                    <td style={TD({textAlign:"right",fontWeight:700})}>{jami}</td>
                    <td style={TDl({textAlign:"right"})}>
                      <span style={{color:parseFloat(osi)>=0?C.success:C.danger,fontWeight:700}}>
                        {parseFloat(osi)>=0?"+":""}{osi}%
                      </span>
                    </td>
                  </tr>
                );
              })}</tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
