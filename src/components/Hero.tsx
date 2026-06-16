import ShapeGrid from "./ShapeGrid";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const goToTextGenerator = () => {
    const inputField = document.getElementById(
      "hash-text"
    ) as HTMLTextAreaElement | null;

    if (!inputField) return;

    inputField.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      inputField.focus({
        preventScroll: true,
      });
    }, 500);
  };

  const goToAlgorithms = () => {
    const algorithmsSection = document.getElementById("algorithms");

    if (!algorithmsSection) return;

    algorithmsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="hero" id="home">
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
          Professional cryptographic hash generation with support for SHA-256,
          SHA-512, MD5, bcrypt and more.
        </p>

        <div className="hero-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={goToTextGenerator}
          >
            Generate Hash <ArrowRight size={20} />
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={goToAlgorithms}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}