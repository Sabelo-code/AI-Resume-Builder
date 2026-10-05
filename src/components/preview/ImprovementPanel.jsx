import { TrendingUp, CircleAlert } from 'lucide-react';
import ScoreGauge from '../ScoreGauge.jsx';
import { TARGET_ATS_SCORE } from '../../data/constants.js';
import { scoreStatus, sortTipsByImpact } from '../../lib/atsScoring.js';

const BREAKDOWN_LABELS = {
  keyword_coverage: 'Keyword coverage',
  experience_relevance: 'Experience relevance',
  skills_alignment: 'Skills alignment',
  formatting_clarity: 'Formatting clarity'
};

export default function ImprovementPanel({ ats }) {
  if (!ats) return null;
  const status = scoreStatus(ats.score);
  const tips = sortTipsByImpact(ats.tips);

  return (
    <div className="rb-panel rb-ats-panel no-print">
      <ScoreGauge score={ats.score} />
      <div style={{ flex: 1, minWidth: 220 }}>
        <div className={`rb-status rb-status-${status.tone}`}>
          <TrendingUp size={14} /> {status.label}
        </div>

        {ats.breakdown && (
          <div className="rb-breakdown">
            {Object.entries(ats.breakdown).map(([key, val]) => (
              <div className="rb-breakdown-row" key={key}>
                <span>{BREAKDOWN_LABELS[key] || key}</span>
                <div className="rb-breakdown-bar"><div className="rb-breakdown-fill" style={{ width: `${Math.max(0, Math.min(100, val))}%` }} /></div>
                <span className="rb-breakdown-val">{val}</span>
              </div>
            ))}
          </div>
        )}

        {ats.matched?.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p className="rb-kw-title">Keywords covered</p>
            <div className="rb-kw-list">{ats.matched.map((k, i) => <span className="rb-kw rb-kw-matched" key={i}>{k}</span>)}</div>
          </div>
        )}
        {ats.missing?.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <p className="rb-kw-title">Worth considering</p>
            <div className="rb-kw-list">{ats.missing.map((k, i) => <span className="rb-kw rb-kw-missing" key={i}>{k}</span>)}</div>
          </div>
        )}

        {tips.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <p className="rb-kw-title">To reach {TARGET_ATS_SCORE}%</p>
            <ul className="rb-tips">
              {tips.map((t, i) => (
                <li key={i} className={`rb-tip rb-tip-${t.impact || 'medium'}`}>
                  <CircleAlert size={13} />
                  <span><strong>{t.area}:</strong> {t.suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
