"use client";

import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage, MessageProps } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Suggestions } from "@/components/Suggestions";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialMessages: MessageProps[] = [
  {
    id: "welcome",
    role: "ai",
    content: "Hello! I'm UniMate, your AI-powered student assistant. How can I help you today?",
  },
];

export default function Dashboard() {
  const [messages, setMessages] = useState<MessageProps[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSend = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMsg: MessageProps = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponseContent = getMockResponse(content);
      const aiMsg: MessageProps = { 
        id: (Date.now() + 1).toString(), 
        role: "ai", 
        content: aiResponseContent 
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500); // 1.5s thinking time
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      {/* Background gradient effect logic */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <ChatHeader />

        <div className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 lg:px-12 w-full custom-scrollbar">
            <div className="mx-auto w-full max-w-4xl py-6 pb-24 relative min-h-full">
              <div className="flex flex-col space-y-2">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} {...msg} />
                ))}

                {isTyping && (
                  <ChatMessage 
                    id="typing" 
                    role="ai" 
                    content="Thinking..." 
                    isStreaming={true} 
                  />
                )}
              </div>

              {/* Suggestions right after welcome message */}
              {showSuggestions && !isTyping && (
                <div className="mt-8">
                  <Suggestions onSelect={handleSend} />
                </div>
              )}
              <div ref={scrollRef} className="h-px pb-8" />
            </div>
          </div>
          
          {/* Scroll to Bottom Button */}
          {messages.length > 2 && (
            <div className="absolute bottom-4 right-1/2 translate-x-[200px] md:translate-x-[400px] z-20">
              <Button
                onClick={scrollToBottom}
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-xl hover:bg-black/80 hover:scale-105 transition-all"
              >
                <ChevronDown size={20} />
              </Button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="w-full shrink-0 relative z-10 bg-background/50 backdrop-blur-sm border-t border-white/5 md:border-none md:bg-transparent md:backdrop-blur-none">
          <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
    </>
  );
}

function getMockResponse(query: string) {
  const q = query.toLowerCase();
  if (q.includes("attendance")) return "Your current attendance is 85% across all subjects. You have a low attendance (65%) in Data Structures. You need to attend 3 more classes to reach the 75% threshold.";
  if (q.includes("timetable") || q.includes("class")) return "You have 3 classes today:\n\n• 10:00 AM - Data Structures (Room 304)\n• 11:30 AM - Database Systems (Lab 2)\n• 2:00 PM - Software Engineering (Room 101)";
  if (q.includes("result") || q.includes("grade")) return "Your latest semester SGPA is 8.4. Highest grade was 'A+' in Database Systems.";
  return "I understand. As an AI assistant, I can connect to your university portal to fetch live details. This is currently a simulated response, but the frontend is fully ready to connect to your backend APIs later!";
}
