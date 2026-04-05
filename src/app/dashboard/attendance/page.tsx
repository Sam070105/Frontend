"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  CalendarCheck, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AttendanceCalculator() {
  const [total, setTotal] = useState<string>("");
  const [attended, setAttended] = useState<string>("");
  const [result, setResult] = useState<{
    percent: number;
    needed: number;
    buffer: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    const t = parseInt(total);
    const a = parseInt(attended);
    
    if (isNaN(t) || isNaN(a) || t <= 0 || a < 0 || a > t) return;
    
    const percent = (a / t) * 100;
    
    // Calculation for classes needed to achieve 75%
    // (a + x) / (t + x) = 0.75 => a + x = 0.75t + 0.75x => 0.25x = 0.75t - a => x = 3t - 4a
    let needed = Math.ceil(3 * t - 4 * a);
    needed = needed > 0 ? needed : 0;

    // Calculation for buffer (how many future classes can be missed while staying >= 75%)
    // a / (t + y) >= 0.75 => a >= 0.75t + 0.75y => y <= (a - 0.75t) / 0.75 => y <= (4/3)a - t
    let buffer = Math.floor((4 / 3) * a - t);
    buffer = buffer > 0 ? buffer : 0;

    // Special case handling for 100% attendance if small t
    if (percent === 100 && t > 0) {
       buffer = Math.floor((4 / 3) * a - t);
    }

    setResult({ percent: parseFloat(percent.toFixed(1)), needed, buffer });
  };

  const isSafe = result ? result.percent >= 75 : false;

  return (
    <div className="flex-1 overflow-y-auto px-4 lg:px-12 w-full custom-scrollbar py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Calculator size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Attendance Calculator</h1>
            <p className="text-sm text-muted-foreground mt-1">Plan your classes wisely to stay in the safe zone.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl"
          >
            <form onSubmit={calculate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Total Classes Held</label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="e.g. 40"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Classes Attended</label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="e.g. 28"
                    value={attended}
                    onChange={(e) => setAttended(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 text-lg"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={!total || !attended || parseInt(attended) > parseInt(total)}
                className="w-full h-12 bg-gradient-to-r from-primary to-purple-500 hover:to-purple-600 text-white font-medium text-lg rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Calculate Now
              </Button>
              
              {parseInt(attended) > parseInt(total) && (
                <p className="text-red-400 text-sm text-center font-medium animate-pulse">
                  Attended classes cannot exceed total classes
                </p>
              )}
            </form>
          </motion.div>

          {/* Results Display */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-3xl border p-6 shadow-2xl backdrop-blur-xl transition-all ${
                    isSafe 
                      ? "bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/10" 
                      : "bg-red-500/10 border-red-500/30 shadow-red-500/10"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center text-center space-y-4">
                    
                    <div className="relative flex items-center justify-center h-40 w-40">
                      {/* Circular Progress Ring */}
                      <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                        <circle
                          className="text-white/5"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                        />
                        <motion.circle
                          initial={{ strokeDashoffset: 264 }}
                          animate={{ strokeDashoffset: 264 - (264 * result.percent) / 100 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={isSafe ? "text-emerald-400" : "text-red-400"}
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="42"
                          cx="50"
                          cy="50"
                          strokeDasharray="264"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className={`text-4xl font-bold tracking-tighter ${isSafe ? "text-emerald-400" : "text-red-400"}`}>
                          {result.percent}%
                        </span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">Status</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                       {isSafe ? (
                         <span className="flex items-center gap-1.5 text-emerald-400 font-medium px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                            <CheckCircle2 size={16} /> Meets 75% Requirement
                         </span>
                       ) : (
                         <span className="flex items-center gap-1.5 text-red-400 font-medium px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
                            <ShieldAlert size={16} /> Below 75% Requirement
                         </span>
                       )}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 pt-6 border-t border-white/5 text-sm">
                    {isSafe ? (
                      <div className="flex items-start gap-3 text-emerald-100/90 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                        <CalendarCheck className="mt-0.5 shrink-0 text-emerald-400" size={18} />
                        <p>
                          You are in the safe zone! You currently have <strong className="text-emerald-400 text-lg">{result.buffer}</strong> buffer classes. 
                          You can afford to miss {result.buffer} upcoming classes without falling below 75%.
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 text-red-100/90 bg-red-500/10 p-4 rounded-2xl border border-red-500/20">
                        <AlertTriangle className="mt-0.5 shrink-0 text-red-400" size={18} />
                        <p>
                          You are at risk! You must attend the next <strong className="text-red-400 text-lg">{result.needed}</strong> consecutive classes to reach the minimum 75% threshold.
                        </p>
                      </div>
                    )}
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 flex flex-col items-center justify-center text-center h-full min-h-[350px]"
                >
                  <TrendingUp className="text-white/20 mb-4" size={48} />
                  <h3 className="text-white font-medium mb-1">Awaiting Data</h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">Enter your class records on the left to calculate your standing.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
