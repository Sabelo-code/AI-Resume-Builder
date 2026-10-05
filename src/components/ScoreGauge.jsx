import { TARGET_ATS_SCORE } from '../data/constants.js';

export default function ScoreGauge({ score, target = TARGET_ATS_SCORE }) {
  const pct = Math.max(0, Math.min(100, Math.round(score || 0)));
  const r = 54, c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  const targetAngle = (target / 100) * 360 - 90;
  const met = pct >= target;

  return (
    <svg viewBox="0 0 140 140" className="rb-gauge" role="img" aria-label={`ATS match score ${pct} out of 100, target ${target}`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="var(--rb-line)" strokeWidth="10" />
      {/* target marker */}
      <line
        x1="70" y1="16" x2="70" y2="26" stroke="var(--rb-ochre)" strokeWidth="3" strokeLinecap="round"
        transform={`rotate(${targetAngle + 90} 70 70)`}
      />
      <circle
        cx="70" cy="70" r={r} fill="none" stroke={met ? '#2f8f5b' : 'var(--rb-navy)'} strokeWidth="10"
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform="rotate(-90 70 70)"
      />
      <text x="70" y="64" textAnchor="middle" className="rb-gauge-num">{pct}</text>
      <text x="70" y="86" textAnchor="middle" className="rb-gauge-label">ATS MATCH · TARGET {target}</text>
    </svg>
  );
}
