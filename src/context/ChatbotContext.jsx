import React, { createContext, useState, useContext, useCallback } from 'react';

const ChatbotContext = createContext();

export function useChatbot() {
  return useContext(ChatbotContext);
}

export function ChatbotProvider({ children }) {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const openChatbot = useCallback(() => {
    console.log("Context: Opening Chatbot");
    setIsChatbotVisible(true);
  }, []);

  const closeChatbot = useCallback(() => {
    console.log("Context: Closing Chatbot");
    setIsChatbotVisible(false);
  }, []);

  const value = {
    isChatbotVisible,
    openChatbot,
    closeChatbot
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
} 