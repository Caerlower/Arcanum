import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@/contexts/WalletContext";
import { Layout } from "@/components/layout/Layout";

import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Orders from "./pages/Orders";
import Pool from "./pages/Pool";
import Privacy from "./pages/Privacy";
import Roadmap from "./pages/Roadmap";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/pool" element={<Pool />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
