import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, User, Building, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

const Approvals = () => {

  // ✅ STATE FROM BACKEND
  const [requests, setRequests] = useState<any[]>([]);
  const [rejectId, setRejectId] = useState<number | null>(null);

  // ✅ FETCH PENDING VISITS
  const fetchRequests = () => {
    fetch("http://localhost:5000/api/pending-visits")
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ APPROVE
  const handleApprove = (id: number) => {
    fetch("http://localhost:5000/api/approve-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        fetchRequests(); // refresh list
      })
      .catch(err => console.error(err));
  };

  // ✅ REJECT
  const handleReject = (id: number) => {
    fetch("http://localhost:5000/api/reject-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        fetchRequests(); // refresh list
        setRejectId(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout title="Approval Requests">
      <div className="max-w-4xl space-y-4">

        {/* HEADER */}
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-warning" />
          <span className="text-sm text-muted-foreground">
            {requests.length} pending approval(s)
          </span>
        </div>

        {/* EMPTY STATE */}
        {requests.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h4 className="font-semibold">All caught up!</h4>
            <p className="text-sm text-muted-foreground mt-1">
              No pending approvals at the moment
            </p>
          </div>
        ) : (

          requests.map((req) => (
            <div key={req.id} className="bg-card rounded-xl border border-border p-5">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{req.visitor_name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                      Pending
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Building className="w-3.5 h-3.5" />
                      {req.company}
                    </span>

                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {new Date(req.visit_date).toLocaleDateString()}
                    </span>

                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(req.visit_date).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    Purpose: {req.purpose}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" onClick={() => handleApprove(req.id)}>
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive border-destructive/30"
                    onClick={() =>
                      setRejectId(rejectId === req.id ? null : req.id)
                    }
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>

              </div>

              {/* REJECT BOX */}
              {rejectId === req.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Textarea
                    placeholder="Reason for rejection (optional)"
                    rows={2}
                    className="mb-3"
                  />

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(req.id)}
                  >
                    Confirm Rejection
                  </Button>
                </div>
              )}

            </div>
          ))

        )}
      </div>
    </AppLayout>
  );
};

export default Approvals;