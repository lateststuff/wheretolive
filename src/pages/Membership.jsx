import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MembershipPage() {
  // Removed showTypeform state

  // Data for the pricing card
  const membershipTier = {
    name: "Charter Membership",
    price: "$200",
    frequency: "/month",
    features: [
      "Monthly 2-hour Zoom gatherings for curated discussions on sovereignty",
      "Private messaging channel for ongoing community support and resource sharing",
      "Exclusive guest talks by experts in healthcare, education, mobility, and business",
      "Business networking to connect with freedom-focused entrepreneurs and professionals"
    ],
    ctaText: "Apply Now",
    ctaLink: "/apply"
  };

  return (
    <div className="bg-brand-background font-sans text-gray-800 min-h-[calc(100vh-10rem)] flex items-center justify-center"> 
      <section className="max-w-4xl w-full mx-auto py-16 px-5 text-center"> 
        <h1 className="text-4xl font-bold text-brand-deep-blue mb-5"> 
          Join Charter Today
        </h1>
        
        <>
          <p className="text-xl leading-relaxed mb-10 text-gray-700 max-w-2xl mx-auto"> 
            Charter is your private network for living free—uniting freedom-loving individuals and families to reclaim sovereignty in every aspect of life. For just $200/month, gain access to a curated community and exclusive resources to thrive personally and professionally.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 mx-auto max-w-lg border border-gray-200"> 
            <h2 className="text-2xl font-semibold text-brand-deep-blue mb-2"> 
              {membershipTier.name}
            </h2>
            <p className="text-4xl font-bold text-brand-deep-blue my-3"> 
              {membershipTier.price}
              {membershipTier.frequency && 
                <span className="text-base font-normal text-gray-500 ml-1">{membershipTier.frequency}</span>
              }
            </p>
            <ul className="list-none p-0 mb-6 text-left"> 
              {membershipTier.features.map((feature, index) => (
                <li key={index} className="text-base text-gray-600 mb-3 pl-6 relative"> 
                  <Check className="h-5 w-5 text-brand-deep-blue absolute left-0 top-0.5" /> 
                  {feature}
                </li>
              ))}
            </ul>
            <Link 
              to={membershipTier.ctaLink} 
              className="inline-block bg-brand-deep-blue hover:bg-opacity-90 text-white py-3 px-8 rounded-md text-lg font-semibold transition-colors duration-300 font-poppins no-underline"
            >
              {membershipTier.ctaText}
            </Link>
          </div>
        </>
      </section>
    </div>
  );
} 