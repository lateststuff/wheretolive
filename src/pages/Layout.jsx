import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>

      {/* Revamped Footer */}
      <footer className="bg-neutral-100 border-t mt-auto py-12"> {/* Increased padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Columns for links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"> {/* Use grid for columns */}
            {/* Column 1: Brand/Intro (Optional) */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold text-brand-blue-dark mb-4">Unlock Your Life</h3>
              <p className="text-sm text-neutral-600">
                 Guiding your journey to global mobility and freedom.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="font-semibold text-neutral-800 mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-sm text-neutral-600 hover:text-brand-blue hover:underline">Home</a></li>
                <li><a href="/mobilityoptions" className="text-sm text-neutral-600 hover:text-brand-blue hover:underline">Mobility Options</a></li>
                <li><a href="/about" className="text-sm text-neutral-600 hover:text-brand-blue hover:underline">About Us</a></li>
                {/* Add other main page links here if needed */}
              </ul>
            </div>

            {/* Column 3: Resources/Contact (Optional) */}
            <div>
              <h4 className="font-semibold text-neutral-800 mb-4">Resources</h4>
              <ul className="space-y-2">
                 <li><a href="/contact-partner" className="text-sm text-neutral-600 hover:text-brand-blue hover:underline">Contact Expert</a></li>
                 {/* Add links to guides, blog etc. here */}
                 <li><a href="/mobilityoptions" className="text-sm text-neutral-600 hover:text-brand-blue hover:underline">Guides</a></li> 
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright and Disclaimer */}
          <div className="border-t border-neutral-300 pt-6 text-center md:text-left">
             <p className="text-sm text-neutral-700 mb-1">
              © {new Date().getFullYear()} Unlock Your Life. All rights reserved.
            </p>
            <p className="text-xs text-neutral-500">
              Disclaimer: Information provided is for guidance only and does not constitute legal or immigration advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
