"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollmentId.trim()) return;
    
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-8 shadow-2xl shadow-primary/20 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-primary/50 text-white shadow-lg shadow-primary/30"
          >
            <Bot size={32} />
          </motion.div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Hi, welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                UniMate
              </span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Your AI-powered student assistant
            </p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enrollment / Student ID"
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                className="h-12 border-white/10 bg-black/20 px-4 text-white placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading || !enrollmentId.trim()}
              className="h-12 w-full bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-primary/40 active:scale-[0.98]"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white"
                />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
