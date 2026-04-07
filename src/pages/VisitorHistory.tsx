import React, { useEffect, useState } from "react";
import { AppLayout } from "@/components/AppLayout";

export default function VisitorHistory() {

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/visits")
      .then(res => res.json())
      .then(data => setVisits(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <AppLayout title="Visitor History">

      <div className="p-6">

        <h1 className="text-2xl font-semibold mb-4">
          Visitor History
        </h1>

        <div className="bg-card border rounded-xl p-5">

          <table className="w-full text-sm">

            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Visitor</th>
                <th>Company</th>
                <th>Host</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {visits.map((v: any) => (
                <tr key={v.id} className="border-b">

                  <td className="py-2">{v.visitor}</td>

                  <td>{v.company}</td>

                  <td>{v.host}</td>

                  <td>{v.purpose}</td>

                  <td>{v.visit_date}</td>

                  <td>{v.visit_time}</td>

                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-muted">
                      {v.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </AppLayout>
  );
}