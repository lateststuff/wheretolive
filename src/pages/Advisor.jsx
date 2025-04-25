import React, { useState } from 'react';
// import { InvokeLLM } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Globe, Loader2, ArrowRight } from "lucide-react";

export default function Advisor() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    citizenship: '',
    ancestry: '',
    goals: [],
    budget: '',
    timeline: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const goalOptions = [
    { id: 'tax', label: 'Tax Optimization' },
    { id: 'passport', label: 'Backup Passport' },
    { id: 'travel', label: 'Visa-Free Travel' },
    { id: 'business', label: 'Business Opportunities' },
    { id: 'family', label: 'Family Relocation' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const response = await InvokeLLM({
      //   prompt: `As a citizenship and immigration expert, analyze this profile and recommend the best citizenship/residency options:
      //   Name: ${formData.fullName}
      //   Current Citizenship: ${formData.citizenship}
      //   Ancestry: ${formData.ancestry}
      //   Goals: ${formData.goals.join(', ')}
      //   Budget: ${formData.budget}
      //   Timeline: ${formData.timeline}
      //   
      //   Provide detailed recommendations including:
      //   - Best country options
      //   - Available programs (citizenship by investment, residency, etc.)
      //   - Estimated costs and timeframes
      //   - Required documents
      //   - Next steps`,
      //   add_context_from_internet: true
      // });
      const response = "Based on your profile, here are some recommendations... [Details]"; // TEMP: Hardcoded response

      setResults(response);
      
      // Send email with results if email provided
      if (formData.email) {
        try {
          // Assuming SendEmail is defined elsewhere and handles sending emails
          // Example implementation (replace with your actual email sending logic)
          const SendEmail = async ({ to, subject, body }) => {
            // Replace with your actual email sending logic (e.g., using Nodemailer, SendGrid, etc.)
            console.log(`Sending email to: ${to}, subject: ${subject}, body: ${body}`);
            // Simulate successful email sending (replace with actual implementation)
            return Promise.resolve({ success: true });
          };

          await SendEmail({
            to: formData.email,
            subject: "Your Citizenship & Residency Recommendations",
            body: `
              <h2>Your Personalized Recommendations</h2>
              <p>Dear ${formData.fullName},</p>
              <p>Based on your profile, here are our recommendations:</p>
              <div style="border-left: 4px solid #3b82f6; padding-left: 20px; margin: 20px 0;">
                <p>${response.replace(/\n/g, '<br>')}</p>
              </div>
              <p>For more detailed assistance, please connect with one of our specialists.</p>
              <p>Best regards,<br>The Passport Advisor Team</p>
            `
          });
        } catch (emailError) {
          console.error("Error sending email:", emailError);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg border-none">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">AI Passport Advisor</CardTitle>
                <CardDescription className="text-blue-100 mt-2">
                  Answer a few questions to get personalized recommendations for your global citizenship journey
                </CardDescription>
              </div>
              <Globe className="w-12 h-12 text-white opacity-80" />
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Current Citizenship</Label>
                <Input
                  placeholder="Your current country of citizenship"
                  value={formData.citizenship}
                  onChange={(e) => setFormData({...formData, citizenship: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ancestry/Heritage (Optional)</Label>
                <Textarea
                  placeholder="E.g., Italian grandparents, Irish great-grandparents, etc."
                  value={formData.ancestry}
                  onChange={(e) => setFormData({...formData, ancestry: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4">
                <Label>What are your main goals?</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {goalOptions.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2 p-3 rounded-lg border">
                      <Checkbox
                        id={goal.id}
                        checked={formData.goals.includes(goal.label)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, goals: [...formData.goals, goal.label]});
                          } else {
                            setFormData({...formData, goals: formData.goals.filter(g => g !== goal.label)});
                          }
                        }}
                      />
                      <label
                        htmlFor={goal.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {goal.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Investment Budget</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({...formData, budget: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_100k">Under $100,000</SelectItem>
                      <SelectItem value="100k_250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k_500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="500k_1m">$500,000 - $1,000,000</SelectItem>
                      <SelectItem value="above_1m">Above $1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({...formData, timeline: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                      <SelectItem value="within_1_year">Within 1 year</SelectItem>
                      <SelectItem value="1_3_years">1-3 years</SelectItem>
                      <SelectItem value="3_5_years">3-5 years</SelectItem>
                      <SelectItem value="no_rush">No rush (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Options...
                  </>
                ) : (
                  <>
                    Get Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {results && (
              <div className="mt-8 p-6 bg-white rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Your Recommendations</h3>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{results}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
