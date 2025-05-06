import Layout from "./Layout.jsx";

// Updated Imports for Freedom Collective
import HomePage from "./Dashboard.jsx"; // Renaming Dashboard mentally to HomePage
// Removed MobilityPage import
// Removed HealthcarePage import
// Removed CommunityPage import
import MembershipPage from "./Membership.jsx"; // Keep for APPLY button
import LoginPage from "./LoginPage.jsx"; // Assuming a LoginPage component exists or will be created
// Removed ContactPage import
import ExploreMembershipPage from "./ExploreMembershipPage.jsx"; // Import the new component
import ApplyPage from "./ApplyPage.jsx"; // Import the new ApplyPage component

// Placeholder for the new page - create this file later
// Removed the placeholder component definition

// Remove old/unused imports
// import Advisor from "./Advisor";
// import Results from "./Results";
// import Explorer from "./Explorer";
// import AdminDashboard from "./AdminDashboard";
// import ProviderDirectory from "./ProviderDirectory";
// import VerificationDashboard from "./VerificationDashboard";
// import ContactPartner from "./ContactPartner"; 
// import Roadmap from "./Roadmap";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Removed PAGES object and _getCurrentPage function as they are not used in this structure

// Simplified routing structure using Routes directly within Layout
function PagesContent() { 
    return (
        <Layout>
            <Routes>            
                <Route path="/" element={<HomePage />} />
                {/* Removed /mobility, /healthcare, /community, /contact routes */}
                <Route path="/join" element={<MembershipPage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add login route */} 
                <Route path="/explore-membership" element={<ExploreMembershipPage />} /> {/* Use the imported component */}
                <Route path="/apply" element={<ApplyPage />} /> {/* Add route for ApplyPage */}
                
                {/* Add a catch-all or Not Found route if desired */}
                 <Route path="*" element={<HomePage />} /> {/* Default to home for now */}
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

// Removed old createPageUrl and routes array export