import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Bot, User, Send, Loader2, X } from 'lucide-react';
// import OpenAI from 'openai'; // API calls should happen on backend

// Placeholder for API interaction
async function getChatbotResponse(messages) {
  // ** THIS IS A PLACEHOLDER - Simulating backend AI response **
  console.log("Simulating backend call with messages:", messages);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
  let botReply = "That's an interesting point! Could you tell me a bit more?"; // Default fallback

  // --- Mobility Keywords ---
  const mobilityKeywords = ["visa", "passport", "residency", "nomad", "move", "relocate", "citizenship"];
  if (mobilityKeywords.some(keyword => lastUserMessage.includes(keyword))) {
    const responses = [
      "Navigating global mobility options like visas and passports is key to freedom. What specific countries or goals are you exploring? We help members streamline this.",
      "That relates to global mobility, a core focus for our members. Are you thinking about short-term travel, long-term residency, or perhaps a backup passport?",
      "Understanding mobility options is crucial. We offer resources and expert connections for residency and citizenship pathways. What's your main objective?"
    ];
    botReply = responses[Math.floor(Math.random() * responses.length)];
  }

  // --- Healthcare Keywords ---
  const healthcareKeywords = ["healthcare", "health", "insurance", "doctor", "medical", "telemedicine"];
  if (healthcareKeywords.some(keyword => lastUserMessage.includes(keyword))) {
    const responses = [
      "Accessing reliable healthcare internationally is vital. Are you concerned about insurance coverage, finding doctors, or emergency care? We guide members through this.",
      "Global healthcare can be complex. We help our community navigate international health insurance and telemedicine options. What are your specific needs?",
      "That's an important aspect of living abroad. Are you looking for comprehensive insurance or specific types of medical access?"
    ];
    botReply = responses[Math.floor(Math.random() * responses.length)];
  }

  // --- Community/Lifestyle Keywords ---
  const communityKeywords = ["community", "connect", "meet", "lifestyle", "retire", "friends", "network"];
  if (communityKeywords.some(keyword => lastUserMessage.includes(keyword))) {
    const responses = [
      "Connecting with like-minded people is a big part of the freedom lifestyle. Are you looking to meet other expats, nomads, or retirees? Our community fosters these connections.",
      "Building a community abroad makes a huge difference. What kind of connections or lifestyle are you aiming for?",
      "Retirement abroad is a popular goal! Finding the right community and lifestyle is key. What does your ideal retirement look like?"
    ];
    botReply = responses[Math.floor(Math.random() * responses.length)];
  }

  // --- Suggest Joining (Randomly after a few messages) ---
  if (messages.length > 4 && Math.random() < 0.25) { // Approx 25% chance after 2 user messages
    const joinResponses = [
      "Exploring these topics in depth is something we do within the Freedom Collective community. Would you be interested in learning more about joining?",
      "Many members of the Freedom Collective share similar goals. Joining allows access to more detailed resources and expert connections.",
      "These are exactly the kinds of challenges and opportunities our community helps navigate. You can learn more about joining on our website."
    ];
    // Append suggestion instead of replacing, unless it was the default fallback
    if (botReply === "That's an interesting point! Could you tell me a bit more?") {
       botReply = joinResponses[Math.floor(Math.random() * joinResponses.length)];
    } else {
        botReply += "\n\n" + joinResponses[Math.floor(Math.random() * joinResponses.length)];
    }
  }
  
  // --- Simple fallback for generic greetings or short messages ---
  else if (lastUserMessage.length < 15 && messages.length <= 2) {
    botReply = "Thanks for reaching out! How can I help you maximize your freedom today? Ask me about mobility, healthcare, or lifestyle abroad.";
  }

  console.log("Simulated Bot Reply:", botReply);
  return botReply;
}

export default function ChatbotWidget({ isVisible, onClose }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Initial message with updated prompt
  useEffect(() => {
    if (isVisible && messages.length === 0) {
        setMessages([
            {
                id: Date.now(),
                sender: 'bot',
                content: "Hi! What are your goals? Retire abroad, get a backup passport or extra residency, go full nomad, get our concierge teledocs activated for you and your family? Maybe all of these? Let us know what you're thinking...",
                timestamp: new Date()
            }
        ]);
    }
  }, [isVisible]); // Add dependency on isVisible

  // Scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: userInput,
      timestamp: new Date()
    };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setUserInput('');
    setLoading(true);

    try {
      // Prepare message history for API (if needed)
      const historyForApi = currentMessages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user', 
        content: msg.content
      }));
      
      // ** Replace with actual API call to your backend **
      const response = await getChatbotResponse(historyForApi);

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        content: "Sorry, I couldn't connect to the server. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) {
    return null; // Don't render if not visible
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 font-poppins">
      <Card className="w-80 h-[500px] flex flex-col shadow-xl border-brand-gold border-2 rounded-lg bg-brand-background">
        <CardHeader className="flex flex-row items-center justify-between p-3 bg-brand-deep-blue text-brand-background rounded-t-lg">
          <CardTitle className="text-base font-semibold">Freedom Guide</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-brand-background hover:bg-white/20 h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-3 space-y-3 bg-brand-background">
          <div ref={chatContainerRef} className="h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`my-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`p-2 px-3 rounded-lg max-w-[85%] shadow-sm 
                  ${message.sender === 'user' 
                    ? 'bg-brand-gold text-brand-deep-blue rounded-br-none' 
                    : 'bg-gray-100 text-brand-deep-blue rounded-bl-none'}
                `}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="my-2 flex justify-start">
                <div className="p-2 px-3 rounded-lg bg-gray-100 text-neutral-900 shadow-sm">
                  <div className="flex items-center space-x-1 text-xs text-neutral-600">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Ask something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } }}
              disabled={loading}
              className="flex-1 text-sm bg-white focus:ring-brand-gold border-gray-300"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!userInput.trim() || loading}
              size="icon"
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-deep-blue flex-shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 