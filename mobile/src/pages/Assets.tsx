import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Laptop, Car, Plus, CheckCircle, Package } from "lucide-react";
import { useState } from "react";

const assetLog = [
  { type: "Laptop", serial: "SN-4821", visitor: "John Smith", status: "Inside" },
  { type: "Camera", serial: "CAM-0091", visitor: "Sarah Connor", status: "Inside" },
  { type: "Laptop", serial: "SN-7733", visitor: "James Kirk", status: "Returned" },
];

const vehicleLog = [
  { plate: "CA-1234-XY", model: "Tesla Model 3", visitor: "Bruce Wayne", status: "Parked" },
  { plate: "NY-5678-AB", model: "BMW X5", visitor: "Diana Prince", status: "Parked" },
];

const Assets = () => {
  const [tab, setTab] = useState<"assets" | "vehicles">("assets");

  return (
    <AppLayout title="Assets & Vehicles">
      <div className="max-w-5xl space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab("assets")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "assets" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Laptop className="w-4 h-4 inline mr-2" />Assets
          </button>
          <button
            onClick={() => setTab("vehicles")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "vehicles" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Car className="w-4 h-4 inline mr-2" />Vehicles
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {tab === "assets" ? "Register Asset" : "Log Vehicle"}
            </h3>
            <div className="space-y-3">
              {tab === "assets" ? (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">Asset Type</Label>
                    <Input placeholder="e.g., Laptop, Camera" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">Serial Number</Label>
                    <Input placeholder="SN-XXXX" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">Visitor Name</Label>
                    <Input placeholder="Visitor" className="h-9" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">License Plate</Label>
                    <Input placeholder="XX-0000-YY" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">Vehicle Model</Label>
                    <Input placeholder="e.g., Tesla Model 3" className="h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-foreground text-xs">Visitor Name</Label>
                    <Input placeholder="Visitor" className="h-9" />
                  </div>
                </>
              )}
              <Button size="sm" className="w-full gap-1">
                <Plus className="w-4 h-4" /> Register
              </Button>
            </div>
          </div>

          {/* Log Table */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {tab === "assets" ? (
                      <>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Serial #</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Visitor</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                      </>
                    ) : (
                      <>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plate</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Model</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Visitor</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(tab === "assets" ? assetLog : vehicleLog).map((item, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{"serial" in item ? item.type : item.plate}</td>
                      <td className="px-4 py-3 text-muted-foreground">{"serial" in item ? item.serial : item.model}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.visitor}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.status === "Inside" || item.status === "Parked" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                        }`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Assets;
