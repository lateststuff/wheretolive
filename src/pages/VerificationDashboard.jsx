import React, { useState, useEffect } from 'react';
// import { Program } from "@/api/entities";
// import { ProgramVerification } from "@/api/entities";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  Edit, 
  ExternalLink, 
  FileText, 
  Loader2, 
  Plus, 
  RefreshCw, 
  Search, 
  Shield, 
  X 
} from 'lucide-react';

export default function VerificationDashboard() {
  const [programs, setPrograms] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    verification_source: 'official_website',
    verification_notes: '',
    official_documentation_urls: [''],
    status: 'verified',
    changes_detected: false,
    change_details: '',
    next_verification_due: new Date(+new Date() + 90*24*60*60*1000).toISOString().split('T')[0]
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, these would be populated from your database
        // const programsData = await Program.list() || [];
        // const verificationsData = await ProgramVerification.list() || [];
        const programsData = []; // TEMP: Set to empty array
        const verificationsData = []; // TEMP: Set to empty array

        setPrograms(programsData);
        setVerifications(verificationsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter programs by search term and status
  const filteredPrograms = programs.filter(program => {
    if (searchTerm && !program.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !program.country.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Get verification for this program
    const verification = verifications.find(v => v.program_id === program.id);
    
    if (activeTab === 'unverified' && verification) {
      return false;
    }
    
    if (activeTab === 'verified' && !verification) {
      return false;
    }
    
    if (activeTab === 'outdated' && (!verification || verification.status !== 'outdated')) {
      return false;
    }
    
    if (activeTab === 'pending' && (!verification || verification.status !== 'pending')) {
      return false;
    }
    
    if (activeTab === 'discrepancies' && (!verification || verification.status !== 'discrepancy_found')) {
      return false;
    }
    
    return true;
  });

  // Get verification status badge style
  const getVerificationBadge = (program) => {
    const verification = verifications.find(v => v.program_id === program.id);
    
    if (!verification) {
      return { text: "Unverified", class: "bg-gray-100 text-gray-800" };
    }
    
    switch(verification.status) {
      case 'verified':
        return { text: "Verified", class: "bg-green-100 text-green-800" };
      case 'pending':
        return { text: "Verification Pending", class: "bg-yellow-100 text-yellow-800" };
      case 'outdated':
        return { text: "Needs Update", class: "bg-orange-100 text-orange-800" };
      case 'discrepancy_found':
        return { text: "Discrepancy Found", class: "bg-red-100 text-red-800" };
      default:
        return { text: "Unknown", class: "bg-gray-100 text-gray-800" };
    }
  };

  const getProgramTypeColor = (type) => {
    const typeMap = {
      "citizenship_by_investment": "bg-amber-100 text-amber-800",
      "residency_by_investment": "bg-emerald-100 text-emerald-800",
      "golden_visa": "bg-yellow-100 text-yellow-800",
      "digital_nomad_visa": "bg-purple-100 text-purple-800",
      "ancestry_citizenship": "bg-blue-100 text-blue-800"
    };
    
    return typeMap[type] || "bg-gray-100 text-gray-800";
  };

  const formatProgramType = (type) => {
    if (!type) return "Unknown";
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleVerifyProgram = (program) => {
    setSelectedProgram(program);
    
    // Check if there's an existing verification
    const existingVerification = verifications.find(v => v.program_id === program.id);
    if (existingVerification) {
      setSelectedVerification(existingVerification);
      setFormData({
        verification_source: existingVerification.verification_source,
        verification_notes: existingVerification.verification_notes || '',
        official_documentation_urls: existingVerification.official_documentation_urls || [''],
        status: existingVerification.status,
        changes_detected: existingVerification.changes_detected || false,
        change_details: existingVerification.change_details || '',
        next_verification_due: existingVerification.next_verification_due || 
          new Date(+new Date() + 90*24*60*60*1000).toISOString().split('T')[0]
      });
    } else {
      setSelectedVerification(null);
      setFormData({
        verification_source: 'official_website',
        verification_notes: '',
        official_documentation_urls: [''],
        status: 'verified',
        changes_detected: false,
        change_details: '',
        next_verification_due: new Date(+new Date() + 90*24*60*60*1000).toISOString().split('T')[0]
      });
    }
    
    setShowVerifyDialog(true);
  };

  const handleAddDocUrl = () => {
    setFormData(prev => ({
      ...prev,
      official_documentation_urls: [...prev.official_documentation_urls, '']
    }));
  };

  const handleRemoveDocUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      official_documentation_urls: prev.official_documentation_urls.filter((_, i) => i !== index)
    }));
  };

  const updateDocUrl = (index, value) => {
    setFormData(prev => {
      const newUrls = [...prev.official_documentation_urls];
      newUrls[index] = value;
      return { ...prev, official_documentation_urls: newUrls };
    });
  };

  const handleSaveVerification = async () => {
    try {
      const verificationData = {
        ...formData,
        program_id: selectedProgram.id,
        last_verified_date: new Date().toISOString().split('T')[0],
        verified_by: "admin@example.com" // In a real app, get from current user
      };

      console.log("Would update/create verification:", verificationData); // TEMP: Log instead of calling API

      // if (selectedVerification) {
      //   // Update existing verification
      //   await ProgramVerification.update(selectedVerification.id, verificationData);
      // } else {
      //   // Create new verification
      //   await ProgramVerification.create(verificationData);
      // }
      
      // TEMP: Simulate update locally
      const updatedVerifications = selectedVerification 
        ? verifications.map(v => v.id === selectedVerification.id ? {...v, ...verificationData} : v)
        : [...verifications, {...verificationData, id: `temp-${Date.now()}`}]; // Assign temporary ID
      setVerifications(updatedVerifications);
      
      setShowVerifyDialog(false);
    } catch (error) {
      console.error("Error saving verification:", error);
      // Add user feedback (e.g., toast notification)
    }
  };

  const handleBulkAction = async (action) => {
    console.log(`Would perform bulk action: ${action}`); // TEMP: Log instead of calling API
    // Example: Implement bulk verification, deletion, etc.
    // const selectedProgramIds = programs.filter(p => p.isSelected).map(p => p.id);
    // if (action === 'verify') {
    //   await ProgramVerification.bulkVerify(selectedProgramIds);
    // }
  };

  // Function to handle selecting/deselecting all programs
  const handleSelectAll = (checked) => {
    // ... existing code ...
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Program Verification</h1>
          <p className="text-gray-500 mt-1">Ensure all program information is accurate and up-to-date</p>
        </header>

        {/* Stats overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Programs</p>
                <p className="text-2xl font-bold">{programs.length}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Verified</p>
                <p className="text-2xl font-bold">
                  {verifications.filter(v => v.status === 'verified').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Needs Update</p>
                <p className="text-2xl font-bold">
                  {verifications.filter(v => v.status === 'outdated').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Discrepancies</p>
                <p className="text-2xl font-bold">
                  {verifications.filter(v => v.status === 'discrepancy_found').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full md:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="unverified">Unverified</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="outdated">Needs Update</TabsTrigger>
              <TabsTrigger value="discrepancies">Discrepancies</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search programs..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Programs list */}
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Verified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center">
                      <Shield className="h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-gray-500">No programs found matching your criteria</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrograms.map((program) => {
                  const verification = verifications.find(v => v.program_id === program.id);
                  const status = getVerificationBadge(program);
                  
                  return (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>{program.country}</TableCell>
                      <TableCell>
                        <Badge className={getProgramTypeColor(program.type)}>
                          {formatProgramType(program.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.class}>
                          {status.text}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {verification ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{verification.last_verified_date}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600"
                          onClick={() => handleVerifyProgram(program)}
                        >
                          {verification ? (
                            <>
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Update
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Verify
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Verification Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedVerification ? 'Update Verification' : 'Verify Program'}
            </DialogTitle>
            <DialogDescription>
              {selectedProgram?.name} - {selectedProgram?.country}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="verification_source">Verification Source</Label>
              <Select 
                value={formData.verification_source} 
                onValueChange={(value) => setFormData({...formData, verification_source: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select verification source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="official_website">Official Website</SelectItem>
                  <SelectItem value="government_contact">Government Contact</SelectItem>
                  <SelectItem value="authorized_partner">Authorized Partner</SelectItem>
                  <SelectItem value="legal_publication">Legal Publication</SelectItem>
                  <SelectItem value="manual_check">Manual Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Verification Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Verified - Information Accurate</SelectItem>
                  <SelectItem value="pending">Pending - Additional Research Needed</SelectItem>
                  <SelectItem value="outdated">Outdated - Information Needs Update</SelectItem>
                  <SelectItem value="discrepancy_found">Discrepancy Found - Urgent Fix Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Official Documentation URLs</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddDocUrl}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add URL
                </Button>
              </div>
              
              {formData.official_documentation_urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={url}
                    onChange={(e) => updateDocUrl(index, e.target.value)}
                    placeholder="https://example.gov/program-details"
                    className="flex-1"
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemoveDocUrl(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="verification_notes">Verification Notes</Label>
              <Textarea
                id="verification_notes"
                value={formData.verification_notes}
                onChange={(e) => setFormData({...formData, verification_notes: e.target.value})}
                placeholder="Notes about the verification process..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="changes_detected" 
                checked={formData.changes_detected}
                onCheckedChange={(checked) => {
                  setFormData({...formData, changes_detected: checked})
                }}
              />
              <label
                htmlFor="changes_detected"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Changes detected compared to previous verification
              </label>
            </div>
            
            {formData.changes_detected && (
              <div className="space-y-2">
                <Label htmlFor="change_details">Change Details</Label>
                <Textarea
                  id="change_details"
                  value={formData.change_details}
                  onChange={(e) => setFormData({...formData, change_details: e.target.value})}
                  placeholder="Describe what has changed..."
                  className="min-h-[100px]"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="next_verification_due">Next Verification Due</Label>
              <Input
                type="date"
                id="next_verification_due"
                value={formData.next_verification_due}
                onChange={(e) => setFormData({...formData, next_verification_due: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveVerification} className="bg-blue-600">
              {selectedVerification ? 'Update Verification' : 'Complete Verification'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
