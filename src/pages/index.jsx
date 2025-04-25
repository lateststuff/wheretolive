import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import Advisor from "./Advisor";

import Results from "./Results";

import Explorer from "./Explorer";

import AdminDashboard from "./AdminDashboard";

import ProviderDirectory from "./ProviderDirectory";

import VerificationDashboard from "./VerificationDashboard";

import MobilityOptions from "./MobilityOptions";

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