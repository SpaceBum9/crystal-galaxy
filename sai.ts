import { GALAXY, SAI_STEPS, type GalaxyNode, resolveTarget } from "./catalog";

export type SaiTrace = {
  source: string;
  origin: "Crystal Mike";
  core: "HAL";
  targetId: string;
  targetName: string;
  path: string[];
};

export function buildTrace(source: string, text: string, targetId?: string): SaiTrace {
  const target: GalaxyNode =
    (targetId ? GALAXY.find((n) => n.id === targetId) : undefined) ?? resolveTarget(text);
  return {
    source: source.trim() || "operator",
    origin: "Crystal Mike",
    core: "HAL",
    targetId: target.id,
    targetName: target.name,
    path: [...SAI_STEPS.slice(0, 3), target.name, SAI_STEPS[4]],
  };
}

export function traceLine(t: SaiTrace) {
  return t.path.join(" → ");
}
