import React, { useState, useEffect } from 'react';
import { Program } from "@/api/entities";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  Clock, 
  Edit, 
  Globe, 
  Plus, 
  Search, 
  ShieldCheck, 
  Trash2,
  AlertCircle,
  Filter,
  FileSpreadsheet,
  BarChart
} from "lucide-react";

export default function AdminDashboard() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("programs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    type: "",
    min_investment: 0,
    status: "active",
    requirements: [""],
    benefits: [""],
    processing_time: { min_months: 1, max_months: 12 },
    last_updated: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const data = await Program.list();
      setPrograms(data);
    } catch (error) {
      console.error("Error loading programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPrograms = programs.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (program) => {
    setSelectedProgram(program);
    setFormData({
      name: program.name || "",
      country: program.country || "",
      type: program.type || "",
      min_investment: program.min_investment || 0,
      requirements: program.requirements || [""],
      benefits: program.benefits || [""],
      status: program.status || "active",
      processing_time: program.processing_time || { min_months: 1, max_months: 12 },
      last_updated: new Date().toISOString().split('T')[0]
    });
    setShowEditDialog(true);
  };

  const handleAddNew = () => {
    setSelectedProgram(null);
    setFormData({
      name: "",
      country: "",
      type: "",
      min_investment: 0,
      requirements: [""],
      benefits: [""],
      status: "active",
      processing_time: { min_months: 1, max_months: 12 },
      last_updated: new Date().toISOString().split('T')[0]
    });
    setShowAddDialog(true);
  };

  const handleSave = async () => {
    try {
      if (selectedProgram) {
        // Update existing program
        await Program.update(selectedProgram.id, formData);
      } else {
        // Create new program
        await Program.create(formData);
      }
      setShowEditDialog(false);
      setShowAddDialog(false);
      loadPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
    }
  };

  const handleAddListItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const handleRemoveListItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateListItem = (field, index, value) => {
    setFormData(prev => {
      const newItems = [...prev[field]];
      newItems[index] = value;
      return { ...prev, [field]: newItems };
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage citizenship and residency programs</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleAddNew} className="bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add New Program
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Citizenship & Residency Programs</CardTitle>
                <CardDescription>Manage all available programs in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Program Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Min. Investment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrograms.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            No programs found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPrograms.map((program) => (
                          <TableRow key={program.id}>
                            <TableCell className="font-medium">{program.name}</TableCell>
                            <TableCell>{program.country}</TableCell>
                            <TableCell>
                              <Badge className={getProgramTypeColor(program.type)}>
                                {formatProgramType(program.type)}
                              </Badge>
                            </TableCell>
                            <TableCell>${program.min_investment?.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge variant={program.status === 'active' ? 'default' : 'secondary'}>
                                {program.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEdit(program)}
                              >
                                <Edit className="h-4 w-4 text-blue-600" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="providers">
            <Card>
              <CardHeader>
                <CardTitle>Providers & Partners</CardTitle>
                <CardDescription>Manage service providers and partnerships</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Provider management coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reporting</CardTitle>
                <CardDescription>View platform statistics and user engagement</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Program Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>
              Update program details and requirements
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Program Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizenship_by_investment">Citizenship by Investment</SelectItem>
                    <SelectItem value="residency_by_investment">Residency by Investment</SelectItem>
                    <SelectItem value="golden_visa">Golden Visa</SelectItem>
                    <SelectItem value="digital_nomad_visa">Digital Nomad Visa</SelectItem>
                    <SelectItem value="ancestry_citizenship">Ancestry Citizenship</SelectItem>
                    <SelectItem value="tax_residency">Tax Residency</SelectItem>
                    <SelectItem value="special_visa_program">Special Visa Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min_investment">Minimum Investment (USD)</Label>
                <Input
                  id="min_investment"
                  type="number"
                  value={formData.min_investment}
                  onChange={(e) => setFormData({...formData, min_investment: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_months">Min Processing (months)</Label>
                <Input
                  id="min_months"
                  type="number"
                  value={formData.processing_time?.min_months}
                  onChange={(e) => setFormData({
                    ...formData, 
                    processing_time: {...formData.processing_time, min_months: Number(e.target.value)}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max_months">Max Processing (months)</Label>
                <Input
                  id="max_months"
                  type="number"
                  value={formData.processing_time?.max_months}
                  onChange={(e) => setFormData({
                    ...formData, 
                    processing_time: {...formData.processing_time, max_months: Number(e.target.value)}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="changes_pending">Changes Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Requirements</Label>
              {formData.requirements?.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => updateListItem('requirements', index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveListItem('requirements', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddListItem('requirements')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Benefits</Label>
              {formData.benefits?.map((benefit, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateListItem('benefits', index, e.target.value)}
                    placeholder="Enter benefit"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveListItem('benefits', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddListItem('benefits')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Program Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Program</DialogTitle>
            <DialogDescription>
              Create a new citizenship or residency program
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Program Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Program Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizenship_by_investment">Citizenship by Investment</SelectItem>
                    <SelectItem value="residency_by_investment">Residency by Investment</SelectItem>
                    <SelectItem value="golden_visa">Golden Visa</SelectItem>
                    <SelectItem value="digital_nomad_visa">Digital Nomad Visa</SelectItem>
                    <SelectItem value="ancestry_citizenship">Ancestry Citizenship</SelectItem>
                    <SelectItem value="tax_residency">Tax Residency</SelectItem>
                    <SelectItem value="special_visa_program">Special Visa Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min_investment">Minimum Investment (USD)</Label>
                <Input
                  id="min_investment"
                  type="number"
                  value={formData.min_investment}
                  onChange={(e) => setFormData({...formData, min_investment: Number(e.target.value)})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_months">Min Processing (months)</Label>
                <Input
                  id="min_months"
                  type="number"
                  value={formData.processing_time?.min_months}
                  onChange={(e) => setFormData({
                    ...formData, 
                    processing_time: {...formData.processing_time, min_months: Number(e.target.value)}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max_months">Max Processing (months)</Label>
                <Input
                  id="max_months"
                  type="number"
                  value={formData.processing_time?.max_months}
                  onChange={(e) => setFormData({
                    ...formData, 
                    processing_time: {...formData.processing_time, max_months: Number(e.target.value)}
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="changes_pending">Changes Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Requirements</Label>
              {formData.requirements?.map((req, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={req}
                    onChange={(e) => updateListItem('requirements', index, e.target.value)}
                    placeholder="Enter requirement"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveListItem('requirements', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddListItem('requirements')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Benefits</Label>
              {formData.benefits?.map((benefit, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateListItem('benefits', index, e.target.value)}
                    placeholder="Enter benefit"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveListItem('benefits', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={() => handleAddListItem('benefits')}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600">
              Create Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}