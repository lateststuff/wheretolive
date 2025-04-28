import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdownContent = `
####Discover Your Path to Living Abroad

**Your dream of living abroad is within reach.** Whether you're retiring in paradise, securing a backup passport, working as a digital nomad, or relocating your family, the world is competing to welcome you with open arms. Governments are offering unprecedented tax breaks, lifestyle perks, and freedom to attract talent and wealth—but these opportunities are disappearing fast. In 2025, the window to act is closing as programs double in price or vanish entirely. Let us guide you to the best citizenship and residency options, tailored to your unique goals, before it's too late.

---

### Why Move Abroad Now?

The global mobility landscape is shifting rapidly. Programs accessible just three years ago are gone or far costlier today. By acting in 2025, you can secure life-changing options—visa-free travel, tax savings, or a safe haven—that may be unavailable in 12–18 months. Our expert insights, drawn from years of personal experience and client success, reveal the top programs worldwide, region by region, to help you live where you thrive.

---

### Explore Your Options by Goal

#### Retire in Paradise
Dreaming of sunny beaches or charming villages? Affordable retirement visas let you live comfortably abroad, with access to healthcare, culture, and community.

- **Malta**: $2,000/month, English-speaking, Mediterranean lifestyle.
- **Spain Non-Lucrative Visa**: Proof of funds, Schengen travel.
- **Malaysia MM2H**: $40,000 deposit, multicultural hub.

**Start Your Retirement Journey**: Chat with our AI to find your ideal destination.

#### Secure a Backup Passport
Protect your future with a second citizenship, offering peace of mind and global access in uncertain times.

- **St. Kitts and Nevis**: $250,000 donation, 157 visa-free countries, 0% income tax.
- **Dominica**: $200,000 donation, affordable CBI, immediate citizenship.
- **Malta**: €600,000 contribution, EU passport in 12–36 months.

**Explore Backup Options**: Chat with our AI to secure your safety net.

#### Work Remotely as a Digital Nomad
Live and work from vibrant destinations with visas designed for remote professionals seeking adventure and flexibility.

- **Portugal Digital Nomad Visa**: €3,000/year income, EU lifestyle.
- **Thailand LTR Visa**: $1,500/month, Southeast Asian hub.
- **Grenada**: $250,000 CBI, US E-2 visa access for nomads.

**Start Your Nomad Journey**: Chat with our AI to find your work-from-anywhere home.

#### Relocate Your Family
Find safe, family-friendly countries with strong education, healthcare, and opportunities for a fresh start.

- **Portugal Golden Visa**: €500,000 fund investment, EU residency, 189 visa-free countries.
- **Canada Start-Up Visa**: $200,000 investment, family relocation path.
- **Uruguay**: $525,000 real estate, citizenship in 3–5 years.

**Plan Your Family's Move**: Chat with our AI to discover family-focused destinations.

---

### Real Stories, Real Success

- **Maria's Retirement Dream**: "I retired in Spain with a Non-Lucrative Visa, enjoying vibrant culture on a budget. The AI guide made it simple!" – Maria, 62, Spain.
- **Alex's Nomad Adventure**: "As a digital nomad, I found Portugal's visa through the chatbot. Now I work from Lisbon's beaches!" – Alex, 34, Portugal.
- **The Smiths' New Home**: "We secured Canada's Start-Up Visa for our family's future. The process felt personal and clear." – The Smiths, Canada.

**Read More Stories**: Explore our guide to living abroad.

---

### Quick Guides to Get You Started

- **Top 5 Retirement Destinations**: Discover affordable, sunny havens for your golden years.
- **Guide to Backup Passports**: Learn how to secure a second citizenship for peace of mind.
- **Digital Nomad Essentials**: Find the best visas for remote work and global adventures.

**Dive Into Our Guides**: Explore options.

---

### Why Act in 2025?

The clock is ticking. Governments are raising prices and closing programs under global pressure:
- Spain ended its Golden Visa (April 2025).
- Portugal removed real estate from its Golden Visa.
- Caribbean CBI costs are rising rapidly.
- Italy is limiting citizenship by descent.

In 2–3 years, today's $250,000 options could cost $1M—or vanish entirely. **Seize your chance now** to live abroad on your terms, with tax benefits, visa-free travel, and unmatched freedom.

---

### Your Next Step: Let's Find Your Path

No matter your reason for moving abroad, our AI guide is here to help. Answer a few simple questions about your goals—retirement, security, or adventure—and get personalized recommendations tailored to your dreams. Ready to take the leap? Connect with a mobility specialist to make it happen.

**Start Your Journey**: Chat with our AI.  
**Connect with a Specialist**: Get in touch.
`;

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg mt-10">
        {/* Add prose classes for Tailwind typography styling */}
        <ReactMarkdown className="prose prose-lg max-w-none">
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
} 