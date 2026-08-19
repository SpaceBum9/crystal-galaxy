export type NodeKind = "core" | "github" | "drive" | "huggingface" | "mesh";

export type GalaxyNode = {
  id: string;
  title: string;
  kind: NodeKind;
  href: string;
  summary: string;
  owner?: string;
  lang?: string;
  private?: boolean;
};

export const SAI_STEPS = [
  "Quelle",
  "Crystal Mike",
  "HAL",
  "Zielknoten",
  "Reinforcement",
] as const;

export const GALAXY_NODES: GalaxyNode[] = [
  {
    id: "crystal-mike",
    title: "Crystal Mike",
    kind: "core",
    href: "/",
    summary: "Ursprungs-Kristall. Semantic Anchor. Jede SAI-Route beginnt hier.",
    owner: "BILO 2026",
  },
  {
    id: "hal",
    title: "HAL",
    kind: "core",
    href: "/hal",
    summary: "Offener Kern für alle. Schemafest, nüchtern, Dienstleister-Schicht.",
    owner: "Crystal Galaxy",
  },
  {
    id: "crystal-galaxy",
    title: "crystal-galaxy",
    kind: "github",
    href: "https://github.com/SpaceBum9/crystal-galaxy",
    summary: "BILO 2026 · DualEntangled Kreuzkopplung, SAI traceback, automated context.",
    owner: "SpaceBum9",
    lang: "TypeScript",
  },
  {
    id: "kreuzkopplung",
    title: "kreuzkopplung",
    kind: "github",
    href: "https://github.com/SpaceBum9/kreuzkopplung",
    summary: "DualEntangledSystem — adaptiver Zwei-Kanal-Regler mit run().",
    owner: "SpaceBum9",
    lang: "Python",
  },
  {
    id: "mct-170021",
    title: "MCT-170021",
    kind: "mesh",
    href: "https://github.com/SpaceBum9/mct-170021-zero-tier-quantum-skills-tools-mcp-connectors",
    summary: "Zero-Tier Quantum Skills, MCP-Connectoren, Mesh-Control-Plane.",
    owner: "SpaceBum9",
    lang: "Python",
  },
  {
    id: "plasma-toxogon",
    title: "plasma-toxogon",
    kind: "github",
    href: "https://github.com/SpaceBum9/plasma-toxogon",
    summary: "Der Dienstleister für alle — Flowchart, Anarcho-Archiv.",
    owner: "SpaceBum9",
  },
  {
    id: "jonas-g",
    title: "Jonas-G.",
    kind: "github",
    href: "https://github.com/SpaceBum9/Jonas-G.",
    summary: "ECHOGLAS. Privat. Keine Rohbeweise im offenen Graph.",
    owner: "SpaceBum9",
    lang: "Python",
    private: true,
  },
  {
    id: "automat-orchestrieren",
    title: "Automat Orchestrieren",
    kind: "drive",
    href: "https://docs.google.com/document/d/1HoJ07dgtlxOWBnpB3dl11p9AcFADSa5dlW5w8VfDrnA/edit",
    summary:
      "Drive-Anker: Control Plane, Semantic Anchoring, Zero-Trust Mesh, Schema-Validierung.",
    owner: "Michael Schulik",
  },
  {
    id: "kernel-status",
    title: "Crystal Galaxy Kernel Status",
    kind: "drive",
    href: "https://docs.google.com/document/d/1RwX-s8YOlTTTz28XUDYzQAJyBiRinnLjBn7u7lV7-0A/edit",
    summary: "Live-Kernel: Ausbau, Connectoren, Grenzen. Täglicher Anker in Drive.",
    owner: "Michael Schulik",
  },
  {
    id: "hf-kreuzkopplung",
    title: "SpaceBum9/kreuzkopplung",
    kind: "huggingface",
    href: "https://huggingface.co/spaces/SpaceBum9/kreuzkopplung",
    summary: "Geplanter Gradio-Space. Import aus dem GitHub-Kern kreuzkopplung.",
    owner: "SpaceBum9",
  },
];

export const GALAXY = GALAXY_NODES;

export const KIND_LABEL: Record<NodeKind, string> = {
  core: "Kern",
  github: "GitHub",
  drive: "Drive",
  huggingface: "Hugging Face",
  mesh: "Mesh",
};

export function nodeById(id: string): GalaxyNode | undefined {
  return GALAXY_NODES.find((n) => n.id === id);
}

export function detectTargetNode(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("mike") || q.includes("ursprung") || q.includes("anchor")) {
    return "crystal-mike";
  }
  if (q.includes("kreuz") || q.includes("dual") || q.includes("regler") || q.includes("lab")) {
    return "kreuzkopplung";
  }
  if (q.includes("mesh") || q.includes("mcp") || q.includes("mct") || q.includes("zerotier")) {
    return "mct-170021";
  }
  if (q.includes("kernel") || q.includes("status")) return "kernel-status";
  if (q.includes("drive") || q.includes("orchest") || q.includes("schema")) {
    return "automat-orchestrieren";
  }
  if (q.includes("hugging") || q.includes("gradio") || q.includes("space")) {
    return "hf-kreuzkopplung";
  }
  if (q.includes("echo") || q.includes("jonas")) return "jonas-g";
  if (q.includes("plasma") || q.includes("dienst")) return "plasma-toxogon";
  if (q.includes("github") || q.includes("repo") || q.includes("galaxy")) {
    return "crystal-galaxy";
  }
  return "hal";
}

export function resolveTarget(text: string): GalaxyNode {
  return nodeById(detectTargetNode(text)) ?? nodeById("hal")!;
}

export const GITHUB_REPOS = [
  "crystal-galaxy",
  "kreuzkopplung",
  "mct-170021-zero-tier-quantum-skills-tools-mcp-connectors",
  "plasma-toxogon",
] as const;

export const HF_OWNER = "SpaceBum9";
export const GH_OWNER = "SpaceBum9";
