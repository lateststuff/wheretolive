import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Advisor from "./Advisor";

import Results from "./Results";

import Explorer from "./Explorer";

import AdminDashboard from "./AdminDashboard";

import ProviderDirectory from "./ProviderDirectory";

import VerificationDashboard from "./VerificationDashboard";

import MobilityOptions from "./MobilityOptions";

import ContactPartner from "./ContactPartner";

import Roadmap from "./Roadmap";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    Advisor: Advisor,
    
    Results: Results,
    
    Explorer: Explorer,
    
    AdminDashboard: AdminDashboard,
    
    ProviderDirectory: ProviderDirectory,
    
    VerificationDashboard: VerificationDashboard,
    
    MobilityOptions: MobilityOptions,
    
    ContactPartner: ContactPartner,
    
    Roadmap: Roadmap,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Advisor" element={<Advisor />} />
                
                <Route path="/Results" element={<Results />} />
                
                <Route path="/Explorer" element={<Explorer />} />
                
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                
                <Route path="/ProviderDirectory" element={<ProviderDirectory />} />
                
                <Route path="/VerificationDashboard" element={<VerificationDashboard />} />
                
                <Route path="/MobilityOptions" element={<MobilityOptions />} />
                
                <Route path="/contact-partner" element={<ContactPartner />} />
                
                <Route path="/Roadmap" element={<Roadmap />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}

// Utility to generate paths based on page name
const createPageUrl = (pageName) => `/${pageName.toLowerCase()}`;

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard createPageUrl={createPageUrl} /> },
      {
        path: createPageUrl("Advisor"),
        element: <Advisor createPageUrl={createPageUrl} />,
      },
      {
        path: createPageUrl("Results"),
        element: <Results createPageUrl={createPageUrl} />,
      },
      {
        path: createPageUrl("Explorer"),
        element: <Explorer createPageUrl={createPageUrl} />,
      },
      {
        path: createPageUrl("AdminDashboard"),
        element: <AdminDashboard createPageUrl={createPageUrl} />,
      },
      {
        path: createPageUrl("ProviderDirectory"),
        element: <ProviderDirectory createPageUrl={createPageUrl} />,
      },
      {
        path: createPageUrl("MobilityOptions"),
        element: <MobilityOptions createPageUrl={createPageUrl} />,
      },
    ],
  },
];

export { routes, createPageUrl };