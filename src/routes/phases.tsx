import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { phases } from "@/lib/mission-data";
import { StatusPill } from "./index";

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
  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Mission Phases</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Seven-phase operational plan</h1>
      </div>

      <div className="space-y-6">
        {phases.map((p) => (
          <article key={p.id} className="glass-panel p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Phase 0{p.number} · Owner {p.owner}</div>
                <h2 className="mt-2 font-display text-xl md:text-2xl">{p.name}</h2>
                <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{p.objective}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <StatusPill status={p.status} />
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--violet)]" style={{ width: `${p.progress}%` }} />
                  </div>
                  <span className="font-mono text-xs text-primary">{p.progress}%</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px]">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tasks</div>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {p.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 rounded-md border border-border bg-white/[0.02] px-3 py-2 text-xs">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_currentColor]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="carbon-surface rounded-lg p-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Deliverable</div>
                <div className="mt-2 text-sm">{p.deliverable}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MissionShell>
  );
}