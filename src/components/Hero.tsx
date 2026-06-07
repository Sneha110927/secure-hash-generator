import ShapeGrid from "./ShapeGrid";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <ShapeGrid
          speed={0.25}
          squareSize={48}
          direction="diagonal"
          borderColor="rgba(0,221,255,0.18)"
          hoverFillColor="rgba(0,221,255,0.12)"
          hoverTrailAmount={4}
        />
      </div>

      <div className="hero-content">
        <h1>
          Generate Secure Hashes
          <br />
          Instantly
        </h1>

        <p>
          Professional cryptographic hash generation with support for
          SHA-256, SHA-512, MD5, bcrypt and more.
        </p>

        <div className="hero-actions">
          <button className="primary-btn">
            Generate Hash <ArrowRight size={20} />
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}