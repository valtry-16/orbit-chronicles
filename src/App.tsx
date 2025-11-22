// src/App.tsx
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Existing pages
import Index from "./pages/Index";
import MissionDetail from "./pages/MissionDetail";
import NotFound from "./pages/NotFound";

// ⭐ Supabase Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./auth/ProtectedRoute";

// ⭐ Supabase logout (frontend only)
import { supabase } from "@/supabase/client";

// Ads
import TopAd from "@/components/TopAd";
import StickyBottomAd from "@/components/StickyBottomAd";

const queryClient = new QueryClient();

// ⭐ Simple navbar with Supabase logout
function Navbar() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <nav className="fixed top-0 left-0 w-full p-4 bg-black/40 backdrop-blur text-white flex justify-between items-center z-50">
      <Link to="/" className="text-2xl font-bold">
        Orbit Chronicles
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/favorites" className="hover:underline">Favorites</Link>

        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>

        <button
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const App = () => {
  const [refreshAd, setRefreshAd] = useState(0);

  function handleUserAction() {
    setRefreshAd((prev) => prev + 1);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <TopAd refreshKey={refreshAd} />

        <BrowserRouter>
          {/* ⭐ Navbar */}
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={<Index onUserAction={handleUserAction} />}
            />

            <Route
              path="/mission/:id"
              element={<MissionDetail onUserAction={handleUserAction} />}
            />

            {/* ⭐ Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ⭐ Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <StickyBottomAd refreshKey={refreshAd} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;