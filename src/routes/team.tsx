import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { team } from "@/lib/mission-data";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team Command Center · Aegis-V2X" },
      { name: "description", content: "Meet the Aegis-V2X research team — AI/ML, backend, edge deployment, and simulation." },
      { property: "og:title", content: "Aegis-V2X Team Command Center" },
      { property: "og:description", content: "Callsigns and responsibilities of the Aegis-V2X crew." },
    ],
  }),
  component: TeamPage,
});

const accentMap = {
  cyan: "from-[var(--cyan)] to-[var(--neon)]",
  neon: "from-[var(--neon)] to-[var(--violet)]",
  violet: "from-[var(--violet)] to-[var(--cyan)]",
  primary: "from-primary to-[var(--cyan)]",
} as const;

function TeamPage() {
  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Team Command Center</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Mission crew</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">Four research leads coordinating the Aegis-V2X program from architecture to embedded validation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {team.map((m) => (
          <article key={m.name} className="glass-panel relative overflow-hidden p-8">
            <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl bg-gradient-to-br ${accentMap[m.accent]}`} />
            <div className="relative flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg carbon-surface font-display text-lg neon-text">
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{m.callsign}</div>
                <h2 className="mt-1 font-display text-2xl">{m.name}</h2>
                <div className="mt-1 text-sm text-muted-foreground">{m.role}</div>
              </div>
            </div>
            <div className="relative mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Responsibilities</div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {m.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </MissionShell>
  );
}