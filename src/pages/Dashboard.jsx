import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from "@/utils";
import { InvokeLLM } from "@/api/integrations";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  PlaneTakeoff, 
  Palmtree, 
  Globe, 
  ArrowRight,
  BookOpen,
  Users,
  Send,
  User,
  Bot,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    chatPhase: 'initial', // initial, goal_identified, followup1, followup2, recommendation
    goal: '',
    goalType: '',
    followUp1: '',
    followUp2: '',
    location: 'United States', // Default location
  });
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const startChat = async () => {
    setChatStarted(true);
    setLoading(true);
    
    try {
      // Initial greeting from AI
      const initialPrompt = `You are a helpful global mobility advisor. Begin the conversation with a warm greeting and ask the user about their main goal (e.g., retire abroad, get a backup passport, work as a digital nomad). Keep your response conversational and friendly.`;
      
      const response = await InvokeLLM({
        prompt: initialPrompt,
        add_context_from_internet: false // No need for web search on initial greeting
      });
      
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        content: "Hi! I'm here to guide your global mobility journey. What's your main goal? (e.g., retire abroad, get a backup passport, work as a digital nomad)",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const processUserGoal = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    let goalType = 'general';
    
    if (lowerMessage.includes('retire') || lowerMessage.includes('retirement')) {
      goalType = 'retirement';
    } else if (lowerMessage.includes('passport') || lowerMessage.includes('citizenship') || lowerMessage.includes('nationali')) {
      goalType = 'citizenship';
    } else if (lowerMessage.includes('nomad') || lowerMessage.includes('remote') || 
              (lowerMessage.includes('work') && !lowerMessage.includes('retirement'))) {
      goalType = 'nomad';
    } else if (lowerMessage.includes('family') || lowerMessage.includes('relocate') || 
              lowerMessage.includes('move') || lowerMessage.includes('settle')) {
      goalType = 'relocation';
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('business')) {
      goalType = 'investment';
    } else if (lowerMessage.includes('tax') || lowerMessage.includes('financial')) {
      goalType = 'tax_optimization';
    }
    
    return goalType;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user's message to chat
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: userInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = userInput;
    setUserInput('');
    setLoading(true);
    
    try {
      let prompt = '';
      let shouldUseWebSearch = false;
      let updatedUserData = { ...userData };
      
      // Process based on current chat phase
      if (userData.chatPhase === 'initial') {
        // User has provided their initial goal
        const goalType = processUserGoal(currentInput);
        
        updatedUserData = {
          ...updatedUserData,
          goal: currentInput,
          goalType: goalType,
          chatPhase: 'goal_identified'
        };
        
        // Construct prompt to ask follow-up question based on goal type
        prompt = `The user's goal is: "${currentInput}". I've identified their goal type as ${goalType}.
        
        Based on this goal, ask ONE appropriate follow-up question to gather more information. 
        
        For retirement goals: Ask about monthly budget/income.
        For passport/citizenship goals: Ask about current citizenship and ancestry.
        For digital nomad goals: Ask about preferred region.
        For relocation goals: Ask about family size and requirements.
        For investment goals: Ask about investment budget.
        For tax optimization: Ask about current tax situation.
        For general goals: Ask about budget.
        
        Keep your response conversational, friendly, and brief (max 2 sentences). Just ask the follow-up question without listing options.`;
        
      } else if (userData.chatPhase === 'goal_identified') {
        // User has answered the first follow-up question
        updatedUserData = {
          ...updatedUserData,
          followUp1: currentInput,
          chatPhase: 'followup1'
        };
        
        // Construct prompt for second follow-up question
        prompt = `The user's goal is: "${userData.goal}" (goal type: ${userData.goalType}).
        They provided this additional information: "${currentInput}".
        
        Ask ONE more follow-up question to gather final information needed:
        
        For retirement goals: Ask about timeline for the move.
        For passport/citizenship goals: Ask about investment budget or timeline.
        For digital nomad goals: Ask about intended duration in each location.
        For relocation goals: Ask about timeline.
        For investment goals: Ask about preferred regions or industries.
        For tax optimization: Ask about citizenship/residency constraints.
        For general goals: Ask about specific countries of interest.
        
        Keep your response conversational, friendly and brief. Just ask the follow-up question without listing options.`;
        
      } else if (userData.chatPhase === 'followup1') {
        // User has answered the second follow-up question
        updatedUserData = {
          ...updatedUserData,
          followUp2: currentInput,
          chatPhase: 'recommendation'
        };
        
        // This is the final recommendation prompt - use web search here
        prompt = `Generate a detailed recommendation for someone with these global mobility goals and needs:
        
        Main goal: ${userData.goal}
        Goal type: ${userData.goalType}
        Additional info 1: ${userData.followUp1}
        Additional info 2: ${currentInput}
        
        Search the web for the most current and accurate information on visa programs, citizenship options, residency pathways that would suit this person.
        
        FORMAT YOUR RESPONSE:
        1. Start with a clear, personalized recommendation paragraph (around 50 words)
        2. Include 2-3 bullet points with KEY TERMS in ALL CAPS (like "CBI" or "GOLDEN VISA")
        3. Be specific with actual program names, costs, and requirements based on current information
        4. Include processing times and any recent changes to programs when relevant
        5. End by listing the specific PROGRAMS you're recommending in a section titled "RECOMMENDED PROGRAMS:"
        
        Example format (but use real, accurate information from web search):
        "Based on your goal to retire abroad with a $3,000 monthly budget, Portugal offers an excellent option through its D7 VISA. The pleasant climate and affordable cost of living align with your needs.
        
        • RESIDENCY REQUIREMENTS: Stay 7 days during first year, 14 days each subsequent year
        • INCOME NEEDED: Proof of passive income at least €8,460 annually
        • PATH TO CITIZENSHIP: Possible after 5 years of legal residency plus language test
        
        RECOMMENDED PROGRAMS:
        Portugal D7 Visa, Portugal Golden Visa (investment option), Spain Non-Lucrative Visa"
        
        Remember that requirements and costs for programs may have changed recently, so search for the most up-to-date information.`;
        
        shouldUseWebSearch = true;
        
      } else {
        // User is asking follow-up questions after recommendation
        prompt = `The user has already received recommendations for their global mobility goals and is now asking: "${currentInput}". 
        
        Their original goal was: "${userData.goal}" (type: ${userData.goalType})
        With these additional details: "${userData.followUp1}" and "${userData.followUp2}"
        
        Search the web for accurate, up-to-date information to answer their question.
        Provide specific details, including costs, requirements, and application procedures if relevant.
        Include bullet points for clarity when appropriate.
        End with a compassionate note acknowledging that mobility decisions are important life changes.`;
        
        shouldUseWebSearch = true;
      }
      
      setUserData(updatedUserData);
      
      // Make the API call with or without web search based on the phase
      const response = await InvokeLLM({
        prompt: prompt,
        add_context_from_internet: shouldUseWebSearch
      });
      
      // Extract recommended programs if we're at the recommendation phase
      if (updatedUserData.chatPhase === 'recommendation') {
        // Try to extract recommended programs from the response
        const programsMatch = response.match(/RECOMMENDED PROGRAMS:(.+?)($|\n\n)/s);
        if (programsMatch && programsMatch[1]) {
          const programsText = programsMatch[1].trim();
          const programsList = programsText.split(',').map(p => p.trim()).filter(p => p);
          console.log("Extracted programs:", programsList);
          // You could store these programs in state if needed
        }
      }
      
      // Add bot response
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'bot',
        content: "I'm sorry, I encountered a problem while processing your request. Could you try asking again?",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setUserData({
      chatPhase: 'initial',
      goal: '',
      goalType: '',
      followUp1: '',
      followUp2: '',
      location: 'United States'
    });
    
    setMessages([]);
    startChat();
  };

  return (
    <div className="min-h-screen font-['Poppins']">
      <title>Your Guide to Living Abroad</title>

      {!chatStarted ? (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="px-4 sm:px-6 lg:px-8 py-4 bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <a href="/" className="brand-title">
                Your Guide to Living Abroad
              </a>
              <Link 
                to={createPageUrl("MobilityOptions")} 
                className="nav-link-learning-center"
              >
                Learning Center
              </Link>
            </div>
          </header>

          {/* Hero Section */}
          <div className="hero-section">
            <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-[#003087] mb-4">
                Discover Where You Can Live, Your Way
              </h1>
              <p className="text-[18px] text-[#444] mb-8 max-w-2xl mx-auto">
                Retiring? Seeking a backup plan? Going nomad? Our AI guides you to your ideal destination.
              </p>
              <Button 
                className="start-journey-btn"
                onClick={startChat}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Goal-Based Cards */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Retire Abroad",
                  description: "Plan your dream retirement with affordable visas.",
                  icon: <Palmtree className="h-8 w-8 text-[#0057b8]" />,
                },
                {
                  title: "Backup Passport",
                  description: "Secure a second citizenship for peace of mind.",
                  icon: <Globe className="h-8 w-8 text-[#0057b8]" />,
                },
                {
                  title: "Work Remotely",
                  description: "Find digital nomad visas for your next adventure.",
                  icon: <PlaneTakeoff className="h-8 w-8 text-[#0057b8]" />,
                }
              ].map((card, index) => (
                <Card key={index} className="goal-card">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">{card.icon}</div>
                    <h3 className="text-[18px] font-semibold text-[#003087] mb-3">{card.title}</h3>
                    <p className="text-[14px] text-[#444] mb-6">{card.description}</p>
                    <Button 
                      variant="outline" 
                      className="chat-now-btn"
                      onClick={startChat}
                    >
                      Chat Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Stories Section */}
          <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-[24px] font-bold text-[#003087] mb-12 text-center">
                Success Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    name: "Jane",
                    location: "Portugal",
                    story: "Found her perfect digital nomad lifestyle in Porto",
                    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  },
                  {
                    name: "John",
                    location: "Malta",
                    story: "Living his dream retirement in the Mediterranean",
                    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
                  }
                ].map((story, index) => (
                  <Link 
                    key={index} 
                    to={createPageUrl("MobilityOptions")} 
                    className="story-card"
                  >
                    <Card>
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                        <img 
                          src={story.image} 
                          alt={story.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-[18px] font-semibold text-[#003087] mb-2">
                          Meet {story.name}, in {story.location}
                        </h3>
                        <p className="text-[14px] text-[#444]">{story.story}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Guides Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-[24px] font-bold text-[#003087] mb-12 text-center">
              Free Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Top 5 Retirement Destinations",
                  description: "Compare costs, visas, and lifestyle options",
                  icon: <Palmtree className="h-6 w-6" />
                },
                {
                  title: "Backup Passport Options",
                  description: "Learn about citizenship-by-investment programs",
                  icon: <Globe className="h-6 w-6" />
                }
              ].map((guide, index) => (
                <Link 
                  key={index} 
                  to={createPageUrl("MobilityOptions")} 
                  className="guide-card"
                >
                  <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="text-[#0057b8]">{guide.icon}</div>
                      <div>
                        <h3 className="text-[18px] font-semibold text-[#003087] mb-1">{guide.title}</h3>
                        <p className="text-[14px] text-[#444]">{guide.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : (
        // Chatbot UI
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="border shadow-lg">
            <CardHeader className="bg-[#0057b8] text-white">
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Your Global Mobility Guide
              </CardTitle>
              <CardDescription className="text-blue-100">
                I'll help you find your ideal destination abroad
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-0">
              <div 
                className="chatbot-container h-[400px] overflow-y-auto p-4"
                ref={chatContainerRef}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`my-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      p-3 rounded-lg max-w-[80%]
                      ${message.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'}
                    `}>
                      <div className="flex items-center mb-1">
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 mr-2" />
                        ) : (
                          <Bot className="h-4 w-4 mr-2" />
                        )}
                        <span className="text-xs opacity-75">
                          {message.sender === 'user' ? 'You' : 'Guide'}
                        </span>
                      </div>
                      <div className="text-[16px] whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="my-3 flex justify-start">
                    <div className="p-3 rounded-lg max-w-[80%] bg-gray-100 text-gray-800">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <div className="flex w-full flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!userInput.trim() || loading}
                    className="bg-[#0057b8]"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                {userData.chatPhase === 'recommendation' && !loading && messages.length > 2 && (
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={resetChat}
                  >
                    Start a New Conversation
                  </Button>
                )}
                
                <p className="text-xs text-gray-500 mt-3 text-center w-full">
                  This is not legal advice. Consult immigration professionals for your specific situation.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}