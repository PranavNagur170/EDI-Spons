import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, User, Building, CalendarDays } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const initialRequests = [
  { id: 1, visitor: "Alan Turing", company: "DeepMind", host: "Emily Davis", purpose: "Technical Review", time: "11:00 AM", date: "Mar 7, 2026" },
  { id: 2, visitor: "Ada Lovelace", company: "ByteCraft", host: "Robert Chen", purpose: "Partnership Discussion", time: "2:00 PM", date: "Mar 7, 2026" },
  { id: 3, visitor: "Grace Hopper", company: "NavySoft", host: "Lisa Park", purpose: "Site Tour", time: "3:30 PM", date: "Mar 7, 2026" },
  { id: 4, visitor: "Linus Torvalds", company: "OpenKernel", host: "Mike Johnson", purpose: "Code Audit", time: "10:00 AM", date: "Mar 8, 2026" },
];

const Approvals = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [rejectId, setRejectId] = useState<number | null>(null);

  const handleAction = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setRejectId(null);
  };

  return (
    <AppLayout title="Approval Requests">
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-warning" />
          <span className="text-sm text-muted-foreground">{requests.length} pending approval(s)</span>
        </div>

        {requests.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <Check className="w-12 h-12 text-success mx-auto mb-3" />
            <h4 className="font-semibold text-foreground">All caught up!</h4>
            <p className="text-sm text-muted-foreground mt-1">No pending approvals at the moment</p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="bg-card rounded-xl border border-border p-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{req.visitor}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">Pending</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Building className="w-3.5 h-3.5" />{req.company}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground"><User className="w-3.5 h-3.5" />{req.host}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground"><CalendarDays className="w-3.5 h-3.5" />{req.date}</span>
                    <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{req.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Purpose: {req.purpose}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" className="gap-1" onClick={() => handleAction(req.id)}>
                    <Check className="w-4 h-4" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => setRejectId(rejectId === req.id ? null : req.id)}>
                    <X className="w-4 h-4" /> Reject
                  </Button>
                </div>
              </div>
              {rejectId === req.id && (
                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                  <Textarea placeholder="Reason for rejection (optional)" rows={2} className="mb-3" />
                  <Button size="sm" variant="destructive" onClick={() => handleAction(req.id)}>Confirm Rejection</Button>
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
