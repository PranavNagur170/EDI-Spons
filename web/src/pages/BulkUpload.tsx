import { AppLayout } from "@/components/AppLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { UploadCloud } from "lucide-react";

const BulkUpload = () => {

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    fetch("http://localhost:5000/api/bulk-upload", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(res => {
        alert(`Uploaded ${res.count} records`);
        setFile(null);
      })
      .catch(err => {
        console.error(err);
        alert("Upload failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <AppLayout title="Bulk Upload">

      <div className="max-w-xl space-y-6">

        <div className="bg-card p-6 rounded-xl border border-border">

          <h3 className="font-semibold mb-4">Upload Visitors CSV</h3>

          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition">

            <label className="cursor-pointer flex flex-col items-center gap-2">

              <UploadCloud className="w-8 h-8 text-muted-foreground" />

              <p className="text-sm font-medium">
                Click to upload CSV file
              </p>

              <p className="text-xs text-muted-foreground">
                Supported: .csv
              </p>

              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />

            </label>

            {file && (
              <p className="mt-3 text-sm text-green-600">
                Selected: {file.name}
              </p>
            )}

          </div>

          <Button
            onClick={handleUpload}
            className="mt-4 w-full"
            disabled={loading}
          >
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Uploading..." : "Upload File"}
          </Button>

        </div>

      </div>

    </AppLayout>
  );
};

export default BulkUpload;