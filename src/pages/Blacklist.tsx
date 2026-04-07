import { AppLayout } from "@/components/AppLayout";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, AlertTriangle, Trash2 } from "lucide-react";

const Blacklist = () => {

  // 🔥 STATE
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({
    visitor_name: "",
    phone: "",
    reason: ""
  });

  // 🔥 HANDLE INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 FETCH DATA
  const fetchBlacklist = () => {
    fetch("http://localhost:5000/api/blacklist")
      .then(res => res.json())
      .then(res => {
        console.log("Blacklist:", res);
        setList(Array.isArray(res) ? res : []);
      })
      .catch(err => {
        console.error(err);
        setList([]);
      });
  };

  useEffect(() => {
    fetchBlacklist();
  }, []);

  // 🔥 ADD TO BLACKLIST
  const handleAdd = () => {
    if (!form.visitor_name || !form.phone) {
      alert("Name and phone are required");
      return;
    }

    fetch("http://localhost:5000/api/blacklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then(() => {
        fetchBlacklist();
        setForm({
          visitor_name: "",
          phone: "",
          reason: ""
        });
      })
      .catch(err => console.error(err));
  };

  // 🔥 DELETE
  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/api/blacklist/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchBlacklist())
      .catch(err => console.error(err));
  };

  return (
    <AppLayout title="Blacklist">

      <div className="max-w-6xl space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* 🔴 FORM */}
          <div className="lg:col-span-2 bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Add to Blacklist</h3>

            <div className="space-y-4">

              <div className="space-y-2">
                <Label>Visitor Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="visitor_name"
                    value={form.visitor_name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXX"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Reason</Label>
                <Input
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Reason for blacklist"
                />
              </div>

              <Button onClick={handleAdd} className="w-full">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Add to Blacklist
              </Button>

            </div>
          </div>

          {/* ⚫ LIST */}
          <div className="lg:col-span-3 bg-card p-6 rounded-xl border border-border">
            <h3 className="font-semibold mb-4">Blacklisted Visitors</h3>

            <div className="space-y-3">

              {list.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No blacklisted visitors
                </p>
              ) : (
                list.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border bg-muted/50 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{item.visitor_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.phone}
                      </p>
                      <p className="text-xs text-red-500 mt-1">
                        {item.reason}
                      </p>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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

export default Blacklist;