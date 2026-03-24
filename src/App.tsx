import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PreRegistration from "./pages/PreRegistration";
import CheckIn from "./pages/CheckIn";
import SpotRequest from "./pages/SpotRequest";
import Approvals from "./pages/Approvals";
import Monitoring from "./pages/Monitoring";
import VisitorHistory from "./pages/VisitorHistory";
import Assets from "./pages/Assets";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Blacklist from "./pages/Blacklist";
import AuditLogs from "./pages/AuditLogs";
import BulkUpload from "./pages/BulkUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pre-registration" element={<PreRegistration />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/spot-request" element={<SpotRequest />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/visitor-history" element={<VisitorHistory />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blacklist" element={<Blacklist />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
