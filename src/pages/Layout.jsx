import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ChatbotWidget from "@/components/ChatbotWidget";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu } from 'lucide-react';
import { useChatbot } from '@/context/ChatbotContext';

export default function Layout({ children }) {
  // Use deep blue for active link
  const activeClassName = "text-brand-deep-blue font-semibold"; 
  const { isChatbotVisible, openChatbot, closeChatbot } = useChatbot(); 

  return (
    <div className="min-h-screen flex flex-col font-poppins bg-brand-background">
      {/* Header: Dark Background */}
      <header className="bg-brand-deep-blue shadow-md sticky top-0 z-50 border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center relative">
          {/* Left side: Styled Text Logo */}
          <div className="flex items-center"> 
            {/* Removed Menu Button, Added styled text */}
             <Link to="/" className="text-2xl font-serif italic font-medium text-brand-background hover:text-gray-300">
               Charter
             </Link>
          </div>

          {/* Center: Stylized C Logo - Now a Link */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Wrapped span in Link */}
              <Link to="/">
                 <span className="text-3xl font-bold text-brand-background font-serif italic hover:text-gray-300 transition-colors">C</span> 
              </Link>
          </div>

          {/* Right side: Apply/Login Buttons */}
          <div className="flex items-center space-x-4">
             <Link to="/login">
               <Button variant="outline" className="text-brand-burnt-orange border-brand-burnt-orange border-2 hover:bg-brand-burnt-orange hover:text-brand-deep-blue text-sm">
                 Login
               </Button>
             </Link>
             <Link to="/join">
                <Button className="bg-brand-burnt-orange hover:bg-brand-burnt-orange-dark text-white text-sm">
                  Apply
                </Button>
             </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {children} 
      </main>

      {/* Updated Footer Colors */}
      <footer className="bg-brand-deep-blue text-gray-300 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="md:col-span-1">
              {/* Footer Brand - Styled like header text */}
              <h3 className="text-lg font-semibold text-brand-burnt-orange mb-4 font-serif italic font-medium">
                  Charter
              </h3> 
            </div>
            <div>
              <ul className="space-y-2 mt-2">
                 {/* Updated Footer Links - Removed Login, Changed FAQ text, Reordered */}
                 {/* Removed Login link */}
                 <li><a href="/explore-membership" className="text-sm text-gray-300 hover:text-brand-burnt-orange hover:underline">About Us</a></li> {/* Changed text from FAQ */}
                 <li><a href="/join" className="text-sm text-gray-300 hover:text-brand-burnt-orange hover:underline">Apply</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center md:text-left">
             {/* Updated Copyright line */}
             <p className="text-sm text-gray-400 mb-1">
              © {new Date().getFullYear()} Charter. All rights reserved. 
            </p>
          </div>
         </div>
      </footer>

      {/* FAB - Use burnt orange */}
      {!isChatbotVisible && (
          <Button 
            onClick={openChatbot}
            className="fixed bottom-4 right-4 z-40 bg-brand-burnt-orange hover:bg-brand-burnt-orange-dark text-white rounded-full w-14 h-14 shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
      )}

      {/* ChatbotWidget - Colors updated separately */}
      <ChatbotWidget 
        isVisible={isChatbotVisible} 
        onClose={closeChatbot}
      />
    </div>
  );
}
