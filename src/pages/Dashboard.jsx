import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Globe,
  HeartPulse,
  Users,
  ArrowRight,
  CalendarDays,
  MessageSquare
} from "lucide-react";
import { useChatbot } from '@/context/ChatbotContext'; // Import context hook

// Removed placeholder stories array

export default function Dashboard() {
  const { openChatbot } = useChatbot(); // Get openChatbot function from context

  return (
    <div className="font-poppins">
      {/* Hero Section - Updated for Private Network Theme */}
      <section className="bg-brand-deep-blue text-brand-background text-center py-24 md:py-40 px-4"> {/* Dark background, light text */}
        <h1 className="text-4xl md:text-6xl font-bold mb-5 animation-fadeIn">
           The Private Network for a Sovereign Life
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-10 animation-fadeIn" style={{ animationDelay: '0.2s' }}> {/* Adjusted text color */}
           Charter is a highly vetted private network of individuals who treasure the values freedom and sovereignty for themselves and their families...
        </p>
        <Link to="/explore-membership"> {/* Link to the new page */}
            <Button
              variant="secondary" // Use a contrasting style, adjust as needed
              className="bg-brand-burnt-orange hover:bg-brand-burnt-orange-dark text-white px-12 py-5 text-2xl transition-colors duration-300 animation-fadeIn rounded-md font-semibold" // Increased padding (px-12, py-5) and text size (text-2xl)
              style={{ animationDelay: '0.4s' }}
            >
              Learn More <ArrowRight className="ml-3 h-7 w-7" /> {/* Adjusted icon margin/size */}
            </Button>
        </Link>
      </section>

      {/* Pillars Section - Updated Titles, Order, and Style */}
      <section className="py-20 md:py-28 px-4 bg-brand-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-left pt-8"> {/* Added padding-top to compensate for removed heading margin */}
          {[
             // 1. Thriving Community -> Monthly Engagement (Moved first)
            { 
              title: "Monthly Engagement", 
              description: "Connect with like-minded individuals in curated groups for deep discussions on sovereignty, from healthcare to global mobility, fostering knowledge and bonds that inspire and empower.", // New Description
              icon: Users 
            }, 
            // 2. Global Mobility -> Digital Community (Moved second)
            { 
              title: "Digital Community", 
              description: "Engage in our vibrant online channels, where members share insights, resources, and strategies on business, asset protection, and family-focused living, anytime, anywhere.", // New Description
              icon: Globe 
            },
            // 3. Healthcare -> In-Person Events & Retreats (Moved third)
            { 
              title: "In-Person Events & Retreats", // Updated title
              description: "Experience transformative gatherings and retreats, designed to deepen connections and explore sovereign solutions in inspiring, exclusive settings.", // New Description
              icon: HeartPulse 
            }
          ].map((pillar, index) => (
            // Reverted styling: white background, dark text, kept top border
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg animation-fadeIn border-t-4 border-brand-burnt-orange" style={{ animationDelay: `${0.1 * index}s` }}> 
              <pillar.icon className="h-10 w-10 text-brand-burnt-orange mb-5" /> 
              <h3 className="text-xl font-semibold text-brand-deep-blue mb-3">{pillar.title}</h3> {/* Dark text for title */}
              <p className="text-base text-gray-600">{pillar.description}</p> {/* Standard dark gray text for description */}
            </div>
          ))}
        </div>
      </section>

      {/* Community Proof Section - Replaced Stories */}
      {/* 
      <section className="bg-white py-20 md:py-28 px-4">
         <h2 className="text-3xl md:text-4xl font-bold text-brand-deep-blue text-center mb-16 animation-fadeIn">Journeys Within the Collective</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-1 gap-10"> 
           <div className="bg-brand-deep-blue text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center text-center animation-fadeIn border-l-4 border-brand-burnt-orange" style={{ animationDelay: `0.1s` }}> 
              <CalendarDays className="h-12 w-12 text-brand-burnt-orange mb-4"/>
              <h3 className="text-xl font-semibold mb-3">Exclusive Events & Insights</h3>
              <p className="text-base text-gray-300 mb-5">Join monthly strategy Zooms and unique in-person retreats designed to accelerate your freedom journey.</p>
              <Link to="/community"> 
                 <Button variant="outline" className="text-white border-white hover:bg-white hover:text-brand-deep-blue">
                   Learn More
                 </Button>
              </Link>
           </div>
        </div>
      </section>
      */}
    </div>
  );
}