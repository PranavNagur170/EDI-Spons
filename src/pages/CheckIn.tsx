import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Camera, BadgeCheck, UserCheck, Clock, Building } from "lucide-react";
import { useState } from "react";

const mockVisitor = {
  name: "Sarah Connor",
  company: "CyberDyne Systems",
  mobile: "+1 555-0199",
  host: "Mike Johnson",
  purpose: "Business Meeting",
  scheduledTime: "10:30 AM - 12:00 PM",
  status: "Pre-Registered",
  meetingId: "VMS-2026-0342",
};

const CheckIn = () => {
  const [searched, setSearched] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <AppLayout title="Visitor Check-In">
      <div className="max-w-3xl space-y-6">
        {/* Search */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-1">Look Up Visitor</h3>
          <p className="text-sm text-muted-foreground mb-4">Search by mobile number, name, or meeting ID</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search visitor..." className="pl-10 h-12 text-base" />
            </div>
            <Button className="h-12 px-6" onClick={() => { setSearched(true); setCheckedIn(false); }}>Search</Button>
          </div>
        </div>

        {/* Result */}
        {searched && (
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            {checkedIn ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-success" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Checked In Successfully!</h4>
                <p className="text-sm text-muted-foreground mt-1">Badge #B047 assigned to {mockVisitor.name}</p>
                <Button className="mt-4" variant="outline" onClick={() => { setSearched(false); setCheckedIn(false); }}>
                  Check In Another
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{mockVisitor.name}</h4>
                    <p className="text-sm text-muted-foreground">{mockVisitor.company}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {mockVisitor.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Meeting ID", value: mockVisitor.meetingId },
                    { label: "Host", value: mockVisitor.host },
                    { label: "Purpose", value: mockVisitor.purpose },
                    { label: "Schedule", value: mockVisitor.scheduledTime },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="gap-2">
                    <Camera className="w-4 h-4" /> Capture Photo
                  </Button>
                  <div className="flex-1 min-w-[150px]">
                    <Input placeholder="Badge Number (e.g., B047)" className="h-10" />
                  </div>
                  <Button className="gap-2" onClick={() => setCheckedIn(true)}>
                    <BadgeCheck className="w-4 h-4" /> Check In
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CheckIn;
