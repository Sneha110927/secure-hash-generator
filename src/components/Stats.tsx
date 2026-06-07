import { Fingerprint, Hash, LockKeyhole, Shield } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  Icon: React.ElementType;
  variant?: "cyan" | "purple";
};

const stats: Stat[] = [
  {
    value: "10K+",
    label: "Hashes Generated",
    Icon: Hash,
    variant: "cyan",
  },
  {
    value: "5",
    label: "Algorithms Supported",
    Icon: Fingerprint,
  },
  {
    value: "100%",
    label: "Client-Side Processing",
    Icon: Shield,
    variant: "purple",
  },
  {
    value: "Military",
    label: "Security Level",
    Icon: LockKeyhole,
  },
];

export default function Stats() {
  return (
    <section className="stats-section">
      <h2 className="stats-title">Security Statistics</h2>

      <div className="security-stats-grid">
        {stats.map(({ value, label, Icon, variant }) => (
          <article className={`security-stat-card ${variant ?? ""}`} key={label}>
            <Icon className="security-stat-icon" size={56} strokeWidth={2.2} />
            <h3>{value}</h3>
            <p>{label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}