import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, ThermometerSun, Shield, Globe, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

export default function CountryCard({ country, onClick }) {
  const getTotalCost = () => {
    const costs = country.living_cost || {};
    return (costs.rent || 0) + (costs.food || 0) + (costs.transportation || 0);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card 
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img 
            src={country.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'} 
            alt={country.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{country.name}</h3>
              <p className="text-sm text-gray-500">{country.capital}</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {country.region}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{country.internet_speed || '?'} Mbps</span>
            </div>
            <div className="flex items-center gap-2">
              <ThermometerSun className="w-4 h-4 text-orange-500" />
              <span className="text-sm">
                {country.climate ? country.climate.split(' ')[0] : '?'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm">{country.safety_index || '?'}/100</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-500" />
              <span className="text-sm">${getTotalCost()}/mo</span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{(country.languages || []).join(', ') || 'Unknown'}</span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Score: {country.nomad_score || '?'}/10
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}