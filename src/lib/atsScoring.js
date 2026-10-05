import { TARGET_ATS_SCORE } from '../data/constants.js';

export function scoreStatus(score, target = TARGET_ATS_SCORE) {
  if (score == null) return { label: 'Not scored yet', tone: 'neutral' };
  if (score >= target) return { label: `Meets your ${target}% target`, tone: 'good' };
  const gap = target - score;
  if (gap <= 10) return { label: `${gap} points from your ${target}% target`, tone: 'close' };
  return { label: `${gap} points from your ${target}% target`, tone: 'far' };
}

export function sortTipsByImpact(tips = []) {
  const rank = { high: 0, medium: 1, low: 2 };
  return [...tips].sort((a, b) => (rank[a.impact] ?? 3) - (rank[b.impact] ?? 3));
}
