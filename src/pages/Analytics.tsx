import { AppLayout } from "@/components/AppLayout";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";

const COLORS = [
  "hsl(215, 70%, 45%)",
  "hsl(142, 60%, 40%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 60%, 55%)",
  "hsl(0, 72%, 51%)",
];

const Analytics = () => {

  // ✅ STATES
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [frequentVisitors, setFrequentVisitors] = useState<any[]>([]);
  const [departmentData, setDepartmentData] = useState<any[]>([]);
  const [peakHoursData, setPeakHoursData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ✅ FETCH DATA
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);

        const query =
          fromDate && toDate ? `?from=${fromDate}&to=${toDate}` : "";

        const [monthly, frequent, department, peak] = await Promise.all([
          fetch(`http://localhost:5000/api/monthly-visitors${query}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/frequent-visitors${query}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/department-stats${query}`).then(res => res.json()),
          fetch(`http://localhost:5000/api/peak-hours${query}`).then(res => res.json())
        ]);

        setMonthlyData(Array.isArray(monthly) ? monthly : []);
        setFrequentVisitors(Array.isArray(frequent) ? frequent : []);
        setDepartmentData(Array.isArray(department) ? department : []);

        // 🔄 Transform Peak Hours
        const formatted: any = {};

        peak.forEach((item: any) => {
          const hour = `${item.hour}:00`;

          if (!formatted[hour]) {
            formatted[hour] = {
              hour,
              mon: 0,
              tue: 0,
              wed: 0,
              thu: 0,
              fri: 0,
            };
          }

          const day = item.day.toLowerCase();

          if (day.includes("mon")) formatted[hour].mon = item.visitors;
          if (day.includes("tue")) formatted[hour].tue = item.visitors;
          if (day.includes("wed")) formatted[hour].wed = item.visitors;
          if (day.includes("thu")) formatted[hour].thu = item.visitors;
          if (day.includes("fri")) formatted[hour].fri = item.visitors;
        });

        setPeakHoursData(Object.values(formatted));

      } catch (err) {
        console.error("Analytics Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [fromDate, toDate]);

  return (
    <AppLayout title="Analytics & Reports">
      <div className="max-w-7xl space-y-6">

        {/* 🔥 CLEAN FILTER BAR */}
        <div className="flex flex-wrap items-center gap-4 bg-card border rounded-xl p-4">

          <div className="flex items-center gap-2 border rounded-lg px-3 h-10 bg-background hover:border-primary transition">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="outline-none bg-transparent text-sm"
            />
          </div>

          <div className="flex items-center gap-2 border rounded-lg px-3 h-10 bg-background hover:border-primary transition">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="outline-none bg-transparent text-sm"
            />
          </div>

          <select className="h-10 px-4 rounded-lg border bg-background text-sm hover:border-primary transition">
            <option>All Locations</option>
          </select>

        </div>

        {/* 📊 CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 📊 Monthly Visitors */}
          <div className="bg-card rounded-xl border p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-1">Visitor Trends</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monthly visitor count
            </p>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading data...</p>
            ) : monthlyData.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="hsl(215, 70%, 45%)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 🏢 Department */}
          <div className="bg-card rounded-xl border p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-1">By Department</h3>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={departmentData} dataKey="value">
                    {departmentData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* ⏰ Peak Hours */}
          <div className="bg-card rounded-xl border p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-1">Peak Visiting Hours</h3>

            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="mon" stroke="blue" />
                  <Line type="monotone" dataKey="tue" stroke="green" />
                  <Line type="monotone" dataKey="wed" stroke="orange" />
                  <Line type="monotone" dataKey="thu" stroke="purple" />
                  <Line type="monotone" dataKey="fri" stroke="red" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* 🧍 Frequent Visitors */}
          <div className="bg-card rounded-xl border p-5 hover:shadow-md transition">
            <h3 className="font-semibold mb-1">Frequent Visitors</h3>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : frequentVisitors.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data available</p>
              ) : (
                frequentVisitors.map((v: any, i) => (
                  <div key={i} className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">{v.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {v.company}
                      </p>
                    </div>
                    <span className="text-sm font-semibold">
                      {v.visits} visits
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;