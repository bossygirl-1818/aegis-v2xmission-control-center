import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-v2x.jpg";
import { MissionShell } from "@/components/mission-shell";
import { overallProgress, phases } from "@/lib/mission-data";
import { useMissionStatus, formatMetric, mapPhaseStatus } from "@/lib/use-mission-status";
import {
  ArrowRight,
  Cpu,
  Gauge,
  Radar,
  Radio,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aegis-V2X · Mission Control Center" },
      {
        name: "description",
        content:
          "Trust-aware Digital Twin mission control for 6G V2X autonomous vehicle research — Aegis-V2X.",
      },
      { property: "og:title", content: "Aegis-V2X · Mission Control Center" },
      {
        property: "og:description",
        content:
          "Trust-aware Digital Twin mission control for 6G V2X autonomous vehicle research — Aegis-V2X.",
      },
    ],
  }),
  component: Home,
});

const badges = [
  "6G V2X",
  "Digital Twin",
  "Trust-Aware AI",
  "Autonomous Vehicles",
  "Edge AI",
  "IEEE Research Prototype",
];

const problems = [
  "Fixed synchronization schedules",
  "Unnecessary computation & comms overhead",
  "Stale Digital Twin information",
  "Independent prediction and beam decisions",
  "Lack of calibrated trust estimation",
];

const solutions = [
  { icon: ShieldCheck, text: "Digital Twin Trust Estimator" },
  { icon: Sparkles, text: "TwinTrust Adaptive Policy" },
  { icon: Gauge, text: "Adaptive prediction horizon selection" },
  { icon: Radio, text: "Joint synchronization & beam management" },
  { icon: Waves, text: "Communication mode optimization" },
  { icon: Cpu, text: "Jetson Orin hardware validation" },
];

function Home() {
  const { data: status, loading, error } = useMissionStatus();
  const fallbackProgress = overallProgress();
  const fallbackActive = phases.find((p) => p.status !== "completed") ?? phases[0];
  const progress = status ? status.overall_mission_pct : fallbackProgress;
  const activeNumber = status ? status.active_phase.number : fallbackActive.number;
  const activeName = status ? status.active_phase.title : fallbackActive.name;
  const overallSub = loading ? "syncing…" : error ? "offline · cached" : "live · GitHub";
  const activeSub = loading ? "syncing…" : activeName;

  return (
    <MissionShell>
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-border glow-ring">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Autonomous BMW-style vehicles on a 6G smart highway with V2X communication signals"
            width={1920}
            height={1088}
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 hud-grid opacity-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent animate-scan" />
        </div>
        <div className="relative px-8 py-16 md:py-24 lg:py-32 max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-primary backdrop-blur-md">
            <Radar className="h-3.5 w-3.5" /> Prototype · IEEE Track
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
            <span className="neon-text">Aegis-V2X</span>
            <br />
            <span className="text-foreground">Mission Control Center</span>
          </h1>
          <p className="mt-6 max-w-3xl text-base md:text-lg text-muted-foreground">
            Calibrated Trust-Driven Joint Adaptive Control for Context-Aware,
            Resource-Efficient Digital Twin-Assisted V2X Communication — a
            trust-aware Digital Twin framework for intelligent prediction,
            synchronization, beam management, and adaptive communication in
            next-generation 6G V2X networks.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary"
              >
                {b}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/architecture"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground shadow-[0_0_30px_var(--color-primary)] transition hover:shadow-[0_0_60px_var(--color-primary)]"
            >
              Enter System Architecture
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/phases"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-5 py-3 font-mono text-xs uppercase tracking-widest text-foreground backdrop-blur-md hover:bg-white/5"
            >
              View Mission Phases
            </Link>
          </div>
        </div>

        {/* Telemetry bar */}
        <div className="relative border-t border-border/60 bg-background/60 backdrop-blur-md">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            <Telemetry
              label="Overall Mission"
              value={loading ? "…" : `${progress}%`}
              sub={overallSub}
            />
            <Telemetry
              label="Active Phase"
              value={loading ? "…" : `P${activeNumber}`}
              sub={activeSub}
            />
            <Telemetry
              label="Twin Trust τ"
              value={status ? formatMetric(status.metrics.twin_trust) : "Not yet measured"}
              sub="calibrated · Δτ 0.03"
            />
            <Telemetry
              label="Edge Latency"
              value={status ? formatMetric(status.metrics.edge_latency_ms, "ms") : "Not yet measured"}
              sub="Jetson Orin · TRT"
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-8">
          <SectionLabel>01 · Project Overview</SectionLabel>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">Problem Statement</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Current Digital Twin-assisted V2X systems suffer from:
          </p>
          <ul className="mt-4 space-y-2">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive shadow-[0_0_10px_currentColor]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-8">
          <SectionLabel>02 · Solution Vector</SectionLabel>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">
            Aegis-V2X introduces
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-3">
            {solutions.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-md border border-border bg-white/[0.02] px-3 py-2 text-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ABSTRACT */}
      <section className="mt-16">
        <div className="glass-panel relative overflow-hidden p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-4xl">
            <SectionLabel>03 · Abstract</SectionLabel>
            <h2 className="mt-3 font-display text-2xl md:text-3xl">
              A calibrated probabilistic trust score for 6G V2X
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Autonomous vehicles require reliable communication with
              surrounding vehicles and infrastructure. Existing systems cannot
              determine when their Digital Twin information is trustworthy
              enough to make decisions. Aegis-V2X solves this by introducing a
              calibrated probabilistic trust score that controls prediction,
              synchronization, beam selection, and communication decisions
              through a lightweight adaptive policy — bridging AI perception,
              wireless channel prediction, Digital Twin self-evaluation,
              adaptive control, and embedded hardware validation.
            </p>
          </div>
        </div>
      </section>

      {/* PHASES QUICKVIEW */}
      <section className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <SectionLabel>04 · Mission Phases</SectionLabel>
            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              Seven-phase operational timeline
            </h2>
          </div>
          <Link
            to="/phases"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary hover:underline"
          >
            Open phase tracker <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p) => {
            const remotePhase = status?.phases.find((rp) => rp.number === p.number);
            const uiStatus = remotePhase ? mapPhaseStatus(remotePhase.status) : p.status;
            const uiProgress = remotePhase ? remotePhase.completion_pct : p.progress;
            return (
              <Link
                key={p.id}
                to="/phases"
                className="group glass-panel p-5 transition hover:border-primary/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Phase 0{p.number}
                  </span>
                  <StatusPill status={uiStatus} />
                </div>
                <h3 className="mt-3 font-display text-base leading-snug">{p.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">Owner · {p.owner}</p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--violet)]"
                    style={{ width: `${uiProgress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </MissionShell>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
      {children}
    </span>
  );
}

function Telemetry({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="px-6 py-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-display text-2xl md:text-3xl neon-text">{value}</div>
      <div className="mt-1 text-[11px] text-muted-foreground truncate">{sub}</div>
    </div>
  );
}

export function StatusPill({ status }: { status: "completed" | "in-progress" | "planned" }) {
  const map = {
    completed: {
      cls: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
      label: "Completed",
    },
    "in-progress": {
      cls: "border-primary/50 bg-primary/10 text-primary",
      label: "In Progress",
    },
    planned: {
      cls: "border-border bg-white/5 text-muted-foreground",
      label: "Planned",
    },
  } as const;
  const s = map[status];
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${s.cls}`}
    >
      {s.label}
    </span>
  );
}