import { LockKeyhole, Mail, Shield } from "lucide-react";

export default function Footer() {
  const openDocs = (tab: "intro" | "algorithms" | "usage" | "api") => {
    window.dispatchEvent(new CustomEvent("open-docs", { detail: tab }));
  };

  const openHelp = () => {
    window.dispatchEvent(new CustomEvent("open-help"));
  };

  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <div className="footer-logo">
              <Shield size={24} />
            </div>
            <span>Secure Hash</span>
          </div>

          <p>
            Professional cryptographic hash generation tool for developers and
            security professionals.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="#home">Home</a>
          <a href="#algorithms">Algorithms</a>

          <button onClick={() => openDocs("intro")} className="footer-link-btn">
            Documentation
          </button>

          <button onClick={() => openDocs("api")} className="footer-link-btn">
            API
          </button>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>

          <button onClick={() => openDocs("api")} className="footer-link-btn">
            Security Guide
          </button>

          <button onClick={() => openDocs("usage")} className="footer-link-btn">
            Best Practices
          </button>

          <button onClick={openHelp} className="footer-link-btn">
            FAQ
          </button>

          <a href="mailto:jhawarsneha11@gmail.com">Email Support</a>
        </div>

        <div className="footer-column">
          <h3>Connect</h3>

          <a
            className="footer-social-btn"
            href="mailto:jhawarsneha11@gmail.com"
            aria-label="Email Support"
          >
            <Mail size={22} />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Secure Hash Generator. All rights reserved.</p>

        <p className="footer-built">
          <LockKeyhole size={18} />
          Built with Cryptography & Cybersecurity
        </p>
      </div>
    </footer>
  );
}