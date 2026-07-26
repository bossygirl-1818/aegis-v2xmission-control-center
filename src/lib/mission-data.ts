export type PhaseStatus = "completed" | "in-progress" | "planned";

export interface Phase {
  id: string;
  number: number;
  name: string;
  owner: string;
  objective: string;
  tasks: string[];
  deliverable: string;
  status: PhaseStatus;
  progress: number;
  completedWork?: string[];
  pendingWork?: string[];
}

export const phases: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    name: "Research Architecture & System Design",
    owner: "Vaishnavi",
    objective:
      "Establish the complete project blueprint, mathematical formulation, and end-to-end software architecture.",
    tasks: [
      "Literature review refinement",
      "Architecture finalization",
      "Repository structure",
      "Technology stack selection",
      "Mathematical formulation",
      "Module decomposition",
      "Interface design",
      "AI pipeline design",
      "Digital Twin workflow",
      "Implementation roadmap",
      "Documentation",
    ],
    deliverable: "Complete project blueprint and software architecture",
    status: "completed",
    progress: 100,
  },
  {
    id: "phase-2",
    number: 2,
    name: "Simulation & Dataset Generation",
    owner: "Haridharani",
    objective:
      "Generate a synchronized multimodal V2X dataset from CARLA and NVIDIA Sionna RT.",
    tasks: [
      "CARLA installation",
      "NVIDIA Sionna RT configuration",
      "Simulation scenarios",
      "Sensor configuration",
      "Multimodal dataset generation",
      "Synchronization validation",
      "Dataset organization",
      "Train / validation / test split",
    ],
    deliverable: "Complete synchronized multimodal dataset",
    status: "planned",
    progress: 0,
  },
  {
    id: "phase-3",
    number: 3,
    name: "Backend Foundation & Software Infrastructure",
    owner: "Logapriya",
    objective:
      "Deliver a FastAPI backend, ingestion pipeline, and dashboard skeleton wired to simulation outputs.",
    tasks: [
      "Backend architecture",
      "FastAPI services",
      "REST APIs",
      "Data ingestion pipeline",
      "Database setup",
      "Dashboard skeleton",
      "Logging",
      "Repository organization",
    ],
    deliverable: "Functional backend connected to simulation outputs",
    status: "planned",
    progress: 0,
  },
  {
    id: "phase-4",
    number: 4,
    name: "AI Perception & Trust Estimation",
    owner: "Vaishnavi",
    objective:
      "Train perception models and the calibrated Digital Twin Trust Estimator.",
    tasks: [
      "PointPillars",
      "V2X-ViT",
      "GRU channel prediction",
      "Twin Trust Estimator",
      "Criticality estimator",
      "AI pipeline integration",
    ],
    deliverable: "Complete perception and trust estimation pipeline",
    status: "planned",
    progress: 0,
  },
  {
    id: "phase-5",
    number: 5,
    name: "TwinTrust-AP Decision Engine",
    owner: "Vaishnavi",
    objective:
      "Build the TAHS + FSDP adaptive decision engine for prediction, sync, beam, and communication mode.",
    tasks: [
      "Trust Adaptive Horizon Selection",
      "Finite State Decision Policy",
      "Adaptive decision engine",
      "Prediction horizon selection",
      "Synchronization decisions",
      "Beam management",
      "Communication mode selection",
    ],
    deliverable: "Functional TwinTrust-AP framework",
    status: "planned",
    progress: 0,
  },
  {
    id: "phase-6",
    number: 6,
    name: "Edge AI Deployment & Hardware Validation",
    owner: "Khushi",
    objective:
      "Optimize and deploy models on Jetson Orin with full latency, memory, and power benchmarking.",
    tasks: [
      "AI optimization",
      "Model conversion",
      "Jetson Orin deployment",
      "Latency measurement",
      "Memory measurement",
      "Power measurement",
      "Runtime benchmarking",
    ],
    deliverable: "Embedded deployment performance results",
    status: "planned",
    progress: 0,
  },
  {
    id: "phase-7",
    number: 7,
    name: "Integration, Experiments & IEEE Paper",
    owner: "Entire Team — Lead: Vaishnavi",
    objective:
      "Integrate the system, run experiments and ablations, and deliver the IEEE paper and thesis.",
    tasks: [
      "System integration",
      "Testing",
      "Experiments",
      "Baseline comparison",
      "Ablation studies",
      "Graph generation",
      "IEEE figures",
      "Paper writing",
      "Thesis documentation",
    ],
    deliverable: "Complete research prototype and IEEE paper",
    status: "planned",
    progress: 0,
  },
];

export interface Member {
  name: string;
  role: string;
  callsign: string;
  responsibilities: string[];
  accent: "cyan" | "neon" | "violet" | "primary";
}

export const team: Member[] = [
  {
    name: "Vaishnavi",
    role: "Research Lead & AI/ML Architect",
    callsign: "AEGIS-01",
    accent: "cyan",
    responsibilities: [
      "Literature review",
      "System architecture",
      "Trust estimation model",
      "Criticality function",
      "TAHS / FSDP design",
      "Mathematical formulation",
      "Experimental design",
      "Project coordination",
    ],
  },
  {
    name: "Logapriya",
    role: "Software Engineering & Visualization Lead",
    callsign: "AEGIS-02",
    accent: "neon",
    responsibilities: [
      "Backend development",
      "APIs",
      "Database",
      "Data pipeline",
      "Dashboard development",
      "Git management",
      "Documentation",
    ],
  },
  {
    name: "Khushi",
    role: "Edge AI & Deployment Lead",
    callsign: "AEGIS-03",
    accent: "violet",
    responsibilities: [
      "Model optimization",
      "Jetson Orin deployment",
      "Hardware benchmarking",
      "Resource evaluation",
    ],
  },
  {
    name: "Haridharani",
    role: "Simulation & Dataset Lead",
    callsign: "AEGIS-04",
    accent: "primary",
    responsibilities: [
      "CARLA scenarios",
      "Sionna RT integration",
      "Dataset generation",
      "Synchronization validation",
      "Adverse condition scenarios",
    ],
  },
];

export interface ArchNode {
  id: string;
  title: string;
  purpose: string;
  input: string;
  output: string;
  tech: string;
}

export const architecture: ArchNode[] = [
  {
    id: "sensors",
    title: "Vehicle Sensors",
    purpose: "Capture the physical world from moving vehicles",
    input: "Environment, RF channel, geolocation",
    output: "LiDAR point clouds, channel state, GPS traces",
    tech: "LiDAR • Wireless Channel • GPS",
  },
  {
    id: "carla",
    title: "CARLA Simulation",
    purpose: "Reproducible urban and highway driving scenarios",
    input: "Scenario configs, sensor rigs, weather",
    output: "Synchronized sensor streams and ground truth",
    tech: "CARLA 0.9.x",
  },
  {
    id: "sionna",
    title: "NVIDIA Sionna RT",
    purpose: "Physically accurate ray-traced wireless channels",
    input: "3D scene, transmitter/receiver placement",
    output: "mmWave / 6G channel realizations",
    tech: "Sionna RT • TensorFlow",
  },
  {
    id: "dataset",
    title: "Multimodal Dataset",
    purpose: "Aligned multimodal V2X training corpus",
    input: "CARLA + Sionna outputs, timestamps",
    output: "Train / val / test splits, adverse scenarios",
    tech: "Parquet • WebDataset",
  },
  {
    id: "perception",
    title: "AI Perception Layer",
    purpose: "Cooperative 3D perception and channel forecasting",
    input: "Point clouds, cooperative features, CSI history",
    output: "3D objects, tracks, predicted channel",
    tech: "PointPillars • V2X-ViT • GRU",
  },
  {
    id: "trust",
    title: "Digital Twin Trust Estimator",
    purpose: "Calibrated probabilistic trust in the Digital Twin",
    input: "Perception residuals, staleness, uncertainty",
    output: "Twin Trust score τ ∈ [0, 1] with calibration",
    tech: "Weighted calibration • Temperature scaling",
  },
  {
    id: "policy",
    title: "TwinTrust Adaptive Policy",
    purpose: "Joint control of prediction, sync, beam, comms",
    input: "Trust score, criticality, network state",
    output: "Action tuple (horizon, sync, beam, mode)",
    tech: "TAHS + FSDP",
  },
  {
    id: "control",
    title: "Adaptive Control Decisions",
    purpose: "Execute joint decisions on the vehicle stack",
    input: "Policy action tuple",
    output: "Prediction horizon, sync trigger, beam, comm mode",
    tech: "Real-time controller",
  },
  {
    id: "jetson",
    title: "Jetson Orin Validation",
    purpose: "Embedded validation of latency, memory, power",
    input: "Optimized models and policy",
    output: "On-device KPIs and runtime traces",
    tech: "TensorRT • Jetson Orin",
  },
];

export interface KanbanTask {
  id: string;
  title: string;
  owner: string;
  phase: string;
  status: "planned" | "in-progress" | "completed";
}

export const kanbanTasks: KanbanTask[] = [
  { id: "t1", title: "Finalize mathematical formulation", owner: "Vaishnavi", phase: "Phase 1", status: "completed" },
  { id: "t2", title: "Publish architecture blueprint", owner: "Vaishnavi", phase: "Phase 1", status: "completed" },
  { id: "t3", title: "Repository structure & docs", owner: "Logapriya", phase: "Phase 1", status: "completed" },
  { id: "t4", title: "CARLA scenario templates", owner: "Haridharani", phase: "Phase 2", status: "in-progress" },
  { id: "t5", title: "Sionna RT scene calibration", owner: "Haridharani", phase: "Phase 2", status: "in-progress" },
  { id: "t6", title: "FastAPI service skeleton", owner: "Logapriya", phase: "Phase 3", status: "in-progress" },
  { id: "t7", title: "PointPillars baseline", owner: "Vaishnavi", phase: "Phase 4", status: "planned" },
  { id: "t8", title: "Trust calibration study", owner: "Vaishnavi", phase: "Phase 4", status: "planned" },
  { id: "t9", title: "TAHS policy prototype", owner: "Vaishnavi", phase: "Phase 5", status: "planned" },
  { id: "t10", title: "TensorRT export pipeline", owner: "Khushi", phase: "Phase 6", status: "planned" },
  { id: "t11", title: "Jetson power profiling rig", owner: "Khushi", phase: "Phase 6", status: "planned" },
  { id: "t12", title: "IEEE figure set", owner: "Team", phase: "Phase 7", status: "planned" },
];

export function overallProgress(): number {
  const total = phases.reduce((s, p) => s + p.progress, 0);
  return Math.round(total / phases.length);
}

export const paperSections = [
  { name: "Literature Survey", progress: 80 },
  { name: "Methodology", progress: 45 },
  { name: "Experiments", progress: 10 },
  { name: "Results", progress: 5 },
  { name: "Figures", progress: 15 },
  { name: "Tables", progress: 10 },
  { name: "Paper Sections", progress: 20 },
  { name: "Submission Prep", progress: 0 },
];