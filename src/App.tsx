// src/App.tsx
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import MissionDetail from "./pages/MissionDetail";
import NotFound from "./pages/NotFound";

// Ad components (create these under src/components/)
import TopAd from "@/components/TopAd";
import StickyBottomAd from "@/components/StickyBottomAd";
// In-feed / In-article / Multiplex are used inside pages, not here
// import InFeedAd from "@/components/InFeedAd";
// import InArticleAd from "@/components/InArticleAd";
// import MultiplexAd from "@/components/MultiplexAd";

const queryClient = new QueryClient();

const App = () => {
  // Used to trigger ad refresh when the user interacts
  const [refreshAd, setRefreshAd] = useState(0);

  function handleUserAction() {
    // incrementing forces ad components to re-run their ad push effect
    setRefreshAd((prev) => prev + 1);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Top (header) Ad — refreshKey could be passed down if TopAd needs it */}
        <TopAd refreshKey={refreshAd} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onUserAction={handleUserAction} />} />
            <Route
              path="/mission/:id"
              element={<MissionDetail onUserAction={handleUserAction} />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Sticky bottom banner across the whole site */}
        <StickyBottomAd refreshKey={refreshAd} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;