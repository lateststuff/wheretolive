import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming Shadcn UI Textarea

export default function ContactPage() {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder: This would eventually trigger an API call to backend
    // to send the message (e.g., via email or save to DB).
    console.log("Contact Form Submitted - Placeholder");
    alert("Message submitted (Placeholder - No backend integration)");
    // Optionally clear the form
    event.target.reset(); 
  };

  return (
    <div className="p-6 md:p-12 font-['Poppins']">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#003087] text-center mb-4 animation-fadeIn">
          Contact Our Experts
        </h1>
        <p className="text-center text-neutral-600 mb-10 max-w-xl mx-auto animation-fadeIn" style={{ animationDelay: '0.1s' }}>
          Have specific questions about your situation or need bespoke strategy? Fill out the form below to connect with a specialist.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg animation-fadeIn" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-neutral-700">Full Name</Label>
              <Input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0057b8] focus:ring focus:ring-[#0057b8] focus:ring-opacity-50 text-base" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address</Label>
              <Input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0057b8] focus:ring focus:ring-[#0057b8] focus:ring-opacity-50 text-base" />
            </div>
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</Label>
              <Textarea 
                 id="message" 
                 name="message" 
                 rows={5} 
                 required 
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0057b8] focus:ring focus:ring-[#0057b8] focus:ring-opacity-50 text-base"
                 placeholder="Describe your goals or questions..."
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-[#0057b8] hover:bg-[#003087] text-white text-lg py-3 px-4 rounded-md transition-colors duration-300">
                Connect with Experts
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 