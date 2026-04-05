"use client";

import { useState } from "react";
import { Send, Mic, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? " " : "") + transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl p-4">
      {/* Background glow and glass effect wrapper */}
      <div className="relative flex items-end gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-primary/50 focus-within:shadow-primary/20">
        
        {/* Actions - Attachment */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0 rounded-xl text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
        >
          <Paperclip size={20} />
        </Button>

        {/* Text Input */}
        <TextareaAutosize
          minRows={1}
          maxRows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask UniMate anything..."
          className="max-h-[150px] w-full resize-none bg-transparent py-2.5 text-sm text-white placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Actions - Voice & Send */}
        <div className="flex shrink-0 items-center gap-1 pb-0.5 pr-0.5">
          {!input.trim() ? (
            <Button
              onClick={isRecording ? undefined : startRecording}
              variant="ghost"
              size="icon"
              title="Voice Input"
              className={cn(
                "h-9 w-9 rounded-xl transition-all",
                isRecording 
                  ? "bg-red-500/20 text-red-500 animate-pulse hover:bg-red-500/30" 
                  : "text-muted-foreground hover:bg-white/10 hover:text-white"
              )}
            >
              <Mic size={20} />
            </Button>
          ) : (
            <Button
              onClick={handleSend}
              disabled={disabled}
              size="icon"
              className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-purple-500 shadow-md shadow-primary/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send size={18} className="text-white" />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-2 text-center text-[10px] text-muted-foreground/60">
        UniMate AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
