import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardCheck,
  Monitor,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  UserPlus,
  Clock,
  History,
  Upload,
  Ban,
  FileText,
  AlertTriangle
} from "lucide-react";

const navSections = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },

  {
    label: "Visitors",
    items: [
      { title: "Pre-Registration", path: "/pre-registration", icon: UserPlus },
      { title: "Check-In", path: "/check-in", icon: UserCheck },
      // { title: "Checkout", path: "/checkout", icon: LogOut },
      { title: "Spot Request", path: "/spot-request", icon: Clock },
    ],
  },

  {
    label: "Operations",
    items: [
      { title: "Approvals", path: "/approvals", icon: ClipboardCheck },
      { title: "Monitoring", path: "/monitoring", icon: Monitor },
      { title: "Visitor History", path: "/visitor-history", icon: History },
      { title: "Assets & Vehicles", path: "/assets", icon: Package },
      { title: "Bulk Upload", path: "/bulk-upload", icon: Upload },
    ],
  },

  {
    label: "Security",
    items: [
      { title: "Blacklist", path: "/blacklist", icon: Ban },
      { title: "Audit Logs", path: "/audit-logs", icon: FileText },
      { title: "Emergency List", path: "/emergency-list", icon: AlertTriangle },
    ],
  },

  {
    label: "Insights",
    items: [
      { title: "Analytics", path: "/analytics", icon: BarChart3 },
      { title: "Settings", path: "/settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-foreground/40 z-40 lg:hidden transition-opacity ${collapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        onClick={() => setCollapsed(true)}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-sidebar flex flex-col transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-[70px]" : "w-[260px]"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border shrink-0">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sidebar-accent-foreground font-semibold text-sm tracking-tight">
              Eagle Security
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors lg:block hidden"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted px-2 mb-2">
                  {section.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <item.icon className="w-[18px] h-[18px] shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors w-full">
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Mobile trigger */}
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 left-4 z-30 lg:hidden bg-primary text-primary-foreground p-3 rounded-full shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
