import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Clock, User, Building, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const PreRegistration = () => {

  const [submitted, setSubmitted] = useState(false);

  // ✅ FORM STATE
  const [form, setForm] = useState({
    visitor_name: "",
    phone: "",
    company: "",
    purpose: "",
    visit_date: "",
    vehicle: "",
    notes: ""
  });

  // ✅ INVITATIONS STATE
  const [invitations, setInvitations] = useState<any[]>([]);

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FETCH INVITATIONS
  const fetchInvitations = () => {
  fetch("http://localhost:5000/api/pre-registrations")
    .then(res => res.json())
    .then(res => {
      console.log("API Response:", res); // 👈 check this in console

      // ✅ Handle all cases
      if (Array.isArray(res)) {
        setInvitations(res);
      } else if (Array.isArray(res.data)) {
        setInvitations(res.data);
      } else {
        setInvitations([]);
      }
    })
    .catch(err => {
      console.error(err);
      setInvitations([]);
    });
};

  useEffect(() => {
    fetchInvitations();
  }, []);

  // ✅ SUBMIT
  const handleSubmit = () => {

    if (!form.visitor_name || !form.phone || !form.visit_date) {
      alert("Please fill required fields");
      return;
    }

    fetch("http://localhost:5000/api/pre-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        setSubmitted(true);
        fetchInvitations();

        // reset form
        setForm({
          visitor_name: "",
          phone: "",
          company: "",
          purpose: "",
          visit_date: "",
          vehicle: "",
          notes: ""
        });
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong");
      });
  };

  return (
    <AppLayout title="Visitor Pre-Registration">
      <div className="max-w-5xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* FORM */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-1">Invite a Visitor</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Pre-register a visitor for an upcoming meeting
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold">Invitation Sent!</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Visitor added successfully
                </p>
                <Button className="mt-4" onClick={() => setSubmitted(false)}>
                  Register Another
                </Button>
              </div>
            ) : (
              <div className="space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Visitor Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="visitor_name"
                        value={form.visitor_name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className="pl-9 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="pl-9 h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="pl-9 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Purpose of Visit</Label>
                    <Input
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      placeholder="Business Meeting"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Meeting Date & Time</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="datetime-local"
                        name="visit_date"
                        value={form.visit_date}
                        onChange={handleChange}
                        className="pl-9 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Vehicle Details</Label>
                    <Input
                      name="vehicle"
                      value={form.vehicle}
                      onChange={handleChange}
                      placeholder="MH12 AB1234"
                    />
                  </div>
                </div>

                <Textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Additional notes..."
                />

                <Button onClick={handleSubmit}>
                  <Plus className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </div>
            )}
          </div>

          {/* HISTORY */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Recent Invitations</h3>

            <div className="space-y-3">
              {invitations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No invitations</p>
              ) : (
                invitations.map((v: any, i) => (
                  <div key={i} className="p-3 rounded-lg bg-muted/50 border">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{v.visitor_name}</p>
                        <p className="text-xs text-muted-foreground">{v.company}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                        {v.status}
                      </span>
                    </div>

                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(v.visit_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {v.purpose}
                      </span>
                    </div>
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

export default PreRegistration;