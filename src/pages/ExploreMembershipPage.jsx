import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ExploreMembershipPage() {
  return (
    <div className="bg-brand-background font-serif text-brand-deep-blue min-h-[calc(100vh-10rem)]">
      <section className="max-w-3xl mx-auto pt-32 pb-16 px-5 text-center">
        <h1 className="text-4xl text-brand-deep-blue mb-5 font-normal">
          Why Charter Exists
        </h1>
        <p className="text-lg leading-relaxed mb-5 text-gray-700">
          We live in an era of relentless pressure to conform—where forces, ideologies, and institutions dictate how we think, speak, raise our children, and live our lives, often clashing with the timeless values of freedom and sovereignty.
        </p>
        <p className="text-lg leading-relaxed mb-5 text-gray-700">
          Good people, striving for the best for their families, find themselves ensnared by the demands of employers, healthcare systems, schools, and financial burdens, with few paths to resist. Alone, individuals and families are vulnerable, facing coercion without{'\u00A0'}recourse.
        </p>
        <p className="text-lg leading-relaxed mb-5 text-gray-700">
          Charter is the antidote—a private, curated network of like-minded souls who treasure autonomy and family. We're not radicals, just ordinary, family-oriented individuals united in our pursuit of a life free from compulsion. Through monthly Zoom gatherings, a vibrant digital community, and exclusive in-person events and retreats, we share knowledge, resources, and opportunities to reclaim sovereignty.
        </p>
        <p className="text-lg leading-relaxed mb-10 text-gray-700">
          Charter empowers members with the awareness, access and network to live deliberately, maximixing their family's freedom and legacy. We cover everything from global mobility, healthcare, childrens' education, business opportunities, wellness, asset protection and tax optimization. Together, we have each other's backs, forging a path to thriving in a world that often demands conformity.
        </p>

        <Link to="/join">
          <Button 
            className="bg-brand-burnt-orange hover:bg-brand-burnt-orange-dark text-white px-10 py-4 text-xl transition-colors duration-300 rounded-md font-semibold font-poppins"
          >
            Apply Now <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </section>
    </div>
  );
} 