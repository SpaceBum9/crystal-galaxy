export const AUTOMATON_ACTIONS = ["initialize", "sync", "execute", "halt"] as const;
export type AutomatonAction = (typeof AUTOMATON_ACTIONS)[number];

export type AutomatonCommand = {
  automaton_id: string;
  action: AutomatonAction;
  parameters: {
    target_node: string;
    stability_threshold?: number;
  };
};

export type DispatchResult =
  | {
      status: "orchestrated";
      automaton_id: string;
      action_executed: AutomatonAction;
      target_node: string;
      dispatch_result: "SUCCESS";
      security_layer: string;
      euclidean: number[];
    }
  | { status: "rejected"; error: string }
  | { status: "error"; error: string };

const ID_RE = /^[a-zA-Z0-9._:-]{1,64}$/;

export function parseCommand(raw: unknown): { ok: true; command: AutomatonCommand } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Payload muss ein Objekt sein." };
  const o = raw as Record<string, unknown>;
  if (typeof o.automaton_id !== "string" || !ID_RE.test(o.automaton_id)) {
    return { ok: false, error: "automaton_id ungültig." };
  }
  if (!AUTOMATON_ACTIONS.includes(o.action as AutomatonAction)) {
    return { ok: false, error: "action muss initialize | sync | execute | halt sein." };
  }
  const p = o.parameters;
  if (!p || typeof p !== "object") return { ok: false, error: "parameters fehlt." };
  const params = p as Record<string, unknown>;
  if (typeof params.target_node !== "string" || !params.target_node.trim()) {
    return { ok: false, error: "parameters.target_node ist Pflicht." };
  }
  let threshold: number | undefined;
  if (params.stability_threshold !== undefined) {
    if (typeof params.stability_threshold !== "number" || params.stability_threshold < 0 || params.stability_threshold > 1) {
      return { ok: false, error: "stability_threshold muss in [0, 1] liegen." };
    }
    threshold = params.stability_threshold;
  }
  return {
    ok: true,
    command: {
      automaton_id: o.automaton_id,
      action: o.action as AutomatonAction,
      parameters: {
        target_node: params.target_node.trim(),
        stability_threshold: threshold,
      },
    },
  };
}

export function euclideanSequence(start: number, end: number, step = 1) {
  const seq: number[] = [];
  for (let x = start; x <= end; x += step) seq.push(Number(x.toFixed(4)));
  return seq;
}

export function dispatchLocal(command: AutomatonCommand): DispatchResult {
  const span = command.parameters.stability_threshold ?? 0.25;
  const seq = euclideanSequence(0, 1, Math.max(0.1, 1 - span) / 4);
  return {
    status: "orchestrated",
    automaton_id: command.automaton_id,
    action_executed: command.action,
    target_node: command.parameters.target_node,
    dispatch_result: "SUCCESS",
    security_layer: "Semantic Anchoring / schema corridor (local)",
    euclidean: seq,
  };
}
