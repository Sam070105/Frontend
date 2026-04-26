"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Bot, 
  MessageSquare, 
  CalendarCheck, 
  Clock, 
  GraduationCap, 
  Settings,
  Menu,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: MessageSquare, label: "Chat", href: "/dashboard" },
  { icon: CalendarCheck, label: "Attendance", href: "/dashboard/attendance" },
  { icon: Clock, label: "Timetable", href: "#" },
  { icon: GraduationCap, label: "Results", href: "#" },
];

export function Sidebar({ className }: { className?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null); // 👈 NEW
  const router = useRouter();
  const pathname = usePathname();

  // 👇 LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div 
      className={cn(
        "relative flex h-full flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-purple-400 text-white shadow-lg shadow-primary/20">
            <Bot size={20} />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-white tracking-tight whitespace-nowrap"
              >
                UniMate
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-lg text-muted-foreground hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* ✅ USER PROFILE (UPDATED) */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5 shadow-sm transition-colors hover:bg-white/10 cursor-pointer">
          <Avatar className="h-9 w-9 shrink-0 border border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary">
              {user?.name ? user.name[0] : "U"}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col overflow-hidden"
            >
              <span className="text-sm font-semibold text-white truncate">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate">
  {user?.course || "Course"}
  {user?.section ? ` • ${user.section}` : ""}
</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4 pt-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href} passHref>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg px-3 py-6 justify-start transition-all",
                  isActive 
                    ? "bg-primary/10 text-primary relative overflow-hidden" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-0"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />
                )}
                <Icon size={20} className="shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-6 justify-start text-muted-foreground hover:bg-white/5 hover:text-white",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Settings size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            localStorage.removeItem("user"); // 👈 logout clear
            router.push("/");
          }}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-3 py-6 justify-start text-red-400 hover:bg-red-400/10 hover:text-red-300",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </Button>
      </div>
    </div>
  );
}