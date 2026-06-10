import { useState } from "react";
import {
  Routes, Route, Navigate,
  useLocation, useNavigate,
} from "react-router-dom";

import { C } from "./theme/colors";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

import { DashboardPage }    from "./pages/Dashboard";
import { ProfilPage }       from "./pages/Profil";
import { SorovlarPage, SorovDetailPage } from "./pages/Sorovlar";
import { HujjatlarPage }    from "./pages/Hujjatlar";
import { TekshiruvlarPage, TekshiruvDetailPage } from "./pages/Tekshiruvlar";
import { MuloqotPage }      from "./pages/Muloqot";
import { HisobotlarPage }   from "./pages/Hisobotlar";
import { BildirishnomalarPage } from "./pages/Bildirishnomalar";
import { SozlamalarPage }   from "./pages/Sozlamalar";
import { YordamPage }       from "./pages/Yordam";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.pathname;

  const [sidebarOpen, setOpen] = useState(true);

  const setRoute = to => navigate(to);

  return (
    <div style={{
      display: "flex", minHeight: "100vh",
      background: C.bg,
    }}>
      {sidebarOpen && (
        <Sidebar route={route} setRoute={setRoute} />
      )}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        minWidth: 0,
      }}>
        <Header route={route} onToggle={() => setOpen(p => !p)} setRoute={setRoute} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/"                 element={<DashboardPage setRoute={setRoute} />} />
            <Route path="/profil"           element={<ProfilPage />} />
            <Route path="/sorovlar"         element={<SorovlarPage />} />
            <Route path="/sorovlar/:id"     element={<SorovDetailPage />} />
            <Route path="/hujjatlar"        element={<HujjatlarPage />} />
            <Route path="/tekshiruvlar"     element={<TekshiruvlarPage />} />
            <Route path="/tekshiruvlar/:id" element={<TekshiruvDetailPage />} />
            <Route path="/muloqot"          element={<MuloqotPage />} />
            <Route path="/hisobotlar"       element={<HisobotlarPage />} />
            <Route path="/bildirishnomalar" element={<BildirishnomalarPage />} />
            <Route path="/sozlamalar"       element={<SozlamalarPage />} />
            <Route path="/yordam"           element={<YordamPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
