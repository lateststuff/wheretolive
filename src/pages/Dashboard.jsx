import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    chatPhase: 'initial', // initial, goal_identified, citizenship_identified, ancestry_identified, age_identified, initial_recommendation_given, email_requested, final_recommendation_delivered
    goal: '',
    goalType: '',
    citizenship: '',
    ancestry: '',
    age: '',
    email: '',
    messageHistory: [],
  });
  
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

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
  
  const startChat = async (goalType = 'general') => {
    setChatStarted(true);
    setLoading(true);
    setMessages([]);
    
    try {
      let initialUserGoal = '';
      let systemPrompt = '';

      // Select the initial prompt based on the goalType
      switch (goalType) {
        case 'retirement':
          initialUserGoal = "I'm interested in retiring abroad.";
          systemPrompt = `The user clicked on "Retire Abroad". Start the conversation warmly acknowledging their interest in retirement and ask: "So- you've worked hard all your life and want to retire somewhere great I take it? What parts of the world were you imagining?"`;
          break;
        case 'citizenship':
          initialUserGoal = "I'm interested in a backup passport/citizenship.";
          systemPrompt = `The user clicked on "Backup Passport". Start by acknowledging this interest and ask: "Got it- thinking about different backup options for citizenship. There are lots of ways to do this- ancestry may provide one path and of course there are citizenship by investment programs. What's your main reason for wanting a back up plan?"`;
          break;
        case 'nomad':
          initialUserGoal = "I'm interested in working remotely abroad.";
          systemPrompt = `The user clicked on "Work Remotely". Acknowledge their interest and ask: "Awesome- you're thinking about working remotely- what parts of the world did you have in mind? There are lots of options"`;
          break;
        default: // Generic start
          initialUserGoal = "Tell me about living abroad.";
          systemPrompt = `You are a helpful global mobility advisor. Begin the conversation with a warm greeting and ask the user about their main goal (e.g., retire abroad, get a backup passport, work as a digital nomad). Keep your response conversational and friendly.`;
          break;
      }

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
      
      // Set user data AND the *correct next phase*
      setUserData(prev => ({
        ...prev,
        goal: initialUserGoal,
        goalType: goalType,
        chatPhase: 'goal_identified', // <-- CORRECTED: Set phase to expect citizenship next
        messageHistory: [
          { role: "system", content: systemPrompt },
          { role: "assistant", content: response }
        ]
      }));
      
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([{
        id: Date.now(),
        sender: 'bot',
        // Provide a generic starter message on error
        content: "Hi! I'm here to guide your global mobility journey. What's your main goal?", 
        timestamp: new Date()
      }]);
      // Reset state on error too
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
      console.log(`[DEBUG] Entering handleSendMessage. Current phase: ${userData.chatPhase}`);
      let systemPrompt = '';
      let nextChatPhase = userData.chatPhase;
      let updatedUserData = { ...userData };

      const currentMessagesForAPI = [
        ...userData.messageHistory,
        { role: "user", content: currentInput }
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      switch (userData.chatPhase) {
        case 'initial': 
          const goalType = processUserGoal(currentInput);
          updatedUserData = { ...updatedUserData, goal: currentInput, goalType: goalType };
          systemPrompt = `The user's goal is "${currentInput}" (type: ${goalType}). Your ONLY task now is to ask the user for their current country of citizenship. Ask nothing else. Keep it brief and friendly. Example: "Okay, aiming for ${goalType}! What's your current country of citizenship?"`;
          nextChatPhase = 'goal_identified';
          break;

        case 'goal_identified': 
          updatedUserData = { ...updatedUserData, citizenship: currentInput };
          systemPrompt = `The user's citizenship is "${currentInput}". Your ONLY task now is to ask about recent family ancestry (parents, grandparents) relevant to citizenship by descent. Ask nothing else. Keep it brief. Example: "Thanks! Do you have any recent family ancestry (e.g., from Europe) that might offer citizenship paths? (Okay to say 'No' or 'Unsure')"`;
          nextChatPhase = 'citizenship_identified';
          break;

        case 'citizenship_identified':
          updatedUserData = { ...updatedUserData, ancestry: currentInput };
          systemPrompt = `Ancestry info: "${currentInput}". Your ONLY task now is to ask for their approximate age group (e.g., 20s, 30s, 40s, 50+). Ask nothing else. Keep it brief. Example: "Got it. And roughly which age group are you in?"`;
          nextChatPhase = 'ancestry_identified';
          break;

        case 'ancestry_identified':
          updatedUserData = { ...updatedUserData, age: currentInput };
          systemPrompt = `Age group: "${currentInput}". Now, provide a brief initial recommendation. Based ONLY on Goal: ${updatedUserData.goal}, Citizenship: ${updatedUserData.citizenship}, Ancestry: ${updatedUserData.ancestry}, Age: ${currentInput}. Generate a concise summary of 1-2 promising pathways (like specific visas or citizenship types). Use **bold markdown** for program names/types. Keep this initial summary very brief. Do NOT ask any questions yet.`;
          nextChatPhase = 'initial_recommendation_given';
          break;

        case 'initial_recommendation_given':
          systemPrompt = `Okay, those were some initial ideas. For a more detailed report covering requirements, costs, timelines, and potential alternatives tailored to you, what's the best email address to send it to? (You can also type 'skip'). Ask ONLY for the email or the option to skip.`;
          nextChatPhase = 'email_requested';
          break;

        case 'email_requested':
          if (emailRegex.test(currentInput)) {
            updatedUserData = { ...updatedUserData, email: currentInput };
            systemPrompt = `Perfect, got it: ${currentInput}. I'll prepare that detailed report. Your ONLY task now is to confirm receipt and invite them to connect with an expert partner using the button below for direct application assistance. Example: "Great, report is on its way to ${currentInput}! For direct help with applications, feel free to connect with an expert partner below."`;
            nextChatPhase = 'final_recommendation_delivered';
          } else if (currentInput.toLowerCase().trim() === 'skip') {
            updatedUserData = { ...updatedUserData, email: 'skipped' };
            systemPrompt = `Okay, skipping the email. Your ONLY task now is to invite them to connect with an expert partner using the button below for detailed info or application help. Example: "Okay, skipping the email. For detailed info or application help, feel free to connect with an expert partner below."`;
            nextChatPhase = 'final_recommendation_delivered';
          } else {
            systemPrompt = `Hmm, that doesn't look quite like an email address. Your ONLY task now is to ask again for a valid email for the detailed report, or tell them they can type 'skip'. Ask nothing else.`;
            nextChatPhase = 'email_requested';
          }
          break;

        case 'final_recommendation_delivered':
        default:
          systemPrompt = `The user is asking a follow-up question after receiving recommendations and the partner connection offer. Their profile: Goal: ${userData.goal}, Citizenship: ${userData.citizenship}, Ancestry: ${userData.ancestry}, Age: ${userData.age}, Email: ${userData.email}. The chat history is provided. Answer ONLY their current question: "${currentInput}". Keep it helpful and friendly. Use **bold markdown** where appropriate. Do not ask further questions unless necessary to clarify their current one.`;
          nextChatPhase = 'final_recommendation_delivered';
          break;
      }
      
      console.log(`[DEBUG] Determined next phase: ${nextChatPhase}. Sending prompt to AI.`);
      
      currentMessagesForAPI.unshift({ role: "system", content: systemPrompt });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: currentMessagesForAPI
      });
      const response = completion.choices[0].message.content;

      updatedUserData.chatPhase = nextChatPhase;
      const historyToSave = currentMessagesForAPI.filter(msg => msg.role !== 'system');
      historyToSave.push({ role: "assistant", content: response });
      updatedUserData.messageHistory = historyToSave;
      setUserData(updatedUserData);

      const botMessage = {
        id: Date.now() + 1,
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
      goalType: 'general',
      citizenship: '',
      ancestry: '',
      age: '',
      email: '',
      messageHistory: []
    });
    setMessages([]);
    setChatStarted(false);
  };

  return (
    <div className={`min-h-screen font-['Poppins'] ${chatStarted ? 'chat-active-layout' : ''}`}>
      <title>Your Guide to Living Abroad</title>

      {!chatStarted ? (
        <div className="max-w-7xl mx-auto">
          {/* Header - Restore original structure */}
          <header className="px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <a href="/" className="brand-title no-underline bg-transparent p-0 hover:text-brand-blue">
                Unlock Your Life
              </a>
              <Link 
                to={createPageUrl("MobilityOptions")} 
                className="nav-link-learning-center"
              >
                Roadmap to Residency & Citizenship Programs
              </Link>
            </div>
          </header>

          {/* Hero Section - Restore original structure, keep updated paragraph */}
          <div className="hero-section">
            <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
              <h1 className="text-[28px] sm:text-[32px] font-bold text-brand-blue-dark mb-4">
                Discover Where You Can Live, Your Way
              </h1>
              <p className="text-[18px] text-neutral-700 mb-8 max-w-2xl mx-auto">
                Countries are fiercely competing for global talent, rolling out new visas and citizenship programs yearly. Whether you seek a backup passport, digital nomad freedom, or a dream retirement, our AI crafts tailored paths, and our expert advisors turn your vision into reality.
              </p>
              <Button 
                className="start-journey-btn bg-brand-blue hover:bg-brand-blue-dark text-white px-20 py-12 text-4xl"
                onClick={() => startChat('general')}
              >
                Find Your Path
                <ArrowRight className="ml-4 h-8 w-8" />
              </Button>
            </div>
          </div>

          {/* Goal-Based Cards - Reduce vertical padding */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  type: 'retirement', // Add type
                  title: "Retire Abroad",
                  description: "Plan your dream retirement with affordable visas.",
                  icon: <Palmtree className="h-8 w-8 text-brand-blue" />,
                },
                {
                  type: 'citizenship', // Add type
                  title: "Backup Passport",
                  description: "Secure a second citizenship for peace of mind.",
                  icon: <Globe className="h-8 w-8 text-brand-blue" />,
                },
                {
                  type: 'nomad', // Add type
                  title: "Work Remotely",
                  description: "Find digital nomad visas for your next adventure.",
                  icon: <PlaneTakeoff className="h-8 w-8 text-brand-blue" />,
                }
              ].map((card) => ( // Changed index to card object
                <Card key={card.type} className="goal-card"> 
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-block p-3 bg-brand-blue-light rounded-full">{card.icon}</div>
                    <h3 className="text-[18px] font-semibold text-brand-blue-dark mb-3">{card.title}</h3>
                    <p className="text-[14px] text-neutral-700 mb-6">{card.description}</p>
                    <Button 
                      variant="outline" 
                      className="chat-now-btn"
                      onClick={() => startChat(card.type)} // Pass the type here
                    >
                      Chat Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      ) : (
        // Chatbot UI
        <div className={`mx-auto px-4 py-8 ${chatStarted ? 'max-w-4xl' : 'max-w-2xl'}`}>
          <Card className="border shadow-lg">
            {/* Header - Use brand colors */}
            <CardHeader className="bg-brand-blue text-white">
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Your Global Mobility Guide
              </CardTitle>
              <CardDescription className="text-blue-100"> {/* Consider a lighter brand color variable */}
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
                    {/* Chat bubble with shadow */}
                    <div className={`
                      p-3 rounded-lg max-w-[80%] shadow-md 
                      ${message.sender === 'user' 
                        ? 'bg-brand-blue text-white rounded-br-none' 
                        : 'bg-gray-100 text-neutral-900 rounded-bl-none'}
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
                      <div className="text-[16px] whitespace-pre-wrap message-content">
                        {/* Render bot messages using ReactMarkdown */}
                        {message.sender === 'bot' ? (
                          // Temporarily removed prose classes for debugging
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
                    <div className="p-3 rounded-lg max-w-[80%] bg-gray-100 text-neutral-900 shadow-md">
                      {/* Loading indicator with text */}
                      <div className="flex items-center space-x-2 text-sm text-neutral-600">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t">
              <div className="flex w-full flex-col gap-2">
                {/* Partner button - Restore condition */}
                {userData.chatPhase === 'final_recommendation_delivered' && !loading && (
                  <Button
                    variant="default"
                    className="w-full mb-2 bg-brand-blue hover:bg-brand-blue-dark text-white"
                    onClick={() => {
                      console.log("Navigating to partner contact page");
                      navigate('/contact-partner');
                    }}
                  >
                    <UserRoundCheck className="mr-2 h-4 w-4" />
                    Connect with an Expert Partner
                  </Button>
                )}
                
                {/* Input and Send Button - Use brand color */}
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
                    className="bg-brand-blue hover:bg-brand-blue-dark" /* Use brand colors */
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