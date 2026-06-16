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
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setOutput("");
      setError("Enter some text before generating a hash.");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");
      setCopied(false);

      const hash = await generateHash(text, algorithm);

      if (!hash) {
        throw new Error("The generated hash is empty.");
      }

      setOutput(hash);
    } catch (error) {
      console.error("Hash generation failed:", error);

      setOutput("");
      setError(
        error instanceof Error
          ? error.message
          : "Unable to generate the hash."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyHash = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
      setError("Unable to copy the hash. Please copy it manually.");
    }
  };

  const downloadHash = () => {
    if (!output) return;

    const fileContent = [
      `Algorithm: ${algorithm}`,
      "",
      "Hash:",
      output,
    ].join("\n");

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `${algorithm.toLowerCase()}-hash.txt`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  const clearForm = () => {
    setText("");
    setOutput("");
    setError("");
    setCopied(false);

    document.getElementById("hash-text")?.focus();
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
          placeholder="Enter text to hash..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <label htmlFor="hash-algorithm">Algorithm</label>

        <select
          id="hash-algorithm"
          value={algorithm}
          onChange={(event) =>
            setAlgorithm(event.target.value as HashAlgorithm)
          }
        >
          {algorithms.map((item) => (
            <option key={item} value={item}>
              {item === "bcrypt" ? "bcrypt (Adaptive)" : item}
            </option>
          ))}
        </select>

        <div className="button-row">
          <button
            type="button"
            className="primary-btn wide"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Hash"}
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={clearForm}
            disabled={isGenerating}
          >
            Clear
          </button>
        </div>

        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="hash-output">Output Hash</label>

        <div
          className="output-box"
          id="hash-output"
          aria-live="polite"
        >
          {output || "Generated hash will appear here..."}
        </div>

        <div className="button-row two">
          <button
            type="button"
            className="utility-btn"
            onClick={copyHash}
            disabled={!output}
          >
            <Copy size={20} /> {copied ? "Copied" : "Copy"}
          </button>

          <button
            type="button"
            className="utility-btn"
            onClick={downloadHash}
            disabled={!output}
          >
            <Download size={20} /> Download
          </button>
        </div>
      </div>
    </section>
  );
}