import { CheckCircle2 } from "lucide-react";

type Algorithm = {
  name: string;
  description: string;
  badge: string;
  badgeType: "legacy" | "deprecated" | "recommended" | "secure" | "password";
  uses: string[];
};

const algorithms: Algorithm[] = [
  {
    name: "MD5",
    description: "128-bit cryptographic hash function",
    badge: "Legacy",
    badgeType: "legacy",
    uses: ["File integrity", "Checksums", "Non-security use cases"],
  },
  {
    name: "SHA-1",
    description: "160-bit hash function",
    badge: "Deprecated",
    badgeType: "deprecated",
    uses: ["Legacy systems", "Git commits", "Backward compatibility"],
  },
  {
    name: "SHA-256",
    description: "256-bit secure hash algorithm",
    badge: "Recommended",
    badgeType: "recommended",
    uses: ["Blockchain", "Digital signatures", "SSL certificates"],
  },
  {
    name: "SHA-512",
    description: "512-bit cryptographic hash",
    badge: "High Security",
    badgeType: "secure",
    uses: ["High-security apps", "Password hashing", "Data verification"],
  },
  {
    name: "bcrypt",
    description: "Adaptive password hashing",
    badge: "Password Hash",
    badgeType: "password",
    uses: ["Password storage", "User authentication", "Secure login systems"],
  },
];

export default function Algorithms() {
  return (
    <section className="algorithms-section" id="algorithms">
      <h2 className="algorithms-title">Supported Algorithms</h2>

      <div className="algorithms-grid">
        {algorithms.map((algo) => (
          <article className="algorithm-card" key={algo.name}>
            <div className="algorithm-header">
              <h3>{algo.name}</h3>
              <span className={`security-badge ${algo.badgeType}`}>
                {algo.badge}
              </span>
            </div>

            <p className="algorithm-description">{algo.description}</p>

            <div className="use-cases-title">Common Use Cases:</div>

            <ul className="use-cases-list">
              {algo.uses.map((use) => (
                <li key={use}>
                  <CheckCircle2 size={16} />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}