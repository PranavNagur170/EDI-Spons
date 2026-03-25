import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";

const Monitoring = () => {

  const [visitors, setVisitors] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Fetch visitors
  const fetchVisitors = () => {
    fetch("http://localhost:5000/api/active-visitors")
      .then(res => res.json())
      .then(data => setVisitors(data))
      .catch(err => console.error(err));
  };

  // ✅ Auto refresh
  useEffect(() => {
    fetchVisitors();

    const interval = setInterval(() => {
      fetchVisitors();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Checkout
  const handleCheckout = (visit_id: number) => {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visit_id }),
    })
      .then(res => res.json())
      .then(() => fetchVisitors())
      .catch(err => console.error(err));
  };

  // ✅ Status logic
  const getStatus = (checkin_time: any) => {
    const diff = (Date.now() - new Date(checkin_time).getTime()) / 60000;

    if (diff > 120) return "Overstayed";
    if (diff > 90) return "Near Expiry";
    return "Active";
  };

  // ✅ FILTER LOGIC (FIXED)
  const filteredVisitors = visitors.filter((v: any) => {

    const status = getStatus(v.checkin_time);

    const matchesSearch =
      v.visitor?.toLowerCase().includes(search.toLowerCase()) ||
      v.company?.toLowerCase().includes(search.toLowerCase()) ||
      v.host?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout title="Live Monitoring">

      <div className="bg-card border rounded-xl p-5">

        <h2 className="text-lg font-semibold mb-4">
          Visitors Currently Inside
        </h2>

        {/* 🔍 SEARCH + FILTER UI */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search visitor..."
            className="border p-2 rounded w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Near Expiry">Near Expiry</option>
            <option value="Overstayed">Overstayed</option>
          </select>
        </div>

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Visitor</th>
              <th className="text-left py-2">Company</th>
              <th className="text-left py-2">Host</th>
              <th className="text-left py-2">Check-In</th>
              <th className="text-left py-2">Expected Out</th>
              <th className="text-left py-2">Badge</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredVisitors.map((v: any) => {

              const status = getStatus(v.checkin_time);

              return (
                <tr key={v.id} className="border-b">

                  <td className="py-2">{v.visitor}</td>
                  <td>{v.company}</td>
                  <td>{v.host}</td>

                  <td>
                    {new Date(v.checkin_time).toLocaleTimeString()}
                  </td>

                  <td>{v.expected_out}</td>
                  <td>{v.badge_number}</td>

                  {/* 🎨 STATUS BADGE */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        status === "Active"
                          ? "bg-green-500"
                          : status === "Near Expiry"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  {/* ✅ Checkout */}
                  <td>
                    <button
                      onClick={() => handleCheckout(v.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Checkout
                    </button>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>

      </div>

    </AppLayout>
  );
};

export default Monitoring;