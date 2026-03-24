import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { Activity, User, Clock } from "lucide-react";

const AuditLogs = () => {

  const [logs, setLogs] = useState<any[]>([]);

  // 🔥 FETCH LOGS
  const fetchLogs = () => {
    fetch("http://localhost:5000/api/audit-logs")
      .then(res => res.json())
      .then(res => {
        console.log("Logs:", res);
        setLogs(Array.isArray(res) ? res : []);
      })
      .catch(err => {
        console.error(err);
        setLogs([]);
      });
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <AppLayout title="Audit Logs">

      <div className="max-w-5xl space-y-6">

        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            System Activity Logs
          </h3>

          <div className="space-y-3">

            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No activity logs available
              </p>
            ) : (
              logs.map((log: any) => (
                <div
                  key={log.id}
                  className="p-4 rounded-lg border bg-muted/50"
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <p className="font-medium">{log.action}</p>

                      <p className="text-sm text-muted-foreground">
                        Module: {log.module}
                      </p>

                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.user_name || "System"}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>

    </AppLayout>
  );
};

export default AuditLogs;