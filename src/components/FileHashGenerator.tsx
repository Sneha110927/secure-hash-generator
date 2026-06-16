import { useRef, useState } from "react";
import { Copy, Download, FileText, Upload } from "lucide-react";
import { generateFileHash } from "../utils/hashUtils";

export default function FileHashGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileHash = async () => {
    if (!file) return;

    const result = await generateFileHash(file, "SHA-256");
    setHash(result);
  };

  const handleClear = () => {
    setFile(null);
    setHash("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCopy = async () => {
    if (!hash) return;
    await navigator.clipboard.writeText(hash);
  };

  const handleDownload = () => {
    if (!hash) return;

    const blob = new Blob([hash], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name || "file"}-sha256-hash.txt`;
    a.click();

    URL.revokeObjectURL(url);
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

          <input
            ref={inputRef}
            type="file"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setHash("");
            }}
          />
        </label>

        {file && (
          <div className="file-preview">
            <p>
              <b>Name:</b> {file.name}
            </p>
            <p>
              <b>Size:</b> {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <div className="button-row">
          <button
            className="primary-btn wide"
            onClick={handleFileHash}
            disabled={!file}
          >
            Generate File Hash
          </button>

          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div className="output-box">{hash || "File hash output..."}</div>

        {hash && (
          <div className="button-row two">
            <button className="utility-btn" onClick={handleCopy}>
              <Copy size={20} />
              Copy
            </button>

            <button className="utility-btn" onClick={handleDownload}>
              <Download size={20} />
              Download
            </button>
          </div>
        )}
      </div>
    </section>
  );
}