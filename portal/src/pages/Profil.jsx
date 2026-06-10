import { useState } from "react";
import {
  Edit2, Save, X, Phone, Mail, MapPin, Building2,
  CreditCard, Users, Briefcase,
} from "lucide-react";
import { C } from "../theme/colors";
import { Btn, FF, FI } from "../components/FormFields";
import { ORG } from "../data/mockData";

export const ProfilPage = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: "0 auto" }}>
      {/* Hero */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 16, padding: 28, marginBottom: 20,
        display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap",
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 32, fontWeight: 800,
          flexShrink: 0,
          boxShadow: `0 8px 20px ${C.primary}33`,
        }}>{ORG.shortName[0]}</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.textPrimary, marginBottom: 6 }}>
            {ORG.name}
          </h1>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: C.success + "18", color: C.success,
            padding: "4px 12px", borderRadius: 20,
            fontSize: 12.5, fontWeight: 700, marginBottom: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%", background: C.success,
            }} />
            Faol tashkilot
          </div>
          <div style={{ fontSize: 13, color: C.textMuted }}>
            STIR: {ORG.stir}
          </div>
        </div>
        {edit ? (
          <div style={{ display: "flex", gap: 8 }}>
            <Btn kind="neutral" icon={X} onClick={() => setEdit(false)}>Bekor</Btn>
            <Btn icon={Save} onClick={() => setEdit(false)}>Saqlash</Btn>
          </div>
        ) : (
          <Btn icon={Edit2} kind="ghost" onClick={() => setEdit(true)}>Tahrirlash</Btn>
        )}
      </div>

      {edit ? (
        <EditForm onCancel={() => setEdit(false)} />
      ) : (
        <>
          {/* Aloqa */}
          <Section title="Aloqa">
            <InfoTile icon={Phone} label="Telefon" value={ORG.phone} />
            <InfoTile icon={Mail}  label="Email"   value={ORG.email} />
            <InfoTile icon={MapPin} label="Manzil" value={ORG.address} wide />
          </Section>

          {/* Rahbariyat */}
          <Section title="Rahbariyat">
            <PersonTile name={ORG.director} role="Direktor" />
            <PersonTile name={ORG.chiefAcc} role="Bosh hisobchi" />
          </Section>

          {/* Faoliyat */}
          <Section title="Faoliyat">
            <InfoTile icon={Briefcase} label="Faoliyat turi" value={ORG.oked} wide />
            <InfoTile icon={Users}      label="Xodimlar"      value={`${ORG.employees} kishi`} />
            <InfoTile icon={Building2}  label="Soliq rejimi"  value={ORG.taxRegime} />
          </Section>

          {/* Bank */}
          <Section title="Bank rekvizitlari">
            <InfoTile icon={CreditCard} label="Hisob raqami" value={ORG.bankAccount} wide />
            <InfoTile icon={Building2}   label="Bank"          value={ORG.bank} />
            <InfoTile icon={Building2}   label="MFO"           value={ORG.mfo} />
          </Section>
        </>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 22 }}>
    <h2 style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>
      {title}
    </h2>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 12,
    }}>
      {children}
    </div>
  </div>
);

const InfoTile = ({ icon: Icon, label, value, wide }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 12, padding: 16,
    display: "flex", gap: 12, alignItems: "center",
    gridColumn: wide ? "span 2" : "auto",
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: C.primary + "18",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={18} color={C.primary} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 11.5, color: C.textMuted, marginBottom: 2, fontWeight: 600 }}>
        {label}
      </div>
      <div style={{
        fontSize: 14, fontWeight: 600, color: C.textPrimary,
        wordBreak: "break-word", lineHeight: 1.4,
      }}>{value}</div>
    </div>
  </div>
);

const PersonTile = ({ name, role }) => {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("");
  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`,
      borderRadius: 12, padding: 16,
      display: "flex", gap: 12, alignItems: "center",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: `linear-gradient(135deg, ${C.primary}, ${C.sidebar})`,
        color: "white", fontSize: 14, fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>{initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>
          {name.split(" ").slice(0, 2).join(" ")}
        </div>
        <div style={{ fontSize: 12, color: C.textMuted }}>{role}</div>
      </div>
    </div>
  );
};

const EditForm = ({ onCancel }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 14, padding: 24,
  }}>
    <h2 style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 16 }}>
      Aloqa ma'lumotlarini tahrirlash
    </h2>
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: 14,
    }}>
      <FF label="Telefon"><FI value={ORG.phone} /></FF>
      <FF label="Email"><FI value={ORG.email} /></FF>
    </div>
    <FF label="Yuridik manzil"><FI value={ORG.address} /></FF>
    <FF label="Faktik manzil"><FI value={ORG.factAddress} /></FF>
    <div style={{
      marginTop: 6, padding: "12px 14px",
      background: C.primary + "10", borderRadius: 10,
      fontSize: 13, color: C.textMuted, lineHeight: 1.5,
    }}>
      💡 STIR, OKED va soliq rejimi davlat reyestridan keladi va o'zgartirib bo'lmaydi.
    </div>
  </div>
);
