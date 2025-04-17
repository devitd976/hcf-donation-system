
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import EditClient from "./pages/EditClient";
import ViewClient from "./pages/ViewClient";
import Volunteers from "./pages/Volunteers";
import AddVolunteer from "./pages/AddVolunteer";
import EditVolunteer from "./pages/EditVolunteer";
import ViewVolunteer from "./pages/ViewVolunteer";
import Inventory from "./pages/Inventory";
import AddInventoryItem from "./pages/AddInventoryItem";
import EditInventoryItem from "./pages/EditInventoryItem";
import ViewInventoryItem from "./pages/ViewInventoryItem";
import Requests from "./pages/Requests";
import AddRequest from "./pages/AddRequest";
import EditRequest from "./pages/EditRequest";
import ViewRequest from "./pages/ViewRequest";
import Teams from "./pages/Teams";
import ViewTeam from "./pages/ViewTeam";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          
          {/* Client Routes */}
          <Route path="/clients" element={<Layout><Clients /></Layout>} />
          <Route path="/clients/add" element={<Layout><AddClient /></Layout>} />
          <Route path="/clients/edit/:id" element={<Layout><EditClient /></Layout>} />
          <Route path="/clients/view/:id" element={<Layout><ViewClient /></Layout>} />
          
          {/* Volunteer Routes */}
          <Route path="/volunteers" element={<Layout><Volunteers /></Layout>} />
          <Route path="/volunteers/add" element={<Layout><AddVolunteer /></Layout>} />
          <Route path="/volunteers/edit/:id" element={<Layout><EditVolunteer /></Layout>} />
          <Route path="/volunteers/view/:id" element={<Layout><ViewVolunteer /></Layout>} />
          
          {/* Inventory Routes */}
          <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
          <Route path="/inventory/add" element={<Layout><AddInventoryItem /></Layout>} />
          <Route path="/inventory/edit/:id" element={<Layout><EditInventoryItem /></Layout>} />
          <Route path="/inventory/view/:id" element={<Layout><ViewInventoryItem /></Layout>} />
          
          {/* Request Routes */}
          <Route path="/requests" element={<Layout><Requests /></Layout>} />
          <Route path="/requests/add" element={<Layout><AddRequest /></Layout>} />
          <Route path="/requests/edit/:id" element={<Layout><EditRequest /></Layout>} />
          <Route path="/requests/view/:id" element={<Layout><ViewRequest /></Layout>} />
          
          {/* Team Routes */}
          <Route path="/teams" element={<Layout><Teams /></Layout>} />
          <Route path="/teams/view/:id" element={<Layout><ViewTeam /></Layout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
