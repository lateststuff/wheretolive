import React from 'react';
// import ReactMarkdown from 'react-markdown'; // Removed as markdown content is replaced

// Renamed component to reflect new structure
function MobilitySection({ title, cards, guides }) {
  const placeholderLink = "#"; // Placeholder for links

  return (
    <div className="mobility-section mb-12">
      <h2 className="text-2xl font-bold text-brand-deep-blue mb-6 border-l-4 border-brand-gold pl-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 text-center animation-fadeIn border border-gray-200" style={{ animationDelay: `${0.05 * index}s` }}>
            <h3 className="text-md font-semibold text-brand-deep-blue mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>
            <a href={placeholderLink} className="text-sm text-brand-gold hover:text-brand-gold-dark font-semibold">
              Learn More
            </a>
          </div>
        ))}
      </div>
      {guides && (
        <div className="guides-section mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="text-md font-semibold text-brand-deep-blue mb-3">Explore Guides</h4>
          <ul className="list-disc list-inside space-y-1">
            {guides.map((guide, index) => (
              <li key={index}>
                <a href={placeholderLink} className="text-sm text-brand-deep-blue hover:text-brand-gold hover:underline">
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

// Data for Mobility Page Sections
const citizenshipData = {
  title: "Secure a Second Citizenship",
  cards: [
    { title: "Second Passport", description: "Gain a backup passport for peace of mind and global travel freedom." },
    { title: "Citizenship by Investment", description: "Invest in a new citizenship, like St. Kitts ($250,000, 157 visa-free countries)." },
    { title: "Citizenship by Ancestry", description: "Claim citizenship through heritage, like Italy ($5,000–$15,000, EU access)." },
    { title: "Dual Citizenship Benefits", description: "Enjoy security and flexibility with multiple passports." },
    { title: "EU Citizenship", description: "Access EU passports via Malta (€600,000) or Portugal (€500,000)." }
  ],
  guides: [
    "Second Passport Basics",
    "CBI Programs Compared",
    "Tracing Your Ancestry for Citizenship",
    "Why Dual Citizenship Matters",
    "Paths to EU Citizenship"
  ]
};

const residenceData = {
  title: "Build a Second Residence",
  cards: [
    { title: "Second Residence", description: "Establish a new home abroad with flexible residency options." },
    { title: "Golden Visas", description: "Secure residency via investment, like Portugal (€500,000, EU access)." },
    { title: "Residence by Investment", description: "Invest in residency, like Greece (€400,000, no stay required)." },
    { title: "EU Residence", description: "Live in Europe with programs like Spain's Non-Lucrative Visa." },
    { title: "Tax Residence", description: "Optimize taxes with residencies like Panama ($300,000, 0% tax)." }
  ],
  guides: [
    "Why a Second Residence?",
    "Golden Visa Essentials",
    "RBI Program Breakdown",
    "Living in the EU",
    "Tax-Friendly Residencies"
  ]
};

const nomadData = {
  title: "Embrace a Nomad Lifestyle",
  cards: [
    { title: "Flag Theory", description: "Spread your life across countries for freedom and flexibility." },
    { title: "Lifestyle Design", description: "Craft a global life that matches your passions and goals." },
    { title: "Plan B Strategy", description: "Create a backup plan with residencies and citizenships." },
    { title: "Hiring Overseas", description: "Build a global team to support your nomad ventures." },
    { title: "Living in Eastern Europe", description: "Discover affordable, vibrant hubs like Portugal or Georgia." }
  ],
  guides: [
    "Flag Theory Explained",
    "Designing Your Nomad Life",
    "Building a Plan B",
    "Hiring Globally",
    "Why Eastern Europe?"
  ]
};

export default function MobilityPage() { // Renamed from MobilityOptions
  return (
    <div className="p-6 md:p-12 font-poppins bg-brand-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-deep-blue text-center mb-10 animation-fadeIn">
          Global Mobility Pathways
        </h1>

        <MobilitySection {...citizenshipData} />
        <MobilitySection {...residenceData} />
        <MobilitySection {...nomadData} />

        {/* Removed the old MobilityCardsSection and ReactMarkdown section */}
      </div>
    </div>
  );
}

// Note: The CSS classes defined in the previous HTML (.container, .section, .card-grid, .card, .guides etc.) 
// might need adjustment or removal from index.css if they conflict with this new Tailwind structure.
// The component MobilityCardsSection previously added is now removed as its content is integrated here.
