
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Globe,
  ThermometerSun,
  Shield,
  Wifi,
  Home,
  Shell,
  Bus,
  ScrollText, // Replaced Passport with ScrollText
} from "lucide-react";

export default function CountryDetails({ country, isOpen, onClose }) {
  if (!country) return null;

  const costs = country.living_cost || {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <span>{country.name}</span>
            <Badge variant="outline" className="text-blue-700 bg-blue-50">
              {country.region}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Hero Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={country.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'}
              alt={country.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Capital City</p>
                  <p className="text-gray-600">{country.capital}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Languages</p>
                  <p className="text-gray-600">{(country.languages || []).join(', ') || 'Unknown'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Climate</p>
                  <p className="text-gray-600">{country.climate || 'Information not available'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Safety Index</p>
                  <p className="text-gray-600">{country.safety_index || '?'}/100</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Internet Speed</p>
                  <p className="text-gray-600">{country.internet_speed || '?'} Mbps</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">Monthly Living Costs</h3>
              
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Rent</p>
                  <p className="text-gray-600">${costs.rent || '?'}/month</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Shell className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Food</p>
                  <p className="text-gray-600">${costs.food || '?'}/month</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bus className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium">Transportation</p>
                  <p className="text-gray-600">${costs.transportation || '?'}/month</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-gray-500" /> {/* Changed icon */}
                  <p className="font-medium">Visa Requirements</p>
                </div>
                <p className="text-gray-600 mt-2">{country.visa_requirements || 'Information not available'}</p>
              </div>
            </div>
          </div>

          {/* Nomad Score */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Digital Nomad Score</h3>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${(country.nomad_score || 0) * 10}%` }}
                  />
                </div>
                <span className="font-medium">{country.nomad_score || '?'}/10</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
