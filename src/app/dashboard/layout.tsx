import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar className="hidden md:flex" />
      <main className="flex flex-1 flex-col relative w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
