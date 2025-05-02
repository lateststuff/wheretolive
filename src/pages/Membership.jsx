import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have Shadcn UI Input
import { Label } from "@/components/ui/label"; // Assuming you have Shadcn UI Label
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming Shadcn UI

// Placeholder data for tiers
const tiers = [
  {
    name: "Basic",
    price: "$99",
    frequency: "/month",
    features: [
      "AI-Powered Guidance Reports",
      "Access to Community Forums",
      "Curated Guides & Checklists",
      "Monthly Member Newsletter"
    ],
    cta: "Choose Basic"
  },
  {
    name: "Premium",
    price: "$499",
    frequency: "/month",
    features: [
      "All Basic Features",
      "2 Expert Consultations per Year",
      "Priority Forum Access",
      "Downloadable Templates",
      "Early Access to Webinars"
    ],
    cta: "Choose Premium",
    popular: true
  },
  {
    name: "Elite",
    price: "$1,999",
    frequency: "/month",
    features: [
      "All Premium Features",
      "Unlimited Expert Consultations",
      "Dedicated Account Manager",
      "Bespoke Strategy Sessions",
      "Invitations to Private Retreats"
    ],
    cta: "Choose Elite"
  }
];

export default function MembershipPage() {

  const handleSignUp = (event) => {
    event.preventDefault();
    // Placeholder: This would eventually trigger API call to backend
    // for user creation and Stripe checkout session generation.
    console.log("Sign Up Submitted - Placeholder");
    alert("Sign up form submitted (Placeholder - No backend integration)");
  };

  return (
    <div className="p-6 md:p-12 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003087] text-center mb-4 animation-fadeIn">
          Join the Freedom Collective
        </h1>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto animation-fadeIn" style={{ animationDelay: '0.1s' }}>
          Choose the plan that best fits your journey towards global freedom and enhanced living.
        </p>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <div key={tier.name} className={`bg-white p-8 rounded-lg shadow-lg border ${tier.popular ? 'border-[#0057b8] border-2' : 'border-gray-200'} flex flex-col animation-fadeIn`} style={{ animationDelay: `${0.1 * index}s` }}>
              {tier.popular && <span className="text-center text-xs font-semibold text-white bg-[#0057b8] py-1 px-3 rounded-full self-center mb-4 -mt-10">Most Popular</span>}
              <h3 className="text-xl font-semibold text-[#003087] text-center mb-2">{tier.name}</h3>
              <p className="text-center text-3xl font-bold text-neutral-800 mb-1">{tier.price}<span className="text-sm font-normal text-neutral-500">{tier.frequency}</span></p>
              <ul className="space-y-3 text-sm text-neutral-600 my-6 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Placeholder Button - Links to sign-up form below for now */}
              <Button 
                 onClick={() => document.getElementById('sign-up-form')?.scrollIntoView({ behavior: 'smooth' })}
                 className={`w-full mt-auto ${tier.popular ? 'bg-[#0057b8] hover:bg-[#003087] text-white' : 'bg-white text-[#0057b8] border border-[#0057b8] hover:bg-blue-50'} transition-colors duration-300 py-2 px-4 rounded text-md font-semibold`}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Sign-up Form Placeholder */}
        <div id="sign-up-form" className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg animation-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-semibold text-[#003087] text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-neutral-700">Full Name</Label>
              <Input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0057b8] focus:ring focus:ring-[#0057b8] focus:ring-opacity-50" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address</Label>
              <Input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0057b8] focus:ring focus:ring-[#0057b8] focus:ring-opacity-50" />
            </div>
            <div>
              <Label className="text-sm font-medium text-neutral-700">Choose Your Tier</Label>
              <RadioGroup defaultValue="Premium" name="tier" className="mt-2 space-y-2">
                {tiers.map(tier => (
                  <div key={tier.name} className="flex items-center">
                     <RadioGroupItem value={tier.name} id={`tier-${tier.name}`} />
                     <Label htmlFor={`tier-${tier.name}`} className="ml-2 text-sm text-neutral-600">{tier.name} ({tier.price}{tier.frequency})</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {/* Stripe integration would replace/enhance this part */}
            <div>
              <Button type="submit" className="w-full bg-[#0057b8] hover:bg-[#003087] text-white text-lg py-3 px-4 rounded-md transition-colors duration-300">
                Join Now & Proceed to Payment
              </Button>
            </div>
            <p className="text-xs text-center text-neutral-500">Secure payment processing via Stripe (Integration required).</p>
          </form>
        </div>

      </div>
    </div>
  );
} 