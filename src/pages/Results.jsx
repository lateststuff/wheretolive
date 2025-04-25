import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from "@/utils";
// import { InvokeLLM } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Calendar,
  Check,
  Clock,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";

export default function Results() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [referralCode, setReferralCode] = useState("NP" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [contactEmail, setContactEmail] = useState("");
  const [showContactPrompt, setShowContactPrompt] = useState(false);

  // Sample data - in a real app, this would come from query parameters or previous page
  const sampleProfile = {
    full_name: "Sample User",
    email: "",
    citizenship: "United States",
    goals: ["tax_optimization", "backup_passport", "visa_free_travel"],
    budget: "250k_500k",
    timeline: "1_3_years",
    recommendations: [
      {
        country: "Portugal",
        program_type: "residency_by_investment",
        description: "The Portugal Golden Visa program is an excellent match for your profile given your investment range and timeline.",
        requirements: "Clean criminal record, minimum investment of €250,000-€500,000 depending on investment type, health insurance coverage.",
        timeframe: "6-8 months for initial approval, 5 years to citizenship",
        investment: "€250,000 - €500,000",
        benefits: ["EU residency", "Visa-free travel", "Path to citizenship", "Favorable tax regime"],
        score: 9
      },
      {
        country: "Malta",
        program_type: "citizenship_by_investment",
        description: "Malta's citizenship program offers a reliable path to an EU passport with strong global mobility benefits.",
        requirements: "Clean criminal record, €750,000 donation plus €700,000 real estate investment, 1-year residency period.",
        timeframe: "12-16 months",
        investment: "€1,450,000+",
        benefits: ["EU citizenship", "Visa-free travel to 180+ countries", "Strong passport", "EU business opportunities"],
        score: 8
      },
      {
        country: "Grenada",
        program_type: "citizenship_by_investment",
        description: "Grenada's program is particularly valuable for access to the E-2 Treaty with the US, allowing business investment there.",
        requirements: "Clean criminal record, minimum $150,000 donation or $220,000 real estate investment.",
        timeframe: "4-6 months",
        investment: "$150,000 - $220,000",
        benefits: ["Visa-free travel to 140+ countries", "E-2 Treaty access", "No residency requirements", "Tax benefits"],
        score: 9
      }
    ]
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setSendingMessage(true);
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    try {
      // Get AI response
      // const response = await InvokeLLM({
      //   prompt: `You are a helpful citizenship and immigration consultant specializing in second passports, residency programs, and citizenship by investment. 
      //   
      //   USER PROFILE:
      //   Name: ${sampleProfile.full_name}
      //   Current Citizenship: ${sampleProfile.citizenship}
      //   Goals: ${sampleProfile.goals.join(", ")}
      //   Budget: ${sampleProfile.budget.replace(/_/g, " ")}
      //   
      //   The user has already received these recommendations:
      //   ${JSON.stringify(sampleProfile.recommendations)}
      //   
      //   Answer the following question professionally, accurately, and helpfully. If you don't know specific details about a program, acknowledge that and suggest where they might find that information.
      //   
      //   If the user asks about connecting with a specialist or consultant, encourage them to use their referral code (${referralCode}) when contacting our partner firms for special rates.
      //   
      //   USER QUESTION: ${userMessage.text}`,
      //   add_context_from_internet: true
      // });
      const response = "Thanks for your question! Regarding X, the details are Y. Let me know if you need more info."; // TEMP: Hardcoded response
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleRequestConsultation = async () => {
    if (!contactEmail.trim()) {
      setShowContactPrompt(true);
      return;
    }
    
    try {
      // await SendEmail({
      //   to: contactEmail,
      //   subject: "Your Passport Advisor Consultation Request",
      //   body: `
      //     <h2>Thank you for requesting a consultation!</h2>
      //     <p>Dear User,</p>
      //     <p>We've received your request for a specialized consultation on citizenship and residency options. One of our partner advisors will contact you shortly to discuss your specific situation and requirements.</p>
      //     <p><strong>Your referral code: ${referralCode}</strong></p>
      //     <p>Please mention this code when speaking with our partners to receive preferential rates.</p>
      //     <p>Based on your profile, we've recommended these options:</p>
      //     <ul>
      //       ${sampleProfile.recommendations.map(rec => `
      //         <li><strong>${rec.country}</strong> - ${rec.program_type.replace(/_/g, ' ')} (Match score: ${rec.score}/10)</li>
      //       `).join('')}
      //     </ul>
      //     <p>We look forward to helping you achieve your global citizenship goals.</p>
      //     <p>Best regards,<br>The Passport Pathways Team</p>
      //   `
      // });
      console.log(`Would send email to ${contactEmail} with referral code ${referralCode}`); // TEMP: Log instead of sending email
      
      // Add confirmation message to chat
      const confirmationMessage = {
        id: Date.now(),
        sender: "ai",
        text: `Your consultation request has been sent! You'll receive an email confirmation shortly. A specialist will contact you soon to discuss your options in more detail. Your referral code is ${referralCode} - please mention this when speaking with our partners.`,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, confirmationMessage]);
      setShowContactPrompt(false);
    } catch (error) {
      console.error("Error sending consultation request:", error);
      alert("There was an error sending your consultation request. Please try again.");
    }
  };

  const getProgramTypeColor = (type) => {
    const typeMap = {
      "citizenship_by_investment": "bg-amber-100 text-amber-800 border-amber-200",
      "residency_by_investment": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "ancestry": "bg-blue-100 text-blue-800 border-blue-200",
      "naturalization": "bg-purple-100 text-purple-800 border-purple-200",
      "digital_nomad_visa": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "business_visa": "bg-orange-100 text-orange-800 border-orange-200"
    };
    
    return typeMap[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatProgramType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-lg text-gray-600">Loading your personalized recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Personalized Recommendations</h1>
          <p className="text-gray-600 mt-2">From AI Passport Advisor - based on your profile and goals</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Tabs and Filters */}
            <Card className="border-none shadow-sm">
              <CardContent className="p-4">
                <Tabs defaultValue="all">
                  <TabsList className="w-full justify-start overflow-auto">
                    <TabsTrigger value="all">All Options</TabsTrigger>
                    <TabsTrigger value="citizenship">Citizenship</TabsTrigger>
                    <TabsTrigger value="residency">Residency</TabsTrigger>
                    <TabsTrigger value="digital_nomad">Digital Nomad</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="space-y-6">
              {sampleProfile.recommendations.map((recommendation, index) => (
                <Card key={`${recommendation.country}_${recommendation.program_type}`} className="overflow-hidden">
                  <div 
                    className="h-2 w-full" 
                    style={{ 
                      background: `linear-gradient(90deg, #3b82f6 ${recommendation.score * 10}%, #e5e7eb ${recommendation.score * 10}%)` 
                    }}
                  />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <CardTitle>{recommendation.country}</CardTitle>
                      </div>
                      <Badge 
                        className={getProgramTypeColor(recommendation.program_type)}
                      >
                        {formatProgramType(recommendation.program_type)}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      {recommendation.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Requirements</p>
                          <p className="text-sm text-gray-600">{recommendation.requirements}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Timeframe</p>
                          <p className="text-sm text-gray-600">{recommendation.timeframe}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <CreditCard className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Investment</p>
                          <p className="text-sm text-gray-600">{recommendation.investment}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Match Score</p>
                          <div className="flex items-center gap-2">
                            <Progress value={recommendation.score * 10} className="h-2 w-20" />
                            <span className="text-sm font-medium">{recommendation.score}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-2">Key Benefits</p>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 p-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="text-blue-600">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Get Details & Assistance
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Connect with a Specialist</AlertDialogTitle>
                          <AlertDialogDescription>
                            For detailed information about the {recommendation.country} {formatProgramType(recommendation.program_type)} program and personalized assistance, we can connect you with a specialized consultant.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="py-4">
                          <p className="text-sm font-medium">Your Referral Code:</p>
                          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md font-mono text-center text-blue-800">
                            {referralCode}
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            Use this code when contacting our partners for special rates.
                          </p>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-blue-600"
                            onClick={() => {
                              setShowContactPrompt(true);
                            }}
                          >
                            Request Consultation
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Current Citizenship</p>
                  <Badge variant="outline">
                    {sampleProfile.citizenship}
                  </Badge>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Your Goals</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleProfile.goals.map((goal, i) => (
                      <Badge key={i} variant="secondary" className="capitalize">
                        {goal.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Budget Range</p>
                  <Badge variant="outline" className="capitalize">
                    {sampleProfile.budget.replace(/_/g, ' ')}
                  </Badge>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Timeline</p>
                  <Badge variant="outline" className="capitalize">
                    {sampleProfile.timeline.replace(/_/g, ' ')}
                  </Badge>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => navigate(createPageUrl("Advisor"))}
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
            
            {/* AI Chat Assistant */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ask Our Expert</CardTitle>
                <CardDescription>
                  Have questions about citizenship or residency options?
                </CardDescription>
              </CardHeader>
              
              {/* Minimized chat */}
              {!chatOpen && (
                <CardFooter>
                  <Button 
                    className="w-full bg-blue-600"
                    onClick={() => setChatOpen(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Conversation
                  </Button>
                </CardFooter>
              )}
              
              {/* Open chat */}
              {chatOpen && (
                <>
                  <CardContent className="p-4">
                    <div className="h-[300px] overflow-y-auto border rounded-md p-4 mb-4 space-y-4">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-12">
                          <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                          <p>Ask any questions about your options!</p>
                          <p className="text-sm mt-2">For example: "What documents do I need for Portugal's D7 visa?"</p>
                        </div>
                      ) : (
                        chatMessages.map(msg => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.sender === 'user' 
                                  ? 'bg-blue-600 text-white rounded-br-none' 
                                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                              <p className="text-[10px] opacity-70 mt-1 text-right">
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your question..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={sendingMessage || !message.trim()}
                        className="bg-blue-600"
                      >
                        {sendingMessage ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setChatOpen(false);
                        setChatMessages([]);
                      }}
                    >
                      Close Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowContactPrompt(true)}
                    >
                      Request Expert Consultation
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Email Dialog */}
      <AlertDialog open={showContactPrompt} onOpenChange={setShowContactPrompt}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enter Your Email</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide your email so our specialist can contact you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-blue-600"
              onClick={handleRequestConsultation}
              disabled={!contactEmail.trim()}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
