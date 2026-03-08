import { AppLayout } from "@/components/AppLayout";
import { Users, Clock, AlertTriangle } from "lucide-react";

const visitors = [
  { name: "John Smith", company: "Acme Corp", host: "Mike Johnson", checkIn: "9:15 AM", expected: "11:15 AM", badge: "B041", status: "active" },
  { name: "Sarah Connor", company: "CyberDyne", host: "Emily Davis", checkIn: "10:30 AM", expected: "12:00 PM", badge: "B042", status: "active" },
  { name: "James Kirk", company: "Starfleet", host: "Robert Chen", checkIn: "8:00 AM", expected: "10:00 AM", badge: "B038", status: "overstay" },
  { name: "Bruce Wayne", company: "Wayne Tech", host: "Lisa Park", checkIn: "11:00 AM", expected: "12:30 PM", badge: "B045", status: "near-expiry" },
  { name: "Clark Kent", company: "Daily Planet", host: "Mike Johnson", checkIn: "9:45 AM", expected: "11:00 AM", badge: "B039", status: "overstay" },
  { name: "Diana Prince", company: "Themyscira LLC", host: "Emily Davis", checkIn: "10:00 AM", expected: "1:00 PM", badge: "B043", status: "active" },
];

const statusConfig = {
  active: { label: "Active", className: "bg-success/10 text-success" },
  "near-expiry": { label: "Near Expiry", className: "bg-warning/10 text-warning" },
  overstay: { label: "Overstay", className: "bg-destructive/10 text-destructive" },
};

const Monitoring = () => {
  const counts = {
    total: visitors.length,
    active: visitors.filter((v) => v.status === "active").length,
    nearExpiry: visitors.filter((v) => v.status === "near-expiry").length,
    overstay: visitors.filter((v) => v.status === "overstay").length,
  };

  return (
    <AppLayout title="Live Monitoring">
      <div className="max-w-6xl space-y-6">
        {/* Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="kpi-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{counts.total}</p>
              <p className="text-xs text-muted-foreground">Total Inside</p>
            </div>
          </div>
          <div className="kpi-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{counts.active}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>
          <div className="kpi-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{counts.nearExpiry}</p>
              <p className="text-xs text-muted-foreground">Near Expiry</p>
            </div>
          </div>
          <div className="kpi-card flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{counts.overstay}</p>
              <p className="text-xs text-muted-foreground">Overstayed</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Visitor</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Host</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Check-In</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Expected Out</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Badge</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, i) => {
                  const s = statusConfig[v.status as keyof typeof statusConfig];
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{v.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.company}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.host}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.checkIn}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.expected}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.badge}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.className}`}>{s.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Monitoring;
