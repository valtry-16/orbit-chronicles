import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import MissionDetail from "./pages/MissionDetail";
import NotFound from "./pages/NotFound";

import TopAd from "./components/TopAd"; // <- AD COMPONENT

const queryClient = new QueryClient();

const App = () => {
  // Ad refresh state
  const [refreshAd, setRefreshAd] = useState(0);

  // Call this whenever the user selects anything
  function handleUserAction() {
    setRefreshAd((prev) => prev + 1);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* TOP GOOGLE ADSENSE BANNER */}
        <TopAd refreshKey={refreshAd} />

        {/* MAIN ROUTER */}
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Index onUserAction={handleUserAction} />}
            />

            <Route
              path="/mission/:id"
              element={<MissionDetail onUserAction={handleUserAction} />}
            />

            {/* CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;