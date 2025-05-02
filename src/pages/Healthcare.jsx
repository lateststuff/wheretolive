import React from 'react';

// Placeholder data - Replace with actual content
const telemedicineData = {
  title: "Telemedicine Access",
  cards: [
    { title: "Global Teladoc", description: "Access board-certified doctors globally via Teladoc." },
    { title: "Specialist Consultations", description: "Get second opinions from international specialists." },
  ],
  guides: ["Global Healthcare Options", "Navigating International Telemedicine"]
};
const drugProcurementData = {
  title: "Affordable Drug Procurement",
  cards: [
    { title: "CostPlus Drugs Connection", description: "Access lower-cost generics via partners like CostPlus Drugs." },
    { title: "Indian Pharmacy Network", description: "Source affordable medications from reputable Indian pharmacies." },
  ],
  guides: ["Guide to International Pharmacies", "Saving on Prescription Drugs Abroad"]
};
const insuranceData = {
  title: "Insurance Navigation",
  cards: [
    { title: "Cigna Global Plans", description: "Explore comprehensive international health insurance plans." },
    { title: "SafetyWing Nomad Insurance", description: "Coverage designed specifically for digital nomads." },
  ],
  guides: ["Choosing the Right Expat Health Insurance", "Emergency Medical Planning for Travelers"]
};

// Reusable Section Component (Similar to Mobility Page)
function HealthcareSection({ title, cards, guides }) {
  const placeholderLink = "#";
  return (
    <div className="healthcare-section mb-12">
      <h2 className="text-2xl font-bold text-[#003087] mb-6 border-l-4 border-[#0057b8] pl-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 animation-fadeIn" style={{ animationDelay: `${0.05 * index}s` }}>
            <h3 className="text-md font-semibold text-[#003087] mb-2">{card.title}</h3>
            <p className="text-sm text-[#444] mb-4">{card.description}</p>
            <a href={placeholderLink} className="text-sm text-[#0057b8] hover:underline font-semibold">
              Learn More
            </a>
          </div>
        ))}
      </div>
      {guides && (
         <div className="guides-section mt-6 bg-blue-50 p-4 rounded-lg">
          <h4 className="text-md font-semibold text-[#003087] mb-3">Explore Guides</h4>
          <ul className="list-disc list-inside space-y-1">
            {guides.map((guide, index) => (
              <li key={index}>
                <a href={placeholderLink} className="text-sm text-[#0057b8] hover:underline">
                  {guide}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function HealthcarePage() {
  return (
    <div className="p-6 md:p-12 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003087] text-center mb-10 animation-fadeIn">
          Global Healthcare Solutions
        </h1>
        
        <HealthcareSection {...telemedicineData} />
        <HealthcareSection {...drugProcurementData} />
        <HealthcareSection {...insuranceData} />

      </div>
    </div>
  );
} 