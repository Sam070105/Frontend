"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessageProps {
  id: string;
  role: "user" | "ai";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: MessageProps) {
  const isAI = role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full items-start gap-4 px-4 py-6",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      {/* AI Avatar */}
      {isAI && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-purple-400 text-white shadow-md shadow-primary/20">
          <Bot size={18} />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
          isAI 
            ? "bg-white/5 text-white border border-white/5 rounded-tl-none font-medium" 
            : "bg-primary/20 text-white rounded-tr-none border border-primary/20 font-medium"
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        
        {/* Streaming cursor simulation */}
        {isStreaming && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block h-4 w-1.5 ml-1 bg-primary align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}
