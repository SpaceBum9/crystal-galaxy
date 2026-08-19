export type NodeKind =
  | "origin"
  | "core"
  | "github"
  | "drive"
  | "huggingface"
  | "lab"
  | "ops"
  | "mesh";

export type GalaxyNode = {
  id: string;
  name: string;
  kind: NodeKind;
  blurb: string;
  href?: string;
  route: string;
  owner?: string;
};

export const GALAXY: GalaxyNode[] = [
  {
    id: "crystal-mike",
    name: "Crystal Mike",
    kind: "origin",
    blurb: "Ursprungs-Kristall. Semantic Anchor jeder SAI-Trace-Route. Kein Avatar.",
    route: "/",
  },
  {
    id: "hal",
    name: "HAL",
    kind: "core",
    blurb: "Offener Kern. HAL for everybody — Dienstleister, kein Thron.",
    route: "/hal",
  },
  {
    id: "crystal-galaxy",
    name: "crystal-galaxy",
    kind: "github",
    owner: "SpaceBum9",
    blurb: "BILO 2026 Kommandozentrale. DualEntangled, SAI traceback, automated context.",
    href: "https://github.com/SpaceBum9/crystal-galaxy",
    route: "/galaxy",
  },
  {
    id: "kreuzkopplung",
    name: "kreuzkopplung",
    kind: "lab",
    owner: "SpaceBum9",
    blurb: "Zwei-Kanal-Regler DualEntangledSystem.run(). Klassisch, nicht quantenmechanisch.",
    href: "https://github.com/SpaceBum9/kreuzkopplung",
    route: "/lab",
  },
  {
    id: "hf-kreuzkopplung",
    name: "Hugging Face Space",
    kind: "huggingface",
    blurb: "Import SpaceBum9/kreuzkopplung → Gradio Space. Dieselbe run()-Schleife.",
    href: "https://huggingface.co/new-space",
    route: "/galaxy",
  },
  {
    id: "mct-170021",
    name: "MCT-170021",
    kind: "mesh",
    owner: "SpaceBum9",
    blurb: "Zero-Tier mesh, Euclidean sequencer, MCP-Connectoren. Keine Anthropomorphie.",
    href: "https://github.com/SpaceBum9/mct-170021-zero-tier-quantum-skills-tools-mcp-connectors",
    route: "/orchestrate",
  },
  {
    id: "echoglas",
    name: "ECHOGLAS",
    kind: "ops",
    owner: "SpaceBum9",
    blurb: "Jonas-G. Fiktive Ops. Keine Rohbeweise, keine Credentials, keine Destruktion.",
    href: "https://github.com/SpaceBum9/Jonas-G.",
    route: "/constitution",
  },
  {
    id: "plasma-toxogon",
    name: "plasma-toxogon",
    kind: "ops",
    owner: "SpaceBum9",
    blurb: "Der Dienstleister für alle. Flowchart, Anarcho-Archiv, Steuer-für-teuer.",
    href: "https://github.com/SpaceBum9/plasma-toxogon",
    route: "/galaxy",
  },
  {
    id: "automat",
    name: "Automat Orchestrieren",
    kind: "drive",
    blurb: "Control plane, Semantic Anchoring, JSON-Schema, Zero-Trust Mesh.",
    href: "https://docs.google.com/document/d/1HoJ07dgtlxOWBnpB3dl11p9AcFADSa5dlW5w8VfDrnA/edit",
    route: "/orchestrate",
  },
];

export const SAI_STEPS = [
  "Quelle",
  "Crystal Mike",
  "HAL",
  "Zielknoten",
  "Reinforcement",
] as const;

export type SaiStep = (typeof SAI_STEPS)[number];

export function nodeById(id: string) {
  return GALAXY.find((n) => n.id === id);
}

export function resolveTarget(text: string): GalaxyNode {
  const hay = text.toLowerCase();
  const hits = GALAXY.filter((n) => n.id !== "crystal-mike" && n.id !== "hal").map((n) => {
    const keys = [n.id, n.name, n.kind, n.owner ?? ""].join(" ").toLowerCase();
    const score = keys.split(/\s+/).reduce((acc, w) => (w && hay.includes(w) ? acc + 1 : acc), 0);
    return { n, score };
  });
  hits.sort((a, b) => b.score - a.score);
  return hits[0] && hits[0].score > 0 ? hits[0].n : GALAXY.find((n) => n.id === "hal")!;
}
