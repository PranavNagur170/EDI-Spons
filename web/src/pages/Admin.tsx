import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users, Building, Shield, Ban, Settings, Plus, Trash2, Edit, ChevronRight,
} from "lucide-react";
import { useState } from "react";

const sections = [
  { id: "users", label: "Users & Roles", icon: Users },
  { id: "company", label: "Company & Sites", icon: Building },
  { id: "visitor-types", label: "Visitor Types", icon: Shield },
  { id: "blacklist", label: "Blacklist", icon: Ban },
  { id: "system", label: "System Config", icon: Settings },
];

const users = [
  { name: "John Doe", email: "john@company.com", role: "Admin" },
  { name: "Emily Davis", email: "emily@company.com", role: "Host" },
  { name: "Guard One", email: "guard1@company.com", role: "Security" },
  { name: "Lisa Park", email: "lisa@company.com", role: "Host" },
];

const visitorTypes = ["Business", "Interview", "Delivery", "Contractor", "VIP"];
const blacklist = [
  { name: "Bad Actor", reason: "Trespassing incident - Jan 2026", date: "Jan 15, 2026" },
  { name: "Suspicious Person", reason: "Fake identity attempt", date: "Feb 20, 2026" },
];

const Admin = () => {
  const [active, setActive] = useState("users");

  return (
    <AppLayout title="Admin Configuration">
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left nav */}
          <div className="bg-card rounded-xl border border-border p-3 h-fit">
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.id)}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active === s.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <s.icon className="w-4 h-4" />
                    <span>{s.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {active === "users" && (
              <div className="bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h3 className="font-semibold text-foreground">User Management</h3>
                  <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add User</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              u.role === "Admin" ? "bg-primary/10 text-primary" :
                              u.role === "Security" ? "bg-warning/10 text-warning" :
                              "bg-success/10 text-success"
                            }`}>{u.role}</span>
                          </td>
                          <td className="px-4 py-3 flex gap-1">
                            <button className="p-1.5 rounded hover:bg-muted text-muted-foreground"><Edit className="w-4 h-4" /></button>
                            <button className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {active === "company" && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Company Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Company Name</Label>
                    <Input defaultValue="Acme Corporation" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Primary Site</Label>
                    <Input defaultValue="HQ - Building A" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Address</Label>
                    <Input defaultValue="123 Corporate Drive" className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Contact Email</Label>
                    <Input defaultValue="admin@acme.com" className="h-10" />
                  </div>
                </div>
                <Button className="mt-4">Save Changes</Button>
              </div>
            )}

            {active === "visitor-types" && (
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Visitor Types</h3>
                  <Button size="sm" className="gap-1"><Plus className="w-4 h-4" /> Add Type</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {visitorTypes.map((t) => (
                    <span key={t} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted text-sm text-foreground">
                      {t}
                      <button className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {active === "blacklist" && (
              <div className="bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between p-5 border-b border-border">
                  <h3 className="font-semibold text-foreground">Blacklisted Visitors</h3>
                  <Button size="sm" variant="destructive" className="gap-1"><Plus className="w-4 h-4" /> Add to Blacklist</Button>
                </div>
                <div className="divide-y divide-border/50">
                  {blacklist.map((b, i) => (
                    <div key={i} className="p-4 flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{b.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{b.reason}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Added: {b.date}</p>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">Remove</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === "system" && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto Check-Out</p>
                      <p className="text-xs text-muted-foreground">Automatically check out visitors after expected time</p>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-primary cursor-pointer relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Overstay Alerts</p>
                      <p className="text-xs text-muted-foreground">Send notifications for overstayed visitors</p>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-primary cursor-pointer relative">
                      <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">Photo Capture Required</p>
                      <p className="text-xs text-muted-foreground">Require photo during check-in</p>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-muted-foreground/30 cursor-pointer relative">
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-card" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Default Visit Duration (minutes)</Label>
                    <Input type="number" defaultValue="60" className="h-10 w-32" />
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Admin;
