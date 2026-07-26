import { useEffect, useState } from "react";

export interface StatusPhase {
  number: number;
  title: string;
  owner: string;
  status: "complete" | "active" | "planned";
  completion_pct: number;
  task_count: number;
  tasks_done: number;
}

export interface StatusTask {
  phase: number;
  title: string;
  owner: string;
}

export interface StatusMetric {
  value: number | null;
  status: "pending" | "measured";
}

export interface MissionStatus {
  generated_at: string;
  overall_mission_pct: number;
  active_phase: { number: number; title: string; owner: string };
  metrics: {
    twin_trust: StatusMetric;
    edge_latency_ms: StatusMetric;
    power_watts: StatusMetric;
  };
  phases: StatusPhase[];
  task_board: {
    planned: StatusTask[];
    in_progress: StatusTask[];
    completed: StatusTask[];
  };
}

const STATUS_URL =
  "https://raw.githubusercontent.com/bossygirl-1818/aegis-v2xmission-control-center/main/docs/status.json";

export type UiPhaseStatus = "completed" | "in-progress" | "planned";

export function mapPhaseStatus(s: StatusPhase["status"]): UiPhaseStatus {
  if (s === "complete") return "completed";
  if (s === "active") return "in-progress";
  return "planned";
}

export function formatMetric(m: StatusMetric, unit = ""): string {
  if (m.status === "pending" || m.value === null || m.value === undefined) {
    return "Not yet measured";
  }
  return `${m.value}${unit}`;
}

export function useMissionStatus() {
  const [data, setData] = useState<MissionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(STATUS_URL, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: MissionStatus) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load status");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}