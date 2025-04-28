import React from 'react';

export default function ContactPartner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light to-white p-6 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-brand-blue-dark mb-4">
          Connect with an Expert Partner
        </h1>
        <p className="text-neutral-700 mb-6">
          You're one step closer! Please fill out the form below, and a relevant partner specialist 
          will contact you shortly to discuss your specific needs and how they can assist with your application.
        </p>
        
        {/* Placeholder for the actual form */}
        <div className="border border-dashed border-neutral-300 p-8 rounded-md text-center text-neutral-500">
          <p>(Contact Form will go here)</p>
          <p className="text-sm mt-2">Includes: First Name, Last Name, Email, LinkedIn (optional), Inquiry Type</p>
        </div>

        {/* Add a button or link to go back? */}
        {/* <button onClick={() => window.history.back()} className="mt-6 text-sm text-brand-blue hover:underline"> 
          &larr; Go Back
        </button> */}
      </div>
    </div>
  );
} 