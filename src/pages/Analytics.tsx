import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { CalendarDays, Filter } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", visitors: 320 },
  { month: "Feb", visitors: 410 },
  { month: "Mar", visitors: 380 },
  { month: "Apr", visitors: 490 },
  { month: "May", visitors: 450 },
  { month: "Jun", visitors: 520 },
];

const departmentData = [
  { name: "Engineering", value: 35 },
  { name: "HR", value: 20 },
  { name: "Finance", value: 15 },
  { name: "Operations", value: 18 },
  { name: "Sales", value: 12 },
];

const peakHoursData = [
  { hour: "8AM", mon: 5, tue: 8, wed: 6 },
  { hour: "9AM", mon: 12, tue: 15, wed: 10 },
  { hour: "10AM", mon: 18, tue: 20, wed: 16 },
  { hour: "11AM", mon: 14, tue: 12, wed: 18 },
  { hour: "12PM", mon: 8, tue: 6, wed: 9 },
  { hour: "1PM", mon: 10, tue: 11, wed: 12 },
  { hour: "2PM", mon: 15, tue: 13, wed: 14 },
  { hour: "3PM", mon: 11, tue: 9, wed: 10 },
  { hour: "4PM", mon: 6, tue: 7, wed: 5 },
];

const COLORS = [
  "hsl(215, 70%, 45%)",
  "hsl(142, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(0, 72%, 51%)",
];

const frequentVisitors = [
  { name: "Sarah Connor", visits: 12, company: "CyberDyne" },
  { name: "Alan Turing", visits: 9, company: "DeepMind" },
  { name: "Ada Lovelace", visits: 8, company: "ByteCraft" },
  { name: "Grace Hopper", visits: 7, company: "NavySoft" },
  { name: "Linus Torvalds", visits: 6, company: "OpenKernel" },
];

const Analytics = () => {
  return (
    <AppLayout title="Analytics & Reports">
      <div className="max-w-7xl space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="date" className="pl-9 h-9 w-40" />
          </div>
          <span className="text-muted-foreground text-sm">to</span>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="date" className="pl-9 h-9 w-40" />
          </div>
          <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground">
            <option>All Locations</option>
            <option>HQ - Building A</option>
            <option>Branch - Building B</option>
          </select>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1">Visitor Trends</h3>
            <p className="text-sm text-muted-foreground mb-4">Monthly visitor count</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Bar dataKey="visitors" fill="hsl(215, 70%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Pie */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1">By Department</h3>
            <p className="text-sm text-muted-foreground mb-4">Visit frequency by department</p>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value">
                    {departmentData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Hours */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1">Peak Visiting Hours</h3>
            <p className="text-sm text-muted-foreground mb-4">Hourly distribution (Mon–Wed)</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={peakHoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
                <Tooltip />
                <Line type="monotone" dataKey="mon" stroke="hsl(215, 70%, 45%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="tue" stroke="hsl(142, 60%, 40%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="wed" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={false} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Frequent Visitors */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-1">Frequent Visitors</h3>
            <p className="text-sm text-muted-foreground mb-4">Top returning visitors</p>
            <div className="space-y-3">
              {frequentVisitors.map((v, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.company}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{v.visits} visits</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
