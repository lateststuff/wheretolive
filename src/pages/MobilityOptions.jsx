import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdownContent = `
### Find Your Perfect Place to Live Abroad

**Your vision for a life abroad is closer than you think.** Whether you're planning retirement, seeking a second passport for security, embracing a digital nomad lifestyle, or moving your family, countries worldwide are rolling out the red carpet with tax incentives, vibrant lifestyles, and unparalleled freedom to attract global talent. But these opportunities are fading fast. In 2025, the door is closing as programs become pricier or disappear. Let our AI guide you to the best residency and citizenship options, crafted for your personal dreams, before they're gone.

---

### Why Move Abroad Today?

The global mobility scene is changing at lightning speed. Options available just a few years ago are now extinct or cost double. Acting in 2025 unlocks game-changing benefits—travel freedom, tax relief, or a safe haven—that may vanish in 12–18 months. With years of firsthand experience and client success, we share exclusive insights to help you find your ideal destination.

---

### Discover Your Path by Dream

#### Retire in Bliss
Picture serene beaches or quaint towns. Retirement visas offer affordable, comfortable living with access to healthcare and community.

- **Malta**: $2,000/month, English-speaking, sunny shores.
- **Spain Non-Lucrative Visa**: Proof of funds, Schengen access.
- **Malaysia MM2H**: $40,000 deposit, diverse culture.

**[Begin Your Retirement Adventure: Chat with our AI](/)** to uncover your dream spot.

#### Gain a Second Passport
Ensure your future with a backup citizenship, providing security and global mobility in uncertain times.

- **St. Kitts and Nevis**: $250,000 donation, 157 visa-free countries, 0% income tax.
- **Dominica**: $200,000 donation, budget-friendly CBI, instant citizenship.
- **Malta**: €600,000 contribution, EU passport in 12–36 months.

**[Secure Your Future: Chat with our AI](/)** to explore passport options.

#### Thrive as a Digital Nomad
Work from stunning locales with visas tailored for remote professionals chasing freedom and flexibility.

- **Portugal Digital Nomad Visa**: €3,000/year income, European charm.
- **Thailand LTR Visa**: $1,500/month, Asian vibrancy.
- **Grenada**: $250,000 CBI, US E-2 visa for nomads.

**[Launch Your Nomad Life: Chat with our AI](/)** to find your remote work haven.

#### Build a New Home for Your Family
Choose secure, family-oriented destinations with top schools, healthcare, and opportunities for a fresh start.

- **Portugal Golden Visa**: €500,000 fund, EU residency, 189 visa-free countries.
- **Canada Start-Up Visa**: $200,000 investment, family-friendly path.
- **Uruguay**: $525,000 real estate, citizenship in 3–5 years.

**[Start Your Family's Journey: Chat with our AI](/)** to discover family-focused places.

---

### Inspiring Stories, Real Lives

- **Elena's Golden Years**: "I retired in Spain with a Non-Lucrative Visa, soaking up culture affordably. The AI guide was a game-changer!" – Elena, 60, Spain.
- **Liam's Nomad Quest**: "The chatbot led me to Portugal's Digital Nomad Visa. Now I code from coastal cafes!" – Liam, 30, Portugal.
- **The Chens' Fresh Start**: "Canada's Start-Up Visa gave our family security. The process felt warm and clear." – The Chens, Canada.

**Explore More Stories**: Dive into our guide to living abroad. (Note: This link will need a specific target page)

---

### Handy Guides to Spark Your Journey

- **Top 5 Retirement Havens**: Uncover budget-friendly, sunny escapes for your next chapter.
- **Second Passport Basics**: Master the steps to a backup citizenship for peace of mind.
- **Nomad Visa Essentials**: Discover top visas for remote work and global exploration.

**[Explore Our Guides: Discover your options](/)**

---

### Why 2025 Is Your Year

Time's running out. Countries are hiking costs and shutting programs under global scrutiny:
- Spain axed its Golden Visa (April 2025).
- Portugal dropped real estate from its Golden Visa.
- Caribbean CBI prices are soaring.
- Italy's tightening citizenship by descent.

In a few years, today's $250,000 options could hit $1M—or disappear. **Act now** to live abroad with tax savings, global access, and true freedom.

---

### Take the First Step Today

Whatever drives you to live abroad, our AI guide is here to light the way. Share your dreams—retirement, security, or adventure—and get tailored suggestions to make them real. Ready to move forward? Connect with a mobility expert to bring your vision to life.

**[Begin Your Adventure: Chat with our AI](/)**.  
**Reach Out to an Expert**: Get in touch. (Note: This link will need a specific target page or action)
`;

// New component for the HTML structure translated to JSX
function MobilityCardsSection() {
  const placeholderLink = "#"; // Placeholder for links

  return (
    // Added scoping class and used class names from the provided HTML
    <div className="mobility-cards-section container">
      <h1 className="font-bold">Your Global Mobility Options</h1>
      <p className="intro">Dreaming of a second passport, a new home abroad, or a nomad's freedom? Explore citizenship, residency, and lifestyle paths tailored to your goals with our AI guide and expert advisors.</p>

      <div className="section">
        <h2>Secure a Second Citizenship</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Second Passport</h3>
            <p>Gain a backup passport for peace of mind and global travel freedom.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Citizenship by Investment</h3>
            <p>Invest in a new citizenship, like St. Kitts ($250,000, 157 visa-free countries).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Citizenship by Ancestry</h3>
            <p>Claim citizenship through heritage, like Italy ($5,000–$15,000, EU access).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Dual Citizenship Benefits</h3>
            <p>Enjoy security and flexibility with multiple passports.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>EU Citizenship</h3>
            <p>Access EU passports via Malta (€600,000) or Portugal (€500,000).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
        </div>
        <div className="guides">
          <h4>Explore Citizenship Guides</h4>
          <ul>
            <li><a href={placeholderLink}>Second Passport Basics</a></li>
            <li><a href={placeholderLink}>CBI Programs Compared</a></li>
            <li><a href={placeholderLink}>Tracing Your Ancestry for Citizenship</a></li>
            <li><a href={placeholderLink}>Why Dual Citizenship Matters</a></li>
            <li><a href={placeholderLink}>Paths to EU Citizenship</a></li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h2>Build a Second Residence</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Second Residence</h3>
            <p>Establish a new home abroad with flexible residency options.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Golden Visas</h3>
            <p>Secure residency via investment, like Portugal (€500,000, EU access).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Residence by Investment</h3>
            <p>Invest in residency, like Greece (€400,000, no stay required).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>EU Residence</h3>
            <p>Live in Europe with programs like Spain's Non-Lucrative Visa.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Tax Residence</h3>
            <p>Optimize taxes with residencies like Panama ($300,000, 0% tax).</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
        </div>
        <div className="guides">
          <h4>Explore Residence Guides</h4>
          <ul>
            <li><a href={placeholderLink}>Why a Second Residence?</a></li>
            <li><a href={placeholderLink}>Golden Visa Essentials</a></li>
            <li><a href={placeholderLink}>RBI Program Breakdown</a></li>
            <li><a href={placeholderLink}>Living in the EU</a></li>
            <li><a href={placeholderLink}>Tax-Friendly Residencies</a></li>
          </ul>
        </div>
      </div>

      <div className="section">
        <h2>Embrace a Nomad Lifestyle</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Flag Theory</h3>
            <p>Spread your life across countries for freedom and flexibility.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Lifestyle Design</h3>
            <p>Craft a global life that matches your passions and goals.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Plan B Strategy</h3>
            <p>Create a backup plan with residencies and citizenships.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Hiring Overseas</h3>
            <p>Build a global team to support your nomad ventures.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
          <div className="card">
            <h3>Living in Eastern Europe</h3>
            <p>Discover affordable, vibrant hubs like Portugal or Georgia.</p>
            <a href={placeholderLink}>Learn More</a>
          </div>
        </div>
        <div className="guides">
          <h4>Explore Nomad Guides</h4>
          <ul>
            <li><a href={placeholderLink}>Flag Theory Explained</a></li>
            <li><a href={placeholderLink}>Designing Your Nomad Life</a></li>
            <li><a href={placeholderLink}>Building a Plan B</a></li>
            <li><a href={placeholderLink}>Hiring Globally</a></li>
            <li><a href={placeholderLink}>Why Eastern Europe?</a></li>
          </ul>
        </div>
      </div>

      <div className="cta-section">
        <p>Ready to secure a second passport, new residence, or nomad lifestyle? Our AI guide and expert advisors make it happen.</p>
        <a href={placeholderLink} className="cta-button">Start Your Journey</a>
        {/* Kept inline styles for simplicity for this specific element */}
        <p style={{ fontSize: '16px', marginTop: '10px' }}><a href={placeholderLink} style={{ color: '#0057b8', textDecoration: 'none' }}>Connect with Experts</a></p>
      </div>
    </div>
  );
}

export default function MobilityOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white p-6 md:p-8">
      <MobilityCardsSection />

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg mt-10 prose prose-lg max-w-none">
        <ReactMarkdown>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
