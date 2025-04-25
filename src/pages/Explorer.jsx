import React, { useState, useEffect } from 'react';
import { Country } from "@/api/entities";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Search, 
  ShieldCheck, 
  Wifi, 
  Building2, 
  DollarSign, 
  Globe2,
  ArrowRight
} from "lucide-react";

export default function Explorer() {
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    region: "all",
    type: "all",
    priceRange: 500000
  });

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    const data = await Country.list();
    setCountries(data);
  };

  const filteredCountries = countries.filter(country => {
    if (filters.search && !country.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.region !== "all" && country.region !== filters.region) {
      return false;
    }
    return true;
  });

  const getProgramBadgeColor = (type) => {
    const colors = {
      "citizenship": "bg-amber-100 text-amber-800",
      "residency": "bg-emerald-100 text-emerald-800",
      "digital_nomad": "bg-purple-100 text-purple-800",
      "business": "bg-blue-100 text-blue-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Country Explorer</h1>
            <p className="text-gray-500 mt-1">Discover citizenship and residency opportunities worldwide</p>
          </div>
          <Globe2 className="w-10 h-10 text-blue-500" />
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
            <CardDescription>Find programs that match your criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search countries..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Region</label>
                <Select
                  value={filters.region}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Program Type</label>
                <Tabs 
                  defaultValue="all" 
                  className="w-full"
                  value={filters.type}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="citizenship">Citizenship</TabsTrigger>
                    <TabsTrigger value="residency">Residency</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Investment Range (up to ${(filters.priceRange).toLocaleString()})
                </label>
                <Slider
                  value={[filters.priceRange]}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value[0] }))}
                  max={2000000}
                  step={50000}
                  className="mt-4"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Countries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCountries.map((country) => (
            <Card key={country.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={country.image_url || `https://source.unsplash.com/800x600/?${country.name},landmark`}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{country.name}</CardTitle>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Building2 className="w-4 h-4 mr-1" />
                      {country.capital}
                    </p>
                  </div>
                  <Badge className={getProgramBadgeColor("residency")}>
                    {country.region}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">From ${(country.living_cost?.rent || 0).toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{country.internet_speed || '?'} Mbps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Safety: {country.safety_index || '?'}/100</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">Score: {country.nomad_score || '?'}/10</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{country.visa_requirements || 'Contact for visa requirements'}</p>
                <Button variant="outline" className="w-full mt-4">
                  View Details 
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}