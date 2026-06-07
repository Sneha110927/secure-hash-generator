import { useState } from "react";
import { FileText, Upload } from "lucide-react";
import { generateFileHash } from "../utils/hashUtils";

export default function FileHashGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");

  const handleFileHash = async () => {
    if (!file) return;
    const result = await generateFileHash(file, "SHA-256");
    setHash(result);
  };

  return (
    <section className="section">
      <div className="glass-card file-card">
        <h2 className="purple-title">
          <FileText /> File Hash Generator
        </h2>

        <label className="drop-zone">
          <Upload size={42} />
          <span>Drag & drop your file here</span>
          <small>or click to upload</small>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        {file && (
          <div className="file-preview">
            <p><b>Name:</b> {file.name}</p>
            <p><b>Size:</b> {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button className="primary-btn" onClick={handleFileHash}>
          Generate File Hash
        </button>

        <div className="output-box">{hash || "File hash output..."}</div>
      </div>
    </section>
  );
}