import { useState } from "react";
import {
  Routes, Route, Navigate,
  useLocation, useNavigate, useParams, matchPath,
} from "react-router-dom";

import { C } from "./theme/colors";
import { getBC } from "./utils/routing";

import { Sidebar } from "./components/Sidebar";
import { IntegrationSidebar } from "./components/IntegrationSidebar";
import { Header } from "./components/Header";

import { DashboardPage } from "./pages/Dashboard";
import { CandidatesPage } from "./pages/Candidates";
import { CandidateDetailPage } from "./pages/CandidateDetail";
import { DocumentsPage } from "./pages/Documents";
import { MezonlarPage } from "./pages/Mezonlar";
import { HisobotlarPage } from "./pages/Hisobotlar";
import { IntegratsiyaPage } from "./pages/Integratsiya";
import { NazoratPage } from "./pages/Nazorat";
import { ModullarPage } from "./pages/Modullar";

// /integratsiya/:section/:tab marshrutidan parametrlarni o'qib,
// IntegratsiyaPage'ga props sifatida uzatuvchi ko'prik komponenti.
const IntegratsiyaRoute = () => {
  const { section = "soliq", tab = "royxatga-olish" } = useParams();
  const navigate = useNavigate();
  return (
    <IntegratsiyaPage
      section={section}
      tab={tab}
      setTab={t => navigate(`/integratsiya/${section}/${t}`)}
    />
  );
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const route = location.pathname;

  const [sidebarOpen, setOpen] = useState(true);
  // Nomzodlar uchun status filtri (null = barchasi)
  const [candidatesFilter, setCandidatesFilter] = useState(null);

  const isIntegratsiya = route.startsWith("/integratsiya");

  // Breadcrumbs uchun joriy URL'dan integratsiya parametrlarini o'qish
  const intMatch =
    matchPath({ path: "/integratsiya/:section/:tab" }, route) ||
    matchPath({ path: "/integratsiya/:section" },        route);
  const intSection = intMatch?.params?.section || "soliq";
  const intTab     = intMatch?.params?.tab     || "royxatga-olish";

  // Sahifalar va Header'dagi mavjud setRoute interfeysiga moslashish
  const setRoute = to => navigate(to);

  // Dashboard'dan yoki boshqa joydan filter bilan Nomzodlarga o'tish
  const goCandidates = (status = null) => {
    setCandidatesFilter(status);
    navigate("/nomzodlar");
  };

  const bc = getBC(route, isIntegratsiya ? { section: intSection, tab: intTab } : null);

  return (
    <div style={{
      display: "flex", height: "100vh",
      background: C.bg,
      overflow: "hidden",
    }}>
      {sidebarOpen && (
        <Sidebar
          route={route}
          setRoute={setRoute}
          collapsed={isIntegratsiya}
        />
      )}
      {sidebarOpen && isIntegratsiya && (
        <IntegrationSidebar
          section={intSection}
          setSection={k => navigate(`/integratsiya/${k}/royxatga-olish`)}
        />
      )}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        overflow: "hidden", minWidth: 0,
      }}>
        <Header
          bc={bc}
          onToggle={() => setOpen(p => !p)}
          setRoute={setRoute}
        />
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<DashboardPage goCandidates={goCandidates} />} />
            <Route path="/nomzodlar" element={
              <CandidatesPage
                setRoute={setRoute}
                filter={candidatesFilter}
                setFilter={setCandidatesFilter} />
            } />
            <Route path="/nomzodlar/:stir" element={<CandidateDetailPage />} />
            <Route path="/hujjatlar/*"     element={<DocumentsPage />} />
            <Route path="/mezonlar"        element={<MezonlarPage />} />
            <Route path="/hisobotlar"      element={<HisobotlarPage />} />
            <Route path="/integratsiya"
              element={<Navigate to="/integratsiya/soliq/royxatga-olish" replace />} />
            <Route path="/integratsiya/:section"      element={<IntegratsiyaRoute />} />
            <Route path="/integratsiya/:section/:tab" element={<IntegratsiyaRoute />} />
            <Route path="/nazorat"  element={<NazoratPage />} />
            <Route path="/modullar" element={<ModullarPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
