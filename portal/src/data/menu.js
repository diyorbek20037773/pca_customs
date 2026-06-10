import {
  Home, Building2, Inbox, FileText, ShieldCheck,
  MessageSquare, FileCheck2, Bell, Settings, HelpCircle,
} from "lucide-react";

export const MENU = [
  { key: "/",               label: "Bosh sahifa",     icon: Home },
  { key: "/profil",         label: "Mening profilim", icon: Building2 },
  { key: "/sorovlar",       label: "So'rovlar",       icon: Inbox,         badge: 3 },
  { key: "/hujjatlar",      label: "Hujjatlar",       icon: FileText },
  { key: "/tekshiruvlar",   label: "Tekshiruvlar",    icon: ShieldCheck },
  { key: "/muloqot",        label: "Muloqot",         icon: MessageSquare, badge: 2 },
  { key: "/hisobotlar",     label: "Hisobotlar",      icon: FileCheck2 },
  { key: "/bildirishnomalar", label: "Bildirishnomalar", icon: Bell },
  { key: "/sozlamalar",     label: "Sozlamalar",      icon: Settings },
  { key: "/yordam",         label: "Yordam",          icon: HelpCircle },
];
