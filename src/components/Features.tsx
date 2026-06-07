import {
  LockKeyhole,
  Fingerprint,
  Zap,
  FileCheck2,
  KeyRound,
  Database,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  Icon: LucideIcon;
  variant?: "cyan" | "purple";
};

const features: Feature[] = [
  {
    title: "Secure Encryption",
    description: "Military-grade encryption algorithms for maximum security",
    Icon: LockKeyhole,
    variant: "cyan",
  },
  {
    title: "Multiple Algorithms",
    description: "Support for MD5, SHA-1, SHA-256, SHA-512, and bcrypt",
    Icon: Fingerprint,
  },
  {
    title: "Fast Processing",
    description: "Lightning-fast hash generation in your browser",
    Icon: Zap,
    variant: "purple",
  },
  {
    title: "File Integrity Check",
    description: "Verify file integrity with cryptographic hashes",
    Icon: FileCheck2,
  },
  {
    title: "Password Protection",
    description: "Secure password hashing with bcrypt algorithm",
    Icon: KeyRound,
  },
  {
    title: "Copy & Download",
    description: "Easy copy to clipboard and download options",
    Icon: Database,
    variant: "cyan",
  },
];

export default function Features() {
  return (
    <section className="features-section">
      <h2 className="features-title">Powerful Features</h2>

      <div className="features-grid">
        {features.map(({ title, description, Icon, variant }) => (
          <article className={`feature-card ${variant ?? ""}`} key={title}>
            <Icon className="feature-icon" size={56} strokeWidth={2.2} />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}