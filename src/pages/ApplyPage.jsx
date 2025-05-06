import React, { useEffect } from 'react';

export default function ApplyPage() {

  // Effect to load Typeform script (runs once on mount)
  useEffect(() => {
    const scriptId = 'typeform-embed-script';
    // Check if script already exists
    if (document.getElementById(scriptId)) {
      return; 
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="bg-brand-background font-sans text-gray-800 min-h-[calc(100vh-10rem)] flex items-center justify-center py-12">
      <section className="w-full max-w-4xl mx-auto px-5 text-center">
        <h1 className="text-4xl font-bold text-brand-deep-blue mb-8">
          Apply to Charter
        </h1>
        {/* Typeform Embed Div */}
        <div 
           data-tf-live="01JTHJ4KEK5GRZE57WDJSE1QXE"
           data-tf-hide-headers // Optional: hide Typeform headers
           data-tf-hide-footer // Optional: hide Typeform footer
           style={{ width: '100%', height: '650px' }} // Adjust height as needed
        ></div>
      </section>
    </div>
  );
} 