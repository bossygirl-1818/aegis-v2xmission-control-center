import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MissionShell } from "@/components/mission-shell";
import { architecture } from "@/lib/mission-data";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({
    meta: [
      { title: "System Architecture · Aegis-V2X" },
      { name: "description", content: "Interactive architecture of the Aegis-V2X trust-aware Digital Twin pipeline for 6G V2X." },
      { property: "og:title", content: "Aegis-V2X System Architecture" },
      { property: "og:description", content: "From CARLA and Sionna RT to Twin Trust and Jetson Orin — the full research pipeline." },
    ],
  }),
  component: ArchitecturePage,
});

function ArchitecturePage() {
  const [active, setActive] = useState(architecture[5].id);
  const selected = architecture.find((n) => n.id === active) ?? architecture[0];

  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">System Architecture</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Trust-aware Digital Twin pipeline</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">Every module is instrumented for telemetry. Select a node to inspect its purpose, IO contract, and stack.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="glass-panel relative overflow-hidden p-8">
          <div className="absolute inset-0 hud-grid opacity-30 pointer-events-none" />
          <ol className="relative space-y-3">
            {architecture.map((n, i) => {
              const isActive = n.id === active;
              return (
                <li key={n.id}>
                  <button onClick={() => setActive(n.id)} className={`group flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition ${isActive ? "border-primary/60 bg-primary/10 shadow-[0_0_30px_var(--color-primary)]" : "border-border bg-white/[0.02] hover:border-primary/40"}`}>
                    <span className={`font-mono text-xs w-10 shrink-0 tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="flex-1">
                      <div className="font-display text-sm md:text-base">{n.title}</div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{n.tech}</div>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition ${isActive ? "text-primary translate-x-1" : "text-muted-foreground"}`} />
                  </button>
                  {i < architecture.length - 1 && (
                    <div className="ml-14 mt-1 h-6 w-px bg-gradient-to-b from-primary/40 to-transparent" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="glass-panel p-8 h-fit lg:sticky lg:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Module Inspector</span>
          <h2 className="mt-2 font-display text-2xl">{selected.title}</h2>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{selected.tech}</div>
          <div className="mt-6 space-y-4 text-sm">
            <InspectorRow label="Purpose" value={selected.purpose} />
            <InspectorRow label="Input" value={selected.input} />
            <InspectorRow label="Output" value={selected.output} />
          </div>
        </aside>
      </div>
    </MissionShell>
  );
}

function InspectorRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm text-foreground">{value}</div>
    </div>
  );
}