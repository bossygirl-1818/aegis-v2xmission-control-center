import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { CalendarDays, FileText } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & IEEE Paper · Aegis-V2X" },
      { name: "description", content: "IEEE paper tracker, dataset and experiment status for Aegis-V2X." },
      { property: "og:title", content: "Aegis-V2X Research Tracker" },
      { property: "og:description", content: "Paper sections, dataset, and experiment KPIs." },
    ],
  }),
  component: ResearchPage,
});

const plannedModels = [
  "PointPillars (baseline)",
  "V2X-ViT (cooperative)",
  "GRU Channel Predictor",
  "TwinTrust Estimator",
];

const plannedSections = [
  "Literature Survey",
  "Methodology",
  "Experiments",
  "Results",
  "Figures",
  "Tables",
  "Discussion",
  "Submission Prep",
];

function ResearchPage() {
  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Research Tracker</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">IEEE paper & experiment console</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass-panel p-8">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Paper Sections</span>
          </div>
          <h2 className="mt-2 font-display text-2xl">IEEE submission pipeline</h2>
          <p className="mt-3 text-xs text-muted-foreground">
            Aspirational targets — paper writing has not started. Progress will be tracked once Phase 7 begins.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {plannedSections.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2 text-sm"
              >
                <span>{s}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Planned
                </span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="glass-panel p-8 h-fit">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Timeline</span>
          </div>
          <h2 className="mt-2 font-display text-xl">Planned targets</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Working targets — not yet confirmed.
          </p>
          <ol className="mt-6 space-y-4 text-sm">
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Implementation Target</div>
              <div className="mt-1">15 September 2026 (planned)</div>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Paper Writing Window</div>
              <div className="mt-1">16 September 2026 → 17 September 2026 (planned)</div>
            </li>
          </ol>
        </aside>
      </div>

      <section className="mt-10 glass-panel p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Dataset & Experiments</span>
        <h2 className="mt-2 font-display text-2xl">Model KPIs</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <th className="py-3 pr-4">Model</th>
                <th className="py-3 pr-4">Accuracy</th>
                <th className="py-3 pr-4">RMSE</th>
                <th className="py-3 pr-4">Trust CE</th>
                <th className="py-3 pr-4">Latency</th>
                <th className="py-3 pr-4">Memory</th>
                <th className="py-3 pr-4">Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {plannedModels.map((m) => (
                <tr key={m} className="hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 font-medium">{m}</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                  <td className="py-3 pr-4 font-mono text-muted-foreground">—</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 rounded-md border border-dashed border-border/60 px-4 py-6 text-center text-xs text-muted-foreground">
            Not yet available — pending Phase 4–6 experiments. KPIs will populate once training,
            trust calibration, and Jetson Orin benchmarking runs are executed.
          </div>
        </div>
      </section>
    </MissionShell>
  );
}