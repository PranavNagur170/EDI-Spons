import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Send, User, Phone, Building, Clock } from "lucide-react";
import { useState } from "react";

const hosts = ["Mike Johnson - Engineering", "Emily Davis - HR", "Robert Chen - Finance", "Lisa Park - Operations"];

const SpotRequest = () => {
  const [status, setStatus] = useState<"idle" | "waiting" | "approved">("idle");

  return (
    <AppLayout title="Spot Request">
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Walk-in Visitor Request</h3>
          <p className="text-sm text-muted-foreground mb-5">Register an unscheduled visitor and request host approval</p>

          {status === "waiting" ? (
            <div className="text-center py-12 animate-fade-in">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground">Waiting for Approval</h4>
              <p className="text-sm text-muted-foreground mt-1">Request sent to Mike Johnson (Engineering)</p>
              <p className="text-xs text-muted-foreground mt-4">The host will be notified via email and push notification</p>
              <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>Cancel Request</Button>
            </div>
          ) : status === "approved" ? (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-success" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Approved!</h4>
              <p className="text-sm text-muted-foreground mt-1">Proceed to check-in the visitor</p>
              <Button className="mt-4" onClick={() => setStatus("idle")}>New Request</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Visitor Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Full name" className="pl-9 h-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Mobile Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="+1 (555) 000-0000" className="pl-9 h-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Company</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Company name" className="pl-9 h-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Select Host Employee</Label>
                <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground">
                  <option value="">Choose a host...</option>
                  {hosts.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Purpose of Visit</Label>
                <Input placeholder="e.g., Unscheduled meeting" className="h-10" />
              </div>
              <Button className="gap-2" onClick={() => setStatus("waiting")}>
                <Send className="w-4 h-4" /> Send Approval Request
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SpotRequest;
