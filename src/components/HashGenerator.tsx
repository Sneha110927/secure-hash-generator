import { useState } from "react";
import { Copy, Download, Hash } from "lucide-react";
import { generateHash } from "../utils/hashUtils";
import type { HashAlgorithm } from "../utils/hashUtils";

const algorithms: HashAlgorithm[] = [
  "bcrypt",
  "SHA-256",
  "SHA-512",
  "SHA-1",
  "MD5",
];

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("bcrypt");
  const [output, setOutput] = useState(
    "$2b$10$crC3H1MtLiqJ7Sa6fJyAEeJuBG8BfDSAQot/2CY66qdE7V7rDQ0iq"
  );

  const handleGenerate = async () => {
    const hash = await generateHash(text, algorithm);
    setOutput(hash || "");
  };

  const copyHash = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
  };

  const downloadHash = () => {
    if (!output) return;

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "hash.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const clearForm = () => {
    setText("");
    setOutput("");
  };

  return (
    <section className="section" id="generator">
      <div className="glass-card generator-card">
        <h2>
          <Hash /> Text Hash Generator
        </h2>

        <label htmlFor="hash-text">Input Text</label>
        <textarea
          id="hash-text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label htmlFor="hash-algorithm">Algorithm</label>
        <select
          id="hash-algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)}
        >
          {algorithms.map((algo) => (
            <option key={algo} value={algo}>
              {algo === "bcrypt" ? "bcrypt (Adaptive)" : algo}
            </option>
          ))}
        </select>

        <div className="button-row">
          <button className="primary-btn wide" onClick={handleGenerate}>
            Generate Hash
          </button>

          <button className="clear-btn" onClick={clearForm}>
            Clear
          </button>
        </div>

        <label>Output Hash</label>
        <div className="output-box">
          {output || "Generated hash will appear here..."}
        </div>

        <div className="button-row two">
          <button className="utility-btn" onClick={copyHash}>
            <Copy size={20} /> Copy
          </button>

          <button className="utility-btn" onClick={downloadHash}>
            <Download size={20} /> Download
          </button>
        </div>
      </div>
    </section>
  );
}