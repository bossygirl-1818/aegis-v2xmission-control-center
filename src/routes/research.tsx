import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { paperSections } from "@/lib/mission-data";
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

const experiments = [
  { model: "PointPillars (baseline)", acc: "62.4 mAP", rmse: "—", tce: "—", lat: "14.2 ms", mem: "1.6 GB", pwr: "13.4 W" },
  { model: "V2X-ViT (cooperative)", acc: "71.8 mAP", rmse: "—", tce: "—", lat: "17.9 ms", mem: "1.9 GB", pwr: "14.1 W" },
  { model: "GRU Channel Predictor", acc: "—", rmse: "0.041", tce: "—", lat: "1.8 ms", mem: "84 MB", pwr: "0.9 W" },
  { model: "TwinTrust Estimator", acc: "—", rmse: "—", tce: "0.023", lat: "2.4 ms", mem: "110 MB", pwr: "1.1 W" },
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
          <div className="mt-6 space-y-4">
            {paperSections.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="font-mono text-xs text-primary">{s.progress}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] via-[var(--neon)] to-[var(--violet)]" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel p-8 h-fit">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Timeline</span>
          </div>
          <h2 className="mt-2 font-display text-xl">Key dates</h2>
          <ol className="mt-6 space-y-4 text-sm">
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Implementation Completion</div>
              <div className="mt-1">15 September 2026</div>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Paper Writing Window</div>
              <div className="mt-1">16 September 2026 → 17 September 2026</div>
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
              {experiments.map((e) => (
                <tr key={e.model} className="hover:bg-white/[0.02]">
                  <td className="py-3 pr-4 font-medium">{e.model}</td>
                  <td className="py-3 pr-4 font-mono text-primary">{e.acc}</td>
                  <td className="py-3 pr-4 font-mono text-primary">{e.rmse}</td>
                  <td className="py-3 pr-4 font-mono text-primary">{e.tce}</td>
                  <td className="py-3 pr-4 font-mono">{e.lat}</td>
                  <td className="py-3 pr-4 font-mono">{e.mem}</td>
                  <td className="py-3 pr-4 font-mono">{e.pwr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MissionShell>
  );
}