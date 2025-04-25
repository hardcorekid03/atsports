import { Route, Routes } from "react-router-dom";
import Live from "@/pages/live-games";
import LandingPage from "@/pages/landing-page";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page route */}
      <Route path="/" element={<LandingPage />} />

      {/* Live Dashboard route */}
      <Route path="/live" element={<Live />} />

      {/* 404 fallback (optional) */}
      <Route
        path="*"
        element={<div className="p-6 text-center">Page Not Found</div>}
      />
    </Routes>
  );
}
