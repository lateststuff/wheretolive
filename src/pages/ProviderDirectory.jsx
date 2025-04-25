import React, { useState, useEffect } from 'react';
import { Provider } from "@/api/entities";
import { Program } from "@/api/entities";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Building,
  Check,
  CircleCheck,
  ExternalLink,
  Filter,
  Globe,
  Mail,
  MapPin,
  Phone,
  Search,
  Shield
} from "lucide-react";

export default function ProviderDirectory() {
  const [providers, setProviders] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    country: 'all',
    programType: 'all',
    partnershipLevel: 'all',
    search: ''
  });
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showProviderDialog, setShowProviderDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, these would be populated from your database
        const providersData = await Provider.list() || [];
        const programsData = await Program.list() || [];
        
        setProviders(providersData);
        setPrograms(programsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique countries from providers
  const countries = [...new Set(providers.flatMap(p => p.jurisdictions || []))];
  
  // Filter providers based on selected filters
  const filteredProviders = providers.filter(provider => {
    // Filter by type
    if (filters.type !== 'all' && provider.type !== filters.type) {
      return false;
    }
    
    // Filter by country/jurisdiction
    if (filters.country !== 'all' && 
        !(provider.jurisdictions || []).includes(filters.country)) {
      return false;
    }
    
    // Filter by program type
    if (filters.programType !== 'all') {
      const providerPrograms = programs.filter(
        p => (provider.programs || []).includes(p.id)
      );
      if (!providerPrograms.some(p => p.type === filters.programType)) {
        return false;
      }
    }
    
    // Filter by partnership level
    if (filters.partnershipLevel !== 'all' && 
        provider.partnership_level !== filters.partnershipLevel) {
      return false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        provider.name.toLowerCase().includes(searchTerm) ||
        (provider.jurisdictions || []).some(j => j.toLowerCase().includes(searchTerm))
      );
    }
    
    return true;
  });

  const getPartnershipBadge = (level) => {
    const badges = {
      platinum: "bg-purple-100 text-purple-800 border-purple-200",
      gold: "bg-amber-100 text-amber-800 border-amber-200",
      silver: "bg-gray-100 text-gray-800 border-gray-200",
      standard: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return badges[level] || badges.standard;
  };

  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
    setShowProviderDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Partner Directory</h1>
          <p className="text-gray-500 mt-1">Find verified immigration and citizenship specialists</p>
        </header>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filter Partners</CardTitle>
            <CardDescription>Find partners based on your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search partners..."
                    className="pl-9"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Partner Type</label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => setFilters({...filters, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="law_firm">Law Firms</SelectItem>
                    <SelectItem value="authorized_agent">Authorized Agents</SelectItem>
                    <SelectItem value="consulting_firm">Consulting Firms</SelectItem>
                    <SelectItem value="government">Government Agencies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Country/Jurisdiction</label>
                <Select 
                  value={filters.country}
                  onValueChange={(value) => setFilters({...filters, country: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Partnership Level</label>
                <Select 
                  value={filters.partnershipLevel}
                  onValueChange={(value) => setFilters({...filters, partnershipLevel: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Provider List */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No partners found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleViewProvider(provider)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    {provider.verified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 flex items-center">
                        <Check className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Building className="w-4 h-4 mr-1 text-gray-500" />
                    {provider.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{(provider.jurisdictions || []).join(', ')}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{(provider.programs || []).length} Programs</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-2">
                  <Badge className={getPartnershipBadge(provider.partnership_level)}>
                    {provider.partnership_level.charAt(0).toUpperCase() + provider.partnership_level.slice(1)} Partner
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Provider Detail Dialog */}
      {selectedProvider && (
        <Dialog open={showProviderDialog} onOpenChange={setShowProviderDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedProvider.name}
                {selectedProvider.verified && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                    <Check className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedProvider.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm mb-3">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  {selectedProvider.contact?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`mailto:${selectedProvider.contact.email}`} 
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedProvider.contact.email}
                      </a>
                    </div>
                  )}
                  
                  {selectedProvider.contact?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a 
                        href={`tel:${selectedProvider.contact.phone}`} 
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedProvider.contact.phone}
                      </a>
                    </div>
                  )}
                  
                  {selectedProvider.contact?.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <a 
                        href={selectedProvider.contact.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {selectedProvider.contact.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-sm mb-3">Jurisdictions</h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedProvider.jurisdictions || []).map((jurisdiction, index) => (
                      <Badge key={index} variant="outline">
                        {jurisdiction}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-sm mb-3">Partnership Level</h3>
                  <Badge className={getPartnershipBadge(selectedProvider.partnership_level)}>
                    {selectedProvider.partnership_level.charAt(0).toUpperCase() + selectedProvider.partnership_level.slice(1)} Partner
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-3">Programs</h3>
                <div className="space-y-3">
                  {programs
                    .filter(program => (selectedProvider.programs || []).includes(program.id))
                    .map((program) => (
                      <div key={program.id} className="flex justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{program.name}</p>
                          <p className="text-sm text-gray-600">{program.country}</p>
                        </div>
                        <Badge variant="outline">
                          {program.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button className="bg-blue-600">
                Contact This Provider
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}