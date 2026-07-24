import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { overallProgress, phases } from "@/lib/mission-data";

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

function Gauge({ label, value, unit, hue = "cyan" }: { label: string; value: number; unit: string; hue?: string }) {
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
          <span className="font-display text-2xl neon-text">
            {value}
            <span className="ml-0.5 text-sm text-muted-foreground">{unit}</span>
          </span>
        </div>
      </div>
      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
    </div>
  );
}

function ProgressPage() {
  const overall = overallProgress();
  const active = phases.find((p) => p.status !== "completed") ?? phases[0];
  const completed = phases.filter((p) => p.status === "completed");
  const last = completed[completed.length - 1];
  const latestCompletedTask = last?.tasks[last.tasks.length - 1] ?? "Architecture blueprint";

  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Live Telemetry</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Mission progress monitor</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Gauge label="Overall Mission" value={overall} unit="%" hue="cyan" />
        <Gauge label="Twin Trust τ" value={87} unit="%" hue="neon" />
        <Gauge label="Edge Latency" value={8.4} unit="ms" hue="violet" />
        <Gauge label="Power Envelope" value={12.6} unit="W" hue="cyan" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="glass-panel p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Phase Ledger</span>
          <h2 className="mt-2 font-display text-2xl">All phases</h2>
          <div className="mt-6 space-y-4">
            {phases.map((p) => (
              <div key={p.id} className="flex items-center gap-4">
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
            <FeedRow k="Active Phase" v={`P${active.number} · ${active.name}`} />
            <FeedRow k="Responsible" v={active.owner} />
            <FeedRow k="Latest Completed" v={latestCompletedTask} />
            <FeedRow k="Pending" v={active.tasks[0]} />
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