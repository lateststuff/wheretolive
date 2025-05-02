import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Plane } from 'lucide-react'; // Example icons

export default function CommunityPage() {
  return (
    <div className="p-6 md:p-12 font-['Poppins']">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003087] text-center mb-10 animation-fadeIn">
          Connect with the Collective
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Forums Card */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center animation-fadeIn">
            <MessageSquare className="h-12 w-12 text-[#0057b8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#003087] mb-2">Member Forums</h3>
            <p className="text-sm text-[#444] mb-4">Share experiences, ask questions, and connect on topics like CBI, residency, and lifestyle design.</p>
            {/* Link might require auth check later */}
            <a href="#" className="text-sm text-[#0057b8] hover:underline font-semibold">Access Forums</a>
          </div>

          {/* Webinars Card */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center animation-fadeIn" style={{ animationDelay: '0.1s' }}>
            <Video className="h-12 w-12 text-[#0057b8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#003087] mb-2">Expert Webinars</h3>
            <p className="text-sm text-[#444] mb-4">Join live Q&As and workshops on tax optimization, investment strategies, and healthcare navigation.</p>
            <a href="#" className="text-sm text-[#0057b8] hover:underline font-semibold">View Schedule</a>
          </div>

          {/* Retreats Card */}
          <div className="bg-white p-8 rounded-lg shadow-md text-center animation-fadeIn" style={{ animationDelay: '0.2s' }}>
            <Plane className="h-12 w-12 text-[#0057b8] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#003087] mb-2">Global Retreats</h3>
            <p className="text-sm text-[#444] mb-4">Meet fellow members and experts at exclusive events in locations like Dubai, Lisbon, and Medellin.</p>
            <a href="#" className="text-sm text-[#0057b8] hover:underline font-semibold">Learn About Events</a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#003087] mb-4">Ready to Join the Conversation?</h2>
          <Link to="/join">
            <Button className="bg-[#0057b8] hover:bg-[#003087] text-white px-8 py-3 text-lg transition-colors duration-300">
              Join to Connect
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 