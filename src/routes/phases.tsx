import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { phases } from "@/lib/mission-data";
import { StatusPill } from "./index";
import { useMissionStatus, mapPhaseStatus } from "@/lib/use-mission-status";

export const Route = createFileRoute("/phases")({
  head: () => ({
    meta: [
      { title: "Mission Phases · Aegis-V2X" },
      { name: "description", content: "Seven-phase operational plan for the Aegis-V2X research prototype." },
      { property: "og:title", content: "Aegis-V2X Mission Phases" },
      { property: "og:description", content: "Owners, objectives, tasks, and deliverables per phase." },
    ],
  }),
  component: PhasesPage,
});

function PhasesPage() {
  const { data: status, loading, error } = useMissionStatus();

  const tasksByPhase = (phaseNum: number) => {
    if (!status) return null;
    const tb = status.task_board;
    return [
      ...tb.completed.filter((t) => t.phase === phaseNum).map((t) => ({ ...t, bucket: "completed" as const })),
      ...tb.in_progress.filter((t) => t.phase === phaseNum).map((t) => ({ ...t, bucket: "in-progress" as const })),
      ...tb.planned.filter((t) => t.phase === phaseNum).map((t) => ({ ...t, bucket: "planned" as const })),
    ];
  };

  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Mission Phases</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Seven-phase operational plan</h1>
        {loading && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Syncing live phase status…
          </p>
        )}
        {error && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-destructive">
            Live status unavailable — showing cached values.
          </p>
        )}
      </div>

      <div className="space-y-6">
        {phases.map((p) => {
          const remotePhase = status?.phases.find((rp) => rp.number === p.number);
          const uiStatus = remotePhase ? mapPhaseStatus(remotePhase.status) : p.status;
          const uiProgress = remotePhase ? remotePhase.completion_pct : p.progress;
          const remoteTasks = tasksByPhase(p.number);
          return (
          <article key={p.id} className="glass-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Phase 0{p.number} · Owner {p.owner}</div>
                <h2 className="mt-2 font-display text-xl md:text-2xl">{p.name}</h2>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{p.objective}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <StatusPill status={uiStatus} />
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--violet)]" style={{ width: `${uiProgress}%` }} />
                  </div>
                  <span className="font-mono text-xs text-primary">{uiProgress}%</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tasks</div>
                {remoteTasks && remoteTasks.length > 0 ? (
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {remoteTasks.map((t, i) => {
                      const dot =
                        t.bucket === "completed"
                          ? "bg-emerald-400"
                          : t.bucket === "in-progress"
                            ? "bg-primary animate-pulse-soft"
                            : "bg-muted-foreground";
                      return (
                        <li key={`${t.title}-${i}`} className="flex items-start gap-2 rounded-md border border-border bg-white/[0.02] px-3 py-2 text-xs">
                          <span className={`mt-1 h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor] ${dot}`} />
                          <span className="flex-1">
                            <span>{t.title}</span>
                            <span className="ml-2 font-mono text-[10px] text-muted-foreground">@{t.owner}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : remoteTasks && remoteTasks.length === 0 ? (
                  <div className="mt-3 rounded-md border border-dashed border-border/60 px-3 py-6 text-center text-xs text-muted-foreground">
                    No tasks published for this phase yet
                  </div>
                ) : (
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {p.tasks.map((t) => (
                      <li key={t} className="flex items-start gap-2 rounded-md border border-border bg-white/[0.02] px-3 py-2 text-xs">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="carbon-surface rounded-lg p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Deliverable</div>
                <div className="mt-2 text-sm">{p.deliverable}</div>
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </MissionShell>
  );
}