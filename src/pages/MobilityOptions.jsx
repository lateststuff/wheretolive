import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, Palmtree, Globe, ArrowRight } from "lucide-react";

export default function MobilityOptions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f8ff] to-white p-6 md:p-8">
      <div className="max-w-[900px] mx-auto my-[30px]">
        {/* Header */}
        <h1 className="font-['Poppins'] text-[28px] text-[#003087] text-center font-bold">
          Your Options for Living Abroad
        </h1>
        <p className="font-['Poppins'] text-[16px] text-[#444] text-center mb-[30px]">
          Whether you're retiring, seeking a backup passport, or working remotely, explore options to live where you thrive.
        </p>

        {/* Goal-Based Cards */}
        {[
          {
            title: "Retire in Paradise",
            description: "Affordable visas for sunny, relaxed living.",
            image: "https://images.unsplash.com/photo-1471400974796-1c823d00a96f",
            examples: [
              "Malta: $2,000/month, English-speaking",
              "Spain Non-Lucrative Visa: Proof of funds"
            ],
            cta: "Find Your Retirement Path",
            icon: <Palmtree className="h-6 w-6" />
          },
          {
            title: "Secure a Backup Passport",
            description: "Gain peace of mind with a second citizenship.",
            image: "https://images.unsplash.com/photo-1484959014842-cd1d967a39cf",
            examples: [
              "Nauru CBI: $105,000, visa-free to Singapore",
              "Italian Citizenship by Descent: $5,000–$15,000"
            ],
            cta: "Explore Backup Options",
            icon: <Globe className="h-6 w-6" />
          },
          {
            title: "Work Remotely",
            description: "Find digital nomad visas for your next adventure.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            examples: [
              "Portugal Digital Nomad Visa: €3,000/year income",
              "Thailand LTR Visa: $1,500/month"
            ],
            cta: "Start Your Nomad Journey",
            icon: <PlaneTakeoff className="h-6 w-6" />
          }
        ].map((section, index) => (
          <Card key={index} className="mb-5 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5">
              <img 
                src={section.image} 
                alt={section.title}
                className="w-full h-[200px] object-cover opacity-90 rounded-lg mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                {section.icon}
                <h2 className="font-['Poppins'] text-[24px] text-[#003087] font-semibold">
                  {section.title}
                </h2>
              </div>
              <p className="font-['Poppins'] text-[16px] text-[#444] mb-4">
                {section.description}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                {section.examples.map((example, i) => (
                  <p key={i} className="font-['Poppins'] text-[14px] text-[#444] mb-2">
                    • {example}
                  </p>
                ))}
              </div>
              <Button 
                className="w-full bg-white text-[#0057b8] border border-[#0057b8] hover:bg-[#0057b8] hover:text-white transition-colors"
                // onClick={() => window.location.href = 'https://app--ai-passport-advisor-9c5ee3a1.base44.app/chatbot'}
              >
                {section.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Success Stories */}
        <div className="my-[30px]">
          <h2 className="font-['Poppins'] text-[24px] text-[#003087] font-semibold mb-4">
            Success Stories
          </h2>
          <Card className="mb-4 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5">
              <h3 className="font-['Poppins'] text-[18px] text-[#003087] mb-3">Maria's Spanish Retirement</h3>
              <p className="font-['Poppins'] text-[14px] text-[#444]">
                "Moving to Spain with the Non-Lucrative Visa was simpler than I imagined. Now I enjoy morning walks along 
                the Mediterranean and fresh market visits. The healthcare system is excellent, and my pension goes further here."
              </p>
            </CardContent>
          </Card>
          <Card className="hover:scale-105 transition-transform duration-300">
            <CardContent className="p-5">
              <h3 className="font-['Poppins'] text-[18px] text-[#003087] mb-3">Alex's Digital Nomad Life</h3>
              <p className="font-['Poppins'] text-[14px] text-[#444]">
                "Portugal's D7 visa let me work remotely while exploring Europe. The tech scene in Lisbon is vibrant, 
                cost of living is reasonable, and the local community is incredibly welcoming."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Guides */}
        <div className="my-[30px]">
          <h2 className="font-['Poppins'] text-[24px] text-[#003087] font-semibold mb-4">
            Quick Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <Palmtree className="h-8 w-8 text-[#0057b8]" />
                <div>
                  <h3 className="font-['Poppins'] text-[18px] text-[#003087] mb-1">Top 5 Retirement Destinations</h3>
                  <p className="font-['Poppins'] text-[14px] text-[#444]">Compare costs, healthcare, and lifestyle options</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <Globe className="h-8 w-8 text-[#0057b8]" />
                <div>
                  <h3 className="font-['Poppins'] text-[18px] text-[#003087] mb-1">Guide to Backup Passports</h3>
                  <p className="font-['Poppins'] text-[14px] text-[#444]">Understanding citizenship-by-investment programs</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center mt-[30px]">
          <h3 className="text-[18px] font-semibold text-[#003087] mb-4">Ready to take the next step?</h3>
          <Button 
            className="bg-[#0057b8] hover:bg-[#003087]"
            // onClick={() => window.location.href = 'https://app--ai-passport-advisor-9c5ee3a1.base44.app/contact'}
          >
            Connect with a Mobility Specialist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
