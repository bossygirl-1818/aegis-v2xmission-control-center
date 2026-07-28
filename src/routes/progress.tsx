import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { MissionShell } from "@/components/mission-shell";
import { overallProgress, phases } from "@/lib/mission-data";
import { mapPhaseStatus, useMissionStatus } from "@/lib/use-mission-status";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Live Telemetry · Aegis-V2X" },
      { name: "description", content: "Real-time mission telemetry: trust score, latency, phase progress and milestones." },
      { property: "og:title", content: "Aegis-V2X Live Telemetry" },
      { property: "og:description", content: "Mission progress meters and current active phase." },
    ],
  }),
  component: ProgressPage,
});

function Gauge({
  label,
  value,
  unit,
  hue = "cyan",
  display,
}: {
  label: string;
  value: number;
  unit: string;
  hue?: string;
  display?: string;
}) {
  const pct = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * 42;
  const dash = (pct / 100) * circumference;
  return (
    <div className="glass-panel flex flex-col items-center p-6">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" stroke="var(--color-border)" strokeWidth="6" fill="none" />
          <circle cx="50" cy="50" r="42" stroke={`var(--${hue})`} strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference}`} style={{ filter: `drop-shadow(0 0 6px var(--${hue}))` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {display ? (
            <span className="px-2 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {display}
            </span>
          ) : (
            <span className="font-display text-2xl neon-text">
              {value}
              <span className="ml-0.5 text-sm text-muted-foreground">{unit}</span>
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ProgressPage() {
  const { data: status, loading, error, lastFetchedAt, refetch } = useMissionStatus({
    pollMs: 60_000,
  });

  const generatedAt = status?.generated_at ?? null;
  const lastUpdatedLabel = generatedAt
    ? new Date(generatedAt).toLocaleString()
    : lastFetchedAt
      ? new Date(lastFetchedAt).toLocaleString()
      : "—";

  const overall = status ? status.overall_mission_pct : overallProgress();
  const fallbackActive = phases.find((p) => p.status !== "completed") ?? phases[0];
  const activeNumber = status ? status.active_phase.number : fallbackActive.number;
  const activeName = status ? status.active_phase.title : fallbackActive.name;
  const activeOwner = status ? status.active_phase.owner : fallbackActive.owner;

  const completed = phases.filter((p) => p.status === "completed");
  const last = completed[completed.length - 1];
  const latestCompletedTask = last?.tasks[last.tasks.length - 1] ?? "Architecture blueprint";

  const ledger =
    status?.phases.map((p) => ({
      key: `p${p.number}`,
      number: p.number,
      name: p.title,
      progress: p.completion_pct,
      status: mapPhaseStatus(p.status),
    })) ??
    phases.map((p) => ({
      key: p.id,
      number: p.number,
      name: p.name,
      progress: p.progress,
      status: p.status,
    }));

  const trustGauge = status
    ? {
        value: status.metrics.twin_trust.status === "measured" ? Number(status.metrics.twin_trust.value) : 0,
        display: status.metrics.twin_trust.status === "pending" ? "Not yet measured" : undefined,
      }
    : { value: 87, display: undefined };
  const latencyGauge = status
    ? {
        value:
          status.metrics.edge_latency_ms.status === "measured"
            ? Number(status.metrics.edge_latency_ms.value)
            : 0,
        display:
          status.metrics.edge_latency_ms.status === "pending" ? "Not yet measured" : undefined,
      }
    : { value: 8.4, display: undefined };
  const powerGauge = status
    ? {
        value:
          status.metrics.power_watts.status === "measured" ? Number(status.metrics.power_watts.value) : 0,
        display: status.metrics.power_watts.status === "pending" ? "Not yet measured" : undefined,
      }
    : { value: 12.6, display: undefined };

  return (
    <MissionShell>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Live Telemetry</span>
          <h1 className="mt-2 font-display text-3xl md:text-5xl">Mission progress monitor</h1>
          {loading && !status && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Syncing live status…
            </p>
          )}
          {error && (
            <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-destructive">
              Live status unavailable — showing cached values.
            </p>
          )}
        </div>
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <div className="text-right font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div>Last updated</div>
            <div className="mt-1 text-primary" suppressHydrationWarning>{lastUpdatedLabel}</div>
          </div>
          <button
            type="button"
            onClick={refetch}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-foreground backdrop-blur-md transition hover:bg-white/5 disabled:opacity-50"
            aria-label="Refresh telemetry"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Gauge label="Overall Mission" value={overall} unit="%" hue="cyan" />
        <Gauge label="Twin Trust τ" value={trustGauge.value} unit="%" hue="neon" display={trustGauge.display} />
        <Gauge label="Edge Latency" value={latencyGauge.value} unit="ms" hue="violet" display={latencyGauge.display} />
        <Gauge label="Power Envelope" value={powerGauge.value} unit="W" hue="cyan" display={powerGauge.display} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="glass-panel p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Phase Ledger</span>
          <h2 className="mt-2 font-display text-2xl">All phases</h2>
          <div className="mt-6 space-y-4">
            {ledger.map((p) => (
              <div key={p.key} className="flex items-center gap-4">
                <span className="w-16 shrink-0 font-mono text-xs text-muted-foreground">P0{p.number}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{p.name}</span>
                    <span className="font-mono text-xs text-primary">{p.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--violet)]" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel p-8 h-fit">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Active Feed</span>
          <h2 className="mt-2 font-display text-2xl">Now</h2>
          <div className="mt-6 space-y-5">
            <FeedRow k="Active Phase" v={`P${activeNumber} · ${activeName}`} />
            <FeedRow k="Responsible" v={activeOwner} />
            <FeedRow k="Latest Completed" v={latestCompletedTask} />
            <FeedRow k="Pending" v={fallbackActive.tasks[0]} />
            <FeedRow k="Upcoming Milestone" v="Multimodal dataset v1 release" />
          </div>
        </aside>
      </div>
    </MissionShell>
  );
}

function FeedRow({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{k}</div>
      <div className="mt-1 text-sm">{v}</div>
    </div>
  );
}