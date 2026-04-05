"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SuggestionsProps {
  onSelect: (text: string) => void;
}

const suggestions = [
  "Check my attendance",
  "Show today's timetable",
  "What is my next class?",
];

export function Suggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {suggestions.map((text, i) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }}
        >
          <Button
            variant="outline"
            className="rounded-xl border-white/10 bg-white/5 px-4 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
            onClick={() => onSelect(text)}
          >
            {text}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
