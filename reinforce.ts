export const UP_FACTOR = 1.15;
export const DOWN_FACTOR = 0.75;
export const INITIAL_WEIGHT = 1;

export function applyVote(weight: number, delta: 1 | -1) {
  const next = delta === 1 ? weight * UP_FACTOR : weight * DOWN_FACTOR;
  return Math.min(32, Math.max(0.05, next));
}

export function rankContext<T extends { weight: number; hits: number }>(items: T[], limit = 8) {
  return [...items]
    .sort((a, b) => b.weight - a.weight || b.hits - a.hits)
    .slice(0, limit);
}

export function formatWeight(w: number) {
  return w.toFixed(3);
}
