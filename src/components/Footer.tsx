import { Code2, LockKeyhole, Shield } from "lucide-react";

export default function Footer() {
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
          <a href="#docs">Documentation</a>
          <a href="#api">API</a>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <a href="#docs">Security Guide</a>
          <a href="#docs">Best Practices</a>
          <a href="#docs">FAQ</a>
          <a href="#docs">Support</a>
        </div>

        <div className="footer-column">
          <h3>Connect</h3>

          <button className="footer-social-btn" aria-label="Developer link">
            <Code2 size={22} />
          </button>
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