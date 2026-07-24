import { createFileRoute } from "@tanstack/react-router";
import { MissionShell } from "@/components/mission-shell";
import { kanbanTasks } from "@/lib/mission-data";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Ops · Aegis-V2X" },
      { name: "description", content: "Kanban board of Aegis-V2X mission tasks across all phases." },
      { property: "og:title", content: "Aegis-V2X Task Ops" },
      { property: "og:description", content: "Planned, in progress, and completed research tasks." },
    ],
  }),
  component: TasksPage,
});

const columns = [
  { key: "planned", label: "Planned", tone: "text-muted-foreground" },
  { key: "in-progress", label: "In Progress", tone: "text-primary" },
  { key: "completed", label: "Completed", tone: "text-emerald-300" },
] as const;

function TasksPage() {
  return (
    <MissionShell>
      <div className="mb-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">Task Ops</span>
        <h1 className="mt-2 font-display text-3xl md:text-5xl">Mission Kanban</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((c) => {
          const items = kanbanTasks.filter((t) => t.status === c.key);
          return (
            <section key={c.key} className="glass-panel p-4">
              <header className="flex items-center justify-between px-2 pb-3">
                <span className={`font-mono text-[11px] uppercase tracking-widest ${c.tone}`}>{c.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{items.length}</span>
              </header>
              <div className="space-y-3">
                {items.map((t) => (
                  <article key={t.id} className="carbon-surface rounded-md p-4 transition hover:border-primary/50">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{t.phase}</div>
                    <div className="mt-1.5 text-sm">{t.title}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-mono">@{t.owner}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${t.status === "completed" ? "bg-emerald-400" : t.status === "in-progress" ? "bg-primary animate-pulse-soft" : "bg-muted-foreground"}`} />
                    </div>
                  </article>
                ))}
                {items.length === 0 && (
                  <div className="rounded-md border border-dashed border-border/60 px-3 py-8 text-center text-xs text-muted-foreground">No tasks</div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </MissionShell>
  );
}