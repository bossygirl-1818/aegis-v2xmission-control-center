#!/usr/bin/env python3
"""
Generate docs/status.json from docs/TASKS.md.

docs/TASKS.md is the single human-edited source of truth for mission
progress (see the comment block at the top of that file). This script
parses it and produces a machine-readable status.json consumed by the
Lovable dashboard.

Run automatically by .github/workflows/update-status.yml on every push
to main. Can also be run locally:

    python scripts/generate_status.py

Parsing rules
-------------
- A line "## Phase N — <title> (Owner: <owner>)" starts a new phase.
- The next "Status: <complete|active|planned>" line sets its status.
- "- [ ] <task>" / "- [x] <task>" lines are that phase's tasks.
- A "## Metrics" section (must appear before any Phase section) contains
  "key: value" lines. A value of "pending" is emitted as JSON null with
  a matching "<key>_status": "pending" flag, so the frontend can render
  "Not yet measured" instead of a fabricated number.
"""
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
TASKS_MD = REPO_ROOT / "docs" / "TASKS.md"
STATUS_JSON = REPO_ROOT / "docs" / "status.json"

PHASE_HEADER_RE = re.compile(
    r"^##\s*Phase\s*(\d+)\s*[—\-]\s*(.+?)\s*\(Owner:\s*(.+?)\)\s*$"
)
STATUS_LINE_RE = re.compile(r"^Status:\s*(complete|active|planned)\s*$", re.IGNORECASE)
TASK_LINE_RE = re.compile(r"^-\s*\[( |x|X)\]\s*(.+)$")
METRIC_LINE_RE = re.compile(r"^-\s*([a-zA-Z0-9_]+):\s*(.+)$")
METRICS_HEADER_RE = re.compile(r"^##\s*Metrics\s*$")


@dataclass
class Phase:
    number: int
    title: str
    owner: str
    status: str = "planned"
    tasks: list[dict] = field(default_factory=list)

    @property
    def completion_pct(self) -> int:
        if self.status == "complete":
            return 100
        if not self.tasks:
            return 0
        done = sum(1 for t in self.tasks if t["done"])
        return round(100 * done / len(self.tasks))


def parse_metric(raw: str) -> tuple[float | None, str]:
    """Return (value_or_None, status) for a metric's raw string value."""
    raw = raw.strip()
    if raw.lower() == "pending":
        return None, "pending"
    try:
        return float(raw), "measured"
    except ValueError:
        return None, "pending"


def parse_tasks_md(text: str) -> tuple[dict, list[Phase]]:
    lines = text.splitlines()
    metrics: dict = {}
    phases: list[Phase] = []
    current_phase: Phase | None = None
    in_metrics = False

    for raw_line in lines:
        line = raw_line.strip()

        if METRICS_HEADER_RE.match(line):
            in_metrics = True
            continue

        phase_match = PHASE_HEADER_RE.match(line)
        if phase_match:
            in_metrics = False
            if current_phase is not None:
                phases.append(current_phase)
            number, title, owner = phase_match.groups()
            current_phase = Phase(number=int(number), title=title, owner=owner)
            continue

        if in_metrics:
            metric_match = METRIC_LINE_RE.match(line)
            if metric_match:
                key, raw_value = metric_match.groups()
                value, status = parse_metric(raw_value)
                metrics[key] = {"value": value, "status": status}
            continue

        if current_phase is None:
            continue

        status_match = STATUS_LINE_RE.match(line)
        if status_match:
            current_phase.status = status_match.group(1).lower()
            continue

        task_match = TASK_LINE_RE.match(line)
        if task_match:
            checked, task_title = task_match.groups()
            current_phase.tasks.append(
                {"title": task_title.strip(), "done": checked.lower() == "x"}
            )

    if current_phase is not None:
        phases.append(current_phase)

    return metrics, phases


def build_status_document(metrics: dict, phases: list[Phase]) -> dict:
    if not phases:
        raise ValueError("No phases parsed from docs/TASKS.md — check formatting.")

    overall_pct = round(sum(p.completion_pct for p in phases) / len(phases))
    active_phases = [p for p in phases if p.status == "active"]
    active_phase = active_phases[0] if active_phases else None

    task_board: dict[str, list[dict]] = {"planned": [], "in_progress": [], "completed": []}
    for phase in phases:
        for task in phase.tasks:
            entry = {
                "phase": phase.number,
                "title": task["title"],
                "owner": phase.owner,
            }
            if task["done"]:
                task_board["completed"].append(entry)
            elif phase.status == "active":
                task_board["in_progress"].append(entry)
            else:
                task_board["planned"].append(entry)

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "overall_mission_pct": overall_pct,
        "active_phase": (
            {
                "number": active_phase.number,
                "title": active_phase.title,
                "owner": active_phase.owner,
            }
            if active_phase
            else None
        ),
        "metrics": metrics,
        "phases": [
            {
                "number": p.number,
                "title": p.title,
                "owner": p.owner,
                "status": p.status,
                "completion_pct": p.completion_pct,
                "task_count": len(p.tasks),
                "tasks_done": sum(1 for t in p.tasks if t["done"]),
            }
            for p in phases
        ],
        "task_board": task_board,
    }


def main() -> int:
    if not TASKS_MD.exists():
        print(f"ERROR: {TASKS_MD} not found", file=sys.stderr)
        return 1

    text = TASKS_MD.read_text(encoding="utf-8")
    metrics, phases = parse_tasks_md(text)

    try:
        document = build_status_document(metrics, phases)
    except ValueError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    STATUS_JSON.parent.mkdir(parents=True, exist_ok=True)
    STATUS_JSON.write_text(json.dumps(document, indent=2) + "\n", encoding="utf-8")

    print(f"Wrote {STATUS_JSON}")
    print(f"  Overall mission: {document['overall_mission_pct']}%")
    print(f"  Active phase: {document['active_phase']}")
    print(f"  Phases parsed: {len(phases)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())