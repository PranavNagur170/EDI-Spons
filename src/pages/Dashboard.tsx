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
  Bell,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const [stats, setStats] = useState<any>({
    expected_today: 0,
    expected_today_change: 0,
    expected_today_up: true,
    active_visitors: 0,
    active_visitors_change: 0,
    active_visitors_up: true,
    overstayed: 0,
    overstayed_change: 0,
    overstayed_up: false,
    pending_approvals: 0,
    pending_approvals_change: 0,
    pending_approvals_up: true,
  });

  const [trafficData, setTrafficData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [activeVisitorsList, setActiveVisitorsList] = useState([]);

  // Table filters and pagination state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [siteFilter, setSiteFilter] = useState("All");
  const [hostFilter, setHostFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(Math.floor((new Date().getTime() - lastUpdated.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdated]);

  const fetchDashboardData = () => {
    // KPI data API call
    fetch("http://localhost:5000/api/dashboard-stats")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => console.log("Using sample KPI data"));

    // Hourly visitor traffic API call
    fetch("http://localhost:5000/api/visitor-traffic")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item: any) => ({
          time: `${item.hour}:00`,
          visitors: item.visitors,
        }));
        setTrafficData(formatted);
      })
      .catch(() => console.log("Using sample traffic data"));

    // Weekly visitor stats API call
    fetch("http://localhost:5000/api/weekly-visitors")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item: any) => ({
          day: item.day.slice(0, 3),
          count: item.count,
        }));
        setWeeklyData(formatted);
      })
      .catch(() => console.log("Using sample weekly data"));

    // Recent activity timeline API call
    fetch("http://localhost:5000/api/recent-activity")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((data) => {
        const formatted = data.map((item: any) => ({
          text: `${item.user} - ${item.action} (${item.module})`,
          time: new Date(item.timestamp).toLocaleTimeString(),
        }));
        setTimeline(formatted);
      })
      .catch(() => console.log("Using sample timeline data"));

    // Active visitors list API call
    fetch("http://localhost:5000/api/active-visitors")
      .then((res) => {
        if (!res.ok) throw new Error("API not available");
        return res.json();
      })
      .then((data) => setActiveVisitorsList(data))
      .catch(() => console.log("Using sample active visitors data"));

    setLastUpdated(new Date());
    setSecondsAgo(0);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchDashboardData();
      }, 10000); // 10 seconds refresh for demonstration
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Derived state for table
  const filteredVisitors = activeVisitorsList.filter((v: any) => {
    const searchString = `${v.name} ${v.mobile} ${v.visitorId}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || v.status === statusFilter;
    const matchesSite = siteFilter === "All" || v.site === siteFilter;
    const matchesHost = hostFilter === "All" || v.host === hostFilter;

    return matchesSearch && matchesStatus && matchesSite && matchesHost;
  });

  const totalPages = Math.ceil(filteredVisitors.length / rowsPerPage) || 1;
  const paginatedVisitors = filteredVisitors.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, siteFilter, hostFilter, rowsPerPage]);

  const kpis = [
    {
      label: "Expected Today",
      value: stats.expected_today,
      change: `${stats.expected_today_change >= 0 ? '+' : ''}${stats.expected_today_change}%`,
      up: stats.expected_today_up,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Currently Inside",
      value: stats.active_visitors,
      change: `${stats.active_visitors_change > 0 ? '+' : ''}${stats.active_visitors_change}`,
      up: stats.active_visitors_up,
      icon: UserCheck,
      color: "text-success",
    },
    {
      label: "Overstayed",
      value: stats.overstayed,
      change: `${stats.overstayed_change > 0 ? '+' : ''}${stats.overstayed_change}`,
      up: stats.overstayed_up,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Pending Approvals",
      value: stats.pending_approvals,
      change: `${stats.pending_approvals_change >= 0 ? '+' : ''}${stats.pending_approvals_change}%`,
      up: stats.pending_approvals_up,
      icon: Clock,
      color: "text-warning",
    },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6 max-w-7xl">

        {/* Top Header Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 bg-red-100/50 text-red-600 rounded-full dark:bg-red-900/30 dark:text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Live
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              Updated {secondsAgo} sec ago
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">Auto-refresh</span>
            <Switch 
              checked={autoRefresh} 
              onCheckedChange={setAutoRefresh} 
            />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            let iconBgClass = "bg-muted";
            if (kpi.color === "text-primary") iconBgClass = "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30";
            if (kpi.color === "text-success") iconBgClass = "bg-green-100 text-green-600 dark:bg-green-900/30";
            if (kpi.color === "text-destructive") iconBgClass = "bg-red-100 text-red-600 dark:bg-red-900/30";
            if (kpi.color === "text-warning") iconBgClass = "bg-amber-100 text-amber-600 dark:bg-amber-900/30";

            return (
              <div 
                key={kpi.label} 
                className="kpi-card bg-card border border-border/50 relative overflow-hidden group"
              >
                {/* Subtle gradient hover effect for pure aesthetics */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-white/40 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex items-start justify-between mb-3 relative z-10">
                  <div className={`w-12 h-12 rounded-full ${iconBgClass} flex items-center justify-center`}>
                    <kpi.icon className="w-6 h-6" />
                  </div>

                  <span className={`flex items-center gap-0.5 text-sm font-semibold px-2 py-1 rounded-md ${kpi.up ? "text-success bg-green-50 dark:bg-green-900/20" : "text-destructive bg-red-50 dark:bg-red-900/20"}`}>
                    {kpi.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {kpi.change}
                  </span>
                </div>

                <p className="text-3xl font-bold mt-4 text-foreground relative z-10">{kpi.value}</p>
                <p className="text-sm mt-1 font-medium text-muted-foreground relative z-10">{kpi.label}</p>
              </div>
            );
          })}
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

        {/* Overstay Highlight Section */}
        {activeVisitorsList.filter((v: any) => v.status === "Overstay").length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/50 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500 animate-pulse" />
              <h3 className="font-semibold text-red-800 dark:text-red-400">Action Required: Overstayed Visitors</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeVisitorsList.filter((v: any) => v.status === "Overstay").map((v: any) => (
                <div key={v.id} className="bg-white dark:bg-zinc-950 border border-red-100 dark:border-red-900/50 rounded-lg p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{v.name}</h4>
                        <p className="text-xs font-mono text-muted-foreground mt-0.5">{v.visitorId}</p>
                      </div>
                      <span className="text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800/50">
                        {v.duration} Overstay
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 text-sm bg-red-50/50 dark:bg-red-900/10 p-3 rounded-md border border-red-100/50 dark:border-red-900/30">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Mobile</p>
                        <p className="font-medium text-foreground">{v.mobile}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Check-in</p>
                        <p className="font-medium text-foreground">{v.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Host</p>
                        <p className="font-medium text-foreground truncate" title={v.host}>{v.host}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Site</p>
                        <p className="font-medium text-foreground truncate" title={v.site}>{v.site}</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" className="w-full mt-4 gap-2 font-medium" onClick={() => console.log(`Notifying ${v.host} about ${v.name}...`)}>
                    <Bell className="w-4 h-4 fill-current opacity-80" /> Notify Host
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visitors Inside Detailed Table */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
            <h3 className="font-semibold text-foreground whitespace-nowrap">Live: Visitors Inside</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
              <div className="relative w-full sm:w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search name, mobile, ID..." 
                  className="pl-8 bg-background w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Normal">Normal</option>
                <option value="Overstay">Overstayed</option>
              </select>

              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                value={siteFilter}
                onChange={(e) => setSiteFilter(e.target.value)}
              >
                <option value="All">All Sites</option>
                <option value="HQ">HQ</option>
                <option value="Scranton">Scranton</option>
                <option value="NY Office">NY Office</option>
              </select>

              <select 
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring max-w-[200px] truncate"
                value={hostFilter}
                onChange={(e) => setHostFilter(e.target.value)}
              >
                <option value="All">All Hosts</option>
                {Array.from(new Set(activeVisitorsList.map((v: any) => v.host))).map((host: any) => (
                  <option key={host} value={host}>{host}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Visitor ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVisitors.length > 0 ? (
                  paginatedVisitors.map((v: any) => (
                    <TableRow key={v.id}>
                      <TableCell className="font-medium text-muted-foreground">{v.visitorId}</TableCell>
                      <TableCell className="font-semibold text-foreground">{v.name}</TableCell>
                      <TableCell className="text-muted-foreground">{v.mobile}</TableCell>
                      <TableCell className="text-muted-foreground">{v.site}</TableCell>
                      <TableCell className="text-muted-foreground">{v.host}</TableCell>
                      <TableCell className="text-muted-foreground">{v.checkIn}</TableCell>
                      <TableCell className="text-muted-foreground">{v.duration}</TableCell>
                      <TableCell>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${v.status === 'Overstay' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                          {v.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No visitors found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rows per page:</span>
              <select 
                className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none"
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground mr-4">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Prev
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
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