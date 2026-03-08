import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Clock, User, Building, Phone } from "lucide-react";
import { useState } from "react";

const pastVisitors = [
  { name: "Sarah Connor", company: "CyberDyne", date: "Mar 5, 2026", purpose: "Meeting", status: "Completed" },
  { name: "James Kirk", company: "Starfleet Inc", date: "Mar 4, 2026", purpose: "Interview", status: "Completed" },
  { name: "Tony Stark", company: "Stark Industries", date: "Mar 3, 2026", purpose: "Delivery", status: "Cancelled" },
];

const PreRegistration = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <AppLayout title="Visitor Pre-Registration">
      <div className="max-w-5xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-1">Invite a Visitor</h3>
            <p className="text-sm text-muted-foreground mb-5">Pre-register a visitor for an upcoming meeting</p>

            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-success" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Invitation Sent!</h4>
                <p className="text-sm text-muted-foreground mt-1">The visitor will receive an SMS/email with details.</p>
                <Button className="mt-4" onClick={() => setSubmitted(false)}>Register Another</Button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Company" className="pl-9 h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Purpose of Visit</Label>
                    <Input placeholder="e.g., Business Meeting" className="h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Meeting Date & Time</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="datetime-local" className="pl-9 h-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Vehicle Details (Optional)</Label>
                    <Input placeholder="License plate / model" className="h-10" />
                  </div>
                </div>
                <Textarea placeholder="Additional notes..." rows={2} />
                <Button className="w-full sm:w-auto" onClick={() => setSubmitted(true)}>
                  <Plus className="w-4 h-4 mr-2" /> Send Invitation
                </Button>
              </div>
            )}
          </div>

          {/* History */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Invitations</h3>
            <div className="space-y-3">
              {pastVisitors.map((v, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-foreground">{v.name}</p>
                      <p className="text-xs text-muted-foreground">{v.company}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      v.status === "Completed" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                    }`}>
                      {v.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" />{v.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{v.purpose}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PreRegistration;
