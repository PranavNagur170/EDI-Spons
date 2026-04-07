import { AppSidebar } from "./AppSidebar";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  const navigate = useNavigate();
  
  // Mock user data (can be replaced with context/state later)
  const userName = "PRANAV";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                className="bg-card border-none rounded-[1.5rem] pl-11 pr-4 py-2.5 text-sm text-foreground shadow-[0_8px_30px_rgb(0,0,0,0.04)] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
            <button 
              onClick={() => navigate("/approvals")}
              className="relative p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {userInitials}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{userName}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
