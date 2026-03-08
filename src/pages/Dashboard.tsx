import { AppLayout } from "@/components/AppLayout";
import {
  Users,
  UserCheck,
  AlertTriangle,
  Clock,
  UserPlus,
  LogIn,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const kpis = [
  { label: "Expected Today", value: "47", change: "+12%", up: true, icon: Users, color: "text-primary" },
  { label: "Currently Inside", value: "23", change: "+5", up: true, icon: UserCheck, color: "text-success" },
  { label: "Overstayed", value: "3", change: "+1", up: false, icon: AlertTriangle, color: "text-destructive" },
  { label: "Pending Approvals", value: "8", change: "-2", up: true, icon: Clock, color: "text-warning" },
];

const trafficData = [
  { time: "8 AM", visitors: 4 },
  { time: "9 AM", visitors: 12 },
  { time: "10 AM", visitors: 18 },
  { time: "11 AM", visitors: 15 },
  { time: "12 PM", visitors: 8 },
  { time: "1 PM", visitors: 10 },
  { time: "2 PM", visitors: 14 },
  { time: "3 PM", visitors: 11 },
  { time: "4 PM", visitors: 7 },
  { time: "5 PM", visitors: 3 },
];

const weeklyData = [
  { day: "Mon", count: 32 },
  { day: "Tue", count: 45 },
  { day: "Wed", count: 38 },
  { day: "Thu", count: 52 },
  { day: "Fri", count: 41 },
];

const timeline = [
  { time: "2 min ago", text: "John Smith checked in at Gate A", type: "checkin" },
  { time: "15 min ago", text: "Sarah Connor's visit approved by Mike", type: "approval" },
  { time: "32 min ago", text: "Alert: Visitor #1042 overstayed by 30 min", type: "alert" },
  { time: "1 hr ago", text: "New pre-registration by Emily Davis", type: "registration" },
  { time: "1.5 hr ago", text: "Badge #B045 returned at Exit B", type: "checkout" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6 max-w-7xl">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${kpi.up ? "text-success" : "text-destructive"}`}>
                  {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => navigate("/pre-registration")} className="gap-2">
            <UserPlus className="w-4 h-4" /> Invite Visitor
          </Button>
          <Button variant="outline" onClick={() => navigate("/check-in")} className="gap-2">
            <LogIn className="w-4 h-4" /> Check-In Visitor
          </Button>
        </div>

        {/* Charts + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Traffic Chart */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">Visitor Traffic</h3>
                <p className="text-sm text-muted-foreground">Today's hourly trend</p>
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(215, 70%, 45%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(215, 70%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke="hsl(215, 70%, 45%)" fill="url(#colorVisitors)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Timeline */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <div>
                    <p className="text-sm text-foreground">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold text-foreground mb-1">Weekly Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">Visitor count by day</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(215, 70%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
