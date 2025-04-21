
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupNow from "./pages/SignupNow";
import Dashboard from "./pages/Dashboard";
import Cryptocurrencies from "./pages/Markets/Cryptocurrencies";
import MarketInsights from "./pages/Markets/MarketInsights";
import AiAnalysis from "./pages/Markets/AiAnalysis";
import AiAssistant from "./pages/Markets/AiAssistant";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/signup-now" element={<Layout><SignupNow /></Layout>} />
            <Route path="/dashboard/*" element={<Layout><Dashboard /></Layout>} />
            <Route path="/markets/cryptocurrencies" element={<Layout><Cryptocurrencies /></Layout>} />
            <Route path="/markets/insights" element={<Layout><MarketInsights /></Layout>} />
            <Route path="/markets/ai-analysis" element={<Layout><AiAnalysis /></Layout>} />
            <Route path="/markets/ai-assistant" element={<Layout><AiAssistant /></Layout>} />
            <Route path="/ai-analysis" element={<Layout><AiAnalysis /></Layout>} />
            <Route path="/chatbot" element={<Layout><AiAssistant /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
