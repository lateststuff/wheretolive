
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f0f8ff, #ffffff);
          min-height: 100vh;
        }

        .brand-title {
          font-family: 'Poppins', sans-serif;
          font-size: 26px;
          font-weight: bold;
          color: #003087;
          letter-spacing: 0.8px;
          text-decoration: none;
          padding: 12px;
          background: #ffffff;
          transition: color 0.3s;
        }
        .brand-title:hover {
          color: #0057b8;
        }

        .nav-link-learning-center {
          font-size: 14px;
          color: #1e40af;
          font-family: 'Poppins', sans-serif;
        }
        .nav-link-learning-center:hover {
          color: #1e293b;
          text-decoration: underline;
        }

        .hero-section {
          background: url('https://images.unsplash.com/photo-uD4qQhE9rY') no-repeat center/cover;
          position: relative;
          min-height: 300px;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255,255,255,0.2);
          opacity: 0.9;
        }

        .start-journey-btn {
          font-size: 18px;
          background: #0057b8;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          transition: background-color 0.3s;
        }
        .start-journey-btn:hover {
          background: #003087;
        }

        .goal-card, .story-card, .guide-card {
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .goal-card:hover, .story-card:hover, .guide-card:hover {
          transform: scale(1.05);
        }

        .chat-now-btn {
          color: #0057b8;
          border-color: #0057b8;
        }
        .chat-now-btn:hover {
          background: #0057b8;
          color: white;
        }

        @media (max-width: 600px) {
          .hero-section {
            min-height: 200px;
          }
          
          .brand-title {
            font-size: 20px;
          }

          .goal-card, .story-card, .guide-card {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-gray-100 border-t mt-12">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <a href="/" className="brand-title">
              Your Guide to Living Abroad
            </a>
            <p className="text-xs text-gray-500">
              We provide informational guidance, not legal advice. Consult professionals for immigration decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
