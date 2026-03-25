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
import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    expected_today: 0,
    active_visitors: 0,
    overstayed: 0,
    pending_approvals: 0,
  });

  const [trafficData, setTrafficData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {

    // KPI data
    fetch("http://localhost:5000/api/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));

    // Hourly visitor traffic
    fetch("http://localhost:5000/api/visitor-traffic")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          time: `${item.hour}:00`,
          visitors: item.visitors,
        }));
        setTrafficData(formatted);
      })
      .catch((err) => console.error(err));

    // Weekly visitor stats
    fetch("http://localhost:5000/api/weekly-visitors")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          day: item.day.slice(0, 3),
          count: item.count,
        }));
        setWeeklyData(formatted);
      })
      .catch((err) => console.error(err));

    // Recent activity timeline
    fetch("http://localhost:5000/api/recent-activity")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item: any) => ({
          text: `${item.user} - ${item.action} (${item.module})`,
          time: new Date(item.timestamp).toLocaleTimeString(),
        }));
        setTimeline(formatted);
      })
      .catch((err) => console.error(err));

  }, []);

  const kpis = [
    {
      label: "Expected Today",
      value: stats.expected_today,
      change: "+12%",
      up: true,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Currently Inside",
      value: stats.active_visitors,
      change: "+5",
      up: true,
      icon: UserCheck,
      color: "text-success",
    },
    {
      label: "Overstayed",
      value: stats.overstayed,
      change: "+1",
      up: false,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Pending Approvals",
      value: stats.pending_approvals,
      change: "-2",
      up: true,
      icon: Clock,
      color: "text-warning",
    },
  ];

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

          {/* Visitor Traffic Chart */}
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
                    <stop offset="5%" stopColor="hsl(215,70%,45%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(215,70%,45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(215,70%,45%)"
                  fill="url(#colorVisitors)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity Timeline */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>

            <div className="space-y-4">
              {timeline.map((item: any, i) => (
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              <Bar
                dataKey="count"
                fill="hsl(215,70%,45%)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </AppLayout>
  );
};

export default Dashboard;