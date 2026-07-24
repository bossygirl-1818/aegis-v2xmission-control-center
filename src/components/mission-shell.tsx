import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Activity, Cpu, GitBranch, LayoutDashboard, Network, Radar, Rocket, Users } from "lucide-react";

const nav = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/architecture", label: "Architecture", icon: Network },
  { to: "/phases", label: "Mission Phases", icon: Rocket },
  { to: "/team", label: "Team", icon: Users },
  { to: "/progress", label: "Live Telemetry", icon: Activity },
  { to: "/tasks", label: "Task Ops", icon: GitBranch },
  { to: "/research", label: "Research", icon: Cpu },
] as const;

function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md carbon-surface glow-ring">
            <Radar className="h-5 w-5 text-primary animate-pulse-soft" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm tracking-[0.25em] text-primary">AEGIS-V2X</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Mission Control</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to;
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                  active
                    ? "text-primary bg-primary/10 shadow-[inset_0_0_0_1px_var(--color-border)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft shadow-[0_0_10px_currentColor]" />
            LINK ACTIVE
          </span>
          <span>|</span>
          <span>6G · V2X · SIONNA-RT</span>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/50">
      <div className="mx-auto max-w-[1600px] px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
        <span>© AEGIS-V2X Research Consortium · IEEE Prototype</span>
        <span>build 2026.24 · secure channel · Δτ = 0.031</span>
      </div>
    </footer>
  );
}

export function MissionShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main className="mx-auto max-w-[1600px] px-6 py-8">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}