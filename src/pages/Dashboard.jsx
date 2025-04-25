import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from "@/utils";
// import { InvokeLLM } from "@/api/integrations";
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
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
  Loader2,
  UserRoundCheck
} from "lucide-react";

export default function Dashboard() {
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    chatPhase: 'initial', // initial, goal_identified, citizenship_identified, ancestry_identified, age_identified, email_identified, recommendation
    goal: '',
    goalType: '',
    citizenship: '',
    ancestry: '',
    age: '',
    email: '',
    messageHistory: [],
  });
  
  const chatContainerRef = useRef(null);

  // Initialize OpenAI client
  // IMPORTANT: In production, NEVER expose your API key directly in frontend code.
  // Use a backend proxy to handle API calls.
  // For this development example, we use Vite's env variable handling.
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Required for browser usage
  });

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
      const systemPrompt = `You are a helpful global mobility advisor. Begin the conversation with a warm greeting and ask the user about their main goal (e.g., retire abroad, get a backup passport, work as a digital nomad). Keep your response conversational and friendly.`;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: systemPrompt }]
      });
      const response = completion.choices[0].message.content;
      
      const initialBotMessage = {
        id: Date.now(),
        sender: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages([initialBotMessage]);
      setUserData(prev => ({ ...prev, chatPhase: 'initial', messageHistory: [
        { role: "system", content: systemPrompt },
        { role: "assistant", content: response }
      ]}));
      
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        content: "Hi! I'm here to guide your global mobility journey. What's your main goal? (e.g., retire abroad, get a backup passport, work as a digital nomad)",
        timestamp: new Date()
      }]);
      setUserData(prev => ({ ...prev, chatPhase: 'initial', messageHistory: []}));
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
      let systemPrompt = '';
      let nextChatPhase = userData.chatPhase; 
      let updatedUserData = { ...userData };

      // Prepare message history for OpenAI
      const currentMessagesForAPI = [
        ...userData.messageHistory,
        { role: "user", content: currentInput }
      ];

      // Determine the next step and construct the system prompt
      switch (userData.chatPhase) {
        case 'initial':
          const goalType = processUserGoal(currentInput);
          updatedUserData = { ...updatedUserData, goal: currentInput, goalType: goalType };
          systemPrompt = `The user's main goal is: "${currentInput}" (identified as type: ${goalType}). 
                          Now, ask for their current citizenship. Keep it brief and friendly.`;
          nextChatPhase = 'goal_identified';
          break;
          
        case 'goal_identified':
          updatedUserData = { ...updatedUserData, citizenship: currentInput };
          systemPrompt = `The user's citizenship is: "${currentInput}". 
                          Now, ask if they have any known ancestry or heritage (e.g., Italian grandparents) that might be relevant for citizenship by descent. Keep it brief.`;
          nextChatPhase = 'citizenship_identified';
          break;

        case 'citizenship_identified':
          updatedUserData = { ...updatedUserData, ancestry: currentInput };
          systemPrompt = `The user mentioned ancestry: "${currentInput}". 
                          Now, ask for their approximate age group (e.g., 20-30, 30-40, 40-50, 50+). Keep it brief.`;
          nextChatPhase = 'ancestry_identified';
          break;

        case 'ancestry_identified':
          updatedUserData = { ...updatedUserData, age: currentInput };
          systemPrompt = `The user's age group is: "${currentInput}". 
                          Great! To send you a personalized summary later, could you please provide your email address?`;
          nextChatPhase = 'email_identified';
          break;

        case 'email_identified':
          updatedUserData = { ...updatedUserData, email: currentInput };
          // This is the final prompt before recommendation
          systemPrompt = `Okay, I have the user's email: ${currentInput}. Now, generate a detailed recommendation based on all the information gathered:
                          Goal: ${updatedUserData.goal} (Type: ${updatedUserData.goalType})
                          Citizenship: ${updatedUserData.citizenship}
                          Ancestry: ${updatedUserData.ancestry}
                          Age Group: ${updatedUserData.age}
                          
                          Provide a helpful summary and list 2-3 specific programs if possible under a "RECOMMENDED PROGRAMS:" heading. Render key terms like program names or types in **bold markdown**. 
                          Also, mention that a summary will be sent to their email (though don't actually send it).`;
          nextChatPhase = 'recommendation'; 
          break;

        case 'recommendation':
        default:
          // Handle follow-up questions after recommendation
          systemPrompt = `The user is asking a follow-up question after receiving recommendations. 
                          Their profile: Goal: ${userData.goal}, Citizenship: ${userData.citizenship}, Ancestry: ${userData.ancestry}, Age: ${userData.age}. 
                          The chat history is provided. Answer their current question: "${currentInput}". Use **bold markdown** for emphasis where appropriate.`;
          // Keep chatPhase as 'recommendation'
          break;
      }
      
      // Add the specific system prompt for this turn to the *start* of the messages for the API call
      currentMessagesForAPI.unshift({ role: "system", content: systemPrompt });

      // Make the API call to OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: currentMessagesForAPI
      });
      const response = completion.choices[0].message.content;
      
      // Update state: user data, chat phase, and message history
      updatedUserData.chatPhase = nextChatPhase;
      updatedUserData.messageHistory = [
        ...currentMessagesForAPI, // Includes the system prompt we added
        { role: "assistant", content: response } // Add the actual assistant response
      ];
      setUserData(updatedUserData);

      // Add bot response to UI
      const botMessage = {
        id: Date.now() + 1, // Ensure unique ID
        sender: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
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
      citizenship: '',
      ancestry: '',
      age: '',
      email: '',
      messageHistory: []
    });
    setMessages([]);
    startChat();
  };

  return (
    <div className={`min-h-screen font-['Poppins'] ${chatStarted ? 'chat-active-layout' : ''}`}>
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
                Retiring? Seeking a backup plan? Going nomad? Our AI guides you to your ideal destination, and our expert advisors can then help get you there.
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
        // Chatbot UI - Apply wider style conditionally
        <div className={`mx-auto px-4 py-8 ${chatStarted ? 'max-w-4xl' : 'max-w-2xl'}`}>
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
                // Increased height for active chat
                className={`chatbot-container overflow-y-auto p-4 ${chatStarted ? 'h-[60vh]' : 'h-[400px]'}`}
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
                        {/* Render bot messages using ReactMarkdown */}
                        {message.sender === 'bot' ? (
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        ) : (
                          message.content
                        )}
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
                {/* Render partner button conditionally */}
                {userData.chatPhase === 'recommendation' && !loading && (
                  <Button
                    variant="outline"
                    className="w-full mb-2 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    onClick={() => {
                      console.log("Navigate to partner contact/referral page");
                      // Potentially navigate: navigate('/contact-partners')
                    }}
                  >
                    <UserRoundCheck className="mr-2 h-4 w-4" />
                    Explore Further with an Expert Partner
                  </Button>
                )}
                
                {/* Input and Send Button */}
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
                
                {/* Reset button - adjusted condition */}
                {userData.chatPhase !== 'initial' && !loading && (
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={resetChat}
                  >
                    Start a New Conversation
                  </Button>
                )}
                
                {/* Disclaimer */}
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