"use client";

import { Bot } from "lucide-react";

export function ChatHeader() {
  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-black/10 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu space for later */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wide">UniMate</span>
            <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-400/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              Online
            </div>
          </div>
          <span className="text-xs text-muted-foreground">AI Assistant</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {/* Optional header actions */}
      </div>
    </div>
  );
}
