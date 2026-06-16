import { useEffect, useState } from "react";
import {
  Shield,
  Code2,
  BookOpen,
  Hash,
  Terminal,
  Code,
  X,
  ShieldCheck,
  Zap,
  FileText,
  Lock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type DocTab = "intro" | "algorithms" | "usage" | "api";
type HelpTab = "faq";

export default function Navbar() {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<DocTab>("intro");
  const [activeHelpTab] = useState<HelpTab>("faq");
  const [openFaq, setOpenFaq] = useState<number>(0);

  useEffect(() => {
    const openDocs = (event: Event) => {
      const tab = (event as CustomEvent<DocTab>).detail || "intro";
      setActiveTab(tab);
      setIsDocsOpen(true);
      setIsHelpOpen(false);
    };

    const openHelp = () => {
      setIsHelpOpen(true);
      setIsDocsOpen(false);
    };

    window.addEventListener("open-docs", openDocs);
    window.addEventListener("open-help", openHelp);

    return () => {
      window.removeEventListener("open-docs", openDocs);
      window.removeEventListener("open-help", openHelp);
    };
  }, []);

  const faqs = [
    {
      q: "Is my data safe when using Secure Hash Generator?",
      a: "Absolutely. All hashing is performed entirely client-side in your browser using the Web Crypto API and bcryptjs. Your input text and files never leave your device — no data is sent to any server.",
    },
    {
      q: "What is the difference between MD5, SHA-256, and bcrypt?",
      a: "MD5 is outdated and should only be used for non-security checksums. SHA-256 is recommended for integrity checks and cryptographic hashes. bcrypt is designed specifically for password hashing.",
    },
    {
      q: "Can I hash files as well as text?",
      a: "Yes. Files are read locally in your browser and hashed without being uploaded anywhere.",
    },
    {
      q: "Are bcrypt hashes deterministic?",
      a: "No. bcrypt uses random salting, so the same password produces a different hash each time.",
    },
    {
      q: "Which algorithm should I use for password storage?",
      a: "Use bcrypt for password storage. Do not use MD5, SHA-1, SHA-256, or SHA-512 directly for passwords.",
    },
    {
      q: "Can I use this tool offline?",
      a: "Yes, once the app is loaded, hashing works client-side. Full offline support depends on your app’s deployment/PWA setup.",
    },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <div className="logo">
            <Shield size={28} />
          </div>
          <span>Secure Hash Generator</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#algorithms">Algorithms</a>

          <button
            type="button"
            className="nav-link-btn"
            onClick={() => {
              setActiveTab("intro");
              setIsDocsOpen(true);
            }}
          >
            Docs
          </button>

          <a href="#about">About</a>
        </div>

        <button className="icon-btn" aria-label="Developer">
          <Code2 size={22} />
        </button>
      </nav>

      {isDocsOpen && (
        <div className="docs-overlay">
          <div className="docs-panel">
            <div className="docs-header">
              <div className="docs-title">
                <div className="docs-logo">
                  <BookOpen size={26} />
                </div>
                <h2>Documentation</h2>
              </div>

              <button className="docs-close" onClick={() => setIsDocsOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="docs-body">
              <aside className="docs-sidebar">
                <button
                  className={`docs-tab ${activeTab === "intro" ? "active" : ""}`}
                  onClick={() => setActiveTab("intro")}
                >
                  <BookOpen size={20} />
                  Introduction
                </button>

                <button
                  className={`docs-tab ${activeTab === "algorithms" ? "active" : ""}`}
                  onClick={() => setActiveTab("algorithms")}
                >
                  <Hash size={20} />
                  Algorithms
                </button>

                <button
                  className={`docs-tab ${activeTab === "usage" ? "active" : ""}`}
                  onClick={() => setActiveTab("usage")}
                >
                  <Terminal size={20} />
                  Usage Guide
                </button>

                <button
                  className={`docs-tab ${activeTab === "api" ? "active" : ""}`}
                  onClick={() => setActiveTab("api")}
                >
                  <Code size={20} />
                  API Reference
                </button>
              </aside>

              <main className="docs-content">
                {activeTab === "intro" && (
                  <>
                    <h3>
                      <BookOpen size={25} /> Introduction
                    </h3>
                    <p>
                      <strong>Secure Hash Generator</strong> is a fully
                      client-side cryptographic hashing tool. Every operation
                      runs inside your browser.
                    </p>

                    <p>Use it to:</p>

                    <ul>
                      <li>
                        <ShieldCheck size={18} /> Generate cryptographic hashes
                        of text strings
                      </li>
                      <li>
                        <ShieldCheck size={18} /> Verify file integrity
                      </li>
                      <li>
                        <ShieldCheck size={18} /> Produce bcrypt password hashes
                      </li>
                      <li>
                        <ShieldCheck size={18} /> Compare hashing algorithms
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === "algorithms" && (
                  <>
                    <h3>
                      <Hash size={25} /> Algorithms
                    </h3>

                    <div className="algo-doc-card">
                      <h4>
                        MD5 <span>Legacy</span>
                      </h4>
                      <p>128-bit digest. Broken for security use.</p>
                      <small>Output: 32 hex characters</small>
                    </div>

                    <div className="algo-doc-card">
                      <h4>
                        SHA-1 <span>Deprecated</span>
                      </h4>
                      <p>160-bit digest. Avoid for new systems.</p>
                      <small>Output: 40 hex characters</small>
                    </div>

                    <div className="algo-doc-card">
                      <h4>
                        SHA-256 <span className="cyan-pill">Recommended</span>
                      </h4>
                      <p>Recommended for data integrity and secure hashing.</p>
                      <small>Output: 64 hex characters</small>
                    </div>

                    <div className="algo-doc-card">
                      <h4>
                        SHA-512 <span>High Security</span>
                      </h4>
                      <p>Useful for larger digest and long-term integrity.</p>
                      <small>Output: 128 hex characters</small>
                    </div>

                    <div className="algo-doc-card">
                      <h4>
                        bcrypt <span className="purple-pill">Password Hash</span>
                      </h4>
                      <p>Best choice for password storage.</p>
                      <small>Output: 60-character bcrypt string</small>
                    </div>
                  </>
                )}

                {activeTab === "usage" && (
                  <>
                    <h3>
                      <Terminal size={25} /> Usage Guide
                    </h3>

                    <h4 className="docs-subtitle">
                      <Zap size={18} /> Text Hashing
                    </h4>
                    <ol>
                      <li>Type or paste your text.</li>
                      <li>Select an algorithm.</li>
                      <li>
                        Click <strong>Generate Hash.</strong>
                      </li>
                      <li>Copy or download the result.</li>
                    </ol>

                    <h4 className="docs-subtitle">
                      <FileText size={18} /> File Hashing
                    </h4>
                    <ol>
                      <li>Upload or drag and drop a file.</li>
                      <li>The file is hashed locally.</li>
                      <li>Compare the hash to verify integrity.</li>
                    </ol>

                    <h4 className="docs-subtitle">
                      <Lock size={18} /> Best Practices
                    </h4>
                    <ol>
                      <li>Use bcrypt for passwords.</li>
                      <li>Use SHA-256 or SHA-512 for integrity checks.</li>
                      <li>Avoid MD5 and SHA-1 for security use.</li>
                    </ol>
                  </>
                )}

                {activeTab === "api" && (
                  <>
                    <h3>
                      <Code size={25} /> API Reference
                    </h3>

                    <p>
                      All hashing logic uses browser-native APIs. Below are the
                      core calls used internally.
                    </p>

                    <div className="code-doc-card">
                      <h4>Web Crypto — SHA family</h4>
                      <pre>{`const encoder = new TextEncoder();
const data = encoder.encode(inputText);
const hashBuffer = await crypto.subtle.digest('SHA-256', data);
const hex = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');`}</pre>
                    </div>

                    <div className="code-doc-card">
                      <h4>bcryptjs — password hashing</h4>
                      <pre>{`import bcrypt from 'bcryptjs';

const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);`}</pre>
                    </div>

                    <div className="code-doc-card">
                      <h4>File reading</h4>
                      <pre>{`const buffer = await file.arrayBuffer();
const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);`}</pre>
                    </div>
                  </>
                )}
              </main>
            </div>
          </div>
        </div>
      )}

      {isHelpOpen && (
        <div className="docs-overlay">
          <div className="docs-panel help-panel">
            <div className="docs-header">
              <div className="docs-title">
                <div className="help-logo">
                  <HelpCircle size={26} />
                </div>
                <h2>Help & Support</h2>
              </div>

              <button className="docs-close" onClick={() => setIsHelpOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="help-content">
              <div className="help-tabs">
                <button className={activeHelpTab === "faq" ? "active" : ""}>
                  FAQ
                </button>

                <a href="mailto:jhawarsneha11@gmail.com">Email Support</a>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div className="faq-item" key={faq.q}>
                    <button
                      className="faq-question"
                      onClick={() =>
                        setOpenFaq(openFaq === index ? -1 : index)
                      }
                    >
                      {faq.q}
                      {openFaq === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    {openFaq === index && (
                      <div className="faq-answer">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}