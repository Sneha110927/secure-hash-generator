import { Shield, Code2 } from "lucide-react";

export default function Navbar() {
  return (
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
        <a href="#docs">Docs</a>
        <a href="#about">About</a>
      </div>

      <button className="icon-btn" aria-label="Developer">
        <Code2 size={22} />
      </button>
    </nav>
  );
}